class Room {
    constructor(
        roomId,
        roomType,
        roomName,
        description,
        activeYn,
        roomThumbnail,
        createUserKey,
        createDt,
        modifyUserKey,
        modifyDt,
        createDtFormatted,
        modifyDtFormatted,
        participantList,
        targetUserKey
    ) {
        this._roomId = roomId ?? null;
        this._roomType = roomType ?? null;
        this._roomName = roomName ?? null;
        this._description = description ?? null;
        this._activeYn = activeYn ?? null;
        this._roomThumbnail = roomThumbnail ?? null;
        this._createUserKey = createUserKey ?? null;
        this._createDt = createDt ?? null;
        this._modifyUserKey = modifyUserKey ?? null;
        this._modifyDt = modifyDt ?? null;
        this._createDtFormatted = createDtFormatted ?? null;
        this._modifyDtFormatted = modifyDtFormatted ?? null;
        this._participantList = participantList ?? [];
        this._targetUserKey = targetUserKey ?? null;
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
        this._roomType = value;
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

    get activeYn() {
        return this._activeYn;
    }

    set activeYn(value) {
        this._activeYn = value;
    }

    get roomThumbnail() {
        return this._roomThumbnail;
    }

    set roomThumbnail(value) {
        this._roomThumbnail = value;
    }

    get createUserKey() {
        return Number(this._createUserKey);
    }

    set createUserKey(value) {
        this._createUserKey = value;
    }

    get createDt() {
        return this._createDt;
    }

    set createDt(value) {
        this._createDt = value;
    }

    get modifyUserKey() {
        return Number(this._modifyUserKey);
    }

    set modifyUserKey(value) {
        this._modifyUserKey = value;
    }

    get modifyDt() {
        return this._modifyDt;
    }

    set modifyDt(value) {
        this._modifyDt = value;
    }

    get createDtFormatted() {
        return this._createDtFormatted;
    }

    set createDtFormatted(value) {
        this._createDtFormatted = value;
    }

    get modifyDtFormatted() {
        return this._modifyDtFormatted;
    }

    set modifyDtFormatted(value) {
        this._modifyDtFormatted = value;
    }

    get participantList() {
        return this._participantList;
    }

    set participantList(value) {
        this._participantList = value;
    }

    get targetUserKey() {
        return this._targetUserKey;
    }

    set targetUserKey(value) {
        this._targetUserKey = value;
    }
    ToJSON() {
        return {
            roomId: this.roomId,
            roomType: this.roomType,
            roomName: this.roomName,
            description: this.description,
            activeYn: this.activeYn,
            roomThumbnail: this.roomThumbnail,
            createUserKey: Number(this.createUserKey),
            createDt: this.createDt,
            modifyUserKey: Number(this.modifyUserKey),
            modifyDt: this.modifyDt,
            createDtFormatted: this.createDtFormatted,
            modifyDtFormatted: this.modifyDtFormatted,
            participantList: this.participantList,
            targetUserKey: this.targetUserKey
        };
    }

}
