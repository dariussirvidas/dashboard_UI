import React, {Component, useState} from 'react';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import AddDomainModal from "../addDomainModal/addDomainModal";
import './addUserModal.scss';

import {useSelector, useDispatch} from "react-redux";

function AddUserModal(props) {

    const isLogged = useSelector(state => state.isLogged);
    const token = useSelector(state => state.token);
    const role = useSelector(state => state.role);

    return (
        <div>
            <UserModal
                callbackFetch={props.callbackReFetchUsers}
                appendUserList={props.appendUserList}
                endpoint={props.endpoint}/>
        </div>
    );

}

function UserModal(props) {

    const isLogged = useSelector(state => state.isLogged);
    const token = useSelector(state => state.token);
    const role = useSelector(state => state.role);

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
        setPasswordsMatch(true) //after we close and re-enter Modal to have password state reset to default.
    };
    const handleShow = () => setShow(true);

    //Check if passwords match
    
    const [passwordsMatch, setPasswordsMatch] = useState(true);

    const checkPasswordMatch = function check(){
        setPasswordsMatch(document.getElementById("confirmPassword").value == document.getElementById("password").value)
    }
    const [response, setResponse] = useState(); //response from server

    return (
        <>
            <button  className="Buttonas" onClick={handleShow}>
                New User
            </button>
            <Modal show={show} onHide={handleClose}>
                <div className="forma">
                    <form className="login-form" onSubmit={handleSubmit} id="formForPost" novalidate>
                        <div className="form-group"/>
                        <input type="text" placeholder="Username" name="userName" min="6" max="64" required/>
                        <input type="text" placeholder="First Name" name="firstName" required max="64"/>
                        <input type="text" placeholder="Last Name" name="lastName" required max="64"/>
                        <input type="email" placeholder="Email" name="userEmail" required max="256"/>
                        <input id="password" type="password" placeholder="Password" name="password" onChange={checkPasswordMatch} pattern="^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)(?=\S*[\W_])\S{10,128}$" title="Mininum 10 chars and: atleast one uppercase, lowercase, special character and a number" required/>
                        <input id="confirmPassword" type="password" placeholder="Confirm Password" name="confirmPassword" onChange={checkPasswordMatch} required/>
                        {passwordsMatch ? "":"Passwords don't match"}
                        <br/>
                        <button type="submit" value="send POST" disabled={!passwordsMatch}>Add</button> 
                        <button onClick={handleClose} >Cancel</button>
                        <div>{response}</div>
                    </form>
                </div>
            </Modal>
        </>
    );

    function handleSubmit(event) {


        try {
            var dataForSending = {
                firstName: event.target.firstName.value,
                lastName: event.target.lastName.value,
                username: event.target.userName.value,
                password: event.target.password.value,
                confirmPassword: event.target.confirmPassword.value,
                userEmail: event.target.userEmail.value
            };
        } catch (error) {
            console.log(error)
        }

        console.log("full object for Posting:", dataForSending);
        console.log("full object for sending JSON:", JSON.stringify(dataForSending));
        submitData(dataForSending);
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
                    let responseBody = response.json()
                    .then((responseBody) => {
                        dataForSending.id = responseBody.id
                        dataForSending.role = "User" //pradzioj sukuriant userius, role buna userio.
                        props.appendUserList(dataForSending)
                        
                    })
                    handleClose();
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
        const response = await fetch(props.endpoint + "users/admin/register",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(dataForSending) // body data type must match "Content-Type" header
            }
        );
        const data = response;
        return data;
    }
}

export default AddUserModal;