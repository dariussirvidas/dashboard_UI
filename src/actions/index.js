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

export const logInToken = (token) => {
    return {
        type: "AUTHENTICATE",
        payload: token
    };
};
