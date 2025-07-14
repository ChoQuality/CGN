// TodoGeneralReportApiController
window.TodoWeeklyReportApi = {
    list: function (searchData) {
        return fetch('/api/weeklyReport/list', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(searchData),
        })
            .then(response => response.json())
            .catch(error => { throw error; });
    },
    getWeeklyList: function (yyyyMM) {
        return fetch(`/api/weeklyReport/getWeeklyList/${yyyyMM}`, {
            method: 'GET',
        })
            .then(response => response.json())
            .catch(error => { throw error; });
    },
    createAIReport : function(createData){
        return fetch('/api/weeklyReport/createAIReport', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(createData),
        })
            .then(response => response.json())
            .catch(error => { throw error; });
    },
    deleteReport : function(deleteData){
        return fetch('/api/weeklyReport/deleteReport', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(deleteData),
        })
            .then(response => response.json())
            .catch(error => { throw error; });
    },
    regist : function(saveData){
        return fetch('/api/weeklyReport/regist', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(saveData),
        })
            .then(response => response.json())
            .catch(error => { throw error; });
    },
    updateReport : function(updateData){
        return fetch('/api/weeklyReport/updateReport', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(updateData),
        })
            .then(response => response.json())
            .catch(error => { throw error; });
    },
    getDetail : function(selectData){
        return fetch('/api/weeklyReport/getDetail', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(selectData),
        })
            .then(response => response.json())
            .catch(error => { throw error; });
    },
    mergeReport : function(mergeData){
        return fetch('/api/weeklyReport/mergeReport', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(mergeData),
        })
            .then(response => response.json())
            .catch(error => { throw error; });
    },
    selectAiSendMergeData : function (requestData){
        return fetch('/api/weeklyReport/selectAiSendMergeData', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(requestData),
        })
            .then(response => response.json())
            .catch(error => { throw error; })
    },
    selectAiSendWeeklyData : function (requestData){
        return fetch('/api/weeklyReport/selectAiSendWeeklyData', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(requestData),
        })
            .then(response => response.json())
            .catch(error => { throw error; })
    },



};
