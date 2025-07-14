window.msgGroupApi = {
    // 조직정보조회
    getOrgList: function () {
        return fetch('/messenger/group/orgList', {
            method: 'GET',
        })
            .then(response => response.json())
            .catch(error => { throw error; });
    },

    // 조직명 조회
    searchByOrgName: function (keyword) {
        return fetch(`/messenger/group/search/${keyword}`, {
            method: 'GET',
        })
            .then(response => response.json())
            .catch(error => { throw error; });
    },

    // 조직의 사용자 목록 조회
    getGroupUserList: function (orgKey) {
        return fetch(`/messenger/group/groupUserList/${orgKey}`, {
            method: 'GET',
        })
            .then(response => response.json())
            .catch(error => { throw error; });
    },
};
