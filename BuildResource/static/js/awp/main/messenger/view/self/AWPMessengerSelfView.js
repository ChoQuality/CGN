class AWPMessengerSelfView {
    constructor(loginInfo,companyOrgUser,roomListMap,func,clsMessage,mvc,contentViewElement) {
        this._element = null;
        this._SELF = null;
        this._formData = new FormData();
        this._uploadedFiles = [];
        this._innerEvent = new AWPMessengerSelfViewEvent();
        this._createElementEvent = false;
        this._createCurrentModeEvent = false;
        this._createFileEvent = false;
        this._createSendEvent = false;
        this._createPraiseEvent = false;
        this._createTab02Event = false;
        this._createSearchEvent = false;
        this._createEmojiEvent = false;
        this._createScrollUpEvent = false;

        this._selfEventHandler = () => {
            const SELF = this._SELF;
            const element = this._element;

            clsMessage.currentRoomInfo = SELF;
            let formData = this._formData;
            let uploadedFiles = this._uploadedFiles;
            const roomId = element.dataset.chatRoomId;
            const lastReadMessageId = Number(element.dataset.chatRoomReadMessageId);
            const isAllRead = Number(element.dataset.chatRoomUnreadMessageCount) === 0;
            const mode = element.dataset.mode;

            this._createElementEvent = false;
            this._createCurrentModeEvent = false;
            this._createFileEvent = false;
            this._createSendEvent = false;
            this._createPraiseEvent = false;
            this._createTab02Event = false;
            this._createSearchEvent = false;
            this._createEmojiEvent = false;
            this._createScrollUpEvent = false;

            element.removeAttribute("data-mode");
            clsMessage.isDorothyProcessEventHandler(false);

            const selectRoom = (room,lastReadMessageId,isAllRead,mode) => new Promise(resolve => {
                const currentMode = mode ?? "ENTER";
                let url;
                switch (currentMode){
                    case "ENTER":
                        url = `/messenger/self/chatDetail?roomId=${room}&lastReadMessageId=${lastReadMessageId}&isAllRead=${isAllRead}&mode=${currentMode}`;
                        break;
                    default:
                        return;
                }
                resolve(fetch(url, { method: "GET" }));
            });

            selectRoom(roomId,lastReadMessageId,isAllRead,mode)
                .then(response => response.text())
                .then(htmlString => {
                    formData = new FormData();
                    uploadedFiles = [];
                    contentViewElement.innerHTML = func.parseData(htmlString);
                    return clsMessage.init(roomId);
                })
                .then(roomAWPMessageDetailListMap => {
                    try {
                        if(this._createElementEvent ===  false){
                            this.innerEvent.createElementEvent(this._createElementEvent,element,roomAWPMessageDetailListMap,mvc,companyOrgUser,contentViewElement);
                            const cardFileList = document.querySelectorAll('.attachmentList .attachment');
                            mvc.chatFileFunction(cardFileList);
                        }
                        this._createElementEvent = true;
                    } catch (e) {
                        console.log("ERROR :: _createElementEvent")
                        return Promise.resolve();
                    }
                })
                .then(() => {
                    try {
                        if(this._createFileEvent === false){
                            // this.innerEvent.createFileEvent(this._createFileEvent,element,func,mvc,formData,contentViewElement);
                            this.innerEvent.createMultiFileEvent(this._createFileEvent,element,func,mvc,formData,uploadedFiles,contentViewElement)
                        }
                        this._createFileEvent = true;
                    } catch (e) {
                        console.log("ERROR :: _createFileEvent")
                        return Promise.resolve();
                    }
                })
                .then(() => {
                    try {
                        if(this._createSendEvent === false){
                            this.innerEvent.createSendEvent(this._createSendEvent,element,func,clsMessage,formData,uploadedFiles,contentViewElement);
                            //func.scrollToLastChatCard();
                            func.chatBoxScrollToLast();
                            func.focusToElement(contentViewElement.querySelector('#tab01 .textarea'));
                        }
                        this._createSendEvent = true;
                    } catch (e) {
                        console.log("ERROR :: _createSendEvent")
                        return Promise.resolve();
                    }
                })
                .then(() => {
                    try {
                        if(this._createPraiseEvent === false){
                            this.innerEvent.createPraiseEvent(this._createPraiseEvent,clsMessage,contentViewElement,companyOrgUser,mvc);
                        }
                        this._createPraiseEvent = true;
                    } catch (e) {
                        console.log("ERROR :: _createPraiseEvent")
                        return Promise.resolve();
                    }
                })
                .then(() => {
                    try {
                        if(this._createTab02Event === false){
                            this.innerEvent.createTab02Event(this._createTab02Event,element,func,contentViewElement,mvc);
                        }
                        this._createTab02Event = true;
                    } catch (e) {
                        console.log("ERROR :: _createTab02Event")
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

        }
    }
    get element() {
        return this._element;
    }

    set element(value) {
        this._element = value;
    }

    get SELF() {
        return this._SELF;
    }

    set SELF(value) {
        this._SELF = value;
    }

    get innerEvent(){
        return this._innerEvent;
    }

    get selfEventHandler(){
        return this._selfEventHandler;
    }
}
