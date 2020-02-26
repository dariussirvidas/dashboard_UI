import React, {useState, useEffect} from 'react';
import Sticker from "../sticker/sticker";

import CardDeck from "react-bootstrap/CardDeck";
import './stickerList.scss';
import {ErrorMessage, LoadingSpinner} from "../elements/elements";
import {useSelector, useDispatch} from "react-redux";


function StickerList(props) {
    const isLogged = useSelector(state => state.isLogged);
    const token = useSelector(state => state.token);
    const role = useSelector(state => state.role);

    return (
        <div>
            <div className="container">
                <CardDeck>
                    {
                        props.domainList !== "error" ?
                            (
                                props.domainList.status !== 404 ?
                                    (
                                        props.domainList.map((item) => {
                                            if (item.deleted !== true)
                                                return (
                                                    <SingleService
                                                        item={item}
                                                        endpoint={props.endpoint}
                                                        changeDomainList={props.changeDomainList}
                                                    />
                                                )
                                        })
                                    )
                                    :
                                    (
                                        <>
                                            <p>Please add a domain</p>
                                        </>
                                    )
                            )
                            :
                            (
                                <ErrorMessage/>
                            )
                    }
                </CardDeck>
            </div>
        </div>
    )
}

function SingleService(props) {
    const [domainPingResponseCode, setDomainPingResponseCode] = useState();
    const [requestResponseData, setRequestResponseData] = useState({status: "No response yet"});
    const [requestLatency,setRequestLatency] = useState({status: "No response yet"});
    const [domainPingError, setDomainPingError] = useState("false"); //erroras isbackendo invividualiam requestui
    const [latencyError, setLatencyError] = useState("false"); //erroras isbackendo invividualiam requestui
    const isLogged = useSelector(state => state.isLogged);
    const token = useSelector(state => state.token);
    const role = useSelector(state => state.role);

    useEffect(() => {

        pingDomain();

    }, []);

    useEffect(() => {

        pingLatency();

    }, []);


    const [timer, setTimer] = useState(props.item.interval_Ms);

    useEffect(() => {

        const interval = setInterval(() => {

            setTimer(prevState => prevState - 1000);
            if (timer < 1) {
                pingDomain();
                setTimer(props.item.interval_Ms);
            }
        }, 1000);
        return () => clearInterval(interval);

    }, [timer]);

    async function fetchFromApi(endpoint) {

        const response = await fetch(endpoint, {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });

        const data = await response.json();
        // console.log("data: ", data); 
        // console.log("response: ", response.status);
        setDomainPingResponseCode(response.status);
        // console.log("response again: ", response.status);
        return data;
    }


    function pingDomain() {

        fetchFromApi(props.endpoint + "requests/getservice/" + props.item.id) //fetchinam single service .../getservice/243
            .then(data => {
                setRequestResponseData(data);

                // if the ping response is not success, refetch that single domain to get last failure date
                if (data.status !== "Success")
                    fetchSingleDomain(props.endpoint)
            })
            .catch(error => {
                console.error("error while fetching domains: " + error);
                setDomainPingError(true);
                setRequestResponseData("error");
            });
    }

    function pingLatency() {

        fetchFromApi(props.endpoint + "domain/" + props.item.id) //fetchinam single service .../getservice/243
            .then(data => {
                setRequestLatency(data);

                // if the ping response is not success, refetch that single domain to get last failure date
                if (data.status !== "Success")
                    fetchSingleDomain(props.endpoint)
            })
            .catch(error => {
                console.error("error while fetching domains: " + error);
                setLatencyError(true);
                setRequestLatency("error");
            });
    }

    function fetchSingleDomain(endpoint) {
        fetchFromApi(endpoint + "domain/" + props.item.id)
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
                    domainPing={requestResponseData}
                    domainLatency={requestLatency}
                    checkIn={timer}
                    fetshSingleDomain={fetchSingleDomain}
                />
            }
        </>
    )
}

export default StickerList;