/* Plugins. */
import AsyncStorage from "@react-native-async-storage/async-storage";

/* Helpers. */
import axiosInstance from '../Helpers/axiosConfigurations';
import {
    LOGOUT_START,
    LOGOUT_SUCCESS,
    LOGOUT_ERROR
} from '../Constants/auth';

export const logout = (router) => {
    return async (dispatch) => {
        try {

            dispatch({ type: LOGOUT_START });
            const { data } = await axiosInstance.put('/auth/logout');

            if (Number(data?.status) === 200) {
                await AsyncStorage.removeItem("id_token");
                router.replace("/(auth)/login");
                dispatch({ type: LOGOUT_SUCCESS });
                return '';
            };

        } catch (error) {
            const { response } = error;
            dispatch({ type: LOGOUT_ERROR, error: response?.error });
            return '';
        };
    };
};