import React from 'react';
import {NotificationManager} from "react-notifications";
import './checkbox.scss';

function Checkbox(props) {

    return (
        <>
            <input type="checkbox" checked={props.active} onChange={changeActiveState}/>
        </>
    );

    function changeActiveState(event) {
        let domainForSending = {...props.domain};
        domainForSending.active = event.target.checked;
        submitData(domainForSending);
    }

    function submitData(domainWithNewActiveState) {
        fetchPut(domainWithNewActiveState).then((statusCode) => {
            if (statusCode === 200) {
                props.changeDomainList(domainWithNewActiveState)
            } else {
                NotificationManager.error('Failed to save changes!', 'Error!', 3000);
            }
        }).catch(() => {
            NotificationManager.error('Failed to save changes!', 'Error!', 3000);
        });
    }

    async function fetchPut(dataForSending) {
        const response = await props.fetches.fetchPut(props.endpoint + "domain/" + dataForSending.id, dataForSending);
        return response.status;
    }

}

export default Checkbox;