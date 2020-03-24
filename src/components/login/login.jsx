import React from 'react';
import Logo from "../../Content/logo.png";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {logIn, logInToken, authRole, logInTokenRefresh} from "../../actions/index";
import { NotificationManager } from 'react-notifications';

function Login(props) {

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
        fetchToken(userInformation);
        event.preventDefault();
    }
    function fetchToken(userInformation) {
        fetchFromApi(userInformation).then(response => {
            dispatch(authRole(
                {
                    role: response.role,
                    username: response.username
                }));
            dispatch(logInToken(response.token));
            dispatch(logInTokenRefresh(response.refreshToke)); // <========================== typo in backend
            dispatch(logIn());
            NotificationManager.success('Logged In!', 'Successful!', 3000);
        }).catch(() => {
            NotificationManager.error('Invalid credentials!', 'Error!', 3000);
        });
    }
    async function fetchFromApi(userInformation) {
        const response = await props.fetches.fetchPostNoAuth(props.endpoint + "users/authenticate/", userInformation);
        return await response.json();
    }

}

export default Login;