/* Helpers. */
import axiosInstance from "../Helpers/axiosConfigurations";
import {
    MANAGE_HABITS_START,
    MANAGE_HABITS_SUCCESS,
    MANAGE_HABITS_ERROR
} from "../Constants/habits";

export const manageYourHabits = (values) => {
    return async (dispatch) => {
        try {
            dispatch({ type: MANAGE_HABITS_START });

            const formData = new FormData();
            formData.append('habitName', values.habitName);
            formData.append('description', values.description);
            formData.append('timeDuration', values.timeDuration);
            formData.append('lifestyle', values.lifestyle);

            // Append multiple images one by one
            values.images.forEach((image, index) => {
                if (image?.uri) {
                    const uri = image.uri;
                    const name = uri.split('/').pop();
                    const match = /\.(\w+)$/.exec(name);
                    const type = match ? `image/${match[1]}` : 'image/jpeg';

                    formData.append('files', {
                        uri,
                        name,
                        type,
                    });
                }
            });
            console.log(formData, 'formDataformDataformDataformData')

            const { data } = await axiosInstance.post(
                'habits/manageHabits',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            console.log(data)

            if (Number(data?.status) === 200) {
                dispatch({ type: MANAGE_HABITS_SUCCESS, payload: data });
                return data;
            } else {
                dispatch({ type: MANAGE_HABITS_ERROR });
                throw new Error('Failed to save habit');
            }

        } catch (error) {
            console.log('Manage Habits Error:', error?.response || error);
            dispatch({ type: MANAGE_HABITS_ERROR });
            throw error;
        }
    };
};
