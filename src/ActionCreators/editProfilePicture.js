/* Helpers. */
import axiosInstance from "../Helpers/axiosConfigurations";
import {
    MANAGE_PROFILE_PICTURE_START,
    MANAGE_PROFILE_PICTURE_SUCCESS,
    MANAGE_PROFILE_PICTURE_ERROR
} from "../Constants/auth";

export const editProfilePicture = (formData) => {
    return async (dispatch) => {
        try {
            dispatch({ type: MANAGE_PROFILE_PICTURE_START });

            const { data } = await axiosInstance.post('auth/editProfilePicture', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Response from API:', data);

            if (Number(data?.status) === 200) {
                dispatch({
                    type: MANAGE_PROFILE_PICTURE_SUCCESS,
                    payload: data?.userDetails,
                });
                
                return {
                    success: true,
                    message: data?.message || 'Profile picture updated successfully',
                    imageUrl: data?.imageUrl // ✅ Return image URL
                };
            } else {
                dispatch({ type: MANAGE_PROFILE_PICTURE_ERROR });
                return {
                    success: false,
                    message: data?.message || 'Failed to update profile picture'
                };
            }
        } catch (error) {
            console.error('Error uploading profile picture:', error?.response || error);
            dispatch({ type: MANAGE_PROFILE_PICTURE_ERROR });
            
            return {
                success: false,
                message: error?.response?.data?.message || 'Something went wrong while uploading your profile picture.',
            };
        }
    };
};