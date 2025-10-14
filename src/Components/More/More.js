/* Plugins. */
import { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, Switch } from "react-native";
import { connect } from "react-redux";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

/* Styles. */
import styles from "./morestyles";

function More({ userDetails }) {

    /* State declarations. */
    const [pushNotifications, setPushNotifications] = useState(true);
    const [darkMode, setDarkMode] = useState(false);

    /* Hooks declarations. */
    const router = useRouter();

    /* Logout fucntionality. */
    const logout = async () => {
        await AsyncStorage.removeItem("id_token");
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
                        <Text style={styles.headerText}>Hi 👋</Text>
                        <Text style={styles.profileName}>Cristiano ronaldo</Text>
                    </View>
                </View>
            </View>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent}>
                <View>

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
                                onPress={() => router.push("/(tabs)/more/change-password")}
                                activeOpacity={0.7}
                            >
                                <Text style={styles.menuText}>Change password</Text>
                                <Ionicons name="chevron-forward" size={20} color="#999" />
                            </TouchableOpacity>

                            <View style={styles.specialMenuItem}>
                                <Text style={styles.menuText}>Notifications</Text>
                                <Switch
                                    value={userDetails?.enableNotification}
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

                    {/* Habits Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Habits</Text>

                        <View style={styles.menuContainer}>
                            <TouchableOpacity
                                style={styles.menuItem}
                                onPress={() => router.push("/(tabs)/more/profile")}
                                activeOpacity={0.7}
                            >
                                <Text style={styles.menuText}>Adopted habits</Text>
                                <Ionicons name="chevron-forward" size={20} color="#999" />
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.menuItem}
                                onPress={() => router.push("/(tabs)/more/change-password")}
                                activeOpacity={0.7}
                            >
                                <Text style={styles.menuText}>Your habits</Text>
                                <Ionicons name="chevron-forward" size={20} color="#999" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* More Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>More</Text>

                        <View style={styles.menuContainer}>
                            <TouchableOpacity
                                style={styles.menuItem}
                                onPress={() => router.push("/(tabs)/more/about-us")}
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
                    <TouchableOpacity style={styles.logoutButton} onPress={logout} activeOpacity={0.8} >
                        <Ionicons name="log-out-outline" size={20} color="#fff" />
                        <Text style={styles.logoutText}>Logout</Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>
        </View>
    );
};

const mapState = state => ({
    userDetails: state?.userDetails
});

export default connect(mapState)(More);