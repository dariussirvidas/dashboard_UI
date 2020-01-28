import React from "react";
import './addDomain.scss';


function AddDomain(props) {

    function handleSubmit(event) {
        let dataForSending = {
            Url: event.target.Url_.value,
            Admin_Email: event.target.AdminEmail.value,
            Interval_Ms: parseInt(event.target.IntervalMs.value),
            Active: true
        };
        console.log("full object for sending:", dataForSending);
        submitData(event.target.domain_type.value, dataForSending, props.callbackFetch);
        event.preventDefault();
    }

    return (
        <>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <legend>Add Domain:</legend>
                    <input name="Url_" type="text" placeholder="Url (www.domain.com)"></input>
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
        </>
    )
}

function submitData(type, data, callbackFetch) {
    // create a new XMLHttpRequest
    let xhr = new XMLHttpRequest();

    // get a callback when the server responds
    xhr.addEventListener('load', () => {
        // update the state of the component with the result here
        console.log("response text: ", xhr.responseText)
    });

    // calls the callback function (re-fetch domain list) if successful
    xhr.onload = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 201) {
                // insert success popup here
                callbackFetch.apply();
            } else {
                // insert failure popup here
                console.error(xhr.statusText + 'this means its failed' + xhr.status);
            }
        }
    };

    // open the request with the verb and the url
    xhr.open('POST', 'http://40.85.76.116/api/' + type);
    xhr.setRequestHeader("Content-type", "application/json");
    // send the request
    xhr.send(JSON.stringify(data))
}

export default AddDomain;