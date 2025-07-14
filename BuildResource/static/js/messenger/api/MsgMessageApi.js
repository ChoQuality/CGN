window.msgMessageApi = {
    //메세지 저장
    saveMessage: function (messageData) {
        return fetch('/messenger/message/save', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(messageData),
        })
            .then(response => response.json())
            .catch(error => { throw error; });
    },
    //메세지 조회
    getMessages: function (roomId) {
        return fetch(`/messenger/message/list/${roomId}`, {
            method: 'GET',
        })
            .then(response => response.json())
            .catch(error => { throw error; });
    },

    //메세지ID가 속해있는 페이징 전체의 메세지 조회
    getMessagesByMessageId: function (roomId, messageId) {
        return fetch(`/messenger/message/list/${roomId}/${messageId}`, {
            method: 'GET',
        })
            .then(response => response.json())
            .catch(error => { throw error; });
    },

    //채팅방 마지막 메세지 조회
    getLatestMessage: function (roomId, userKey) {
        return fetch(`/messenger/message/latest/${roomId}/${userKey}`, {
            method: 'GET',
        })
            .then(response => response.json())
            .catch(error => { throw error; });
    },

    //채팅방에서 키워드로 조회
    searchMessagesByKeyword: function (roomId, userKey, keyword) {
        return fetch(`/messenger/message/rooms/${roomId}/${userKey}/keywords/${keyword}`, {
            method: 'GET',
        })
            .then(response => response.json())
            .catch(error => { throw error; });
    },

    //채팅방에서 키워드로 조회한 결과 건수
    getMessageCountByKeyword: function (roomId, userKey, keyword) {
        return fetch(`/messenger/message/rooms/${roomId}/${userKey}/keywords/${keyword}/count`, {
            method: 'GET',
        })
            .then(response => response.json())
            .catch(error => { throw error; });
    },

    //최근 메세지ID로 읽은 메세지ID 업데이트
    updateReadMessageId: function (messageId) {
        return fetch('/messenger/message/read/update', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messageId }),
        })
            .then(response => response.json())
            .catch(error => { throw error; });
    },

    //읽은 메세지ID 삭제
    deleteReadMessageId: function (messageId) {
        return fetch('/messenger/message/read/delete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messageId }),
        })
            .then(response => response.json())
            .catch(error => { throw error; });
    },

    //읽은 메세지ID 조회
    getReadMessages: function (roomId, userKey) {
        return fetch(`/messenger/message/read/${roomId}/${userKey}`, {
            method: 'GET',
        })
            .then(response => response.json())
            .catch(error => { throw error; });
    },

    //메세지 삭제
    deleteMessage: function (roomId, messageId) {
        return fetch(`/messenger/message/delete/${roomId}/${messageId}`, {
            method: 'POST',
        })
            .then(response => response.json())
            .catch(error => { throw error; });
    },

    //답글 저장
    saveReplyMessage: function (replyData) {
        return fetch('/messenger/message/save/reply', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(replyData),
        })
            .then(response => response.json())
            .catch(error => { throw error; });
    },

    //안 읽은 메시지 리스트 조회
    getUnReadMessages: function (roomId, readMessageId) {
        return fetch(`/messenger/message/list/${roomId}/${readMessageId}`, {
            method: 'GET',
        })
            .then(response => response.json())
            .catch(error => { throw error; });
    },

};
