import React, {useState} from 'react';
import {useSelector} from "react-redux";
import Modal from "react-bootstrap/Modal";
import './stickerLogsModal.scss';

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
            <Modal show={show} onHide={handleClose}>
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
console.log(JSON.stringify(props.logs));
    return (
        <div>
            <p>{props.log.log_Date}, {props.log.error_Text}</p>
        </div>
    )
}

export default StickerLogsModal;