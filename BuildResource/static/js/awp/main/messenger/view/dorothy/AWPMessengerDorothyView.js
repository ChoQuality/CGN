class AWPMessengerDorothyView {
    constructor(loginInfo,companyOrgUser,roomListMap,func,clsMessage,mvc,contentViewElement) {
        this._element = null;
        this._DOROTHY = null;
        this._formData = new FormData();
        this._innerEvent = new AWPMessengerDorothyViewEvent();
        this._createElementEvent = false;
        this._createCurrentModeEvent = false;
        this._createSendEvent = false;
        this._createSearchEvent = false;
        this._createEmojiEvent = false;
        this._createScrollUpEvent = false;

        this._dorothyEventHandler = () => {

            this._createElementEvent = false;
            this._createCurrentModeEvent = false;
            this._createSendEvent = false;
            this._createSearchEvent = false;
            this._createEmojiEvent = false;
            this._createScrollUpEvent = false;

            const DOROTHY = this._DOROTHY;
            const element = this._element;

            clsMessage.currentRoomInfo = DOROTHY;
            const formData = this._formData;

            const roomId = element.dataset.chatRoomId;
            const lastReadMessageId = Number(element.dataset.chatRoomReadMessageId);
            const isAllRead = Number(element.dataset.chatRoomUnreadMessageCount) === 0;
            const mode = element.dataset.mode;

            element.removeAttribute("data-mode");
            clsMessage.isDorothyProcessEventHandler(true);

            const selectRoom = (room,lastReadMessageId,isAllRead,mode) => new Promise(resolve => {
                const currentMode = mode ?? "ENTER";
                let url;
                switch (currentMode){
                    case "ENTER":
                        url = `/messenger/dorothy/chatDetail?roomId=${room}&lastReadMessageId=${lastReadMessageId}&isAllRead=${isAllRead}&mode=${currentMode}`;
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
                    return clsMessage.init(roomId);
                })
                .then(roomAWPMessageDetailListMap => {
                    try {
                        if(this._createElementEvent ===  false){
                            this.innerEvent.createElementEvent(this._createElementEvent,element,roomAWPMessageDetailListMap,mvc,clsMessage,companyOrgUser,contentViewElement);
                            //func.scrollToLastChatCard();
                            func.chatBoxScrollToLast();
                            func.focusToElement(contentViewElement.querySelector('#tab01 .textarea'));
                        }
                        this._createElementEvent = true;
                    } catch (e) {
                        console.log("ERROR :: _createElementEvent")
                        return Promise.resolve();
                    }
                })
                .then(() => {
                    try {
                        if(this._createSendEvent === false){
                            this.innerEvent.createSendEvent(this._createSendEvent,element,func,clsMessage,formData,contentViewElement);
                        }
                        this._createSendEvent = true;
                    } catch (e) {
                        console.log("ERROR :: _createSendEvent")
                        return Promise.resolve();
                    }
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
                        if(this._createEmojiEvent === false){
                            this.innerEvent.createEmojiEvent(this._createEmojiEvent,mvc,contentViewElement);
                        }
                        this._createEmojiEvent = true;
                    } catch (e) {
                        console.log("ERROR :: _createEmojiEvent")
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
            ;
        }
    }
    get element() {
        return this._element;
    }
    set element(value) {
        this._element = value;
    }
    get innerEvent(){
        return this._innerEvent;
    }
    get dorothyEventHandler(){
        return this._dorothyEventHandler
    }
    get DOROTHY() {
        return this._DOROTHY;
    }
    set DOROTHY(value) {
        this._DOROTHY = value;
    }
}
