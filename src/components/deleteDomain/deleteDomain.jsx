import React, {useState} from 'react';
import './deleteDomain.scss';
import Modal from 'react-bootstrap/Modal'
import { NotificationManager } from 'react-notifications';

function DeleteDomain(props) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    async function fetchPutDelete() {
        const response = await props.fetches.fetchPut(props.endpoint + 'domain/del/' + props.domain.id);
        return response.status;
    }

    function deleteDomain() {
        fetchPutDelete().then((statusCode) => {
            if (statusCode === 200) {
                let dataForSending = {...props.domain};
                dataForSending.deleted = true;
                props.changeDomainList(dataForSending);
                NotificationManager.success('Domain deleted!', 'Successful!', 3000);
            } else {
                NotificationManager.error('Domain delete failed!', 'Error!', 3000);
            }
        }).catch(() => {
            NotificationManager.error('Domain delete failed!', 'Error!', 3000);
        });
    }

    return (
        <>
            <button type="button" onClick={handleShow}>
                Delete
            </button>
            <Modal show={show} onHide={handleClose}>
                <div className="forma">
                    <form>
                        <h3> Are you sure you want to delete this domain? </h3>
                        <button type="button" onClick={deleteDomain}>Yes</button>
                        <button type="button" onClick={handleClose}>Cancel</button>
                    </form>
                </div>
            </Modal>
        </>
    )

}

export default DeleteDomain;