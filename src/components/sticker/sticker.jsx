import React, {useEffect, useState} from "react";
import "./sticker.scss";
import Card from 'react-bootstrap/Card';
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import {useSelector} from "react-redux";
import StickerLogsModal from "../stikerLogsModal/stickerLogsModal";

function Sticker(props) {
    function getClassNameFromStatus() {
        if (props.domainPing.status >= 200 && props.domainPing.status <= 299) {
            if (props.domainPing.requestTime > props.domainLatency.latency_Threshold_Ms)
                return "tile-amber";
            else return "tile-success";
        } else
            return "tile-fail";
    }


    // log stuff

    const [isLogsVisible, setIsLogsVisible] = useState(false);

    return (
        
        <div>
            <Card className="cardMargin" border="secondary" style={{width: '18rem', height: '19rem'}}>
                <Card.Header
                    className={
                        "text-truncate cl-h3 text-center Card " + getClassNameFromStatus()
                    }
                >
                    {props.item.service_Name}
                </Card.Header>
                <Card.Body>
                    
                        <div className="tooltip-wrap text-left">
                            <p className="text-truncate cl-copy-14 FixedSize text-left" data-toggle="tooltip"
                               data-placement="top" title={props.domainPing.domainUrl}>
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
                            <p className="text-truncate cl-copy-14 text-left" data-toggle="tooltip" data-placement="top"
                               title={props.domainPing.requestTime + ' ms'}>

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
                        <hr/>
                        {
                            Boolean(props.logs) === true &&
                            <StickerLogsModal
                                logs={props.logs}
                                item={props.item}
                            />
                        }

                    
                </Card.Body>
            </Card>
        </div>
        
    );

}


export default Sticker;
