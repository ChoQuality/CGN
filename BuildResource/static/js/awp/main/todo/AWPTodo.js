class AWPTodo {
    constructor(func,loginInfo,messenger) {

        this._func = func;
        this._loginInfo = loginInfo;
        this._messenger = messenger;
        this._view = new AWPTodoView(
            new AWPDashBoardView(this._func, this._loginInfo)
            ,new AWPPraiseGlobalView(this._func)
            ,new AWPPraiseNormalView(this._func)
            ,new AWPReportGeneralView(func,loginInfo,messenger)
            ,new AWPReportWeeklyView(this._func, this._loginInfo)
            ,new AWPSituationView(this._func, this._loginInfo)
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