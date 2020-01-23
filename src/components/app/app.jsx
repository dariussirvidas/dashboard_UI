import React, {Component, useState, useEffect} from 'react';
import './app.scss';
import {BrowserRouter as Router, Switch, Route, Link, useRouteMatch, useParams} from "react-router-dom";

import Main from '../main/main';
import Sidebar from "../sidebar/sidebar";
import Footer from "../footer/footer";


import RoutingTest from "../routingTest/routingTest";

function App() {
    const [domainArray, setDomainArray] = useState(['google', 'twitter', 'facebook', 'pinterest', 'glitch', 'lalfdsmakdnakalala']);

    const endpoint ="40.85.76.116/api/users/ping?hostname=";

    const addDomain = () => {
        setDomainArray([
            ...domainArray, 'newDomain'
        ])
    };

    return (
        <>
            <Router>



                <Sidebar/>

                <button onClick={addDomain}>
                    BUTTON
                </button>

                <Main
                    endpoint={endpoint}
                    domains={domainArray}
                />

                <Footer/>

            </Router>
        </>
    );
}


export default App;
