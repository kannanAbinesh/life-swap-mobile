/* Plugins. */
import { StyleSheet } from "react-native";

export function createStyles(isDark) {
    return StyleSheet.create({
        yourHabitsContainer: {
            flex: 1,
            backgroundColor: isDark ? "#171D37" : "#f8f9fa"
        },
        
        /* Search bar styles. */
        yourHabitsSearchContainer: {
            paddingHorizontal: 16,
            paddingVertical: 16,
        },

        yourHabitsSearchInputWrapper: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: isDark ? "#171D37" : "#f8f9fa",
            borderRadius: 12,
            paddingHorizontal: 16,
            paddingVertical: 12,
            borderWidth: 1,
            borderColor: isDark ? '#4a4a4a' : '#e5e5e5',
        },

        yourHabitsSearchIcon: {
            marginRight: 10,
        },
        
        yourHabitsSearchInput: {
            flex: 1,
            fontSize: 15,
            color: isDark ? '#fff' : '#333',
            fontFamily: 'Lexend_400Regular',
            padding: 0,
        },
        
        yourHabitsClearButton: {
            padding: 4,
        },
        
        /* Add habits button style. */
        yourHabitsAddButton: {
            position: 'absolute',
            bottom: 30,
            right: 30,
            width: 50,
            height: 50,
            borderRadius: 30,
            backgroundColor: '#FF4D67',
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: '#FF4D67',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 10,
            zIndex: 2
        },





        modalOverlay: {
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            justifyContent: 'flex-end',
        },
        modalContent: {
            backgroundColor: isDark ? "#171D37" : "#f8f9fa",
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            maxHeight: '90%',
            paddingBottom: 20,
        },
        modalHeader: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 20,
            borderBottomWidth: 1,
            borderBottomColor: isDark ? '#3a3a3a' : '#f0f0f0',
        },
        modalTitle: {
            fontSize: 22,
            color: isDark ? '#fff' : '#333',
            fontFamily: 'Lexend_500Medium',
        },
        modalBody: {
            paddingHorizontal: 20,
        },
        label: {
            fontSize: 16,
            color: isDark ? '#fff' : '#333',
            marginBottom: 8,
            marginTop: 16,
            fontFamily: 'Lexend_400Regular',
        },
        imageScroll: {
            marginBottom: 8,
        },
        imagePreviewContainer: {
            position: 'relative',
            marginRight: 12,
            fontFamily: 'Lexend_400Regular',
        },
        imagePreview: {
            width: 100,
            height: 100,
            borderRadius: 12,
        },
        removeImageButton: {
            position: 'absolute',
            top: 4,
            right: 4,
            backgroundColor: '#FF4D67',
            borderRadius: 12,
            width: 24,
            height: 24,
            justifyContent: 'center',
            alignItems: 'center',
        },
        thumbnailButton: {
            position: 'absolute',
            bottom: 4,
            right: 4,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            borderRadius: 12,
            width: 24,
            height: 24,
            justifyContent: 'center',
            alignItems: 'center',
        },
        thumbnailButtonActive: {
            backgroundColor: '#FF4D67',
        },
        thumbnailBadge: {
            position: 'absolute',
            bottom: 4,
            left: 4,
            backgroundColor: '#FF4D67',
            paddingHorizontal: 8,
            paddingVertical: 3,
            borderRadius: 8,
        },
        thumbnailText: {
            color: '#fff',
            fontSize: 10,
            fontWeight: '600',
        },
        addImageButton: {
            width: 100,
            height: 100,
            borderRadius: 12,
            borderWidth: 2,
            borderColor: '#FF4D67',
            borderStyle: 'dashed',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: isDark ? "#171D37" : "#f8f9fa",
        },
        addImageText: {
            marginTop: 4,
            fontSize: 12,
            color: '#FF4D67',
            fontWeight: '600',
        },
        input: {
            backgroundColor: isDark ? "#171D37" : "#f8f9fa",
            borderRadius: 12,
            padding: 14,
            fontSize: 15,
            color: isDark ? '#fff' : '#333',
            borderWidth: 1,
            borderColor: isDark ? '#4a4a4a' : '#e0e0e0',
            fontFamily: 'Lexend_400Regular',
        },
        inputError: {
            borderColor: '#FF4D67',
        },
        textArea: {
            height: 80,
            textAlignVertical: 'top',
        },
        errorText: {
            color: '#FF4D67',
            fontSize: 12,
            marginTop: 4,
            marginLeft: 4,
        },
        radioGroup: {
            gap: 12,
        },
        radioOption: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 8,
        },
        radioCircle: {
            width: 22,
            height: 22,
            borderRadius: 11,
            borderWidth: 2,
            borderColor: isDark ? '#666' : '#ccc',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 12,
        },
        radioCircleSelected: {
            borderColor: '#FF4D67',
        },
        radioInner: {
            width: 12,
            height: 12,
            borderRadius: 6,
            backgroundColor: '#FF4D67',
        },
        radioLabel: {
            fontSize: 15,
            color: isDark ? '#fff' : '#333',
            textTransform: 'capitalize',
            fontFamily: 'Lexend_400Regular',
        },
        saveButton: {
            backgroundColor: '#FF4D67',
            margin: 20,
            marginTop: 10,
            paddingVertical: 16,
            borderRadius: 12,
            alignItems: 'center',
            shadowColor: '#FF4D67',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 4,
        },
        saveButtonDisabled: {
            opacity: 0.7,
        },
        saveButtonText: {
            color: '#fff',
            fontSize: 16,
            fontWeight: '600',
            fontFamily: 'Lexend_400Regular',
        },
        pickerOverlay: {
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
        },
        pickerContainer: {
            backgroundColor: isDark ? '#2a2a2a' : '#fff',
            borderRadius: 16,
            width: '100%',
            maxWidth: 400,
            overflow: 'hidden',
        },
        pickerOption: {
            flexDirection: 'row',
            alignItems: 'center',
            padding: 20,
            gap: 16,
        },
        pickerOptionText: {
            fontSize: 16,
            color: isDark ? '#fff' : '#333',
            fontWeight: '600',
        },
        pickerDivider: {
            height: 1,
            backgroundColor: isDark ? '#3a3a3a' : '#f0f0f0',
        },
    });
}