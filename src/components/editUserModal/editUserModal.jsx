import React, {Component, useState} from 'react';
import Modal from "react-bootstrap/Modal";

import DeleteUser from "../deleteUser/deleteUser";
import './editUserModal.scss';
import {validateConfirmPassword} from "../../common";

import {useSelector, useDispatch} from "react-redux";
import {NotificationManager} from 'react-notifications';

function EditUserModal(props) {

    const isLogged = useSelector(state => state.isLogged);
    const token = useSelector(state => state.token);
    const userData = useSelector(state => state.userData);

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
    const [response, setResponse] = useState(); //response from server
    const isLogged = useSelector(state => state.isLogged);
    const token = useSelector(state => state.token);
    const userData = useSelector(state => state.userData);

    const handleClose = () => {
        setShow(false);
    };
    const handleShow = () => {
        setShow(true);
        setResponse();
    }

    return (
        <>
            <a className="btn btn-link btn-sm txt" variant="primary" onClick={handleShow}>
                <i className="material-icons iconHover">&#xe254;</i>
            </a>
            <Modal show={show} onHide={handleClose} className="UserModal">
                <div className="forma">
                    <form className="login-form" onSubmit={handleSubmit} id="formForPost">
                        <div className="form-group"/>
                        <input type="text" placeholder="Username" defaultValue={props.user.username} name="userName"
                               pattern="^[a-zA-Z0-9]{6,64}$" title="Must be between 6 and 64 letters or numbers" required/>
                        <input type="text" placeholder="First Name" defaultValue={props.user.firstName} name="firstName"
                               pattern="^[a-zA-Z]{1,64}$" title="Must be between 1 and 64 letters" required/>
                        <input type="text" placeholder="Last Name" defaultValue={props.user.lastName} name="lastName"
                               pattern="^[a-zA-Z]{1,64}$" title="Must be between 1 and 64 letters" required/>
                        <input type="email" placeholder="Email" defaultValue={props.user.userEmail} name="userEmail"
                               required maxLength="256"/>
                        {
                            props.user.role == "Admin" ?
                                <select name="role" className="SelectFrom" required>
                                    <option value="User">User</option>
                                    <option value="Admin" selected={true}>Admin</option>
                                </select>
                                :
                                <select name="role" className="SelectFrom" required>
                                    <option value="User" selected={true}>User</option>
                                    <option value="Admin">Admin</option>
                                </select>
                        }
                        {/* Backendas neatsiuncia passwordo */}
                        <input id="password" type="password" placeholder="Password" name="password"
                               pattern="^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)(?=\S*[\W_])\S{10,128}$"
                               title="Mininum 10 chars and at least one uppercase, lowercase, special character and a number"
                               onChange={validateConfirmPassword} required/>
                        <input id="confirmPassword" type="password" placeholder="Confirm Password"
                               name="confirmPassword" onChange={validateConfirmPassword} required/>
                        <button type="submit" value="send POST" className="interactive">Update</button>
                        <button onClick={handleClose} type="button" className="interactive">Cancel</button>
                        <DeleteUser
                            user={props.user}
                            changeUserList={props.changeUserList}
                            endpoint={props.endpoint}/>
                        <div>{response}</div>
                    </form>
                </div>
            </Modal>
        </>
    );

    function handleSubmit(event) {
        var dataForSending = {
            username: event.target.userName.value,
            firstName: event.target.firstName.value,
            lastName: event.target.lastName.value,
            userEmail: event.target.userEmail.value,
            password: event.target.password.value,
            confirmPassword: event.target.confirmPassword.value,
            role: event.target.role.value
        };
        submitData(props.endpoint, props.changeUserList, dataForSending);
        event.preventDefault();
    }

    async function fetchPut(endpoint, dataForSending) {
        const response = await fetch(endpoint,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(dataForSending) // body data type must match "Content-Type" header
            }
        );
        const data = response;
        return data;
    }

    function submitData(endpoint, changeUserList, dataForSending) {
        fetchPut(endpoint + "users/" + props.user.id, dataForSending)
            .then((response) => {
                if (response.status > 199 && response.status < 300) {
                    setResponse("User updated")

                    const editedUser = Object.assign({...props.user}, dataForSending);
                    changeUserList(editedUser)
                    handleClose();
                    NotificationManager.success('User changes saved!', 'Edit Successful!', 3000);
                }
                if (response.status == 403) { //cia lempiskai dbr, bet mum 403 grazina tik kai role keiciam.
                    setResponse("You can't change your role")
                }
                if(response.status == 400){
                    return response.json()
                }

                else {
                    console.log("Something went wrong: ", response)
                }
            }).then((responseJson)=>{typeof responseJson != "undefined"? setResponse(responseJson.message) : void(0)})
            .catch((error) => {
                console.error("FETCH ERROR: ", error);
                NotificationManager.error('Something went wrong!', 'Error!', 3000);
            });
    }
}

export default EditUserModal;