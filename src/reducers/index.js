import counterReducer from "./counter";
import loggedReducer from "./isLogged";
import roleReducer from "./role"
import tokenReducer from "./token";
import {combineReducers} from "redux";

const rootReducer = combineReducers(
    {
        counter: counterReducer,
        isLogged: loggedReducer,
        token: tokenReducer,
        role: roleReducer
    }
);

export default rootReducer;