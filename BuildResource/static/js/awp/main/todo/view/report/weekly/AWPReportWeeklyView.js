class AWPReportWeeklyView {
    constructor(func, loginInfo) {
        this._applicationElement = null
        this._subViewElement = null
        this._contentViewElement = null
        this._func = func;
        this._loginInfo = loginInfo;
        this._weeklyGrid = null;
        this._paginationInfo = null;
        this._pageSie = 20;
        this._yearSelectBox = null;
        this._monthSelectBox = null;
        this._weeklySelectBox = null;
        this._mergeReportIdtList = [];

    }

    weeklyReportCreateButton(element){
        element.querySelector("#aiCallBtn").style.display = "block";
        element.querySelector("#cancelReport").style.display = "block";
        element.querySelector("#saveReport").style.display = "none";
        element.querySelector("#deleteReport").style.display = "none";
    }

    showButton(element){
        element.querySelector("#aiCallBtn").style.display = "block";
        element.querySelector("#deleteReport").style.display = "block";
        element.querySelector("#saveReport").style.display = "block";
        element.querySelector("#cancelReport").style.display = "block";
    }

    hideButton(element){
        element.querySelector("#aiCallBtn").style.display = "none";
        element.querySelector("#deleteReport").style.display = "none";
        element.querySelector("#saveReport").style.display = "none";
        element.querySelector("#cancelReport").style.display = "none";
    }

    hideModal(element){
        element.style.display = "none";
        element.style.visibility = "hidden";
        element.style.opacity = "0";
    }

    showModal(element){
        element.style.opacity  = "1";
        element.style.display  = "flex";
        element.style.visibility  = "visible";
    }

    init(applicationElement){
        this._applicationElement = applicationElement
        this._subViewElement = document.querySelector('.sub');
        this._contentViewElement = document.querySelector('.contents');
        //그다음 화면 그리는 액션 추가 해주세요.
        this.drawReportWeeklyView(this._contentViewElement);
    }

    // 주간보고서 View 처리
    drawReportWeeklyView(contentViewElement){
        fetch(`/report/main/weekly`, {method: "GET"})
            .then(response => response.text())
            .then(htmlString => contentViewElement.querySelector('#weeklyDiv').innerHTML = this._func.parseData(htmlString))
            .then(() => this.initToastGrid()) // 토스트그리드 init
            .then(() => this.setDatePicker()) // datePicker 이벤트 등록
            .then(() => this.setSelectBox(contentViewElement)) // selectBox 이벤트 등록
            .then(() => this.setWeeklyBtn(contentViewElement)) // 주차 검색 이벤트 등록
            .then(() => this.setInitReportWeeklyData("weekly"))// 최초(조회초건 변경) 그리드 데이터 세팅
            .then(() => this.setViewReportEvent(contentViewElement))
            .then(() => this.setWriteReportEvent(contentViewElement)) // 주간보고 작성하기 모달 기본 세팅
            .then(() => this.setMergeReportEvent(contentViewElement)) // 주간보고 합치기 모달 기본 세팅
            .catch(error => this._func.showToastModal("에러 발생:", error));
    }

    // 토스트그리드 init
    initToastGrid(){
        if(this._weeklyGrid){
            this._weeklyGrid.destroy();
        }

        this._weeklyGrid = new Grid({
            el: document.getElementById("grid"),
            minBodyHeight: 300,
            language: {noData: '작성된 보고서가 없습니다.'},
            contextMenu: null,
            data: [],
            scrollX: false,
            scrollY: false,
            rowHeaders: [
                {type: 'checkbox', header: '<label class="check__label"><input type="checkbox" class="check__input" name="_checked" /><span class="check__style"></span></label>', width: 60, renderer: {type: CheckboxRenderer},},
            ],
            header: {height: 42,},
            minRowHeight: 48,
            columns: [
                {header: 'wkReportId', name: 'wkReportId', align: "center", hidden:true},
                {header: 'reportUserKey', name: 'reportUserKey', align: "center", hidden:true},
                {header: 'mergeFlag', name: 'mergeFlag', align: "center", hidden:true},
                {header: 'reportYyyymmWeek', name: 'reportYyyymmWeek', align: "center", hidden:true},
                {header: 'workFromDt', name: 'workFromDt', align: "center", hidden:true},
                {header: 'workToDt', name: 'workToDt', align: "center", hidden:true},
                {header: 'nextWorkFromDt', name: 'nextWorkFromDt', align: "center", hidden:true},
                {header: 'nextWorkToDt', name: 'nextWorkToDt', align: "center", hidden:true},
                {header: '번호', name: 'rowNum', align: "center", width: 60,},
                {header: "보고서명", name: "wkReportNm", align: "left", renderer: {type: addButtonRenderer, options: [
                            {btnType: 'is-download', btnIcon: 'is-24 is-popup-24', click: (row) => {this.showWkReportDetail(row.wkReportId, row.mergeFlag, row.reportUserKey);}}
                        ]
                    }, sortable: true
                },
                {header: "상태", name: "reportStatusNm", align: "center", width: 80, sortable: true},
                {header: "작성자", name: "reportUserNm", align: "center", width: 90, sortable: true},
                {header: "소속부서", name: "reportOrgNm", align: "center", width: 150, sortable: true},
                {header: "업무기간", name: "workDt", align: "center", width: 200, sortable: true},
                {header: "작성일시", name: "createDt", align: "center", width: 180, sortable: true},
            ],
        });

    }

    // 리포트(주간, 통합) 상세보기
    showWkReportDetail(wkReportId, mergeFlag, reportUserKey){
        TodoWeeklyReportApi.getDetail( {'wkReportId' : wkReportId})
            .then(response => {

                if(reportUserKey === this._loginInfo.userKey){
                    if(mergeFlag === 'N'){
                        const writeReportModal = document.querySelector("#writeReportModal");
                        this.setWeeklyEditModalView(writeReportModal, response.data);
                        this.showModal(writeReportModal);
                    }else{
                        const mergeReportModal = document.querySelector("#mergeReportModal");
                        this.setMergeDetailModalView(mergeReportModal, response.data);
                        this.showModal(mergeReportModal);
                    }
                }else{
                    const viewReportModal = document.querySelector("#viewReportModal");
                    this.setReportModalView(viewReportModal, response.data);
                    this.showModal(viewReportModal);
                }

            })
            .catch(error => this._func.showToastModal("주간 보고서 정보를 불러오는 중 오류가 발생하였습니다.", error))
    }

    // datePicker 이벤트 등록
    setDatePicker(){
        const today = new Date();
        const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const mainRangePicker = new DatePicker.createRangePicker({
            startpicker: {date: firstDayOfMonth, input: '#search__start', container: '#search__start_container',},
            endpicker: {date: today, input: '#search__end', container: '#search__end_container',},
            format: 'YYYY-MM-dd',
            language: 'ko',
            //selectableRanges: [[today, new Date(today.getFullYear() + 1, today.getMonth(), today.getDate())]],
        });

        // `startPicker` 변경 이벤트
        mainRangePicker.getStartpicker().on('change', () => {
            const startDate = mainRangePicker.getStartDate();
            const endDate = mainRangePicker.getEndDate();

            if(endDate < startDate){
                mainRangePicker.setEndDate(startDate);
            }
        });

        const dateInputs = document.querySelectorAll(
            "#search__start, #search__end"
        );

        dateInputs.forEach(input => {
            input.addEventListener("input", (ev) => {
                ev.target.value = ev.target.value.replace(/\/{2,}/g, "/"); // 연속된 슬래시 제거
                this._func.setDateFormat(ev);
            });
        });
    }

    // selectBox 이벤트 등록
    setSelectBox(contentViewElement) {
        new SelectBox('.listSearchSelect', {
            data: [{label: '전체', value: 'all'}, {label: '보고서명', value: 'reportNm'}, {label: '내용', value: 'contents'},],
            showIcon: true,
        });

        contentViewElement.querySelector(".form__searchBtn").addEventListener("click", () =>  {
            this.setInitReportWeeklyData("search");
            // if(this._func.searchInputCheck()){} // 2글자 제한 해제
        });

        contentViewElement.querySelector(".form__search").addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                this.setInitReportWeeklyData("search");
                // if(this._func.searchInputCheck()){} // 2글자 제한 해제
            }
        });
    }

    // weeklyButton 이벤트 등록
    setWeeklyBtn(contentViewElement){
        // weeklyBtn 변경 처리
        contentViewElement.querySelectorAll('.toggleRadio__input').forEach(input => {
            input.addEventListener('click', event => {
                if (event.target.checked) {
                    this.setInitReportWeeklyData("weekly");
                }
            });
        });

        // 왼쪽 버튼 (-1월)
        contentViewElement.querySelector("#prevMonthBtn").addEventListener('click', () => this.changeWeeklyList(contentViewElement, -1));

        // 오른쪽 버튼 (+1월)
        contentViewElement.querySelector("#nextMonthBtn").addEventListener('click', () => this.changeWeeklyList(contentViewElement, 1));
    }

    // weeklyList 변경처리
    changeWeeklyList(contentViewElement, change) {
        const reportYyyymm = contentViewElement.querySelector("#reportYyyymm");
        const viewReportYyyymm = contentViewElement.querySelector("#viewReportYyyymm");

        // YYYYMM → 연도 및 월 추출
        let year = parseInt(reportYyyymm.value.substring(0, 4), 10);
        let month = parseInt(reportYyyymm.value.substring(4, 6), 10) - 1; // JS 월은 0부터 시작

        // 날짜 업데이트 (이전/다음 월)
        let currentDate = new Date(year, month);
        currentDate.setMonth(currentDate.getMonth() + change);

        // YYYYMM 형식으로 업데이트
        const newYyyymm = currentDate.getFullYear() + String(currentDate.getMonth() + 1).padStart(2, '0');
        reportYyyymm.value = newYyyymm;
        viewReportYyyymm.textContent = `${currentDate.getFullYear()}년 ${String(currentDate.getMonth() + 1).padStart(2, '0')}월`;

        const weekListDiv = contentViewElement.querySelector(".toggleRadio");

        // 새로운 요소를 DocumentFragment에 먼저 생성 (DOM 조작 최소화)
        const fragment = document.createDocumentFragment();

        // "전체" 버튼 추가
        const allLabel = document.createElement("label");
        allLabel.classList.add("toggleRadio__label");
        allLabel.innerHTML = `<input type="radio" name="reportYyyymmWeek" class="toggleRadio__input has-value" value="all" checked=""><span class="toggleRadio__text">전체</span>`;
        fragment.appendChild(allLabel);

        // 주차 리스트 가져오기
        TodoWeeklyReportApi.getWeeklyList(newYyyymm)
            .then(response => {
                response.data.forEach(week => {
                    const weekLabel = document.createElement("label");
                    weekLabel.classList.add("toggleRadio__label");
                    weekLabel.innerHTML = `<input type="radio" name="reportYyyymmWeek" class="toggleRadio__input has-value" value="${week.weekValue}"><span class="toggleRadio__text">${week.weekNm}</span>`;
                    fragment.appendChild(weekLabel);
                });

                // 주차 Element 교체
                weekListDiv.replaceChildren(fragment);
            })
            .then(() => {
                contentViewElement.querySelectorAll('.toggleRadio__input').forEach(input => {
                    input.addEventListener('change', event => {
                        if (event.target.checked) {
                            console.log("선택된 값:", event.target.value);
                            this.setInitReportWeeklyData("weekly");
                        }
                    });
                });
            })
            .then(() => this.setInitReportWeeklyData("weekly"))
            .catch(error => this._func.showToastModal("주차 리스트 조회 오류가 발생하였습니다.", error));
    }

    //최초 그리드 데이터 세팅
    setInitReportWeeklyData(type){
        const contentViewElement = this._contentViewElement;
        const pageSize = this._pageSie;

        // 주간보고서 조회 파라미터(기본)
        let searchData = {'limit' : pageSize, 'offset' : 0};

        if(type === "weekly"){
            const searchRadio = contentViewElement.querySelector('input[name="reportYyyymmWeek"]:checked').value;
            const reportYyyyMm = contentViewElement.querySelector("#reportYyyymm");

            if(searchRadio === "all")   searchData.reportYyyymm = reportYyyyMm.value;
            else                        searchData.reportYyyymmWeek = searchRadio;
        }else if(type === "search"){
            const selectedItem = contentViewElement.querySelector(".tui-select-box-item.tui-select-box-selected").getAttribute("data-value");
            const searchKeys = {reportNm: "wklyReportNm", contents: "reportContents", all: "all"};

            searchData.workFromDt = contentViewElement.querySelector("#search__start").value; //업무 시작일
            searchData.workToDt = contentViewElement.querySelector("#search__end").value; //업무 종료일
            searchData[searchKeys[selectedItem]] = contentViewElement.querySelector(".form__search").value;  // 조건
        }

        this._func.showLoading("조회 중입니다.");
        TodoWeeklyReportApi.list(searchData)
            .then(response => {
                const weeklyReportList = response.data.contents;
                if(weeklyReportList.length === 0){
                    this._weeklyGrid.resetData([]);
                    this.setPagination(response.data.totalCount, type);
                    contentViewElement.querySelector("#totalCount").textContent = 0;
                }else{
                    const gridData = weeklyReportList.map(report => ({
                        wkReportId : report.wkReportId,
                        reportUserKey : report.reportUserKey,
                        mergeFlag : report.mergeFlag,
                        reportYyyymmWeek : report.reportYyyymmWeek,
                        workFromDt : report.workFromDt,
                        workToDt : report.workToDt,
                        nextWorkFromDt : report.nextWorkFromDt,
                        nextWorkToDt : report.nextWorkToDt,
                        rowNum : report.rowNum,
                        wkReportNm : report.wkReportNm,
                        reportStatusNm : report.reportStatusNm,
                        reportUserNm : report.reportUserNm,
                        reportOrgNm : report.reportOrgNm,
                        workDt : report.workFromDt+" ~ "+report.workToDt,
                        createDt : report.createDt
                    }));
                    this._weeklyGrid.resetData(gridData);
                    this.setPagination(response.data.totalCount, type);
                    contentViewElement.querySelector("#totalCount").textContent = response.data.totalCount;
                }
            })
            .then(() => {
                // 보고서 상태에 따른 cell 속성변경
                this._weeklyGrid.getData().forEach(row => {
                    if(row.reportStatusNm === '작성중')        this._weeklyGrid.addCellClassName(row.rowKey, 'reportStatusNm', 'text-point-3');
                    else if(row.reportStatusNm === '작성실패')  this._weeklyGrid.addCellClassName(row.rowKey, 'reportStatusNm', 'text-system-danger');

                    if(row.mergeFlag === 'Y'){
                        this._weeklyGrid.addRowClassName(row.rowKey, 'bg-blue-200');
                    }
                });
                // 선택시 테두리 안보이기
                this._weeklyGrid.on("focusChange", (ev) => {ev.stop();});
            })
            .catch(error => this._func.showToastModal("보고서 데이터 조회 중 오류가 발생하였습니다.", error))
            .finally(() => this._func.hideLoading());
    }

    // 페이지 변경
    setPagination(totCount, type){
        const weeklyGrid = this._weeklyGrid;
        const pageSize = this._pageSie;
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
            // 주간보고서 조회 파라미터(기본)
            let searchData = {'limit' : pageSize, 'offset' : (page-1) * pageSize};

            if(type === "weekly"){
                const searchRadio = contentViewElement.querySelector('input[name="reportYyyymmWeek"]:checked').value;
                const reportYyyyMm = contentViewElement.querySelector("#reportYyyymm");

                if(searchRadio === "all")   searchData.reportYyyymm = reportYyyyMm.value;
                else                        searchData.reportYyyymmWeek = searchRadio;
            }else if(type === "search"){
                const selectedItem = contentViewElement.querySelector(".tui-select-box-item.tui-select-box-selected").getAttribute("data-value");
                const searchKeys = {reportNm: "wklyReportNm", contents: "reportContents", all: "all"};

                searchData.workFromDt = contentViewElement.querySelector("#search__start").value; //업무 시작일
                searchData.workToDt = contentViewElement.querySelector("#search__end").value; //업무 종료일
                searchData[searchKeys[selectedItem]] = contentViewElement.querySelector(".form__search").value;  // 조건
            }
            this._func.showLoading("조회 중입니다.");
            TodoWeeklyReportApi.list(searchData)
                .then(response => {
                    const weeklyReportList = response.data.contents;
                    if(weeklyReportList.length === 0){
                        weeklyGrid.resetData([]);
                    }else{
                        const gridData = weeklyReportList.map(report => ({
                            wkReportId : report.wkReportId,
                            mergeFlag : report.mergeFlag,
                            reportYyyymmWeek : report.reportYyyymmWeek,
                            workFromDt : report.workFromDt,
                            workToDt : report.workToDt,
                            nextWorkFromDt : report.nextWorkFromDt,
                            nextWorkToDt : report.nextWorkToDt,
                            rowNum : report.rowNum,
                            wkReportNm : report.wkReportNm,
                            reportStatusNm : report.reportStatusNm,
                            reportUserNm : report.reportUserNm,
                            reportOrgNm : report.reportOrgNm,
                            workDt : report.workFromDt+" ~ "+report.workToDt,
                            createDt : report.createDt
                        }));
                        weeklyGrid.resetData(gridData);
                    }
                })
                .then(() => {
                    // 보고서 상태에 따른 cell 속성변경
                    weeklyGrid.getData().forEach(row => {
                        if(row.reportStatusNm === '작성중')        weeklyGrid.addCellClassName(row.rowKey, 'reportStatusNm', 'text-point-3');
                        else if(row.reportStatusNm === '작성실패')  weeklyGrid.addCellClassName(row.rowKey, 'reportStatusNm', 'text-system-danger');

                        if(row.mergeFlag === 'Y'){
                            weeklyGrid.addRowClassName(row.rowKey, 'bg-blue-200');
                        }
                    });

                    // 선택시 테두리 안보이기
                    weeklyGrid.on("focusChange", (ev) => {ev.stop();});
                })
                .catch(error => this._func.showToastModal("보고서 데이터 조회 중 오류가 발생하였습니다.", error))
                .finally(() => this._func.hideLoading());
        }
    }

    // 주간보고서 상세보기
    setReportModalView(element, detailInfo){
        element.querySelector("#reportTitle").textContent = detailInfo.wkReportNm; // 보고서명
        element.querySelector("#orgNm").textContent = detailInfo.reportOrgNm; // 소속부서
        const thisWorkDt = detailInfo.workFromDt + ' ~ ' + detailInfo.workToDt;
        element.querySelector("#thisWorkDt").textContent = thisWorkDt; // 업무기간
        element.querySelector("#userNm").textContent = detailInfo.reportUserNm; // 작성자명
        element.querySelector("#writeDt").textContent = detailInfo.createDt; // 작성일시

        element.querySelector("#thisWeekPeriod").textContent = detailInfo.thisWeekPeriod; //
        element.querySelector("#nextWeekPeriod").textContent = detailInfo.nextWeekPeriod; //

        element.querySelector("#thisWeekText").textContent = detailInfo.thisWeekText; //
        element.querySelector("#thisWeekConts").value = detailInfo.thisWeekConts; //
        element.querySelector("#nextWeekText").textContent = detailInfo.nextWeekText; //
        element.querySelector("#nextWeekConts").value = detailInfo.nextWeekConts; //

        element.querySelector("#reportEtcConts").value = detailInfo.reportEtcConts; //
    }



    // 주간보고서 상세보기
    setWeeklyEditModalView(element, detailInfo){

        // View와 modify Modal을 같이 사용하여 버튼 활성/비활성 처리
        if(detailInfo.reportUserKey === this._loginInfo.userKey) {
            this.showButton(element); // 내가 작성한 경우만 수정 가능
        } else {
            this.hideButton(element); // 내가 작성하지 않은 경우 수정 불가능
        }

        // 상세 데이터 세팅
        element.querySelector("#modalTitle").textContent = "주간보고 수정하기"; // Modal Title
        element.querySelector("#modalType").value = "modify"; // Modal Mode
        element.querySelector("#wkReportId").value = detailInfo.wkReportId; //보고서 아이디

        const writeDate__start = element.querySelector("#writeDate__start"); // 업무시작일
        element.querySelector("#writeDate__end").value = detailInfo.workToDt; // 업무종료일
        element.querySelector("#writeNextDate__start").value = detailInfo.nextWorkFromDt; // 차주업무시작일
        element.querySelector("#writeNextDate__end").value = detailInfo.nextWorkToDt; // 차주업무종료일
        element.querySelector("#orgNm").textContent = detailInfo.reportOrgNm; // 작성부서
        element.querySelector("#userNm").textContent = detailInfo.reportUserNm; // 작성자
        element.querySelector("#writeDt").textContent = detailInfo.updateDt; // 작성일시

        element.querySelector("#thisWeekPeriod").value = detailInfo.thisWeekPeriod; // 금주실적기간
        element.querySelector("#thisWeekText").value = detailInfo.thisWeekText; // 금주실적텍스트
        element.querySelector("#thisWeekConts").value = detailInfo.thisWeekConts; // 주간보고 금주 내용

        element.querySelector("#nextWeekPeriod").value = detailInfo.nextWeekPeriod; // 차주계획기간
        element.querySelector("#nextWeekText").value = detailInfo.nextWeekText; // 차주계획텍스트
        element.querySelector("#nextWeekConts").value = detailInfo.nextWeekConts; // 주간보고 차주 내용

        element.querySelector("#reportEtcConts").value = detailInfo.reportEtcConts; // 주간보고 기타 내용

        // 초기화
        element.querySelector('.yearSelectBox').innerHTML = ''; // 모든 옵션을 제거
        element.querySelector('.monthSelectBox').innerHTML = ''; // 모든 옵션을 제거
        element.querySelector('.weeklySelectBox').innerHTML = ''; // 모든 옵션을 제거

        // 연도 selectBox
        const currentDate = new Date();
        const yearList = Array.from({ length: currentDate.getFullYear() - 2024 + 1 }, (_, i) => {
            const year = 2024 + i;
            if(year === parseInt(detailInfo.reportYyyymmWeek.slice(0,4), 10)){
                return { label: `${year}`, value: `${year}`, selected: true };
            } else{
                return { label: `${year}`, value: `${year}` };
            }
        });
        this._yearSelectBox = new SelectBox('.yearSelectBox', {data: yearList, showIcon: true});
        this._yearSelectBox.on('change', ev => this.weeklyChange("date", element)); // 년도 selectBox 변경시(변경된 년+월로 주차를 새로 구한다.)

        // 월 selectBox
        const monthList = Array.from({ length: 12 }, (_, i) => {
            const month = i + 1;
            if(month === parseInt(detailInfo.reportYyyymmWeek.slice(4,6), 10)){
                return { label: `${month}`, value: `${month}`, selected: true };
            } else {
                return { label: `${month}`, value: `${month}` };
            }
        });
        this._monthSelectBox = new SelectBox('.monthSelectBox', {data: monthList, showIcon: true});
        this._monthSelectBox.on('change', ev => this.weeklyChange("date", element)); // 월 selectBox 변경 시(변경된 년+월로 주차를 새로 구한다.)

        TodoWeeklyReportApi.getWeeklyList(detailInfo.reportYyyymmWeek.slice(0,6))
            .then(response => {
                const weeklyList = response.data.map(weekInfo => ({
                    label: weekInfo.week,
                    value: weekInfo.week,
                    selected: weekInfo.week ===  parseInt(detailInfo.reportYyyymmWeek.slice(6,8), 10)
                }));

                this._weeklySelectBox = new SelectBox('.weeklySelectBox', {data: weeklyList, showIcon: true});
                this._weeklySelectBox.on('change', ev => this.weeklyChange("weekly", element));

                return response.data;
            })
            .then(weeklyList => { // datePicker 초기화
                let datePickertoday = new Date();
                const writeDatePicker = new DatePicker('#writeDate__start_container', {
                    input: {element: '#writeDate__start', format: 'YYYY-MM-dd',},
                    language: 'ko',
                    selectableRanges: [[new Date(datePickertoday.getFullYear(), datePickertoday.getMonth()-1, datePickertoday.getDate())
                        , new Date(datePickertoday.getFullYear()+1, datePickertoday.getMonth(), datePickertoday.getDate())]],
                });

                element.querySelector("#writeDate__start").value = detailInfo.workFromDt; // 업무시작일

                // 시작일 변경 시 종료일 워킹데이 기준+5일 추가 처리
                writeDatePicker.on('change', () => {
                    let plusDay = 4;
                    let nextDate = new Date(element.querySelector("#writeDate__start").value);
                    while (plusDay > 0) {
                        nextDate.setDate(nextDate.getDate() + 1); // 하루 증가
                        if (![0, 6].includes(nextDate.getDay())) plusDay--; // 주말(일:0, 토:6) 제외
                    }
                    element.querySelector("#writeDate__end").value = nextDate.toISOString().split('T')[0];

                    // 차주 시작일
                    plusDay = 1;
                    let nextWeekStartDate = new Date(element.querySelector("#writeDate__end").value);
                    while (plusDay > 0) {
                        nextWeekStartDate.setDate(nextWeekStartDate.getDate() + 1); // 하루 증가
                        if (![0, 6].includes(nextWeekStartDate.getDay())) plusDay--; // 주말(일:0, 토:6) 제외
                    }
                    element.querySelector("#writeNextDate__start").value = nextWeekStartDate.toISOString().split('T')[0];

                    // 차주 종료일
                    plusDay = 4;
                    let nextWeekEndDate = new Date(element.querySelector("#writeNextDate__start").value);
                    while (plusDay > 0) {
                        nextWeekEndDate.setDate(nextWeekEndDate.getDate() + 1); // 하루 증가
                        if (![0, 6].includes(nextWeekEndDate.getDay())) plusDay--; // 주말(일:0, 토:6) 제외
                    }
                    element.querySelector("#writeNextDate__end").value = nextWeekEndDate.toISOString().split('T')[0];
                });
            })
            .then(() => this.showModal(element))
            .catch(error => this._func.showToastModal("주차 정보를 불러오는데 실패하였습니다.", error))
    }

    weeklyChange(type, element){
        const workYear =  this._yearSelectBox.getSelectedItem()?.value;
        const workMonth = this._monthSelectBox.getSelectedItem()?.value;

        TodoWeeklyReportApi.getWeeklyList(workYear+String(workMonth).padStart(2, '0'))
            .then(response => {
                const weeklyList = response.data.map(weekInfo => ({
                    label: weekInfo.week,
                    value: weekInfo.week
                }));

                if(type === "date"){  // 년 혹은 월 변견
                    const weeklySelectBoxElement = element.querySelector('.weeklySelectBox');
                    weeklySelectBoxElement.innerHTML = ''; // 모든 옵션을 제거

                    this._weeklySelectBox = new SelectBox('.weeklySelectBox', {data: weeklyList, showIcon: true});
                    this._weeklySelectBox.on('change', ev => this.weeklyChange("weekly", element));
                }

                return response.data;
            })
            .then(weeklyList => {
                const workWeekly = this._weeklySelectBox.getSelectedItem()?.value;
                weeklyList.forEach(week => {
                    if(String(week.week) === workWeekly)  this.changeWriteReportModalTextContents(week)
                });
            })
            .catch(error => this._func.showToastModal("주차 정보 조회 오류가 발생하였습니다.", error))
    }

    changeWriteReportModalTextContents(weekInfo){
        const writeReportModal = document.querySelector("#writeReportModal");

        writeReportModal.querySelector("#writeDate__start").value = weekInfo.monday;
        writeReportModal.querySelector("#writeDate__end").value = weekInfo.friday;

        const [thisYear, thisMonth, thisDay] = weekInfo.monday.split("-");
        const [nextYear, nextMonth, nextDay] = weekInfo.friday.split("-");
        // 금주실적 기간
        const thisWeekPeriodText = `${thisMonth}월 ${thisDay}일 ~ ${nextMonth}월 ${nextDay}일`;
        const thisWeekPeriod = writeReportModal.querySelector("#thisWeekPeriod");
        thisWeekPeriod.value = thisWeekPeriodText;

        // 차주계획 기간(시작)
        const nextStartDate = new Date(weekInfo.friday);
        nextStartDate.setDate(nextStartDate.getDate() + 3);

        // 차주계획 기간(종료)
        const nextEndDate = new Date(weekInfo.friday);
        nextEndDate.setDate(nextEndDate.getDate() + 7);

        const nextWeekPeriodText = String(nextStartDate.getMonth() + 1).padStart(2, "0") + "월 " + String(nextStartDate.getDate()).padStart(2, "0") + "일"
            + " ~ "
            + String(nextEndDate.getMonth() + 1).padStart(2, "0") + "월 " + String(nextEndDate.getDate()).padStart(2, "0") + "일";

        const nextWeekPeriod = writeReportModal.querySelector("#nextWeekPeriod");
        nextWeekPeriod.value = nextWeekPeriodText;

        const writeNextDateStart = writeReportModal.querySelector("#writeNextDate__start");
        const writeNextDateEnd = writeReportModal.querySelector("#writeNextDate__end");
        writeNextDateStart.value = String(nextStartDate.getFullYear()) +"-"+ String(nextStartDate.getMonth() + 1).padStart(2, "0") +"-"+ String(nextStartDate.getDate()).padStart(2, "0")
        writeNextDateEnd.value = String(nextEndDate.getFullYear()) +"-"+String(nextEndDate.getMonth() + 1).padStart(2, "0") +"-"+ String(nextEndDate.getDate()).padStart(2, "0")
    }

    // 보고서 상세보기
    setViewReportEvent(contentViewElement){
        const viewReportModal = document.querySelector("#viewReportModal");

        // 닫기
        viewReportModal.querySelectorAll("#closeBtn, #closeBtn2").forEach(button => {
            button.addEventListener("click", () => {
                this.hideModal(viewReportModal);
            });
        });
    }

    // 주간보고 작성하기
    setWriteReportEvent(contentViewElement) {
        const writeReportModal = document.querySelector("#writeReportModal");

        // 주간보고 작성하기 버튼 Click
        contentViewElement.querySelector("#writeReport").addEventListener("click", ()=> {
            this.setWriteReportModalView(writeReportModal); // 오픈전에 기본정보 세팅
        });

        // x버튼
        writeReportModal.querySelector("#closeBtn").addEventListener("click", () => {
           this.hideModal(writeReportModal)
        });

        // 취소버튼
        writeReportModal.querySelector("#cancelReport").addEventListener("click", () => {
            this.cancelWeeklyReport(writeReportModal)
                .then(() => console.log("취소 처리"))
                .catch(error => this._func.showToastModal("취소 처리 중 오류가 발생하였습니다.", error));
        });

        // 불러오기
        writeReportModal.querySelector("#aiCallBtn").addEventListener("click",  ()=> {
            const writeDateStart = writeReportModal.querySelector("#writeDate__start").value;
            const writeDateEnd = writeReportModal.querySelector("#writeDate__end").value;
            const writeNextDateStart = writeReportModal.querySelector("#writeNextDate__start").value;
            const writeNextDateEnd = writeReportModal.querySelector("#writeNextDate__end").value;

            if(writeDateStart === '' || writeDateEnd === '' || writeNextDateStart === '' || writeNextDateEnd === ''){
                this._func.showToastModal(ALERT_MESSAGES.A017);
                return;
            }

            const requestData = {
                reportUserKey : this._loginInfo.userKey,
                workFromDt : writeDateStart,
                workToDt : writeDateEnd,
                nextWorkFromDt : writeNextDateStart,
                nextWorkToDt : writeNextDateEnd,
            };

            const thisWeekConts = writeReportModal.querySelector("#thisWeekConts").value;
            const nextWeekConts = writeReportModal.querySelector("#nextWeekConts").value;

             if(thisWeekConts === '' && nextWeekConts === ''){
                 this.getAiWeeklyApi(writeReportModal, requestData);
             }else{
                 this.getAiWeeklyApiConfirm(writeReportModal, requestData)
                     .then(() => console.log("보고서 생성 처리"))
                     .catch(error => this._func.showToastModal("취소 처리 중 오류가 발생하였습니다.", error));
             }
        });

        // 삭제
        writeReportModal.querySelector("#deleteReport").addEventListener("click", ()=> {
            this.deleteWeeklyReport(writeReportModal)
                .then(() => console.log("보고서 삭제"))
                .catch(error => this._func.showToastModal("보고서 삭제 처리 중 오류가 발생하였습니다.", error))
        });

        // 저장
        writeReportModal.querySelector("#saveReport").addEventListener("click", () => {
            const writeDateStart = writeReportModal.querySelector("#writeDate__start").value;
            const writeDateEnd = writeReportModal.querySelector("#writeDate__end").value;
            const writeNextDateStart = writeReportModal.querySelector("#writeNextDate__start").value;
            const writeNextDateEnd = writeReportModal.querySelector("#writeNextDate__end").value;

            if(writeDateStart === '' || writeDateEnd === '' || writeNextDateStart === '' || writeNextDateEnd === ''){
                this._func.showToastModal(ALERT_MESSAGES.A017);
                return;
            }

            const thisWeekPeriod = writeReportModal.querySelector("#thisWeekPeriod").value;
            const thisWeekText = writeReportModal.querySelector("#thisWeekText").value;
            const nextWeekPeriod = writeReportModal.querySelector("#nextWeekPeriod").value;
            const nextWeekText = writeReportModal.querySelector("#nextWeekText").value;

            if(thisWeekPeriod === '' || thisWeekText === '' || nextWeekPeriod === '' || nextWeekText === ''){
                this._func.showToastModal(ALERT_MESSAGES.A020);
                return;
            }

            this.saveWeeklyReport(writeReportModal)
                .then(() => console.log("보고서 저장"))
                .catch(error => this._func.showToastModal("보고서 저장 중 오류가 발생하였습니다.", error))
        });

        // 기타 입력 수 계산
        const reportEtcConts = writeReportModal.querySelector("#reportEtcConts");
        const textCnt = writeReportModal.querySelector("#textCnt");
        const maxLength = 500;

        reportEtcConts.addEventListener("input",  ()=> {
            let currentText = reportEtcConts.value;
            if(currentText.length > maxLength){
                this._func.showToastModal(ALERT_MESSAGES.A021);
                reportEtcConts.value = currentText.slice(0, maxLength); // 500자 초과 부분 삭제
            }
            textCnt.textContent = `${reportEtcConts.value.length}`;
        });
    }

    // AI보고서 불러 오기 처리
    getAiWeeklyApi(writeReportModal, requestData){
        this._func.showLoading("보고서 작성 중입니다.");

        TodoWeeklyReportApi.selectAiSendWeeklyData(requestData)
            .then(response => {
                const selectData = response.data;
                const createData = {
                    serviceCd : 'REPORT_WEEKLY',
                    jobResult : `금주 조회기간[${requestData.workFromDt} ~ ${requestData.workToDt}], 차주 조회기간[${requestData.nextWorkFromDt} ~ ${requestData.nextWorkToDt}]`,
                    data : selectData
                }
                AiApi.realTime(createData)
                    .then(response => {
                        // console.log(response.data);
                        const aiData = response.data;
                        if(response.code === 0){
                            writeReportModal.querySelector("#thisWeekConts").value = aiData.this_week;
                            writeReportModal.querySelector("#nextWeekConts").value = aiData.next_week;
                            writeReportModal.querySelector("#saveReport").style.display = "block";
                        }else{
                            this._func.showToastModal("AI실시간 연동 중 오류가 발생하였습니다.", response.msg);
                        }
                        this._func.hideLoading();
                    })
                    .catch(error => {
                        this._func.showToastModal("AI실시간 연동 중 오류가 발생하였습니다.", error);
                        this._func.hideLoading();
                    })
            })
            .catch(error => {
                this._func.showToastModal("주간보고서 불러오기 중 오류가 발생하였습니다.", error);
                this._func.hideLoading();
            })
        // .finally(() => this._func.hideLoading());
    }

    getAiWeeklyApiConfirm = async (writeReportModal, requestData) => {
        const result = await this._func.customConfirm(ALERT_MESSAGES.A055);
        if (result) {
            this.getAiWeeklyApi(writeReportModal, requestData);
        }
    }

    saveWeeklyReport = async (writeReportModal) => {
        const result = await this._func.customConfirm(ALERT_MESSAGES.A005);
        if (result){
            const wkReportId = writeReportModal.querySelector("#wkReportId").value;
            const yyyy = this._yearSelectBox.getSelectedItem()?.value;
            const mm = this._monthSelectBox.getSelectedItem()?.value.padStart(2, '0');
            const weekly = this._weeklySelectBox.getSelectedItem()?.value.padStart(2, '0');

            let reportSaveInfo = {
                wkReportNm: `${yyyy}년 ${mm}월 ${weekly}주차 주간보고`,
                reportYyyymmWeek: `${yyyy}${mm}${weekly}`,
                workFromDt: writeReportModal.querySelector("#writeDate__start").value,
                workToDt: writeReportModal.querySelector("#writeDate__end").value,
                nextWorkFromDt: writeReportModal.querySelector("#writeNextDate__start").value,
                nextWorkToDt: writeReportModal.querySelector("#writeNextDate__end").value,
                thisWeekPeriod: writeReportModal.querySelector("#thisWeekPeriod").value,
                thisWeekText: writeReportModal.querySelector("#thisWeekText").value,
                thisWeekConts: writeReportModal.querySelector("#thisWeekConts").value,
                nextWeekPeriod: writeReportModal.querySelector("#nextWeekPeriod").value,
                nextWeekText: writeReportModal.querySelector("#nextWeekText").value,
                nextWeekConts: writeReportModal.querySelector("#nextWeekConts").value,
                reportEtcConts: writeReportModal.querySelector("#reportEtcConts").value
            }

            if(wkReportId === ''){
                reportSaveInfo.mergeFlag = "N";
                reportSaveInfo.reportStatus = "COMPLETED";
                reportSaveInfo.reportOrgKey = this._loginInfo.orgKey;
                reportSaveInfo.reportUserKey = this._loginInfo.userKey;
                reportSaveInfo.useFlag = 1
                this.reportSave(reportSaveInfo, writeReportModal);
            }else{
                reportSaveInfo.wkReportId = writeReportModal.querySelector("#wkReportId").value;
                this.reportUpdate(reportSaveInfo, writeReportModal);
            }
        }
    }

    cancelWeeklyReport = async (element) => {
        const result = await this._func.customConfirm(ALERT_MESSAGES.A004);
        if (result) {
            this.hideModal(element);
        }
    }

    deleteWeeklyReport = async (writeReportModal) => {
        const result = await this._func.customConfirm(ALERT_MESSAGES.A014);
        if (result) {
            let deleteData = {"wkReportId" : writeReportModal.querySelector("#wkReportId").value};
            this.reportDelete(deleteData, writeReportModal);
        }
    }


    // 보고서작성 Modal 초기화
    setWriteReportModalView(element){
        // 버튼 초기화
        this.weeklyReportCreateButton(element);

        element.querySelector("#modalTitle").textContent = "주간보고 작성하기";
        element.querySelector("#modalType").value = "write";
        element.querySelector("#wkReportId").value = ""; //주간보고서 아이디

        // 년, 월, 주차 초기화
        element.querySelector('.yearSelectBox').innerHTML = ''; //모든 옵션을 제거
        element.querySelector('.monthSelectBox').innerHTML = ''; //모든 옵션을 제거
        element.querySelector('.weeklySelectBox').innerHTML = ''; //모든 옵션을 제거

        // 캘린더 초기화
        element.querySelector("#writeDate__start_container").innerHTML = "";
        element.querySelector("#writeDate__start").value = "";
        element.querySelector("#writeDate__end_container").innerHTML = "";
        element.querySelector("#writeDate__end").value = "";
        element.querySelector("#writeNextDate__start").value = "";
        element.querySelector("#writeNextDate__end").value = "";

        element.querySelector("#thisWeekText").value = "금주실적"; //금주실적텍스트
        element.querySelector("#thisWeekConts").value = ""; //주간보고 금주 내용
        element.querySelector("#nextWeekText").value = "차주계획"; //차주계획텍스트
        element.querySelector("#nextWeekConts").value = ""; //주간보고 차주 내용
        element.querySelector("#reportEtcConts").value = ""; //주간보고 기타 내용
        element.querySelector("#textCnt").textContent = "0"; // 기타 글자수

        element.querySelector("#orgNm").textContent = this._loginInfo.orgNm; // 소속부서
        element.querySelector("#userNm").textContent = this._loginInfo.userNm; // 작성자
        element.querySelector("#writeDt").textContent = ""; // 작성일시

        const currentDate = new Date();
        const yearList = Array.from({ length: currentDate.getFullYear() - 2024 + 1 }, (_, i) => {
            const year = 2024 + i;
            if(year === currentDate.getFullYear())  return { label: `${year}`, value: `${year}`, selected: true };
            else                                    return { label: `${year}`, value: `${year}` };
        });
        this._yearSelectBox = new SelectBox('.yearSelectBox', {data: yearList, showIcon: true});

        // 년도 selectBox 변경시(변경된 년+월로 주차를 새로 구한다.)
        this._yearSelectBox.on('change', ev => this.weeklyChange("date", element));

        const currentMonth = new Date().getMonth()+1;
        const monthList = Array.from({ length: 12 }, (_, i) => {
            const month = i + 1;
            if(month === currentMonth)  return { label: `${month}`, value: `${month}`, selected: true };
            else                        return { label: `${month}`, value: `${month}` };
        });
        this._monthSelectBox = new SelectBox('.monthSelectBox', {data: monthList, showIcon: true});

        // 월 selectBox 변경 시(변경된 년+월로 주차를 새로 구한다.)
        this._monthSelectBox.on('change', ev => this.weeklyChange("date", element));

        const yyyyMm = currentDate.getFullYear() + String(currentDate.getMonth() + 1).padStart(2, '0');
        const today = parseInt(currentDate.getFullYear() + String(currentDate.getMonth() + 1).padStart(2, '0') + String(currentDate.getDate()).padStart(2, '0'), 10);
        TodoWeeklyReportApi.getWeeklyList(yyyyMm)
            .then(response => {
                const weeklyList = response.data.map(weekInfo => ({
                    label: weekInfo.week,
                    value: weekInfo.week,
                    selected: today >= parseInt(weekInfo.startDate, 10) && today <= parseInt(weekInfo.endDate, 10)
                }));

                this._weeklySelectBox = new SelectBox('.weeklySelectBox', {data: weeklyList, showIcon: true});

                this._weeklySelectBox.on('change', ev => this.weeklyChange("weekly", element));
                return response.data;
            })
            .then(weeklyList => {
                // datePicker 초기화

                let datePickertoday = new Date();
                const writeDatePicker = new DatePicker('#writeDate__start_container', {
                    input: {element: '#writeDate__start', format: 'YYYY-MM-dd',},
                    language: 'ko',
                    selectableRanges: [[new Date(datePickertoday.getFullYear(), datePickertoday.getMonth()-1, datePickertoday.getDate())
                        , new Date(datePickertoday.getFullYear()+1, datePickertoday.getMonth(), datePickertoday.getDate())]],
                });

                // 시작일 변경 시 종료일 워킹데이 기준+5일 추가 처리
                writeDatePicker.on('change', () => {
                    let plusDay = 4;
                    let nextDate = new Date(element.querySelector("#writeDate__start").value);
                    while (plusDay > 0) {
                        nextDate.setDate(nextDate.getDate() + 1); // 하루 증가
                        if (![0, 6].includes(nextDate.getDay())) plusDay--; // 주말(일:0, 토:6) 제외
                    }
                    element.querySelector("#writeDate__end").value = nextDate.toISOString().split('T')[0];

                    // 차주 시작일
                    plusDay = 1;
                    let nextWeekStartDate = new Date(element.querySelector("#writeDate__end").value);
                    while (plusDay > 0) {
                        nextWeekStartDate.setDate(nextWeekStartDate.getDate() + 1); // 하루 증가
                        if (![0, 6].includes(nextWeekStartDate.getDay())) plusDay--; // 주말(일:0, 토:6) 제외
                    }
                    element.querySelector("#writeNextDate__start").value = nextWeekStartDate.toISOString().split('T')[0];

                    // 차주 종료일
                    plusDay = 4;
                    let nextWeekEndDate = new Date(element.querySelector("#writeNextDate__start").value);
                    while (plusDay > 0) {
                        nextWeekEndDate.setDate(nextWeekEndDate.getDate() + 1); // 하루 증가
                        if (![0, 6].includes(nextWeekEndDate.getDay())) plusDay--; // 주말(일:0, 토:6) 제외
                    }
                    element.querySelector("#writeNextDate__end").value = nextWeekEndDate.toISOString().split('T')[0];

                });

                // 업무기간(초기화)
                weeklyList.forEach(week => {
                    if(today >= parseInt(week.startDate, 10) && today <= parseInt(week.endDate, 10)){
                        this.changeWriteReportModalTextContents(week);
                    }
                });

                // 날짜 포멧 고정
                element.querySelector("#writeDate__start").addEventListener("input", (ev) => {
                    ev.target.value = ev.target.value.replace(/\/{2,}/g, "/"); // 연속된 슬래시 제거
                    this._func.setDateFormat(ev);
                });

            })
            .then(() => this.showModal(element))
            .catch(error => this._func.showToastModal("주차 정보를 불러오는데 실패하였습니다.", error))
    }

    // 통합 보고서 상세 보기
    setMergeDetailModalView(element, detailInfo){

        element.querySelector("#deleteReport").style.display = "block";
        element.querySelector("#saveReport").style.display = "block";
        element.querySelector("#cancelReport").style.display = "block";

        //element.querySelector("#modalTitle").textContent = "주간보고 수정하기";
        element.querySelector("#modalType").value = "modify";
        element.querySelector("#wkReportId").value = detailInfo.wkReportId;

        element.querySelector("#wkReportNm").textContent = detailInfo.wkReportNm; //보고서명
        element.querySelector("#orgNm").textContent = detailInfo.reportOrgNm; //소속부서
        element.querySelector("#workDt").textContent = detailInfo.workFromDt + ' ~ ' + detailInfo.workToDt; //업무기간
        element.querySelector("#userNm").textContent = detailInfo.reportUserNm; //작성자
        element.querySelector("#writeDt").textContent = detailInfo.updateDt; //작성일시

        element.querySelector("#thisWeekPeriod").value = detailInfo.thisWeekPeriod; //금주실적기간
        element.querySelector("#thisWeekText").value = detailInfo.thisWeekText; //금주실적텍스트
        element.querySelector("#thisWeekConts").value = detailInfo.thisWeekConts; //주간보고 금주 내용

        element.querySelector("#nextWeekPeriod").value = detailInfo.nextWeekPeriod; //차주계획기간
        element.querySelector("#nextWeekText").value = detailInfo.nextWeekText; //차주계획텍스트
        element.querySelector("#nextWeekConts").value = detailInfo.nextWeekConts; //주간보고 차주 내용

        element.querySelector("#reportEtcConts").value = detailInfo.reportEtcConts; //주간보고 기타 내용
    }

    // 주간보고 합치기 모달 기본 세팅
    setMergeReportEvent(contentViewElement) {
        const mergeReportModal = document.querySelector("#mergeReportModal");
        // 보고서 합하기
        contentViewElement.querySelector("#mergeReport").addEventListener("click", ()=> {
            const selectedRows = this._weeklyGrid.getCheckedRows();

            if (selectedRows.length === 0) {
                this._func.showAlertModal(ALERT_MESSAGES.A051);
                return;
            }

            const firstReport = selectedRows[0];
            this._mergeReportIdtList = [];

            // 보고서 명과 업무기간이 같은지 확인
            for (const row of selectedRows) {
                if (firstReport.wkReportNm !== row.wkReportNm || firstReport.workDt !== row.workDt) {
                    this._func.showAlertModal(ALERT_MESSAGES.A019);
                    return;
                }
                this._mergeReportIdtList.push(row.wkReportId);
            }

            const requestData = {
                mergeReportIdtList: this._mergeReportIdtList
            }

            // 로딩 처리
            this._func.showLoading("보고서 작성 중입니다.");

            TodoWeeklyReportApi.selectAiSendMergeData(requestData)
                .then(response => {
                    const selectData = response.data;
                    const mergeData = {
                        serviceCd : 'REPORT_MERGE',
                        jobResult : `보고서 조회기간[${firstReport.workFromDt} ~ ${firstReport.workToDt}], 보고서번호[${this._mergeReportIdtList.toString()}]`,
                        data : selectData
                    }

                    AiApi.realTime(mergeData)
                        .then(response => {
                            const aiData = response.data;
                            if(response.code === 0){
                                mergeReportModal.querySelector("#modalType").value = "merge";
                                mergeReportModal.querySelector("#wkReportId").value = "";

                                mergeReportModal.querySelector("#wkReportNm").textContent = firstReport.wkReportNm; //보고서명
                                mergeReportModal.querySelector("#reportYyyymmWeek").value = firstReport.reportYyyymmWeek;
                                mergeReportModal.querySelector("#workFromDt").value = firstReport.workFromDt;
                                mergeReportModal.querySelector("#workToDt").value = firstReport.workToDt;
                                mergeReportModal.querySelector("#nextWorkFromDt").value = firstReport.nextWorkFromDt;
                                mergeReportModal.querySelector("#nextWorkToDt").value = firstReport.nextWorkToDt;
                                mergeReportModal.querySelector("#orgNm").textContent = this._loginInfo.orgNm; //소속부서
                                mergeReportModal.querySelector("#workDt").textContent = firstReport.workFromDt + ' ~ ' + firstReport.workToDt; //업무기간
                                mergeReportModal.querySelector("#userNm").textContent = this._loginInfo.userNm; //작성자

                                const thisWorkFromDt = firstReport.workFromDt.split('.');
                                const thisWorkToDt = firstReport.workToDt.split('.');
                                mergeReportModal.querySelector("#thisWeekPeriod").value = `${thisWorkFromDt[1]}월 ${thisWorkFromDt[2]}일 ~ ${thisWorkToDt[1]}월 ${thisWorkToDt[2]}일`;
                                mergeReportModal.querySelector("#thisWeekText").value = "금주실적";
                                mergeReportModal.querySelector("#thisWeekConts").value = aiData.this_week;

                                const nextWorkFromDt = firstReport.nextWorkFromDt.split('.');
                                const nextWorkToDt = firstReport.nextWorkToDt.split('.');
                                mergeReportModal.querySelector("#nextWeekPeriod").value = `${nextWorkFromDt[1]}월 ${nextWorkFromDt[2]}일 ~ ${nextWorkToDt[1]}월 ${nextWorkToDt[2]}일`;
                                mergeReportModal.querySelector("#nextWeekText").value = "차주계획";
                                mergeReportModal.querySelector("#nextWeekConts").value = aiData.next_week;

                                mergeReportModal.querySelector("#reportEtcConts").value = aiData.etc;
                                mergeReportModal.querySelector("#cancelReport").style.display = "block";
                                mergeReportModal.querySelector("#saveReport").style.display = "block";
                                mergeReportModal.querySelector("#deleteReport").style.display = "none";

                                this.showModal(mergeReportModal);
                            }else{
                                this._func.showToastModal("AI실시간 연동 중 오류가 발생하였습니다.", response.msg);
                            }
                            this._func.hideLoading();
                        })
                        .catch(error => {
                            this._func.showToastModal("AI실시간 연동 중 오류가 발생하였습니다.", error);
                            this._func.hideLoading();
                        });
                })
                .catch(error => {
                    this._func.showToastModal("주간보고서 합하기 목록 조회 중 오류가 발생하였습니다.", error);
                    this._func.hideLoading();
                })
                // .finally(() => this._func.hideLoading())
        });

        // x버튼
        mergeReportModal.querySelector("#closeBtn").addEventListener("click", () => {
            this.hideModal(mergeReportModal)
        });

        // 취소버튼
        mergeReportModal.querySelector("#cancelReport").addEventListener("click", () => {
            this.cancelWeeklyReport(mergeReportModal)
                .then(() => console.log("취소 처리"))
                .catch(error => this._func.showToastModal("취소 처리 중 오류가 발생하였습니다.", error));
        });

        // 저장 버튼
        mergeReportModal.querySelector("#saveReport").addEventListener("click", ()=> {
            const thisWeekPeriod = mergeReportModal.querySelector("#thisWeekPeriod").value;
            const thisWeekText = mergeReportModal.querySelector("#thisWeekText").value;
            const nextWeekPeriod = mergeReportModal.querySelector("#nextWeekPeriod").value;
            const nextWeekText = mergeReportModal.querySelector("#nextWeekText").value;

            if(thisWeekPeriod === '' || thisWeekText === '' || nextWeekPeriod === '' || nextWeekText === ''){
                this._func.showToastModal(ALERT_MESSAGES.A020);
                return;
            }

            this.saveMergeReport(mergeReportModal)
                .then(() => console.log("저장 처리"))
                .catch(error => this._func.showToastModal("저장 처리 중 오류가 발생하였습니다.", error));
        });

        // 삭제 버튼
        mergeReportModal.querySelector("#deleteReport").addEventListener("click", ()=> {
            this.deleteMergeReport(mergeReportModal)
                .then(() => console.log("삭제 처리"))
                .catch(error => this._func.showToastModal("삭제 처리 중 오류가 발생하였습니다.", error))
        });

    }

    saveMergeReport = async (mergeReportModal) => {
        const result = await this._func.customConfirm(ALERT_MESSAGES.A005);
        if (result) {
            const wkReportId = mergeReportModal.querySelector("#wkReportId").value;
            let reportSaveInfo = {
                thisWeekPeriod : mergeReportModal.querySelector("#thisWeekPeriod").value,
                thisWeekText : mergeReportModal.querySelector("#thisWeekText").value,
                thisWeekConts : mergeReportModal.querySelector("#thisWeekConts").value,
                nextWeekPeriod : mergeReportModal.querySelector("#nextWeekPeriod").value,
                nextWeekText : mergeReportModal.querySelector("#nextWeekText").value,
                nextWeekConts : mergeReportModal.querySelector("#nextWeekConts").value,
                reportEtcConts : mergeReportModal.querySelector("#reportEtcConts").value
            }
            if(wkReportId === ''){
                reportSaveInfo.mergeFlag = "Y";
                reportSaveInfo.wkReportNm = mergeReportModal.querySelector("#wkReportNm").textContent;
                reportSaveInfo.reportYyyymmWeek = mergeReportModal.querySelector("#reportYyyymmWeek").value;
                reportSaveInfo.workFromDt = mergeReportModal.querySelector("#workFromDt").value;
                reportSaveInfo.workToDt = mergeReportModal.querySelector("#workToDt").value;
                reportSaveInfo.nextWorkFromDt = mergeReportModal.querySelector("#nextWorkFromDt").value;
                reportSaveInfo.nextWorkToDt = mergeReportModal.querySelector("#nextWorkToDt").value;
                reportSaveInfo.reportStatus = "COMPLETED";
                reportSaveInfo.reportOrgKey = this._loginInfo.orgKey;
                reportSaveInfo.reportUserKey = this._loginInfo.userKey;
                reportSaveInfo.useFlag = 1
                reportSaveInfo.mergeReportIdtList = this._mergeReportIdtList;
                this.reportSave(reportSaveInfo, mergeReportModal);
            }else{
                reportSaveInfo.wkReportId = mergeReportModal.querySelector("#wkReportId").value;
                this.reportUpdate(reportSaveInfo, mergeReportModal);
            }
        }
    }

    cancelMergeReport = async (element) => {
        const result = await this._func.customConfirm(ALERT_MESSAGES.A004);
        if (result) {
            this.hideModal(element);
        }
    }

    deleteMergeReport = async (mergeReportModal) => {
        const result = await this._func.customConfirm(ALERT_MESSAGES.A014);
        if (result) {
            let deleteData = {"wkReportId" :  mergeReportModal.querySelector("#wkReportId").value};
            this.reportDelete(deleteData, mergeReportModal);
        }
    }

    // 보고서 저장
    reportSave(saveData, element) {
        TodoWeeklyReportApi.regist(saveData)
            .then(response => {
                // console.log("저장결과=", response);
                this.hideModal(element);
                this.setInitReportWeeklyData("weekly");
            })
            .catch(error => this._func.showToastModal("보고서 저장 중 오류가 발생하였습니다.", error));
    }
    
    // 보고서 수정
    reportUpdate(updateData, element){
        TodoWeeklyReportApi.updateReport(updateData)
            .then(response => {
                // console.log("수정결과=", response);
                this.hideModal(element);
            })
            .catch(error => this._func.showToastModal("보고서 수정 중 오류가 발생하였습니다.", error));
    }

    // 보고서 삭제
    reportDelete(deleteData, element){
        TodoWeeklyReportApi.deleteReport(deleteData)
            .then(response => {
                // console.log("주간보고 작성 상태값을 취소(삭제)로 변경 완료하였습니다..", response);
                this.hideModal(element);
                this.setInitReportWeeklyData("weekly");
            })
            .catch(error => this._func.showToastModal("주간보고 작성 상태값 취소(삭제) 변경 실패하였습니다.", error));
    }


}