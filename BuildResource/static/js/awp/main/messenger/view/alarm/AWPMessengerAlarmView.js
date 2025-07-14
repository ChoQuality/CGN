class AWPMessengerAlarmView {
    constructor(loginInfo,func,clsMessage,mvc,companyOrgUser,contentViewElement) {

        this._element = null;
        this._ALARM = null;
        this._formData = new FormData();
        this._innerEvent = new AWPMessengerAlarmViewEvent();

        this._createElementEvent = false;
        this._createCurrentModeEvent = false;
        this._createSearchEvent = false;
        this._createUpdateReadMessageEvent = false;
        this._createScrollUpEvent = false;

        this._alarmEventHandler = () => {

            this._createElementEvent = false;
            this._createCurrentModeEvent = false;
            this._createSearchEvent = false;
            this._createUpdateReadMessageEvent = false;
            this._createScrollUpEvent = false;

            const ALARM = this._ALARM;
            const element = this._element;

            clsMessage.currentRoomInfo = ALARM;
            const formData = this._formData;

            const roomId = element.dataset.chatRoomId;
            const lastReadMessageId = Number(element.dataset.chatRoomReadMessageId);
            const isAllRead = Number(element.dataset.chatRoomUnreadMessageCount) === 0;
            const mode = element.dataset.mode;

            element.removeAttribute("data-mode");
            clsMessage.isDorothyProcessEventHandler(false);

            const selectRoom = (room,lastReadMessageId,isAllRead,mode) => new Promise(resolve => {
                const currentMode = mode ?? "ENTER";
                let url;
                switch (currentMode){
                    case "ENTER":
                        url = `/messenger/alarm/chatDetail?roomId=${room}&lastReadMessageId=${lastReadMessageId}&isAllRead=${isAllRead}&mode=${currentMode}`;
                        break;
                    default:
                        return;
                }
                resolve(fetch(url, { method: "GET" }));
            });


            selectRoom(roomId,lastReadMessageId,isAllRead,mode)
                .then(response => response.text())
                .then(htmlString => {
                    contentViewElement.innerHTML = func.parseData(htmlString);
                    return clsMessage.initAlarm(roomId);
                })
                .then(roomAWPAlarmMessageDetailListMap => {
                    try {
                        if(this._createElementEvent ===  false){
                            this.innerEvent.createElementEvent(this._createElementEvent,element,roomAWPAlarmMessageDetailListMap,mvc,loginInfo,contentViewElement);
                        }
                        this._createElementEvent = true;
                    } catch (e) {
                        console.log("ERROR :: _createElementEvent")
                        return Promise.resolve();
                    }
                })
                .then(() => {
                    try {
                        if(this._createCurrentModeEvent === false){
                            this.innerEvent.createCurrentModeEvent(this._createCurrentModeEvent,element,mvc);
                            //func.scrollToLastChatCard();
                            func.chatBoxScrollToLast();
                            func.focusToElement(contentViewElement.querySelector('#tab01 .textarea'));
                        }
                        this._createCurrentModeEvent = true;
                    } catch (e) {
                        console.log("ERROR :: _createCurrentModeEvent")
                        return Promise.resolve();
                    }
                })
                .then(() => {
                    //func.scrollToLastChatCard();
                    func.chatBoxScrollToLast();
                })
                .then(() => {
                    try {
                        if(this._createSearchEvent === false){
                            this.innerEvent.createSearchEvent(this._createSearchEvent,element,func,mvc,loginInfo,companyOrgUser,clsMessage,this.innerEvent);
                        }
                        this._createSearchEvent = true;
                    } catch (e) {
                        console.log("ERROR :: _createSearchEvent")
                        return Promise.resolve();
                    }
                })

                .then(() => {
                    try {
                        if(this._createUpdateReadMessageEvent === false){
                            this.innerEvent.createUpdateReadMessageEvent(this._createUpdateReadMessageEvent,element,func,loginInfo);
                        }
                        this._createUpdateReadMessageEvent = true;
                    } catch (e) {
                        console.log("ERROR :: _createUpdateReadMessageEvent")
                        return Promise.resolve();
                    }
                })
                .then(() => {
                    try {
                        if(this._createScrollUpEvent === false){
                            this.innerEvent.createScrollUpEvent(this._createScrollUpEvent,element,func,clsMessage,mvc,loginInfo,companyOrgUser);
                        }
                        this._createScrollUpEvent = true;
                    } catch (e) {
                        console.log("ERROR :: _createScrollUpEvent")
                        return Promise.resolve();
                    }
                })
                .catch(err => console.log(err));

        }
    }


    get element() {
        return this._element;
    }

    set element(value) {
        this._element = value;
    }

    get ALARM() {
        return this._ALARM;
    }

    set ALARM(value) {
        this._ALARM = value;
    }
    get innerEvent(){
        return this._innerEvent;
    }
    get alarmEventHandler(){
        return this._alarmEventHandler
    }

}
