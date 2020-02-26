import React, {useState, useEffect} from 'react';
import Checkbox from "../checkbox/checkbox";
import style from './userMaintainList.scss'
import Popup from "reactjs-popup";
import {ErrorMessage} from "../elements/elements";

import AddDomainModal from "../addDomainModal/addDomainModal";
import AddUserModal from "../addUserModal/addUserModal";
import DeleteUser from "../deleteUser/deleteUser";
import DeleteDomain from "../deleteDomain/deleteDomain";
import EditUserModal from "../editUserModal/editUserModal";
import {useSelector, useDispatch} from "react-redux";

function UserMaintainList(props) {

    const isLogged = useSelector(state => state.isLogged);
    const token = useSelector(state => state.token);
    const role = useSelector(state => state.role);

    return (
        <div className="container-fluid">
            <div className="container table-responsive space">
            <div className="TableDiv">
                <div className="d-flex justify-content-start domainButton">
                    <AddUserModal
                        callbackFetch={props.callbackReFetchDomains}
                        appendUserList={props.appendUserList}
                        endpoint={props.endpoint}/>
                </div>
                <table className="Table" align="center">
                    <tr>
                        <th className="text-left" width="13%">Username</th>
                        <th className="text-left" width="12%">Name</th>
                        <th className="text-left" width="12%">Surname</th>
                        <th className="text-left" width="17%">Email</th>
                        <th className="text-left" width="7%">Role</th>
                        <th className="text-center" width="10%">Maintenance</th>
                    </tr>
                    {
                        props.userListError === true ?
                            (
                                <ErrorMessage
                                    message="User List error"
                                />
                            )
                            :
                            (
                                Boolean(props.userList) === true &&
                                props.userList.map((item) => {
                                    return <SingleUser
                                        user={item}
                                        endpoint={props.endpoint}
                                        changeUserList={props.changeUserList}
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

function SingleUser(props) {
    return (
        <>
            {
                props.user.deleted === true ?
                    (
                        <>
                        </>
                    )
                    :
                    (
                        <tr align="center">
                            <td className="text-truncate">
                                <div className="tooltip-wrap text-left">
                                    <p className="text-truncate" data-toggle="tooltip" data-placement="top"
                                       title={props.user.username}>
                                        {props.user.username}
                                    </p>
                                </div>
                            </td>
                            <td className="text-truncate text-left">
                                <div className="tooltip-wrap">
                                    <p className="text-truncate" data-toggle="tooltip" data-placement="top"
                                       title={props.user.firstName}>
                                        {props.user.firstName}
                                    </p>
                                </div>
                            </td>
                            <td className="text-truncate text-left">
                                <div className="tooltip-wrap">
                                    <p className="text-truncate" data-toggle="tooltip" data-placement="top"
                                       title={props.user.lastName}>
                                        {props.user.lastName}
                                    </p>
                                </div>
                            </td>
                            <td className="text-truncate text-left">
                                <div className="tooltip-wrap">
                                    <p className="text-truncate" data-toggle="tooltip" data-placement="top"
                                       title={props.user.userEmail}>
                                        {props.user.userEmail}
                                    </p>
                                </div>
                            </td>
                            <td className="text-truncate text-left">
                                <div className="tooltip-wrap">
                                    <p className="text-truncate" data-toggle="tooltip" data-placement="top"
                                       title={props.user.role}>
                                        {props.user.role}
                                    </p>
                                </div>
                            </td>
                            <td>
                                <div className="text-center">
                                    <EditUserModal
                                       user={props.user}
                                       changeUserList={props.changeUserList}
                                       endpoint={props.endpoint}
                                       appendUserList={props.appendUserList}

                                    />
                                </div>
                            </td>
                        </tr>
                    )
            }
        </>
    )
}

export default UserMaintainList;