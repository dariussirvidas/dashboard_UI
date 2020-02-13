import React, {Component, useState} from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from "react-bootstrap/Button";
import Style from './editdomainlis.scss';

// currently functions as another Add service
// jei webapp, metodas GET, keisti negalima, nereikia parametru
// jei auth checked, neduoda user ir password

let isWebappSelected = false;
let isRestSelected = false;
let isSoapSelected = false;

function EditDomainModal(props) {

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
                Donato Modal
            </Button>

            <Modal show={show} onHide={handleClose}>
                <div className="forma">
                    <forma className="login-form">
                        <input type="text" placeholder="Service name"/>
                        <input type="text" placeholder="Service type"/>
                        <select className="SelectFrom" required name="method">>
                            <option value="post">POST</option>
                            <option value="get">GET</option>
                        </select>
                        <select className="SelectFrom" required name="service_type">
                            <option selected={isWebappSelected} value="webapp">WebApp</option>
                            <option selected={isRestSelected} value="rest">Service - REST</option>
                            <option selected={isSoapSelected} value="soap">Service - SOAP</option>
                        </select>
                        <input type="password" placeholder="URL"/>
                        <input type="password" placeholder="Email"/>
                        <input type="text" placeholder="interval"/>
                        <p>Basic Auth:  </p> <input type="checkbox" name="auth"></input>
                        <input type="text" placeholder="User"/>
                        <input type="text" placeholder="Password"/>
                        <input type="text" placeholder="Parameters"/>
                        <input type="text" placeholder="Interval"/>

                    <p>Active : </p> <input type="checkbox" name="active" value="active"></input>
                        <button>Test</button>
                        <button>Save</button>
                        <button>Cancel</button>
                    </forma>
                </div>
            </Modal>

        </>
    );

    function handleSubmit(event) {
        let dataForSending = {
            service_Name: event.target.Service_name.value,
            Url_: event.target.Url_.value,
            service_Type: event.target.service_type.value,
            Method: event.target.method.value,
            basic_auth: event.target.auth.checked,
            User: event.target.User.value,
            Password: event.target.Password.value,
            Parameters: event.target.Parameters.value,
            email: event.target.Email.value,
            check_interval: parseInt(event.target.Check_interval.value),
            active: event.target.active.checked
        };
        console.log("full object for sending:", dataForSending);
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

export default EditDomainModal;