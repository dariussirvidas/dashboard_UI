import React, {useState, useEffect} from 'react';
import DomainList from "../domainList/domainList";
import "./main.scss";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";
import StickerList from "../stickerList/stickerList";
import Login from '../login/login'
import Signup from "../signup/signup";
import UserMaintainList from "../userMaintainList/userMaintainList";

function Main(props) {

    return (
        <>
            <div>
                {/*Switch will only render the first matched <Route/> child.*/}
                <Switch>

                    <Route path="/topics">
                        <ExampleComponentStructure/>
                    </Route>
                    <Route path="/login">
                        <Login/>
                    </Route>
                    <Route path="/domains">
                        <DomainList
                            endpoint={props.endpoint}
                            callbackReFetchDomains={props.callbackReFetchDomains}
                            domainList={props.domainList}
                            hasDomainListError={props.hasDomainListError}
                            appendDomainList={props.appendDomainList}
                            changeDomainList={props.changeDomainList}
                        />
                    </Route>
                    <Route path="/signup">
                        <Signup/>
                    </Route>
                    <Route path="/users">
                        <UserMaintainList
                            endpoint={props.endpoint}
                        />
                    </Route>
                    <Route path="/">
                        <StickerList
                            endpoint={props.endpoint}
                            callbackReFetchDomains={props.callbackReFetchDomains}
                            domainList={props.domainList}
                            hasDomainListError={props.hasDomainListError}
                            changeDomainList={props.changeDomainList}
                        />
                    </Route>

                </Switch>
            </div>
        </>
    );
}


function ExampleComponentStructure() {

    // useRouteMatch gives you access to the match property without rendering a <Route> component.
    // It matches the URL just like a Route would and it accepts an exact, strict, path and sensitive options
    // just like a <Route>
    let match = useRouteMatch();

    return (
        <>
            <div>
                <h2>Topics</h2>

                <ul>
                    <li>
                        <Link to={`${match.url}/components`}>Components</Link>
                    </li>
                    <li>
                        <Link to={`${match.url}/props-v-state`}>
                            Props v. State
                        </Link>
                    </li>
                </ul>

                {/* The Topics page has its own <Switch> with more routes
          that build on the /topics URL path. You can think of the
          2nd <Route> here as an "index" page for all topics, or
          the page that is shown when no topic is selected */}
                <Switch>
                    <Route path={`${match.path}/:topicId`}>
                        <Topic/>

                    </Route>
                    <Route path={match.path}>
                        <h3>Please select a topic.</h3>
                    </Route>
                </Switch>
            </div>
        </>
    )
}

function Topic() {
    let {topicId} = useParams();
    return <h3>Requested topic ID: {topicId}</h3>;
}

export default Main;