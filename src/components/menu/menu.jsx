import React, {Component} from 'react';
import Logo from '../../Content/Festo logo.svg';
import Menu_icon from '../../Content/hamburger_menu.png';
import Dropdown from 'react-bootstrap/Dropdown';
import Style from './menu.scss';

const CustomToggle = React.forwardRef(({onClick}, ref) => (
    <a
        href=""
        ref={ref}
        onClick={e => {

            e.preventDefault();
            onClick(e);
        }}
    >
        <img src={Menu_icon} width="20" height="20" alt=""/>
    </a>
));

function Menu() {
    return (
        <div className="container">
            <nav className="navbar navbar-light bg-white">
                <a className="navbar-brand" href="/">
                    <img src={Logo} width="112" height="20" alt=""/>
                </a>
                <h5 className="Menu_text">Monitoring Dashboard</h5>
                <h5 className="Menu_text">User: id13</h5>
                <Dropdown>
                    <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="Dropdown" s>
                        <Dropdown.Item href="/">Home</Dropdown.Item>
                        <Dropdown.Item href="/domains">Maintaining List</Dropdown.Item>
                        <Dropdown.Item href="/users">User Maintaining List</Dropdown.Item>
                        <Dropdown.Item href="/topics">Comment</Dropdown.Item>
                        <Dropdown.Item href="/login">Login</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </nav>
        </div>
    );
}

export default Menu;