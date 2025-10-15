/* Plugins. */
import * as Yup from "yup"; 

export const validate = Yup.object().shape({
    habitName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Habit name is required'),

    description: Yup.string()
        .min(10, 'Description too short!')
        .required('Description is required'),

    timeDuration: Yup.string()
        .required('Time duration is required'),

    lifestyle: Yup.string()
        .required('Please select a lifestyle'),

    images: Yup.array()
        .min(1, 'Add at least one image')
});