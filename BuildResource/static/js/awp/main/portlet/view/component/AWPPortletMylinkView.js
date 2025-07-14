class AWPPortletMylinkView {
    constructor(func, loginInfo) {
        this._func = func;
        this._loginInfo = loginInfo;
        this._applicationElement = null;
        this._portletMyInfoElement = null;
        this._portletLinkListElement = null;
    }

    /***********************************************************************************************************
    * 화면 초기화 설정
    ************************************************************************************************************/
    init(portletViewElement){
        this._applicationElement = portletViewElement;
        this._portletMyInfoElement = portletViewElement.querySelector('.myLink');
        this._portletLinkListElement = portletViewElement.querySelector('.linkList');

        //그다음 화면 그리는 액션 추가 해주세요.
        this.drawPortletMainView(this._portletLinkListElement);
    }

    // 포틀릿 View 처리
    drawPortletMainView(linkList){

        // 기존 목록 초기화 (클리어)
        linkList.innerHTML = "";

        fetch('/api/link/getPortletMylink', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            })
            .then(response => response.json())
            .then(response => {
                // Portlet 목록 조회
                response.data.forEach(linkDtl => {
                    const liElement = document.createElement("li");
                    const aEle = document.createElement("a");
                    aEle.href = linkDtl.linkUrl;
                    aEle.classList.add("linkList__item");
                    aEle.textContent = linkDtl.linkNm;

                    const iEle = document.createElement("i");
                    iEle.classList.add("icon", "is-24", "is-go-round-24");

                    aEle.appendChild(iEle);
                    liElement.appendChild(aEle);
                    linkList.appendChild(liElement);
                });

            })
            .catch(error => this._func.showToastModal("에러 발생:", error));
    }
}
