import React, {Component} from 'react';
import menu from './menu.scss';
import FestoLogo from '../.././Content/FestoLogo.png'

class Menu extends Component {
    render() {
        return (
            <div className="header">
                <img className="Logo" src={FestoLogo} alt="Festo"/>
                <input className="menu-btn" type="checkbox" id="menu-btn"/>
                <label className="menu-icon" htmlFor="menu-btn"><span className="navicon"></span></label>
                <ul className="menu">
                    <li><a href="#HomePage">Home Page</a></li>
                    <li><a href="#MaintainingList">Maintaining list</a></li>
                    <li><a href="#Comment">Comment</a></li>
                    <li><a href="#Users">Users</a></li>
                </ul>
            </div>
        );
    }
}

export default Menu;