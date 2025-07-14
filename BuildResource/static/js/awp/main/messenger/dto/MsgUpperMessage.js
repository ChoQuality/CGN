class UpperMessage {

    constructor(
        messageId
        ,roomId
        ,sendUserKey
        ,userNm
        ,messageContent
        ,deletedYn
        ,createDt
        ,createDtFormatted
        ,attachmentId
        ,originFileName
        ,fileSize
        ,savedFilePath
        ,fileExtension
    ) {
        this._messageId = Number(messageId) ?? null;
        this._roomId = roomId ?? null;
        this._sendUserKey= Number(sendUserKey) ?? null;
        this._userNm= userNm ?? null;
        this._messageContent= messageContent ?? null;
        this._deletedYn= deletedYn ?? null;
        this._createDt= createDt ?? null;
        this._createDtFormatted= createDtFormatted ?? null;
        this._attachmentId= Number(attachmentId) ?? null;
        this._originFileName= originFileName ?? null;
        this._fileSize = fileSize ?? null;
        this._savedFilePath = savedFilePath ?? null;
        this._fileExtension = fileExtension ?? null;
    }


    get messageId() {
        return Number(this._messageId);
    }

    set messageId(value) {
        this._messageId = value;
    }

    get roomId() {
        return this._roomId;
    }

    set roomId(value) {
        this._roomId = value;
    }

    get sendUserKey() {
        return Number(this._sendUserKey);
    }

    set sendUserKey(value) {
        this._sendUserKey = value;
    }

    get userNm() {
        return this._userNm;
    }

    set userNm(value) {
        this._userNm = value;
    }

    get messageContent() {
        return this._messageContent;
    }

    set messageContent(value) {
        this._messageContent = value;
    }

    get deletedYn() {
        return this._deletedYn;
    }

    set deletedYn(value) {
        this._deletedYn = value;
    }

    get createDt() {
        return this._createDt;
    }

    set createDt(value) {
        this._createDt = value;
    }

    get createDtFormatted() {
        return this._createDtFormatted;
    }

    set createDtFormatted(value) {
        this._createDtFormatted = value;
    }

    get attachmentId() {
        return isNaN(Number(this._attachmentId)) ? null : Number(this._attachmentId);
    }

    set attachmentId(value) {
        this._attachmentId = value;
    }

    get originFileName() {
        return this._originFileName;
    }

    set originFileName(value) {
        this._originFileName = value;
    }

    get fileSize() {
        return this._fileSize;
    }

    set fileSize(value) {
        this._fileSize = value;
    }

    get savedFilePath() {
        return this._savedFilePath;
    }

    set savedFilePath(value) {
        this._savedFilePath = value;
    }


    get fileExtension() {
        return this._fileExtension;
    }

    set fileExtension(value) {
        this._fileExtension = value;
    }


}
