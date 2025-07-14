window.msgParticipantApi = {
    // 채팅(룸) 참가자 정보 단일 저장
    saveParticipant: function (participantData) {
        return fetch('/messenger/participant/save', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(participantData),
        })
            .then(response => response.json())
            .catch(error => { throw error; });
    },

    // 채팅(룸) 참가자 정보 리스트 저장
    saveParticipantList: function (participantListData) {
        return fetch('/messenger/participant/list/save', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(participantListData),
        })
            .then(response => response.json())
            .catch(error => { throw error; });
    },

    // 채팅(룸) 참가자 정보 조회
    getParticipantList: function (roomId) {
        return fetch(`/messenger/participant/list/${roomId}`, {
            method: 'GET',
        })
            .then(response => response.json())
            .catch(error => { throw error; });
    },

    // 채팅(룸) 참가자 정보 수정
    updateParticipant: function (participantData) {
        return fetch('/messenger/participant/update', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(participantData),
        })
            .then(response => response.json())
            .catch(error => { throw error; });
    },
};
