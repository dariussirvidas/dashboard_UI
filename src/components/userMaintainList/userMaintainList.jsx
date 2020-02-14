import React, {useState, useEffect} from 'react';
import Checkbox from "../checkbox/checkbox";
import style from './userMaintainList.scss'
import Popup from "reactjs-popup";
import EditUser from '../editUser/editUser';
import {ErrorMessage} from "../elements/elements";

function UserMaintainList(props) {

    const [userList, setUserList] = useState();
    useEffect(() => {
        getData();
    }, []);
    const [userListError, setUserListError] = useState();

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
                setUserListError(true);
                console.error("Error while fetching user list: " + error);
            });
    }

    async function fetchGet() {

        const response = await fetch(props.endpoint + "api/" + "users",
            {
                method: 'GET',
                headers: {
                    // 'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjgiLCJyb2xlIjoiVXNlciIsIm5iZiI6MTU4MTQxNTg4NiwiZXhwIjoxNTgyMDIwNjg2LCJpYXQiOjE1ODE0MTU4ODZ9.65cge-mCWXkuOLGm0yeTaMQFfysV36ogJLBYfGB1HAE'
                },
            }
        );
        const userList = await response.json();
        await setUserList(userList);
        console.log(userList);
        return response.status;
    }

    return (
        <div>
            <div className="TableDiv">
                <table className="Table" align="center">
                    <tr>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Email</th>
                        <th>Active</th>
                        <th>Maintenance</th>
                    </tr>

                    {
                        // checks for errors, if there are any, do not render domains
                        userListError === true ?
                            (
                                <ErrorMessage
                                    message="User List error"
                                />
                            )
                            :
                            (
                                Boolean(userList) === true &&
                                userList.map((item) => {
                                    return <SingleUser
                                        user={item}
                                    />
                                })
                            )
                    }
                </table>
            </div>
        </div>
    );
}


function SingleUser(props) {
    return (
        <tr align="center">
            <td>{props.user.firstName}</td>
            <td>{props.user.lastName}</td>
            <td>{props.user.userEmail}</td>
            <td>
                <Checkbox/>
            </td>
            <td><a href="">Edit</a></td>
        </tr>
    )
}

export default UserMaintainList;