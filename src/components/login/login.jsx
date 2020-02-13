import React, {Component} from 'react';
import login from './login.scss'
import Logo from "../../Content/logo.png";
function Login() {
    return (
        <div>
            <div className="login-page">
                <div className="form">
                    <img src={Logo} alt="Festo Logo"/>
                    <hr/>
                    <form className="login-form">
                        <input type="text" placeholder="username"/>
                        <input type="password" placeholder="password"/>
                        <button href="/">login</button>
                        <p className="message">Not registered? <a href="/signup">Create an account</a></p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;