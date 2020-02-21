import React, {useEffect, useState} from 'react';
import './deleteDomain.scss';
import {ErrorMessage, LoadingSpinner} from "../elements/elements";
import Modal from 'react-bootstrap/Modal'
import Button from "react-bootstrap/Button";
import Toast from 'react-bootstrap/Toast'

function DeleteDomain(props) {

    async function fetchPutDelete() {
        const response = await fetch(props.endpoint + 'domain/del/' + props.domain.id, {
            headers: {
                // 'Authorization': 'Bearer ' + store.getState().token
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
            /* alert("domain deleted") */
    }
    /* function showToast() {
        
        
        <Toast>
        <strong className="mr-auto"><i className="eva eva-trash-2-outline"></i>Bootstrap</strong>
      <Toast.Header>
        <small>11 mins ago</small>
      </Toast.Header>
      <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
    </Toast>
            
        
    } */

    const [show, setShow] = useState(false);
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" className ="interactive"onClick={handleShow}>
            {/* <button type="button" onClick={deleteDomain}>Delete</button> */}
            Delete
            </Button>
            <Modal show={show} onHide={handleClose}>
            <div className="forma">
                <form>
                <h3> Are you sure you want to delete this domain? </h3>
                {/* <button type="button" className ="primary" onClick={deleteDomain}>Yes</button>
                <button type="button" className ="interactive" onClick={handleClose}>Cancel</button> */}
                <Button variant="primary" className ="interactive1" onClick={deleteDomain}>Yes</Button>
                <Button variant="primary" className ="interactive1" onClick={handleClose}>Cancel</Button>
                
                </form>
                </div>
                </Modal>
                
                
        </>
    )


}

export default DeleteDomain;