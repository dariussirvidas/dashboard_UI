const initialState = {
    isLoggedIn: true,
    role: "admin",
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjEiLCJyb2xlIjoiQWRtaW4iLCJuYmYiOjE1ODE5NTI5MTQsImV4cCI6MTU4MjU1NzcxNCwiaWF0IjoxNTgxOTUyOTE0fQ.jIQTcIgpLUN-hxUzL2bO2Q5lJgVinkywAD7--m-lr-I"
};

function rootReducer(state = initialState, action) {
    return state;
}

export default rootReducer;