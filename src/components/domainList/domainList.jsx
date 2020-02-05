import React, {useEffect, useState} from 'react';
import './domainList.scss';
import AddDomain from "../addDomain/addDomain";
import Checkbox from "../checkbox/checkbox";
import {ErrorMessage, LoadingSpinner} from "../elements/elements";

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
                        props.hasDomainListError === true ?
                            (
                                <ErrorMessage
                                    message="domain list stuff"
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
                console.error("error while fetching domains: ", error);
            });
    }

    function submitDelete(endpoint, changeDomainList, id) {
        fetchPutDelete(props.d.id)
            .then((data) => {
                if (data.status === 200) {
                    console.log("status code " + data.status);
                    let dataForSending = {...props.d};
                    dataForSending.deleted = true;
                    changeDomainList(dataForSending)
                } else if (data.status === 400) {
                    console.log("status code " + data.status);
                } else {
                    console.log("status code " + data.status + ", this is an unhandled exception. what do?");
                }
            })
            .catch((error) => {
                console.log("error deleting domain: ", error);
            });
    }

    async function fetchPutDelete(id) {
        const response = await fetch(props.endpoint + 'api/domain/del/' + id, {
                method: 'PUT'
            }
        );
        const data = await response.json();
        data.status = response.status;
        console.log("deletedata:", data);
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
                        <td>
                            <p className="textlink-1" onClick={() => {
                                submitDelete(props.endpoint, props.changeDomainList, props.d.id)
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

                                <form onSubmit={handleSubmit}>
                                    <legend>Edit Domain:</legend>
                                    <input name="Url_" type="text" placeholder="Url (www.domain.com)"></input>
                                    <input name="Email" type="text" placeholder="Email (user@mail.com)"></input>
                                    <input name="IntervalMs" type="number" placeholder="Interval Ms (1000)"></input>
                                    <select required name="domain_type" id="domain-select">
                                        <option disabled value="">--Please choose an option--</option>
                                        <option value="portals">portal</option>
                                        <option value="services">service</option>
                                    </select>
                                    <input name="Parameters" type="text" placeholder="Parameters"></input>

                                    <p><input type="submit" value="Submit"/></p>
                                </form>
                            </div>
                        }

                        {/*Rycio versija work in progress*/}
                        {/*{*/}
                        {/*    editBox === true &&*/}
                        {/*    <div>*/}
                        {/*        <button*/}
                        {/*            onClick={() => {*/}
                        {/*                setEditBox(false);*/}
                        {/*            }}*/}
                        {/*        >*/}
                        {/*            go back*/}
                        {/*        </button>*/}
                        {/*        ​*/}
                        {/*        <form onSubmit={handleSubmit}>*/}
                        {/*            <legend>Edit Domain:</legend>*/}
                        {/*            <p>*/}
                        {/*                Service Name{" "}*/}
                        {/*                <input*/}
                        {/*                    name="Service_name"*/}
                        {/*                    type="text"*/}
                        {/*                    placeholder="Service Name"*/}
                        {/*                ></input>*/}
                        {/*            </p>*/}
                        {/*            <p>*/}
                        {/*                Service URL{" "}*/}
                        {/*                <input*/}
                        {/*                    name="Url_"*/}
                        {/*                    type="text"*/}
                        {/*                    placeholder="Url (www.domain.com)"*/}
                        {/*                ></input>*/}
                        {/*            </p>*/}
                        {/*            <p>*/}
                        {/*                Service Type*/}
                        {/*                <select>*/}
                        {/*                    <option value="webapp">WebApp</option>*/}
                        {/*                    <option value="rest">Service - REST</option>*/}
                        {/*                    <option value="soap">Service - SOAP</option>*/}
                        {/*                </select>*/}
                        {/*            </p>*/}


                        {/*            <p>*/}
                        {/*                Method*/}
                        {/*                <select>*/}
                        {/*                    <option value="post">POST</option>*/}
                        {/*                    <option value="get">GET</option>*/}
                        {/*                </select>*/}
                        {/*            </p>*/}
                        {/*            <p>*/}
                        {/*                Basic auth{" "}*/}
                        {/*                <input type="checkbox" name="auth">*/}

                        {/*                </input>*/}
                        {/*            </p>*/}
                        {/*            <p>*/}
                        {/*                User{" "}*/}
                        {/*                <input name="User" type="text" placeholder="User"></input>*/}
                        {/*            </p>*/}


                        {/*            <p>*/}
                        {/*                Password{" "}*/}
                        {/*                <input*/}
                        {/*                    name="Password"*/}
                        {/*                    type="password"*/}
                        {/*                    placeholder="Password"*/}
                        {/*                ></input>*/}
                        {/*            </p>*/}
                        {/*            <p>*/}
                        {/*                Parameters{" "}*/}
                        {/*                <input*/}
                        {/*                    name="Parameters"*/}
                        {/*                    type="text"*/}
                        {/*                    placeholder="Add your parameters"*/}
                        {/*                ></input>*/}
                        {/*            </p>*/}
                        {/*            <p>*/}
                        {/*                Email to notify{" "}*/}
                        {/*                <input*/}
                        {/*                    name="Email"*/}
                        {/*                    type="email"*/}
                        {/*                    placeholder="name@mail.com"*/}
                        {/*                ></input>*/}
                        {/*            </p>*/}
                        {/*            <p>*/}
                        {/*                Check interval (S){" "}*/}
                        {/*                <input*/}
                        {/*                    name="Check_interval"*/}
                        {/*                    type="text"*/}
                        {/*                    placeholder="Time(s)"*/}
                        {/*                ></input>*/}
                        {/*            </p>*/}

                        {/*            <p>*/}
                        {/*                Active{" "}*/}
                        {/*                <input type="checkbox" name="active" value="active">*/}

                        {/*                </input>*/}
                        {/*            </p>*/}


                        {/*            <button type="button" className="btn-hero">*/}
                        {/*                Test service*/}
                        {/*            </button>*/}
                        {/*            <button type="button" className="btn-hero">*/}
                        {/*                Save*/}
                        {/*            </button>*/}
                        {/*            <button type="button" className="btn-hero">*/}
                        {/*                Cancel*/}
                        {/*            </button>*/}

                        {/*            <input*/}
                        {/*                name="AdminEmail"*/}
                        {/*                type="text"*/}
                        {/*                placeholder="Email (user@mail.com)"*/}
                        {/*            ></input>*/}
                        {/*            <input*/}
                        {/*                name="IntervalMs"*/}
                        {/*                type="number"*/}
                        {/*                placeholder="Interval Ms (1000)"*/}
                        {/*            ></input>*/}
                        {/*            <select required name="domain_type" id="domain-select">*/}
                        {/*                <option disabled value="">*/}
                        {/*                    --Please choose an option--*/}
                        {/*                </option>*/}
                        {/*                <option value="portals">portal</option>*/}
                        {/*                <option value="services">service</option>*/}
                        {/*            </select>*/}
                        {/*            <p>*/}
                        {/*                <input type="submit" value="submit"/>*/}
                        {/*            </p>*/}
                        {/*        </form>*/}
                        {/*    </div>*/}
                        {/*}*/}
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