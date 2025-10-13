/* Plugins. */
import { StyleSheet, Dimensions } from "react-native";

/* Varaibles. */
const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FF8A8A",
    },
    scrollContainer: {
        flexGrow: 1,
    },
    content: {
        flex: 1,
        paddingTop: height * 0.25,
        paddingHorizontal: 0,
    },
    whiteContainer: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        paddingHorizontal: 32,
        paddingTop: 40,
        paddingBottom: 40,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 8,
    },
    header: {
        marginBottom: 32,
    },
    title: {
        fontSize: 32,
        color: "#1a1a1a",
        fontFamily: 'Lexend_700Bold',
        marginBottom: 0,
    },
    inputContainer: {
        marginBottom: 20,
    },
    passwordInputContainer: {
        marginBottom: 9
    },
    label: {
        fontSize: 14,
        color: "#333",
        marginBottom: 8,
        fontFamily: 'Lexend_500Medium',
    },
    inputWrapper: {
        position: 'relative',
    },
    inputIcon: {
        position: 'absolute',
        left: 16,
        top: 16,
        zIndex: 1,
    },
    input: {
        height: 52,
        backgroundColor: "#fff",
        fontFamily: 'Lexend_400Regular',
        borderRadius: 8,
        paddingLeft: 44,
        paddingRight: 16,
        fontSize: 15,
        color: "#1a1a1a",
        borderWidth: 1,
        borderColor: "#FFB5B5",
    },
    inputFocused: {
        borderColor: "#FF8A8A",
    },
    inputError: {
        borderColor: "#FF3B30",
    },
    errorText: {
        color: "#FF3B30",
        fontSize: 12,
        marginTop: 4,
        fontFamily: 'Lexend_400Regular',
    },
    passwordInputWrapper: {
        position: 'relative',
    },
    eyeIcon: {
        position: 'absolute',
        right: 16,
        top: 16,
        zIndex: 1,
    },
    // Options row with Remember Me and Forgot Password
    optionsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 28,
    },
    rememberMeContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 4,
        borderWidth: 1.5,
        borderColor: "#FF8A8A",
        marginRight: 8,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    checkboxChecked: {
        backgroundColor: "#FF8A8A",
        borderColor: "#FF8A8A",
    },
    checkIcon: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "bold",
    },
    rememberMeText: {
        fontSize: 14,
        color: "#333",
        fontFamily: 'Lexend_400Regular',
    },
    forgotPassword: {
        padding: 4,
    },
    forgotPasswordText: {
        color: "#FF8A8A",
        fontSize: 15,
        fontFamily: 'Lexend_400Regular'
    },
    loginButton: {
        height: 54,
        backgroundColor: "#FF8A8A",
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 5,
    },
    loginButtonDisabled: {
        backgroundColor: "#FFD4D4",
    },
    loginButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
        fontFamily: 'Lexend_600SemiBold',
        letterSpacing: 0.5,
    },
    registerContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 8,
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
    },
    // Add these styles to your existing styles object in loginStyles.js

    // Divider with OR text
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 24,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#E5E5E5',
    },
    dividerText: {
        marginHorizontal: 16,
        fontSize: 13,
        color: '#999',
        fontFamily: 'Lexend_500Medium',
        letterSpacing: 0.5,
    },
    googleButton: {
        height: 50,
        backgroundColor: '#FFFFFF',
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
        alignSelf: 'center',
    },
    googleIcon: {
        width: 22,
        height: 22,
        marginRight: 12,
    },
    googleButtonText: {
        color: '#333',
        fontSize: 15,
        fontWeight: '600',
        fontFamily: 'Lexend_400Regular',
        letterSpacing: 0.3,
    },
});

export default styles;