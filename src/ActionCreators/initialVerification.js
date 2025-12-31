/* Helpers */
import axiosInstance from "../Helpers/axiosConfigurations";
import { getAsyncStorageData } from "../Helpers/asyncStoragHelper";

/* Constants */
import {
    GET_USER_DETAILS_START,
    GET_USER_DETAILS_SUCCESS,
    GET_USER_DETAILS_ERROR,
} from "../Constants/auth";

export const initialVerification = () => {
    return async (dispatch) => {
        dispatch({ type: GET_USER_DETAILS_START });

        try {
            // 1️⃣ Get token from AsyncStorage
            const token = await getAsyncStorageData("id_token");

            if (!token) {
                dispatch({
                    type: GET_USER_DETAILS_ERROR,
                    payload: {
                        status: 401,
                        message: "Authentication token not found",
                    },
                });
                return;
            }

            // 2️⃣ API call
            const response = await axiosInstance.get(
                "auth/initialVerification"
            );

            const { data } = response;


            // 3️⃣ API-level success
            if (Number(data?.status) === 200) {
                dispatch({
                    type: GET_USER_DETAILS_SUCCESS,
                    payload: data?.data ?? null,
                });
                return;
            }

            // 4️⃣ API-level failure (200 HTTP but logical failure)
            dispatch({
                type: GET_USER_DETAILS_ERROR,
                payload: {
                    status: data?.status ?? null,
                    message: data?.message ?? "Initial verification failed",
                    data: data ?? null,
                },
            });
        } catch (error) {
            // 5️⃣ Network / server / 4xx / 5xx errors
            const response = error?.response;

            dispatch({
                type: GET_USER_DETAILS_ERROR,
                payload: {
                    status: response?.status ?? null,
                    message:
                        response?.data?.message ??
                        error?.message ??
                        "Unable to connect to server",
                    data: response?.data ?? null,
                },
            });
        }
    };
};
