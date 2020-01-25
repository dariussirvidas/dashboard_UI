import React, {Component, useState, useEffect} from 'react';
import './app.scss';
import {BrowserRouter as Router, Switch, Route, Link, useRouteMatch, useParams} from "react-router-dom";

import Main from '../main/main';
import Menu from "../menu/menu";
import Footer from "../footer/footer";

function App() {
    const [serviceList, setServiceList] = useState();
    const [hasServicesError, setServicesErrors] = useState(false);

    async function fetchServices() {
        console.log("fetching services!");
        const res = await fetch("http://40.85.76.116/api/services/");
        res
            .json()
            .then(res => setServiceList(res),)
            .catch(err => setServicesErrors(err));
    }

    const [portalList, setPortalsList] = useState();
    const [hasPortalsError, setPortalsErrors] = useState(false);

    async function fetchPortals() {
        const res = await fetch("http://40.85.76.116/api/portals");
        res
            .json()
            .then(res => setPortalsList(res))
            .catch(err => setPortalsErrors(err));
    }


    const [servicesPingList, setServicesPingList] = useState();
    const [servicesPingError, setServicesPingError] = useState();


    useEffect(() => {
        fetchPortals();
        fetchServices();
    }, []);

    function reFetchDomains() {
        fetchPortals();
        fetchServices();
        console.log("refetching!")
    }

    return (
        <>
            <Router>
                <Menu/>

                <Main
                    callbackReFetchDomains={reFetchDomains}
                    portals={portalList}
                    services={serviceList}
                />

                <Footer/>
            </Router>
        </>
    );
}


export default App;
