// TODO 대시보드 API
window.todoDashboardApi = {
    //
    getUserInfo: function (userKey) {
        let apiUrl = '/api/com/user/getUserInfo/' + userKey;
        return fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        })
        .then(response => response.json())
        .catch(error => { this._func.showToastModal("에러 발생:", error);
            throw error; });
    },
    getTodoProgressData: function (searchData) {
        let apiUrl = '/api/dashboard/todoSituation/organization';
        if(searchData.dashboardSearchType == 'EMP') {
            apiUrl = '/api/dashboard/todoSituation/employee';
        }

        return fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(searchData),
        })
        .then(response => response.json())
        .catch(error => { this._func.showToastModal("에러 발생:", error);
            throw error; });
    },
    getWordCloud: function (searchData) {
        return fetch('/api/dashboard/monthlyKeyword', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(searchData),
        })
        .then(response => response.json())
        .catch(error => { this._func.showToastModal("에러 발생:", error);
            throw error; });
    },
    // 상세 현황 조회
    todoListHtml: function (searchData) {
        debugger;
        return fetch('/todo/dashboard/todoList', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(searchData),
        })
        .then(response => response.text())
        .catch(error => { this._func.showToastModal("에러 발생:", error);
            throw error; });
    },
    getTodoDetail: function (searchData) {
        return fetch('/api/todo/getTodoDetail', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(searchData),
        })
        .then(response => response.json())
        .catch(error => { this._func.showToastModal("에러 발생:", error);
            throw error; });
    },
    registTodoDetail: function (todoForm) {
        return fetch('/api/todo/regist', {
            method: 'POST',
            body: todoForm,
        })
        .then(response => response.json())
        .catch(error => { this._func.showToastModal("에러 발생:", error);
            throw error; });
    },
    updateTodoDetail: function (todoForm) {
        return fetch('/api/todo/updateTodoDetail', {
            method: 'POST',
            body: todoForm,
        })
        .then(response => response.json())
        .catch(error => { this._func.showToastModal("에러 발생:", error);
            throw error; });
    },
    repUserList: function (userNm) {
        return fetch(`/api/home/getUserList?userNm=${userNm}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        })
        .then(response => response.json())
        .catch(error => { this._func.showToastModal("에러 발생:", error);
            throw error; });
    },

};
