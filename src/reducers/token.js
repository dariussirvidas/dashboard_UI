const tokenReducer = (state = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjEyIiwicm9sZSI6IkFkbWluIiwibmJmIjoxNTgyMDUwODI1LCJleHAiOjE1ODI2NTU2MjUsImlhdCI6MTU4MjA1MDgyNX0.ipXN5rP_qbdyxyu6TAR-Z51PXpnv4tS08xm09ZflzrQ", action) => {
    switch (action.type) {
        case 'AUTHENTICATE':
            return action.payload;
        default:
            return state;

    }
};

export default tokenReducer;
