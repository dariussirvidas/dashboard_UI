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
        return await fetchAll(endpoint, "GET", null, token);
    }
    catch (error) {
        console.error("FetchGet error: " + error);
    }
}

async function fetchDelete(endpoint, token) {
    try {
        return await fetchAll(endpoint, "DELETE", null, token);
    }
    catch (error) {
        console.error("FetchDelete error: " + error);
    }
}

async function fetchPost(endpoint, body, token) {
    try {
        return await fetchAll(endpoint, "POST", body, token);
    }
    catch (error) {
        console.error("FetchGet error: " + error);
    }
}

async function fetchPut(endpoint, body, token) {
    try {
        return await fetchAll(endpoint, "PUT", body, token);
    }
    catch (error) {
        console.error("FetchGet error: " + error);
    }
}

async function fetchAll(endpoint, method, body, token) {
    let init;
    if (method === "GET" || method === "DELETE") {
        init = {
            method: method,
            headers: {
                'Authorization': 'Bearer ' + token
            }
        };
    } else {
        if (token) {
            init = {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(body) // body data type must match "Content-Type"
            };
        } else {
            init = {
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body) // body data type must match "Content-Type"
            };
        }
    }
    return await fetch(endpoint, init);
}

export {refreshTokensCall, fetchGet, fetchDelete, fetchPost, fetchPut};