import { ICityState, ICityAction, SET_CITY } from "../types";

const initialState: ICityState = {
    name: ''
}

export default (state = initialState, action: ICityAction): ICityState => {
    switch(action.type) {
        case SET_CITY:
            return {
                name: action.payload
            }
        default:
            return state;
    }
}