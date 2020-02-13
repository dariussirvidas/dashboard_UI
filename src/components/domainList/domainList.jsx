import React, {useEffect, useState} from 'react';
import './domainList.scss';
import EditDomain from "../editDomain/editDomain";
import Checkbox from "../checkbox/checkbox";
import Popup from "reactjs-popup";
import {ErrorMessage, LoadingSpinner} from "../elements/elements";
import Table from 'react-bootstrap/Table';
import AddDomainModal from "../addDomainModal/addDomainModal";
import EditDomainModal from "../editDomainModal/editDomainModal"


function DomainList(props) {

    function PopUp() {
        const [show, setShow] = useState(false);

        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);
    }

    return (
        <div className="container">

            <Table striped bordered hover size="sm">
                <thead>
                <tr>
                    <th>Service name</th>
                    <th>Service type</th>
                    <th>URL</th>
                    <th>Active</th>
                    <th>Emails</th>
                    <th>Check interval (S)</th>
                    <th>Maintenance</th>
                </tr>
                </thead>
                <tbody>
                {
                    // checks for errors, if there are any, do not render domains
                    props.hasDomainListError === true ?
                        (
                            <ErrorMessage
                                message="Error while fetching list"
                            />
                        )
                        :
                        (
                            props.domainList.map((item) => {
                                return <SingleDomain
                                    d={item}
                                    callbackFetch={props.callbackReFetchDomains}
                                    endpoint={props.endpoint}
                                    changeDomainList={props.changeDomainList}
                                />
                            })
                        )
                }
                </tbody>
            </Table>
            <div className="d-flex justify-content-end domainButton">
                <AddDomainModal
                    callbackFetch={props.callbackReFetchDomains}
                    appendDomainList={props.appendDomainList}
                    endpoint={props.endpoint}/>
            </div>
        </div>
    )
}

function SingleDomain(props) {

    // this is currently fetching one by one, very sluggish if theres a lot of domains
    const [editBox, setEditBox] = useState(false);


    //  will need to edit this when we get the final edit form
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
        const data = await response.json();
        return data;
    }

    function submitData(endpoint, changeDomainList, dataForSending) {
        fetchPut(endpoint + "api/domain/" + dataForSending.id, dataForSending)
            .then((data) => {
                changeDomainList(data)
            })

            .catch((error) => {
                console.error("error while fetching domains:" + error);
            });
    }


    async function fetchPutDelete() {
        const response = await fetch(props.endpoint + 'api/domain/del/' + props.d.id, {
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
                    let dataForSending = {...props.d};
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


    }

    function handleSubmit(event) {


        let dataForSending = Object.assign({}, props.d);

        dataForSending.url = event.target.Url_.value;
        dataForSending.service_Name = event.target.Url_.value;
        dataForSending.notification_Email = event.target.Email.value;
        dataForSending.interval_Ms = parseInt(event.target.IntervalMs.value);
        dataForSending.service_Type = event.target.domain_type.value;
        dataForSending.parameters = event.target.Parameters.value;
        // //
        console.log("full object for sending:", dataForSending);
        console.log("BOOP");
        submitData(props.endpoint, props.changeDomainList, dataForSending);
        event.preventDefault();
    }

    return (
        <>
            {
                // checks if the domain is flagged as deleted, if it is not, render it
                props.d.deleted === false &&
                <tr align="center">
                    <td>{props.d.service_Name}</td>
                    <td>{props.d.service_Type}</td>
                    <td>{props.d.url}</td>
                    <td>
                        <Checkbox
                            endpoint={props.endpoint}
                            id={props.d.id}
                            active={props.d.active}
                            changeDomainList={props.changeDomainList}

                            // temporarily passing down the whole domain, since PUT right now
                            // requires the whole domain to work...

                            domain={props.d}
                        />
                    </td>
                    <td>{props.d.notification_Email}</td>
                    <td>{props.d.interval_Ms} ms</td>
                    <div>
                        <div>
                            <td>
                                <a onClick={() => {
                                    deleteDomain()
                                }}>
                                    Delete
                                </a>
                            </td>
                            <EditDomainModal></EditDomainModal>
                            {/*{*/}
                            {/*    editBox === false &&*/}
                            {/*    <div>*/}
                            {/*        <td><a onClick={() => {*/}
                            {/*            setEditBox(true)*/}
                            {/*        }}>Edit</a></td>*/}
                            {/*    </div>*/}
                            {/*}*/}
                            {/*{*/}
                            {/*    editBox === true &&*/}

                            {/*    <div >*/}
                            {/*        <button className="align-content-center" onClick={() => {*/}
                            {/*            setEditBox(false);*/}
                            {/*        }}>*/}
                            {/*            go back*/}
                            {/*        </button>*/}

                            {/*        <EditDomain*/}
                            {/*            domain={props.d}*/}
                            {/*            callbackFetch={props.callbackReFetchDomains}*/}
                            {/*            appendDomainList={props.appendDomainList}*/}
                            {/*            endpoint={props.endpoint}*/}
                            {/*        />*/}
                            {/*    </div>*/}
                            {/*}*/}
                        </div>

                    </div>
                </tr>
            }
        </>
    )
}


function editDomain(d, type, editBox, callbackFetch) {


    return (
        <>
            <p>hi</p>
        </>
    )
}


export default DomainList;