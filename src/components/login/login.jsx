import React, {Component} from 'react';
import login from './login.scss'
import Logo from "../../Content/logo.png";
import {Link} from "react-router-dom";

import {useSelector, useDispatch} from "react-redux";


import {increment, logIn, logInToken, authRole} from "../../actions/index";



function Login(props) {


    const counter = useSelector(state => state.counter);
    const isLogged = useSelector(state => state.isLogged);
    const token = useSelector(state => state.token);
    const role = useSelector(state => state.role);
    const dispatch = useDispatch();



    return (
        <>
            <div>
                <div className="login-page">
                    <div className="form">
                        <img src={Logo} alt="Festo Logo"/>
                        <hr/>
                        <form onSubmit={handleSubmit} className="login-form">
                            <input name="username" type="text" placeholder="username"/>
                            <input name="password" type="password" placeholder="password"/>
                            <button type="submit">login</button>
                            <p className="message">Not registered? <Link to="/signup">Create an account</Link></p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );



    function handleSubmit(event) {

        const userInformation = {
            username: event.target.username.value,
            password: event.target.password.value
        };
        console.log("userInfomation: ", userInformation);
        fetchToken(userInformation);
        event.preventDefault();
    }

    function fetchToken(userInformation) {
        console.log("fetchToken!!!");
        fetchFromApi(userInformation)
            .then(response => {
                console.log(response);

                // sets isLoggedIn to true

                dispatch(logInToken(response.token));
                dispatch(logIn());
                dispatch(authRole(response.role));

                window.localStorage.setItem("token", token);
                window.localStorage.setItem("isLogged", isLogged);
                window.localStorage.setItem("role", role);


            })
            .catch(error => {
                console.error("error while logging in reeee:", error);
            });
    }

    async function fetchFromApi(userInformation) {
        const response = await fetch(props.endpoint + "users/authenticate/", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(userInformation) // body data type must match "Content-Type" header

        });
        return await response.json();
    }

}

export default Login;