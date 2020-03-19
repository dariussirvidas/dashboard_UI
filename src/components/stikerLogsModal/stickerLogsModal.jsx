import React, {useState} from 'react';
import {useSelector} from "react-redux";
import Modal from "react-bootstrap/Modal";
import './stickerLogsModal.scss';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function StickerLogsModal(props) {
    return (
        <div>
            <StickerModal
                logs={props.logs}
                item={props.item}
            />
        </div>
    );
}

function StickerModal(props) {


    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
    };
    const handleShow = () => setShow(true);

    return (
        <>
            <a href="#" className="hlink" onClick={handleShow}>Logs</a>
            <Modal size="md" show={show} onHide={handleClose}>
                <div className="forma">
                        {
                            props.logs.status === 404 ?
                                (
                                    <>
                                        <h1>NO LOGS TO SHOW</h1>
                                    </>
                                )
                                :
                                (
                                    <>
                                        {
                                            props.logs.slice(0, 9).map((item) => {
                                                return <SingleLog
                                                    log={item}
                                                />
                                            })
                                        }
                                    </>
                                )
                        }
                        <button onClick={handleClose}>Close</button>
                </div>
            </Modal>
        </>
    );
}


function SingleLog(props) {
    return (
        <Row className="show-grid">
            <Col xs={3} md={3}>{props.log.log_Date.slice(0, 10)} </Col>
            <Col xs={3} md={3} className="float-left d-flex">{props.log.log_Date.slice(11, 16)} </Col>
            <Col xs={5} md={5} className="float-left d-flex"> Error Code: {props.log.error_Text} </Col>
        </Row>
    )
}

export default StickerLogsModal;