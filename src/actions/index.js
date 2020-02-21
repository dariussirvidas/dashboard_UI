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

