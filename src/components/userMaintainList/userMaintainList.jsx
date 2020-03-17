import React, { useState, useEffect } from 'react';
import Checkbox from "../checkbox/checkbox";
import './userMaintainList.scss'
import Popup from "reactjs-popup";
import { ErrorMessage } from "../elements/elements";
import { Link, Redirect } from "react-router-dom";
import AddDomainModal from "../addDomainModal/addDomainModal";
import AddUserModal from "../addUserModal/addUserModal";
import DeleteUser from "../deleteUser/deleteUser";
import DeleteDomain from "../deleteDomain/deleteDomain";
import EditUserModal from "../editUserModal/editUserModal";
import { useSelector, useDispatch } from "react-redux";

function UserMaintainList(props) {

    const isLogged = useSelector(state => state.isLogged);
    const token = useSelector(state => state.token);
    const userData = useSelector(state => state.userData);


    function doFilter() {
        var input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("usersListSearch");
        filter = input.value.toUpperCase();
        table = document.getElementById("usersList");
        tr = table.getElementsByTagName("tr");

        // Loop through all table rows, and hide those who don't match the search query
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByClassName("userNameTd")[0];
            if (td) {
                console.log(td)

                try {
                    txtValue = td.querySelector('.userName').textContent;  //td.textContent || td.innerText;
                }
                catch (error) {
                    txtValue = '';
                }

                //txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }

    return (

        userData.role === "Admin" ?
            (
                <div className="container-fluid">
                    <div className="container d-flex searchContainer">
                        <div className="d-flex justify-content-start domainButton">
                            <AddUserModal
                                callbackFetch={props.callbackReFetchDomains}
                                appendUserList={props.appendUserList}
                                endpoint={props.endpoint} />
                        </div>
                        <input className="searchBox form-control" type="text" id="usersListSearch" onKeyUp={doFilter} placeholder="Search for Services.."></input>
                    </div>
                    <div className="container table-responsive space1">
                        <div className="TableDiv">
                            <table id="usersList" className="Table css-serial" align="center">
                                <tr>
                                    <th width="2%">#</th>
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
            )
            :
            (
                <Redirect to="/">
                </Redirect>
            )

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
                            <td className="css-serialrow"></td>
                            <td className="text-truncate">
                                <div className="tooltip-wrap text-left">
                                    <p className="text-truncate" data-toggle="tooltip" data-placement="top"
                                        title={props.user.username}>
                                        {props.user.username}
                                    </p>
                                </div>
                            </td>
                            <td className="text-truncate text-left userNameTd">
                                <p className="text-truncate userName" data-toggle="tooltip" data-placement="top"
                                    title={props.user.firstName}>
                                    {props.user.firstName}
                                </p>
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