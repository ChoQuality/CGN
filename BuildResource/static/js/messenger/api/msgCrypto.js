window.msgCrypto = {
    fetchPublicKey: function (url){
        return fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then(response => response.json())
        .then(data => data.publicKey)
        .catch(error => {
            throw error;
        });
    }
    ,encryptMessage: function (publicKey, message) {
        const encoder = new TextEncoder();
        const encMessage = encoder.encode(message);
        return window.crypto.subtle.encrypt(
            {
                name: "RSA-OAEP",
            },
            publicKey,
            encMessage
        )
        .then(encryptedBuffer => {
            return btoa(String.fromCharCode(...new Uint8Array(encryptedBuffer)));
        })
        .catch(error => {
            return Promise.reject(error);
        });
    }
};
