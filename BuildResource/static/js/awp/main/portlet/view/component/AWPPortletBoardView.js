class AWPPortletBoardView {
    constructor(func, loginInfo) {
        this._func = func;
        this._loginInfo = loginInfo;
        this._applicationElement = null;
        this._portletElement = null;
        this._portletId = null;
    }

    /***********************************************************************************************************
    * 화면 초기화 설정
    ************************************************************************************************************/
    init(portletViewElement, portletId){
        this._portletViewElement = portletViewElement;
        this._portletId = portletId;

        this._portletCardElement = portletViewElement.querySelector('.card');

        //그다음 화면 그리는 액션 추가 해주세요.
        this.drawPortletView(this._portletCardElement);
    }

    // 포틀릿 View 처리
    drawPortletView(viewElement){
        const boardList = viewElement.querySelector('.board');
        // 기존 목록 초기화 (클리어)
        boardList.innerHTML = "";
        const searchBoardOption =
        {
            "portletId": this._portletId
        }
        fetch('/api/works/getBoardList', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(searchBoardOption),
            })
            .then(response => response.json())
            .then(response => {
                response.data.forEach(boardDtl => {
                    const liElement = document.createElement("li");
                    const aEle = document.createElement("a");
                    aEle.href = boardDtl.linkUrl;
                    aEle.classList.add("board__item");

                    const h3Ele = document.createElement("h3");
                    h3Ele.classList.add("board__title");
                    const spanEle = document.createElement("span");
                    switch(boardDtl.typeCd) {
                        case '1' : spanEle.classList.add("text-primary");
                               break;
                        case '2' : spanEle.classList.add("text-point-1");
                               break;
                        case '3' : spanEle.classList.add("text-point-2");
                               break;
                        case '4' : spanEle.classList.add("text-point-3");
                               break;
                        default : spanEle.classList.add("text-primary");
                    }
                    spanEle.textContent = boardDtl.typeNm;
                    h3Ele.textContent = ' ' + boardDtl.title;
                    h3Ele.prepend(spanEle);

                    const divEle = document.createElement("div");
                    divEle.textContent = boardDtl.createDt;
                    divEle.classList.add("date");

                    aEle.appendChild(h3Ele);
                    aEle.appendChild(divEle);
                    liElement.appendChild(aEle);
                    boardList.appendChild(liElement);
                });
            })
            .catch(error => this._func.showToastModal("에러 발생:", error));
    }
}
