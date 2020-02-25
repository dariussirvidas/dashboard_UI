import React from "react";
import Style from "./sticker.scss";
import Card from 'react-bootstrap/Card';
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";

function Sticker(props) {
    function getClassNameFromStatus() { //class name grazina, pagal status
        if ( props.domainPing.requestTime > props.domainLatency.latency_Threshold_Ms )
            return "tile-amber";
        else if (props.domainPing.status >= 200 && props.domainPing.status <= 299)

            return "tile-success";

        else if (props.domainPing.status >= 400 && props.domainPing.status <= 499)
            return "tile-fail";
        else
            return "tile-unclear"
    }

    return (
        <div>
            <Card className="cardMargin" border="secondary" style={{width: '18rem', height: '16rem'}}>
                <Card.Header
                    className={

                        "text-truncate cl-h3 text-center Card " + getClassNameFromStatus()
                    }
                >
                    {props.item.service_Name}
                </Card.Header>
                <Card.Body>
                    <Card.Text>
                        <div className="tooltip-wrap text-left">
                            <p className="text-truncate cl-copy-14 FixedSize text-left" data-toggle="tooltip" data-placement="top" title={props.domainPing.domainUrl}>

                                {
                                    props.domainPing.domainUrl
                                }
                            </p>
                        </div>
                        <hr/>
                        <p className="text-truncate cl-copy-14 text-left">
                            Status: &nbsp;
                            {
                                props.domainPing &&
                                <>
                                    {props.domainPing.status}
                                </>
                            }
                        </p>
                        <hr/>
                        <div className="tooltip-wrap text-left">
                            <p className="text-truncate cl-copy-14 text-left" data-toggle="tooltip" data-placement="top" title={props.domainPing.requestTime + ' ms'}>

                                Response time: &nbsp;
                                {
                                    props.domainPing.requestTime &&
                                    <>
                                        {props.domainPing.requestTime + ' ms'}
                                    </>
                                }
                            </p>
                        </div>

                        <hr/>
                        <p className="text-truncate cl-copy-14 text-left">Last Failure: &nbsp;
                            {
                                props.item.last_Fail.slice(0, 10) !== '0001-01-01' &&
                                props.item.last_Fail.slice(0, 10) + " " + props.item.last_Fail.slice(11, 16)
                            }
                        </p>
                        <hr/>
                        <p className="text-truncate cl-copy-14 text-left">Next Check in: {props.checkIn / 1000} s</p>
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );

}

export default Sticker;
