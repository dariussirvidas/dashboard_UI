import React, {Component, useEffect, useState} from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from "react-bootstrap/Button";
import './editDomainModal.scss';
import DeleteDomain from "../deleteDomain/deleteDomain";

import Icon from './../../Content/edit_icon.png';


import {useSelector, useDispatch} from "react-redux";


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
                endpoint={props.endpoint}/>
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
    }

    // GET/POST and REST/SOAP states
    const [getIsGetPostSelected, setGetPostSelected] = useState(props.domain.method) //jei 0 GET, jei 1 POST
    const [getIsRestSoapSelected, setRestSoapSelected] = useState(props.domain.serviceType) //jei 0 REST, jei 1 SOAP
    const [getBasicAuth, setBasicAuth] = useState(props.domain.basic_Auth);
    
    // onChange functions for input fields:

        function changeMethodOption(event) { //<select name="method"
            setGetPostSelected(event.target.value)
        }
        function changeServiceTypeOption(event) { //<select name="serviceType"
            setRestSoapSelected(event.target.value)
        }
        function changeAuth(event){
            setBasicAuth(event.target.checked)
        }
    

    //functions to check if fields should be disabled
        const isUsernamePasswordDisabled = function checkIfDisabled() {
            if(getBasicAuth){ 
                return false;
            }
            else{
                return true;
            }
        }
    
        const isParametersDisabled = function checkIfDisabled() {
            if(getIsGetPostSelected == 0){ //tipo jei GET 
                return true;
            }
            else{
                return false;
            }
        }

        function testinam(event) {
            console.log(props.domain.auth_User)
            console.log(props.domain.auth_Password)
            event.preventDefault();
        }

    return (
        <>
            <a class="btn btn-link btn-sm txt" variant="primary"  onClick={handleShow}>
                <i className="material-icons iconHover">&#xe254;</i>
            </a>

            <Modal show={show} onHide={handleClose}>
                <div className="forma">
                    <form className="login-form" onSubmit={handleSubmit}>
                        <input name="serviceName" defaultValue={props.domain.service_Name} type="text"
                               placeholder="Service name" required max="64"/>
                        <select name="method" className="SelectFrom" onChange={changeMethodOption} required>
                            <option selected={getIsGetPostSelected == 0? true:false} value={0}>GET</option>
                            <option selected={getIsGetPostSelected == 1? true:false} value={1}>POST</option>
                        </select>
                        <select name="serviceType" className="SelectFrom" onChange={changeServiceTypeOption} required>
                            <option selected={getIsRestSoapSelected == 0? true:false} value={0}>Service - REST</option>
                            <option selected={getIsRestSoapSelected == 1? true:false} value={1}>Service - SOAP</option>
                        </select>
                        <input name="url" defaultValue={props.domain.url} type="url" placeholder="URL" required max="1024"/>
                        <input name="email" defaultValue={props.domain.notification_Email} type="email"
                               placeholder="Email" required max="256"/>
                        <p>Basic Auth: </p> <input defaultChecked={props.domain.basic_Auth} type="checkbox"
                                                   name="auth" id="authActive" onClick={changeAuth}></input>
                        <input name="user" defaultValue={props.domain.auth_User} disabled={isUsernamePasswordDisabled()} type="text" placeholder="User" required max="1024"/>
                        <input name="password" defaultValue={props.domain.auth_Password} disabled={isUsernamePasswordDisabled()} type="password"
                               placeholder="Password" required max="1024"/>
                        <textarea name="parameters" defaultValue={props.domain.parameters} className="textArea" rows="4"
                                  placeholder="Parameters" disabled={isParametersDisabled()} required max="4096"></textarea>
                        <input name="interval" defaultValue={Math.trunc(props.domain.interval_Ms / 1000)} type="number"
                               placeholder="Interval" required min="3" max="2000000"/>
                        <input className="SelectInterval" defaultValue={props.domain.latency_Threshold_Ms} type="number" placeholder="Amber threshold" name="threshold"
                               min="50" required min="10" max="60000"/>
                        <input className="SelectIntervalSeconds" disabled="disabled" type="text" placeholder="(ms)"/>

                        <p>Active : </p> <input name="active" defaultChecked={props.domain.active} type="checkbox"
                                                value="active"></input>
                        <button type="submit" className="interactive">Save</button>
                        <button type="button" className="interactive" onClick={handleClose}>Cancel</button>
                        <DeleteDomain
                            domain={props.domain}
                            changeDomainList={props.changeDomainList}
                            endpoint={props.endpoint}
                        />
                        <button onClick={testinam}>TESTUOJAM</button> mygtukas testuotis props/variables
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
            interval_Ms: (parseInt(event.target.interval.value) * 1000),
            Latency_Threshold_Ms: parseInt(event.target.threshold.value),
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
                    'Content-Type': 'application/json',
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(dataForSending) // body data type must match "Content-Type" header
            }
        );
        let statusCode = response.status;
        return statusCode;
    }

    function submitData(endpoint, changeDomainList, dataForSending) {
        fetchPut(endpoint + "domain/" + props.domain.id, dataForSending)
            .then((statusCode) => {
                console.log("status code " + statusCode + "...");
                if (statusCode > 199 && statusCode < 300) {
                    console.log("success!");
                    // creates a new object. uses the prop domain as a base and overwrites any old data with data from
                    // the input fields
                    const editedDomain = Object.assign({...props.domain}, dataForSending);
                    changeDomainList(editedDomain)
                    handleClose();
                } else {
                    console.log("unsuccessful. what now?")
                }
            })

            .catch((error) => {
                console.error("FETCH ERROR: ", error);
            });
    }
}

export default EditDomainModal;