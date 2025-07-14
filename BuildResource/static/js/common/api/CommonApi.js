class CommonApi {
    //조직 트리 목록 조회
    getOrgChart() {
        return fetch('/api/home/getOrgChart', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body : JSON.stringify({}),
        })
            .then(response => response.json())
            .catch(error => { throw error; });
    }
    getUserList (userSearchData){
        return fetch('/api/home/getUserList', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userSearchData),
        })
            .then(response => response.json())
            .catch(error => { throw error; });
    }
};
function redirectToWorks(executePath) {
    const token = localStorage.getItem('access_token'); // 토큰 가져오기
    if (token) {
        window.open(executePath + token, '_blank'); // 새 창에서 열기
    } else {
        alert("로그인이 필요합니다."); // 토큰이 없을 경우 알림
    }
}

function redirectToWorksWithParam(executePath,param) {
    console.log(executePath);
    console.log(param);

    const token = localStorage.getItem('access_token'); // 토큰 가져오기
    console.log(token);
    if (token) {
        const path = executePath+token +'&redirect='+param
        console.log(path);
        window.open(path,'_blank'); // 새 창에서 열기
    } else {
        alert("로그인이 필요합니다."); // 토큰이 없을 경우 알림
    }
}