const msgFunc = new MsgFunc();

class WebSocketManager {
    constructor(socketProvider) {
        this._socket = new socketProvider("/websocket");
        this._stompClient = Stomp.over(this._socket);
    }

    connect() {
        return new Promise((resolve, reject) => {
            try {
                this._stompClient.debug = () => {};
                resolve(this._stompClient); // 먼저 STOMP 클라이언트 생성 후 resolve
            } catch (error) {
                reject(`❌ WebSocket 연결 실패: ${error.message || error}`);
            }
        }).then((stompClient) => {
            return new Promise((resolve, reject) => {
                stompClient.connect({}, () => {
                    console.log("✅ WebSocket 연결 성공");
                    resolve(stompClient); // 정상 연결 시 resolve
                }, (error) => {
                    msgFunc.showToastModal("❌ WebSocket 연결 실패:", error);
                    reject(error); // 연결 실패 시 reject
                });
            });
        }).catch(error => console.log(error));
    }


    send(destination, body) {
        return new Promise((resolve, reject) => {
            if (!this._stompClient || !this._stompClient.connected) {
                const error = "⛔ WebSocket 클라이언트가 연결되지 않음!";
                msgFunc.showToastModal(error);
                reject(new Error(error));
            }
            try {
                this._stompClient.send(destination, {}, JSON.stringify(body));
                console.log(`📤 메시지 전송 완료: ${destination}`);
                resolve();
            } catch (error) {
                msgFunc.showToastModal("❌ 메시지 전송 오류:", error);
                reject(error);
            }
        });
    }

    disconnect() {
        if (this._stompClient && this._stompClient.connected) {
            this._stompClient.disconnect(() => {
                console.log("✅ WebSocket 연결 종료");
            });
        }
    }
}

class SubscriptionManager {
    constructor(stompClient) {
        this._stompClient = stompClient;
        this._subscriptions = {};
        // 로컬 저장소에서 구독 정보 로드
        this._subscriptions = JSON.parse(localStorage.getItem('subscriptions')) || {};
        this._awpMessenger = null;
    }

    subscribe(awpMessenger,destination, callback) {

        this._awpMessenger = awpMessenger;

        return new Promise((resolve, reject) => {
            if (!this._stompClient || !this._stompClient.connected) {
                const error = "⛔ WebSocket 클라이언트가 연결되지 않음!";
                msgFunc.showToastModal(error);
                reject(new Error(error));
            }

            try {
                const stompClient = this._stompClient;
                const messenger = this._awpMessenger;
                const subscription =
                    stompClient.subscribe(destination, (message) => {
                        callback(messenger,message.body);
                });
                this._subscriptions[destination] = subscription;
                // 로컬 저장소에 구독 상태 저장
                localStorage.setItem('subscriptions', JSON.stringify(this._subscriptions));

                console.log(`✅ 구독 성공: ${destination}`);
                resolve(subscription);
            } catch (error) {
                msgFunc.showToastModal("❌ 구독 중 오류 발생:", error);
                reject(error);
            }
        });
    }

    unsubscribe(destination) {
        return new Promise((resolve, reject) => {
            const subscription = this._subscriptions[destination];
            if (!subscription) {
                const error = `⛔ 구독 중이 아닌 경로: ${destination}`;
                console.warn(error);
                reject(new Error(error));
                return;
            }

            try {
                subscription.unsubscribe();
                delete this._subscriptions[destination];

                // 로컬 저장소에서 구독 상태 삭제
                localStorage.setItem('subscriptions', JSON.stringify(this._subscriptions));

                console.log(`✅ 구독 해제 성공: ${destination}`);
                resolve();
            } catch (error) {
                msgFunc.showToastModal("❌ 구독 해제 오류:", error);
                reject(error);
            }
        });
    }
}


class AWPWebSocketClient {
    static instance = null;
    constructor(socketProvider = SockJS) {
        if (AWPWebSocketClient.instance) {
            return AWPWebSocketClient.instance;  // 이미 인스턴스가 존재하면 기존 인스턴스를 반환
        }
        this._webSocketManager = new WebSocketManager(socketProvider);
        this._subscriptionManager = null;
        this.websocketDestinationPrefix = "/topic";
        this.websocketApplicationPrefix = "/app";
        this.isConnected = false;
        AWPWebSocketClient.instance = this;

        this._awpMessenger = null;
    }

    connect() {
        if (this.isConnected) {
            console.log("✅ 이미 WebSocket이 연결되어 있습니다.");
            return Promise.resolve();  // 이미 연결된 상태이므로 바로 resolve
        }

        return this._webSocketManager
            .connect()
            .then((stompClient) => {
                this._subscriptionManager = new SubscriptionManager(stompClient);
                this.isConnected = true;
                console.log("✅ WebSocket 연결 완료");
            })
            .catch((error) => {
                msgFunc.showToastModal("❌ WebSocket 연결 오류:", error);
                this.isConnected = false;
            });
    }

    subscribeToDestination(awpMessenger,destination, callback) {
        if (!this.isConnected) {
            return Promise.reject(new Error("⛔ WebSocket 연결이 아직 이루어지지 않았습니다."));
        }
        this._awpMessenger = awpMessenger;
        const subDestination = `${this.websocketDestinationPrefix}/${destination}`;
        return this._subscriptionManager.subscribe(this._awpMessenger,subDestination, callback);
    }

    send(destination, body) {
        if (!this.isConnected) {
            return Promise.reject(new Error("⛔ WebSocket 연결이 아직 이루어지지 않았습니다."));
        }
        const sendDestination = `${this.websocketApplicationPrefix}/${destination}`;
        return this._webSocketManager.send(sendDestination, body);
    }

    unsubscribeFromDestination(destination) {
        if (!this.isConnected) {
            return Promise.reject(new Error("⛔ WebSocket 연결이 아직 이루어지지 않았습니다."));
        }
        const subDestination = `${destination}`;
        return this._subscriptionManager.unsubscribe(subDestination);
    }

    disconnect() {
        if (this.isConnected) {
            this._webSocketManager.disconnect();
            this.isConnected = false;
            console.log("✅ WebSocket 연결 종료");
        }
    }
}
