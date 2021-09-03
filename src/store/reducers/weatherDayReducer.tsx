import { IWeatherDayState, IWeatherDayAction, GET_WEATHER_DAY, SET_LOADING, SET_ERROR } from "../types";

const initialState: IWeatherDayState = {
    data: null,
    loading: false,
    error: ''
}

export default (state = initialState, action: IWeatherDayAction): IWeatherDayState => {
    switch(action.type) {
        case GET_WEATHER_DAY:
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