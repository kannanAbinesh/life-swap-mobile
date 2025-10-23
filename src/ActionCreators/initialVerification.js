/* Helpers. */
import axiosInstance from "../Helpers/axiosConfigurations";
import { getAsyncStorageData, removeAsyncStorageData } from "../Helpers/asyncStoragHelper";
import {
    GET_USER_DETAILS_START,
    GET_USER_DETAILS_SUCCESS,
    GET_USER_DETAILS_ERROR
} from "../Constants/auth";

export const initialVerification = () => {
    return async (dispatch) => {
        try {

            dispatch({ type: GET_USER_DETAILS_START });

            let token = await getAsyncStorageData('id_token');
            if (!token) {
                dispatch({ type: GET_USER_DETAILS_ERROR, payload: 'No token found' });
                return;
            };

            const { data } = await axiosInstance.get('auth/initialVerification');

            if (Number(data?.status) === 200) {
                dispatch({ type: GET_USER_DETAILS_SUCCESS, payload: data?.data });
                return '';
            };

        } catch (error) {
            const { response } = error;
            dispatch({ type: GET_USER_DETAILS_ERROR, payload: response });
            return '';
        };
    }
};