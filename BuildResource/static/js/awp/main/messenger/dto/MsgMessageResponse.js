class MessageResponse {
    constructor(    messageId,
                    attachmentId,
                    createDt,
                    deletedYn,
                    messageContent,
                    messageType,
                    roomId,
                    sendUserKey,
                    replyMessageId,
                    groupName,
                    userNm
                    ) {
        this._messageId = messageId ?? null;
        this._attachmentId = attachmentId ?? null;
        this._createDt = createDt ?? null; // Assuming `createDt` is in a format that JS Date can handle
        this._deletedYn = deletedYn ?? null;
        this._messageContent = messageContent ?? null;
        this._messageType = messageType ?? null;
        this._roomId = roomId ?? null;
        this._sendUserKey = sendUserKey ?? null;
        this._replyMessageId = replyMessageId ?? null;
        this._groupName = groupName ?? null;
        this._userNm = userNm ?? null;
    }


    get messageId() {
        return this._messageId;
    }

    set messageId(value) {
        this._messageId = value;
    }

    get attachmentId() {
        return this._attachmentId;
    }

    set attachmentId(value) {
        this._attachmentId = value;
    }

    get createDt() {
        return this._createDt;
    }

    set createDt(value) {
        this._createDt = value;
    }

    get deletedYn() {
        return this._deletedYn;
    }

    set deletedYn(value) {
        this._deletedYn = value;
    }

    get messageContent() {
        return this._messageContent;
    }

    set messageContent(value) {
        this._messageContent = value;
    }

    get messageType() {
        return this._messageType;
    }

    set messageType(value) {
        this._messageType = value;
    }

    get roomId() {
        return this._roomId;
    }

    set roomId(value) {
        this._roomId = value;
    }

    get sendUserKey() {
        return this._sendUserKey;
    }

    set sendUserKey(value) {
        this._sendUserKey = value;
    }

    get replyMessageId() {
        return this._replyMessageId;
    }

    set replyMessageId(value) {
        this._replyMessageId = value;
    }

    get groupName() {
        return this._groupName;
    }

    set groupName(value) {
        this._groupName = value;
    }

    get userNm() {
        return this._userNm;
    }

    set userNm(value) {
        this._userNm = value;
    }
}
