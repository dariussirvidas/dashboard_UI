import React, {useEffect, useState} from 'react';
import './app.scss';
import {BrowserRouter as Router} from "react-router-dom";

import Main from '../main/main';
import Menu from "../menu/menu";
import Footer from "../footer/footer";
import Sticker from "../sticker/sticker";

function App() {
    const [endpoint, setEndpoint] = useState("http://40.85.76.116/");
    const [domainList, setDomainList] = useState();
    const [hasDomainListError, setHasDomainListError] = useState(false);

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

    // initial fetch ("deps:" stops infinite loop)
    useEffect(() => {
        fetchDomains(endpoint);
    }, []);

    // (re)fetches domainList
    function reFetchDomains() {
        console.log("refetching!");
        fetchDomains(endpoint);
    }

    // appends the local domainList array with one new domain
    function appendDomainList(newDomain){
        console.log("append this:", newDomain);
        setDomainList([...domainList, newDomain]);
    }

    // changes the local domainList active state for one domain
    function changeDomainList(id){
        domainList.find(domain => domain.id === id);
        let domainListCopy= domainList.slice();
        let domainToBeChangedIndex = domainListCopy.findIndex(domain => domain.id === id);
        domainListCopy[domainToBeChangedIndex].active = !(domainListCopy[domainToBeChangedIndex].active);
        setDomainList(domainListCopy);
    }

    return (
        <>
            <Router>
                <Menu/>
                <Main
                    endpoint={endpoint}
                    callbackReFetchDomains={reFetchDomains}
                    domainList={domainList}
                    hasDomainListError={hasDomainListError}
                    appendDomainList={appendDomainList}
                    changeDomainList={changeDomainList}
                />

                {/*<Footer/>*/}
            </Router>
        </>
    );
}


export default App;
