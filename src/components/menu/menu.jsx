import React, {Component, useState} from 'react';
import Logo from '../../Content/Festo logo.svg';
import Menu_icon from '../../Content/hamburger_menu.png';
import Dropdown from 'react-bootstrap/Dropdown';
import './menu.scss';
import {Link, Redirect} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import User_icon from '../../Content/user_icon.png';
import {logIn, logOut} from "../../actions";

function Menu(props) {

    const isLogged = useSelector(state => state.isLogged);
    const token = useSelector(state => state.token);
    const userData = useSelector(state => state.userData);
    const dispatch = useDispatch();

    return (
        <>
            {
                isLogged === true &&
                <div className="border-bottom border-primary">
                    <div className="container NavBarOnTop">
                        <nav className="navbar navbar-light bg-white">
                            <Link className="navbar-brand" to="/">
                                <img src={Logo} width="112" height="20" alt=""/>
                            </Link>
                            <h5 className="Menu_text">Monitoring Dashboard</h5>
                            <h5><img src={User_icon} alt="user icon" width="20"
                                     height="20"/>{userData.username}
                            </h5>
                            <div className="dropleft">
                                <a className="offset-5" href="#" id="imageDropdown" data-toggle="dropdown">
                                    <img src={Menu_icon} width="20" height="20" alt=""/>
                                </a>
                                <ul className="dropdown-menu" role="menu" aria-labelledby="imageDropdown">
                                    <Dropdown.Item><Link className="btn text-left"
                                                         to="/">Home</Link></Dropdown.Item>
                                    <Dropdown.Item><Link className="btn text-left" to="/domains">Maintaining
                                        List</Link></Dropdown.Item>
                                    {
                                        userData.role === "Admin" &&
                                        <Dropdown.Item><Link className="btn text-left" to="/users">User
                                            Maintaining
                                            List</Link></Dropdown.Item>
                                    }
                                    <Dropdown.Item>
                                        <Link className="btn text-left" to="/logs">
                                            Logs
                                        </Link>
                                    </Dropdown.Item>
                                    <Dropdown.Item>
                                        <button className="btn text-left" type="button" onClick={() => {

                                            dispatch(logOut());
                                            props.purgeLocalState();
                                        }}>Log Out
                                        </button>
                                    </Dropdown.Item>
                                </ul>
                            </div>
                        </nav>
                    </div>
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