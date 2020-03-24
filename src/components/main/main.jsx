import React from 'react';
import DomainList from "../domainList/domainList";
import "./main.scss";
import {Switch, Route, Redirect} from "react-router-dom";
import StickerList from "../stickerList/stickerList";
import UserMaintainList from "../userMaintainList/userMaintainList";
import Logs from "../logs/logs";

function Main(props) {

    return (
        <>
            <div>
                {/*Switch will only render the first matched <Route/> child.*/}
                <Switch>
                    <Route path="/login">
                        <Redirect to="/"/>
                    </Route>
                    <Route path="/domains">
                        <DomainList
                            endpoint={props.endpoint}
                            domainList={props.domainList}
                            hasDomainListError={props.hasDomainListError}
                            appendDomainList={props.appendDomainList}
                            changeDomainList={props.changeDomainList}
                            fetches={props.fetches}
                        />
                    </Route>

                    <Route path="/users">
                        <UserMaintainList
                            endpoint={props.endpoint}
                            appendUserList={props.appendUserList}
                            changeUserList={props.changeUserList}
                            userList={props.userList}
                            fetches={props.fetches}
                        />
                    </Route>
                    <Route path="/logs">
                        <Logs
                            endpoint={props.endpoint}
                            logs={props.logs}
                        />
                    </Route>
                    <Route path="/">
                        <StickerList
                            endpoint={props.endpoint}
                            domainList={props.domainList}
                            hasDomainListError={props.hasDomainListError}
                            changeDomainList={props.changeDomainList}
                            fetches={props.fetches}
                        />
                    </Route>
                </Switch>
            </div>
        </>
    );
}

export default Main;