import React from 'react';
import Logo from '../../Content/Festo logo.svg';
import Menu_icon from '../../Content/hamburger_menu.png';
import Dropdown from 'react-bootstrap/Dropdown';
import './menu.scss';
import {Link} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import User_icon from '../../Content/user_icon.png';
import {logOut} from "../../actions";

function Menu(props) {

    const isLogged = useSelector(state => state.isLogged);
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
                                    <Dropdown.Item className="btn text-left" href="/">Home</Dropdown.Item>
                                    <Dropdown.Item className="btn text-left" href="/domains">Maintaining
                                        List</Dropdown.Item>
                                    {
                                        userData.role === "Admin" &&
                                        <Dropdown.Item className="btn text-left" href="/users">User
                                            Maintaining
                                            List</Dropdown.Item>
                                    }
                                    <Dropdown.Item className="btn text-left" href="/logs">
                                            Logs
                                    </Dropdown.Item>
                                    <Dropdown.Item className="btn text-left" type="button" onClick={() => {
                                        dispatch(logOut());
                                        props.purgeLocalState();
                                    }}>
                                        Log Out
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

export default Menu;