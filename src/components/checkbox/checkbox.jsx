import React, {Component} from 'react';

function Checkbox(props) {

    return (
        <>
            <input type="checkbox" checked={props.active} onClick={changeActiveState}></input>
        </>
    );

    function changeActiveState(event) {
        let domainForSending = {...props.domain};
        domainForSending.active = event.target.checked;
        submitData(domainForSending);
    }

    function submitData(domainWithNewActiveState) {
        fetchPut(domainWithNewActiveState)
            .then((statusCode) => {
                if (statusCode === 200) {
                    console.log("status code 200, run changeDomainList function!");
                    props.changeDomainList(domainWithNewActiveState)
                } else if (statusCode === 400) {
                    console.log("status code 400, do something else");
                    // alert('reeeeeeee')
                } else {
                    console.log("status code " + statusCode + ", this is an unhandled exception I guess")
                }

            })
            .catch((error) => {
                console.log(domainWithNewActiveState);

                console.error("error while PUT'ing domains: " + error);
            });
    }

    async function fetchPut(dataForSending) {
        const response = await fetch(props.endpoint + "api/domain/" + dataForSending.id,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(dataForSending) // body data type must match "Content-Type" header
            }
        );
        await console.log('statusCode:' + response.status);
        let statusCode = await response.status;
        return statusCode;
    }

}


export default Checkbox;