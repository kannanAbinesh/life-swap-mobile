import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { connect } from 'react-redux';
import { useTheme } from '../Theme/ThemeContext';
import { baseURL } from '../../config';

function Home(props) {
    const { userDetails } = props;
    const insets = useSafeAreaInsets();
    const { isDark } = useTheme();
    const styles = createStyles(isDark);

    // Get greeting based on time
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good Morning";
        if (hour < 18) return "Good Afternoon";
        return "Good Evening";
    };

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <Text style={styles.greeting}>Hi 👋</Text>
                    <Text style={styles.userName}>{userDetails?.name || 'Guest'}</Text>
                </View>
                <TouchableOpacity style={styles.profileButton} activeOpacity={0.8}>
                    {userDetails?.profilePicture ? (
                        <Image 
                            source={{ uri: `${baseURL}uploads/profilePicture/${userDetails?.profilePicture}` }} 
                            style={styles.profileImage} 
                        />
                    ) : (
                        <View style={styles.profileImagePlaceholder}>
                            <Ionicons name="person" size={24} color="#fff" />
                        </View>
                    )}
                </TouchableOpacity>
            </View>

            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Empty state message */}
                <View style={styles.emptyState}>
                    <Ionicons 
                        name="rocket-outline" 
                        size={80} 
                        color={isDark ? "#3a3a5a" : "#e0e0e0"} 
                    />
                    <Text style={styles.emptyTitle}>Welcome to Habits!</Text>
                    <Text style={styles.emptyDescription}>
                        Start building better habits today. Your journey begins here.
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
}

const createStyles = (isDark) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: isDark ? "#171D37" : "#F8F9FA",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    headerLeft: {
        flex: 1,
        marginRight: 12,
    },
    greeting: {
        fontSize: 24,
        fontWeight: "bold",
        color: isDark ? "#ffffff" : "#1a1a1a",
        fontFamily: 'Lexend_700Bold',
    },
    userName: {
        fontSize: 16,
        color: isDark ? "#b0b0b0" : "#666",
        marginTop: 4,
        fontFamily: 'Lexend_500Medium',
    },
    aboutMe: {
        fontSize: 13,
        color: isDark ? "#808080" : "#999",
        marginTop: 4,
        fontFamily: 'Lexend_400Regular',
    },
    profileButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: isDark ? "#FF4D67" : "#FF6B7A",
    },
    profileImage: {
        width: '100%',
        height: '100%',
    },
    profileImagePlaceholder: {
        width: '100%',
        height: '100%',
        backgroundColor: isDark ? "#FF4D67" : "#FF6B7A",
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
        paddingVertical: 60,
    },
    emptyTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: isDark ? "#ffffff" : "#1a1a1a",
        marginTop: 24,
        marginBottom: 12,
        fontFamily: 'Lexend_700Bold',
        textAlign: 'center',
    },
    emptyDescription: {
        fontSize: 16,
        color: isDark ? "#b0b0b0" : "#666",
        textAlign: 'center',
        lineHeight: 24,
        fontFamily: 'Lexend_400Regular',
    },
});

const mapState = state => ({
    userDetails: state?.userDetails
});

export default connect(mapState, null)(Home);