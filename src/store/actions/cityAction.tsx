import { ICityAction, SET_CURRENT_CITY, SET_CITIES, ICurrentCity } from "../types";

export const setCurrentCity = (city: ICurrentCity): ICityAction => {
    return {
        type: SET_CURRENT_CITY,
        payload: city
    }
}

export const setCities = (cities: string): ICityAction => {
    return {
        type: SET_CITIES,
        payload: cities
    }
}