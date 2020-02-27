import React, {useEffect, useState} from 'react';
import './domainList.scss';
import Checkbox from "../checkbox/checkbox";
import {ErrorMessage, LoadingSpinner} from "../elements/elements";
import AddDomainModal from "../addDomainModal/addDomainModal";
import EditDomainModal from "../editDomainModal/editDomainModal"
import DeleteDomain from "../deleteDomain/deleteDomain";

import {useSelector, useDispatch} from "react-redux";


function DomainList(props) {

    function PopUp() {

        const [show, setShow] = useState(false);
        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);

    }

    return (
        <div className="container-fluid">
            <div className="container table-responsive space">
                <div className="TableDiv">
                    <div className="d-flex justify-content-start domainButton">
                        <AddDomainModal

                            appendDomainList={props.appendDomainList}
                            endpoint={props.endpoint}/>
                    </div>

                    <table className="Table table-hover" align="center">
                        <tr>
                            <th className="text-center" width="5%">Active</th>
                            <th className="text-left" width="9%">Service Name</th>
                            <th className="text-center" width="7%">Service Type</th>
                            <th className="text-left" width="15%">URL</th>
                            <th className="text-left" width="15%">Emails</th>
                            <th className="text-center" width="7%">Check interval</th>
                            <th className="text-center" width="7%">Maintenance</th>
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
                </div>
            </div>

        </div>
    )
}

function SingleDomain(props) {

    const isLogged = useSelector(state => state.isLogged);
    const token = useSelector(state => state.token);
    const userData = useSelector(state => state.userData);


    // this is currently fetching one by one, very sluggish if theres a lot of domains
    const [editBox, setEditBox] = useState(false);

    //  will need to edit this when we get the final edit form
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


    function getDefaultSelectionServiceType(name) {
        let data;
        switch (name) {
            case 0 :
                data = 'Rest';
                break;
            case 1 :
                data = 'Soap';
                break
        }
        return data;
    }

    return (

        <>
            {
                // checks if the domain is flagged as deleted, if it is not, render it
                props.d.deleted === false &&

                <tr align="center">
                    <td className="text-center">
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
                    <td className="text-truncate">
                        <div className="tooltip-wrap">
                            <p className="text-truncate" data-toggle="tooltip" data-placement="top"
                               title={props.d.service_Name}>
                                {props.d.service_Name}
                            </p>
                        </div>
                        </td>
                    <td className="text-center">{getDefaultSelectionServiceType(props.d.service_Type)}</td>
                    <td className="tooltip-content">

                        <div className="text-truncate">
                            <div className="tooltip-wrap">
                                <p className="text-truncate" data-toggle="tooltip" data-placement="top"
                                   title={props.d.url}>
                                    {props.d.url}
                                </p>
                            </div>
                        </div>
                    </td>

                    <td className="text-left" title="Email">
                        <div className="tooltip-wrap">
                            <p className="text-truncate" data-toggle="tooltip" data-placement="top"
                               title={props.d.notification_Email}>{props.d.notification_Email}
                            </p>
                        </div>
                    </td>
                    <td className="text-center">{Math.trunc(props.d.interval_Ms / 1000)} s</td>
                    <div>
                        <div className="editDomainModal editIcon">

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