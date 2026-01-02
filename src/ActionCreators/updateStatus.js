/* Helpers. */
import axiosInstance from "../Helpers/axiosConfigurations";
import { GET_USER_DETAILS_SUCCESS } from "../Constants/auth";

export const updateStatus = (type, status) => {
    return async (dispatch) => {
        try {

            const { data } = await axiosInstance.put('auth/updateStatus', { type, status });

            if (Number(data?.status) === 200 && type === 'notificationStatus') {
                dispatch({ type: GET_USER_DETAILS_SUCCESS, payload: data?.data });
                return '';
            };

        } catch (error) {
            return '';
        };
    }
};