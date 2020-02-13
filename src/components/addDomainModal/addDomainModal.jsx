import React, {Component, useState} from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from "react-bootstrap/Button";
import Style from './addDomainModal.scss';

// currently functions as another Add service
// jei webapp, metodas GET, keisti negalima, nereikia parametru
// jei auth checked, neduoda user ir password

let isWebappSelected = false;
let isRestSelected = false;
let isSoapSelected = false;

function AddDomainModal(props) {

    return (
        <div>
            <Example
                callbackFetch={props.callbackReFetchDomains}
                appendDomainList={props.appendDomainList}
                endpoint={props.endpoint}/>
        </div>
    );
}

function Example(props) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Add Domain new
            </Button>

            <Modal show={show} onHide={handleClose}>
                <div className="forma ">
                    <form className="login-form" onSubmit={handleSubmit} id="formForPost">
                        <input type="text" placeholder="Service name" name="serviceName"/>
                        <select className="SelectFrom" required name="method">>
                            <option value={1}>POST</option>
                            <option value={0}>GET</option>
                        </select>
                        <select className="SelectFrom" required name="serviceType">
                            <option selected={isWebappSelected} value={0}>WebApp</option>
                            <option selected={isRestSelected} value={1}>Service - REST</option>
                            <option selected={isSoapSelected} value={2}>Service - SOAP</option>
                        </select>
                        <input type="url" placeholder="URL" name="url"/>
                        <input type="email" placeholder="Email" name="email"/>
                        <p>Basic Auth: </p> <input type="checkbox" name="auth"></input>
                        <input type="text" placeholder="User" name="user"/>
                        <input type="password" placeholder="Password" name="password"/>
                        <textarea form="formForPost" name="parameters" placeholder="Parameters"></textarea>
                        <input type="number" placeholder="Interval" name="interval"/>
                        <p>Active : </p> <input type="checkbox" name="active" value="active"></input>
                        <button>Test</button>
                        <button type="submit" value="send POST">
                        Add
                        </button>
                        {/* <button>Cancel</button> */}
                        
                    </form>
                </div>
            </Modal>
        </>
    );

    function handleSubmit(event) {
        try {
            var dataForSending = {
                service_Name: event.target.serviceName.value,
                Url: event.target.url.value,
                service_Type: parseInt(event.target.serviceType.value),
                Method: parseInt(event.target.method.value),
                basic_auth: event.target.auth.checked,
                auth_User: event.target.user.value,
                auth_Password: event.target.password.value,
                Parameters: event.target.parameters.value,
                notification_email: event.target.email.value,
                interval_Ms: parseInt(event.target.interval.value),
                active: event.target.active.checked
            };
        } catch (error) {
            console.log(error)
        }
        
        console.log("full object for POSTing:", dataForSending);
        submitData(props.endpoint, props.appendDomainList, dataForSending);
        event.preventDefault();
    }


    async function fetchPost(endpoint, dataForSending) {
        const response = await fetch(endpoint,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(dataForSending) // body data type must match "Content-Type" header
            }
        );
        const data = await response.json();
        return data;
    }

    function submitData(endpoint, callbackAppendDomainList, dataForSending) {
        fetchPost(endpoint + "api/domain/", dataForSending)
            .then((data) => {
                callbackAppendDomainList(data)
            })

            .catch((error) => {
                console.error("error while fetching domains:" + error);
            });
    }
}

export default AddDomainModal;