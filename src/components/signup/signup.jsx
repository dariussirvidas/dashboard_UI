import React, {Component} from 'react';
import Logo from "../../Content/logo.png";
import signup from './signup.scss';
import {Link} from "react-router-dom";
function Signup() {

        return (
            <div>
                <div className="login-page">
                    <div className="form">
                        <img src={Logo} alt="Festo Logo"/>
                        <hr/>
                        <form className="login-form">
                            <input type="text" placeholder="name"/>
                            <input type="text" placeholder="surname"/>
                            <input type="password" placeholder="password"/>
                            <input type="password" placeholder="repeat password"/>
                            <input type="text" placeholder="email address"/>
                            <button>create</button>

                            <p className="message">Already registered?<Link to="/login"> Sign in</Link></p>
                        </form>
                    </div>
                </div>
            </div>
        );

}

export default Signup;