import React, {useEffect, useState} from 'react';
import 'react-redux';
import './app.scss';
import {connect} from 'react-redux';
import {
    BrowserRouter as Router,
    Redirect, Route, Switch
} from "react-router-dom";

import Main from '../main/main';
import Menu from "../menu/menu";
import Footer from "../footer/footer";
import {LoadingSpinner, ErrorMessage} from "../elements/elements";
import Login from '../login/login'
import Signup from "../signup/signup";

import userMaintainList from "../userMaintainList/userMaintainList";
import 'react-notifications/lib/notifications.css';
import {NotificationContainer} from 'react-notifications';
import {useSelector, useDispatch} from "react-redux";


function App() {


    const isLogged = useSelector(state => state.isLogged);
    const token = useSelector(state => state.token);
    const userData = useSelector(state => state.userData);


    const [endpoint, setEndpoint] = useState(process.env.REACT_APP_BACKEND_ADDRESS);
    const [domainList, setDomainList] = useState();
    const [domainListResponseCode, setDomainListResponseCode] = useState();
    const [hasDomainListError, setHasDomainListError] = useState(false);
    const [hasUserListError, setHasUserListError] = useState(false);


    // initial fetch ("deps:" stops infinite loop)
    useEffect(() => {
        fetchDomains(endpoint);
        fetchUsers(endpoint);
    }, [token]);


    async function fetchFromApi(endpoint) {
        const response = await fetch(endpoint, {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });
        setDomainListResponseCode(response.status);
        const data = await response.json();
        return data;
    }

    function fetchDomains(endpoint) {
        fetchFromApi(endpoint + "domain")
            .then(data => {
                setDomainList(data)
            })
            .catch(error => {
                console.error("error while fetching domains:" + error);
                setHasDomainListError(true);

            });
    }

    async function fetchFromApiUsers(endpoint) {
        const response = await fetch(endpoint, {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });

        const data = await response.json();

        return data;
    }





    function fetchUsers(endpoint) {
        fetchFromApiUsers(endpoint + "users/")
            .then(data => {
                setUserList(data)
            })
            .catch(error => {
                console.error("error while fetching Users:" + error);
                setHasUserListError(true);
                // setUserList("error");
            });
    }

    function purgeLocalState() {
        setDomainList([]);
        setUserList([]);
    }


    // appends the local domainList array with one new domain
    function appendDomainList(newDomain) {
        console.log("append this:", newDomain);
        if (domainList.status === 404) {

            setDomainList([newDomain])
        } else
            setDomainList([...domainList, newDomain]);
    }

    // appends the local userList array with one new domain
    function appendUserList(newUser) {
        console.log("append this:", newUser);
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
        console.log("changing userList");
        let userListCopy = userList.slice();
        let userToBeChangedIndex = userListCopy.findIndex(user => user.id === responseUser.id);
        userListCopy[userToBeChangedIndex] = responseUser;
        setUserList(userListCopy);
    }


    //UserMaintaiList GET info

    const [userList, setUserList] = useState();

    useEffect(() => {
        getData();
    }, []);

    const [userListError, setUserListError] = useState();

    function getData() {
        fetchGet()
            .then((statusCode) => {
                if (statusCode === 200) {
                    console.log("status code 200");
                } else if (statusCode === 401) {
                    console.log("status code 401, do something else");
                    alert('Unauthenticated')
                } else {
                    console.log("status code " + statusCode + ", this is an unhandled exception I guess")
                }

            })
            .catch((error) => {
                setUserListError(true);
                console.error("Error while fetching user list: " + error);
            });
    }

    async function fetchGet() {

        const response = await fetch(endpoint + "users", {
                method: "GET",
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            }
        );
        const userList = await response.json();
        await setUserList(userList);
        console.log(userList);
        return response.status;
    }



    return (
        <>
            <Router>
                <Menu
                    purgeLocalState={purgeLocalState}
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
                                Boolean(domainList) === true && isLogged === true ?
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
                            />
                        </Route>
                        <Route path="/signup">
                            <Signup
                                endpoint={endpoint}
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