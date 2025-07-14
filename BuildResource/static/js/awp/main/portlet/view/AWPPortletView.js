class AWPPortletView {
    constructor(main,user) {
        this._main = main;
        this._user = user;
    }


    get main() {
        return this._main;
    }

    get user() {
        return this._user;
    }

    makeView(applicationElement,type) {

        switch (type) {
            case PORTLET_VIEW_TYPE.MAIN:
                return this.main.init(applicationElement);
            case PORTLET_VIEW_TYPE.ENV_USER:
                return this.user.init(applicationElement);
            default: throw Error();
        }
    }

}