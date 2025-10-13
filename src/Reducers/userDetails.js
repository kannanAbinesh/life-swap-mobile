/* Helpers. */
import { initalState } from "../config";
import {
    GET_USER_DETAILS_START,
    GET_USER_DETAILS_SUCCESS,
    GET_USER_DETAILS_ERROR
} from "../Constants/auth";

export const userDetails = (state = initalState, action) => {
    switch (action.type) {
        case GET_USER_DETAILS_START:
            return { ...state };
        case GET_USER_DETAILS_SUCCESS:
            return { ...state, loader: false, ...action.payload };
        case GET_USER_DETAILS_ERROR:
            return { ...state, loader: false, error: action.payload };
        default:
            return state;
    };
};