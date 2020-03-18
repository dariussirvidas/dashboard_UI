import React, {Component, useState} from 'react';
import {connect} from 'react-redux';
import login from './login.scss'
import Logo from "../../Content/logo.png";
import {
    Link,
    Redirect
} from "react-router-dom";

import {useSelector, useDispatch} from "react-redux";


import {increment, logIn, logInToken, authRole, logInTokenRefresh} from "../../actions/index";
import { NotificationManager } from 'react-notifications';

function Login(props) {

    const [redirectPath, setRedirectPath] = useState(null);

    const {counter} = useSelector(
        state => ({counter: state.counter})
    );

    const isLogged = useSelector(state => state.isLogged);
    const token = useSelector(state => state.token);
    const tokenRefresh = useSelector(state => state.tokenRefresh);
    const userData = useSelector(state => state.userData);


    const dispatch = useDispatch();


    return (

            <>
                <div>
                    <div className="login-page">
                        <div className="form">
                            <img src={Logo} alt="Festo Logo"/>
                            <hr className="line"/>
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

                dispatch(authRole(
                    {
                        role: response.role,
                        username: response.username
                    }));
                dispatch(logInToken(response.token));
                dispatch(logInTokenRefresh(response.refreshToke)); // <======== typo in backend
                dispatch(logIn());
                NotificationManager.success('Logged In!', 'Successful!', 3000);
                setRedirectPath('/');





            })
            .catch(error => {
                console.error("error while logging in reeee:", error);
    NotificationManager.error('Invalid credentials!', 'Error!', 3000);
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