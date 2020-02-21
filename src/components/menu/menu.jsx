import React, {Component} from 'react';
import Logo from '../../Content/Festo logo.svg';
import Menu_icon from '../../Content/hamburger_menu.png';
import Dropdown from 'react-bootstrap/Dropdown';
import Style from './menu.scss';
import {Link} from "react-router-dom";
// import store from "../../js/store";

function Menu() {
    return (
        <>
            {
                // store.getState().isLoggedIn === true &&
                <div className="container NavBarOnTop">
                    <nav className="navbar navbar-light bg-white">
                        <Link className="navbar-brand" to="/stickerList">
                            <img src={Logo} width="112" height="20" alt=""/>
                        </Link>
                        <h5 className="Menu_text">Monitoring Dashboard</h5>
                        <div className="dropleft">
                            <a className="offset-5" href="#" id="imageDropdown" data-toggle="dropdown">
                                <img src={Menu_icon} width="20" height="20" alt=""/>
                            </a>
                            <ul className="dropdown-menu" role="menu" aria-labelledby="imageDropdown">
                                <Dropdown.Item><Link to="/">Home</Link></Dropdown.Item>
                                <Dropdown.Item><Link to="/domains">Maintaining List</Link></Dropdown.Item>
                                <Dropdown.Item><Link to="/users">User Maintaining List</Link></Dropdown.Item>
                                <Dropdown.Item><Link to="/login">Login</Link></Dropdown.Item>
                            </ul>
                        </div>
                    </nav>
                </div>
            }
        </>

    );
}


// <ul className="menu">
//     <li><Link to="/">Home Page</Link></li>
//     <li><Link to="/domains">Maintaining list</Link></li>
//     <li><Link to="/topics">Comment</Link></li>
//     <li><Link to="/login">Login</Link></li>
//     <li><Link to="/users">User maintaining list</Link></li>
// </ul>


export default Menu;