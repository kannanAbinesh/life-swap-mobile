/* Helpers. */
import axiosInstance from "../Helpers/axiosConfigurations";
import { setAsyncStorageData } from '../Helpers/asyncStoragHelper';
import {
    GET_USER_DETAILS_START,
    GET_USER_DETAILS_SUCCESS,
    GET_USER_DETAILS_ERROR
} from "../Constants/auth";

export const editProfile = (value) => {
    return async (dispatch) => {
        try {
            console.log(value, 'valuevaluevaluevalue in action');

            dispatch({ type: GET_USER_DETAILS_START });
            const { data } = await axiosInstance.put('auth/editProfile', value);

            if (Number(data?.status) === 200) {
                await setAsyncStorageData({ key: 'id_token', value: data?.token });
                dispatch({ type: GET_USER_DETAILS_SUCCESS, payload: data?.userDetails });
                
                // Return success
                return { success: true, data: data?.userDetails };
            } else {
                dispatch({ type: GET_USER_DETAILS_ERROR });
                return { success: false, message: 'Update failed' };
            }

        } catch (error) {
            const { response } = error;
            dispatch({ type: GET_USER_DETAILS_ERROR });
            console.error('Edit profile error:', error);
            return { success: false, message: response?.data?.message || 'Something went wrong' };
        }
    };
};