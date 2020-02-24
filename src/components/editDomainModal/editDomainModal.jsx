import React, {Component, useEffect, useState} from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from "react-bootstrap/Button";
import Style from './editDomainModal.scss';
import DeleteDomain from "../deleteDomain/deleteDomain";
import store from "../../js/store";
import Icon from './../../Content/edit_icon.png';

function EditDomainModal(props) {

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


    //Default selection on select tags, when you open this edit Modal.
    let isRestSelected = false;
    let isSoapSelected = false;

    function getDefaultSelectionServiceType() {
        switch (props.domain.service_Type) {
            case 0 :
                isRestSelected = true;
                break;
            case 1 :
                isSoapSelected = true;
                break;
        }
    }

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

    // show or hide this modal state
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //disabled inputs states: (su sitais dabar dirtbi)
        const [getSelectedMethod, setSelectedMethod] = useState(0);
        const [getSelectedServiceType, setSelectedServiceType] = useState(0);
        const [getBasicAuth, setBasicAuth] = useState(false);
    
    
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
        }
    
        const isParametersDisabled = function checkIfDisabled() {
            if(getSelectedMethod == 0){ //tipo jei GET 
                return true;
            }
            else{
                return false;
            }
        }

    return (
        <>
            <a class="btn btn-link btn-sm txt" variant="primary"  onClick={handleShow}>
                <i className="material-icons iconHover">&#xe254;</i>
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
                        <select name="method" className="SelectFrom" onChange={changeMethodOption} required>>
                            <option selected={isGetSelected} value={0}>GET</option>
                            <option selected={isPostSelected} value={1}>POST</option>
                        </select>
                        <select name="serviceType" className="SelectFrom" onChange={changeServiceTypeOption} required>
                            <option selected={isRestSelected} value={0}>Service - REST</option>
                            <option selected={isSoapSelected} value={1}>Service - SOAP</option>
                        </select>
                        <input name="url" defaultValue={props.domain.url} type="url" placeholder="URL"/>
                        <input name="email" defaultValue={props.domain.notification_Email} type="email"
                               placeholder="Email"/>
                        <p>Basic Auth: </p> <input defaultChecked={props.domain.basic_auth} type="checkbox"
                                                   name="auth" id="authActive" onClick={changeAuth}></input>
                        <input name="user" defaultValue={props.domain.auth_User} disabled={isUsernamePasswordDisabled()} type="text" placeholder="User"/>
                        <input name="password" defaultValue={props.domain.auth_Password} disabled={isUsernamePasswordDisabled()} type="password"
                               placeholder="Password"/>
                        <textarea name="parameters" defaultValue={props.domain.parameters} className="textArea" rows="4"
                                  placeholder="Parameters" disabled={isParametersDisabled()}></textarea>
                        <input name="interval" defaultValue={Math.trunc(props.domain.interval_Ms / 1000)} type="number"
                               placeholder="Interval"/>
                        <input className="SelectInterval" defaultValue={props.domain.latency_Threshold_Ms} type="number" placeholder="Amber threshold" name="threshold"
                               min="50"/>
                        <input className="SelectIntervalSeconds" disabled="disabled" type="text" placeholder="(ms)"/>

                        <p>Active : </p> <input name="active" defaultChecked={props.domain.active} type="checkbox"
                                                value="active"></input>
                        {/* <button type="button">Test</button> sitas neveikia dar*/}
                        <button type="submit">Save</button>
                        <button type="button" onClick={handleClose}>Cancel</button>
                        <DeleteDomain
                            domain={props.domain}
                            changeDomainList={props.changeDomainList}
                            endpoint={props.endpoint}
                        />
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
                    'Authorization': 'Bearer ' + store.getState().token
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