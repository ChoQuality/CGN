class RoomList {
    constructor(roomId,
                roomType,
                roomName,
                description,
                unreadMessageCount,
                messageType,
                lastMessageContent,
                messageId,
                readMessageId,
                lastMessageDt,
                fixOrder,
                participantList) {
        this._roomId = roomId ?? null;
        this._roomType = roomType ?? null;
        this._roomName = roomName ?? null;
        this._description = description ?? null;
        this._unreadMessageCount = unreadMessageCount ?? null;
        this._messageType = messageType ?? null;
        this._lastMessageContent = lastMessageContent ?? null;
        this._messageId = messageId ?? null;
        this._readMessageId = readMessageId ?? null;
        this._lastMessageDt = lastMessageDt ?? null;
        this._fixOrder = fixOrder ?? null;
        this._messageId = messageId;
        this._readMessageId = readMessageId;
        this._participantList = participantList;
    }

    get roomId() {
        return this._roomId;
    }

    set roomId(value) {
        this._roomId = value;
    }

    get roomType() {
        return this._roomType;
    }

    set roomType(value) {
        const type = (t) => {
            switch (t) {
            case 'SELF' : return roomType.SELF;
            case 'PRIVATE' : return roomType.PRIVATE;
            case 'GROUP' : return roomType.GROUP;
            case 'ALARM' : return roomType.ALARM;
            case 'DOROTHY' : return roomType.DOROTHY;
            default: throw Error("알수없는 룸타입")
            }
        };
        this._roomType = type.apply(value);
    }

    get roomName() {
        return this._roomName;
    }

    set roomName(value) {
        this._roomName = value;
    }

    get description() {
        return this._description;
    }

    set description(value) {
        this._description = value;
    }

    get unreadMessageCount() {
        return this._unreadMessageCount;
    }

    set unreadMessageCount(value) {
        this._unreadMessageCount = value;
    }

    get messageType() {
        return this._messageType;
    }

    set messageType(value) {
        this._messageType = value;
    }

    get lastMessageContent() {
        return this._lastMessageContent;
    }

    set lastMessageContent(value) {
        this._lastMessageContent = value;
    }

    get lastMessageDt() {
        return this._lastMessageDt;
    }

    set lastMessageDt(value) {
        this._lastMessageDt = value;
    }

    get messageId() {
        return this._messageId;
    }

    set messageId(value) {
        this._messageId = value;
    }

    get readMessageId() {
        return this._readMessageId;
    }

    set readMessageId(value) {
        this._readMessageId = value;
    }

    get fixOrder() {
        return this._fixOrder;
    }

    set fixOrder(value) {
        this._fixOrder = value;
    }


    get participantList() {
        return Array.isArray(this._participantList)? this._participantList: [this._participantList];

    }

    set participantList(value) {
        this._participantList = value;
    }
}
