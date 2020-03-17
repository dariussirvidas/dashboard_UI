import React, {Component, useState} from 'react';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import './addUserModal.scss';

import AddDomainModal from "../addDomainModal/addDomainModal";
import './addUserModal.scss';
import {validateConfirmPassword} from "../../common";

import {useSelector, useDispatch} from "react-redux";
import { NotificationManager } from 'react-notifications';

function AddUserModal(props) {

    const isLogged = useSelector(state => state.isLogged);
    const token = useSelector(state => state.token);
    const userData = useSelector(state => state.userData);

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
    const userData = useSelector(state => state.userData);

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
    };
    const handleShow = () => setShow(true);

    const [response, setResponse] = useState(); //response from server

    return (
        <>
            <button  className="Buttonas" onClick={handleShow}>
                New User
            </button>
            <Modal show={show} onHide={handleClose}>
                <div className="forma">
                    <form className="login-form" onSubmit={handleSubmit} id="formForPost">
                        <div className="form-group"/>
                        <input type="text" placeholder="Username" name="userName" pattern="^[a-zA-Z0-9]{6,64}$" title="Must be between 6 and 64 letters or numbers" required/>
                        <input type="text" placeholder="First Name" name="firstName" pattern="^[a-zA-Z]{1,64}$" title="Must be between 1 and 64 letters" required/>
                        <input type="text" placeholder="Last Name" name="lastName" pattern="^[a-zA-Z]{1,64}$" title="Must be between 1 and 64 letters" required/>
                        <input type="email" placeholder="Email" name="userEmail" required maxLength="256"/>
                        <input id="password" type="password" placeholder="Password" name="password"  pattern="^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)(?=\S*[\W_])\S{10,128}$"
                               title="Mininum 10 chars and at least one uppercase, lowercase, special character and a number" onChange={validateConfirmPassword} required/>
                        <input id="confirmPassword" type="password" placeholder="Confirm Password" name="confirmPassword" onChange={validateConfirmPassword} required/>
                        <button type="submit" value="send POST">Add</button>
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

        submitData(dataForSending);
        event.preventDefault();
    }

    function submitData(dataForSending) {
        fetchPost(dataForSending)
            .then((response) => {

                if (response.status > 199 && response.status < 300){
                    console.log("success!")
                    setResponse("User created")
                    let responseBody = response.json()
                    .then((responseBody) => {
                        dataForSending.id = responseBody.id
                        dataForSending.role = "User" //pradzioj sukuriant userius, role buna userio.
                        props.appendUserList(dataForSending)
                        
                    })
                    handleClose();
                    NotificationManager.success('New user added!', 'Successful!', 3000);
                }
                else{
                    let duomenys = response.json()
                    .then((duomenys) => {
                        setResponse(duomenys.message)

                    })
                }
            })

            .catch((error) => {
                console.error("error while fetching users:" + error);
                NotificationManager.error('Something went wrong!', 'Error!', 3000);
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