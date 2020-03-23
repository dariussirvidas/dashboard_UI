import React, {useEffect, useState} from 'react';
import 'react-redux';
import './app.scss';
import {useDispatch, useSelector} from 'react-redux';
import {BrowserRouter as Router, Redirect, Route} from "react-router-dom";

import Main from '../main/main';
import Menu from "../menu/menu";
import {ErrorMessage, LoadingSpinner} from "../elements/elements";
import Login from '../login/login'
import Signup from "../signup/signup";

import 'react-notifications/lib/notifications.css';
import {NotificationContainer} from 'react-notifications';
import {
    requestFetchDelete,
    requestFetchGet,
    requestFetchPost,
    requestFetchPostNoAuth,
    requestFetchPut
} from "../../actions";

function App() {

    const isLogged = useSelector(state => state.isLogged);
    const token = useSelector(state => state.token);
    const endpoint = process.env.REACT_APP_BACKEND_ADDRESS;
    const [domainList, setDomainList] = useState([]);
    const [domainListResponseCode, setDomainListResponseCode] = useState();
    const [hasDomainListError, setHasDomainListError] = useState(false);
    const [userList, setUserList] = useState();
    const [logsList, setLogs] = useState();


    //=======================================================================================
    const dispatch = useDispatch();
    //===================== request dispatch functions ======================================

    function fetchGet(endpoint) {
        return new Promise((res) =>
        {
            dispatch(requestFetchGet(endpoint, res));
        });
    }
    function fetchDelete(endpoint) {
        return new Promise((res) =>
        {
            dispatch(requestFetchDelete(endpoint, res));
        });
    }
    function fetchPost(endpoint, body) {
        return new Promise((res) =>
        {
            dispatch(requestFetchPost(endpoint, body, res));
        });
    }
    function fetchPut(endpoint, body) {
        return new Promise((res) =>
        {
            dispatch(requestFetchPut(endpoint, body, res));
        });
    }
    function fetchPostNoAuth(endpoint, body) {
        return new Promise((res) =>
        {
            dispatch(requestFetchPostNoAuth(endpoint, body, res));
        });
    }
    //====== combining functions in an object for easier passing in props ===================
    const fetches = {fetchGet, fetchDelete, fetchPost, fetchPut, fetchPostNoAuth};
    //=======================================================================================

    // initial fetch ("deps:" stops infinite loop)
    useEffect(() => {
        fetchDomains(endpoint);
        fetchUsers(endpoint);
        fetchLogs(endpoint);
    }, [token]);

    async function fetchFromApi(endpoint) {
        const response = await fetchGet(endpoint);
        setDomainListResponseCode(response.status);
        if (response.status === 200) {
            return await response.json();
        }
        else return null;
    }

    function fetchDomains(endpoint) {
        fetchFromApi(endpoint + "domain/")
            .then(data => {
                if (data != null) setDomainList(data);
            })
            .catch(error => {
                console.error("error while fetching domains:" + error);
                setHasDomainListError(true);
            });
    }

    async function fetchFromApiUsers(endpoint) {
        const response = await fetchGet(endpoint);
        if (response.status === 200) {
            return await response.json();
        }
        else return null;
    }

    function fetchUsers(endpoint) {
        fetchFromApiUsers(endpoint + "users/")
            .then(data => {
                if (data != null) setUserList(data);
            })
            .catch(error => {
                console.error("error while fetching Users:" + error);
            });
    }

    async function fetchFromApiLogs(endpoint) {
        const response = await fetchGet(endpoint);
        if (response.status === 200) {
            return await response.json();
        }
        else return null;
    }

    function fetchLogs(endpoint) {
        fetchFromApiLogs(endpoint + "logs/")
            .then(data => {
                if (data != null) setLogs(data);
            })
            .catch(error => {
                console.error("error while fetching Logs:" + error);
            });
    }

    function purgeLocalState() {
        setDomainList([]);
        setUserList([]);
        setLogs([]);
        setDomainListResponseCode(401);
    }

    // appends the local domainList array with one new domain
    function appendDomainList(newDomain) {
        if (domainList.status === 404) {
            setDomainList([newDomain])
        } else
            setDomainList([...domainList, newDomain]);
    }

    // appends the local userList array with one new domain
    function appendUserList(newUser) {
        setUserList([...userList, newUser]);
    }

    // changes the local domainList active state for one domain
    function changeDomainList(responseDomain) {
        let domainListCopy = domainList.slice();
        let domainToBeChangedIndex = domainListCopy.findIndex(domain => domain.id === responseDomain.id);
        domainListCopy[domainToBeChangedIndex] = responseDomain;
        setDomainList(domainListCopy);
    }

    // changes the local userList active state for one domain
    function changeUserList(responseUser) {
        let userListCopy = userList.slice();
        let userToBeChangedIndex = userListCopy.findIndex(user => user.id === responseUser.id);
        userListCopy[userToBeChangedIndex] = responseUser;
        setUserList(userListCopy);
    }

    return (
        <>
            <Router>
                <Menu
                    purgeLocalState={purgeLocalState} fetches={fetches}
                />
                {
                    domainListResponseCode === undefined ?
                        (<>
                            {
                                hasDomainListError === true ?
                                    (<>
                                        <ErrorMessage
                                            message="no response from back end"
                                        />
                                    </>)
                                    :
                                    (<>
                                        <LoadingSpinner/>
                                    </>)
                            }
                        </>)
                        :
                        (<>
                            {
                                /*Boolean(domainList) === true && */isLogged === true ?
                                    (<>
                                        <Main
                                            endpoint={endpoint}
                                            domainList={domainList}
                                            userList={userList}
                                            hasDomainListError={hasDomainListError}
                                            appendDomainList={appendDomainList}
                                            appendUserList={appendUserList}
                                            changeDomainList={changeDomainList}
                                            changeUserList={changeUserList}
                                            logs={logsList}
                                            fetches={fetches}
                                        />

                                    </>)
                                    :
                                    (<>
                                        {
                                            domainListResponseCode === 401 ?
                                                (<>
                                                    <Redirect to="/login"/>
                                                </>)
                                                :
                                                (<>
                                                    <ErrorMessage
                                                        message={"status code " + domainListResponseCode}
                                                    />
                                                </>)
                                        }
                                    </>)
                            }
                        </>)

                }


                {
                    isLogged === false &&
                    <>
                        <Route path="/login">
                            <Login
                                endpoint={endpoint}
                                fetches={fetches}
                            />
                        </Route>
                        <Route path="/signup">
                            <Signup
                                endpoint={endpoint}
                                fetches={fetches}
                            />
                        </Route>
                    </>
                }
            </Router>
            <NotificationContainer/>
        </>
    );
}

export default App;