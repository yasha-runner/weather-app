import { SET_LOADING, SET_ERROR, IWeatherWeekState, IWeatherWeekAction, GET_WEATHER_WEEK } from "../types";

const initialState: IWeatherWeekState = {
    data: null,
    loading: false,
    error: ''
}

export default (state = initialState, action: IWeatherWeekAction): IWeatherWeekState => {
    switch(action.type) {
        case GET_WEATHER_WEEK:
            return {
                data: action.payload,
                loading: false,
                error: ''
            }
        case SET_LOADING:
            return {
                ...state,
                loading: true
            }
        case SET_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        default:
            return state;
        }
}