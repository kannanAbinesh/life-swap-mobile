/* Plugins. */

/* Helpers. */
import axiosInstance from "../Helpers/axiosConfigurations";
import {
    CHANGE_PASSWORD_START,
    CHANGE_PASSWORD_SUCCESS,
    CHANGE_PASSWORD_ERROR
} from "../Constants/auth";

export const changePassword = ({ currentPassword, newPassword }, reset) => {
    return async (dispatch) => {
        try {

            dispatch({ type: CHANGE_PASSWORD_START });
            const { data } = await axiosInstance.post('/auth/changePassword', { currentPassword, newPassword });

            if (Number(data?.status) === 200) {
                dispatch({ type: CHANGE_PASSWORD_SUCCESS });
                return '';
            };

        } catch (error) {
            const { response } = error;
            dispatch({ type: CHANGE_PASSWORD_ERROR });
            return '';
        };
    };
};