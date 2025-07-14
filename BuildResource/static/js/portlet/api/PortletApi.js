// 포틀릿
window.portletApi = {
    // 나의 정보 업데이트
    updateMyInfo: function (formData) {
        return fetch('/api/home/updateMyInfo', {
            method: 'POST',
            headers: { 'X-Requested-With': 'XMLHttpRequest' },
            body: formData,
        })
            .then(response => response.json())
            .catch(error => { throw error; });
    },

    // 포틀릿 설정 정보 저장
    setPortletList: function (saveData) {
        return fetch('/api/portlet/setPortletList', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(saveData),
        })
            .then(response => response.json())
            .catch(error => { this._func.showToastModal("에러 발생:", error);
                throw error; });
    },

};
