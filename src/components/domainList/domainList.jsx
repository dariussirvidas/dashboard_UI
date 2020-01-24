import React, {Component, useState, useEffect} from 'react';
import './domainList.scss';

function DomainList(props) {
    return (
        <>
            <AddDomain/>
            <p>this is the domain list: </p>
            <p>portals:</p>
            {props.portals.map((item) => {
                return SingleDomain(item, 'portals')
            })}
            <p>services:</p>
            {props.services.map((item) => {
                return SingleDomain(item, 'services')
            })}
        </>
    )
}

const SingleDomain = (d, type) => {
    function deleteDomain() {
        // create a new XMLHttpRequest
        var xhr = new XMLHttpRequest();

        // get a callback when the server responds
        xhr.addEventListener('load', () => {
            // update the state of the component with the result here
            console.log("response text: ", xhr.responseText)
        });
        // open the request with the verb and the url
        console.log('http://40.85.76.116/api/api/services/' + d.id);
        xhr.open('DELETE', 'http://40.85.76.116/api/api/' + type + '/' + d.id);
        xhr.setRequestHeader("Content-type", "application/json");
        // send the request
        xhr.send(JSON.stringify())
    }

    return (
        <>
            <div className="bg-info">
                <p>{d.url}</p>
                <p>{d.admin_Email}</p>
                <p>{d.interval_Ms} ms</p>
                <p>id: {d.id}</p>

                <div>
                    <button onClick={deleteDomain}>
                        DELETE ME
                    </button>
                </div>
                <p>

                </p>
            </div>
        </>
    )
};

const AddDomain = (d) => {
    const dummyData = {
        Url: "www.testDomain99.com",
        Admin_Email: "anotherTest3@gmail.com",
        Interval_Ms: Math.round(Math.random()*1000),
        Deleted: false
    };

    function submitData(type) {
        // create a new XMLHttpRequest
        var xhr = new XMLHttpRequest();

        // get a callback when the server responds
        xhr.addEventListener('load', () => {
            // update the state of the component with the result here
            console.log("response text: ", xhr.responseText)
        });
        // open the request with the verb and the url
        xhr.open('POST', 'http://40.85.76.116/api/api/'+type);
        xhr.setRequestHeader("Content-type", "application/json");
        // send the request
        xhr.send(JSON.stringify(dummyData))
    }

    return (
        <>
            <div>
                <div>
                    <button onClick={submitData('portals')}>
                        send
                    </button>
                    goes to portals
                </div>
                <div>
                    <button onClick={submitData('services')}>
                        send
                    </button>
                    goes to services
                </div>
            </div>
        </>
    )
}

export default DomainList;