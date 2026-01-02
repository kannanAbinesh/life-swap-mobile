/* Helpers */
import axiosInstance from "../Helpers/axiosConfigurations";
import { getAsyncStorageData } from "../Helpers/asyncStoragHelper";

/* Constants */
import { GET_USER_DETAILS_START, GET_USER_DETAILS_SUCCESS, GET_USER_DETAILS_ERROR } from "../Constants/auth";

export const initialVerification = () => {
    return async (dispatch) => {
        dispatch({ type: GET_USER_DETAILS_START });

        try {
            const token = await getAsyncStorageData("id_token");

            if (!token) {
                dispatch({ type: GET_USER_DETAILS_ERROR, payload: { status: 401, message: "Authentication token not found" } });
                return;
            };

            const response = await axiosInstance.get("auth/initialVerification");
            const { data } = response;

            if (Number(data?.status) === 200) {
                dispatch({ type: GET_USER_DETAILS_SUCCESS, payload: data?.data ?? null });
                return;
            };

        } catch (error) {
            const response = error?.response;
            dispatch({ type: GET_USER_DETAILS_ERROR, payload: { error: response?.error } });
            return "";
        }
    };
};
