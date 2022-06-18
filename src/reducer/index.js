import { DELETE_DATA, FETCH_DATA } from "../action";
import * as _ from "lodash"

const initialState = {
    data: [],
};

const listReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case FETCH_DATA: {
            return {
                ...state,
                data: _.concat(...state.data, payload),
            };
        }
        case DELETE_DATA: {
            return {
                ...state,
                data: _.filter(state.data, (item) => item.id !== payload)
            };
        }
        default:
            return { ...state };
    }
};
export default listReducer;
