import React, {useEffect, useState} from 'react';
import './domainList.scss';
import AddDomain from "../addDomain/addDomain";

function DomainList(props) {

    return (
        <>
            <AddDomain
                callbackFetch={props.callbackReFetchDomains}
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
                        props.portalsError === false &&
                        props.portals.map((item) => {
                            return <SingleDomain d={item}
                                                 type={'portals'}
                                                 callbackFetch={props.callbackReFetchDomains}
                                                 apiEndpoint={props.apiEndpoint}
                            />
                        })
                    }

                    {
                        props.portalsError === true &&
                        <p>
                            portals could not be fetched
                        </p>
                    }


                    {
                        // checks for errors, if there are any, do not render domains
                        props.servicesError === false &&
                        props.services.map((item) => {
                            return <SingleDomain d={item}
                                                 type={'services'}
                                                 callbackFetch={props.callbackReFetchDomains}
                                                 apiEndpoint={props.apiEndpoint}
                            />
                        })
                    }


                    {
                        props.servicesError === true &&
                        <p>
                            services could not be fetched
                        </p>
                    }
                </table>
            </div>
        </>
    )
}

function SingleDomain(props) {

    // this is currently fetching one by one, very sluggish if theres a lot of domains
    const [domainPing, setDomainPing] = useState();
    const [domainPingError, setDomainPingError] = useState();
    const [editBox, setEditBox] = useState(false);

    // only bothers to ping if the domain isnt deleted
    useEffect(() => {
        if (props.d.deleted === false)
            pingDomain(props.d, props.type);
    }, []);

    async function pingDomain(d, type) {
        const res = await fetch(props.apiEndpoint + "api/ping/" + type.slice(0, -1) +  "/" + d.id);
        res
            .json()
            .then(res => setDomainPing(res))
            .then(res => console.log(res))
            .catch(err => setDomainPingError(err));
    }

    function handleSubmit(event) {
        let dataForSending = {
            Url: event.target.Url_.value,
            Admin_Email: event.target.AdminEmail.value,
            Interval_Ms: parseInt(event.target.IntervalMs.value)
        };
        console.log("full object for sending:", dataForSending);
        updateData(event.target.domain_type.value, dataForSending, props.callbackFetch, props.d.id);
        event.preventDefault();
    }


    function updateData(type, data, callbackFetch, id) {
        // create a new XMLHttpRequest
        let xhr = new XMLHttpRequest();

        // get a callback when the server responds
        xhr.addEventListener('load', () => {
            // update the state of the component with the result here
            console.log("response text: ", xhr.responseText)
        });

        // calls the callback function (re-fetch domain list) if successful
        xhr.onload = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 204) {
                    // insert success popup here
                    callbackFetch.apply();
                } else {
                    // insert failure popup here
                    console.error(xhr.statusText + 'this means its failed' + xhr.status);
                }
            }
        };

        // open the request with the verb and the url
        xhr.open('PUT', props.apiEndpoint + 'api/' + type + '/' + id);
        xhr.setRequestHeader("Content-type", "application/json");
        // send the request
        xhr.send(JSON.stringify(data))
    }

    function deleteDomain(d, type, callbackFetch) {
        // create a new XMLHttpRequest
        let xhr = new XMLHttpRequest();

        // get a callback when the server responds
        xhr.addEventListener('load', () => {
            // update the state of the component with the result here
            console.log("delete (PUT) response text: ", xhr.responseText)
        });

        // calls the callback function (re-fetch domain list) if successful
        xhr.onload = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    // insert success popup here
                    callbackFetch.apply();
                } else {
                    // insert failure popup here
                    console.error(xhr.statusText);
                }
            }
        };

        // open the request with the verb and the url
        xhr.open('PUT', props.apiEndpoint + 'api/' + type + '/del/' + d.id);
        xhr.setRequestHeader("Content-type", "application/json");
        // send the request
        xhr.send();

    }


    return (
        <>
            {
                // checks if the domain is flagged as deleted, if it is not, render it
                props.d.deleted === false &&
                <tr align="center">
                    <td>{props.d.url}</td>
                    <td>{props.type}</td>
                    <td>{props.d.url}</td>
                    <td><input type="checkbox"/></td>
                    <td>{props.d.admin_Email}</td>
                    <td>{props.d.interval_Ms} ms</td>

                    {/*only renders the ping time after it is fetched*/}
                    {
                        domainPing &&
                        <td>ping time: {domainPing.latencyMS}</td>
                    }

                    <div>
                        <td>
                            <a href="#" onClick={() => {
                                deleteDomain(props.d, props.type, props.callbackFetch)
                            }}>
                                Delete
                            </a>
                        </td>
                        {
                            editBox === false &&

                            <div>
                                <td><a href="#" onClick={() => {
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
                                    <p>Service Name <input name="Service_name" type="text" placeholder="Service Name"></input></p>
                                    <p>Service URL <input name="Url_" type="text" placeholder="Url (www.domain.com)"></input></p>
                                    
                                    <input name="AdminEmail" type="text" placeholder="Email (user@mail.com)"></input>
                                    <input name="IntervalMs" type="number" placeholder="Interval Ms (1000)"></input>
                                    <select required name="domain_type" id="domain-select">
                                        <option disabled value="">--Please choose an option--</option>
                                        <option value="portals">portal</option>
                                        <option value="services">service</option>
                                    </select>
                                    <p><input type="submit" value="submit"/></p>

                                </form>
                            </div>
                        }
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