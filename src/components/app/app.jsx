import React, {useEffect, useState} from 'react';
import './app.scss';
import {BrowserRouter as Router} from "react-router-dom";

import Main from '../main/main';
import Menu from "../menu/menu";
import Footer from "../footer/footer";
import Sticker from "../sticker/sticker";

function App() {
    const [endpoint, setEndpoint] = useState("http://40.85.76.116/");
    const [serviceList, setServiceList] = useState();
    const [hasServicesError, setServicesErrors] = useState(false);




    const [portalList, setPortalsList] = useState();
    const [hasPortalsError, setPortalsErrors] = useState(false);


    const [servicesPingList, setServicesPingList] = useState();
    const [servicesPingError, setServicesPingError] = useState();


    async function fetchFromApi(endpoint) {
        const response = await fetch(endpoint);
        const data = await response.json();
        return data;
    }

    function fetchDomains(endpoint) {
        fetchFromApi(endpoint + "api/domain")
            .then(data => {
                setPortalsList(data)
            })
            .catch(error => {
                console.error("error while fetching domains:" + error);
                setPortalsErrors(true);

                // cia teoriskai bukai gal, bet imetu error stringa kad main elemente
                // Boolean("error") resolvintusi kaip true ir renderintu toliau
                setPortalsList("error");
            });

        fetchFromApi(endpoint + "api/domain")
            .then(data => {
                setServiceList(data)
            })
            .catch(error => {
                console.error("error while fetching domains:" + error);
                setServicesErrors(true);
                setServiceList("error");
            });
    }

    useEffect(() => {
        fetchDomains(endpoint);
    }, []);

    function reFetchDomains() {
        console.log("refetching!");
        fetchDomains(endpoint);
    }

    return (
        <>
            <Router>
                <Menu/>
                <Main
                    apiEndpoint={endpoint}
                    callbackReFetchDomains={reFetchDomains}
                    domain={portalList}
                    portalsError={hasPortalsError}
                    services={serviceList}
                    servicesError={hasServicesError}
                />

                {/*<Footer/>*/}
            </Router>
        </>
    );
}


export default App;
