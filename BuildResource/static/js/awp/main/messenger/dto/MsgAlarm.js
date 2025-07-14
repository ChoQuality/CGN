class Alarm {
    constructor(
        messageId, //메시지ID
        roomId, //채팅방ID
        sendUserKey, //보낸사용자KEY
        sendSystem, //알림요청시스템
        receiveUserKey, //받는사용자KEY
        alarmType, //알림Type
        templateCode, //메시지템플릿코드
        templateBody, //알림발송요청문구(String JSON)
        templateMessage, //템플릿메시지
        messageText, //메시저(plain Text - 메시지 검색용)
        messageContent, //메시지컨텐츠
        linkText, //링크버튼명
        linkUrl, //링크URL
        acceptUrl, //수락URL
        rejectUrl, //거절URL
        confirmYn, //확인상태코드[Y:수락, N:거절, null:대기]
        confirmDt, // 확인일시
        deletedYn, //삭제상태
        createUserKey, //생성자
        createDt, //생성일시
        modifyUserKey, //수정자
        modifyDt, //수정일시
        keyword, //메시지 조회
        language, //템플릿언어코드
        company,
        createDtFormatted,
        modifyDtFormatted
) {
        this._messageId = Number(messageId);
        this._roomId = roomId;
        this._sendUserKey = Number(sendUserKey);
        this._sendSystem = sendSystem;
        this._receiveUserKey = Number(receiveUserKey);
        this._alarmType = alarmType;
        this._templateCode = templateCode;
        this._templateBody = templateBody;
        this._templateMessage = templateMessage;
        this._messageText = messageText;
        this._messageContent = messageContent;
        this._linkText = linkText;
        this._linkUrl = linkUrl;
        this._acceptUrl = acceptUrl;
        this._rejectUrl = rejectUrl;
        this._confirmYn = confirmYn;
        this._confirmDt = confirmDt;
        this._deletedYn = deletedYn;
        this._createUserKey = createUserKey;
        this._createDt = createDt;
        this._modifyUserKey = modifyUserKey;
        this._modifyDt = modifyDt;
        this._keyword = keyword;
        this._language = language;
        this._company = company;
        this._createDtFormatted = createDtFormatted;
        this._modifyDtFormatted = modifyDtFormatted;
    }


    get messageId() {
        return this._messageId;
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
        return this._sendUserKey;
    }

    set sendUserKey(value) {
        this._sendUserKey = value;
    }

    get sendSystem() {
        return this._sendSystem;
    }

    set sendSystem(value) {
        this._sendSystem = value;
    }

    get receiveUserKey() {
        return this._receiveUserKey;
    }

    set receiveUserKey(value) {
        this._receiveUserKey = value;
    }

    get alarmType() {
        return this._alarmType;
    }

    set alarmType(value) {
        this._alarmType = value;
    }

    get templateCode() {
        return this._templateCode;
    }

    set templateCode(value) {
        this._templateCode = value;
    }

    get templateBody() {
        return this._templateBody;
    }

    set templateBody(value) {
        this._templateBody = value;
    }

    get templateMessage() {
        return this._templateMessage;
    }

    set templateMessage(value) {
        this._templateMessage = value;
    }

    get messageText() {
        return this._messageText;
    }

    set messageText(value) {
        this._messageText = value;
    }

    get messageContent() {
        return this._messageContent;
    }

    set messageContent(value) {
        this._messageContent = value;
    }

    get linkText() {
        return this._linkText;
    }

    set linkText(value) {
        this._linkText = value;
    }

    get linkUrl() {
        return this._linkUrl;
    }

    set linkUrl(value) {
        this._linkUrl = value;
    }

    get acceptUrl() {
        return this._acceptUrl;
    }

    set acceptUrl(value) {
        this._acceptUrl = value;
    }

    get rejectUrl() {
        return this._rejectUrl;
    }

    set rejectUrl(value) {
        this._rejectUrl = value;
    }

    get confirmYn() {
        return this._confirmYn;
    }

    set confirmYn(value) {
        this._confirmYn = value;
    }

    get confirmDt() {
        return this._confirmDt;
    }

    set confirmDt(value) {
        this._confirmDt = value;
    }

    get deletedYn() {
        return this._deletedYn;
    }

    set deletedYn(value) {
        this._deletedYn = value;
    }

    get createUserKey() {
        return this._createUserKey;
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
        return this._modifyUserKey;
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

    get keyword() {
        return this._keyword;
    }

    set keyword(value) {
        this._keyword = value;
    }

    get language() {
        return this._language;
    }

    set language(value) {
        this._language = value;
    }

    get company() {
        return this._company;
    }

    set company(value) {
        this._company = value;
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

    get alarm(){
        return new Alarm(
            this._messageId, //메시지ID
            this._roomId, //채팅방ID
            this._sendUserKey, //보낸사용자KEY
            this._sendSystem, //알림요청시스템
            this._receiveUserKey, //받는사용자KEY
            this._alarmType, //알림Type
            this._templateCode, //메시지템플릿코드
            this._templateBody, //알림발송요청문구(String JSON)
            this._templateMessage, //템플릿메시지
            this._messageText, //메시저(plain Text - 메시지 검색용)
            this._messageContent, //메시지컨텐츠
            this._linkText, //링크버튼명
            this._linkUrl, //링크URL
            this._acceptUrl, //수락URL
            this._rejectUrl, //거절URL
            this._confirmYn, //확인상태코드[Y:수락, N:거절, null:대기]
            this._confirmDt, // 확인일시
            this._deletedYn, //삭제상태
            this._createUserKey, //생성자
            this._createDt, //생성일시
            this._modifyUserKey, //수정자
            this._modifyDt, //수정일시
            this._keyword, //메시지 조회
            this._language, //템플릿언어코드
            this._company,
            this._createDtFormatted,
            this._modifyDtFormatted
        )
    }
    awpMessageAlarm(loginInfo){
        return new AWPMessageAlarm(
            loginInfo
            ,Number(this._messageId)
            ,this.alarm
            ,null)
    }
}
