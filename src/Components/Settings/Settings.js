/* Plugins. */
import { View, Text, ScrollView, TouchableOpacity, Switch } from "react-native";
import { connect } from "react-redux";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

/* Helpers. */
import { useTheme } from "../Theme/ThemeContext";

/* Styles. */
import { createStyles } from "./morestyles";

function Settings(props) {

    /* Props. */
    const { userDetails } = props;

    /* Hooks declarations. */
    const router = useRouter();
    const { isDark, toggleTheme } = useTheme();

    /* Variable declarations. */
    const styles = createStyles(isDark);

    /* Logout fucntionality. */
    const logout = async () => {
        await AsyncStorage.removeItem("id_token");
        router.replace("/(auth)/login");
    };

    return (
        <View style={styles.container}>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <View>

                    <View style={styles.contentCard}>
                        <Text style={styles.cardTitle}>Account Settings</Text>
                        <View style={styles.menuContainer}>

                            {/* Profile. */}
                            <TouchableOpacity style={styles.menuItem} onPress={() => router.push("/(tabs)/settings/profile")} activeOpacity={0.7}>
                                <Text style={styles.menuText}>Edit profile</Text>
                                <Ionicons name="chevron-forward" size={20} color="#999" />
                            </TouchableOpacity>

                            {/* Change password. */}
                            <TouchableOpacity style={styles.menuItem} onPress={() => router.push("/(tabs)/settings/change-password")} activeOpacity={0.7}>
                                <Text style={styles.menuText}>Change password</Text>
                                <Ionicons name="chevron-forward" size={20} color="#999" />
                            </TouchableOpacity>

                            {/* Notifications. */}
                            <View style={styles.switchBtnMenuItem}>
                                <Text style={styles.menuText}>Notifications</Text>
                                <Switch
                                    value={userDetails?.enableNotification}
                                    onValueChange={() => { }}
                                    trackColor={{ false: "#E0E0E0", true: "#FF4D67" }}
                                    thumbColor="#fff"
                                    ios_backgroundColor="#E0E0E0"
                                />
                            </View>

                            {/* Theme. */}
                            <View style={[styles.switchBtnMenuItem, styles?.lastMenuItem]}>
                                <Text style={styles.menuText}>Dark mode</Text>
                                <Switch
                                    value={isDark}
                                    onValueChange={(value) => toggleTheme(value)}
                                    trackColor={{ false: "#E0E0E0", true: "#FF4D67" }}
                                    thumbColor="#fff"
                                    ios_backgroundColor="#E0E0E0"
                                />
                            </View>
                        </View>
                    </View>

                    {/* Habits contentCard. */}
                    <View style={styles.contentCard}>
                        <Text style={styles.cardTitle}>Habits</Text>

                        <View style={styles.menuContainer}>

                            {/* Your habits. */}
                            <TouchableOpacity style={styles.menuItem} onPress={() => router.push("/(tabs)/settings/your-habits")} activeOpacity={0.7}>
                                <Text style={styles.menuText}>Your habits</Text>
                                <Ionicons name="chevron-forward" size={20} color="#999" />
                            </TouchableOpacity>

                            {/* Adopted habits. */}
                            <TouchableOpacity style={[styles.menuItem, styles?.lastMenuItem]} onPress={() => router.push("/(tabs)/settings/adopted-habits")} activeOpacity={0.7}>
                                <Text style={styles.menuText}>Adopted habits</Text>
                                <Ionicons name="chevron-forward" size={20} color="#999" />
                            </TouchableOpacity>

                        </View>
                    </View>

                    {/* More Section */}
                    <View style={styles.contentCard}>
                        <Text style={styles.cardTitle}>More</Text>
                        <View style={styles.menuContainer}>

                            {/* About us. */}
                            <TouchableOpacity style={styles.menuItem} onPress={() => router.push("/(tabs)/settings/about-us")} activeOpacity={0.7}>
                                <Text style={styles.menuText}>About us</Text>
                                <Ionicons name="chevron-forward" size={20} color="#999" />
                            </TouchableOpacity>

                            {/* Privacy and policy. */}
                            <TouchableOpacity style={[styles.menuItem, styles?.lastMenuItem]} onPress={() => router.push("/(tabs)/settings/privacy-and-policy")} activeOpacity={0.7}>
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

export default connect(mapState)(Settings);