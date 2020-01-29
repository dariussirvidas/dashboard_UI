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

function Main(props) {

    return (
        <>
            <div>
                {/*<ul>*/}
                {/*    <li>*/}
                {/*        <Link to="/">Home</Link>*/}
                {/*    </li>*/}
                {/*    <li>*/}
                {/*        <Link to="/about">About</Link>*/}
                {/*    </li>*/}
                {/*    <li>*/}
                {/*        <Link to="/topics">Topics</Link>*/}
                {/*    </li>*/}
                {/*    <li>*/}
                {/*        <Link to="/domains">Domains</Link>*/}
                {/*    </li>*/}
                {/*</ul>*/}

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
                            Boolean(props.domainList) &&
                            <DomainList
                                endpoint={props.endpoint}
                                callbackReFetchDomains={props.callbackReFetchDomains}
                                domainList={props.domainList}
                                hasDomainListError={props.hasDomainListError}
                                appendDomainList={props.appendDomainList}
                                changeDomainList={props.changeDomainList}
                            />
                        }
                    </Route>
                    <Route path="/">
                        <StickerList
                            endpoint={props.endpoint}
                            callbackReFetchDomains={props.callbackReFetchDomains}
                            domainList={props.domainList}
                            hasDomainListError={props.hasDomainListError}
                        />
                    </Route>
                </Switch>
            </div>
        </>
    );
}

function StickerList(props) {
    return (
        <>
            {console.log("checkina")}
            {
                Boolean(props.domainList) === true &&
                props.domainList.map((item) => {
                    return (
                        <SingleService
                            item={item}
                            endpoint={props.endpoint}
                        />
                    )
                })
            }

        </>
    )
}

function SingleService(props) {
    const [domainPing, setDomainPing] = useState();
    const [domainPingError, setDomainPingError] = useState();

    useEffect(() => {
        if (props.item.deleted === false) {
            pingDomain(props.item, props.type);
        }
    }, []);

    async function pingDomain(d, type) {
        const res = await fetch(props.endpoint + "api/ping/domain/" + d.id);
        res
            .json()
            .then(res => setDomainPing(res))
            .then(res => console.log(res))
            .then(res => setDomainPingError())
            .catch(err => setDomainPingError(err));
    }


    return (
        <>

            {
                props.item.deleted === false && props.item.active === true &&
                <div className={
                    (domainPing === undefined && "waitingStyle ") +
                    (domainPing !== undefined && "successStyle ") +
                    (domainPing !== undefined && Object.entries(domainPing) === 0 && "failStyle")
                }
                >
                    <h3 className="cl-h3">Service name: {props.item.service_Name}</h3>
                    <p className="cl-copy-14">
                        Response time:
                        {
                            domainPing &&
                            <>
                                {domainPing.latencyMS}
                                {console.log("domainpingerror: ", domainPingError)}
                            </>

                        }
                    </p>
                    <p className="cl-copy-14">Last Failure: {props.item.last_Fail}</p>
                    <p className="cl-copy-14">Next Check in: {props.item.interval_Ms} </p>
                </div>
            }
        </>
    )

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