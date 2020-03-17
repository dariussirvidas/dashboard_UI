import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import Style from './logs.scss';


function Logs(props) {
    const isLogged = useSelector(state => state.isLogged);
    const token = useSelector(state => state.token);
    const userData = useSelector(state => state.userData);

    const [LogsList, setLogs] = useState([]);
    const [logsError, setLogsError] = useState();

    useEffect(() => {
        getData();
        fetchGet()
    }, []);


    function getData() {
        fetchGet()
            .then((statusCode) => {
                if (statusCode === 200) {
                    console.log("status code 200");
                } else if (statusCode === 401) {
                    console.log("status code 401");
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

        const response = await fetch(props.endpoint + "logs/", {
                method: "GET",
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            }
        );
        const LogList = await response.json();
        await setLogs(LogList);
        return response.status;
    }


    return (
        <div className="container-fluid">
            <div className="container table-responsive space">
                <div className="TableDiv">
                    <table className="Table table-hover css-serial" align="center">
                        <tr>
                            <th width="2%">#</th>
                            <th className="text-left">Service Name</th>
                            <th className="text-center">Date</th>
                            <th className="text-center">Time</th>
                            <th className="text-center">Error</th>
                        </tr>
                        {

                            props.logs.status === 404 ?
                                (
                                    <>
                                        <h1>NO LOGS TO SHOW</h1>
                                    </>
                                )
                                :
                                (
                                    props.logs.slice(0, 9).map((item) => {
                                        return <SingleLog
                                            logs={item}
                                        />
                                    })
                                )
                        }
                    </table>
                </div>
            </div>
        </div>
    );
}

function SingleLog(props) {
    return (
        <>
            <tr align="center">
                <td className="css-serialrow"></td>
                <td className="text-truncate text-center">
                    <div className="tooltip-wrap text-left">
                        <p className="text-truncate text-left" data-toggle="tooltip" data-placement="top"
                           title={props.logs.service_Name}
                        >
                            {props.logs.service_Name}
                        </p>
                    </div>
                </td>
                <td className="text-truncate text-center">
                    <div className="tooltip-wrap text-left">
                        <p className="text-truncate text-center" data-toggle="tooltip" data-placement="top"
                        >
                            {props.logs.log_Date.slice(0, 10)}
                        </p>
                    </div>
                </td>
                <td className="text-truncate text-center">
                    <div className="tooltip-wrap text-left">
                        <p className="text-truncate text-center" data-toggle="tooltip" data-placement="top"
                        >
                            {props.logs.log_Date.slice(11, 16)}
                        </p>
                    </div>
                </td>
                <td className="text-truncate ">
                    <div className="tooltip-wrap">
                        <p className="text-truncate text-center" data-toggle="tooltip" data-placement="top"
                        >
                            {props.logs.error_Text}
                        </p>
                    </div>
                </td>
            </tr>
        </>
    );
}

export default Logs;