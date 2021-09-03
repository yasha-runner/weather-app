import { ICityAction, SET_CURRENT_CITY, SET_CITIES, ICity } from "../types";

export const setCurrentCity = (name: string): ICityAction => {
    return {
        type: SET_CURRENT_CITY,
        payload: name
    }
}

export const setCities = (cities: string): ICityAction => {
    return {
        type: SET_CITIES,
        payload: cities
    }
}