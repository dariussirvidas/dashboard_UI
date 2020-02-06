import React, {useEffect, useState} from 'react';
import './domainList.scss';
import AddDomain from "../addDomain/addDomain";
import EditDomain from "../editDomain/editDomain";
import Checkbox from "../checkbox/checkbox";
import Popup from "reactjs-popup";

function DomainList(props) {

    return (
        <>
            <AddDomain
                callbackFetch={props.callbackReFetchDomains}
                appendDomainList={props.appendDomainList}
                endpoint={props.endpoint}
            />
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
                        props.hasDomainListError === false &&
                        props.domainList.map((item) => {
                            return <SingleDomain
                                d={item}
                                callbackFetch={props.callbackReFetchDomains}
                                endpoint={props.endpoint}
                                changeDomainList={props.changeDomainList}
                            />
                        })
                    }
                    {
                        props.hasDomainListError === true &&
                        <p>
                            domains could not be fetched
                        </p>
                    }
                </table>
            </div>
        </>
    )
}

function SingleDomain(props) {

    // this is currently fetching one by one, very sluggish if theres a lot of domains
    const [editBox, setEditBox] = useState(false);

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

    async function deleteDomain(d, changeDomainList) {
        const response = await fetch(props.endpoint + 'api/domain/del/' + d.id, {
                method: 'PUT'
            }
        );
        const data = await response.json();
        await changeDomainList(data);
        return data;
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
                        
                        <Popup trigger={<button className="btn-hero-round"><i className="eva eva-2x eva-edit-outline"></i></button>} modal
    closeOnDocumentClick> {/* triggers shitty pop up */}
                    <div className="pup-size">
                   
                        <td>
                            <p className="textlink-1" onClick={() => {
                                deleteDomain(props.d, props.changeDomainList)
                            }}>
                                DELETE
                            </p>
                        </td>
                        
                        {
                            editBox === false &&

                            <div>
                                
                                <td><a className="textlink-1" onClick={() => {
                                    setEditBox(true)
                                }}>Edit</a></td>
                                
                            </div>
                            
                        }

                        {
                            editBox === true &&

                            <div>
                                <button onClick={() => {
                                    setEditBox(false);
                                }}>
                                    go back
                                </button>
                                
                                <EditDomain
                                
                callbackFetch={props.callbackReFetchDomains}
                appendDomainList={props.appendDomainList}
                endpoint={props.endpoint}
            />
                            </div>
                        }

                       
                    </div>
                   </Popup> 
                   
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