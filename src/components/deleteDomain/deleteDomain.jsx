import React, {useEffect, useState} from 'react';
import './deleteDomain.scss';
import {ErrorMessage, LoadingSpinner} from "../elements/elements";

function DeleteDomain(props) {

    async function fetchPutDelete() {
        const response = await fetch(props.endpoint + 'domain/del/' + props.domain.id, {
                method: 'PUT'
            }
        );
        await console.log('statusCode:' + response.status);
        let statusCode = await response.status;
        return statusCode;
    }

    function deleteDomain() {
        fetchPutDelete()
            .then((statusCode) => {
                if (statusCode === 200) {
                    console.log("status code 200, run changeDomainList function!");
                    let dataForSending = {...props.domain};
                    dataForSending.deleted = true;

                    props.changeDomainList(dataForSending)
                } else if (statusCode === 400) {
                    console.log("status code 400, do something else");
                    // alert('reeeeeeee')
                } else {
                    console.log("status code " + statusCode + ", this is an unhandled exception I guess")
                }

            })
            .catch((error) => {
                console.error("error while PUT delete domain: " + error);
            });
    }

    return (
        <>
            <button type="button" onClick={deleteDomain}>Delete</button>
        </>
    )


}

export default DeleteDomain;