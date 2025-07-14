// TodoGeneralReportApiController
window.generalReport = {
    // 일반보고서 리스트 조회
    getList: function (reportData) {
        return fetch('/api/generalReport/getList', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(reportData),
        })
            .then(response => response.json())
            .catch(error => {
                throw error;
            });
    },

    // 일반보고서 상세 조회
    getDetail: function (reportId) {
        return fetch('/api/generalReport/getDetail', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(reportId),
        })
            .then(response => response.json())
            .catch(error => {
                throw error;
            });
    },

    //일반 업무보고서 삭제
    deleteWkReport: function (reportId) {
        return fetch('/api/generalReport/deleteReport', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(reportId),
        })
            .then(response => response.json())
            .catch(error => {
                throw error;
            });
    },

    updateWkReport: function (reportData) {
        return fetch('/api/generalReport/updateReport', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(reportData),
        })
            .then(response => response.json())
            .catch(error => {
                throw error;
            });
    },

    createWkReport: function (reportData) {
        return fetch('/api/generalReport/regist', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(reportData),
        })
            .then(response => response.json())
            .catch(error => {
                throw error;
            });
    },

    selectAiSendData : function (requestData){
        return fetch('/api/generalReport/selectAiSendData', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(requestData),
        })
            .then(response => response.json())
            .catch(error => {
                throw error;
            });
    }


};
