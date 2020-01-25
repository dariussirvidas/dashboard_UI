import React, {Component, useState, useEffect} from 'react';
import './domainList.scss';

function DomainList(props) {

    // need to find a proper way to ping all the domains and render them out...

    // const [servicesPingList, setServicesPingList] = useState();
    // const [servicesPingError, setServicesPingError] = useState();
    //
    // async function pingServiceDomain(id) {
    //     console.log("fetching services!");
    //     const res = await fetch("http://40.85.76.116/api/ping/service/" + id);
    //     res
    //         .json()
    //         .then(res => setServicesPingList(res))
    //         .then(res => console.log(res))
    //         .catch(err => setServicesPingError(err));
    // }
    //
    // useEffect(() => {
    //     console.log(pingServiceDomain( 334     ));
    // }, []);

    return (
        <>

            <AddDomain/>
            <p>this is the domain list: </p>
            <h2>portals:</h2>
            {props.portals.map((item) => {

                return SingleDomain(item, 'portals', props.callbackReFetchDomains)
            })}
            <h2>services:</h2>
            {props.services.map((item) => {
                return SingleDomain(item, 'services', props.callbackReFetchDomains)
            })}
        </>
    )
}


const SingleDomain = (d, type, callbackFetch) => {

    // need to find a way to properly ping and THEN render the ping time

    return (
        <>
            {
                // checks if the domain is flagged as deleted, if it is not, render it
                d.deleted === false &&
                <div className="bg-info">
                    <p>{d.url}</p>
                    <p>{d.admin_Email}</p>
                    <p>{d.interval_Ms} ms</p>
                    <p>id: {d.id}</p>

                    {
                        <p>ping time: {d.ping}</p>
                    }

                    <div>
                        <button onClick={() => {
                            deleteDomain(d, type)
                        }}>
                            DELETE ME
                        </button>
                        <button>
                            EDIT ME
                        </button>
                    </div>
                    <p>

                    </p>
                </div>
            }
        </>
    )
};

function deleteDomain(d, type) {
    // create a new XMLHttpRequest
    let xhr = new XMLHttpRequest();

    // get a callback when the server responds
    xhr.addEventListener('load', () => {
        // update the state of the component with the result here
        console.log("delete (PUT) response text: ", xhr.responseText)
    });
    // open the request with the verb and the url
    xhr.open('PUT', 'http://40.85.76.116/api/' + type + '/del/' + d.id);
    xhr.setRequestHeader("Content-type", "application/json");
    // send the request
    xhr.send();
    // callbackFetch();
}

function submitData(type, data) {
    // create a new XMLHttpRequest
    var xhr = new XMLHttpRequest();

    // get a callback when the server responds
    xhr.addEventListener('load', () => {
        // update the state of the component with the result here
        console.log("response text: ", xhr.responseText)
    });
    // open the request with the verb and the url
    xhr.open('POST', 'http://40.85.76.116/api/' + type);
    xhr.setRequestHeader("Content-type", "application/json");
    // send the request
    xhr.send(JSON.stringify(data))
}

const AddDomain = (domainData) => {
    const dummyData = {
        Url: "www.testDomain99.com",
        Admin_Email: "anotherTest3@gmail.com",
        Interval_Ms: Math.round(Math.random() * 1000),
    };

    return (
        <>
            <div>
                <div>
                    <input type="text" placeholder="Url (www.domain.com)"/>
                    <input type="text" placeholder="Email (user@mail.com)"/>
                    <input type="number" placeholder="Interval Ms (1000)"/>
                </div>
                <div>
                    <button onClick={() => {
                        submitData('portals', domainData)
                    }}>
                        send
                    </button>
                    goes to portals
                </div>
                <div>
                    <button onClick={() => {
                        submitData('services', domainData)
                    }}>
                        send
                    </button>
                    goes to services
                </div>
            </div>
        </>
    )
};

export default DomainList;