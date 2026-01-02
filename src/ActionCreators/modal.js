/* Helpers. */
import {
    COMMON_MODAL_OPEN_START,
    COMMON_MODAL_OPEN_SUCCESS,
    COMMON_MODAL_OPEN_ERROR,
    COMMON_MODAL_CLOSE_START,
    COMMON_MODAL_CLOSE_SUCCESS,
    COMMON_MODAL_CLOSE_ERROR
} from "../Constants/settings";

/* Open modal */
export const openModal = (value) => {
    return async (dispatch) => {
        try {
            console.log('pppppppppp')
            dispatch({ type: COMMON_MODAL_OPEN_START });
            dispatch({ type: COMMON_MODAL_OPEN_SUCCESS, payload: value });
        } catch (error) {
            dispatch({ type: COMMON_MODAL_OPEN_ERROR });
            return '';
        };
    }
};

/* Close modal */
export const closeModal = () => {
    return async (dispatch) => {
        try {
            console.log('pppppppppp111111111')
            dispatch({ type: COMMON_MODAL_CLOSE_START });
            dispatch({ type: COMMON_MODAL_CLOSE_SUCCESS });
        } catch (error) {
            dispatch({ type: COMMON_MODAL_CLOSE_ERROR });
            return '';
        };
    }
};