import React, {Component, useEffect, useState} from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from "react-bootstrap/Button";
import Style from './editDomainModal.scss';

// currently functions as another Add service
// jei webapp, metodas GET, keisti negalima, nereikia parametru
// jei auth checked, neduoda user ir password


function EditDomainModal(props) {

    return (
        <div>
            <Example
                domain={props.domain}
                callbackFetch={props.callbackReFetchDomains}
                changeDomainList={props.changeDomainList}
                endpoint={props.endpoint}/>
        </div>
    );

}

function Example(props) {

    let isWebappSelected = false;
    let isRestSelected = false;
    let isSoapSelected = false;

    function getDefaultSelectionServiceType() {
        switch (props.domain.service_Type) {
            case 0 :
                isWebappSelected = true;
                break;
            case 1 :
                isRestSelected = true;
                break;
            case 2 :
                isSoapSelected = true;
                break;
        }
    }

    // soapui - postas
    // restui get ir post
    // webapp tik get

    // basic auth tiek soapui tiek restui (gal ir webappui)

    let isPostSelected = false;
    let isGetSelected = false;

    function getDefaultSelectionMethod() {
        switch (props.domain.method) {
            case 0 :
                isGetSelected = true;
                break;
            case 1 :
                isPostSelected = true;
                break;
        }
    }



    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (
        <>
            <a variant="primary" onClick={handleShow}>
                Edit
            </a>

            {
                getDefaultSelectionServiceType()
            }
            {
                getDefaultSelectionMethod()
            }

            <Modal show={show} onHide={handleClose}>
                <div className="forma">
                    <form className="login-form" onSubmit={handleSubmit}>
                        <input name="serviceName" defaultValue={props.domain.service_Name} type="text"
                               placeholder="Service name"/>
                        <select name="method" className="SelectFrom" required>>
                            <option selected={isGetSelected} value={0}>GET</option>
                            <option selected={isPostSelected} value={1}>POST</option>
                        </select>
                        <select name="serviceType" className="SelectFrom" required>
                            <option selected={isWebappSelected} value={0}>WebApp</option>
                            <option selected={isRestSelected} value={1}>Service - REST</option>
                            <option selected={isSoapSelected} value={2}>Service - SOAP</option>
                        </select>
                        <input name="url" defaultValue={props.domain.url} type="url" placeholder="URL"/>
                        <input name="email" defaultValue={props.domain.notification_Email} type="email"
                               placeholder="Email"/>
                        <p>Basic Auth: </p> <input defaultChecked={props.domain.basic_auth} type="checkbox"
                                                   name="auth" id="authActive"></input>
                        <input name="user" defaultValue={props.domain.user} type="text" placeholder="User"/>
                        <input name="password" defaultValue={"password"} type="password" placeholder="Password"/>
                        <textarea name="parameters" defaultValue={props.domain.parameters} className="textArea" rows="4"
                                  placeholder="Parameters"></textarea>
                        <input name="interval" defaultValue={props.domain.interval_Ms} type="number"
                               placeholder="Interval"/>
                        <p>Active : </p> <input name="active" defaultChecked={props.domain.active} type="checkbox"
                                                value="active"></input>
                        <button type="button">Test</button>
                        <button type="submit">Save</button>
                        <button type="button" onClick={handleClose}>Cancel</button>

                    </form>
                </div>
            </Modal>

        </>
    );

    function handleSubmit(event) {
        let dataForSending = {
            service_Name: event.target.serviceName.value,
            Url: event.target.url.value,
            service_Type: parseInt(event.target.serviceType.value),
            Method: parseInt(event.target.method.value),
            basic_auth: event.target.auth.checked,
            auth_User: event.target.user.value,
            auth_Password: event.target.password.value,
            Parameters: event.target.parameters.value,
            notification_Email: event.target.email.value,
            interval_Ms: parseInt(event.target.interval.value),
            active: event.target.active.checked
        };
        console.log("full object for sending:", dataForSending);
        console.log("JSON string:", JSON.stringify(dataForSending));
        console.log("domain obj: ", props.domain);

        submitData(props.endpoint, props.changeDomainList, dataForSending);
        event.preventDefault();
    }

    async function fetchPut(endpoint, dataForSending) {
        const response = await fetch(endpoint,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(dataForSending) // body data type must match "Content-Type" header
            }
        );
        let statusCode = response.status;
        return statusCode;
    }

    function submitData(endpoint, changeDomainList, dataForSending) {
        fetchPut(endpoint + "api/domain/" + props.domain.id, dataForSending)
            .then((statusCode) => {
                console.log("status code " + statusCode +  "...");
                if (statusCode > 199 && statusCode < 300) {
                    console.log("success!");
                    // creates a new object. uses the prop domain as a base and overwrites any old data with data from
                    // the input fields
                    const editedDomain = Object.assign({...props.domain}, dataForSending);
                    changeDomainList(editedDomain)
                }
                else
                {
                    console.log("unsuccessful. what now?")
                }
            })

            .catch((error) => {
                console.error("FETCH ERROR: ", error);
            });
    }
}

export default EditDomainModal;