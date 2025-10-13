/* Helpers. */
import axiosInstance from "../Helpers/axiosConfigurations";
import {
    GET_USER_DETAILS_START,
    GET_USER_DETAILS_SUCCESS,
    GET_USER_DETAILS_ERROR
} from "../Constants/auth";

export const manageUsers = ({ email, password, name, DOB, phoneNumber }) => {
    return async (dispatch) => {
        try {

            dispatch({ type: GET_USER_DETAILS_START });
            
            const response = await axiosInstance.post('api/v1/manageUsers', { email, password, name, DOB, phoneNumber });
            console.log(response, 'responseresponseresponseresponseresponse')
            
        } catch (error) {
            const { response } = error;
            dispatch({ type: GET_USER_DETAILS_ERROR });
            return '';
        };
    }
};