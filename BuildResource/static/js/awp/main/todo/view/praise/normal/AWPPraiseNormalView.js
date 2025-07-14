class AWPPraiseNormalView {
    constructor(func) {
        this._applicationElement = null;
        this._subViewElement = null;
        this._contentViewElement = null;
        this._func = func;
    }

    init(applicationElement) {
        this._applicationElement = applicationElement
        this._subViewElement = document.querySelector('.subSidebar');
        this._contentViewElement = document.querySelector('.contents');
        this.drawPraiseView();
    }

    // 칭찬하기 현황 View 처리
    drawPraiseView() {
        fetch(`/praise/main/normal`, {method: "GET"})
            .then(response => response.text())
            .then(htmlString => this._contentViewElement.querySelector('.contents__inner').innerHTML = this._func.parseData(htmlString))
            .catch(error => this._func.showToastModal("에러 발생:", error));
    }
}