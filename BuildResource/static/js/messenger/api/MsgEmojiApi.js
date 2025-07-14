window.emojiApi = {
    emojiCreate: function (data) {
        return fetch('/messenger/emoji/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .catch(error => { throw error; });
    },
    // 사용자검색(이름, 휴대번호)
    emojiFind: function (data) {
        return fetch('/messenger/emoji/find', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .catch(error => { throw error; });
    },

    emojiFindGroup: function (data) {
        return fetch('/messenger/emoji/find/group', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .catch(error => { throw error; });
    },

    emojiDelete: function (data) {
        return fetch('/messenger/emoji/delete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .catch(error => { throw error; });
    }
};
