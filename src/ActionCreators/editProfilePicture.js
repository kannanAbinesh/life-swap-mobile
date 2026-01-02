/* Helpers. */
import axiosInstance from "../Helpers/axiosConfigurations";
import { GET_USER_DETAILS_START, GET_USER_DETAILS_SUCCESS, GET_USER_DETAILS_ERROR } from "../Constants/auth";

export const editProfilePicture = (formData) => {
    return async (dispatch) => {
        try {
            dispatch({ type: GET_USER_DETAILS_START });

            const { data } = await axiosInstance.post('auth/editProfilePicture', formData, { headers: { 'Content-Type': 'multipart/form-data' } });

            if (Number(data?.status) === 200) {
                dispatch({ type: GET_USER_DETAILS_SUCCESS, payload: data?.data });
                return "";
            };

        } catch (error) {
            dispatch({ type: GET_USER_DETAILS_ERROR });
            return "";
        };
    };
};