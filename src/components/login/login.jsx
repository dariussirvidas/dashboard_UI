import React, {Component} from 'react';
import login from './login.scss'
import Logo from "../../Content/logo.png";
import {Link} from "react-router-dom";
function Login() {
    return (
        <div>
            <div className="login-page">
                <div className="form">
                    <img src={Logo} alt="Festo Logo"/>
                    <hr className="line"/>
                    <form className="login-form">
                        <input type="text" placeholder="username"/>
                        <input type="password" placeholder="password"/>
                        <button href="/">login</button>
                        <p className="message">Not registered? <Link to="/signup">Create an account</Link></p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;