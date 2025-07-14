// TODO 현황 API
window.todoSituationApi = {
    // 알림 메세지 저장
    todoListHtml: function (searchData) {
        return fetch('/todo/main/todoList', {
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
    confirmTodo: function (todoId) {
        return fetch(`/api/todo/confirm/${todoId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        })
        .then(response => response.json())
        .catch(error => { this._func.showToastModal("에러 발생:", error);
            throw error; });
    },
    rejectTodo: function (todoId) {
        return fetch(`/api/todo/reject/${todoId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        })
        .then(response => response.json())
        .catch(error => { this._func.showToastModal("에러 발생:", error);
            throw error; });
    },
    deleteTodo: function (todoId) {
        return fetch(`/api/todo/deleteTodo/${todoId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        })
        .then(response => response.json())
        .catch(error => { this._func.showToastModal("에러 발생:", error);
            throw error; });
    },
    reRequestTodo: function (todoForm) {
        return fetch('/api/todo/reRequest', {
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
    // 알림 메세지 저장
    saveAlarm: function (alarmData) {
        return fetch('/messenger/alarm/save', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(alarmData),
        })
            .then(response => response.json())
            .catch(error => { throw error; });
    },
    //  이전에 보냈던 AWPTodo 알림 메시지 수락/거절 처리. ( 메신저에서 수락/거절 버튼 못 누르게끔 처리함 )
    // isConfirmYn(수락거졀여부(Y/N)) : 수락=Y, 거절=N
    set_alarmMessage_todoConfirm: function (todoId, userKey, isConfirmYn) {
        return fetch(`/messenger/alarm/todoConfirm/${todoId}/${userKey}/${isConfirmYn}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        })
        .then(response => response.json())
        .catch(error => { this._func.showToastModal("에러 발생:", error);
            throw error; });
    },
};
