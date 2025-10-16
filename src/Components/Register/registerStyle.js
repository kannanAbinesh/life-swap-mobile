/* Plugins. */
import { StyleSheet, Dimensions } from "react-native";

const { height } = Dimensions.get('window'); /* Varaibles. */

export function createStyles(isDark) {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: !isDark ? "#FF8A8A" : '#252B47'
        },
        scrollContainer: {
            flexGrow: 1
        },
        contentWrapper: {
            flex: 1,
            paddingTop: height * 0.18,
            paddingHorizontal: 0
        },
        formContainer: {
            flex: 1,
            backgroundColor: !isDark ? "#ffffff" : '#171D37',
            borderTopLeftRadius: 32,
            borderTopRightRadius: 32,
            paddingHorizontal: 32,
            paddingTop: 40,
            paddingBottom: 40,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: -4 },
            shadowOpacity: 0.08,
            shadowRadius: 12,
            elevation: 8
        },
        headerContainer: {
            marginBottom: 32
        },
        title: {
            fontSize: 32,
            color: !isDark ? "#1a1a1a" : "#ffffff",
            fontFamily: 'Lexend_700Bold',
            marginBottom: 4
        },
        subtitle: {
            fontSize: 15,
            color: "#666",
            fontFamily: 'Lexend_400Regular'
        },
        inputContainer: {
            marginBottom: 16
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
            color: "#1a1a1a",
            borderWidth: 1,
            borderColor: "#FFB5B5",
            color: !isDark ? '#000' : "#fff"
        },
        inputFocused: {
            borderColor: "#FF8A8A"
        },
        errorText: {
            color: "#FF3B30",
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
        registerButton: {
            height: 54,
            backgroundColor: "#FF8A8A",
            borderRadius: 12,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 8,
            marginBottom: 5
        },
        registerButtonDisabled: {
            backgroundColor: "#FFD4D4"
        },
        registerButtonText: {
            color: "#fff",
            fontSize: 16,
            fontWeight: "600",
            fontFamily: 'Lexend_400Regular',
            letterSpacing: 0.5
        },
        divider: {
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 24
        },
        dividerLine: {
            flex: 1,
            height: 1,
            backgroundColor: "#e5e5e5"
        },
        dividerText: {
            marginHorizontal: 16,
            color: "#999",
            fontSize: 13,
            fontFamily: 'Lexend_400Regular'
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
        loginContainer: {
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 8
        },
        loginText: {
            color: "#666",
            fontSize: 14,
            fontFamily: 'Lexend_400Regular'
        },
        loginLink: {
            color: "#FF8A8A",
            fontSize: 14,
            fontWeight: "600",
            fontFamily: 'Lexend_400Regular'
        }
    });
};