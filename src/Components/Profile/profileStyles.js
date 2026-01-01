/* Plugins. */
import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get('window');

export function createStyles(isDark) {
    return StyleSheet.create({
        mainContainer: {
            flex: 1,
            backgroundColor: isDark ? "#171D37" : "#f8f9fa"
        },
        container: {
            flex: 1,
            backgroundColor: isDark ? "#171D37" : "#f8f9fa"
        },

        /* Enhanced Profile Image Section */
        profileImageWrapper: {
            alignItems: 'center',
            marginTop: 25,
            marginBottom: 24,
        },
        imageOuterContainer: {
            alignItems: 'center',
        },
        imageContainer: {
            position: 'relative',
            shadowColor: '#FF4D67',
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.3,
            shadowRadius: 16,
            elevation: 10,
        },
        profileImage: {
            width: 120,
            height: 120,
            borderRadius: 60,
            borderWidth: 5,
            borderColor: '#fff',
        },
        imagePlaceholder: {
            width: 120,
            height: 120,
            borderRadius: 60,
            borderWidth: 5,
            borderColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
        },
        cameraButton: {
            position: 'absolute',
            bottom: 2,
            right: 2,
            borderRadius: 20,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 6,
            elevation: 8,
        },
        cameraButtonGradient: {
            width: 40,
            height: 40,
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 3,
            borderColor: '#fff',
        },
        uploadingBadge: {
            marginTop: 12,
            paddingHorizontal: 16,
            paddingVertical: 6,
            backgroundColor: 'rgba(255, 77, 103, 0.1)',
            borderRadius: 20,
            borderWidth: 1,
            borderColor: 'rgba(255, 77, 103, 0.3)',
        },
        uploadingText: {
            color: '#FF4D67',
            fontSize: 12,
            fontFamily: 'Lexend_500Medium',
        },

        /* Scroll View */
        scrollView: {
            flex: 1,
        },
        scrollContent: {
            flexGrow: 1,
            paddingBottom: 80,
        },

        /* Form Container */
        formContainer: {
            flex: 1,
            paddingHorizontal: 20,
        },

        /* Enhanced Input Styles */
        inputContainer: {
            marginBottom: 20,
        },
        label: {
            fontSize: 14,
            color: isDark ? "#e0e0e0" : "#2c3e50",
            marginBottom: 10,
            fontFamily: 'Lexend_600SemiBold',
            marginLeft: 4,
            letterSpacing: 0.3,
        },
        inputWrapper: {
            position: 'relative',
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: isDark ? '#1F2937' : "#fff",
            borderRadius: 16,
            borderWidth: 2,
            borderColor: isDark ? '#374151' : "#f0f0f0",
            shadowColor: isDark ? 'transparent' : '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.05,
            shadowRadius: 8,
            elevation: 2,
            overflow: 'hidden',
        },
        inputError: {
            borderColor: '#FF4D67',
        },
        iconContainer: {
            width: 50,
            height: 56,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: isDark ? 'rgba(255, 107, 122, 0.15)' : 'rgba(255, 107, 122, 0.08)',
        },
        input: {
            flex: 1,
            height: 56,
            fontSize: 15,
            color: isDark ? "#fff" : '#1a1a1a',
            fontFamily: 'Lexend_400Regular',
            paddingHorizontal: 16,
        },
        inputDisabled: {
            opacity: 0.6,
            backgroundColor: isDark ? '#151a27' : "#f8f9fa",
            color: isDark ? '#888' : '#666',
        },
        lockIcon: {
            position: 'absolute',
            right: 16,
            top: 20,
        },
        chevronIcon: {
            position: 'absolute',
            right: 16,
            top: 18,
        },
        dateText: {
            paddingTop: 0,
            paddingBottom: 0,
            lineHeight: 56,
        },
        errorContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 8,
            marginLeft: 4,
        },
        errorText: {
            color: "#FF4D67",
            fontSize: 12,
            marginLeft: 6,
            fontFamily: 'Lexend_400Regular',
        },

        /* Enhanced Textarea Styles */
        textareaWrapper: {
            position: 'relative',
            flexDirection: 'row',
            backgroundColor: isDark ? '#1F2937' : "#fff",
            borderRadius: 16,
            borderWidth: 2,
            borderColor: isDark ? '#374151' : "#f0f0f0",
            minHeight: 140,
            shadowColor: isDark ? 'transparent' : '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.05,
            shadowRadius: 8,
            elevation: 2,
            overflow: 'hidden',
        },
        textareaIconContainer: {
            width: 50,
            paddingTop: 18,
            alignItems: 'center',
            backgroundColor: isDark ? 'rgba(255, 107, 122, 0.15)' : 'rgba(255, 107, 122, 0.08)',
        },
        textarea: {
            flex: 1,
            fontSize: 15,
            color: isDark ? "#fff" : '#1a1a1a',
            fontFamily: 'Lexend_400Regular',
            textAlignVertical: 'top',
            paddingHorizontal: 16,
            paddingVertical: 16,
            minHeight: 120,
        },

        /* Enhanced Save Button */
        saveButton: {
            marginTop: 32,
            marginBottom: 40,
            borderRadius: 16,
            overflow: 'hidden',
            shadowColor: '#FF4D67',
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.4,
            shadowRadius: 12,
            elevation: 8,
        },
        saveButtonGradient: {
            height: 58,
            flexDirection: 'row',
            justifyContent: "center",
            alignItems: "center",
        },
        saveButtonText: {
            color: "#fff",
            fontSize: 16,
            fontFamily: 'Lexend_600SemiBold',
            letterSpacing: 0.5,
        },
    });
}