import React, {Component, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import store from "../../js/store";
import DeleteUser from "../deleteUser/deleteUser";

function EditUserModal(props) {

    return (
        <div>
            <EditUser
                user={props.user}
                changeUserList={props.changeUserList}
                endpoint={props.endpoint}/>
        </div>
    );
}

function EditUser(props) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (
        <>
            <a variant="primary" className="txt" onClick={handleShow}>
                Edit
            </a>
            <Modal show={show} onHide={handleClose}>
                <div className="forma">
                    <form className="login-form" onSubmit={handleSubmit} id="formForPost" noValidate>
                        <div className="form-group"/>
                        <input type="text" placeholder="Username" defaultValue={props.user.username} name="userName" required/>
                        <input type="text" placeholder="First Name" defaultValue={props.user.firstName} name="firstName" required/>
                        <input type="text" placeholder="Last Name" defaultValue={props.user.lastName} name="lastName" required/>
                        <input type="email" placeholder="Email" defaultValue={props.user.userEmail} name="userEmail" required/>
                        {/* Backendas neatsiuncia passwordo */}
                        <input type="password" placeholder="Password"  name="password" required/> 
                        <input type="password" placeholder="Confirm Password"  name="confirmPassword" required/>
                        <hr/>
                        <br/>
                        <button type="submit" value="send POST">Add</button>
                        <button onClick={handleClose} type="button">Cancel</button>
                        <DeleteUser/>
                    </form>
                </div>
            </Modal>
        </>
    );

    function handleSubmit(event) {
        let dataForSending = {
            username: event.target.userName.value,
            firstName: event.target.firstName.value,
            lastName: event.target.lastName.value,
            userEmail: event.target.userEmail.value,
            password: event.target.password.value,
            confirmPassword: event.target.confirmPassword.value
        };
        console.log("full object for sending:", dataForSending);
        console.log("JSON string:", JSON.stringify(dataForSending));
        // console.log("domain obj: ", props.user);
        // submitData(props.endpoint, props.changeUserList, dataForSending);
        event.preventDefault();
    }

    async function fetchPut(endpoint, dataForSending) {
        const response = await fetch(endpoint,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Bearer ' + store.getState().token
                },
                body: JSON.stringify(dataForSending) // body data type must match "Content-Type" header
            }
        );
        let statusCode = response.status;
        return statusCode;
    }

    function submitData(endpoint, changeUserList, dataForSending) {
        fetchPut(endpoint + "users/admin/register" + props.user.id, dataForSending)
            .then((statusCode) => {
                console.log("status code " + statusCode + "...");
                if (statusCode > 199 && statusCode < 300) {
                    console.log("success!");
                    const editedUser = Object.assign({...props.user}, dataForSending);
                    changeUserList(editedUser)
                } else {
                    console.log("unsuccessful. what now?")
                }
            })
            .catch((error) => {
                console.error("FETCH ERROR: ", error);
            });
    }
}

export default EditUserModal;