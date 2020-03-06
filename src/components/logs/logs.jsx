import React, {useEffect, useState} from 'react';
import {ErrorMessage} from "../elements/elements";
import {useSelector, useDispatch} from "react-redux";
import Checkbox from "../checkbox/checkbox";

function Logs(props) {
    const isLogged = useSelector(state => state.isLogged);
    const token = useSelector(state => state.token);
    const userData = useSelector(state => state.userData);

    const [logs, setLogs] = useState({});
    const [endpoint, setEndpoint] = useState("https://watchhoundapi.azurewebsites.net/");
    const [logsError, setLogsError] = useState();

    useEffect(() => {
        getData();
        fetchGet(endpoint)
    }, []);

    console.log(logs)

    function getData() {
        fetchGet()
            .then((statusCode) => {
                if (statusCode === 200) {
                    console.log("status code 200");
                } else if (statusCode === 401) {
                    console.log("status code 401, do something else");
                    alert('Unauthenticated')
                } else {
                    console.log("status code " + statusCode + ", this is an unhandled exception I guess")
                }

            })
            .catch((error) => {
                setLogsError(true);
                console.error("Error while fetching log list: " + error);
            });
    }

    async function fetchGet() {

        const response = await fetch(endpoint + "logs", {
                method: "GET",
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            }
        );
        const logs = await response.json();
        await setLogs(logs);
        return response.status;
    }


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
                        {


                            Boolean(logs) === true &&
                            logs.map((item) => {
                                return <SingleLog
                                    logs={item}
                                    endpoint={props.endpoint}
                                />
                            })

                        }
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
                    <p>{}</p>
                </td>
            </tr>

        </div>
    );
}

export default Logs;