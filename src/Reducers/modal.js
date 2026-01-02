/* Helpers. */
import { initalState } from "../config";
import { COMMON_MODAL_OPEN_SUCCESS, COMMON_MODAL_CLOSE_SUCCESS } from "../Constants/settings";

export const modal = (state = initalState, action) => {
    switch (action.type) {
        case COMMON_MODAL_OPEN_SUCCESS:
            return { ...state, isOpen: true, loader: false, ...action?.payload ?? {} };
        case COMMON_MODAL_CLOSE_SUCCESS:
            return { isOpen: false, loader: false };
        default:
            return state;
    };
};