class AWPTodoView {
    constructor(dashboard,praise_global,praise_normal,report_general,report_weekly,situation) {
        this._dashboard = dashboard;
        this._praise_global = praise_global;
        this._praise_normal = praise_normal;
        this._report_general = report_general;
        this._report_weekly = report_weekly;
        this._situation = situation;
    }

    get dashboard() {
        return this._dashboard;
    }

    get praise_global() {
        return this._praise_global;
    }

    get praise_normal() {
        return this._praise_normal;
    }

    get report_general() {
        return this._report_general;
    }

    get report_weekly() {
        return this._report_weekly;
    }

    get situation() {
        return this._situation;
    }
    makeView(applicationElement,type) {

        switch (type) {
            case TODO_VIEW_TYPE.DASHBOARD:
                return this.dashboard.init(applicationElement);
            case TODO_VIEW_TYPE.PRAISE_GLOBAL:
                return this.praise_global.init(applicationElement);
            case TODO_VIEW_TYPE.PRAISE_NORMAL:
                return this.praise_normal.init(applicationElement);
            case TODO_VIEW_TYPE.SITUATION:
                return this.situation.init(applicationElement);
            case TODO_VIEW_TYPE.REPORT_WEEKLY:
                return this.report_weekly.init(applicationElement);
            case TODO_VIEW_TYPE.REPORT_GENERAL:
                return this.report_general.init(applicationElement);
            default: throw Error();
        }
    }

}