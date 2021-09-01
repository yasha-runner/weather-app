import { ICityAction, SET_CITY } from "../types";

export const setCity = (city: string): ICityAction => {
    return {
        type: SET_CITY,
        payload: city
    }
}