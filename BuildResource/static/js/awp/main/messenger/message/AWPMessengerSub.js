class AWPMessengerSub {
    constructor(funcParse,companyOrgUser,loginInfo,webSocketClient) {
        this._funcParse = funcParse
        this._companyOrgUser = companyOrgUser
        this._loginInfo = loginInfo;
        this._webSocketClient = webSocketClient;
        this._awpMessenger = null
    }

    subscribeList(awpMessenger,callback){
        const { selectedDb, userKey } = this._loginInfo;
        const sendDestination = `list/${selectedDb}${userKey}`;
        const funcCallback = callback;
        const webSocketClient = this._webSocketClient;
        this._awpMessenger = awpMessenger
        webSocketClient.subscribeToDestination(this._awpMessenger,sendDestination,funcCallback)
    }
    subscribeRoomDetail(awpMessenger,callback){
        const { selectedDb, userKey } = this._loginInfo;
        const sendDestination = `room/${selectedDb}${userKey}`;
        const funcCallback = callback;
        const webSocketClient = this._webSocketClient;
        this._awpMessenger = awpMessenger
        webSocketClient.subscribeToDestination(this._awpMessenger,sendDestination,funcCallback)
    }
    subscribeNotice(awpMessenger,callback){
        const sendDestination = `notice`;
        const funcCallback = callback;
        const webSocketClient = this._webSocketClient;
        this._awpMessenger = awpMessenger
        webSocketClient.subscribeToDestination(this._awpMessenger,sendDestination,funcCallback)
    }

    subscribeRoom(awpMessenger,roomInfo,callback){
        const { selectedDb, userKey } = this._loginInfo;
        const sendDestination = `message/${selectedDb}${roomInfo.roomId}`;
        const funcCallback = callback;
        const webSocketClient = this._webSocketClient;
        const enter= this._ENTER(roomInfo);
        this._awpMessenger = awpMessenger
        webSocketClient.subscribeToDestination(this._awpMessenger,sendDestination,funcCallback)
            .then(() => {
                webSocketClient.send('send/message',enter)
            })
    }
    _ENTER(roomInfo){
        return  {
            roomId: roomInfo.roomId,
            messageType: messageType.ENTER,
            messageUuid: crypto.randomUUID(),
            company: this._loginInfo.selectedDb
        }
    }

}
