import React, {Component} from 'react';
import Logo from '../../Content/Festo logo.svg';
import Menu_icon from '../../Content/hamburger_menu.png';
import Dropdown from 'react-bootstrap/Dropdown';
import Style from './menu.scss';



function Menu() {
    return (
        <div className="container NavBarOnTop">
            <nav className="navbar navbar-light bg-white">
                <a className="navbar-brand" href="/stickerList">
                    <img src={Logo} width="112" height="20" alt=""/>
                </a>
                <h5 className="Menu_text">Monitoring Dashboard</h5>
                <h5 className="Menu_text">User: id50</h5>
                    <div className="dropleft">
                        <a className="offset-5" href="#" id="imageDropdown" data-toggle="dropdown">
                            <img src={Menu_icon} width="20" height="20" alt=""/>
                        </a>
                        <ul className="dropdown-menu"  role="menu" aria-labelledby="imageDropdown">
                            <Dropdown.Item href="/">Home</Dropdown.Item>
                            <Dropdown.Item href="/domains">Maintaining List</Dropdown.Item>
                            <Dropdown.Item href="/users">User Maintaining List</Dropdown.Item>
                            <Dropdown.Item href="/topics">Comment</Dropdown.Item>
                            <Dropdown.Item href="/login">Login</Dropdown.Item>
                        </ul>
                    </div>
            </nav>
        </div>
    );
}

export default Menu;