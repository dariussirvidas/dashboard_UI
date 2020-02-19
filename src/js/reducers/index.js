const initialState = {
    isLoggedIn: true,
    role: "admin",
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjEyIiwicm9sZSI6IkFkbWluIiwibmJmIjoxNTgyMDUwODI1LCJleHAiOjE1ODI2NTU2MjUsImlhdCI6MTU4MjA1MDgyNX0.ipXN5rP_qbdyxyu6TAR-Z51PXpnv4tS08xm09ZflzrQ"
};

function rootReducer(state = initialState, action) {
    return state;
}

export default rootReducer;