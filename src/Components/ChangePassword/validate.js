/* Plugins. */
import * as Yup from 'yup';

export const validate = Yup.object().shape({
    currentPassword: Yup.string()
        .required('Current password is required')
        .min(8, 'Password must be at least 8 characters'),
    newPassword: Yup.string()
        .required('New password is required')
        .min(8, 'Password must be at least 8 characters')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
            'Password must contain uppercase, lowercase, number and special character'
        ),
    confirmPassword: Yup.string()
        .required('Please confirm your password')
        .oneOf([Yup.ref('newPassword')], 'Passwords must match'),
});