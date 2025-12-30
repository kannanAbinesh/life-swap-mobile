/* Plugins. */
import { StyleSheet, Dimensions } from "react-native";

/* Variables. */
const { height } = Dimensions.get('window');

export function createStyles(isDark) {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: !isDark ? "#ffffff" : '#171D37' 
        },
        scrollContainer: {
            flexGrow: 1
        },
        contentWrapper: {
            flex: 1,
            paddingHorizontal: 0
        },
        pinkHeader: {
            height: height * 0.25,
            backgroundColor: '#FF8A8A'
        },
        formContainer: {
            flex: 1,
            backgroundColor: !isDark ? "#ffffff" : '#171D37',
            borderTopLeftRadius: 32,
            borderTopRightRadius: 32,
            paddingHorizontal: 32,
            paddingTop: 40,
            paddingBottom: 40,
            shadowColor: !isDark ? "#000" : "fff",
            shadowOffset: { width: 0, height: -4 },
            shadowOpacity: 0.08,
            shadowRadius: 12,
            elevation: 8,
            marginTop: -32
        },
        headerContainer: {
            marginBottom: 32
        },
        title: {
            fontSize: 32,
            color: !isDark ? "#1a1a1a" : "#ffffff",
            fontFamily: 'Lexend_700Bold',
            marginBottom: 0
        },

        /* Form styles. */
        inputContainer: {
            marginBottom: 20
        },
        label: {
            fontSize: 14,
            color: !isDark ? "#333" : "#9a9999ff",
            marginBottom: 8,
            fontFamily: 'Lexend_500Medium'
        },
        inputWrapper: {
            position: 'relative'
        },
        inputIcon: {
            position: 'absolute',
            left: 16,
            top: 16,
            zIndex: 1
        },
        input: {
            height: 52,
            backgroundColor: !isDark ? "#fff" : '#171D37',
            fontFamily: 'Lexend_400Regular',
            borderRadius: 8,
            paddingLeft: 44,
            paddingRight: 16,
            fontSize: 15,
            borderWidth: 1,
            borderColor: "#FFB5B5",
            color: !isDark ? '#000' : "#fff",
            borderColor: "#FF8A8A"
        },
        errorText: {
            color: "#f57e78ff",
            fontSize: 12,
            marginTop: 4,
            fontFamily: 'Lexend_400Regular'
        },
        eyeIcon: {
            position: 'absolute',
            right: 16,
            top: 16,
            zIndex: 1
        },
        forgotPassword: {
            alignSelf: 'flex-start',
            padding: 4
        },
        forgotPasswordText: {
            color: "#FF8A8A",
            fontSize: 15,
            fontFamily: 'Lexend_400Regular'
        },
        loginButton: {
            marginTop: 25,
            height: 54,
            backgroundColor: "#FF8A8A",
            borderRadius: 12,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 5
        },
        loginButtonText: {
            color: "#fff",
            fontSize: 16,
            fontWeight: "600",
            fontFamily: 'Lexend_600SemiBold',
            letterSpacing: 0.5
        },
        dividerContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 24
        },
        dividerLine: {
            flex: 1,
            height: 1,
            backgroundColor: '#E5E5E5'
        },
        dividerText: {
            marginHorizontal: 16,
            fontSize: 13,
            color: '#999',
            fontFamily: 'Lexend_500Medium',
            letterSpacing: 0.5
        },
        googleButton: {
            height: 50,
            backgroundColor: !isDark ? '#ffffff' : '#171D37',
            borderRadius: 25,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1.5,
            borderColor: '#E5E5E5',
            shadowColor: '#FF8A8A',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.02,
            shadowRadius: 4,
            elevation: 3,
            paddingHorizontal: 20,
            marginBottom: 24,
            alignSelf: 'center'
        },
        googleIcon: {
            width: 22,
            height: 22,
            marginRight: 12,
            borderRadius: 50
        },
        googleButtonText: {
            color: !isDark ? '#333' : "#fff",
            fontSize: 15,
            fontWeight: '600',
            fontFamily: 'Lexend_400Regular',
            letterSpacing: 0.3
        },
        registerContainer: {
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 8
        },
        registerText: {
            color: "#666",
            fontSize: 14,
            fontFamily: 'Lexend_400Regular'
        },
        registerLink: {
            color: "#FF8A8A",
            fontSize: 14,
            fontWeight: "600",
            fontFamily: 'Lexend_400Regular'
        }
    });
};