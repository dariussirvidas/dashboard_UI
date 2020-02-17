import React from "react";
import './editUser.scss';

function EditUser(props) {
    return (
        <>
            <div className="popup-container">
                <form onSubmit={handleSubmit}>
                    <legend>Edit Domain:</legend>
                    <p>Name <input name="firstName" type="text" placeholder="Name"></input></p>
                    <p>Last Name <input name="lastName" type="text" placeholder="Last Name"></input></p>
                    <p>Username <input name="username" type="text" placeholder="Username"></input></p>
                    <p>Email <input name="userEmail" type="text" placeholder="Email"></input></p>
                    <p>Active <input type="checkbox" name="active" value="active"></input></p>
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
            firstName: event.target.firstName.value,
            lastName: event.target.lastName.value,
            username: event.target.username.value,
            userEmail: event.target.userEmail.value,

        };
        console.log("full object for sending:", dataForSending);
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
    fetchPost(endpoint + "users", dataForSending)
        .then((data) => {
            callbackAppendDomainList(data)
        })

        .catch((error) => {
            console.error("error while fetching domains:" + error);
        });
}

export default EditUser;