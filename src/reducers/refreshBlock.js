const refreshBlockReducer = (state = false, action) => {
    switch (action.type) {
        case 'REFRESH_BLOCK':
            return true;
        case 'REFRESH_UNBLOCK':
            return false;
        case 'LOG_IN':
            return false;
        default:
            return state;
    }
};

export default refreshBlockReducer;
