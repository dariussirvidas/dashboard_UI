import React, {Component, useEffect, useLayoutEffect, useState} from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from "react-bootstrap/Button";
import './editDomainModal.scss';
import DeleteDomain from "../deleteDomain/deleteDomain";
import {validateParameters} from "../../common";

import Icon from './../../Content/edit_icon.png';


import { useSelector, useDispatch } from "react-redux";
import { NotificationManager } from 'react-notifications';


function EditDomainModal(props) {

    const isLogged = useSelector(state => state.isLogged);
    const token = useSelector(state => state.token);
    const userData = useSelector(state => state.userData);

    return (
        <div>
            <EditDomain
                domain={props.domain}
                callbackFetch={props.callbackReFetchDomains}
                changeDomainList={props.changeDomainList}
                endpoint={props.endpoint} />
        </div>
    );

}

function EditDomain(props) {

    const isLogged = useSelector(state => state.isLogged);
    const token = useSelector(state => state.token);
    const role = useSelector(state => state.role);

    //cia modalo state

    // show or hide this modal state
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => { //kai atsiranda modalas, kad restartintu value.
        setGetPostSelected(props.domain.method) //kai atidarom pakeiciam, uzdarom, vel atidarius buna vis dar seni propsai. Jie nepasiupdatina
        setRestSoapSelected(props.domain.service_Type)
        setBasicAuth(props.domain.basic_Auth)
        setShow(true);
        setTestResult("");
        setResponse();
    }

    // GET/POST and REST/SOAP states
    const [getIsGetPostSelected, setGetPostSelected] = useState(props.domain.method); //jei 0 GET, jei 1 POST
    const [getIsRestSoapSelected, setRestSoapSelected] = useState(props.domain.serviceType);//jei 0 REST, jei 1 SOAP
    const [getBasicAuth, setBasicAuth] = useState(props.domain.basic_Auth);

    // onChange functions for input fields:

    function changeMethodOption(event) { //<select name="method"
        setGetPostSelected(event.target.value)
    }
    function changeServiceTypeOption(event) { //<select name="serviceType"
        setRestSoapSelected(event.target.value);
    }

    function changeAuth(event) {
        setBasicAuth(event.target.checked)
    }


    //functions to check if fields should be disabled
    const isUsernamePasswordDisabled = function checkIfDisabled() {
        if (getBasicAuth) {
            return false;
        }
        else {
            return true;
        }
    }

    const isParametersDisabled = function checkIfDisabled() {
        if (getIsGetPostSelected == 0) { //tipo jei GET 
            return true;
        }
        else {
            return false;
        }
    }

    function testinam(event) {
        console.log(props.domain.auth_User)
        console.log(props.domain.auth_Password)
        event.preventDefault();
    }
    const [getTestResult, setTestResult] = useState("");

    const testService = function test(event) {
        setTestResult("Waiting...")
        openForm()
        var formData = new FormData(document.querySelector('form'))
        var inputsFromForm = {};
        formData.forEach((value, key) => { //visi fieldai is formos sudedami i objecta.
            inputsFromForm[key] = value
        });

        var dataForSending = {
            "url": inputsFromForm.url,
            "service_Type": parseInt(inputsFromForm.serviceType),
            "method": parseInt(inputsFromForm.method),
            "basic_Auth": (inputsFromForm.auth == "on" ? true : false),
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
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(dataForSending) // body data type must match "Content-Type" header
            }
        )

            .then((response) => {
                if (response.status < 200 || response.status > 299) { //jei failino kreiptis i backenda
                    setTestResult("Check your fields and try again.")
                    return
                }

                //jei prisikonektino i musu backend, sukuria, jo response body

                return response.json()
                    .then((responseObject) => {
                        if (responseObject.status > 199 && responseObject.status < 300) { //ar sekmingas status ? 
                            var responseMessage = <p>Status: {responseObject.status} Response time: {responseObject.requestTime} ms</p>
                        }
                        else {
                            var responseMessage = <p>Status: {responseObject.status}</p> //cia daugiau info turetu grazint is backendo...
                        }
                        setTestResult(responseMessage);
                    })
            })


        event.preventDefault();
    }
    function openForm(event) {
        document.getElementById("myForm").style.visibility = "visible";
      }
      
      function closeForm(event) {
        document.getElementById("myForm").style.visibility = "hidden";
      }
    const [response, setResponse] = useState(); //response from server

    useEffect(()=>{validateParameters();}, [getIsRestSoapSelected]); //validates parameters on serviceType change

    return (
        <>
            <a className="btn btn-link btn-sm txt" variant="primary" onClick={handleShow}>
                <i className="material-icons iconHover">&#xe254;</i>
            </a>

            <Modal show={show} onHide={handleClose}>
                <div className="forma">
                    <form className="login-form" onSubmit={handleSubmit}>
                        <input name="serviceName" defaultValue={props.domain.service_Name} type="text"
                            placeholder="Service name" required max="64" />
                        <select name="method" className="SelectFrom" onChange={changeMethodOption} required>
                            <option selected={getIsGetPostSelected == 0 ? true : false} value={0}>GET</option>
                            <option selected={getIsGetPostSelected == 1 ? true : false} value={1}>POST</option>
                        </select>
                        <select name="serviceType" className="SelectFrom" onChange={changeServiceTypeOption} required>
                            <option selected={getIsRestSoapSelected == 0 ? true : false} value={0}>Service - REST</option>
                            <option selected={getIsRestSoapSelected == 1 ? true : false} value={1}>Service - SOAP</option>
                        </select>
                        <input name="url" defaultValue={props.domain.url} type="url" placeholder="URL" required max="1024" />
                        <input name="email" defaultValue={props.domain.notification_Email} type="email"
                            placeholder="Email" required maxLength="256" />

                        <div className="float-left d-flex inlineItems">
                            <label htmlFor="authActive" className="d-inline-block text-left aLabelEdit"> Basic authentication:</label>
                            <input className="d-inline-block aCheckbox" defaultChecked={props.domain.basic_Auth} type="checkbox" name="auth" id="authActive" onClick={changeAuth}></input>
                        </div>
                        <input className="BasicAuthDisable" name="user" defaultValue={props.domain.auth_User} disabled={isUsernamePasswordDisabled()} type="text" placeholder="User" required max="1024" />
                        <input className="BasicAuthDisable" name="password" defaultValue={props.domain.auth_Password} disabled={isUsernamePasswordDisabled()} type="password"
                            placeholder="Password" required max="1024" />
                        <textarea className="BasicAuthDisable" name="parameters" defaultValue={props.domain.parameters} className="textArea" rows="4"
                            placeholder="Parameters" disabled={isParametersDisabled()} required max="4096" onChange={validateParameters}></textarea>
                        <input name="interval" defaultValue={Math.trunc(props.domain.interval_Ms / 1000)} type="number"
                            placeholder="Interval" required min="3" max="2000000" />
                        <input className="SelectInterval" defaultValue={props.domain.latency_Threshold_Ms} type="number" placeholder="Amber threshold" name="threshold"
                            min="50" required min="10" max="60000" />
                        <input className="SelectIntervalSeconds" disabled="disabled" type="text" placeholder="(ms)" />
                        <div className="float-left d-flex inlineItems">
                            <label htmlFor="checkboxActiveEdit" className="d-inline-block text-left aLabelEdit">Active: </label>
                            <input className="d-inline-block aCheckbox float-left" id="checkboxActiveEdit" name="active" defaultChecked={props.domain.active} type="checkbox" value="active"></input>
                        </div>
                        <div className="d-flex flex-row inlineItems">
                            <button type="submit" >Save</button>
                            <button type="button" onClick={handleClose}>Cancel</button>
                            <DeleteDomain
                                domain={props.domain}
                                changeDomainList={props.changeDomainList}
                                endpoint={props.endpoint}
                            />
                            {response}
                        <button onClick={testService} >Test</button>
                        </div>
                        <div id="myForm">
                        <div className="result">
                        <h3>Test results:</h3>
                        {getTestResult}
                        <br></br>
                        <button type="button" onClick={closeForm}>Close</button>
                        
                        </div>
                        </div>
                       {/*  <button onClick={testService}>Test</button>
                        <div>{getTestResult}</div> */}
                        {/* <button onClick={testinam}>TESTUOJAM</button> mygtukas testuotis props/variables */}
                    </form>
                </div>
            </Modal>
        </>
    );

    function handleSubmit(event) {
        setResponse("waiting...");

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
            interval_Ms: (parseInt(event.target.interval.value) * 1000),
            Latency_Threshold_Ms: parseInt(event.target.threshold.value),
            active: event.target.active.checked
        };
        submitData(props.endpoint, props.changeDomainList, dataForSending);
        event.preventDefault();
    }

    function submitData(endpoint, changeDomainList, dataForSending) {
        fetchPut(endpoint + "domain/" + props.domain.id, dataForSending)
            .then((response) => {
                if (response.status > 199 && response.status < 300) {
                    // creates a new object. uses the prop domain as a base and overwrites any old data with data from
                    // the input fields
                    const editedDomain = Object.assign({ ...props.domain }, dataForSending);
                    changeDomainList(editedDomain)
                    handleClose();
                    setResponse("Domain successfuly updated")
                    NotificationManager.success('Domain changes saved!', 'Edit Successful!', 3000);
                } else {
                    setResponse("Something went wrong")
                    NotificationManager.error('Failed to save changes!', 'Error!', 3000);
                }
            })

            .catch((error) => {
                console.error("FETCH ERROR: ", error);
            });
    }

    async function fetchPut(endpoint, dataForSending) {
        const response = await fetch(endpoint,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(dataForSending) // body data type must match "Content-Type" header
            }
        );
        const data = response; //response.statuscode
        return response;
    }
}

export default EditDomainModal;