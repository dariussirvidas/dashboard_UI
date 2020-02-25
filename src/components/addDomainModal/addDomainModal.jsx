import React, {Component, useState} from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from "react-bootstrap/Button";
import Style from './addDomainModal.scss';
import store from "../../js/store";

    
function AddDomainModal(props) {

    return (
        <div>
            <DomainModal
                callbackFetch={props.callbackReFetchDomains}
                appendDomainList={props.appendDomainList}
                endpoint={props.endpoint}/>
        </div>
    );
}

function DomainModal(props) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
        setTestResult("");
    }
    //disabled inputs states:
    const [getSelectedMethod, setSelectedMethod] = useState(0);
    const [getSelectedServiceType, setSelectedServiceType] = useState(0);
    const [getBasicAuth, setBasicAuth] = useState(false);


    //Cia gal const reikia vietoj funkcijos ?
    function changeMethodOption(event) { //<select name="method" 
        setSelectedMethod(event.target.value)
    }
    function changeServiceTypeOption(event) { //<select name="serviceType"
        setSelectedServiceType(event.target.value)
    }
    function changeAuth(event){
        setBasicAuth(event.target.checked)
    }

    const isUsernamePasswordDisabled = function checkIfDisabled() {
        if(getBasicAuth == true){ 
            return false;
        }
        else{
            return true;
        }
    };

    const isParametersDisabled = function checkIfDisabled() {
        if(getSelectedMethod == 0){ //tipo jei GET 
            return true;
        }
        else{
            return false;
        }
    };
    
    //test button functionality

    const [getTestResult, setTestResult] = useState("");

    const testService = function test(event) {
        setTestResult("Waiting...")
        var formData = new FormData(document.querySelector('form'))
        var inputsFromForm = {};
        formData.forEach((value, key) => { //visi fieldai is formos sudedami i objecta.
            inputsFromForm[key] = value
        }); 

        var dataForSending = {
            "url": inputsFromForm.url,
            "service_Type": parseInt(inputsFromForm.serviceType),
            "method": parseInt(inputsFromForm.method),
            "basic_Auth": (inputsFromForm.auth == "on" ? true: false),
            "auth_User": inputsFromForm.user,
            "auth_Password": inputsFromForm.password,
            "parameters": inputsFromForm.parameters
          }
        
        
        fetch(props.endpoint + "/Requests/testservice",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Bearer ' + store.getState().token
                },
                body: JSON.stringify(dataForSending) // body data type must match "Content-Type" header
            }
        )
        .then ((response) => {
            if(response.status < 200 && response.status > 299){ //jei failino kreiptis i backenda
                setTestResult("Check your fields and try again.")
                return
            } 
            return response.json() //jei prisikonektino i musu backend, grazina, jo response body
        })
        .then((responseObject) => {

            const responseMessage = <p>Status: {responseObject.status} Response time: {responseObject.requestTime}</p>
            setTestResult(responseMessage);
        })  
        
        event.preventDefault();
    }

    // function alio(props){ //kas yra tuscia  funckija ? const = <div>{New.Date()}</div> yra elementas. function is didziosios raides, jau komponentas, galima pasuot props. Funkcinis komponentas negali tureti state. Todel reikia class extends React.Component. :))
    //     return <h1>ZDRWA </h1>
    // }

    return (
        <>
        
            <button variant="primary" className ="Buttonas" onClick={handleShow}>
                New Domain
            </button>
            
            <Modal classNeme="modal-large" show={show} onHide={handleClose}>
                <div className="forma">
                    <form className="login-form" onSubmit={handleSubmit} id="formForPost" novalidate>
                        <div className="form-group"/>                   
                        <input type="text" placeholder="Service name" name="serviceName" required max="64"/>
                        <select className="SelectFrom" name="method" value={getSelectedMethod} onChange={changeMethodOption} required> 
                            <option value={0}>GET</option>
                            <option value={1}>POST</option>
                        </select>
                        <select className="SelectFrom" name="serviceType" value={getSelectedServiceType} onChange={changeServiceTypeOption} required>
                            <option value={0}>Service - REST</option>
                            <option value={1}>Service - SOAP</option>
                        </select>
                        <input type="url" placeholder="URL" name="url" required max="1024"/>
                        <input type="email" placeholder="Email" name="email" required max="256"/>
                        <hr/>
                        <label htmlFor="checkboxTitle1 ">Basic authentication: </label>
                        <input className="SelectCheckbox" id="checkboxTitle1" type="checkbox" name="auth" onClick={changeAuth}></input>
                        <input type="text" placeholder="User" name="user" disabled={isUsernamePasswordDisabled()} required max="1024"/>
                        <input type="password" placeholder="Password" name="password" disabled={isUsernamePasswordDisabled()} required max="1024"/>
                        <textarea className="textArea" form="formForPost" rows="4" name="parameters" placeholder="Parameters" disabled={isParametersDisabled()} required max="4096"></textarea>
                        <input className="SelectInterval" type="number" placeholder="Interval" name="interval" min="3" max="2000000" required/>
                        <input className="SelectIntervalSeconds" disabled="disabled" type="text" placeholder="  (s)"/>
                        <input className="SelectInterval" type="number" placeholder="Amber threshold" name="threshold" min="10" max="60000" required/>
                        <input className="SelectIntervalSeconds" disabled="disabled" type="text" placeholder="(ms)"/>
                        <hr/>
                        <label htmlFor="checkboxTitle2">Active: </label>
                        <br/>
                        <input className="SelectCheckbox3" id="checkboxTitle2" type="checkbox" name="active" value="active"></input>
                        <br/>
                        {/* <button>Test(sitas dar neveikia)</button> */}
                        <button type="submit" value="send POST">Add</button>
                        <button onClick={handleClose}>Cancel</button>
                        <button onClick={testService}>Test</button>
                        <div>{getTestResult}</div>
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
            console.log(error)
        }
        
        console.log("full object for POSTing:", dataForSending);
        submitData(props.endpoint, props.appendDomainList, dataForSending);
        handleClose();
        event.preventDefault();
    }

    async function fetchPost(endpoint, dataForSending) {
        const response = await fetch(endpoint,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Bearer ' + store.getState().token
                },
                body: JSON.stringify(dataForSending) // body data type must match "Content-Type" header
            }
        );
        const data = await response.json();
        return data;
    }

    function submitData(endpoint, callbackAppendDomainList, dataForSending) {
        fetchPost(endpoint + "domain/", dataForSending)
            .then((data) => {
                callbackAppendDomainList(data)
            })

            .catch((error) => {
                console.error("error while fetching domains:" + error);
            });
    }
}

export default AddDomainModal;