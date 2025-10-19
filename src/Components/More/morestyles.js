/* Plugins. */
import { StyleSheet } from "react-native";

export function createStyles(isDark) {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: !isDark ? "#F5F5F5" : "#171D37",
        },
        headerContainer: {
            backgroundColor: "#FF4D67",
            paddingTop: 45,
            paddingBottom: 20,
            paddingHorizontal: 25,
            flexDirection: "row",
            alignItems: "center",
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15
        },
        headerTitle: {
            fontSize: 24,
            color: "#fff",
            fontFamily: 'Lexend_400Regular'
        },
        scrollView: {
            flex: 1,
            borderTopLeftRadius: 12,
            paddingTop: 20
        },
        contentCard: {
            marginBottom: 24
        },
        cardTitle: {
            fontSize: 13,
            color: "#999",
            marginBottom: 12,
            fontFamily: 'Lexend_400Regular',
            paddingHorizontal: 16,
            textTransform: "capitalize"
        },
        menuContainer: {
            backgroundColor: !isDark ? "#FFFFFF" : "#171D37",
            marginHorizontal: 16,
            borderRadius: 12,
            overflow: "hidden",
            shadowColor:  isDark ? "#F0F0F0" : "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.05,
            shadowRadius: 8,
            elevation: 2
        },
        menuItem: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingVertical: 16,
            paddingHorizontal: 16,
            borderBottomWidth: 1,
            borderBottomColor: isDark ? "#4d4c4cff" : "#F0F0F0",
            backgroundColor: !isDark ? "#FFFFFF" : "#171D37"
        },
        lastMenuItem: {
            borderBottomColor: "transparent"
        },
        switchBtnMenuItem: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingVertical: 7,
            paddingHorizontal: 16,
            borderBottomWidth: 1,
            borderBottomColor: isDark ? "#4d4c4cff" : "#F0F0F0",
            backgroundColor: !isDark ? "#FFFFFF" : "#171D37"
        },
        menuText: {
            fontSize: 15,
            color: !isDark ? '#1a1a1a' : "#fff",
            fontWeight: "400",
            fontFamily: 'Lexend_400Regular'
        },
        logoutButton: {
            backgroundColor: "#FF4D67",
            marginHorizontal: 16,
            marginTop: 12,
            marginBottom: 50,
            paddingVertical: 16,
            borderRadius: 12,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 3
        },
        logoutText: {
            color: "#fff",
            fontSize: 16,
            fontWeight: "600",
            marginLeft: 8,
            fontFamily: 'Lexend_400Regular'
        },
    });
};