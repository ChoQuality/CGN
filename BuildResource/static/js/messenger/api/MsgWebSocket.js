window.websocket = {
    websocket_endpoint: "/websocket", // 웹소켓 엔드포인트
    websocket_destination_prefix: "/topic",
    websocket_application_prefix: "/app",

    stompClient: null, // STOMP 클라이언트
    subscriptions: {}, // 구독 정보를 저장할 객체

    // STOMP 연결 설정
    connectStomp: (onConnectCallback, onErrorCallback) => {
        const socket = new SockJS(window.websocket.websocket_endpoint); // 웹소켓 엔드포인트 사용
        window.websocket.stompClient = Stomp.over(socket); // STOMP 클라이언트 생성

        window.websocket.stompClient.connect({Cookie: document.cookie}, () => {
            console.log('STOMP 연결 성공');
            if (onConnectCallback) onConnectCallback();
        }, (error) => {
            this._func.showToastModal('STOMP 연결 실패:', error);
            if (onErrorCallback) onErrorCallback(error);
        });
    },

    // 서버로 메시지 전송
    sendMessage: (destination, messageParam) => {
        if (!window.websocket.stompClient || !window.websocket.stompClient.connected) {
            this._func.showToastModal('STOMP 클라이언트가 연결되지 않았습니다.');
            return;
        }

        window.websocket.stompClient.send(
            window.websocket.websocket_application_prefix + destination, // 서버 엔드포인트
            {}, // 헤더 (옵션)
            JSON.stringify(messageParam) // 메시지 본문
        );

        console.log(`메시지 전송 완료: ${destination}`, messageParam);
    },

    // 메시지 구독
    subscribe: (destination, callback) => {
        if (!window.websocket.stompClient || !window.websocket.stompClient.connected) {
            this._func.showToastModal('STOMP 클라이언트가 연결되지 않았습니다.');
            return;
        }

        // 이미 구독한 destination이라면 경고
        if (window.websocket.subscriptions[destination]) {
            console.warn(`이미 구독 중인 경로: ${destination}`);
            return;
        }

        const subscription = window.websocket.stompClient.subscribe(destination, (message) => {
            const payload = JSON.parse(message.body);
            console.log(`수신 메시지 [${destination}]:`, payload); // 메시지 로그 출력
            callback(payload);
        });

        window.websocket.subscriptions[destination] = subscription;
        console.log(`구독 성공: ${destination}`);
    },

    // 메시지 구독 해제
    unsubscribe: (destination) => {
        if (!window.websocket.subscriptions[destination]) {
            console.warn(`구독 중이 아닌 경로: ${destination}`);
            return;
        }

        window.websocket.subscriptions[destination].unsubscribe(); // 구독 해제
        delete window.websocket.subscriptions[destination]; // 구독 정보 삭제
        console.log(`구독 해제 성공: ${destination}`);
    },

    // 연결 해제
    disconnectStomp: () => {
        if (window.websocket.stompClient) {
            window.websocket.stompClient.disconnect(() => {
                console.log('STOMP 연결 해제 완료');
            });
        } else {
            console.warn('STOMP 클라이언트가 이미 해제되었습니다.');
        }
    },

    // list 구독
    subscribeToList: (userKey, callback) => {
        const destination = window.websocket.websocket_destination_prefix + `/list/${userKey}`;
        window.websocket.subscribe(destination, callback);
        console.log(`구독 완료: ${destination}`);
    },

    // room 구독
    subscribeToRoom: (userKey, callback) => {
        const destination = window.websocket.websocket_destination_prefix + `/room/${userKey}`;
        window.websocket.subscribe(destination, callback);
        console.log(`구독 완료: ${destination}`);
    },

    // message 구독
    subscribeToMessage: (roomId, callback) => {
        const destination = window.websocket.websocket_destination_prefix + `/message/_0001_${roomId}`;
        window.websocket.subscribe(destination, callback);
        console.log(`구독 완료: ${destination}`);
    }
};

// 아래 사용 예시:
//
// // 서버 연결
// window.websocket.connectStomp(
//     () => {
//         console.log('서버 연결 성공!');
//
//         // 연결 후 구독 예시
//         window.websocket.subscribeToList('user123', (message) => {
//             console.log('리스트 메시지 수신:', message);
//         });
//
//         window.websocket.subscribeToRoom('user123', (message) => {
//             console.log('채팅방 메시지 수신:', message);
//         });
//
//         window.websocket.subscribeToMessage('room456', (message) => {
//             console.log('메시지 수신 (room456):', message);
//         });
//     },
//     (error) => {
//         console.error('서버 연결 실패:', error);
//     }
// );
//
// // 구독 해제 예시
// setTimeout(() => {
//     window.websocket.unsubscribe('/topic/list/user123');
//     window.websocket.unsubscribe('/topic/room/user123');
//     window.websocket.unsubscribe('/topic/message/room456');
// }, 5000); // 5초 후 구독 해제
//
// // STOMP 연결 해제 예시
// setTimeout(() => {
//     window.websocket.disconnectStomp();
// }, 10000); // 10초 후 STOMP 연결 해제
