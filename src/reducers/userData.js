const userDataReducer = (state = null, action) => {
    switch (action.type) {
        case 'SET_ROLE':
            return action.payload;
        case 'LOG_OUT':
            return null;
        default:
            return state;
    }
};

export default userDataReducer;
