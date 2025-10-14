/* Plugins. */
import * as Yup from 'yup';

export const validate = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Name must be at least 2 characters')
        .max(50, 'Name must be less than 50 characters')
        .required('Name is required'),
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    phone: Yup.string()
        .matches(/^[+]?[\d\s()-]+$/, 'Invalid phone number')
        .min(10, 'Phone number must be at least 10 digits')
        .required('Phone number is required'),
    dob: Yup.string()
        .matches(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format')
        .required('Date of birth is required')
});