/* Plugins. */
import Toast from 'react-native-toast-message';

/* Helpers. */
import axiosInstance from '../Helpers/axiosConfigurations';
import { setAsyncStorageData } from '../Helpers/asyncStoragHelper';
import {
    GET_USER_DETAILS_START,
    GET_USER_DETAILS_SUCCESS,
    GET_USER_DETAILS_ERROR
} from "../Constants/auth";

export const login = (values, router) => {
    return async (dispatch) => {
        try {

            dispatch({ type: GET_USER_DETAILS_START });
            const { data } = await axiosInstance.post('auth/login', values);
            console.log(data)
            
            if (Number(data?.status) === 200) {
                setAsyncStorageData({ key: 'id_token', value: data?.token });
                dispatch({ type: GET_USER_DETAILS_SUCCESS, payload: data?.userDetails });
                router.push("/(tabs)/home")
                return '';
            };

        } catch (error) {
            const { response } = error;
            console.log(response)
            Toast.show({ type: 'error', text1: response?.data?.message });
            dispatch({ type: GET_USER_DETAILS_ERROR, payload: response?.data });
            return '';
        };
    };
};