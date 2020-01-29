import React, {Component} from 'react';

function Checkbox(props) {

    return (
        <>
            <input type="checkbox" checked={props.active} onClick={changeActiveState}></input>
        </>
    );

    function changeActiveState(event) {
        console.log(event.target.checked);


        // the following is temporary until PUT does not require the whole domain object anymore
        let domainForSending = {...props.domain};
        console.log(domainForSending);
        console.log(JSON.stringify(domainForSending));
        domainForSending.active = event.target.checked;
        submitData(domainForSending);


        // props.changeDomainList(props.id);
    }

    function submitData(domainWithNewActiveState) {
        fetchPut(domainWithNewActiveState)
            .then((data) => {
                props.changeDomainList(props.id)
            })
            .catch((error) => {
                console.error("error while put'ing domains: " + error);
            });
    }

    async function fetchPut(dataForSending) {
        const response = await fetch(props.endpoint + "api/domain/" + props.id,
            {
                method: 'PUT',
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

}


export default Checkbox;