import React from 'react';
import './logs.scss';

function Logs(props) {

    return (
        <div className="container-fluid">
            <div className="container table-responsive space">
                <div className="TableDiv">
                    <table className="Table table-hover css-serial" align="center">
                        <thead>
                            <tr>
                                <th width="2%">#</th>
                                <th className="text-left">Service Name</th>
                                <th className="text-center">Date</th>
                                <th className="text-center">Time</th>
                                <th className="text-center">Error</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            Boolean(props.logs) === false ?
                                (
                                    <>
                                    </>
                                )
                                :
                                (
                                    props.logs.slice(0, 9).map((item) => {
                                        return <SingleLog
                                            key={item.id}
                                            logs={item}
                                        />
                                    })
                                )
                        }
                        </tbody>
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