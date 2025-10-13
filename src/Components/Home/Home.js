import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Home() {
    const insets = useSafeAreaInsets();

    // Sample data - replace with real data later
    const myHabits = [
        { id: 1, name: "Morning Meditation", streak: 12, icon: "flower", color: "#FF6B9D", participants: 234 },
        { id: 2, name: "Read 30 Minutes", streak: 8, icon: "book", color: "#4ECDC4", participants: 567 },
        { id: 3, name: "Exercise", streak: 5, icon: "fitness", color: "#FFD93D", participants: 892 },
    ];

    const trendingHabits = [
        { id: 4, name: "Drink 8 Glasses of Water", creator: "Sarah M.", icon: "water", color: "#6BCF7F", participants: 1243 },
        { id: 5, name: "No Social Media Before Bed", creator: "Mike R.", icon: "phone-portrait", color: "#A78BFA", participants: 987 },
        { id: 6, name: "Learn Spanish 15 min/day", creator: "Carlos J.", icon: "language", color: "#FB923C", participants: 654 },
    ];

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            {/* Header */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.greeting}>Good Morning! 👋</Text>
                    <Text style={styles.userName}>Ready to build habits?</Text>
                </View>
                <TouchableOpacity style={styles.notificationButton}>
                    <Ionicons name="notifications-outline" size={24} color="#1a1a1a" />
                    <View style={styles.badge} />
                </TouchableOpacity>
            </View>

            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
            >
                {/* Stats Card */}
                <LinearGradient
                    colors={['#667eea', '#764ba2']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.statsCard}
                >
                    <View style={styles.statsRow}>
                        <View style={styles.statItem}>
                            <Text style={styles.statNumber}>15</Text>
                            <Text style={styles.statLabel}>Total Days</Text>
                        </View>
                        <View style={styles.statDivider} />
                        <View style={styles.statItem}>
                            <Text style={styles.statNumber}>3</Text>
                            <Text style={styles.statLabel}>Active Habits</Text>
                        </View>
                        <View style={styles.statDivider} />
                        <View style={styles.statItem}>
                            <Text style={styles.statNumber}>12</Text>
                            <Text style={styles.statLabel}>Best Streak</Text>
                        </View>
                    </View>
                </LinearGradient>

                {/* My Habits Section */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>My Habits</Text>
                        <TouchableOpacity>
                            <Text style={styles.seeAll}>See All</Text>
                        </TouchableOpacity>
                    </View>

                    {myHabits.map((habit) => (
                        <TouchableOpacity key={habit.id} style={styles.habitCard}>
                            <View style={[styles.habitIcon, { backgroundColor: habit.color + '20' }]}>
                                <Ionicons name={habit.icon} size={24} color={habit.color} />
                            </View>
                            <View style={styles.habitInfo}>
                                <Text style={styles.habitName}>{habit.name}</Text>
                                <View style={styles.habitMeta}>
                                    <Ionicons name="flame" size={14} color="#FF6B6B" />
                                    <Text style={styles.streakText}>{habit.streak} day streak</Text>
                                    <Text style={styles.dot}>•</Text>
                                    <Ionicons name="people" size={14} color="#999" />
                                    <Text style={styles.participantsText}>{habit.participants}</Text>
                                </View>
                            </View>
                            <TouchableOpacity style={styles.checkButton}>
                                <Ionicons name="checkmark-circle" size={32} color={habit.color} />
                            </TouchableOpacity>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Trending Habits Section */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Trending Habits 🔥</Text>
                        <TouchableOpacity>
                            <Text style={styles.seeAll}>See All</Text>
                        </TouchableOpacity>
                    </View>

                    {trendingHabits.map((habit) => (
                        <TouchableOpacity key={habit.id} style={styles.trendingCard}>
                            <View style={[styles.habitIcon, { backgroundColor: habit.color + '20' }]}>
                                <Ionicons name={habit.icon} size={24} color={habit.color} />
                            </View>
                            <View style={styles.trendingInfo}>
                                <Text style={styles.habitName}>{habit.name}</Text>
                                <Text style={styles.creatorText}>by {habit.creator}</Text>
                                <View style={styles.trendingMeta}>
                                    <Ionicons name="people" size={14} color="#999" />
                                    <Text style={styles.participantsText}>
                                        {habit.participants} people joined
                                    </Text>
                                </View>
                            </View>
                            <TouchableOpacity style={styles.adoptButton}>
                                <Text style={styles.adoptButtonText}>Adopt</Text>
                            </TouchableOpacity>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Bottom Spacing */}
                <View style={{ height: 100 }} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8F9FA",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: "#fff",
    },
    greeting: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#1a1a1a",
    },
    userName: {
        fontSize: 14,
        color: "#666",
        marginTop: 2,
    },
    notificationButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: "#F8F9FA",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
    },
    badge: {
        position: "absolute",
        top: 10,
        right: 10,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#FF6B6B",
    },
    scrollView: {
        flex: 1,
    },
    statsCard: {
        margin: 20,
        borderRadius: 20,
        padding: 24,
        shadowColor: "#667eea",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 8,
    },
    statsRow: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },
    statItem: {
        alignItems: "center",
    },
    statNumber: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 12,
        color: "#fff",
        opacity: 0.9,
    },
    statDivider: {
        width: 1,
        height: 40,
        backgroundColor: "#fff",
        opacity: 0.3,
    },
    section: {
        paddingHorizontal: 20,
        marginBottom: 24,
    },
    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#1a1a1a",
    },
    seeAll: {
        fontSize: 14,
        color: "#667eea",
        fontWeight: "600",
    },
    habitCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    habitIcon: {
        width: 56,
        height: 56,
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
    },
    habitInfo: {
        flex: 1,
        marginLeft: 16,
    },
    habitName: {
        fontSize: 16,
        fontWeight: "600",
        color: "#1a1a1a",
        marginBottom: 6,
    },
    habitMeta: {
        flexDirection: "row",
        alignItems: "center",
    },
    streakText: {
        fontSize: 13,
        color: "#FF6B6B",
        fontWeight: "600",
        marginLeft: 4,
    },
    dot: {
        fontSize: 13,
        color: "#999",
        marginHorizontal: 6,
    },
    participantsText: {
        fontSize: 13,
        color: "#999",
        marginLeft: 4,
    },
    checkButton: {
        padding: 4,
    },
    trendingCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    trendingInfo: {
        flex: 1,
        marginLeft: 16,
    },
    creatorText: {
        fontSize: 13,
        color: "#999",
        marginTop: 2,
        marginBottom: 6,
    },
    trendingMeta: {
        flexDirection: "row",
        alignItems: "center",
    },
    adoptButton: {
        backgroundColor: "#667eea",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
    },
    adoptButtonText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "600",
    },
    fab: {
        position: "absolute",
        bottom: 24,
        right: 24,
        width: 60,
        height: 60,
        borderRadius: 30,
        shadowColor: "#667eea",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 12,
        elevation: 8,
    },
    fabGradient: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
    },
});