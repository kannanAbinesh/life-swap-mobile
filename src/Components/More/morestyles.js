/* Plugins. */
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F5F5",
    },
    header: {
        backgroundColor: "#FF4D67",
        paddingTop: 45,
        paddingBottom: 20,
        paddingHorizontal: 15,
        flexDirection: "row",
        alignItems: "center",
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15
    },
    headerTitle: {
        fontSize: 24,
        color: "#fff",
        marginLeft: 12,
        fontFamily: 'Lexend_400Regular',
    },
    scrollView: {
        flex: 1,
        borderTopLeftRadius: 12,
        marginTop: 20,
    },
    profileCard: {
        flexDirection: "row",
        alignItems: "flex-end",
    },
    avatarContainer: {
        marginRight: 10,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: "#E0E0E0",
    },
    headerText: {
        fontSize: 21,
        color: '#ffffff'
    },
    profileName: {
        fontSize: 16,
        fontWeight: "600",
        color: "#fff",
        fontFamily: 'Lexend_400Regular',
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 13,
        color: "#999",
        marginBottom: 12,
        fontFamily: 'Lexend_400Regular',
        paddingHorizontal: 16,
        textTransform: "capitalize",
    },
    menuContainer: {
        backgroundColor: "#fff",
        marginHorizontal: 16,
        borderRadius: 12,
        overflow: "hidden",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    menuItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 16,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#F0F0F0",
        backgroundColor: "#fff",
    },
    specialMenuItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 7,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#F0F0F0",
        backgroundColor: "#fff",
    },
    lastMenuItem: {
        borderBottomWidth: 0,
    },
    menuText: {
        fontSize: 15,
        color: "#1a1a1a",
        fontWeight: "400",
        fontFamily: 'Lexend_400Regular',
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
        elevation: 3,
    },
    logoutText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
        marginLeft: 8,
        fontFamily: 'Lexend_400Regular',
    },
});

export default styles;