import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/app';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import "eva-icons/style/eva-icons.css"
import {createStore, applyMiddleware/*, compose*/} from "redux";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./reducers/index";
import {Provider} from 'react-redux';
import rootSaga from "./sagas";


//ads

// redux and localstorage stuff
const persistedState = localStorage.getItem('reduxState') ? JSON.parse(localStorage.getItem('reduxState')) : {};

const sagaMiddleware = createSagaMiddleware();
export const store = createStore(rootReducer, persistedState,
    /*compose(*/applyMiddleware(sagaMiddleware)/*, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())*/
);

store.subscribe(() => {
    localStorage.setItem('reduxState', JSON.stringify(store.getState()))
});

sagaMiddleware.run(rootSaga);


ReactDOM.render(
    <Provider store={store} >
        <App/>
    </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
