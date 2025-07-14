class AWPPortletTodoView {
    constructor(func, loginInfo) {
        this._func = func;
        this._loginInfo = loginInfo;
        this._portletViewElement = null;
        this._portletCardElement = null;
    }

    /***********************************************************************************************************
    * 화면 초기화 설정
    ************************************************************************************************************/
    init(portletViewElement){
        this._portletViewElement = portletViewElement;
        this._portletCardElement = portletViewElement.querySelector('.card');

        //그다음 화면 그리는 액션 추가 해주세요.
        this.drawPortletView(this._portletCardElement);
    }

    // 포틀릿 View 처리
    drawPortletView(viewElement){
        const boardList = viewElement.querySelector('.board');
        // 기존 목록 초기화 (클리어)
        boardList.innerHTML = "";

        fetch('/api/portlet/getTodoList', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            })
            .then(response => response.json())
            // .then(htmlString => viewElement.innerHTML = this._func.parseData(htmlString))
            .then(response => {
                response.data.forEach(todoDetail => {
                    const liElement = document.createElement("li");
                    const aEle = document.createElement("a");
                    aEle.href = '/todo/main?todoId=' +  todoDetail.todoId;
                    aEle.classList.add("board__item");
                    if(todoDetail.importantYn == '1') {
                        aEle.classList.add("is-important");
                    }
                    if(todoDetail.privateYn == '1') {
                        aEle.classList.add("is-bookmark");
                    }

                    const h3Ele = document.createElement("h3");
                    h3Ele.textContent = todoDetail.todoReqConts;
                    h3Ele.classList.add("board__title");
                    const divEle = document.createElement("div");
                    divEle.classList.add("badge");
                    const dateRange = todoDetail.dateRange;
                    if(dateRange == 'D+0') {
                        divEle.textContent = '오늘';
                    } else if( dateRange.includes('D+')) {
                        divEle.textContent = dateRange;
                        divEle.classList.add("is-delay");
                    } else {
                        divEle.textContent = dateRange;
                        divEle.classList.add("is-dDay");
                    }

                    aEle.appendChild(h3Ele);
                    aEle.appendChild(divEle);
                    liElement.appendChild(aEle);
                    boardList.appendChild(liElement);
                });


            })
            .catch(error => this._func.showToastModal("에러 발생:", error));
    }
}
