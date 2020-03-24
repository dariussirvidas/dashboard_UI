const tokenRefreshReducer = (state = null, action) => {
    switch (action.type) {
        case 'REFRESH':
            return action.payload;
        case 'LOG_OUT':
            return null;
        default:
            return state;

    }
};

export default tokenRefreshReducer;