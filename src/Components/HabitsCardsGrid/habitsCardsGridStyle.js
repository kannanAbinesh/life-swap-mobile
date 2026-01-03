/* Plugins. */
import { Dimensions, StyleSheet } from "react-native";

/* Variable declaration */
const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;

export function createStyles(isDark) {
    return StyleSheet.create({
        habitsCardsGrid: {
            flex: 1
        },

        habitsCardContainer: {
            padding: 16,
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
        },

        habitsCardWrapper: {
            width: CARD_WIDTH,
            marginBottom: 16,
        },

        habitCard: {
            width: '100%',
            backgroundColor: isDark ? "#171D37" : "#f8f9fa",
            borderRadius: 16,
            shadowColor: !isDark ? "#000" : "#fff",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 3,
            overflow: 'hidden',
        },

        habitCardImageWrapper: {
            position: 'relative',
            height: 140,
            width: '100%',
        },

        habitCardImage: {
            width: '100%',
            height: '100%'
        },

        habitsCardsEmptyImageContainer: {
            width: '100%',
            height: '100%',
            backgroundColor: isDark ? '#3a3a3a' : '#f0f0f0',
            justifyContent: 'center',
            alignItems: 'center'
        },

        habitsCardsLifeStyleWrapper: {
            position: 'absolute',
            top: 8,
            left: 8,
            backgroundColor: '#FF4D67',
            paddingHorizontal: 10,
            paddingVertical: 4,
            borderRadius: 12
        },

        habitsCardsLifeStyle: {
            color: '#fff',
            fontSize: 10,
            fontWeight: '600',
            textTransform: 'capitalize',
            fontFamily: 'Lexend_400Regular'
        },

        habitsCardDeleteBtn: {
            position: 'absolute',
            top: 8,
            right: 8,
            backgroundColor: 'rgba(255, 77, 103, 0.9)',
            width: 32,
            height: 32,
            borderRadius: 16,
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 4
        },

        habitCardInfoContainer: {
            padding: 12
        },

        habitCardUserInfo: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 8,
            gap: 6
        },

        habitCardUserImageWrapper: {
            width: 20,
            height: 20,
            borderRadius: 10,
            overflow: 'hidden',
            backgroundColor: isDark ? '#2a2a2a' : '#e0e0e0'
        },

        habitCardUserImage: {
            width: '100%',
            height: '100%'
        },

        habitCardUserImagePlaceholder: {
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: isDark ? '#2a2a2a' : '#e0e0e0'
        },

        habitCardUserName: {
            fontSize: 11,
            color: isDark ? '#aaa' : '#666',
            fontFamily: 'Lexend_400Regular',
            flex: 1
        },

        habitCardHeader: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: 6
        },

        habitCardName: {
            fontSize: 16,
            fontWeight: '600',
            color: isDark ? '#fff' : '#333',
            flex: 1,
            fontFamily: 'Lexend_500Medium'
        },

        habitCardDescription: {
            fontSize: 12,
            color: isDark ? '#999' : '#666',
            marginBottom: 10,
            lineHeight: 16,
            fontFamily: 'Lexend_400Regular'
        },

        habitCardFooter: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
        },

        habitCardTimeContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 4
        },

        habitCardTimeDuration: {
            fontSize: 11,
            color: isDark ? '#999' : '#666',
            fontFamily: 'Lexend_400Regular'
        },

        habitCardImagesCount: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 4
        },

        habitCardImagesCountText: {
            fontSize: 11,
            color: isDark ? '#999' : '#666',
            fontFamily: 'Lexend_400Regular'
        }
    })
};