/* Plugins. */
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { changePassword } from '../../ActionCreators/changePassword';
import { connect } from 'react-redux';

// Validation Schema
const validationSchema = Yup.object().shape({
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

function ChangePassword({ changePassword }) {
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const initialValues = {
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    };

    const handleSubmit = (values, { resetForm }) => {
        console.log('Password change submitted:', values);
        changePassword({ currentPassword: values?.currentPassword, newPassword: values?.newPassword })
        Alert.alert(
            'Success',
            'Your password has been changed successfully!',
            [
                {
                    text: 'OK',
                    onPress: () => resetForm(),
                }
            ]
        );
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <ScrollView style={styles.container}>
                {/* Header Section */}
                <View style={styles.headerSection}>
                    <View style={styles.topNav}>
                        <TouchableOpacity style={styles.navButton}>
                            <Ionicons name="arrow-back" size={24} color="#fff" />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Change Password</Text>
                        <View style={styles.navButton} />
                    </View>

                    <View style={styles.headerIconContainer}>
                        <View style={styles.iconCircle}>
                            <Ionicons name="lock-closed" size={40} color="#fff" />
                        </View>
                    </View>
                </View>

                {/* Content Section */}
                <View style={styles.content}>
                    <Text style={styles.subtitle}>
                        Please enter your current password and choose a new secure password
                    </Text>

                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
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
                                            <Ionicons
                                                name="lock-closed-outline"
                                                size={20}
                                                color="#FF4D67"
                                                style={styles.icon}
                                            />
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
                                            <TouchableOpacity
                                                onPress={() => setShowCurrentPassword(!showCurrentPassword)}
                                                style={styles.eyeIcon}
                                            >
                                                <Ionicons
                                                    name={showCurrentPassword ? "eye-outline" : "eye-off-outline"}
                                                    size={20}
                                                    color="#999"
                                                />
                                            </TouchableOpacity>
                                        </View>
                                        {touched.currentPassword && errors.currentPassword && (
                                            <Text style={styles.errorText}>{errors.currentPassword}</Text>
                                        )}
                                    </View>

                                    {/* New Password Field */}
                                    <View style={styles.fieldContainer}>
                                        <Text style={styles.label}>New Password</Text>
                                        <View style={styles.inputWrapper}>
                                            <Ionicons
                                                name="key-outline"
                                                size={20}
                                                color="#FF4D67"
                                                style={styles.icon}
                                            />
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
                                            <TouchableOpacity
                                                onPress={() => setShowNewPassword(!showNewPassword)}
                                                style={styles.eyeIcon}
                                            >
                                                <Ionicons
                                                    name={showNewPassword ? "eye-outline" : "eye-off-outline"}
                                                    size={20}
                                                    color="#999"
                                                />
                                            </TouchableOpacity>
                                        </View>
                                        {touched.newPassword && errors.newPassword && (
                                            <Text style={styles.errorText}>{errors.newPassword}</Text>
                                        )}
                                    </View>

                                    {/* Confirm Password Field */}
                                    <View style={styles.fieldContainer}>
                                        <Text style={styles.label}>Confirm New Password</Text>
                                        <View style={styles.inputWrapper}>
                                            <Ionicons
                                                name="checkmark-circle-outline"
                                                size={20}
                                                color="#FF4D67"
                                                style={styles.icon}
                                            />
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
                                            <TouchableOpacity
                                                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                                                style={styles.eyeIcon}
                                            >
                                                <Ionicons
                                                    name={showConfirmPassword ? "eye-outline" : "eye-off-outline"}
                                                    size={20}
                                                    color="#999"
                                                />
                                            </TouchableOpacity>
                                        </View>
                                        {touched.confirmPassword && errors.confirmPassword && (
                                            <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                                        )}
                                    </View>

                                    {/* Password Requirements */}
                                    <View style={styles.requirementsContainer}>
                                        <Text style={styles.requirementsTitle}>Password must contain:</Text>
                                        <View style={styles.requirementItem}>
                                            <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
                                            <Text style={styles.requirementText}>At least 8 characters</Text>
                                        </View>
                                        <View style={styles.requirementItem}>
                                            <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
                                            <Text style={styles.requirementText}>One uppercase letter</Text>
                                        </View>
                                        <View style={styles.requirementItem}>
                                            <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
                                            <Text style={styles.requirementText}>One lowercase letter</Text>
                                        </View>
                                        <View style={styles.requirementItem}>
                                            <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
                                            <Text style={styles.requirementText}>One number</Text>
                                        </View>
                                        <View style={styles.requirementItem}>
                                            <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
                                            <Text style={styles.requirementText}>One special character (@$!%*?&)</Text>
                                        </View>
                                    </View>
                                </View>

                                {/* Submit Button */}
                                <TouchableOpacity
                                    style={[
                                        styles.submitButton,
                                        (!isValid || !dirty) && styles.submitButtonDisabled
                                    ]}
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
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    headerSection: {
        backgroundColor: '#FF4D67',
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        paddingTop: 50,
        paddingBottom: 60,
        paddingHorizontal: 20,
    },
    topNav: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    navButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#fff',
        fontFamily: 'Lexend_400Regular',
    },
    headerIconContainer: {
        alignItems: 'center',
        marginTop: 10,
    },
    iconCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 3,
        borderColor: '#fff',
    },
    content: {
        padding: 20,
        paddingTop: 30,
        paddingBottom: 40,
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginBottom: 30,
        lineHeight: 20,
        fontFamily: 'Lexend_400Regular',
    },
    formSection: {
        marginBottom: 30,
    },
    fieldContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        color: '#5c5b5bff',
        marginBottom: 8,
        marginLeft: 4,
        fontFamily: 'Lexend_400Regular',
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 12,
        borderWidth: 1.5,
        borderColor: '#E0E0E0',
        paddingHorizontal: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },
    icon: {
        marginRight: 12,
    },
    input: {
        flex: 1,
        paddingVertical: 15,
        fontSize: 16,
        color: '#333',
        fontFamily: 'Lexend_400Regular',
    },
    eyeIcon: {
        padding: 5,
    },
    errorText: {
        color: '#FF4D67',
        fontSize: 12,
        marginTop: 5,
        marginLeft: 4,
        fontFamily: 'Lexend_400Regular',
    },
    requirementsContainer: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 15,
        marginTop: 10,
        borderWidth: 1.5,
        borderColor: '#E0E0E0',
    },
    requirementsTitle: {
        fontSize: 13,
        fontWeight: '600',
        color: '#333',
        marginBottom: 10,
        fontFamily: 'Lexend_400Regular',
    },
    requirementItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },
    requirementText: {
        fontSize: 12,
        color: '#666',
        marginLeft: 8,
        fontFamily: 'Lexend_400Regular',
    },
    submitButton: {
        backgroundColor: '#FF4D67',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: '#FF4D67',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 4,
    },
    submitButtonDisabled: {
        backgroundColor: '#FFB3C1',
        shadowOpacity: 0.1,
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        fontFamily: 'Lexend_400Regular',
    },
});

const mapDispatch = {
    changePassword
}

export default connect(null, mapDispatch)(ChangePassword);