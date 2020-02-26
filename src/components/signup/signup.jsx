import React, {Component} from 'react';
import Logo from "../../Content/logo.png";
import './signup.scss';
import {Link} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
function Signup() {

    const isLogged = useSelector(state => state.isLogged);
    const token = useSelector(state => state.token);
    const userData = useSelector(state => state.userData);

        return (
            <div>
                <div className="login-page">
                    <div className="form">
                        <img src={Logo} alt="Festo Logo"/>
                        <hr className="line"/>
                        <form className="login-form"  onSubmit={handleSubmit} id="formForSignUp" noValidate>
                            <input type="text" placeholder="Username" name="Username"/>
                            <input type="text" placeholder="name" name="Name"/>
                            <input type="text" placeholder="surname" name="Surname"/>
                            <input type="password" placeholder="password" name="Password"/>
                            <input type="password" placeholder="repeat password" name="repeatPassword"/>
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
            username: event.target.Username.value,
            name: event.target.Name.value,
            surname: event.target.Surname.value,
            password: event.target.Password.value,
            r_password: event.target.repeatPassword.value,
            email: event.target.Email.value

        };
    } catch (error) {
        console.log(error)
    }
    
    console.log("full object for POSTing:", dataForSending);
    
}


export default Signup;