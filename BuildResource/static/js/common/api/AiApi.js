window.AiApi = {
    // 알림 메세지 저장
    realTime: function (requestData) {
        return fetch('/api/ai/realTime', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestData),
        })
            .then(response => response.json())
            .catch(error => { throw error; });
    },
};
