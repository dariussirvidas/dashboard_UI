import React, {useState, useEffect} from 'react';
import Sticker from "../sticker/sticker";
import {LoadingSpinner} from "../elements/elements";
import CardDeck from "react-bootstrap/CardDeck";
import Style from './stickerList.scss';


function StickerList(props) {
    return (
        <div>
            <div className="container">
                <CardDeck>
            {
                props.domainList.map((item) => {
                    if(item.deleted !== true)
                    return (
                        <SingleService
                            item={item}
                            endpoint={props.endpoint}
                            changeDomainList={props.changeDomainList}
                        />
                    )
                })
            }
                </CardDeck>
            </div>
        </div>
    )
}

function SingleService(props) {
    const [domainPingResponseCode, setDomainPingResponseCode] = useState();
    const [domainPing, setDomainPing] = useState({status: "No response yet"});
    const [domainPingError, setDomainPingError] = useState("false");

    useEffect(() => {

            pingDomain();
            console.log("USESTATE___________");

    }, []);


    const [timer, setTimer] = useState(props.item.interval_Ms);

    useEffect(() => {

        const interval = setInterval(() => {

            setTimer(prevState => prevState - 1000);
            if (timer < 1 ){
                pingDomain();
                setTimer(props.item.interval_Ms);
            }
        }, 1000);
        return () => clearInterval(interval);

    },[timer]);

    async function fetchFromApi(endpoint) {

        const response = await fetch(endpoint);

        const data = await response.json();
        // console.log("data: ", data); 
        // console.log("response: ", response.status);
        setDomainPingResponseCode(response.status);
        // console.log("response again: ", response.status);
        return data;
    }

    // "method": Get=0, Post=1
    // "service_Type": WebApp=0, ServiceRest=1, ServiceSoap=2


    function pingDomain() {
        //Pinging is dead.
        // fetchFromApi(props.endpoint + "api/ping/domain/" + props.item.id) 
        let endpointToFetch = "";
        switch(props.item.service_Type){
            case(0): //WebApp(Portal)
                endpointToFetch = props.endpoint + "api/requests/getportal/";
                break
            case(1): //ServiceRest
            case(2): //ServiceSoap
                endpointToFetch = props.endpoint + "api/requests/getservice/";
                break
            default:
                console.log("tokio service mes neturim")
            
        }

        fetchFromApi(endpointToFetch + props.item.id) //fetchinam single service .../getservice/243
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
                    // domainPingError={domainPingError}
                    checkIn={timer}
                />
            }
        </>
    )
}

export default StickerList;