import React, {useEffect, useState} from 'react';
import './domainList.scss';
import Checkbox from "../checkbox/checkbox";
import {ErrorMessage, LoadingSpinner} from "../elements/elements";
import AddDomainModal from "../addDomainModal/addDomainModal";
import EditDomainModal from "../editDomainModal/editDomainModal"
import DeleteDomain from "../deleteDomain/deleteDomain";

function DomainList(props) {

    function PopUp() {

        const [show, setShow] = useState(false);
        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);

    }

    return (
        <div className="container">
            <div className="TableDiv">
                <table className="Table" align="center">
                    <tr>
                        <th>Service name</th>
                        <th>Service type</th>
                        <th>URL</th>
                        <th>Active</th>
                        <th>Emails</th>
                        <th>Check interval (S)</th>
                        <th>Maintenance</th>
                    </tr>
                    {
                        // checks for errors, if there are any, do not render domains
                        props.domainList !== "error" ?
                            (
                                props.domainList.status !== 404 ?
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
                                    :
                                    (
                                        <>
                                        </>
                                    )
                            )
                            :
                            (
                                <ErrorMessage
                                    message="Error while fetching list"
                                />
                            )
                    }
                </table>
                <div className="d-flex justify-content-end domainButton">
                    <AddDomainModal
                        callbackFetch={props.callbackReFetchDomains}
                        appendDomainList={props.appendDomainList}
                        endpoint={props.endpoint}/>
                </div>
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
        fetchPut(endpoint + "domain/" + dataForSending.id, dataForSending)
            .then((data) => {
                changeDomainList(data)
            })

            .catch((error) => {
                console.error("error while fetching domains:" + error);
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
        console.log("full object for sending:", dataForSending);
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
                    <td>{Math.trunc(props.d.interval_Ms / 1000)} s</td>
                    <div>
                        <div>

                            <EditDomainModal
                                domain={props.d}
                                changeDomainList={props.changeDomainList}
                                endpoint={props.endpoint}
                            />
                        </div>
                    </div>
                </tr>
            }
        </>
    )
}

export default DomainList;