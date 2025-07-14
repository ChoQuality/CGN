window.msgRedisApi = {
    // Redis 메시지 publish
    publishMessage: function (messageData) {
        return fetch('/messenger/redis/publish/message', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(messageData),
        })
            .then(response => response.json())
            .catch(error => { throw error; });
    },

    // Redis 메시지 publish to notice
    publishNotice: function (noticeData) {
        return fetch('/messenger/redis/publish/notice', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(noticeData),
        })
            .then(response => response.json())
            .catch(error => { throw error; });
    },
};
