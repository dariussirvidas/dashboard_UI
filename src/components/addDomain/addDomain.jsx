import React from "react";
import './addDomain.scss';


function AddDomain(props) {
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
                    <p><input type="submit" value="submit" /></p>

                </form>

            </div>
        </>
    );

    function handleSubmit(event) {
        let dataForSending = {
            url: event.target.Url_.value,
            notification_Email: event.target.AdminEmail.value,
            interval_Ms: parseInt(event.target.IntervalMs.value),
            service_Type: event.target.domain_type.value,
            service_Name: event.target.Url_.value,
            parameters: "placeholder parameters",
            active: true
        };
        console.log("full object for sending:", dataForSending);
        submitData(props.endpoint, props.appendDomainList, dataForSending);
        event.preventDefault();
    }
}

async function fetchPost(endpoint, dataForSending) {
    const response = await fetch(endpoint,
        {
            method: 'POST',
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

function submitData(endpoint, callbackAppendDomainList, dataForSending) {
    fetchPost(endpoint + "api/domain/", dataForSending)
        .then((data) => {
            callbackAppendDomainList(data)
        })

        .catch((error) => {
            console.error("error while fetching domains:" + error);
        });
}

export default AddDomain;