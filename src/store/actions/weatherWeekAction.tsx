import { ThunkAction } from "redux-thunk";
import { RootState } from "..";
import { SET_ERROR, SET_LOADING, IWeatherError, GET_WEATHER_WEEK, IWeatherWeekData, IWeatherWeekAction, ICurrentCity } from "../types";

export const getWeatherWeek = (city: ICurrentCity): ThunkAction<void, RootState, null, IWeatherWeekAction> => {
    return async dispatch => {
        try {
            const res = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${city.coord.lat}&lon=${city.coord.lon}&exclude=current,minutely,hourly,alerts&appid=${process.env.REACT_APP_WEATHER_API_KEY}`);
            
            if(!res.ok) {
                const resData: IWeatherError = await res.json();
                throw new Error(resData.message);
            }

            const resData: IWeatherWeekData = await res.json();
            dispatch({
                type: GET_WEATHER_WEEK,
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

export const setLoading = (): IWeatherWeekAction => {
    return {
        type: SET_LOADING
    }
}

export const setError = (): IWeatherWeekAction => {
    return {
        type: SET_ERROR,
        payload: ''
    }
}