// 칭찬하기 API
window.todoPraiseApi = {
    // 칭찬하기 현황(전사) 조회
    list: function (searchData) {
        return fetch('/api/praise/list', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(searchData),
        })
            .then(response => response.json())
            .catch(error => { throw error; });
    },

    // 칭찬하기 엑셀 다운로드
    listExcelDownload : function (searchData){
        return fetch('/api/praise/listExcelDownload', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(searchData),
        })
            .then(response => response.blob())
            .catch(error => { throw error; });
    },

    // 칭찬하기 row 데이터 엑셀 다운로드
    rowListExcelDownload : function (searchData){
        return fetch('/api/praise/rowListExcelDownload', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(searchData),
        })
            .then(response => response.blob())
            .catch(error => { throw error; });
    }




};
