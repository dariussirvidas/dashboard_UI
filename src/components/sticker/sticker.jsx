import React from "react";
import "./sticker.scss";
import Card from 'react-bootstrap/Card';

function Sticker(props) {

    return (
        <div>
            <Card className="cardMargin" border="secondary" style={{width: '18rem'}}>
                <Card.Header
                    className={
                        "tile-unclear cl-h3 text-center Card " +
                        (props.domainPing.status === "TimedOut" && "tile-fail ") + " " +
                        (props.domainPing.status === "Success" && "tile-success ") + " " +
                        ((props.domainPing.message !== undefined && "tile-fail "))
                    }>{props.item.service_Name}
                </Card.Header>
                <Card.Body>
                    <Card.Text>
                        <p className="cl-copy-14 text-center">
                            Response time:
                            {
                                props.domainPing &&
                                <div>
                                    {props.domainPing.latencyMS}
                                </div>
                            }
                        </p>
                        <p className="cl-copy-14 text-center">Last
                            Failure: {props.item.last_Fail.slice(0, 10)} {props.item.last_Fail.slice(11, 16)}</p>
                        <p className="cl-copy-14 text-center">Next Check in: {props.checkIn} </p>
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );

}

export default Sticker;
