class AWPPortletMainView {
    constructor(func, loginInfo) {
        this._func = func;
        this._loginInfo = loginInfo;
        this._applicationElement = null;
        this._contentViewElement = null;
        this._portletViewElement = null;
    }

    /***********************************************************************************************************
    * 화면 초기화 설정
    ************************************************************************************************************/
    init(applicationElement){
        this._applicationElement = applicationElement;
        this._subViewElement = applicationElement.querySelector('.sub');
        this._contentViewElement = applicationElement.querySelector('.main');
        this._portletViewElement = this._contentViewElement.querySelector('.portlet');

        //그다음 화면 그리는 액션 추가 해주세요.
        this.drawPortletMainView(this._portletViewElement);
    }

    // 포틀릿 View 처리
    drawPortletMainView(viewElement){
        fetch(`/portlet/main/list`, {method: "GET"})
            .then(response => response.text())
            .then(htmlString => {

                viewElement.innerHTML = this._func.parseData(htmlString);
                // const portletList = viewElement.querySelectorAll('portlet__group');
                // debugger;

            } )
            .then(() => {
                // Portlet 목록 조회
                const portletList = viewElement.querySelectorAll('.portlet__group');
                portletList.forEach(element => {
                    let pgmNm = element.dataset.pgmnm; // data-type 값 가져오기
                    let portletId = element.dataset.portletid;
                    let portletLinkUrl = element.dataset.linkurl;
                    let portletLinkElement = element.querySelector('.portlet__top > div > button');
                    if(portletLinkElement != undefined) {
                        portletLinkElement.addEventListener("click",  function() {
                            switch (pgmNm) {
                                case PORTLET_COMPONENT_VIEW_TYPE.TODO:
                                case PORTLET_COMPONENT_VIEW_TYPE.MyLink:
                                    window.location.href = portletLinkUrl;
                                    break;
                                default:
                                    /*window.open(portletLinkUrl, '_blank');*/
                            }
                              // replace with your desired URL
                        });
                    }
                    switch (pgmNm) {
                        case PORTLET_COMPONENT_VIEW_TYPE.TODO:
                            new AWPPortletTodoView(this._func, this._loginInfo).init(element);
                            console.log("TODO Portlet Init", pgmNm);
                            break;
                        case PORTLET_COMPONENT_VIEW_TYPE.CALENDAR:
                            console.log("CALENDAR Portlet Init", pgmNm);
                            break;
                        case PORTLET_COMPONENT_VIEW_TYPE.GROUPWARE:
                            console.log("GROUPWARE Portlet Init", pgmNm);
                            break;
                        case PORTLET_COMPONENT_VIEW_TYPE.RESOURCE:
                            console.log("RESOURCE Portlet Init", pgmNm);
                            break;
                        case PORTLET_COMPONENT_VIEW_TYPE.BOARD:
                            new AWPPortletBoardView(this._func, this._loginInfo).init(element, portletId);

                            console.log("BOARD Portlet Init", pgmNm);
                            break;
                        case PORTLET_COMPONENT_VIEW_TYPE.MyLink:
                            new AWPPortletMylinkView(this._func, this._loginInfo).init(element, portletId);
                            console.log("MyLink Portlet Init", pgmNm);
                            break;
                        case PORTLET_COMPONENT_VIEW_TYPE.연차현황:
                            console.log("연차현황 Portlet Init", pgmNm);
                            break;
                        default:
                            console.log("기타 유형 처리", element);
                    }
                });


            })
            .catch(error => this._func.showToastModal("에러 발생:", error));
    }
}
