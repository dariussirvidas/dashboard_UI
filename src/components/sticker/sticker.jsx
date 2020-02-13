import React from "react";
import "./sticker.scss";
import Card from 'react-bootstrap/Card';
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";

function Sticker(props) {

    function getClassNameFromStatus() { //class name grazina, pagal status
        if(props.domainPing.status === 200){
            return "tile-success"
        }
        return "tile-fail"
    }
    return (
        <div>
            <Card className="cardMargin" border="secondary" style={{ width: '18rem', height: '16rem'}}>
                <Card.Header
                    className={

                        "cl-h3 text-center Card " + getClassNameFromStatus()
                    }
                >
                        {props.item.service_Name}
                </Card.Header>
                <Card.Body >
                    <Card.Text>
                        <p className="cl-copy-14 FixedSize text-left">

                            {
                                props.domainPing.domainUrl
                            }
                        </p>
                        <hr/>
                        <p className="cl-copy-14 text-left">
                            Status: &nbsp;
                            {
                                props.domainPing &&
                                <>
                                    {props.domainPing.status}
                                </>
                            }
                        </p>
                        <hr/>
                        <p className="cl-copy-14 text-left">
                            Response time: &nbsp;
                            {
                                props.domainPing &&
                                <>
                                    {props.domainPing.requestTime}
                                </>
                            }
                        </p>
                        <hr/>
                        <p className="cl-copy-14 text-left">Last
                            Failure: {props.item.last_Fail.slice(0, 10)} {props.item.last_Fail.slice(11, 16)}</p>
                        <hr/>
                        <p className="cl-copy-14 text-left">Next Check in: {props.checkIn} </p>
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );

}

export default Sticker;
