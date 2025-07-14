class AWPMessengerDefaultView {
    constructor(loginInfo,companyOrgUser,roomListMap,func,toastFunc,clsMessage,mvc,contentViewElement) {

        this._element = null;
        this._formData = new FormData();
        this._uploadedFiles = [];
        this._innerEvent = new AWPMessengerDefaultViewEvent();
        this._createElementEvent = false;
        this._createCurrentModeEvent = false;
        this._createFileEvent = false;
        this._createSendEvent = false;
        this._createAddMemberEvent = false;
        this._createTab02Event = false;
        this._createSearchEvent = false;
        this._createSummaryEvent = false;
        this._createEmojiEvent = false;
        this._createUpdateReadMessageEvent = false;
        this._createScrollUpEvent = false;

        this._defaultEventHandler = () => {

            this._createElementEvent = false;
            this._createCurrentModeEvent = false;
            this._createFileEvent = false;
            this._createSendEvent = false;
            this._createAddMemberEvent = false;
            this._createTab02Event = false;
            this._createSearchEvent = false;
            this._createSummaryEvent = false;
            this._createEmojiEvent = false;
            this._createUpdateReadMessageEvent = false;
            this._createScrollUpEvent = false;

            let formData = this._formData;
            let uploadedFiles = this._uploadedFiles;
            const element = this.element;
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
                        url = `/messenger/default/chatDetail?roomId=${room}&lastReadMessageId=${lastReadMessageId}&isAllRead=${isAllRead}&mode=${currentMode}`;
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
                    return clsMessage.initDefault(roomId);
                })
                .then(roomAWPMessageDetailListMap => {
                    try {
                        if(this._createElementEvent ===  false){
                            this.innerEvent.createElementEvent(this._createElementEvent,element,roomAWPMessageDetailListMap,mvc,companyOrgUser,contentViewElement);
                            const cards = document.querySelectorAll('.chatCard__group .card');
                            mvc.chatFunctionMenu(cards, contentViewElement, element);
                            const cardFileList = document.querySelectorAll('.attachmentList .attachment');
                            mvc.chatFileFunction(cardFileList);
                        }
                        this._createElementEvent = true;
                    } catch (e) {
                        console.log("ERROR :: _createElementEvent");
                        return Promise.resolve();
                    }
                })
                .then(() => {
                    try {
                        if(this._createCurrentModeEvent === false){
                            this.innerEvent.createCurrentModeEvent(this._createCurrentModeEvent,element,mvc,loginInfo,func);
                            //func.scrollToLastChatCard(); 2025.05.12 김광길 chatBoxScrollToLast()로 변경 처리
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
                    try {
                        if(this._createFileEvent === false){
                            // this.innerEvent.createFileEvent(this._createFileEvent,element,func,mvc,formData,contentViewElement)
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
                        }
                        this._createSendEvent = true;
                    } catch (e) {
                        console.log("ERROR :: _createSendEvent")
                        return Promise.resolve();
                    }
                })
                .then(() => {
                    try {
                        if(this._createAddMemberEvent === false){
                            this.innerEvent.createAddMemberEvent(this._createAddMemberEvent,element,func,toastFunc,clsMessage,contentViewElement,companyOrgUser,loginInfo);
                        }
                        this._createAddMemberEvent = true;
                    } catch (e) {
                        console.log("ERROR :: _createAddMemberEvent")
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
                        if(this._createSummaryEvent === false){
                            this.innerEvent.createSummaryEvent(this._createSummaryEvent,element,func);
                        }
                        this._createSummaryEvent = true;
                    } catch (e) {
                        console.log("ERROR :: _createSummaryEvent")
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
    get innerEvent(){
        return this._innerEvent;
    }
    get defaultEventHandler(){
        return this._defaultEventHandler;
    }

}
