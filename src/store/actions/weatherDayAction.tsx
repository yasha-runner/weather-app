import { ThunkAction } from "redux-thunk";
import { RootState } from "..";
import { API_KEY } from "../../constant";
import { SET_ERROR, SET_LOADING, IWeatherError, IWeatherDayAction, GET_WEATHER_DAY, IWeatherDayData } from "../types";

export const getWeatherDay = (city: string): ThunkAction<void, RootState, null, IWeatherDayAction> => {
    return async dispatch => {
        try {
            const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`);
            
            if(!res.ok) {
                const resData: IWeatherError = await res.json();
                throw new Error(resData.message);
            }

            const resData: IWeatherDayData = await res.json();
            dispatch({
                type: GET_WEATHER_DAY,
                payload: resData
            });
        } catch(err: any) {
            dispatch({
                type: SET_ERROR,
                payload: err.message
            });
        }
    }
}

export const setLoading = (): IWeatherDayAction => {
    return {
        type: SET_LOADING
    }
}

export const setError = (): IWeatherDayAction => {
    return {
        type: SET_ERROR,
        payload: ''
    }
}