import React from 'react';
import { BaseToast, ErrorToast } from 'react-native-toast-message';

const FONT_FAMILY_REGULAR = 'Lexend_400Regular';
const FONT_FAMILY_BOLD = 'Lexend_700Bold';

export const toastConfig = {
    success: (props) => (
        <BaseToast
            {...props}
            style={{ borderLeftColor: '#4CAF50', height: 65 }}
            contentContainerStyle={{ paddingHorizontal: 15 }}

            text1Style={{
                fontSize: 14,
                fontWeight: '700',
                fontFamily: FONT_FAMILY_BOLD,
                color: '#333',
            }}

            text2Style={{
                fontSize: 12,
                fontFamily: FONT_FAMILY_REGULAR,
                color: '#666',
            }}
            text2NumberOfLines={2}
        />
    ),

    error: (props) => (
        <ErrorToast
            {...props}
            style={{ borderLeftColor: '#D32F2F', height: 65 }}
            contentContainerStyle={{ paddingHorizontal: 15 }}

            text1Style={{
                fontSize: 14,
                fontWeight: '700',
                fontFamily: FONT_FAMILY_BOLD,
                color: '#D32F2F',
            }}

            text2Style={{
                fontSize: 12,
                fontFamily: FONT_FAMILY_REGULAR,
                color: '#666',
            }}
        />
    ),
};