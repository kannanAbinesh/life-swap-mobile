/* Plugins */
import axiosInstance from "../Helpers/axiosConfigurations";
import {
    GET_HABITS_START,
    GET_HABITS_SUCCESS,
    GET_HABITS_ERROR
} from "../Constants/habits";

/* Action to fetch habits for logged-in user */
export const getHabits = ({ type, query = "" }) => {
    return async (dispatch) => {
        try {
            dispatch({ type: GET_HABITS_START });

            // Call the GET API
            const { data } = await axiosInstance.get(`habits/getHabits?type=${type}&query=${query}`);

            if (Number(data?.status) === 200) {
                dispatch({
                    type: GET_HABITS_SUCCESS,
                    payload: data // habits array with images
                });
                return data.data;
            } else {
                dispatch({ type: GET_HABITS_ERROR });
                return [];
            }

        } catch (error) {
            dispatch({ type: GET_HABITS_ERROR });
            return [];
        }
    };
};
