class AWPPortlet {
    constructor(func,loginInfo,messenger) {

        this._func = func;
        this._loginInfo = loginInfo;
        this._messenger = messenger;
        this._view = new AWPPortletView(
            new AWPPortletMainView(this._func, this._loginInfo)
            ,new AWPPortletUserView(this._func, this._loginInfo)
        )
    }

    get func() {
        return this._func;
    }

    get loginInfo() {
        return this._loginInfo;
    }

    get messenger() {
        return this._messenger;
    }

    get view() {
        return this._view;
    }
}