import React, {Component} from 'react';
import FestoLogo from '../.././Content/FestoLogo.png'
import menu from './menu.scss';
import {Link} from "react-router-dom";



class Menu extends Component {
    render() {
        return (
            <div className="header">
                <img className="Logo" src={FestoLogo} alt="Festo"/>
                <h1 className="headerText cl-h1">Monitoring Dashboard</h1>
                <h1 className="headerUser cl-h1"> User: user567</h1>
                <input className="menu-btn" type="checkbox" id="menu-btn"/>
                <label className="menu-icon" htmlFor="menu-btn"><span className="navicon"></span></label>
                <ul className="menu">
                    <li><Link to="/">Home Page</Link></li>
                    <li><Link to="/domains">Maintaining list</Link></li>
                    <li><Link to="/topics">Comment</Link></li>
                    <li><Link to="/">Users</Link></li>
                </ul>
            </div>
        );
    }
}

export default Menu;