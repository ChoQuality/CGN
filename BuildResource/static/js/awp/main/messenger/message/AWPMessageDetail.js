class AWPMessageDetail{

    constructor(loginInfo,index,message,attachmentList,upperMessage,upperAttachmentList,previousMessageDetail,emojiList) {
        this._loginInfo = loginInfo
        this._index = index
        this._message = message
        this._attachmentList = attachmentList
        this._upperMessage = upperMessage
        this._upperAttachmentList = upperAttachmentList
        this._previousMessageDetail = previousMessageDetail
        this._emojiList = emojiList
    }
    get index() {
        return this._index;
    }
    get message() {
        return this._message;
    }
    get attachmentList() {
        return this._attachmentList;
    }
    get upperMessage() {
        return this._upperMessage;
    }
    get upperAttachmentList() {
        return this._upperAttachmentList;
    }
    get previousMessageDetail() {
        return this._previousMessageDetail;
    }
    set previousMessageDetail(value) {
        this._previousMessageDetail = value;
    }

    get isSameDate(){
        const dt = this.message.createDt;
        const dateOnly =dt.split(" ")[0];
        return document.getElementById(dateOnly) != null;
    }
    get isSameCreateDt(){
        return this.message.createDt === this.previousMessageDetail.message.createDt;
    }
    get isSameUser(){
        return Number(this.message.sendUserKey) === Number(this.previousMessageDetail.message.sendUserKey);
    }
    get isMine(){
        return Number(this.message.sendUserKey) === Number(this._loginInfo.userKey);
    }

    get emojiList(){
        return this._emojiList;
    }
}
