import React from "react";
import './addDomain.scss';


function AddDomain(props) {
    return (
        <>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <legend>Add Domain:</legend>
                    <p>Service Name <input name="Service_name" type="text" placeholder="Service Name"></input></p>
                    <p>Service URL <input name="Url_" type="text" placeholder="Url (www.domain.com)"></input></p>
                    <p>Service Type &nbsp;

                        <select required name="service_type">
                            <option value={0}>WebApp</option>
                            <option value={1}>Service - REST</option>
                            <option value={2}>Service - SOAP</option>
                        </select>
                    </p>
                    <p>Method &nbsp;
                        <select required name="method">>
                            <option value={1}>POST</option>
                            <option value={0}>GET</option>
                        </select>
                    </p>
                    <p>Basic auth
                        <input type="checkbox" name="auth">
                        </input>
                    </p>
                    <p>User
                        <input name="User" type="text" placeholder="User">
                        </input>
                    </p>
                    <p>Password &nbsp;
                        <input name="Password" type="password" placeholder="Password">
                        </input></p>
                    <p>Parameters
                        <input name="Parameters" type="text" placeholder="Add your parameters">
                        </input>
                    </p>
                    <p>Email to notify
                        <input name="Email" type="email" placeholder="name@mail.com">
                        </input>
                    </p>
                    <p>Check interval (S)
                        <input name="Check_interval" type="text" placeholder="Time(s)"></input>
                    </p>
                    <p>Active
                        <input type="checkbox" name="active" value="active">
                        </input></p>
                    <button type="button" className="btn-hero">
                        Test service
                    </button>
                    <button input type="submit" value="submit" className="btn-hero">
                        Save
                    </button>
                    <button type="button" className="btn-hero">
                        Cancel
                    </button>
                </form>
            </div>
            {/* <form onSubmit={handleSubmit}>
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

</div>*/}
        </>
    );

    function handleSubmit(event) {
        let dataForSending = {
            service_Name: event.target.Service_name.value,
            url: event.target.Url_.value,
            service_Type: parseInt(event.target.service_type.value),
            method: parseInt(event.target.method.value),
            basic_auth: event.target.auth.checked,
            user: event.target.User.value,
            password: event.target.Password.value,
            parameters: event.target.Parameters.value,
            notification_Email: event.target.Email.value,
            check_interval: parseInt(event.target.Check_interval.value),
            active: event.target.active.checked
            /*  url: event.target.Url_.value,
             notification_Email: event.target.AdminEmail.value,
             interval_Ms: parseInt(event.target.IntervalMs.value),
             service_Type: event.target.domain_type.value,
             service_Name: event.target.Url_.value,
             parameters: "placeholder parameters",
             active: true */
        };
        console.log("full object for sending:", dataForSending);
        submitData(dataForSending);
        event.preventDefault();
    }

    function submitData(dataForSending) {
        console.log(JSON.stringify(dataForSending));
        fetchPost(dataForSending)
            .then((statusCode) => {
                if (statusCode === 201) {
                    console.log("status code 201, run appendDomainList function!");

                    props.appendDomainList(dataForSending)
                } else if (statusCode === 400) {
                    console.log("status code 400, do something else");
                    // alert('reeeeeeee')
                } else {
                    console.log("status code " + statusCode + ", this is an unhandled exception I guess")
                }

            })
            .catch((error) => {
                console.error("error while POST edit domain: " + error);
            });
    }


    async function fetchPost(dataForSending) {
        const response = await fetch(props.endpoint + 'api/domain', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(dataForSending)
            }
        );
        await console.log('statusCode:' + response.status);
        let statusCode = await response.status;
        return statusCode;
    }


}


export default AddDomain;