const initialState = {
    isLoggedIn: true,
    role: "admin",
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjEyNSIsInJvbGUiOiJBZG1pbiIsIm5iZiI6MTU4MjY1Njk5NCwiZXhwIjoxNTgzMjYxNzk0LCJpYXQiOjE1ODI2NTY5OTR9.stwfis0JMCoMjdO9MyQVsubR379RsrkdDwJcESQbVp8"
};

function rootReducer(state = initialState, action) {
    return state;
}

export default rootReducer;