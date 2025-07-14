window.roomFixApi = {
    // 채팅(룸) 핀 고정
    saveFix: function (roomId) {
        return fetch(`/messenger/fix/save`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ roomId: roomId }),
        })
            .then(response => response.json())
            .catch(error => { throw error; });
    },

    // 채팅(룸) 핀 고정 해제
    deleteFix: function (roomId) {
        return fetch(`/messenger/fix/delete`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ roomId: roomId }),
        })
            .then(response => response.json())
            .catch(error => { throw error; });
    },

    // 채팅(룸) 핀 고정 순서 변경
    moveFix: function (roomId, newOrder) {
        return fetch(`/messenger/fix/move`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ roomId: roomId, newOrder: newOrder }),
        })
            .then(response => response.json())
            .catch(error => { throw error; });
    },
};
