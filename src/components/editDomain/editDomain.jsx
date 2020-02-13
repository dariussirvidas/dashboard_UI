import React from "react";
import './editDomain.scss';
import Popup from "reactjs-popup";


// currently functions as another Add service


// jei webapp, metodas GET, keisti negalima, nereikia parametru
// jei auth checked, neduoda user ir password

let isWebappSelected=false;
let isRestSelected=false;
let isSoapSelected=false;
function EditDomain(props) {


    function getDefaultSelectionServiceType(){
        switch(props.domain.service_Type){
            case 0 :
                isWebappSelected = true;
                break;
            case 1 :
                isRestSelected = true;
                break;
            case 2 :
                isSoapSelected = true;
                break;
        }
    }


    return (
        <>
            {
                getDefaultSelectionServiceType()
            }

            <div className="popup-container">
                <form onSubmit={handleSubmit}>
                    <legend>Edit Domain:</legend>
                    <p>Service Name
                        <input defaultValue={props.domain.service_Name} name="Service_name" type="text" placeholder="Service Name"></input>
                    </p>
                    <p>Service URL
                        <input defaultValue={props.domain.url} name="Url_" type="text" placeholder="Url (www.domain.com)"></input>
                    </p>
                    <p>Service Type &nbsp;
                        <select required name="service_type">
                            <option selected={isWebappSelected} value="webapp">WebApp</option>
                            <option selected={isRestSelected} value="rest">Service - REST</option>
                            <option selected={isSoapSelected} value="soap">Service - SOAP</option>
                        </select>
                    </p>
                    <p>Method &nbsp;
                        <select required name="method">>
                            <option value="post">POST</option>
                            <option value="get">GET</option>
                        </select>
                    </p>
                    <p>Basic auth
                        <input defaultChecked={props.domain.active} type="checkbox" name="auth"></input>
                    </p>
                    <p>User
                        <input defaultValue={props.domain.user} name="User" type="text" placeholder="User"></input>
                    </p>
                    <p>Password &nbsp;
                        <input name="Password" type="password" placeholder="Password">

                        </input></p>
                    <p>Parameters <input name="Parameters" type="text" placeholder="Add your parameters">

                    </input>
                    </p>
                    <p>Email to notify
                        <input name="Email" type="email" placeholder="name@mail.com"></input>
                    </p>
                    <p>Check interval (S)
                        <input name="Check_interval" type="text" placeholder="Time(s)"></input>
                    </p>
                    <p>Active
                        <input type="checkbox" name="active" value="active"></input></p>
                    <button type="button" className="btn-hero">
                        Test service
                    </button>
                    <button input type="submit" className="btn-hero">
                        Save
                    </button>
                    <button type="button" className="btn-hero">
                        Cancel
                    </button>
                </form>
            </div>

        </>
    );

    function handleSubmit(event) {
        let dataForSending = {
            service_Name: event.target.Service_name.value,
            Url_: event.target.Url_.value,
            service_Type: event.target.service_type.value,
            Method: event.target.method.value,
            basic_auth: event.target.auth.checked,
            User: event.target.User.value,
            Password: event.target.Password.value,
            Parameters: event.target.Parameters.value,
            email: event.target.Email.value,
            check_interval: parseInt(event.target.Check_interval.value),
            active: event.target.active.checked
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

export default EditDomain;