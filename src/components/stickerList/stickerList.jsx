import React, {useState, useEffect} from 'react';
import Sticker from "../sticker/sticker";
import {LoadingSpinner} from "../elements/elements";


function StickerList(props) {
    return (
        <>
            {
                props.domainList.map((item) => {
                    return (
                        <SingleService
                            item={item}
                            endpoint={props.endpoint}
                            changeDomainList={props.changeDomainList}
                        />
                    )
                })
            }
        </>
    )
}

function SingleService(props) {
    const [domainPingResponseCode, setDomainPingResponseCode] = useState();
    const [domainPing, setDomainPing] = useState({status: "No response yet"});
    const [domainPingError, setDomainPingError] = useState("false");

    useEffect(() => {
        if (props.item.deleted === false) {
            pingDomain(props.item, props.type);
        }
    }, []);

    async function fetchFromApi(endpoint) {
        const response = await fetch(endpoint);
        const data = await response.json();
        console.log("data: ", data);
        console.log("response: ", response.status);
        setDomainPingResponseCode(response.status);
        console.log("response again: ", response.status);
        return data;
    }

    function pingDomain(d) {
        fetchFromApi(props.endpoint + "api/ping/domain/" + d.id)
            .then(data => {
                setDomainPing(data);

                // if the ping response is not success, refetch that single domain to get last failure date
                if (data.status !== "Success")
                    fetchSingleDomain(props.endpoint)
            })
            .catch(error => {
                console.error("error while fetching domains: " + error);
                setDomainPingError(true);
                setDomainPing("error");
            });
    }

    function fetchSingleDomain(endpoint) {
        fetchFromApi(endpoint + "api/domain/" + props.item.id)
            .then(data => {
                // the updated single domain goes up to be put in the local state in <App/>
                props.changeDomainList(data)
            })
            .catch(error => {
                console.error("error while fetching SINGLE domain:" + error);
            });
    }

    return (
        <>
            {
                props.item.deleted === false && props.item.active === true &&
                <Sticker
                    item={props.item}
                    domainPing={domainPing}
                    domainPingError={domainPingError}
                />
            }
        </>
    )
}

export default StickerList;