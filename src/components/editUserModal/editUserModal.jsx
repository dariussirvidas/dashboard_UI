import React, {useState} from 'react';
import Modal from "react-bootstrap/Modal";
import DeleteUser from "../deleteUser/deleteUser";
import './editUserModal.scss';
import {validateConfirmPassword} from "../../common";
import {NotificationManager} from 'react-notifications';

function EditUserModal(props) {

    return (
        <div>
            <EditUser
                user={props.user}
                changeUserList={props.changeUserList}
                endpoint={props.endpoint}
                fetches={props.fetches}
            />
        </div>
    );
}

function EditUser(props) {

    const [show, setShow] = useState(false);
    const [putResponse, setResponse] = useState(); //response from server

    const handleClose = () => {
        setShow(false);
    };
    const handleShow = () => {
        setShow(true);
        setResponse();
    };

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
                        <select name="role" className="SelectFrom" defaultValue={props.user.role} required>
                            <option value="User">User</option>
                            <option value="Admin">Admin</option>
                        </select>
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
                            endpoint={props.endpoint}
                            fetches={props.fetches}
                        />
                        <div>{putResponse === "You can't change your role" ? putResponse : ""}</div>
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

    function submitData(endpoint, changeUserList, dataForSending) {
        props.fetches.fetchPut(endpoint + "users/" + props.user.id, dataForSending).then((response) => {
            if (response.status > 199 && response.status < 300) {
                setResponse("User updated");
                const editedUser = Object.assign({...props.user}, dataForSending);
                changeUserList(editedUser);
                handleClose();
                NotificationManager.success('User changes saved!', 'Edit Successful!', 3000);
            } else if (response.status === 403) { //cia lempiskai dbr, bet mum 403 grazina tik kai role keiciam.
                setResponse("You can't change your role")
            } else if (response.status === 400) {
                return response.json();
            }
        }).then((responseJson) => {
            typeof responseJson != "undefined" ? setResponse(responseJson.message) : void (0)
        }).catch((error) => {
            console.error("FETCH ERROR: ", error);
            NotificationManager.error('Something went wrong!', 'Error!', 3000);
        });
    }
}

export default EditUserModal;