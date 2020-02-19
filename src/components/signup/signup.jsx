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
                        <form className="login-form"  onSubmit={handleSubmit} id="formForSignUp" noValidate>
                            <input type="text" placeholder="name" name="Name"/>
                            <input type="text" placeholder="surname" name="Surname"/>
                            <input type="password" placeholder="password" name="Password"/>
                            <input type="password" placeholder="repeat password" name="rPassword"/>
                            <input type="text" placeholder="email address" name="Email"/>
                            <button type="submit" value="send POST">create</button>

                            <p className="message">Already registered?<Link to="/login"> Sign in</Link></p>
                        </form>
                    </div>
                </div>
            </div>
        );

}
function handleSubmit(event) {
    try {
        var dataForSending = {
            name: event.target.Name.value,
            surname: event.target.Surname.value,
            password: event.target.Password.value,
            r_password: event.target.rPassword.value,
            email: event.target.Email.value

        };
    } catch (error) {
        console.log(error)
    }
    
    console.log("full object for POSTing:", dataForSending);
    
}


export default Signup;