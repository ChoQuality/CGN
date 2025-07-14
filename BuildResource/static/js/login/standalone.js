
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('loginId').value;
    const password = document.getElementById('loginPw').value;

    const data = new Map();
    data.set('username', username);
    data.set('password', password);

    fetch('/login/keycloakInfo', {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .then(responseJson => {
            console.log(responseJson);
            const {keycloak_url,client_id,client_secret,grant_type,scope} = responseJson.data
            const params = new URLSearchParams();
            params.append('client_id', client_id);
            params.append('client_secret', client_secret);
            params.append('username', username);
            params.append('password', password);
            params.append('grant_type', grant_type);
            params.append('scope', scope);
            fetch(keycloak_url, {
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                body: params
            })
                .then(response => response.json())
                .then(response => {
                    const {access_token} = response;
                    data.set('access_token', access_token);
                    localStorage.setItem('access_token', access_token);

                    const jsonData = Object.fromEntries(data);
                    fetch('login/decode', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(jsonData)
                    })
                        .then(response => response.json())
                        .then(response => {

                            fetch('login/valid', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                    ,'WIZ-COMPANY': response.data
                                },
                                body: JSON.stringify(jsonData)
                            })
                                .then(response => response.json())
                                .then(response => {
                                    window.location = response.data;
                                })
                                .catch(() => { window.location.href = window.location.origin + "/?status=loginFail"; });
                        })

                })
        })
        .catch(() => { window.location.href = window.location.origin + "/?status=loginFail"; });


});