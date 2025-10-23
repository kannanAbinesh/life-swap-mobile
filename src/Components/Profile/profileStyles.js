/* Plugins. */
import { StyleSheet, Dimensions } from "react-native";

export function createStyles(isDark) {
    return StyleSheet.create({
        mainContainer: {
            flex: 1
        },
        container: {
            flex: 1,
            backgroundColor: '#FF4D67'
        },

        /* Header Section */
        headerSection: {
            backgroundColor: '#FF4D67',
            paddingTop: 50,
            paddingBottom: 30,
            paddingHorizontal: 20,
            alignItems: 'center',
        },
        backButton: {
            position: 'absolute',
            left: 20,
            top: 50,
            width: 40,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 10,
        },
        profileImageSection: {
            alignItems: 'center',
            marginTop: 20,
        },
        imageContainer: {
            position: 'relative',
            marginBottom: 16,
        },
        profileImage: {
            width: 80,
            height: 80,
            borderRadius: 40,
            borderWidth: 3,
            borderColor: '#fff',
        },
        imagePlaceholder: {
            width: 80,
            height: 80,
            borderRadius: 40,
            backgroundColor: '#FFB5B5',
            borderWidth: 3,
            borderColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
        },
        cameraButton: {
            position: 'absolute',
            bottom: 0,
            right: 0,
            backgroundColor: '#FF4D67',
            width: 30,
            height: 30,
            borderRadius: 15,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 2,
            borderColor: '#fff',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
        },
        profileTitle: {
            fontSize: 20,
            color: '#fff',
            fontFamily: 'Lexend_600SemiBold',
            letterSpacing: 0.5,
        },

        /* Fixed Border Radius Container */
        borderRadiusContainer: {
            position: 'absolute',
            top: 200,
            left: 0,
            right: 0,
            height: 32,
            backgroundColor: !isDark ? "#ffffff" : '#171D37',
            borderTopLeftRadius: 32,
            borderTopRightRadius: 32,
            zIndex: 1,
        },

        /* Scroll View */
        scrollView: {
            flex: 1,
        },
        scrollContent: {
            flexGrow: 1,
        },

        /* Form Container */
        formContainer: {
            flex: 1,
            backgroundColor: !isDark ? "#ffffff" : '#171D37',
            paddingHorizontal: 24,
            paddingTop: 32,
            paddingBottom: 40,
        },

        /* Input Styles */
        inputContainer: {
            marginBottom: 20,
        },
        label: {
            fontSize: 14,
            color: !isDark ? "#333" : "#9a9999ff",
            marginBottom: 8,
            fontFamily: 'Lexend_500Medium',
            marginLeft: 4,
        },
        inputWrapper: {
            position: 'relative',
            flexDirection: 'row',
            alignItems: 'center',
        },
        inputIcon: {
            position: 'absolute',
            left: 16,
            top: 16,
            zIndex: 1,
        },
        input: {
            flex: 1,
            height: 52,
            backgroundColor: !isDark ? "#fff" : '#252B47',
            fontFamily: 'Lexend_400Regular',
            borderRadius: 8,
            paddingLeft: 44,
            paddingRight: 16,
            fontSize: 15,
            color: !isDark ? '#1a1a1a' : "#fff",
            borderWidth: 1,
            borderColor: "#FFB5B5",
        },
        inputDisabled: {
            opacity: 0.6,
            backgroundColor: !isDark ? "#f5f5f5" : '#1a1f35',
        },
        dateText: {
            paddingTop: 16,
            paddingBottom: 16,
        },
        errorText: {
            color: "#f57e78ff",
            fontSize: 12,
            marginTop: 4,
            marginLeft: 4,
            fontFamily: 'Lexend_400Regular',
        },

        /* Textarea Styles */
        textareaWrapper: {
            position: 'relative',
            backgroundColor: !isDark ? "#fff" : '#252B47',
            borderRadius: 8,
            borderWidth: 1,
            borderColor: "#FFB5B5",
            paddingLeft: 44,
            paddingRight: 16,
            paddingTop: 1,
            paddingBottom: 12,
            minHeight: 120,
        },
        textareaIcon: {
            position: 'absolute',
            left: 16,
            top: 16,
            zIndex: 1,
        },
        textarea: {
            fontSize: 15,
            color: !isDark ? '#1a1a1a' : "#fff",
            fontFamily: 'Lexend_400Regular',
            textAlignVertical: 'top',
            minHeight: 100,
        },

        /* Save Button */
        saveButton: {
            marginTop: 15,
            height: 54,
            backgroundColor: "#FF4D67",
            borderRadius: 12,
            justifyContent: "center",
            alignItems: "center",
            shadowColor: '#FF4D67',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 6,
            elevation: 4,
        },
        saveButtonText: {
            color: "#fff",
            fontSize: 16,
            fontWeight: "600",
            fontFamily: 'Lexend_600SemiBold',
            letterSpacing: 0.5,
        },
    });
}