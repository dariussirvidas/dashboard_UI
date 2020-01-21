import React from 'react';
import './app.scss';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Main from '../main/main';
import Sticker from '../sticker/sticker';
import Sidebar from "../sidebar/sidebar";
import Header from "../header/header";
import Footer from "../footer/footer";

function App() {
    return (
        <>
            <div>
                <Header/>

                <Sidebar/>
                <Sticker/>

                <Main/>

                <Footer/>
            </div>
        </>
    );
}

export default App;
