import counterReducer from "./counter";
import loggedReducer from "./isLogged";
import userDataReducer from "./userData"
import tokenReducer from "./token";
import tokenRefreshReducer from "./tokenRefresh";
import {combineReducers} from "redux";

const rootReducer = combineReducers(
    {
        counter: counterReducer,
        isLogged: loggedReducer,
        token: tokenReducer,
        userData: userDataReducer,
        tokenRefresh: tokenRefreshReducer
    }
);

export default rootReducer;