import React, {useEffect, useState} from 'react';
import './app.scss';
import {BrowserRouter as Router} from "react-router-dom";

import Main from '../main/main';
import Menu from "../menu/menu";
import Footer from "../footer/footer";
import {LoadingSpinner, ErrorMessage} from "../elements/elements";
import Login from '../login/login'
import Signup from "../signup/signup";

function App() {
    const [endpoint, setEndpoint] = useState("http://40.85.76.116/");
    const [domainList, setDomainList] = useState();
    const [hasDomainListError, setHasDomainListError] = useState(false);

    // initial fetch ("deps:" stops infinite loop)
    useEffect(() => {
        fetchDomains(endpoint);
    }, []);


    useEffect(() => {
        setTimeout(reFetchDomains, 8000)
    }, []);

    async function fetchFromApi(endpoint) {
        const response = await fetch(endpoint);
        const data = await response.json();
        return data;
    }

    function fetchDomains(endpoint) {
        fetchFromApi(endpoint + "api/domain")
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


    // (re)fetches domainList
    function reFetchDomains() {
        console.log("refetching!");
        setTimeout(reFetchDomains, 5000)
        fetchDomains(endpoint);
    }

    // appends the local domainList array with one new domain
    function appendDomainList(newDomain) {
        console.log("append this:", newDomain);
        setDomainList([...domainList, newDomain]);
    }

    // changes the local domainList active state for one domain
    function changeDomainList(responseDomain) {
        console.log("changing domainList");
        let domainListCopy = domainList.slice();
        let domainToBeChangedIndex = domainListCopy.findIndex(domain => domain.id === responseDomain.id);
        domainListCopy[domainToBeChangedIndex] = responseDomain;
        setDomainList(domainListCopy);
    }

    function queryBackEnd(intervalMilliseconds) {
        setInterval(reFetchDomains, intervalMilliseconds);
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
                                    domainList={domainList}
                                    hasDomainListError={hasDomainListError}
                                    appendDomainList={appendDomainList}
                                    changeDomainList={changeDomainList}
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
