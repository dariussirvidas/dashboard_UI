const tokenReducer = (state = null, action) => {
    switch (action.type) {
        case 'AUTHENTICATE':
            return action.payload;
        default:
            return state;

    }
};

export default tokenReducer;
