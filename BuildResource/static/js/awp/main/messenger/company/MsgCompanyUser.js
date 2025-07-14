class CompanyUser {
    constructor(data) {
        this._userKey = data.userKey ?? null;
        this._userId = data.userId ?? null;
        this._userPassword = null;
        this._userNm = data.userNm ?? null;
        this._thumbImgType = data.thumbImgType ?? null;
        this._thumbImgPath = data.thumbImgPath ?? null;
        this._email = data.email ?? null;
        this._jobPosition = data.jobPosition ?? null;
        this._jobResponsibility = data.jobResponsibility ?? null;
        this._empNo = data.empNo ?? null;
        this._orgCd = data.orgCd ?? null;
        this._orgCdPath = data.orgCdPath ?? null;
        this._orgNmPath = data.orgNmPath ?? null;
        this._orgNm = data.orgNm ?? null;
        this._loginStatus = data.loginStatus ?? null; // LOGIN / LOGOFF / AWAY
        this._loginDt = data.loginDt ?? null;
        this._mobilePhoneNo = data.mobilePhoneNo ?? null;
        this._officePhoneNo = data.officePhoneNo ?? null;
        this._orgKey = data.orgKey ?? null;
        this._authCd = data.authCd ?? null;
        this._useFlag = data.useFlag ?? null; // Active status
        this._createDt = data.createDt ?? null;
        this._createUserKey = data.createUserKey ?? null;
    }


    get userKey() {
        return this._userKey;
    }

    set userKey(value) {
        this._userKey = value;
    }

    get userId() {
        return this._userId;
    }

    set userId(value) {
        this._userId = value;
    }

    get userNm() {
        return this._userNm;
    }

    set userNm(value) {
        this._userNm = value;
    }

    get thumbImgType() {
        return this._thumbImgType;
    }

    set thumbImgType(value) {
        this._thumbImgType = value;
    }

    get thumbImgPath() {
        return this._thumbImgPath;
    }

    set thumbImgPath(value) {
        this._thumbImgPath = value;
    }

    get email() {
        return this._email;
    }

    set email(value) {
        this._email = value;
    }

    get jobPosition() {
        return this._jobPosition;
    }

    set jobPosition(value) {
        this._jobPosition = value;
    }

    get jobResponsibility() {
        return this._jobResponsibility;
    }

    set jobResponsibility(value) {
        this._jobResponsibility = value;
    }

    get empNo() {
        return this._empNo;
    }

    set empNo(value) {
        this._empNo = value;
    }

    get orgCd() {
        return this._orgCd;
    }

    set orgCd(value) {
        this._orgCd = value;
    }

    get orgCdPath() {
        return this._orgCdPath;
    }

    set orgCdPath(value) {
        this._orgCdPath = value;
    }

    get orgNmPath() {
        return this._orgNmPath;
    }

    set orgNmPath(value) {
        this._orgNmPath = value;
    }

    get orgNm() {
        return this._orgNm;
    }

    set orgNm(value) {
        this._orgNm = value;
    }

    get loginStatus() {
        return this._loginStatus;
    }

    set loginStatus(value) {
        this._loginStatus = value;
    }

    get loginDt() {
        return this._loginDt;
    }

    set loginDt(value) {
        this._loginDt = value;
    }

    get mobilePhoneNo() {
        return this._mobilePhoneNo;
    }

    set mobilePhoneNo(value) {
        this._mobilePhoneNo = value;
    }

    get officePhoneNo() {
        return this._officePhoneNo;
    }

    set officePhoneNo(value) {
        this._officePhoneNo = value;
    }

    get orgKey() {
        return this._orgKey;
    }

    set orgKey(value) {
        this._orgKey = value;
    }

    get authCd() {
        return this._authCd;
    }

    set authCd(value) {
        this._authCd = value;
    }

    get useFlag() {
        return this._useFlag;
    }

    set useFlag(value) {
        this._useFlag = value;
    }

    get createDt() {
        return this._createDt;
    }

    set createDt(value) {
        this._createDt = value;
    }

    get createUserKey() {
        return this._createUserKey;
    }

    set createUserKey(value) {
        this._createUserKey = value;
    }
}
