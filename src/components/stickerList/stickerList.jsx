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
    const [timer, setTimer] = useState(props.item.interval_Ms);

    useEffect(() => {
        if (props.item.deleted === false) {
            pingDomain();

            // repeatChecks();
            console.log("USESTATE___________");



            const interval = setInterval(() => {
                pingDomain()
            }, props.item.interval_Ms);
            return () => clearInterval(interval);
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

    function pingDomain() {
        fetchFromApi(props.endpoint + "api/ping/domain/" + props.item.id)
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


    function repeatChecks() {
        setTimer(prevState => prevState - 1000);
        console.log("timer:", timer);
        if (timer > 0) {
            setTimeout(repeatChecks, 1000);
            console.log("a second has passed!", "timer =", timer)
        } else {
            console.log("other thing ________");
            pingDomain();
            setTimer(props.item.interval_Ms);
            setTimeout(repeatChecks, 1000);
        }
    }


    return (
        <>
            {
                props.item.deleted === false && props.item.active === true &&
                <Sticker
                    item={props.item}
                    domainPing={domainPing}
                    domainPingError={domainPingError}
                    checkIn={timer}
                />
            }
        </>
    )
}

export default StickerList;