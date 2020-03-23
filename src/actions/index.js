export const increment = () => {
    return {
        type: "INCREMENT"
    };
};

export const logIn = () => {
    return {
        type: "LOG_IN"
    };
};

export const authRole = (role) => {
    return {
        type: "SET_ROLE",
        payload: role
    };
};

export const logInToken = (token) => {
    return {
        type: "AUTHENTICATE",
        payload: token
    };
};

export const logInTokenRefresh = (token) => {
    return {
        type: "REFRESH",
        payload: token
    };
};

export const logOut = () => {
    return {
        type: "LOG_OUT",
        payload: null
    };
};

export const blockRefresh = () => {
    return {
        type: "REFRESH_BLOCK"
    };
};

export const unblockRefresh = () => {
    return {
        type: "REFRESH_UNBLOCK"
    };
};

export const requestRefresh = () => {
    return {
        type: "TOKEN_REFRESH_REQUESTED"
    };
};

export const requestFetchGet = (endpoint, res) => {
    return {
        type: "FETCH_GET_REQUESTED",
        payload: {endpoint, res}
    };
};

export const requestFetchDelete = (endpoint, res) => {
    return {
        type: "FETCH_DELETE_REQUESTED",
        payload: {endpoint, res}
    };
};

export const requestFetchPost = (endpoint, body, res) => {
    return {
        type: "FETCH_POST_REQUESTED",
        payload: {endpoint, body, res}
    };
};

export const requestFetchPostNoAuth = (endpoint, body, res) => {
    return {
        type: "FETCH_POST_NO_AUTH_REQUESTED",
        payload: {endpoint, body, res}
    };
};

export const requestFetchPut = (endpoint, body, res) => {
    return {
        type: "FETCH_PUT_REQUESTED",
        payload: {endpoint, body, res}
    };
};

