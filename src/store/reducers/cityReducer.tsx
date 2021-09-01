import { ICityState, ICityAction, SET_CITY } from "../types";

const initialState: ICityState = {
    city: ''
}

export default (state = initialState, action: ICityAction): ICityState => {
    switch(action.type) {
        case SET_CITY:
            return {
                city: action.payload
            }
        default:
            return state;
    }
}