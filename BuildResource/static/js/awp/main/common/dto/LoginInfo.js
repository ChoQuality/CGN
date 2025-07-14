class LoginInfo {
    constructor(corpId,
                orgKey,
                orgNm,
                userKey,
                userNm,
                userImg,
                selectedDb,
                token) {
        this._corpId = corpId ?? null;
        this._orgKey = orgKey ?? null;
        this._orgNm = orgNm ?? null;
        this._userKey = userKey ?? null;
        this._userNm = userNm ?? null;
        this._userImg = userImg ?? null;
        this._selectedDb = selectedDb ?? null;
        this._token = token ?? null;
    }

    get corpId() {
        return Number(this._corpId);
    }

    set corpId(value) {
        this._corpId = value;
    }

    get orgKey() {
        return Number(this._orgKey);
    }

    set orgKey(value) {
        this._orgKey = value;
    }

    get orgNm() {
        return this._orgNm;
    }

    set orgNm(value) {
        this._orgNm = value;
    }


    get userImg() {
        return this._userImg;
    }

    set userImg(value) {
        this._userImg = value;
    }

    get userKey() {
        return Number(this._userKey);
    }

    set userKey(value) {
        this._userKey = value;
    }

    get userNm() {
        return this._userNm;
    }

    set userNm(value) {
        this._userNm = value;
    }

    get selectedDb() {
        return this._selectedDb;
    }

    set selectedDb(value) {
        this._selectedDb = value;
    }

    get token() {
        return this._token;
    }

    set token(value) {
        this._token = value;
    }
}
