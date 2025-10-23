/* Helpers */
import axiosInstance from "../Helpers/axiosConfigurations";
import { setAsyncStorageData } from "../Helpers/asyncStoragHelper";
import {
    GET_USER_DETAILS_START,
    GET_USER_DETAILS_SUCCESS,
    GET_USER_DETAILS_ERROR
} from "../Constants/auth";

import * as WebBrowser from "expo-web-browser";
import { startAsync, makeRedirectUri } from "expo-auth-session";
import { Platform } from "react-native";

WebBrowser.maybeCompleteAuthSession();

const androidClientId = "399528406385-8gqb57moqipa3m8jjqh2fre03nnkkt57.apps.googleusercontent.com";
const iosClientId = "YOUR_IOS_CLIENT_ID.apps.googleusercontent.com";

export const googleAuthentication = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: GET_USER_DETAILS_START });

            // Step 1: Launch Google Auth flow
            const redirectUri = makeRedirectUri({ useProxy: true });
            const clientId = Platform.OS === "ios" ? iosClientId : androidClientId;

            const response = await startAsync({
                authUrl:
                    `https://accounts.google.com/o/oauth2/v2/auth?` +
                    `client_id=${clientId}` +
                    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
                    `&response_type=id_token` +
                    `&scope=openid%20email%20profile`,
            });

            if (response.type !== "success") {
                dispatch({ type: GET_USER_DETAILS_ERROR });
                return;
            }

            const { id_token } = response.params;

            // Step 2: Send ID token to your backend for verification
            const { data } = await axiosInstance.post("auth/googleAuthentication", {
                token: id_token,
            });

            if (data?.token) {
                // Step 3: Save app token & user details
                await setAsyncStorageData({ key: "id_token", value: data.token });
                dispatch({ type: GET_USER_DETAILS_SUCCESS, payload: data.userDetails });
            } else {
                dispatch({ type: GET_USER_DETAILS_ERROR });
            }
        } catch (error) {
            console.error("Google Auth Error:", error);
            dispatch({ type: GET_USER_DETAILS_ERROR });
        }
    };
};