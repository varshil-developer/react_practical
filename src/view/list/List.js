import React, { useCallback, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import * as _ from "lodash"
import { BsXLg } from "react-icons/bs"
import { DELETE_DATA } from "../../action"
import { Modal } from 'react-bootstrap';
import { Button } from "react-bootstrap"

const List = () => {
    const listData = useSelector((state) => state.data)
    const dispatch = useDispatch();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [dataId, setDataId] = useState('');

    const deleteListData = useCallback((id) => {
        dispatch({ type: DELETE_DATA, payload: id })
        setShowDeleteModal(false);
    }, [])

    const handleCloseDeleteModel = () => {
        setShowDeleteModal(false);
    };

    return (
        <div className="list_main">
            <div className="list-main-wrapper">
                {
                    _.isEmpty(listData) ?
                        <div className="list-text">No Data</div>
                        :
                        _.map(listData, (data, item) => {

                            return (
                                <div className="list-data-block" key={item}>
                                    <ul>
                                        <li>{data.listData}</li>
                                    </ul>
                                    <div className="list-icon" onClick={() => {
                                        setShowDeleteModal(true)
                                        setDataId(data.id)
                                    }}>
                                        <BsXLg size={15} />
                                    </div>
                                </div>
                            )
                        })
                }
            </div>
            {
                showDeleteModal &&
                <Modal show={showDeleteModal} centered onHide={handleCloseDeleteModel}>
                    <Modal.Header closeButton>
                        <Modal.Title>List</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Are you sure you want to Delete this?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleCloseDeleteModel}>
                            Close
                        </Button>
                        <Button variant="danger" onClick={() => deleteListData(dataId)}>
                            Delete
                        </Button>
                    </Modal.Footer>
                </Modal>
            }

        </div>
    )
}

export default List;