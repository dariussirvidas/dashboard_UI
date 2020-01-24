import React, {useState, useEffect} from 'react';
import DomainList from "../domainList/domainList";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";

function Main(props) {
    return (
        <>
            <div>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/topics">Topics</Link>
                    </li>
                    <li>
                        <Link to="/domains">Domains</Link>
                    </li>
                </ul>

                {/*Switch will only render the first matched <Route/> child.*/}
                <Switch>

                    <Route path="/about">
                        <p>this is the about page</p>
                    </Route>

                    <Route path="/topics">
                        <ExampleComponentStructure/>
                    </Route>

                    <Route path="/domains">

                        {
                            Boolean(props.portals) === true && Boolean(props.services) === true &&
                            <DomainList
                                services={props.services}
                                portals={props.portals}
                                callbackReFetchDomains={props.callbackReFetchDomains}
                            />
                        }

                    </Route>

                    <Route path="/">
                        <p>home page</p>
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