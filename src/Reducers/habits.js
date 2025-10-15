/* Helpers. */
import { initalState } from "../config";
import {
    GET_HABITS_START,
    GET_HABITS_SUCCESS,
    GET_HABITS_ERROR
} from "../Constants/habits";

export const habits = (state = initalState, action) => {
    switch (action.type) {
        case GET_HABITS_START:
            return { ...state };
        case GET_HABITS_SUCCESS:
            return { ...state, loader: false, ...action.payload };
        case GET_HABITS_ERROR:
            return { ...state, loader: false, error: action.payload };
        default:
            return state;
    };
};