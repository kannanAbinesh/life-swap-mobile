/* Helpers. */
import axiosInstance from "../Helpers/axiosConfigurations";
import {
    GET_USER_DETAILS_START,
    GET_USER_DETAILS_SUCCESS,
    GET_USER_DETAILS_ERROR
} from "../Constants/auth";
import { getAsyncStorageData } from "../Helpers/asyncStoragHelper";

export const initialVerification = () => {
    return async (dispatch) => {
        try {

            dispatch({ type: GET_USER_DETAILS_START });

            let token = await getAsyncStorageData('id_token');
            if (!token) {
                dispatch({ type: GET_USER_DETAILS_ERROR, payload: 'No token found' });
                return;
            };

            const response = await axiosInstance.get('auth/initialVerification');

        } catch (error) {
            const { response } = error;
            console.log(response, 'responseresponseresponseresponseresponse')
            dispatch({ type: GET_USER_DETAILS_ERROR });
            return '';
        };
    }
};