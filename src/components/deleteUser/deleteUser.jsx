import React, {useState} from 'react';
import Modal from "react-bootstrap/Modal";
import './deleteUser.scss';
import { NotificationManager } from 'react-notifications';

function DeleteUser(props) {

    async function fetchPutDelete() {
        const response = await props.fetches.fetchDelete(props.endpoint + 'users/' + props.user.id);
        return response.status;
    }
    function deleteUser() {
        fetchPutDelete()
            .then((statusCode) => {
                if (statusCode === 200) {
                    let dataForSending = {...props.user};
                    dataForSending.deleted = true;
                    NotificationManager.success('User deleted!', 'Successful!', 3000);
                    props.changeUserList(dataForSending)

                } else  {
                    NotificationManager.error('Failed to delete user!', 'Error!', 3000);
                }

            })
            .catch((error) => {
                console.error("error while delete user: " + error);
                NotificationManager.error('Failed to delete user!', 'Error!', 3000);
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
                <button type="button" className ="interactive1" onClick={deleteUser}>Yes</button>
                <button type="button" className ="interactive1" onClick={handleClose}>Cancel</button>
                </form>
                </div>
                </Modal>
                </>
        )
}

export default DeleteUser;