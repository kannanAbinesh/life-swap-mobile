/* Helpers. */
import axiosInstance from "../Helpers/axiosConfigurations";
import {
    MANAGE_HABITS_START,
    MANAGE_HABITS_SUCCESS,
    MANAGE_HABITS_ERROR
} from "../Constants/habits";
import { getHabits } from "./getHabits";
import { closeModal } from "./modal";

export const manageYourHabits = (values) => {
    return async (dispatch) => {
        try {
            dispatch({ type: MANAGE_HABITS_START });

            const formData = new FormData();
            
            // Add basic fields
            formData.append('habitName', values.habitName);
            formData.append('description', values.description);
            formData.append('timeDuration', values.timeDuration);
            formData.append('lifeStyle', values.lifeStyle);
            formData.append('thumbnail', values.thumbnail);
            formData.append('type', 'habits');

            // If editing, add the ID
            if (values._id) {
                formData.append('_id', values._id);
            }

            // Separate existing and new images
            const existingImages = values.images.filter(img => img.isExisting);
            const newImages = values.images.filter(img => img.isNew);

            // Add existing images (just send their filenames/references)
            existingImages.forEach((img, index) => {
                formData.append('existingImages[]', img.image);
            });

            // Add new images for upload
            newImages.forEach((img, index) => {
                formData.append('files', {
                    uri: img.uri,
                    name: img.name,
                    type: img.type,
                });
            });

            const { data } = await axiosInstance.post(
                'habits/manageHabits',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            if (Number(data?.status) === 200) {
                dispatch({ type: MANAGE_HABITS_SUCCESS, payload: data });
                dispatch(getHabits({ type: 'myhabit' }))
                dispatch(closeModal());
                return '';
            } else {
                dispatch({ type: MANAGE_HABITS_ERROR });
                throw new Error(data?.message || 'Failed to save habit');
            }

        } catch (error) {
            dispatch({ type: MANAGE_HABITS_ERROR });
            throw error;
        }
    };
};