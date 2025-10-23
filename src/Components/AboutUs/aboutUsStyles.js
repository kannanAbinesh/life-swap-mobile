/* Plugins. */
import { StyleSheet } from "react-native";

export function createStyles(isDark) {
    return StyleSheet.create({
        container: {
            backgroundColor: !isDark ? "#F8F9FA" : '#171D37',
            flex: 1,
        },
        headerSection: {
            backgroundColor: '#FF4D67',
            borderBottomLeftRadius: 40,
            borderBottomRightRadius: 40,
            paddingTop: 50,
            paddingBottom: 25,
            paddingHorizontal: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        headerTitle: {
            fontSize: 20,
            fontWeight: '600',
            color: '#fff',
            fontFamily: 'Lexend_400Regular',
        },
        navButton: {
            width: 40,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
        },
        scrollViewContainer: {
            backgroundColor: !isDark ? "#F8F9FA" : '#171D37',
            flex: 1
        },
        content: {
            padding: 20,
            paddingBottom: 40,
        },
        section: {
            marginBottom: 30,
        },
        sectionTitle: {
            fontSize: 20,
            fontWeight: '600',
            color: !isDark ? "#333" : '#fff',
            marginBottom: 15,
            fontFamily: 'Lexend_400Regular',
        },
        sectionText: {
            fontSize: 15,
            color: !isDark ? "#333" : '#bebebeff',
            lineHeight: 24,
            textAlign: 'justify',
            fontFamily: 'Lexend_400Regular',
        },
        featureCard: {
            backgroundColor: !isDark ? "#fff" : '#171D37',
            borderRadius: 16,
            marginBottom: 15,
            overflow: 'hidden',
            shadowColor: !isDark ? '#000' : "#fff",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
        },
        featureImage: {
            width: '100%',
            height: 150,
            backgroundColor: '#E0E0E0',
        },
        featureContent: {
            padding: 20,
        },
        featureIconContainer: {
            marginBottom: 10,
        },
        featureTitle: {
            fontSize: 16,
            fontWeight: '600',
            color: !isDark ? "#333" : '#bebebeff',
            marginBottom: 8,
            fontFamily: 'Lexend_400Regular',
        },
        featureText: {
            fontSize: 14,
            color: !isDark ? "#333" : '#828181ff',
            lineHeight: 20,
            fontFamily: 'Lexend_400Regular',
        },
        socialSection: {
            marginBottom: 30,
            paddingTop: 20,
            borderTopWidth: 1,
            borderTopColor: '#E0E0E0',
        },
        socialContainer: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            gap: 15,
        },
        socialButton: {
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: '#FF4D67',
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: '#FF4D67',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 6,
            elevation: 4,
        },
        versionContainer: {
            alignItems: 'center',

        },
        versionText: {
            fontSize: 12,
            color: '#999',
            marginBottom: 5,
            fontFamily: 'Lexend_400Regular',
        },
        copyrightText: {
            fontSize: 12,
            color: '#999',
            fontFamily: 'Lexend_400Regular',
        }
    })
};