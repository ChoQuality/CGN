window.roomApi = {
    // 채팅방[룸] 생성
    createRoom: function (roomData) {
        return fetch('/messenger/room/save', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(roomData),
        })
            .then(response => response.json())
            .catch(error => { throw error; });
    },


    // 채팅방[룸] 조회
    getRoomInfo: function (roomId) {
        return fetch(`/messenger/room/${roomId}`, {
            method: 'GET',
        })
            .then(response => response.json())
            .catch(error => { throw error; });
    },

    // 참여중인 채팅방 리스트 조회
    getUserRooms: function () {
        return fetch('/messenger/room/list', {
            method: 'GET',
        })
            .then(response => response.json())
            .catch(error => { throw error; });
    },

    // 참여 중인 채팅방 키워드검색
    searchRoomByKeyword: function (keyword) {
        return fetch(`/messenger/room/list/keyword/${keyword}`, {
            method: 'GET',
        })
            .then(response => response.json())
            .catch(error => { throw error; });
    },

    // 채팅방 정보 수정
    modifyRoom: function (roomData) {
        return fetch('/messenger/room/modifyRoom', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(roomData),
        })
            .then(response => response.json())
            .catch(error => { throw error; });
    },

    // 채팅방 생성 전 참여대화방 중복 체크
    checkRoomExists: function (roomData) {
        return fetch('/messenger/room/participating', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(roomData),
        })
            .then(response => response.json())
            .catch(error => { throw error; });
    },

    // 채팅방 썸네일 이미지 변경
    updateRoomThumbnail: function (roomId, imageData) {
        return fetch(`/messenger/room/update/image`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ roomId, imageData }),
        })
            .then(response => response.json())
            .catch(error => { throw error; });
    },

    createMyDefaultRoom: function () {
        return fetch('/messenger/room/createDefault', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        })
            .then(response => response.json())
            .catch(error => { throw error; });
    },
};
