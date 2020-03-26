import React, {useEffect, useState} from 'react';
import Modal from 'react-bootstrap/Modal'
import './addDomainModal.scss';
import {validateParameters} from "../../common";
import {NotificationManager} from 'react-notifications';

function AddDomainModal(props) {

    return (
        <div>
            <DomainModal
                appendDomainList={props.appendDomainList}
                endpoint={props.endpoint}
                fetches={props.fetches}
            />
        </div>
    );
}

function DomainModal(props) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
        setTestResult("");
        setSelectedMethod("0");
        setSelectedServiceType("0");
        setBasicAuth(false);
    };
    //disabled inputs states:
    const [getSelectedMethod, setSelectedMethod] = useState("0");
    const [getSelectedServiceType, setSelectedServiceType] = useState("0");
    const [getBasicAuth, setBasicAuth] = useState(false);


    //Cia gal const reikia vietoj funkcijos ?
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
        return getBasicAuth !== true;
    };

    const isParametersDisabled = function checkIfDisabled() {
        return getSelectedMethod === "0";
    };

    //test button functionality

    const [getTestResult, setTestResult] = useState("");

    const testService = function test(event) {
        setTestResult("Waiting...");
        openForm();
        let formData = new FormData(document.querySelector('form'));
        let inputsFromForm = {};
        formData.forEach((value, key) => { //visi fieldai is formos sudedami i objecta.
            inputsFromForm[key] = value
        });

        let dataForSending = {
            "url": inputsFromForm.url,
            "service_Type": parseInt(inputsFromForm.serviceType),
            "method": parseInt(inputsFromForm.method),
            "basic_Auth": (inputsFromForm.auth === "on"),
            "auth_User": inputsFromForm.user,
            "auth_Password": inputsFromForm.password,
            "parameters": inputsFromForm.parameters
        };

        props.fetches.fetchPost(props.endpoint + "/Requests/testservice", dataForSending).then((response) => {
            if (response.status < 200 || response.status > 299) { //jei failino kreiptis i backenda
                setTestResult("Check your fields and try again.");
                return
            }
            return response.json().then((responseObject) => {
                let responseMessage;
                if (responseObject.status > 199 && responseObject.status < 300) { //ar sekmingas status ?
                    responseMessage =
                        <p>Status: {responseObject.status} Response time: {responseObject.requestTime} ms</p>
                } else {
                    responseMessage = <p>Status: {responseObject.status}</p> //cia daugiau info turetu grazint is backendo...
                }
                setTestResult(responseMessage);
            })
        });
        event.preventDefault();
    };

    useEffect(()=>{
        validateParameters();
        }, [getSelectedServiceType]
    ); //validates parameters on serviceType change

    function openForm() {
      document.getElementById("myForm").style.visibility = "visible";
    }

    function closeForm() {
      document.getElementById("myForm").style.visibility = "hidden";
    }

    return (
        <>

            <button variant="primary" className="Buttonas" onClick={handleShow}>
                New Domain
            </button>

            <Modal className="modal-large" show={show} onHide={handleClose}>
                <div className="forma">
                    <form className="login-form" onSubmit={handleSubmit} id="formForPost">
                        <div className="form-group" />
                        <input type="text" placeholder="Service name" name="serviceName" required maxLength="64" />
                        <select className="SelectFrom" name="method" value={getSelectedMethod} onChange={changeMethodOption} required>
                            <option value={0}>GET</option>
                            <option value={1}>POST</option>
                        </select>
                        <select className="SelectFrom" name="serviceType" value={getSelectedServiceType} onChange={changeServiceTypeOption} required>
                            <option value={0}>Service - REST</option>
                            <option value={1}>Service - SOAP</option>
                        </select>
                        <input type="url" placeholder="URL" name="url" required maxLength="1024" />
                        <input type="email" placeholder="Email" name="email" required maxLength="256" />

                        <div className="float-left d-flex inlineItems">
                            <label htmlFor="checkboxTitle1" className="d-inline-block text-left aLabel"> Basic authentication:</label>
                            <input className="d-inline-block aCheckbox" id="checkboxTitle1" type="checkbox" name="auth" onClick={changeAuth}/>
                        </div>

                        <input className="BasicAuthDisable" type="text" placeholder="User" name="user" disabled={isUsernamePasswordDisabled()} required maxLength="1024" />
                        <input className="BasicAuthDisable" type="password" placeholder="Password" name="password" disabled={isUsernamePasswordDisabled()} required maxLength="1024" />
                        <textarea className="textArea" form="formForPost" rows="4" name="parameters" placeholder="Parameters" disabled={isParametersDisabled()} required maxLength="4096"
                            onChange={validateParameters}/>
                        <input className="SelectInterval" type="number" placeholder="Interval" name="interval" min="3" max="2000000" required />
                        <input className="SelectIntervalSeconds" disabled="disabled" type="text" placeholder="  (s)" />
                        <input className="SelectInterval" type="number" placeholder="Amber threshold" name="threshold" min="10" max="60000" required />
                        <input className="SelectIntervalSeconds" disabled="disabled" type="text" placeholder="(ms)" />

                        <div className="float-left d-flex inlineItems">
                            <label htmlFor="checkboxTitle2" className="d-inline-block text-left aLabel">Active: </label>
                            <input className="d-inline-block aCheckbox float-left" id="checkboxTitle2" type="checkbox" name="active" defaultChecked/>
                        </div>
                        <div className="d-flex flex-row inlineItems">
                            <button type="submit" value="send POST">Add</button>                                                        
                            <button type="button" onClick={handleClose}>Cancel</button>
                            <button onClick={testService}>Test</button>
                        </div>
                        <div id="myForm">
                        <div className="result">
                        <h3>Test results:</h3>
                        {getTestResult}
                        <br/>
                        <button type="button" onClick={closeForm}>Close</button>
                        </div>

                        </div>
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
                interval_Ms: parseInt(event.target.interval.value * 1000), //paverciam i ms is s, pries siunciant i serveri
                Latency_Threshold_Ms: parseInt(event.target.threshold.value),
                active: event.target.active.checked

            };
        } catch (error) {
            console.error(error);
        }

        submitData(props.endpoint, props.appendDomainList, dataForSending);
        handleClose();
        event.preventDefault();
    }

    async function fetchPost(endpoint, dataForSending) {
        const response = await props.fetches.fetchPost(endpoint, dataForSending);
        return await response.json();
    }

    function submitData(endpoint, callbackAppendDomainList, dataForSending) {
        fetchPost(endpoint + "domain/", dataForSending).then((data) => {
            callbackAppendDomainList(data);
            NotificationManager.success('New domain added!', 'Successful!', 3000);
        }).catch(() => {
            NotificationManager.error('Something went wrong!', 'Error!', 3000);
        });
    }
}

export default AddDomainModal;