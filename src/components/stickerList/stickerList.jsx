import React, {useEffect, useState} from 'react';
import Sticker from "../sticker/sticker";
import CardDeck from "react-bootstrap/CardDeck";
import './stickerList.scss';
import {ErrorMessage} from "../elements/elements";

function StickerList(props) {

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
                                            if (item.deleted !== true) {
                                                return (
                                                    <SingleService
                                                        key={item.id}
                                                        item={item}
                                                        endpoint={props.endpoint}
                                                        changeDomainList={props.changeDomainList}
                                                        logs={props.logs}
                                                        fetches={props.fetches}
                                                    />
                                                )
                                            }
                                            else return <></>
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

    const [requestResponseData, setRequestResponseData] = useState({status: "No response yet"});

    useEffect(() => {
        pingDomain();
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
        let response = await props.fetches.fetchGet(endpoint);
        try {
            /*setDomainPingResponseCode(response.status);*/
            return await response.json();
        }
        catch (error) {
            console.error("fetchFromApi error: " + error);
            return null;
        }
    }

    function pingDomain() {

        fetchFromApi(props.endpoint + "requests/getservice/" + props.item.id) //fetchinam single service .../getservice/243
            .then(data => {
                setRequestResponseData(data);

                // if the ping response is not success, refetch that single domain to get last failure date
                if (data.status >= 300)
                    fetchSingleDomain(props.endpoint)
            })
            .catch(error => {
                console.error("error while fetching domains (#1): " + error);
                /*setDomainPingError(true);*/
                setRequestResponseData("error");
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

    // new logs stuff

    const [logs, setLogs] = useState([]);

    function getData() {
        fetchGetLogs()
            .then(() => {}).catch((error) => {
                console.error("Error while fetching log list: " + error);
            });
    }

    async function fetchGetLogs() {
        const response = await props.fetches.fetchGet(props.endpoint + "logs/" + props.item.id);
        if (response.status === 200) {
            const LogList = await response.json();
            await setLogs(LogList);
            return response.status;
        }
    }

    useEffect(() => {
        getData();
    }, []);

    return (

        <>
            {
                props.item.deleted === false && props.item.active === true &&
                <Sticker
                    item={props.item}
                    domainPing={requestResponseData}
                    checkIn={timer}
                    logs={logs}
                />
            }
        </>
    )
}

export default StickerList;