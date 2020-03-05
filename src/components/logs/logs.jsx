import React, {useEffect, useState} from 'react';
import {ErrorMessage} from "../elements/elements";
import {useSelector, useDispatch} from "react-redux";
import Checkbox from "../checkbox/checkbox";

function Logs(props) {
    const isLogged = useSelector(state => state.isLogged);
    const token = useSelector(state => state.token);
    const userData = useSelector(state => state.userData);

    const [logs, setLogs] = useState();
    const [logsResponse, setLogsResponse] = useState();
    const [hasLogsError, setLogsError] = useState({});

    // async function fetchLogsFromApi(endpoint) {
    //
    //     const response = await fetch(endpoint + "logs", {
    //         method: "GET",
    //         headers: {
    //             'Authorization': 'Bearer ' + token
    //         }
    //     });
    //
    //     const data = await response.json();
    //
    //     setLogsResponse(response.status);
    //
    //     return data;
    // }
    //
    // function FetchLogs(endpoint) {
    //     fetchLogsFromApi(endpoint + "logs")
    //         .then(data => {
    //             setLogs(data)
    //         })
    //         .catch(error => {
    //             console.error("error while fetching Logs:" + error);
    //         });
    // }
    //
    // useEffect(() =>
    //      FetchLogs()
    // );

    useEffect((endpoint) => {
        const fetchLogs = () =>
            fetch(endpoint + "logs")
                .then(res => res.json())
                .then(data => {
                    setLogs(data)
                })
        fetchLogs()
    }, [])



    console.log("Data you are looking for: " + logs);

    return (
        <div className="container-fluid">
            <div className="container table-responsive space">
                <div className="TableDiv">
                    <table className="Table table-hover" align="center">
                        <tr>
                            <th className="text-center" width="5%">Active</th>
                            <th className="text-left" width="9%">Service Name</th>
                            <th className="text-center" width="7%">Service Type</th>
                            <th className="text-left" width="15%">URL</th>
                            <th className="text-left" width="15%">Emails</th>
                            <th className="text-center" width="8%">Check interval</th>
                            <th className="text-center" width="6%">Threshold</th>
                            <th className="text-center" width="7%">Maintenance</th>
                        </tr>
                        <tr align="center">
                            <td className="text-center">

                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    );
}

function SingleLog() {
    return (
        <div>
            <tr align="center">
                <td className="text-center">
                    <p></p>
                </td>
            </tr>

        </div>
    );
}

export default Logs;