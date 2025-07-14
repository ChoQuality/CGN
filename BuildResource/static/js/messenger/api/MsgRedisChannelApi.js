window.msgRedisChannelApi = {
    // Redis 채널 추가
    addChannel: function (channelName) {
        return fetch(`/messenger/redis/channel/add/${channelName}`, {
            method: 'POST',
        })
            .then(response => response.json())
            .catch(error => { throw error; });
    }
};
