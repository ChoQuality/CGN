class AWPMessenger {
    constructor(func,toastFunc,loginInfo,companyOrgUser,webSocketClient) {

        this._loginInfo = loginInfo
        this._webSocketClient = webSocketClient;
        this._message = new AWPMessage(
            func
            ,loginInfo
            ,companyOrgUser
            ,new AWPMessengerPub(func,companyOrgUser,loginInfo,webSocketClient)
            ,new AWPMessengerSub(func,companyOrgUser,loginInfo,webSocketClient)
        );
        this._view = new AWPMessengerView(
            func
            ,toastFunc
            ,loginInfo
            ,companyOrgUser
            ,this._message
        );
    }

    get loginInfo() {
        return this._loginInfo;
    }

    get view() {
        return this._view;
    }

    get message() {
        return this._message;
    }

    get webSocketClient() {
        return this._webSocketClient;
    }
}