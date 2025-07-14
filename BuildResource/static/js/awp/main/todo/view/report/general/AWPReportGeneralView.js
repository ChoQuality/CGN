class AWPReportGeneralView {
    constructor(func, loginInfo, messenger) {
        this._applicationElement = null
        this._subViewElement = null
        this._contentViewElement = null
        this._func = func;
        this._loginInfo = loginInfo;
        this._messenger = messenger;
    }

    init(applicationElement) {
        this._applicationElement = applicationElement
        //그다음 화면 그리는 액션 추가 해주세요.
        this.currentDate = new Date();
        this.today = new Date();
        this.reportList = [];
        this.reportRowKey = "";
        this.initSubTileFocus();
        this.initSearchSelect();
        this.initDatePickers();
        this.updateMonthDisplay();
        this.getGeneralReportList("month");
        this.setupEventListeners();
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

    initSubTileFocus() {
        const generalReportElement = document.getElementById('generalReport');
        if (generalReportElement) {
            generalReportElement.classList.add('is-active');
        }
    }

    initSearchSelect() {
        new SelectBox('.listSearchSelect', {
            data: [ {label: '전체', value: 'all'},
                    {label: '리포트명', value: 'reportNm'},
                    {label: '내용', value: 'searchConts'}
            ],
            showIcon: true,
        });
    }

    initDatePickers() {
        const firstDayOfMonth = new Date(this.today.getFullYear(), this.today.getMonth(), 1);
        const mainRangePicker = new DatePicker.createRangePicker({
            startpicker: {date: firstDayOfMonth, input: '#search_start_input', container: '#search_start_container',},
            endpicker: {date: this.today, input: '#search_end_input', container: '#search_end_container',},
            format: 'YYYY-MM-dd',
            language: 'ko'
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
            "#search_start_input, #search_end_input, #write_work_from_dt, #write_work_to_dt"
        );

        dateInputs.forEach(input => {
            input.addEventListener("input", (ev) => {
                ev.target.value = ev.target.value.replace(/\/{2,}/g, "/"); // 연속된 슬래시 제거
                this._func.setDateFormat(ev);
            });
        });
    }

    getGeneralReportList(type) {
        const reportData = this.getSearchReportData();
        if (type === "month") {
            reportData.workFromDt = "";
            reportData.workToDt = "";
            reportData.all = "";
            reportData.reportNm = "";
            reportData.searchConts = "";
        } else {
            reportData.reportYyMm = "";
        }
        this._func.showLoading("조회 중입니다.");
        window.generalReport.getList(reportData)
            .then(response => {
                console.log('getList:', response);
                console.log('getList totalCnt:', response.data.totalCnt);
                this.setTotalCount(response.data.totalCnt);
                this.reportList = response.data.list;
                this.makeTable(response.data.list); //grid 이용시
            })
            .finally(() => this._func.hideLoading());

    }

    getSearchReportData() {
        const currentDate = this.currentDate; // 현재 날짜

        // 연월(YYYYMM) 형식 만들기
        const yearMonth = `${currentDate.getFullYear()}${(currentDate.getMonth() + 1).toString().padStart(2, '0')}`;

        // 검색 기간 입력 값 가져오기
        const workFromDt = document.getElementById('search_start_input').value;
        const workToDt = document.getElementById('search_end_input').value;

        const selectedItem = document.querySelector(".tui-select-box-item.tui-select-box-selected").getAttribute("data-value");
        const searchKeys = {all: "all", reportNm: "reportNm", searchConts: "searchConts"};

        const searchData = {
            reportYyMm: yearMonth,
            workFromDt: workFromDt,
            workToDt: workToDt,
            reportOrgKey: this._loginInfo.orgKey,
            pagePerCnt: 20,
            pageIndex: 1
        }

        // 검색어 입력 값 가져오기
        searchData[searchKeys[selectedItem]] = document.querySelector('.form__search').value;

        return searchData;
    }

    setTotalCount(totalCount) {
        document.getElementById('total_count').textContent = totalCount;
    }

    generateReportData(data) {
        const reportArray = [];

        data.forEach(data => {
            reportArray.push({
                reportNm: data.reportNm,
                reportUserNm: data.reportUserNm,
                reportOrgNm: data.reportOrgNm,
                workDt: this.getWorkDt(data),
                updateDt: data.updateDt
            });
        });

        return reportArray;
    }

    makeTable(data) {
        // grid 요소 확인
        const gridElement = document.getElementById("grid");
        if (!gridElement) {
            console.warn("Grid element not found!");
            return;
        }

        // 기존 그리드가 있으면 제거 (초기화)
        if (this.gridInstance) {
            this.gridInstance.destroy(); // Grid 제거
        }

        // 데이터 변환 (null 체크)
        const tableData = data ? this.generateReportData(data) : [];

        // 새로운 Grid 인스턴스 생성 후 저장
        this.gridInstance = new Grid({
            el: gridElement,
            minBodyHeight: 300,
            pageOptions: {useClient: true, perPage: 20},
            language: {noData: '작성된 보고서가 없습니다.'},
            contextMenu: null,
            data: tableData,
            scrollX: false,
            scrollY: false,
            rowHeaders: [{header: '번호', type: 'rowNum', width: 60,},],
            header: {height: 42,},
            minRowHeight: 48,
            columns: [
                {
                    header: "보고서명",
                    name: "reportNm",
                    align: "left",
                    renderer: {
                        type: addButtonRenderer,
                        options: [
                            {
                                btnType: 'is-download',
                                btnIcon: 'is-24 is-popup-24',
                                click: (e) => {this.openReportViewModal(e.rowKey);}  // 모달에 데이터 전달
                            },
                        ]
                    }, sortable: true
                },
                {header: "작성자", name: "reportUserNm", align: "center", width: 90, sortable: true},
                {header: "소속부서", name: "reportOrgNm", align: "center", width: 150, sortable: true},
                {header: "업무기간", name: "workDt", align: "center", width: 180, sortable: true},
                {header: "작성일시", name: "updateDt", align: "center", width: 180, sortable: true},
            ],
        });


        this.gridInstance.on("focusChange", (ev) => {ev.stop();});
    }

    clearData(elementId) {
        document.getElementById(elementId).innerHTML = "";
    }

    updateMonthDisplay() {
        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth() + 1; // 월은 0부터 시작
        document.getElementById("year_month").innerText = `${year}년 ${month}월`;
    }

    setupEventListeners() {
        document.getElementById("prev_month").addEventListener("click", () => {
            this.currentDate.setMonth(this.currentDate.getMonth() - 1); // 이전 달
            this.updateMonthDisplay();
            this.getGeneralReportList("month");
        });

        document.getElementById("year_month").addEventListener("click", () => {
            this.updateMonthDisplay();
            this.getGeneralReportList("month");
        });

        document.getElementById("next_month").addEventListener("click", () => {
            this.currentDate.setMonth(this.currentDate.getMonth() + 1); // 다음 달
            this.updateMonthDisplay();
            this.getGeneralReportList("month");
        });

        document.querySelector(".form__searchBtn").addEventListener("click", () => {
            this.getGeneralReportList();
                // if(this._func.searchInputCheck()){} // 글자수 제한 제거
        });

        document.querySelector(".form__search").addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                this.getGeneralReportList();
                // if(this._func.searchInputCheck()){} // 그랒수 제한 제거
            }
        });

        document.getElementById("open_report_modal").addEventListener("click", () => {
            this.initReportViewModalData();
           // this.hideRemoveButton();
        });

        document.getElementById("remove_button").addEventListener("click", () => {
            this.deleteGeneralReport()
                .then(() => console.log("보고서 삭제"))
                .catch(error => this._func.showToastModal("보고서 삭제 처리중 오류가 발생하였습니다.", error))
        });

        // x버튼
        document.querySelector("#close_button").addEventListener("click", () => {
            this.closeReportViewModal();
        });

        // 닫기
        const viewReportModal = document.querySelector("#viewGeneralReportModal");
        viewReportModal.querySelectorAll("#closeBtn, #closeBtn2").forEach(button => {
            button.addEventListener("click", () => {
                this.hideModal(viewReportModal);
            });
        });

        // 취소버튼
        document.querySelector("#cancel_button").addEventListener("click", () => {
            this.cancelGeneralReport()
                .then(() => console.log("취소 처리"))
                .catch(error => this._func.showToastModal("취소 처리 중 오류가 발생하였습니다.", error));
        });

        document.getElementById("callAiBtn").addEventListener("click", () => {
            const workFromDt = document.getElementById("write_work_from_dt").value;
            const workToDt = document.getElementById("write_work_to_dt").value;

            if(workFromDt === '' || workToDt === '' ){
                this._func.showToastModal(ALERT_MESSAGES.A017);
                return;
            }

            this.createAIReport();
        });

        document.getElementById("save_button").addEventListener("click", () => {
            if (this.saveValidation()) {
                this.saveGeneralReport()
                    .then(() => console.log("보고서 저장"))
                    .catch(error => this._func.showToastModal("보고서 저장 처리 중 오류가 발생하였습니다.", error))
            }
        });

        // 기타 입력 수 계산
        const reportEtcConts = document.querySelector("#write_report_etc_conts");
        const generalTextCnt = document.querySelector("#generalTextCnt");
        const maxLength = 500;

        reportEtcConts.addEventListener("input",  ()=> {
            let currentText = reportEtcConts.value;
            if(currentText.length > maxLength){
                this._func.showToastModal(ALERT_MESSAGES.A021);
                reportEtcConts.value = currentText.slice(0, maxLength); // 500자 초과 부분 삭제
            }
            generalTextCnt.textContent = `${reportEtcConts.value.length}`;
        });
    }


    cancelGeneralReport = async () => {
        const result = await this._func.customConfirm(ALERT_MESSAGES.A004);
        if (result) {
            this.closeReportViewModal();
        }
    }

    // 보고서 삭제 전 Confirm
    deleteGeneralReport = async () => {
        const result = await this._func.customConfirm(ALERT_MESSAGES.A014);
        if (result) {
            this.removeReport(document.getElementById("write_report_id").value);
            this.closeReportViewModal();
            this.gridInstance.removeRow(this.reportRowKey);
        }
    }

    // 보고서 저장 전 Confirm
    saveGeneralReport = async () => {
        const result = await this._func.customConfirm(ALERT_MESSAGES.A005);
        if (result) {
            const reportId = document.getElementById("write_report_id").value;
            if (reportId === "") {
                this.createReport();
            } else {
                this.updateReport();
            }
        }
    }

    formatDate(dateString) { //ex) 2025-02-25 -> 2025.02.25
        // 날짜 문자열(-)을 '.'로 구분하여 변경
        return dateString.replace(/-/g, '.');
    }

    getWorkDt(data) {
        return this.formatDate(data.workFromDt) + '~' + this.formatDate(data.workToDt);
    }

    openReportViewModal(rowKey) {
        this.reportRowKey = rowKey;
        if(this.reportList[rowKey].reportUserKey === this._loginInfo.userKey){
            document.getElementById("open_report_modal").click();
        }
        this.getReportViewModalData(this.reportList[rowKey].reportId);
    }

    closeReportViewModal() {
        document.getElementById("writeReportModal-1").style.display = "none";
        this.initReportViewModalData();
    }

    getReportViewModalData(reportId) {
        window.generalReport.getDetail({reportId: reportId})
            .then(response => {
                const responseData = response.data;
                if(this._loginInfo.userKey === responseData.reportUserKey){
                    this.setReportEditModalData(responseData);
                }else{
                    this.setReportViewModalData(responseData);
                }
            });
    }

    setReportEditModalData(data){
        this.showRemoveButton();
        document.getElementById("write_report_id").value = data.reportId;
        document.getElementById("write_report_nm").value = data.reportNm;
        document.getElementById("write_work_from_dt").value = data.workFromDt.replace(/\./g, "-");
        document.getElementById("write_work_to_dt").value = data.workToDt.replace(/\./g, "-");
        document.getElementById("write_report_dtl_conts").value = data.reportDtlConts;
        document.getElementById("write_report_etc_conts").value = data.reportEtcConts;
        document.getElementById("write_report_org_nm").textContent = data.reportOrgNm;
        document.getElementById("write_report_user_nm").textContent = data.reportUserNm;
        document.getElementById("write_create_dt").textContent = data.updateDt;
    }

    setReportViewModalData(detail) {
        const viewModal = document.querySelector("#viewGeneralReportModal");
        this.showModal(viewModal);
        viewModal.querySelector("#writeReportNm").textContent = detail.reportNm;
        viewModal.querySelector("#writeReportOrgNm").textContent = detail.reportOrgNm;
        viewModal.querySelector("#writeWork").textContent = detail.workFromDt + " ~ " + detail.workToDt;
        viewModal.querySelector("#writeReportUserNm").textContent = detail.reportUserNm;
        viewModal.querySelector("#writeCreateDt").textContent = detail.updateDt;
        viewModal.querySelector("#writeReportDtlConts").textContent = detail.reportDtlConts;
        viewModal.querySelector("#writeReportEtcConts").textContent = detail.reportEtcConts;
    }

    initReportViewModalData() {

        const rangePicker =  new DatePicker.createRangePicker({
            startpicker: {date: this.today, input: '#write_work_from_dt', container: '#write_from_container',},
            endpicker: {date: this.today, input: '#write_work_to_dt', container: '#write_to_container',},
            format: 'YYYY-MM-dd',
            language: 'ko',
        });

        // `startPicker` 변경 이벤트
        rangePicker.getStartpicker().on('change', () => {
            console.log("시작날짜=" + rangePicker.getStartDate());

            const startDate = rangePicker.getStartDate();
            startDate.setDate(startDate.getDate() + 30);
            const endDate = rangePicker.getEndDate();

            if(endDate > startDate){
                this._func.showAlertModal(ALERT_MESSAGES.A048);
                rangePicker.setEndDate(startDate);
            }
        });

        // `startPicker` 변경 이벤트
        rangePicker.getEndpicker().on('change', () => {
            console.log("종료날짜=" + rangePicker.getEndDate());
            if(rangePicker.getEndDate() === null){
                rangePicker.setEndDate(rangePicker.getStartDate());
            }else{
                const startDate = rangePicker.getStartDate();
                startDate.setDate(startDate.getDate() + 30);
                const endDate = rangePicker.getEndDate();

                if(endDate > startDate){
                    this._func.showAlertModal(ALERT_MESSAGES.A048);
                    rangePicker.setEndDate(startDate);
                }
            }
        });

        // input, textarea 초기화
        ["write_report_id", "write_report_nm", "write_report_dtl_conts", "write_report_etc_conts"]
            .forEach(id => document.getElementById(id).value = "");

        const formattedDate = this.today.toISOString().split('T')[0];
        // document.getElementById("write_work_from_dt").value = formattedDate;
        // document.getElementById("write_work_to_dt").value = formattedDate;
        document.getElementById("write_report_org_nm").textContent = this._loginInfo._orgNm;
        document.getElementById("write_report_user_nm").textContent = this._loginInfo._userNm;
        document.getElementById("write_create_dt").textContent = "";
        document.getElementById("save_button").style.display = "none";
        document.getElementById("remove_button").style.display = "none";
        document.getElementById("cancel_button").style.display = "block";
        document.getElementById("callAiBtn").style.display = "block";

    }

    showRemoveButton() {
        const remove_button = document.getElementById("remove_button");
        const save_button = document.getElementById("save_button");
        const cancel_button = document.getElementById("cancel_button");
        remove_button.style.display = "block";
        save_button.style.display = "block";
        cancel_button.style.display = "block";
    }

    hideRemoveButton() {
        const remove_button = document.getElementById("remove_button");
        const save_button = document.getElementById("save_button");
        const cancel_button = document.getElementById("cancel_button");
        remove_button.style.display = "none";
        save_button.style.display = "none";
        cancel_button.style.display = "none";
    }

    removeReport(reportId) {
        window.generalReport.deleteWkReport({reportId: reportId})
            .then(() => {
                console.log('delete report :', reportId);
            })
    }

    saveValidation() {
        if (document.getElementById("write_report_nm").value === "") {
            this._func.showToastModal(ALERT_MESSAGES.A022);
            return false;
        }

        if (document.getElementById("write_work_from_dt").value === "" ||
            document.getElementById("write_work_to_dt").value === "") {
            this._func.showToastModal(ALERT_MESSAGES.A017);
            return false;
        }

        if (document.getElementById("write_report_dtl_conts").value === "") {
            this._func.showToastModal(ALERT_MESSAGES.A020);
            return false;
        }
        return true;
    }

    getReportData() {
        const reportId = document.getElementById("write_report_id").value;
        if (reportId === "") {
            return this.getReportCreateData();
        } else {
            return this.getReportUpdateData();
        }
    }

    // 연동처리
    createAIReport(){
        this._func.showLoading("보고서 작성 중입니다.");

        const reportDtlConts = document.getElementById("write_report_dtl_conts");
        const save_button = document.getElementById("save_button");

        const requestData = {
            workFromDt: document.getElementById("write_work_from_dt").value,
            workToDt : document.getElementById("write_work_to_dt").value
        }
        generalReport.selectAiSendData(requestData)
            .then(response => {
                const selectData = response.data;
                const createData = {
                    serviceCd : 'REPORT_NORMAL',
                    jobResult : `보고서 조회기간[${requestData.workFromDt} ~ ${requestData.workToDt}]`,
                    data : selectData
                }
                AiApi.realTime(createData)
                    .then(response => {
                        console.log(response.data);
                        const aiData = response.data;
                        if(response.code === 0){
                            reportDtlConts.value = aiData;
                            save_button.style.display = "block";
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
                this._func.showToastModal("일반보고서 불러오기 중 오류가 발생하였습니다.", error);
                this._func.hideLoading();
            })
            // .finally(() => this._func.hideLoading())
    }

    getReportCreateData() {
        const reportNm = document.getElementById("write_report_nm").value;
        const workFromDt = document.getElementById("write_work_from_dt").value;
        const workToDt = document.getElementById("write_work_to_dt").value;
        const reportDtlConts = document.getElementById("write_report_dtl_conts").value;
        const reportEtcConts = document.getElementById("write_report_etc_conts").value;

        return {
            reportNm: reportNm,
            workFromDt: workFromDt,
            workToDt: workToDt,
            reportOrgKey: this._loginInfo.orgKey,
            reportUserKey: this._loginInfo.userKey,
            reportDtlConts: reportDtlConts,
            reportEtcConts: reportEtcConts,
            reportStatus: 'COMPLETED',
            useFlag: 1
        };
    }

    getReportUpdateData() {
        const reportId = document.getElementById("write_report_id").value;
        const reportData = this.getReportCreateData();
        reportData.reportId = reportId;
        return reportData;
    }

    createReport() {
        window.generalReport.createWkReport(this.getReportData())
            .then(response => {
                console.log('createWkReport:', response);
                this.closeReportViewModal();
                this.currentDate = this.today;
                this.updateMonthDisplay();
                this.getGeneralReportList("month");
            });
    }

    updateReport() {
        window.generalReport.updateWkReport(this.getReportData())
            .then(response => {
                console.log('updateWkReport:', response);
                this.closeReportViewModal();
                this.currentDate = this.today;
                this.updateMonthDisplay();
                this.getGeneralReportList("month");
            });
    }
}