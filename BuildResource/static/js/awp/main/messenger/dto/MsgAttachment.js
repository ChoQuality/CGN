class Attachment {
    constructor(
        attachmentId
        ,roomId
        ,companyId
        ,sendUserKey
        ,sendUserName
        ,originFileName
        ,fileExtension
        ,fileSize
        ,deletedYn
        ,savedFilePath
        ,createDt
    ) {
        this._attachmentId = attachmentId ?? null;
        this._roomId = roomId ?? null;
        this._companyId = companyId ?? null;
        this._sendUserKey = sendUserKey ?? null;
        this._sendUserName = sendUserName ?? null;
        this._originFileName = originFileName ?? null;
        this._fileExtension = fileExtension ?? null;
        this._fileSize = fileSize ?? null;
        this._deletedYn = deletedYn ?? null;
        this._savedFilePath = savedFilePath ?? null;
        this._createDt = createDt ?? null;
    }

    get attachmentId() {
        return Number(this._attachmentId);
    }

    set attachmentId(value) {
        this._attachmentId = value;
    }

    get roomId() {
        return this._roomId;
    }

    set roomId(value) {
        this._roomId = value;
    }

    get companyId() {
        return this._companyId;
    }

    set companyId(value) {
        this._companyId = value;
    }

    get sendUserKey() {
        return Number(this._sendUserKey);
    }

    set sendUserKey(value) {
        this._sendUserKey = value;
    }

    get sendUserName() {
        return this._sendUserName;
    }

    set sendUserName(value) {
        this._sendUserName = value;
    }

    get originFileName() {
        return this._originFileName;
    }

    set originFileName(value) {
        this._originFileName = value;
    }

    get fileExtension() {
        return this._fileExtension;
    }

    set fileExtension(value) {
        this._fileExtension = value;
    }

    get fileSize() {
        return this._fileSize;
    }

    set fileSize(value) {
        this._fileSize = value;
    }

    get deletedYn() {
        return this._deletedYn;
    }

    set deletedYn(value) {
        this._deletedYn = value;
    }

    get savedFilePath() {
        return this._savedFilePath;
    }

    set savedFilePath(value) {
        this._savedFilePath = value;
    }

    get createDt() {
        return this._createDt;
    }

    set createDt(value) {
        this._createDt = value;
    }
}
