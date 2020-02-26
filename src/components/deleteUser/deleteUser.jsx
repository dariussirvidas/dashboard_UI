import React, {Component, useState} from 'react';
import store from "../../js/store";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import './deleteUser.scss';
import { NotificationManager } from 'react-notifications';
function DeleteUser(props) {
    console.log(props.user)
    async function fetchPutDelete() {
        const response = await fetch(props.endpoint + 'users/' + props.user.id, {
                headers: {
                    // 'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + store.getState().token
                },
                method: 'DELETE',
            // body: JSON.stringify(props.user.id)
            }
        );
        console.log('statusCode:' + response.status);
        let statusCode = response.status;
        return statusCode;
    }
    function deleteUser() {
        fetchPutDelete()
            .then((statusCode) => {
                if (statusCode === 200) {
                    console.log("status code 200, run changeUserList function!");
                    let dataForSending = {...props.user};
                    dataForSending.deleted = true;
                    NotificationManager.success('User deleted!', 'Successful!', 3000);
                    props.changeUserList(dataForSending)

                } else if (statusCode === 400) {
                    console.log("status code 400, do something else");
                } else {
                    console.log("status code " + statusCode + ", this is an unhandled exception")
                }

            })
            .catch((error) => {
                console.error("error while delete user: " + error);
            });
    }

        const [show, setShow] = useState(false);
        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);

        return (
            <>
            <button type="button" className ="interactive" onClick={handleShow}>
            Delete
            </button>
            <Modal show={show} onHide={handleClose}>
            <div className="forma">
                <form>
                <h3> Are you sure you want to delete this user? </h3>
                <button variant="primary" className ="interactive1" onClick={deleteUser}>Yes</button>
                <button variant="primary" className ="interactive1" onClick={handleClose}>Cancel</button>
                </form>
                </div>
                </Modal>
                </>
        )
}

export default DeleteUser;