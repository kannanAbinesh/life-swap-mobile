import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Switch } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

export default function MorePage() {
    const router = useRouter();
    const [pushNotifications, setPushNotifications] = useState(true);
    const [darkMode, setDarkMode] = useState(false);

    const logout = async () => {
        await AsyncStorage.removeItem("userToken");
        router.replace("/(auth)/login");
    };

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <View style={styles.profileCard}>
                    <View style={styles.avatarContainer}>
                        <Image source={{ uri: 'https://ichef.bbci.co.uk/ace/standard/3840/cpsprodpb/3255/live/becce000-388c-11f0-ae03-09fcb5edc49f.jpg' }} style={styles.avatar} />
                    </View>
                    <View>
                        <Text style={styles.headerText}>Welcome 👋</Text>
                        <Text style={styles.profileName}>Cristiano ronaldo</Text>
                    </View>
                </View>
            </View>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent}>
                <View>
                    {/* Profile Card */}

                    {/* Account Settings Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Account Settings</Text>

                        <View style={styles.menuContainer}>
                            <TouchableOpacity
                                style={styles.menuItem}
                                onPress={() => router.push("/(tabs)/more/profile")}
                                activeOpacity={0.7}
                            >
                                <Text style={styles.menuText}>Edit profile</Text>
                                <Ionicons name="chevron-forward" size={20} color="#999" />
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.menuItem}
                                onPress={() => { }}
                                activeOpacity={0.7}
                            >
                                <Text style={styles.menuText}>Change password</Text>
                                <Ionicons name="chevron-forward" size={20} color="#999" />
                            </TouchableOpacity>

                            <View style={styles.specialMenuItem}>
                                <Text style={styles.menuText}>Push notifications</Text>
                                <Switch
                                    value={pushNotifications}
                                    onValueChange={setPushNotifications}
                                    trackColor={{ false: "#E0E0E0", true: "#FF4D67" }}
                                    thumbColor="#fff"
                                    ios_backgroundColor="#E0E0E0"
                                />
                            </View>

                            <View style={styles.specialMenuItem}>
                                <Text style={styles.menuText}>Dark mode</Text>
                                <Switch
                                    value={darkMode}
                                    onValueChange={setDarkMode}
                                    trackColor={{ false: "#E0E0E0", true: "#FF4D67" }}
                                    thumbColor="#fff"
                                    ios_backgroundColor="#E0E0E0"
                                />
                            </View>
                        </View>
                    </View>

                    {/* More Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>More</Text>

                        <View style={styles.menuContainer}>
                            <TouchableOpacity
                                style={styles.menuItem}
                                onPress={() => { }}
                                activeOpacity={0.7}
                            >
                                <Text style={styles.menuText}>About us</Text>
                                <Ionicons name="chevron-forward" size={20} color="#999" />
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.menuItem, styles.lastMenuItem]}
                                onPress={() => router.push("/(tabs)/more/privacy-and-policy")}
                                activeOpacity={0.7}
                            >
                                <Text style={styles.menuText}>Privacy policy</Text>
                                <Ionicons name="chevron-forward" size={20} color="#999" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Logout Button */}
                    <TouchableOpacity
                        style={styles.logoutButton}
                        onPress={logout}
                        activeOpacity={0.8}
                    >
                        <Ionicons name="log-out-outline" size={20} color="#fff" />
                        <Text style={styles.logoutText}>Logout</Text>
                    </TouchableOpacity>

                    {/* Bottom Spacing */}
                    <View style={{ height: 100 }} />
                </View>
            </ScrollView>
        </View>
    );
}

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