import React, {Component, useState} from 'react';
import Logo from "../../Content/logo.png";
import './signup.scss';
import {Link, Redirect} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
function Signup() {

    const isLogged = useSelector(state => state.isLogged);
    const token = useSelector(state => state.token);
    const userData = useSelector(state => state.userData);

    //response from server
    const [response, setResponse] = useState(); //response from server

    //functionality for password matching
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    
    const checkPasswordMatch = function check(){
        setPasswordsMatch(document.getElementById("confirmPassword").value == document.getElementById("password").value)
    }

    if(response == "User created"){
        return <Redirect to="/login"/>
    }
        return (
            <div>
                <div className="login-page">
                    <div className="form">
                        <img src={Logo} alt="Festo Logo"/>
                        <hr className="line"/>
                        <form className="login-form" onSubmit={handleSubmit} id="formForSignUp">
                            <input type="text" placeholder="Username" name="userName" pattern="^[a-zA-Z0-9]{6,64}$" title="Your username needs to be between 6 and 64 characters long." required/>
                            <input type="text" placeholder="First Name" name="firstName" pattern="^[a-zA-Z]{1,64}$" title="Your name needs to be between 1 and 64 characters long." required/>
                            <input type="text" placeholder="Last Name" name="lastName" pattern="^[a-zA-Z]{1,64}$" title="Your name needs to be between 1 and 64 characters long." required/>
                            <input type="email" placeholder="Email" name="userEmail" required maxLength="256"/>
                            <input id="password" type="password" placeholder="Password" name="password"  pattern="^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)(?=\S*[\W_])\S{10,128}$" title="Mininum 10 chars and: atleast one uppercase, lowercase, special character and a number" required/>
                            <input id="confirmPassword" type="password" placeholder="Confirm Password" name="confirmPassword" onBlur={checkPasswordMatch} required/>
                            {passwordsMatch ? "":"Passwords don't match"}
                            <button type="submit" value="send POST" disabled={!passwordsMatch}>Create</button>
                            <div>{response}</div>
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
        }
        submitData(dataForSending);
        console.log("full object for POSTing:", dataForSending);
        event.preventDefault();
    }
    function submitData(dataForSending) {
        fetchPost(dataForSending)
            .then((response) => {
                console.log("POSTING USER status code = " + response.status);
                if (response.status > 199 && response.status < 300){
                    console.log(response.statusText)
                    console.log("success!")
                    setResponse("User created")
                    // let responseBody = response.json()
                    // .then((responseBody) => {
                    //     dataForSending.id = responseBody.id
                    //     dataForSending.role = "Admin" //pradzioj sukuriant userius per signup forma, role buna userio.
                    //     props.appendUserList(dataForSending)

                    // })
                }
                else{
                    let duomenys = response.json()
                    .then((duomenys) => {
                        setResponse(duomenys.message)
                        console.log(duomenys.message)
                    })
                }
            })

            .catch((error) => {
                console.error("error while fetching users:" + error);
            });
    }
    async function fetchPost(dataForSending) {
        const response = await fetch("https://watchhoundapi.azurewebsites.net/users/register",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataForSending) // body data type must match "Content-Type" header
            }
        );
        const data = response;
        return data;
    }

}
export default Signup;