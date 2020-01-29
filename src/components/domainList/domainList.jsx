import React, {useEffect, useState} from 'react';
import './domainList.scss';
import AddDomain from "../addDomain/addDomain";
import Checkbox from "../checkbox/checkbox";

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
    const [domainPing, setDomainPing] = useState();
    const [domainPingError, setDomainPingError] = useState();
    const [editBox, setEditBox] = useState(false);

    // only bothers to ping if the domain isnt deleted
    useEffect(() => {
        if (props.d.deleted === false)
            pingDomain(props.d);
    }, []);

    async function pingDomain(d) {
        const res = await fetch(props.endpoint + "api/ping/domain" + "/" + d.id);
        res
            .json()
            .then(res => setDomainPing(res))
            .then(res => console.log(res))
            .catch(err => setDomainPingError(err));
    }

    function handleSubmit(event) {
        let dataForSending = {
            Url: event.target.Url_.value,
            Notification_Email: event.target.AdminEmail.value,
            Interval_Ms: parseInt(event.target.IntervalMs.value)
        };
        console.log("full object for sending:", dataForSending);
        updateData(dataForSending, props.callbackFetch, props.d.id);
        event.preventDefault();
    }

    function updateData(data, callbackFetch, id) {
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
        xhr.open('PUT', props.apiEndpoint + 'api/domain/' + id);
        xhr.setRequestHeader("Content-type", "application/json");
        // send the request
        xhr.send(JSON.stringify(data))
    }


    async function deleteDomain(d, callbackFetch) {
        const response = await fetch(props.endpoint + 'api/domain/del/' + d.id, {
                method: 'PUT'
            }
        );
        const data = await response.json();
        await callbackFetch();
        return data;
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
                            id={props.d.id}
                            active={props.d.active}
                            changeDomainList={props.changeDomainList}
                        />
                    </td>
                    <td>{props.d.notification_Email}</td>
                    <td>{props.d.interval_Ms} ms</td>

                    {/*only renders the ping time after it is fetched*/}
                    {
                        domainPing &&
                        <td>ping time: {domainPing.latencyMS}</td>
                    }

                    <div>
                        <td>
                            <p onClick={() => {
                                deleteDomain(props.d, props.callbackFetch)
                            }}>
                                DELETE
                            </p>
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
                                <button
                                    onClick={() => {
                                        setEditBox(false);
                                    }}
                                >
                                    go back
                                </button>
                                ​
                                <form onSubmit={handleSubmit}>
                                    <legend>Edit Domain:</legend>
                                    <p>
                                        Service Name{" "}
                                        <input
                                            name="Service_name"
                                            type="text"
                                            placeholder="Service Name"
                                        ></input>
                                    </p>
                                    <p>
                                        Service URL{" "}
                                        <input
                                            name="Url_"
                                            type="text"
                                            placeholder="Url (www.domain.com)"
                                        ></input>
                                    </p>
                                    <p>
                                        Service Type
                                        <select>
                                            <option value="webapp">WebApp</option>
                                            <option value="rest">Service - REST</option>
                                            <option value="soap">Service - SOAP</option>
                                        </select>
                                    </p>


                                    <p>
                                        Method
                                        <select>
                                            <option value="post">POST</option>
                                            <option value="get">GET</option>
                                        </select>
                                    </p>
                                    <p>
                                        Basic auth{" "}
                                        <input type="checkbox" name="auth">

                                        </input>
                                    </p>
                                    <p>
                                        User{" "}
                                        <input name="User" type="text" placeholder="User"></input>
                                    </p>


                                    <p>
                                        Password{" "}
                                        <input
                                            name="Password"
                                            type="password"
                                            placeholder="Password"
                                        ></input>
                                    </p>
                                    <p>
                                        Parameters{" "}
                                        <input
                                            name="Parameters"
                                            type="text"
                                            placeholder="Add your parameters"
                                        ></input>
                                    </p>
                                    <p>
                                        Email to notify{" "}
                                        <input
                                            name="Email"
                                            type="email"
                                            placeholder="name@mail.com"
                                        ></input>
                                    </p>
                                    <p>
                                        Check interval (S){" "}
                                        <input
                                            name="Check_interval"
                                            type="text"
                                            placeholder="Time(s)"
                                        ></input>
                                    </p>

                                    <p>
                                        Active{" "}
                                        <input type="checkbox" name="active" value="active">

                                        </input>
                                    </p>


                                    <button type="button" className="btn-hero">
                                        Test service
                                    </button>
                                    <button type="button" className="btn-hero">
                                        Save
                                    </button>
                                    <button type="button" className="btn-hero">
                                        Cancel
                                    </button>

                                    <input
                                        name="AdminEmail"
                                        type="text"
                                        placeholder="Email (user@mail.com)"
                                    ></input>
                                    <input
                                        name="IntervalMs"
                                        type="number"
                                        placeholder="Interval Ms (1000)"
                                    ></input>
                                    <select required name="domain_type" id="domain-select">
                                        <option disabled value="">
                                            --Please choose an option--
                                        </option>
                                        <option value="portals">portal</option>
                                        <option value="services">service</option>
                                    </select>
                                    <p>
                                        <input type="submit" value="submit"/>
                                    </p>
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