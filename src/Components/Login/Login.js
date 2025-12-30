/* Plugins. */
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Image, Keyboard } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import { connect } from "react-redux";
import { Ionicons } from '@expo/vector-icons';

/* Helpers. */
import { login } from "../../ActionCreators/login";
import { validate } from "./validate";
import { useTheme } from "../Theme/ThemeContext";
import { googleAuthentication } from "../../ActionCreators/googleAuthentication";

/* Images. */
import googleLogo from '../../../assets/Images/google.jpg'

/* Styles. */
import { createStyles } from "./loginStyles";

function Login(props) {

    const { login, googleAuthentication } = props; /* Props. */

    /* State declarations. */
    const [emailFocused, setEmailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    /* Hooks declarations. */
    const router = useRouter();
    const { isDark } = useTheme();

    /* Variable declarations. */
    const styles = createStyles(isDark);

    /* Submit functionality. */
    const handleLogin = async (values) => {
        Keyboard.dismiss();
        await login(values, router);
    };

    /* Google login functionality. */
    const handleGoogleAuthentication = async () => { await googleAuthentication() };

    return (
        <View style={styles.scrollContainer}>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}  style={{ flex: 1 }}  keyboardVerticalOffset={0} >
                <ScrollView contentContainerStyle={styles.scrollContainer}  keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} bounces={false} >
                    {/* PINK HEADER - Separate from scrollable content */}
                    <View style={styles.pinkHeader} />
                    
                    <View style={styles.contentWrapper}>
                        <View style={styles.formContainer}>

                            <View style={styles.headerContainer}>
                                <Text style={styles.title}>Sign in</Text>
                            </View>

                            {/* Login form. */}
                            <Formik initialValues={{ email: "", password: "" }} validationSchema={validate} onSubmit={handleLogin} >
                                {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (
                                    <View>

                                        {/* Email Input */}
                                        <View style={styles.inputContainer}>
                                            <Text style={styles.label}>Email</Text>
                                            <View style={styles.inputWrapper}>
                                                <View style={styles.inputIcon}>
                                                    <Ionicons name="mail-outline" size={20} color="#FFB5B5" />
                                                </View>
                                                <TextInput
                                                    style={[styles.input, emailFocused && styles.inputFocused]}
                                                    placeholder="demo@****.com"
                                                    placeholderTextColor="#CCC"
                                                    value={values.email}
                                                    onChangeText={handleChange("email")}
                                                    onFocus={() => setEmailFocused(true)}
                                                    onBlur={() => {
                                                        setEmailFocused(false);
                                                        handleBlur("email");
                                                    }}
                                                    keyboardType="email-address"
                                                    autoCapitalize="none"
                                                    autoComplete="email"
                                                    returnKeyType="next"
                                                />
                                            </View>
                                            {touched.email && errors.email && (<Text style={styles.errorText}>{errors.email}</Text>)}
                                        </View>

                                        {/* Password Input */}
                                        <View style={styles.inputContainer}>
                                            <Text style={styles.label}>Password</Text>
                                            <View style={styles.inputWrapper}>
                                                <View style={styles.inputIcon}>
                                                    <Ionicons name="lock-closed-outline" size={20} color="#FFB5B5" />
                                                </View>
                                                <TextInput
                                                    style={[styles.input, passwordFocused && styles.inputFocused]}
                                                    placeholder="enter your password"
                                                    placeholderTextColor="#CCC"
                                                    value={values.password}
                                                    onChangeText={handleChange("password")}
                                                    onFocus={() => setPasswordFocused(true)}
                                                    onBlur={() => {
                                                        setPasswordFocused(false);
                                                        handleBlur("password");
                                                    }}
                                                    secureTextEntry={!showPassword}
                                                    autoCapitalize="none"
                                                    autoComplete="password"
                                                    returnKeyType="done"
                                                    onSubmitEditing={() => {
                                                        if (isValid && values.email && values.password) {
                                                            handleSubmit();
                                                        }
                                                    }}
                                                />
                                                <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowPassword(!showPassword)}>
                                                    <Ionicons name={showPassword ? "eye-outline" : "eye-off-outline"} size={20} color="#CCC" />
                                                </TouchableOpacity>
                                            </View>
                                            {touched.password && errors.password && (<Text style={styles.errorText}>{errors.password}</Text>)}
                                        </View>

                                        {/* Forget password. */}
                                        <View>
                                            <TouchableOpacity style={styles.forgotPassword} onPress={() => { }} >
                                                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                                            </TouchableOpacity>
                                        </View>

                                        {/* Login Button */}
                                        <TouchableOpacity
                                            style={[styles.loginButton]}
                                            onPress={() => {
                                                Keyboard.dismiss();
                                                handleSubmit();
                                            }}
                                            activeOpacity={0.8}
                                        >
                                            <Text style={styles.loginButtonText}>Login</Text>
                                        </TouchableOpacity>

                                        {/* Divider with "OR" */}
                                        <View style={styles.dividerContainer}>
                                            <View style={styles.dividerLine} />
                                            <Text style={styles.dividerText}>OR</Text>
                                            <View style={styles.dividerLine} />
                                        </View>

                                        {/* Google Login Button */}
                                        <View style={{ alignItems: 'center' }}>
                                            <TouchableOpacity style={styles.googleButton} onPress={handleGoogleAuthentication} activeOpacity={0.8}>
                                                <Image source={googleLogo} style={styles.googleIcon} resizeMode="contain" />
                                                <Text style={styles.googleButtonText}>Google</Text>
                                            </TouchableOpacity>
                                        </View>

                                        {/* Register Link */}
                                        <View style={styles.registerContainer}>
                                            <Text style={styles.registerText}>Don't have an Account ? </Text>
                                            <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
                                                <Text style={styles.registerLink}>Sign up</Text>
                                            </TouchableOpacity>
                                        </View>

                                    </View>
                                )}
                            </Formik>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
};

const mapDispatch = {
    login,
    googleAuthentication
};

export default connect(null, mapDispatch)(Login);