import counterReducer from "./counter";
import loggedReducer from "./isLogged";
import userDataReducer from "./userData"
import tokenReducer from "./token";
import tokenRefreshReducer from "./tokenRefresh";
import {combineReducers} from "redux";
import refreshBlockReducer from "./refreshBlock";

const rootReducer = combineReducers(
    {
        counter: counterReducer,
        isLogged: loggedReducer,
        token: tokenReducer,
        userData: userDataReducer,
        tokenRefresh: tokenRefreshReducer,
        refreshBlock: refreshBlockReducer
    }
);

export default rootReducer;