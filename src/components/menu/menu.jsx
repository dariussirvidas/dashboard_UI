import React, {Component} from 'react';
import FestoLogo from '../.././Content/FestoLogo.png'
import menu from './menu.scss';



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