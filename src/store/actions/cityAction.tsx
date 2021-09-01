import { ICityAction, SET_CITY } from "../types";

export const setCity = (name: string): ICityAction => {
    return {
        type: SET_CITY,
        payload: name
    }
}