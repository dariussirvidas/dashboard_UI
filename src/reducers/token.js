const tokenReducer = (state = null, action) => {
    switch (action.type) {
        case 'AUTHENTICATE':
            return action.payload;
        case 'LOG_OUT':
            return null;
        default:
            return state;

    }
};

export default tokenReducer;
