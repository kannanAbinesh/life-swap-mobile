import { Platform, StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FF8A8A",
    },
    // Curved topographic background
    curvedBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: height * 0.35,
        backgroundColor: "#FF8A8A",
        overflow: 'hidden',
    },
    // Topographic wave layers
    wave1: {
        position: 'absolute',
        width: width * 2,
        height: 300,
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        borderRadius: 500,
        top: -150,
        left: -width * 0.5,
    },
    wave2: {
        position: 'absolute',
        width: width * 1.8,
        height: 280,
        backgroundColor: 'rgba(255, 255, 255, 0.06)',
        borderRadius: 450,
        top: -120,
        left: -width * 0.4,
    },
    wave3: {
        position: 'absolute',
        width: width * 1.6,
        height: 250,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 400,
        top: -80,
        right: -width * 0.3,
    },
    wave4: {
        position: 'absolute',
        width: 200,
        height: 200,
        backgroundColor: 'rgba(255, 255, 255, 0.07)',
        borderRadius: 100,
        bottom: 50,
        right: 30,
    },
    wave5: {
        position: 'absolute',
        width: 150,
        height: 150,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 75,
        bottom: 100,
        left: 50,
    },
    scrollContainer: {
        flexGrow: 1,
    },
    content: {
        flex: 1,
        paddingTop: height * 0.18,
        paddingHorizontal: 0,
    },
    // White container with rounded top corners
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
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 15,
        color: "#666",
        fontFamily: 'Lexend_400Regular',
    },
    form: {
        flex: 1,
    },
    inputContainer: {
        marginBottom: 16,
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
    registerButton: {
        height: 54,
        backgroundColor: "#FF8A8A",
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 8,
        marginBottom: 5,
    },
    registerButtonDisabled: {
        backgroundColor: "#FFD4D4",
    },
    registerButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
        fontFamily: 'Lexend_400Regular',
        letterSpacing: 0.5,
    },
    divider: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 24,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: "#e5e5e5",
    },
    dividerText: {
        marginHorizontal: 16,
        color: "#999",
        fontSize: 13,
        fontFamily: 'Lexend_400Regular'
    },
    socialButtonsContainer: {
        gap: 12,
        marginBottom: 24,
    },
    socialButton: {
        height: 52,
        backgroundColor: "#fff",
        borderRadius: 12,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#FFB5B5",
    },
    socialButtonGoogle: {
        borderColor: "#FFB5B5",
    },
    socialButtonFacebook: {
        borderColor: "#FFB5B5",
    },
    socialIconText: {
        fontSize: 20,
        marginRight: 8,
    },
    socialButtonText: {
        fontSize: 15,
        fontFamily: 'Lexend_400Regular',
        color: "#666"
    },
    socialButtonTextGoogle: {
        color: "#666"
    },
    socialButtonTextFacebook: {
        color: "#666"
    },
    loginContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 8,
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