import React, { useCallback } from "react"
import { useSelector, useDispatch } from "react-redux"
import * as _ from "lodash"
import { TiDeleteOutline } from "react-icons/ti"
import { DELETE_DATA } from "../../action"

const List = () => {
    const listData = useSelector((state) => state.data)
    const dispatch = useDispatch();

    const deleteListData = useCallback((id) => {
        dispatch({ type: DELETE_DATA, payload: id })
    }, [])
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
                                    <div className="list-icon" onClick={() => deleteListData(data.id)}>
                                        <TiDeleteOutline size={25} />
                                    </div>
                                </div>
                            )
                        })
                }
            </div>
        </div>
    )
}

export default List;