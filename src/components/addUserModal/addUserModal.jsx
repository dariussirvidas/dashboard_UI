import React, {Component, useState} from 'react';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import store from "../../js/store";
import AddDomainModal from "../addDomainModal/addDomainModal";

function AddUserModal(props) {

    return (
        <div>
            <UserModal
                callbackFetch={props.callbackReFetchUsers}
                appendUserList={props.appendDomainList}
                endpoint={props.endpoint}/>
        </div>
    );

}

function UserModal(props) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //disabled inputs states:
    const [getSelectedMethod, setSelectedMethod] = useState(0);
    const [getSelectedServiceType, setSelectedServiceType] = useState(0);
    const [getBasicAuth, setBasicAuth] = useState(false);


    function changeMethodOption(event) { //<select name="method"
        setSelectedMethod(event.target.value)
    }

    function changeServiceTypeOption(event) { //<select name="serviceType"
        setSelectedServiceType(event.target.value)
    }

    function changeAuth(event) {
        setBasicAuth(event.target.checked)
    }

    const isUsernamePasswordDisabled = function checkIfDisabled() {
        if (getBasicAuth == true) {
            return false;
        } else {
            return true;
        }
    };

    return (
        <>
            <Button variant="primary" className="interactive" onClick={handleShow}>
                New User
            </Button>
            <Modal show={show} onHide={handleClose}>
                <div className="forma">
                    <form className="login-form" onSubmit={handleSubmit} id="formForPost" novalidate>
                        <div className="form-group"/>
                        <input type="text" placeholder="Username" name="userName" required/>
                        <input type="text" placeholder="First Name" name="firstName" required/>
                        <input type="text" placeholder="Last Name" name="lastName" required/>
                        <input type="email" placeholder="Email" name="userEmail" required/>
                        <input type="password" placeholder="Password" name="password" required/>
                        <input type="password" placeholder="Confirm Password" name="confirmPassword" required/>
                        <hr/>
                        <br/>
                        <button type="submit" value="send POST">Add</button>
                        <button onClick={handleClose}>Cancel</button>
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
        handleClose();
        event.preventDefault();
    }

    function submitData(dataForSending) {
        fetchPost(dataForSending)
            .then((response) => {
                console.log("POSTING USER status code = " + response.status);
                if (response.status > 199 && response.status < 300){
                    console.log("success!")
                    props.appendUserList(dataForSending)
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
                    'Authorization': 'Bearer ' + store.getState().token
                },
                body: JSON.stringify(dataForSending) // body data type must match "Content-Type" header
            }
        );
        const data = await response;
        return data;
    }


}

export default AddUserModal;