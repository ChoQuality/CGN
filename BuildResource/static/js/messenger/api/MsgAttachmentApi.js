window.msgAttachmentApi = {
    // 채팅룸의 첨부파일 내역 조회
    getAttachmentHistory: function (roomId, page, pageSize) {
        return fetch(`/messenger/attachment/${roomId}/${page}/${pageSize}/history`, {
            method: 'GET',
        })
            .then(response => response.json())
            .catch(error => { throw error; });
    },

    // 파일업로드
    uploadFile: function (fileData) {
        console.log('file : '+fileData);
        return fetch('/messenger/attachment/upload', {
            method: 'POST',
            body: fileData,
        })
            .then(response => response.json())
            .catch(error => { throw error; });
    },

    //  파일업로드(멀티)
    uploadFiles: function (fileData) {
        console.log('file : '+fileData);
        return fetch('/messenger/attachment/uploads', {
            method: 'POST',
            body: fileData,
        })
            .then(response => response.json())
            .catch(error => { throw error; });
    },

    // 파일삭제(멀티)
    deleteFiles: function (fileData){
        console.log('param : '+fileData);
        return fetch('/messenger/attachment/deletes', {
            method: 'POST',
            body: fileData,
        })
            .then(response => response.json())
            .catch(error => { throw error; });
    },

    // 파일다운로드
    downloadFile: function (attachmentId) {
        return fetch(`/messenger/attachment/download/${attachmentId}`, {
            method: 'GET',
            headers : {'Accept': 'application/octet-stream'}
        })
            .then(response => response.blob())
            .catch(error => {
                alert("file 다운로드 실패");
                console.log(error);
                throw error;
            });
    },
};
