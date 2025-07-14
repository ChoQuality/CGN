class AWPPraiseGlobalView {
    constructor(func) {
        this._applicationElement = null
        this._subViewElement = null
        this._contentViewElement = null
        this._func = func;
        this._praiseGrid = null;
        this._paginationInfo = null;
        this._pageSize = 20;
    }

    init(applicationElement){
        this._applicationElement = applicationElement
        this._subViewElement = document.querySelector('.subSidebar');
        this._contentViewElement = document.querySelector('.contents');
        //그다음 화면 그리는 액션 추가 해주세요.

        this.drawPraiseGlobalView();
    }

    // 칭찬하기 현황(전사) View 처리
    drawPraiseGlobalView() {
        fetch(`/praise/main/global`, {method: "GET"})
            .then(response => response.text())
            .then(htmlString => this._contentViewElement.querySelector('#contentsDiv').innerHTML = this._func.parseData(htmlString))
            .then(() => this.initPraiseGrid(this._contentViewElement)) // 최초 그리드세팅
            .then(() => this.setInitPraiseData(this._contentViewElement))// 최초 그리드 데이터 세팅
            .then(() => this.setSearchEvent(this._contentViewElement)) // 검색관련 EVENT 처리
            .then(() => this.excelDownloadEvent(this._contentViewElement)) // 엑셀다운로드 관련 EVENT 처리
            .catch(error => this._func.showToastModal("에러 발생:", error));
    }

    // 칭찬하기 현황(전사) grid 처리
    initPraiseGrid(contentViewElement){
        if(this._praiseGrid){
            this._praiseGrid.destroy();
        }

        this._praiseGrid = new Grid({
            el: document.getElementById("grid"),
            language: {emptyMessage: "조회된 내역이 없습니다."}, // No Data 문구 변경
            contextMenu: null,
            data: [],
            scrollX: false,
            scrollY: false,
            header: {height: 42,},
            minRowHeight: 48,
            columns: [
                { header: 'No', name :'rowNum', align:'center', width:60, editor:false},
                { header: '이름', name: 'praiseUserNm', align:'left', width:180, editor:false, sortable: true},
                { header: '소속부서', name: 'praiseOrgNm', align:'center', editor:false, sortable: true},
                { header: '받은 칭찬 개수', name: 'receiveCnt', align:'center', width:180, editor:false, sortable: true},
                { header: '보낸 칭찬 개수', name: 'sendCnt', align:'center', width:180, editor:false, sortable: true},
                { header: '합계', name: 'totCnt', align:'center', width:180, editor:false, sortable: true},
            ],
        });
    }

    // 최초 그리드 데이터 세팅
    setInitPraiseData(contentViewElement){
        const praiseGrid = this._praiseGrid;
        const pageSize = this._pageSize;
        const searchText = contentViewElement.querySelector("#realSearchText").value;
        const selectedItem = contentViewElement.querySelector("#realSearchType").value;
        const searchKeys = {name: "userNm", team: "orgNm", all: "all"};
        const orderBy = contentViewElement.querySelector('input[name="toggleCheck1"]:checked').value;

        let searchData = {'limit' : pageSize, 'offset' : 0, 'orderBy' : orderBy}
        searchData[searchKeys[selectedItem]] = searchText;
        todoPraiseApi.list(searchData)
            .then(response => {
                const praiseList = response.data.contents;
                if(praiseList.length === 0){
                    praiseGrid.resetData([]);
                    this.setPagination(0);
                }else{
                    const gridData = praiseList.map(praise => ({
                        rowNum : praise.rowNum,
                        praiseUserNm : praise.praiseUserNm,
                        praiseOrgNm : praise.praiseOrgNm,
                        receiveCnt : praise.receiveCnt,
                        sendCnt : praise.sendCnt,
                        totCnt : praise.totCnt
                    }));
                    praiseGrid.resetData(gridData);
                    this.setPagination(response.data.totalCount);

                    // 선택시 테두리 안보이기
                    praiseGrid.on("focusChange", (ev) => {
                        ev.stop();
                    });
                }
            })
            .catch(error => this._func.showToastModal("칭찬하기 데이터 조회 오류가 발생하였습니다.", error))
    }

    setPagination(totCount){
        const praiseGrid = this._praiseGrid;
        const pageSize = this._pageSize;
        const contentViewElement = this._contentViewElement;
        this._paginationInfo = new tui.Pagination(contentViewElement.querySelector('.tui-pagination'), {
            totalItems: totCount,
            itemsPerPage: pageSize,
            visiblePages: 5,
            centerAlign: true
        });

        // 페이지 이벤트 처리
        this._paginationInfo.on('afterMove', function(event) {
            const currentPage = event.page;
            setNextPage(currentPage);
        });

        // 페이지 이동 처리
        function setNextPage(page){
            const searchText = contentViewElement.querySelector("#realSearchText").value;
            const selectedItem = contentViewElement.querySelector("#realSearchType").value;
            const searchKeys = {name: "userNm", team: "orgNm", all: "all"};
            const orderBy = contentViewElement.querySelector('input[name="toggleCheck1"]:checked').value;

            let searchData = {
                'limit' : pageSize,
                'offset' : (page - 1) * pageSize,
                'orderBy' : orderBy
            }
            searchData[searchKeys[selectedItem]] = searchText;

            todoPraiseApi.list(searchData)
                .then(response => {
                    const praiseList = response.data.contents;
                    if(praiseList.length === 0){
                        praiseGrid.resetData([]);
                    }else{
                        const gridData = praiseList.map(praise => ({
                            rowNum : praise.rowNum,
                            praiseUserNm : praise.praiseUserNm,
                            praiseOrgNm : praise.praiseOrgNm,
                            receiveCnt : praise.receiveCnt,
                            sendCnt : praise.sendCnt,
                            totCnt : praise.totCnt
                        }));
                        praiseGrid.resetData(gridData);

                        // 선택시 테두리 안보이기
                        praiseGrid.on("focusChange", (ev) => {
                            ev.stop();
                        });
                    }
                })
                .catch(error => this._func.showToastModal("칭찬하게 데이터(페이지변경) 조회 오류가 발생하였습니다.", error))
        }
    }

    setSearchEvent(contentViewElement){
        // ## 내림차순/오름차순 체크 처리
        const radios = contentViewElement.querySelectorAll(".toggleRadio__label");
        radios.forEach(radio => {
            radio.addEventListener("click", () => {
                const checkRadio = radio.querySelector("input[type='radio']");
                checkRadio.checked = true;
                this.setInitPraiseData(contentViewElement);
            })
        });

        // 검색조건 처리
        const selectBox = contentViewElement.querySelector('.tui-select-box-input');
        const selectOptionElement = contentViewElement.querySelector('.tui-select-box-dropdown');
        const searchTypeElement = contentViewElement.querySelectorAll('.tui-select-box-item');
        const selectedTypeName = contentViewElement.querySelector('.tui-select-box-placeholder');

        // selectBox 클릭
        selectBox.addEventListener("click", function(){
            selectBox.classList.toggle("tui-select-box-open");
            selectOptionElement.classList.toggle('tui-select-box-hidden')
        });

        // 조회구분 변경
        searchTypeElement.forEach(function(type) {
            type.addEventListener("click", function() {
                selectedTypeName.textContent = this.textContent;

                searchTypeElement.forEach(item => item.classList.remove("tui-select-box-selected")); // 기존 선택 클래스 제거
                this.classList.add("tui-select-box-selected"); // 선택 클래스 추가

                selectBox.classList.toggle("tui-select-box-open");
                selectOptionElement.classList.toggle('tui-select-box-hidden')

                if(this.getAttribute("data-value") === "all"){
                    contentViewElement.querySelector(".form__search").value = "";
                }
            });

            // mouse over
            type.addEventListener("mouseover", function(){
                type.classList.add("tui-select-box-highlight");
            });

            // mouse out
            type.addEventListener("mouseout", function(){
                type.classList.remove("tui-select-box-highlight");
            });
        });

        // 다른곳 클릭시 처리
        contentViewElement.addEventListener('click', function(e) {
            if(!selectBox.contains(e.target)) {
                if(selectBox.classList.contains("tui-select-box-open")){
                    selectBox.classList.remove("tui-select-box-open");
                }

                if(!selectOptionElement.classList.contains("tui-select-box-hidden")){
                    selectOptionElement.classList.add("tui-select-box-hidden");
                }
            }
        });

        // 검색버튼 클릭
        contentViewElement.querySelector(".form__searchBtn").addEventListener("click", () =>  {
            this.searchEvent(contentViewElement);
        });

        document.querySelector(".form__search").addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                this.searchEvent(contentViewElement);
            }
        });
    }

    searchEvent(contentViewElement){
        const selectedItem = contentViewElement.querySelector(".tui-select-box-item.tui-select-box-selected").getAttribute("data-value");
        const searchText = contentViewElement.querySelector(".form__search");

        contentViewElement.querySelector("#realSearchText").value = searchText.value;
        contentViewElement.querySelector("#realSearchType").value = selectedItem;

         this.setInitPraiseData(contentViewElement);
    }


    // 엑셀다운로드
    excelDownloadEvent(contentViewElement){
        contentViewElement.querySelector("#exportExcel").addEventListener("click", () => {
            this._func.showLoading("다운로드 중입니다.");
            const searchText = contentViewElement.querySelector("#realSearchText").value;
            const selectedItem = contentViewElement.querySelector("#realSearchType").value;
            const searchKeys = {name: "userNm", team: "orgNm", all: "all"};
            const orderBy = contentViewElement.querySelector('input[name="toggleCheck1"]:checked').value;

            let searchData = {
                'orderBy' : orderBy
            }
            searchData[searchKeys[selectedItem]] = searchText;
            todoPraiseApi.listExcelDownload(searchData)
                .then(response => {
                    const today = new Date();
                    const formattedDate = today.toISOString().split('T')[0];
                    const url = window.URL.createObjectURL(response);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = "칭찬하기("+formattedDate+").xlsx"; // 다운로드 파일명 지정
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    window.URL.revokeObjectURL(url);
                })
                .catch(error => this._func.showToastModal("엑셀 다운로드 데이터 조회 중 오류가 발생하였습니다.", error))
                .finally(() => this._func.hideLoading())
        });

        contentViewElement.querySelector("#exportRowExcel").addEventListener("click", () => {
            this._func.showLoading("다운로드 중입니다.");
            const searchText = contentViewElement.querySelector("#realSearchText").value;
            const selectedItem = contentViewElement.querySelector("#realSearchType").value;
            const searchKeys = {name: "userNm", team: "orgNm", all: "all"};

            let searchData = {}
            searchData[searchKeys[selectedItem]] = searchText;
            todoPraiseApi.rowListExcelDownload(searchData)
                .then(response => {
                    const today = new Date();
                    const formattedDate = today.toISOString().split('T')[0];
                    const url = window.URL.createObjectURL(response);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = "칭찬하기("+formattedDate+")상세.xlsx"; // 다운로드 파일명 지정
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    window.URL.revokeObjectURL(url);
                })
                .catch(error => this._func.showToastModal("엑셀 다운로드 데이터 조회 중 오류가 발생하였습니다.", error))
                .finally(() => this._func.hideLoading())
        });
    }

}