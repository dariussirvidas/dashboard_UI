import React, {Component, useState} from 'react';
import store from "../../js/store";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function DeleteUser(props) {

    async function fetchPutDelete() {
        console.log("useris: ", props.user);
        const response = await fetch(props.endpoint + 'users/' + props.user.id, {
                headers: {
                    // 'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + store.getState().token
                },
                method: 'DELETE',
            // body: JSON.stringify(props.user.id)
            }
        );
        await console.log('statusCode:' + response.status);
        let statusCode = await response.status;
        return statusCode;
    }
    function deleteUser() {
        fetchPutDelete()
            .then((statusCode) => {
                if (statusCode === 200) {
                    console.log("status code 200, run changeUserList function!");
                    let dataForSending = {...props.user};
                    dataForSending.deleted = true;
                    props.changeUserList(dataForSending)

                } else if (statusCode === 400) {
                    console.log("status code 400, do something else");
                } else {
                    console.log("status code " + statusCode + ", this is an unhandled exception")
                }

            })
            .catch((error) => {
                console.error("error while PUT delete user: " + error);
            });
    }

        const [show, setShow] = useState(false);
        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);

        return (
            <div>
                <Button variant="primary" className ="interactive"onClick={handleShow}>
                    Delete
                </Button>
                <Modal show={show} onHide={handleClose}>
                    <div className="forma">
                        <form>
                            <h3> Are you sure you want to delete this domain? </h3>
                            <Button variant="primary" className ="interactive1" onClick={deleteUser}>Yes</Button>
                            <Button variant="primary" className ="interactive1" onClick={handleClose}>Cancel</Button>
                        </form>
                    </div>
                </Modal>
            </div>
        );
}

export default DeleteUser;