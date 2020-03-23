import React from "react";
import "./sticker.scss";
import Card from 'react-bootstrap/Card';
import StickerLogsModal from "../stikerLogsModal/stickerLogsModal";

function Sticker(props) {
    function getClassNameFromStatus() {
        if (props.domainPing.status >= 200 && props.domainPing.status <= 299) {
            if (props.domainPing.requestTime > props.item.latency_Threshold_Ms)
                return "tile-amber";
            else return "tile-success";
        } else
            return "tile-fail";
    }

    return (
        <div>
            <Card className="cardMargin" border="secondary" style={{width: '18rem', height: '20rem'}}>
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
                            <p className="text-truncate cl-copy-14 FixedSize text-left" data-toggle="tooltip"
                               data-placement="top" title={props.item.url}>
                                {
                                    props.item.url
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

                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );

}

export default Sticker;
