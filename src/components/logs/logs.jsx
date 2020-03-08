import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import Style from './logs.scss';


function Logs(props) {

    return (
        <div className="container-fluid">
            <div className="container table-responsive space">
                <div className="TableDiv">
                    <table className="Table table-hover" align="center">
                        <tr>
                            <th className="text-left">Service Name</th>
                            <th className="text-center">Date</th>
                            <th className="text-center">Time</th>
                            <th className="text-center">Error</th>
                        </tr>
                        {
                            props.logs.slice(0, 9).map((item) => {
                                return <SingleLog
                                    logs={item}
                                />
                            })
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
                <td className="text-truncate text-center">
                    <div className="tooltip-wrap text-left">
                        <p className="text-truncate text-left" data-toggle="tooltip" data-placement="top"
                           title={props.logs.Service_Name}
                           >
                            {props.logs.Service_Name}
                        </p>
                    </div>
                </td><td className="text-truncate text-center">
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