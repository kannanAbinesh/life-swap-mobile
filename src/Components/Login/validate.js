/* Plugins. */
import * as Yup from "yup";

export const validate = Yup.object().shape({
    email: Yup.string()
        .email("Invalid email address")
        .required("Required"),

    password: Yup.string()
        .required("Required")
        .test(
            'password-complexity',
            'Password must be at least 8 characters and include uppercase, lowercase, number, and special character.',
            (value) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value)
        )
});