async function refreshTokensCall(token, refreshToken) {
    const tokens = {token: token, refreshToken: refreshToken};
    try {
        let response = await fetch(process.env.REACT_APP_BACKEND_ADDRESS + "users/refresh/", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tokens)
        });
        if (response.status === 200) {
            let responseObject = await response.json();
            return {token: responseObject.token, refreshToken: responseObject.refreshToken};
        } else return undefined;
    }
    catch (e) {
        return undefined;
    }
}

async function fetchGet(endpoint, token) {
    try {
        let response = await fetch(endpoint, {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });
        return response;
    }
    catch (error) {
        console.error("FetchResponse error: " + error);
        return {status: 401};
    }
}

async function fetchAll(endpoint, method, body, token) {
    const headers = token ? {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    } : {
        'Content-Type': 'application/json'
    };
    return await fetch(endpoint, {
        method: method,
        headers: headers,
        body: JSON.stringify(body) // body data type must match "Content-Type" header
    });
}

export {refreshTokensCall};