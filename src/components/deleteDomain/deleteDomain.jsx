import React, {useEffect, useState} from 'react';
import './deleteDomain.scss';
import {ErrorMessage, LoadingSpinner} from "../elements/elements";
import Modal from 'react-bootstrap/Modal'
import Button from "react-bootstrap/Button";


import { NotificationManager } from 'react-notifications';
import {useSelector, useDispatch} from "react-redux";

function DeleteDomain(props) {

    const isLogged = useSelector(state => state.isLogged);
    const token = useSelector(state => state.token);
    const role = useSelector(state => state.role);

    async function fetchPutDelete() {
        const response = await fetch(props.endpoint + 'domain/del/' + props.domain.id, {
            headers: {
                'Authorization': 'Bearer ' + token
            },
                method: 'PUT'
            }
        );
        await console.log('statusCode:' + response.status);
        let statusCode = await response.status;
        return statusCode;
    }

    function deleteDomain() {
        fetchPutDelete()
            .then((statusCode) => {
                if (statusCode === 200) {
                    console.log("status code 200, run changeDomainList function!");
                    let dataForSending = {...props.domain};
                    dataForSending.deleted = true;
                    NotificationManager.success('Domain deleted!', 'Successful!', 3000);
                    props.changeDomainList(dataForSending)
                    
                } else if (statusCode === 400) {
                    console.log("status code 400, do something else");
                    // alert('reeeeeeee')
                } else {
                    console.log("status code " + statusCode + ", this is an unhandled exception I guess")
                }

            })
            .catch((error) => {
                console.error("error while PUT delete domain: " + error);
                
            });
    }
    

    const [show, setShow] = useState(false);
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
             <button type="button" className ="interactive" onClick={handleShow}>
            {/* <button type="button" onClick={deleteDomain}>Delete</button> */}
            Delete
            </button>
            <Modal show={show} onHide={handleClose}>
            <div className="forma">
                <form>
                <h3> Are you sure you want to delete this domain? </h3>
                <button variant="primary" className ="interactive1" onClick={deleteDomain}>Yes</button>
                <button variant="primary" className ="interactive1" onClick={handleClose}>Cancel</button>
                {/*  <Modal.Dialog>
                    <Modal.Header>
                        <Modal.Title>Delete Domain</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Are you sure you wish to delete this domain?</p>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="primary" onClick={deleteDomain}>Yes</Button>
                        <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                    </Modal.Footer>
                </Modal.Dialog> */}
                </form>
                </div>
                </Modal>
                
                
        </>
    )


}

export default DeleteDomain;