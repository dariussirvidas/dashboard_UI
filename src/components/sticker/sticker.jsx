import React from "react";
import "./sticker.scss";
import Card from 'react-bootstrap/Card';

function Sticker(props) {

    function getClassNameFromStatus() { //class name grazina, pagal status
        if(props.domainPing.status === 200){
            return "tile-success"
        }
        return "tile-fail"
    }
    return (
        <div>
            <Card className="cardMargin" border="secondary" style={{width: '18rem'}}>
                <Card.Header
                    className={

                        "cl-h3 text-center Card " + getClassNameFromStatus()
                    }
                >
                        {props.item.service_Name}
                </Card.Header>
                <Card.Body>
                    <Card.Text>
                        <p>
                            Url:
                            {
                                props.domainPing.domainUrl
                            }
                        </p>
                        <p className="cl-copy-14 text-center">
                            Status:
                            {
                                props.domainPing &&
                                <div>
                                    {props.domainPing.status}
                                </div>
                            }
                        </p>
                        <p className="cl-copy-14 text-center">
                            Response time:
                            {
                                props.domainPing &&
                                <div>
                                    {props.domainPing.requestTime}
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
