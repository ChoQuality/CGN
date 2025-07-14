
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('loginId').value;
    const password = document.getElementById('loginPw').value;

    // Map 객체를 사용하여 데이터 저장
    const data = new Map();
    data.set('username', username);
    data.set('password', password);
    // Map 객체를 JSON으로 변환
    const jsonData = Object.fromEntries(data);

    // fetch 요청
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'WIZ-COMPANY': '_0001_'  // 헤더 추가
        },
        body: JSON.stringify(jsonData)
    })
        .then(response => {
            debugger;

            return response.json();
        })
        .then(responseJson => {
            // 로그인 성공 후 처리
            console.log(responseJson);
            window.location = responseJson.data; // 응답 결과에서 리디렉션 URL을 얻어서 이동
        })
        .catch(error => {
            this._func.showToastModal(error);
            window.location = "/";
        });

});