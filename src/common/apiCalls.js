async function refreshTokensCall(token, refreshToken) {
    let tokens = {token: token, refreshToken: refreshToken};
    let response = await fetch(/*"https://watchhoundapitest.azurewebsites.net/*/process.env.REACT_APP_BACKEND_ADDRESS + "users/refresh/", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(tokens) // body data type must match "Content-Type" header
    });
    console.error("refresh status: " + response.status);
    if (response.status === 200) {
        let responseObject = await response.json();
        console.error("refresh response data: " + JSON.stringify(responseObject));
        return {token: responseObject.token, refreshToken: responseObject.refreshToken};
    }
    else return undefined;
}

export {refreshTokensCall};