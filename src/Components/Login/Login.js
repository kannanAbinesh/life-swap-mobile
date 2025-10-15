/* Plugins. */
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Image } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import { connect } from "react-redux";
import { Ionicons } from '@expo/vector-icons';

/* Helpers. */
import { login } from "../../ActionCreators/login";
import { validate } from "./validate";
import { useTheme } from "../Theme/ThemeContext";

/* Images. */
import googleLogo from '../../../assets/Images/google.jpg'

/* Styles. */
import styles from "./loginStyles";

function Login(props) {

    const { login } = props; /* Props. */

    /* State declarations. */
    const [emailFocused, setEmailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    /* Hooks declarations. */
    const router = useRouter();
    const { theme, themeMode, isDark, toggleTheme, setThemeMode } = useTheme();
    console.log(theme, themeMode, isDark, toggleTheme, setThemeMode, 'theme, themeMode, isDark, toggleTheme, setThemeModetheme, themeMode, isDark, toggleTheme, setThemeModetheme, themeMode, isDark, toggleTheme, setThemeModetheme, themeMode, isDark, toggleTheme, setThemeMode')

    const handleLogin = async (values) => { await login(values, router) }; /* Submit functionality. */

    /* Google login functionality. */
    const handleGoogleAuthentication = () => {
        console.log("Google login pressed");
    };

    return (
        <View style={styles.container}>

            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} bounces={false}>
                    <View style={styles.content}>
                        <View style={styles.whiteContainer}>

                            <View style={styles.header}>
                                <Text style={styles.title}>Sign in</Text>
                            </View>

                            {/* Formik Form */}
                            <Formik
                                initialValues={{ email: "", password: "" }}
                                validationSchema={validate}
                                onSubmit={handleLogin}
                            >
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
                                                    style={[
                                                        styles.input,
                                                        emailFocused && styles.inputFocused,
                                                        touched.email && errors.email && styles.inputError
                                                    ]}
                                                    placeholder="demo@email.com"
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
                                                />
                                            </View>
                                            {touched.email && errors.email && (<Text style={styles.errorText}>{errors.email}</Text>)}
                                        </View>

                                        {/* Password Input */}
                                        <View style={styles.passwordInputContainer}>
                                            <Text style={styles.label}>Password</Text>
                                            <View style={styles.passwordInputWrapper}>
                                                <View style={styles.inputIcon}>
                                                    <Ionicons name="lock-closed-outline" size={20} color="#FFB5B5" />
                                                </View>
                                                <TextInput
                                                    style={[
                                                        styles.input,
                                                        passwordFocused && styles.inputFocused,
                                                        touched.password && errors.password && styles.inputError
                                                    ]}
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
                                                />
                                                <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowPassword(!showPassword)}>
                                                    <Ionicons name={showPassword ? "eye-outline" : "eye-off-outline"} size={20} color="#CCC" />
                                                </TouchableOpacity>
                                            </View>
                                            {touched.password && errors.password && (<Text style={styles.errorText}>{errors.password}</Text>)}
                                        </View>

                                        {/* Remember Me & Forgot Password Row */}
                                        <View style={styles.optionsRow}>
                                            <TouchableOpacity
                                                style={styles.forgotPassword}
                                                onPress={() => {
                                                    // Handle forgot password
                                                }}
                                            >
                                                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                                            </TouchableOpacity>
                                        </View>

                                        {/* Login Button */}
                                        <TouchableOpacity
                                            style={[
                                                styles.loginButton,
                                                (!isValid || !values.email || !values.password) && styles.loginButtonDisabled
                                            ]}
                                            onPress={() => handleSubmit()}
                                            disabled={!isValid || !values.email || !values.password}
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
}

const mapDispatch = {
    login
};

export default connect(null, mapDispatch)(Login);