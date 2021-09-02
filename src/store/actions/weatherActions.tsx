import { ThunkAction } from "redux-thunk";
import { RootState } from "..";
import { API_KEY } from "../../constant";
import { GET_WEATHER, SET_ERROR, SET_LOADING, IWeatherAction, IWeatherData, IWeatherError } from "../types";

export const getWeather = (city: string): ThunkAction<void, RootState, null, IWeatherAction> => {
    return async dispatch => {
        try {
            const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
            
            if(!res.ok) {
                const resData: IWeatherError = await res.json();
                throw new Error(resData.message);
            }

            const resData: IWeatherData = await res.json();
            dispatch({
                type: GET_WEATHER,
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

export const setLoading = (): IWeatherAction => {
    return {
        type: SET_LOADING
    }
}

export const setError = (): IWeatherAction => {
    return {
        type: SET_ERROR,
        payload: ''
    }
}