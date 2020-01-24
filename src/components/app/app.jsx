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
        const res = await fetch("http://40.85.76.116/api/api/services");
        res
            .json()
            .then(res => setServiceList(res))
            .catch(err => setServicesErrors(err));
    }

    const [portalList, setPortalsList] = useState();
    const [hasPortalsError, setPortalsErrors] = useState(false);

    async function fetchPortals() {
        const res = await fetch("http://40.85.76.116/api/api/portals");
        res
            .json()
            .then(res => setPortalsList(res))
            .catch(err => setPortalsErrors(err));
    }

    useEffect(() => {
        fetchPortals();
        fetchServices();
    }, []);

    return (
        <>
            <Router>
                <Menu/>

                <Main
                    portals={portalList}
                    services={serviceList}
                />

                <Footer/>
            </Router>
        </>
    );
}


export default App;
