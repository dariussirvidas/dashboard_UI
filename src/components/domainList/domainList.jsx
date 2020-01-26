import React, {useEffect, useState} from 'react';
import './domainList.scss';
import AddDomain from "../addDomain/addDomain";

function DomainList(props) {

    return (
        <>
            <AddDomain
                callbackFetch={props.callbackReFetchDomains}
            />
            <p>this is the domain list: </p>
            <h2>portals:</h2>
            {props.portals.map((item) => {
                return <SingleDomain d={item}
                                     type={'portals'}
                                     callbackFetch={props.callbackReFetchDomains}
                />
            })}
            <h2>services:</h2>
            {props.services.map((item) => {
                return <SingleDomain d={item}
                                     type={'services'}
                                     callbackFetch={props.callbackReFetchDomains}
                />
            })}
        </>
    )
}

function SingleDomain(props) {

    // this is currently fetching one by one, very sluggish if theres a lot of domains
    const [domainPing, setDomainPing] = useState();
    const [domainPingError, setDomainPingError] = useState();

    // only bothers to ping if the domain isnt deleted
    useEffect(() => {
        if (props.d.deleted === false)
            pingDomain(props.d);
    }, []);

    async function pingDomain(d) {
        const res = await fetch("http://40.85.76.116/api/ping/service/" + d.id);
        res
            .json()
            .then(res => setDomainPing(res))
            .then(res => console.log(res))
            .catch(err => setDomainPingError(err));
    }

    return (
        <>
            {
                // checks if the domain is flagged as deleted, if it is not, render it
                props.d.deleted === false &&
                <div className="bg-info">
                    <p>{props.d.url}</p>
                    <p>{props.d.admin_Email}</p>
                    <p>{props.d.interval_Ms} ms</p>
                    <p>id: {props.d.id}</p>

                    {/*only renders the ping time after it is fetched*/}
                    {
                        domainPing &&
                        <p>ping time: {domainPing.latencyMS}</p>
                    }

                    <div>
                        <button onClick={() => {
                            deleteDomain(props.d, props.type, props.callbackFetch)
                        }}>
                            DELETE ME
                        </button>
                        <button onClick={() => {
                            editDomain(props.d, props.type, props.callbackFetch)
                        }}>
                            EDIT ME
                        </button>
                    </div>
                    <p>

                    </p>
                </div>
            }
        </>
    )
}

const [domainPing, setDomainPing] = useState();

function editDomain(d, type, callbackFetch) {

    console.log('boop');
    return(
        <>
            <p>hi</p>
        </>
    )
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
    xhr.open('PUT', 'http://40.85.76.116/api/' + type + '/del/' + d.id);
    xhr.setRequestHeader("Content-type", "application/json");
    // send the request
    xhr.send();

}


export default DomainList;