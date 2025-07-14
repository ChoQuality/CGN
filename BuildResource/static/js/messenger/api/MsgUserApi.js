window.userApi = {
    // 사용자정보 조회
    getUserInfo: function (userId) {
        return fetch(`/messenger/user/${userId}`, {
            method: 'GET',
        })
            .then(response => response.json())
            .catch(error => { throw error; });
    },

    // 사용자검색(이름, 휴대번호)
    searchUser: function (searchData) {
        return fetch('/messenger/user/search', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(searchData),
        })
            .then(response => response.json())
            .catch(error => { throw error; });
    },
};
