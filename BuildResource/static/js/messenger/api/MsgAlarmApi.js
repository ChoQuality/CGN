
// // 알림 메시지 저장
// const alarmData = {
//     sendUserKey: 2,
//     sendSystem: "TODO",
//     receiveUserKey: 1,
//     messageType: "PRAISE_IMG_01",
//     messageTitle: "알림발송 테스트1",
//     messageContent: "알림발송 테스트입니다요~<br>이히히히히1<br>",
//     linkText: "버튼",
//     linkUrl: "https://linkUrl.com//aa/aa",
//     acceptUrl: "https://acceptUrl.com/aa/bb/cc",
//     rejectUrl: "https://rejectUrl.com/aa/bb/cc"
// };
window.msgAlarmApi = {
    // 알림 메세지 저장
    saveAlarm: function (alarmData) {
        return fetch('/messenger/alarm/save', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(alarmData),
        })
            .then(response => response.json())
            .catch(error => { throw error; });
    },

    // 알림 메세지 조회
    getAlarmList: function (alarmData) {
        return fetch('/messenger/alarm/list', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(alarmData),
        })
            .then(response => response.json())
            .catch(error => { throw error; });
    },

    // 읽은 알림 메세지 조회
    getReadAlarms: function (roomId, userKey) {
        return fetch(`/messenger/alarm/read/${roomId}/${userKey}`, {
            method: 'GET',
        })
            .then(response => response.json())
            .catch(error => { throw error; });
    },

    // 최근 알림 메세지ID로 읽은 메세지ID 업데이트
    updateReadAlarmId: function (alarmData) {
        return fetch('/messenger/alarm/read/update', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(alarmData),
        })
            .then(response => response.json())
            .catch(error => { throw error; });
    },

    // 메시지id로 삭제(discard)
    discardAlarm: function (messageId) {
        return fetch(`/messenger/alarm/${messageId}/discard`, {
            method: 'POST',
        })
            .then(response => response.json())
            .catch(error => { throw error; });
    },

    // 알림메시지 수락 및 거절 처리
    confirmAlarm: function (alarmData) {
        return fetch('/messenger/alarm/confirm', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(alarmData),
        })
            .then(response => response.json())
            .catch(error => { throw error; });
    },
};
