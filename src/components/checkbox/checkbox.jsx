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
    }

    function submitData(domainWithNewActiveState) {
        fetchPut(domainWithNewActiveState)
            .then((data) => {
                console.log('magic data:', data);
                console.log('status code:', data.status);

                if (data.status === 200) {
                    console.log("status code 200, run changeDomainList function!");
                    props.changeDomainList(domainWithNewActiveState)
                }
                else if (data.status === 400) {
                    console.log("status code 400, do something else");
                    // alert('reeeee')
                }
                else
                {
                    console.log("status code " + data.status + ", this is an unhandled exception I guess")
                }

            })
            .catch((error) => {
                console.error("error while PUT'ing domains: " + error);
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
        data.status = response.status;
        return data;
    }

}


export default Checkbox;