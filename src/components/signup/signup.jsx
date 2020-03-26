import React, {useState} from 'react';
import Logo from "../../Content/logo.png";
import './signup.scss';
import {validateConfirmPassword} from "../../common";
import {Link, Redirect} from "react-router-dom";
import { NotificationManager } from 'react-notifications';
import './signup.scss';

function Signup(props) {

    const [postResponse, setResponse] = useState(); //response from server

    if(postResponse === "User created"){
        return <Redirect to="/login"/>
    }
    return (
        <div>
            <div className="login-page">
                <div className="form">
                    <img src={Logo} alt="Festo Logo"/>
                    <hr className="line"/>
                    <form className="login-form" onSubmit={handleSubmit} id="formForSignUp">
                        <input type="text" placeholder="Username" name="userName" pattern="^[a-zA-Z0-9]{6,64}$"
                               title="Your username needs to be between 6 and 64 characters long." required/>
                        <input type="text" placeholder="First Name" name="firstName" pattern="^[a-zA-Z]{1,64}$"
                               title="Your name needs to be between 1 and 64 characters long." required/>
                        <input type="text" placeholder="Last Name" name="lastName" pattern="^[a-zA-Z]{1,64}$"
                               title="Your name needs to be between 1 and 64 characters long." required/>
                        <input type="email" placeholder="Email" name="userEmail" required maxLength="256"/>
                        <input id="password" type="password" placeholder="Password" name="password"
                               pattern="^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)(?=\S*[\W_])\S{10,128}$"
                               title="Mininum 10 chars and: atleast one uppercase, lowercase, special character and a number"
                               onChange={validateConfirmPassword} required/>
                        <input id="confirmPassword" type="password" placeholder="Confirm Password"
                               name="confirmPassword" onChange={validateConfirmPassword} required/>
                        <button type="submit" value="send POST">Create</button>
                        <div>{postResponse}</div>
                        <p className="message">Already registered?<Link to="/login"> Sign in</Link></p>
                    </form>
                </div>
            </div>
        </div>
    );

    function handleSubmit(event) {
        var dataForSending = {
            firstName: event.target.firstName.value,
            lastName: event.target.lastName.value,
            username: event.target.userName.value,
            password: event.target.password.value,
            confirmPassword: event.target.confirmPassword.value,
            userEmail: event.target.userEmail.value
        };
        submitData(dataForSending);
        event.preventDefault();
    }
    function submitData(dataForSending) {
        props.fetches.fetchPostNoAuth(props.endpoint + "users/register/", dataForSending).then((response) => {
            if (response.status > 199 && response.status < 300) {
                setResponse("User created");
                NotificationManager.success("User Created!", 'Successful!', 3000);
            } else {
                response.json().then((duomenys) => {
                    setResponse(duomenys.message);
                    //NotificationManager.error(duomenys.message, 'Error!', 3000);
                })
            }
        }).catch((error) => {
            console.error("error while fetching users:" + error);
        });
    }

}
export default Signup;