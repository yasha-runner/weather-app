import { ICity, ICityState, ICityAction, SET_CITIES, SET_CURRENT_CITY } from "../types";

const initialState: ICityState = {
    currentCity: '',
    cities: ''
}

export default (state = initialState, action: ICityAction): ICityState => {
    switch(action.type) {
        case SET_CURRENT_CITY:
            return {
                ...state,
                currentCity: action.payload
            }
        case SET_CITIES: {
            return {
                ...state,
                cities: action.payload
            }
        }
        default:
            return state;
    }
}