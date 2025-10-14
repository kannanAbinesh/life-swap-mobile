import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Alert, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import styles from "./registerStyle";
import googleLogo from '../../../assets/Images/google.jpg'

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [nameFocused, setNameFocused] = useState(false);
    const [emailFocused, setEmailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const router = useRouter();

    const isFormValid = name && email && password && confirmPassword && password === confirmPassword;

    /* Google login functionality. */
    const handleGoogleLogin = () => {
        console.log("Google login pressed");
    };

    const handleRegister = async () => {
        if (!isFormValid) return;

        try {
            const response = await fetch("http://192.168.0.107:3005/api/v1/auth/manageUsers", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                await AsyncStorage.setItem("userToken", data.token || "dummy-token");
                router.replace("/(tabs)/home");
            } else {
                Alert.alert("Registration Failed", data.message || "Something went wrong");
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "Unable to connect to server");
        }
    };

    const handleGoogleRegister = async () => {
        console.log("Google register clicked");
        await AsyncStorage.setItem("userToken", "dummy-token");
        router.replace("/(tabs)/home");
    };

    const handleFacebookRegister = async () => {
        console.log("Facebook register clicked");
        await AsyncStorage.setItem("userToken", "dummy-token");
        router.replace("/(tabs)/home");
    };

    return (
        <View style={styles.container}>
            {/* Curved Topographic Background */}
            <View style={styles.curvedBackground}>
                <View style={styles.wave1} />
                <View style={styles.wave2} />
                <View style={styles.wave3} />
                <View style={styles.wave4} />
                <View style={styles.wave5} />
            </View>

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
                    <View style={styles.content}>
                        {/* White Rounded Container */}
                        <View style={styles.whiteContainer}>
                            {/* Header */}
                            <View style={styles.header}>
                                <Text style={styles.title}>Create Account</Text>
                                <Text style={styles.subtitle}>Sign up to get started</Text>
                            </View>

                            {/* Form */}
                            <View style={styles.form}>
                                {/* Name Input */}
                                <View style={styles.inputContainer}>
                                    <Text style={styles.label}>Full Name</Text>
                                    <View style={styles.inputWrapper}>
                                        <View style={styles.inputIcon}>
                                            <Ionicons
                                                name="person-outline"
                                                size={20}
                                                color="#FFB5B5"
                                            />
                                        </View>
                                        <TextInput
                                            style={[
                                                styles.input,
                                                nameFocused && styles.inputFocused
                                            ]}
                                            placeholder="Enter your full name"
                                            placeholderTextColor="#CCC"
                                            value={name}
                                            onChangeText={setName}
                                            onFocus={() => setNameFocused(true)}
                                            onBlur={() => setNameFocused(false)}
                                            autoCapitalize="words"
                                            autoComplete="name"
                                        />
                                    </View>
                                </View>

                                {/* Email Input */}
                                <View style={styles.inputContainer}>
                                    <Text style={styles.label}>Email</Text>
                                    <View style={styles.inputWrapper}>
                                        <View style={styles.inputIcon}>
                                            <Ionicons
                                                name="mail-outline"
                                                size={20}
                                                color="#FFB5B5"
                                            />
                                        </View>
                                        <TextInput
                                            style={[
                                                styles.input,
                                                emailFocused && styles.inputFocused
                                            ]}
                                            placeholder="Enter your email"
                                            placeholderTextColor="#CCC"
                                            value={email}
                                            onChangeText={setEmail}
                                            onFocus={() => setEmailFocused(true)}
                                            onBlur={() => setEmailFocused(false)}
                                            keyboardType="email-address"
                                            autoCapitalize="none"
                                            autoComplete="email"
                                        />
                                    </View>
                                </View>

                                {/* Password Input */}
                                <View style={styles.inputContainer}>
                                    <Text style={styles.label}>Password</Text>
                                    <View style={styles.passwordInputWrapper}>
                                        <View style={styles.inputIcon}>
                                            <Ionicons
                                                name="lock-closed-outline"
                                                size={20}
                                                color="#FFB5B5"
                                            />
                                        </View>
                                        <TextInput
                                            style={[
                                                styles.input,
                                                passwordFocused && styles.inputFocused
                                            ]}
                                            placeholder="Enter your password"
                                            placeholderTextColor="#CCC"
                                            value={password}
                                            onChangeText={setPassword}
                                            onFocus={() => setPasswordFocused(true)}
                                            onBlur={() => setPasswordFocused(false)}
                                            secureTextEntry={!showPassword}
                                            autoCapitalize="none"
                                            autoComplete="password-new"
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
                                </View>

                                {/* Confirm Password Input */}
                                <View style={styles.inputContainer}>
                                    <Text style={styles.label}>Confirm Password</Text>
                                    <View style={styles.passwordInputWrapper}>
                                        <View style={styles.inputIcon}>
                                            <Ionicons
                                                name="lock-closed-outline"
                                                size={20}
                                                color="#FFB5B5"
                                            />
                                        </View>
                                        <TextInput
                                            style={[
                                                styles.input,
                                                confirmPasswordFocused && styles.inputFocused,
                                                confirmPassword && password !== confirmPassword && styles.inputError
                                            ]}
                                            placeholder="Confirm your password"
                                            placeholderTextColor="#CCC"
                                            value={confirmPassword}
                                            onChangeText={setConfirmPassword}
                                            onFocus={() => setConfirmPasswordFocused(true)}
                                            onBlur={() => setConfirmPasswordFocused(false)}
                                            secureTextEntry={!showConfirmPassword}
                                            autoCapitalize="none"
                                            autoComplete="password-new"
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
                                    {confirmPassword && password !== confirmPassword && (
                                        <Text style={styles.errorText}>Passwords do not match</Text>
                                    )}
                                </View>

                                {/* Register Button */}
                                <TouchableOpacity
                                    style={[
                                        styles.registerButton,
                                        !isFormValid && styles.registerButtonDisabled
                                    ]}
                                    onPress={handleRegister}
                                    disabled={!isFormValid}
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

                                {/* Social Login Buttons */}
                                <View style={{ alignItems: 'center' }}>
                                    <TouchableOpacity style={styles.googleButton} onPress={handleGoogleLogin} activeOpacity={0.8}>
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
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}