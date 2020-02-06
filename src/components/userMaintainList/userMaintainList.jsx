import React, {Component} from 'react';
import Checkbox from "../checkbox/checkbox";
import style from './userMaintainList.scss'

function UserMaintainList(){
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
                        <tr align="center">
                            <td>Donald</td>
                            <td>Trump</td>
                            <td>Donald.Trump@one.lt</td>
                            <td>
                                <Checkbox/>
                            </td>
                            <td><a href="">Edit</a></td>
                        </tr>
                    </table>
                    <div className="button">
                    <button>Add New User</button>
                    </div>
                </div>
            </div>
        );
}

export default UserMaintainList;