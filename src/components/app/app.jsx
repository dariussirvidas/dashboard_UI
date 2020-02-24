import React, {useEffect, useState} from 'react';
import './app.scss';
import {BrowserRouter as Router} from "react-router-dom";

import Main from '../main/main';
import Menu from "../menu/menu";
import Footer from "../footer/footer";
import {LoadingSpinner, ErrorMessage} from "../elements/elements";
import Login from '../login/login'
import Signup from "../signup/signup";

import rootReducer from "../../js/reducers";
import store from "../../js/store";
import userMaintainList from "../userMaintainList/userMaintainList";

window.store = store;

function App() {
    const [endpoint, setEndpoint] = useState("https://watchhoundapi.azurewebsites.net/");
    const [domainList, setDomainList] = useState();
    const [hasDomainListError, setHasDomainListError] = useState(false);
    const [hasUserListError, setHasUserListError] = useState(false);

    // initial fetch ("deps:" stops infinite loop)
    useEffect(() => {
        fetchDomains(endpoint);
    }, []);


    useEffect(() => {
        setTimeout(reFetchDomains, 8000)
        console.log(store.getState().token)
    }, []);

    async function fetchFromApi(endpoint) {
        const response = await fetch(endpoint, {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + store.getState().token
            }
        });
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

                // cia teoriskai bukai gal, bet imetu error stringa kad main elemente
                // Boolean("error") resolvintusi kaip true ir renderintu toliau
                setDomainList("error");
            });
    }

    function fetchUsers(endpoint) {
        fetchFromApi(endpoint + "users/admin/register")
            .then(data => {
                setUserList(data)
            })
            .catch(error => {
                console.error("error while fetching Users:" + error);
                setHasUserListError(true);
                setUserList("error");
            });
    }


    // (re)fetches domainList
    function reFetchDomains() {
        console.log("refetching!");
        setTimeout(reFetchDomains, 5000)
        fetchDomains(endpoint);
    }

    // (re)fetches userList
    function reFetchUsers() {
        console.log("refetching users!");
        setTimeout(reFetchUsers, 5000)
        fetchUsers(endpoint);
    }

    // appends the local domainList array with one new domain
    function appendDomainList(newDomain) {
        console.log("append this:", newDomain);
        setDomainList([...domainList, newDomain]);
    }

    // appends the local userList array with one new domain
    function appendUserList(newUser) {
        console.log("append this:", newUser);
        setUserList([...userList, newUser]);
    }

    // changes the local domainList active state for one domain
    function changeDomainList(responseDomain) {
        console.log("changing domainList");
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

    function queryBackEnd(intervalMilliseconds) {
        setInterval(reFetchDomains, intervalMilliseconds);
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
                    'Authorization': 'Bearer ' + store.getState().token
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
                <Menu/>
                {
                    // Main component is only rendered when domainList is fetched
                    domainList === "error" ?
                        (
                            <ErrorMessage
                                message="stuff"
                            />
                        )
                        :
                        Boolean(domainList) === true ?
                            (
                                <Main
                                    endpoint={endpoint}
                                    callbackReFetchDomains={reFetchDomains}
                                    callbackReFetchUsers={reFetchUsers}
                                    domainList={domainList}
                                    userList={userList}
                                    hasDomainListError={hasDomainListError}
                                    appendDomainList={appendDomainList}
                                    appendUserList={appendUserList}
                                    changeDomainList={changeDomainList}
                                    changeUserList={changeUserList}
                                />
                            )
                            :
                            (
                                <LoadingSpinner/>
                            )
                }
                {/*/!*{queryBackEnd(15000)}*!/  something is wrong with refetching on interval*/}
                {/*<Footer/>*/}
            </Router>
        </>
    );
}


export default App;
