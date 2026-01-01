/* Plugins. */
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import { useNavigation } from 'expo-router';

/* Helpers. */
import { changePassword } from '../../ActionCreators/changePassword';
import { validate } from './validate';
import { useTheme } from '../Theme/ThemeContext';

/* Styles. */
import { createStyles } from './changePasswordStyles';

function ChangePassword(props) {

    const { changePassword } = props; /* Props. */

    /* State declarations. */
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    /* Hooks. */
    const navigation = useNavigation();
    const { isDark } = useTheme();

    /* Variable declarations. */
    const styles = createStyles(isDark);

    /* Submit functionality. */
    const handlePasswordChange = async (values, { resetForm }) => {
        await changePassword({
            currentPassword: values?.currentPassword,
            newPassword: values?.newPassword,
            resetForm: resetForm
        });
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles?.container} >

            {/* Change password form section. */}
            <ScrollView style={styles.scrollViewContainer}>

                <View style={styles.content}>

                    <Formik
                        initialValues={{ currentPassword: '', newPassword: '', confirmPassword: '' }}
                        validationSchema={validate}
                        onSubmit={handlePasswordChange}
                        validateOnChange={true}
                        validateOnBlur={true}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid, dirty }) => (
                            <>
                                <View style={styles.formSection}>

                                    {/* Current Password Field */}
                                    <View style={styles.fieldContainer}>
                                        <Text style={styles.label}>Current Password</Text>
                                        <View style={styles.inputWrapper}>
                                            <Ionicons name="lock-closed-outline" size={20} color="#FF4D67" style={styles.icon} />
                                            <TextInput
                                                style={styles.input}
                                                value={values.currentPassword}
                                                onChangeText={handleChange('currentPassword')}
                                                onBlur={handleBlur('currentPassword')}
                                                placeholder="Enter current password"
                                                placeholderTextColor="#999"
                                                secureTextEntry={!showCurrentPassword}
                                                autoCapitalize="none"
                                            />
                                            <TouchableOpacity onPress={() => setShowCurrentPassword(!showCurrentPassword)} style={styles.eyeIcon}>
                                                <Ionicons name={showCurrentPassword ? "eye-outline" : "eye-off-outline"} size={20} color="#999" />
                                            </TouchableOpacity>
                                        </View>
                                        {touched.currentPassword && errors.currentPassword && (<Text style={styles.errorText}>{errors.currentPassword}</Text>)}
                                    </View>

                                    {/* New Password Field */}
                                    <View style={styles.fieldContainer}>
                                        <Text style={styles.label}>New Password</Text>
                                        <View style={styles.inputWrapper}>
                                            <Ionicons name="key-outline" size={20} color="#FF4D67" style={styles.icon} />
                                            <TextInput
                                                style={styles.input}
                                                value={values.newPassword}
                                                onChangeText={handleChange('newPassword')}
                                                onBlur={handleBlur('newPassword')}
                                                placeholder="Enter new password"
                                                placeholderTextColor="#999"
                                                secureTextEntry={!showNewPassword}
                                                autoCapitalize="none"
                                            />
                                            <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)} style={styles.eyeIcon}>
                                                <Ionicons name={showNewPassword ? "eye-outline" : "eye-off-outline"} size={20} color="#999" />
                                            </TouchableOpacity>
                                        </View>
                                        {touched.newPassword && errors.newPassword && (<Text style={styles.errorText}>{errors.newPassword}</Text>)}
                                    </View>

                                    {/* Confirm Password Field */}
                                    <View style={styles.fieldContainer}>
                                        <Text style={styles.label}>Confirm New Password</Text>
                                        <View style={styles.inputWrapper}>
                                            <Ionicons name="checkmark-circle-outline" size={20} color="#FF4D67" style={styles.icon} />
                                            <TextInput
                                                style={styles.input}
                                                value={values.confirmPassword}
                                                onChangeText={handleChange('confirmPassword')}
                                                onBlur={handleBlur('confirmPassword')}
                                                placeholder="Confirm new password"
                                                placeholderTextColor="#999"
                                                secureTextEntry={!showConfirmPassword}
                                                autoCapitalize="none"
                                            />
                                            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.eyeIcon}>
                                                <Ionicons name={showConfirmPassword ? "eye-outline" : "eye-off-outline"} size={20} color="#999" />
                                            </TouchableOpacity>
                                        </View>
                                        {touched.confirmPassword && errors.confirmPassword && (<Text style={styles.errorText}>{errors.confirmPassword}</Text>)}
                                    </View>

                                    {/* Password Requirements */}
                                    <View style={styles.requirementsContainer}>
                                        <Text style={styles.requirementsTitle}>Password must contain:</Text>
                                        {
                                            ["At least 8 characters", "One uppercase letter", "One lowercase letter", "One number", "One special character (@$!%*?&)"]
                                                ?.map((ele, index) => (
                                                    <View style={styles.requirementItem} key={index}>
                                                        <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
                                                        <Text style={styles.requirementText}>{ele}</Text>
                                                    </View>
                                                ))
                                        }
                                    </View>
                                </View>

                                <TouchableOpacity
                                    style={[styles.submitButton, (!isValid || !dirty) && styles.submitButtonDisabled]}
                                    onPress={handleSubmit}
                                    disabled={!isValid || !dirty}
                                >
                                    <Text style={styles.submitButtonText}>Change Password</Text>
                                </TouchableOpacity>

                            </>
                        )}
                    </Formik>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const mapDispatch = { changePassword };

export default connect(null, mapDispatch)(ChangePassword);