/* Plugin. */
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Alert, Image } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Formik } from "formik";
import { connect } from "react-redux";

/* Helpers. */
import { register } from "../../ActionCreators/register";
import { validate } from "./validate";
import { useTheme } from "../Theme/ThemeContext";

/* Images. */
import googleLogo from "../../../assets/Images/google.jpg";

/* Styles. */
import { createStyles } from "./registerStyle";

function Register(props) {

    const { register } = props; /* Props. */

    /* State. */
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const router = useRouter(); /* Hooks. */
    const { isDark } = useTheme();

    /* Variable declarations. */
    const styles = createStyles(isDark);

    /* Google Login */
    const handleGoogleAuthentication = () => {
    };

    const handleRegister = async (values) => { await register(values, router) }; /* Form submit functionality. */

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView 
                behavior={Platform.OS === "ios" ? "padding" : "height"} 
                style={{ flex: 1 }}
            >
                <ScrollView 
                    contentContainerStyle={styles.scrollContainer} 
                    keyboardShouldPersistTaps="handled" 
                    showsVerticalScrollIndicator={false} 
                    bounces={false}
                >
                    {/* PINK HEADER - Fixed, won't scroll */}
                    <View style={styles.pinkHeader} />

                    <View style={styles.contentWrapper}>
                        <View style={styles.formContainer}>

                            <View style={styles.headerContainer}>
                                <Text style={styles.title}>Create Account</Text>
                                <Text style={styles.subtitle}>Sign up to get started</Text>
                            </View>

                            {/* Register form. */}
                            <Formik 
                                initialValues={{ name: "", email: "", password: "", confirmPassword: "" }} 
                                validationSchema={validate} 
                                onSubmit={handleRegister}
                            >
                                {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (
                                    <View>

                                        {/* Full Name */}
                                        <View style={styles.inputContainer}>
                                            <Text style={styles.label}>Full Name</Text>
                                            <View style={styles.inputWrapper}>
                                                <View style={styles.inputIcon}>
                                                    <Ionicons name="person-outline" size={20} color="#FFB5B5" />
                                                </View>
                                                <TextInput
                                                    style={styles.input}
                                                    placeholder="Enter your full name"
                                                    placeholderTextColor="#CCC"
                                                    value={values.name}
                                                    onChangeText={handleChange("name")}
                                                    onBlur={handleBlur("name")}
                                                    autoCapitalize="words"
                                                />
                                            </View>
                                            {touched.name && errors.name && (<Text style={styles.errorText}>{errors.name}</Text>)}
                                        </View>

                                        {/* Email */}
                                        <View style={styles.inputContainer}>
                                            <Text style={styles.label}>Email</Text>
                                            <View style={styles.inputWrapper}>
                                                <View style={styles.inputIcon}>
                                                    <Ionicons name="mail-outline" size={20} color="#FFB5B5" />
                                                </View>
                                                <TextInput
                                                    style={styles.input}
                                                    placeholder="Enter your email"
                                                    placeholderTextColor="#CCC"
                                                    value={values.email}
                                                    onChangeText={handleChange("email")}
                                                    onBlur={handleBlur("email")}
                                                    keyboardType="email-address"
                                                    autoCapitalize="none"
                                                />
                                            </View>
                                            {touched.email && errors.email && (<Text style={styles.errorText}>{errors.email}</Text>)}
                                        </View>

                                        {/* Password */}
                                        <View style={styles.inputContainer}>
                                            <Text style={styles.label}>Password</Text>
                                            <View style={styles.inputWrapper}>
                                                <View style={styles.inputIcon}>
                                                    <Ionicons name="lock-closed-outline" size={20} color="#FFB5B5" />
                                                </View>
                                                <TextInput
                                                    style={styles.input}
                                                    placeholder="Enter your password"
                                                    placeholderTextColor="#CCC"
                                                    secureTextEntry={!showPassword}
                                                    value={values.password}
                                                    onChangeText={handleChange("password")}
                                                    onBlur={handleBlur("password")}
                                                />
                                                <TouchableOpacity 
                                                    style={styles.eyeIcon} 
                                                    onPress={() => setShowPassword(!showPassword)}
                                                >
                                                    <Ionicons 
                                                        name={showPassword ? "eye-outline" : "eye-off-outline"} 
                                                        size={20} 
                                                        color="#CCC" 
                                                    />
                                                </TouchableOpacity>
                                            </View>
                                            {touched.password && errors.password && (<Text style={styles.errorText}>{errors.password}</Text>)}
                                        </View>

                                        {/* Confirm Password */}
                                        <View style={styles.inputContainer}>
                                            <Text style={styles.label}>Confirm Password</Text>
                                            <View style={styles.inputWrapper}>
                                                <View style={styles.inputIcon}>
                                                    <Ionicons name="lock-closed-outline" size={20} color="#FFB5B5" />
                                                </View>
                                                <TextInput
                                                    style={styles.input}
                                                    placeholder="Confirm your password"
                                                    placeholderTextColor="#CCC"
                                                    secureTextEntry={!showConfirmPassword}
                                                    value={values.confirmPassword}
                                                    onChangeText={handleChange("confirmPassword")}
                                                    onBlur={handleBlur("confirmPassword")}
                                                />
                                                <TouchableOpacity 
                                                    style={styles.eyeIcon} 
                                                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                                                >
                                                    <Ionicons 
                                                        name={showConfirmPassword ? "eye-outline" : "eye-off-outline"} 
                                                        size={20} 
                                                        color="#CCC" 
                                                    />
                                                </TouchableOpacity>
                                            </View>
                                            {touched.confirmPassword && errors.confirmPassword && (<Text style={styles.errorText}>{errors.confirmPassword}</Text>)}
                                        </View>

                                        {/* Submit Button */}
                                        <TouchableOpacity 
                                            style={[styles.registerButton]} 
                                            onPress={handleSubmit} 
                                            activeOpacity={0.8}
                                        >
                                            <Text style={styles.registerButtonText}>Create Account</Text>
                                        </TouchableOpacity>

                                        {/* Divider */}
                                        <View style={styles.divider}>
                                            <View style={styles.dividerLine} />
                                            <Text style={styles.dividerText}>OR</Text>
                                            <View style={styles.dividerLine} />
                                        </View>

                                        {/* Google */}
                                        <View style={{ alignItems: "center" }}>
                                            <TouchableOpacity 
                                                style={styles.googleButton} 
                                                onPress={handleGoogleAuthentication} 
                                                activeOpacity={0.8}
                                            >
                                                <Image source={googleLogo} style={styles.googleIcon} resizeMode="contain" />
                                                <Text style={styles.googleButtonText}>Google</Text>
                                            </TouchableOpacity>
                                        </View>

                                        {/* Login Link */}
                                        <View style={styles.loginContainer}>
                                            <Text style={styles.loginText}>Already have an account? </Text>
                                            <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
                                                <Text style={styles.loginLink}>Sign In</Text>
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

const mapDispatch = { register };

export default connect(null, mapDispatch)(Register);