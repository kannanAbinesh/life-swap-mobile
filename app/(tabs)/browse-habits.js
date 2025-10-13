import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, FlatList } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function BrowseHabits() {
    const insets = useSafeAreaInsets();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    // Categories
    const categories = [
        { id: "all", name: "All", icon: "grid" },
        { id: "health", name: "Health", icon: "fitness" },
        { id: "mindfulness", name: "Mind", icon: "flower" },
        { id: "productivity", name: "Work", icon: "briefcase" },
        { id: "learning", name: "Learn", icon: "book" },
        { id: "social", name: "Social", icon: "people" },
    ];

    // Sample habits data
    const habits = [
        {
            id: 1,
            name: "Morning Yoga Flow",
            category: "Health",
            description: "Start your day with 15 minutes of energizing yoga",
            creator: "Emma Wilson",
            participants: 2847,
            icon: "body",
            color: "#FF6B9D",
            difficulty: "Beginner",
            duration: "15 min"
        },
        {
            id: 2,
            name: "Gratitude Journal",
            category: "Mind",
            description: "Write 3 things you're grateful for every morning",
            creator: "Michael Chen",
            participants: 5234,
            icon: "journal",
            color: "#A78BFA",
            difficulty: "Easy",
            duration: "5 min"
        },
        {
            id: 3,
            name: "Deep Work Session",
            category: "Work",
            description: "90 minutes of focused, distraction-free work",
            creator: "Sarah Thompson",
            participants: 1892,
            icon: "laptop",
            color: "#4ECDC4",
            difficulty: "Advanced",
            duration: "90 min"
        },
        {
            id: 4,
            name: "Read Before Bed",
            category: "Learn",
            description: "Read 20 pages of a book before sleeping",
            creator: "David Park",
            participants: 4521,
            icon: "book",
            color: "#FFD93D",
            difficulty: "Easy",
            duration: "20 min"
        },
        {
            id: 5,
            name: "Hydration Challenge",
            category: "Health",
            description: "Drink 8 glasses of water throughout the day",
            creator: "Lisa Martinez",
            participants: 6789,
            icon: "water",
            color: "#6BCF7F",
            difficulty: "Easy",
            duration: "All day"
        },
        {
            id: 6,
            name: "Digital Detox Hour",
            category: "Mind",
            description: "One hour without screens before bedtime",
            creator: "Alex Johnson",
            participants: 3456,
            icon: "phone-portrait",
            color: "#FB923C",
            difficulty: "Medium",
            duration: "60 min"
        },
    ];

    const renderHabitCard = ({ item }) => (
        <TouchableOpacity style={styles.habitCard}>
            <View style={styles.cardHeader}>
                <View style={[styles.iconContainer, { backgroundColor: item.color + '20' }]}>
                    <Ionicons name={item.icon} size={28} color={item.color} />
                </View>
                <View style={styles.cardHeaderInfo}>
                    <Text style={styles.habitCardName}>{item.name}</Text>
                    <View style={styles.categoryBadge}>
                        <Text style={styles.categoryText}>{item.category}</Text>
                    </View>
                </View>
            </View>

            <Text style={styles.habitDescription}>{item.description}</Text>

            <View style={styles.cardFooter}>
                <View style={styles.metaInfo}>
                    <View style={styles.metaItem}>
                        <Ionicons name="person-circle-outline" size={16} color="#999" />
                        <Text style={styles.metaText}>{item.creator}</Text>
                    </View>
                    <View style={styles.metaItem}>
                        <Ionicons name="people" size={16} color="#999" />
                        <Text style={styles.metaText}>{item.participants.toLocaleString()}</Text>
                    </View>
                </View>

                <View style={styles.cardTags}>
                    <View style={styles.tag}>
                        <Ionicons name="time-outline" size={12} color="#667eea" />
                        <Text style={styles.tagText}>{item.duration}</Text>
                    </View>
                    <View style={[styles.tag, styles.difficultyTag]}>
                        <Text style={styles.tagText}>{item.difficulty}</Text>
                    </View>
                </View>
            </View>

            <TouchableOpacity style={styles.adoptCardButton}>
                <LinearGradient
                    colors={['#667eea', '#764ba2']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.adoptGradient}
                >
                    <Text style={styles.adoptCardButtonText}>Adopt Habit</Text>
                    <Ionicons name="arrow-forward" size={18} color="#fff" />
                </LinearGradient>
            </TouchableOpacity>
        </TouchableOpacity>
    );

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Explore Habits</Text>
                <Text style={styles.headerSubtitle}>Discover new habits to build</Text>
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search habits..."
                    placeholderTextColor="#999"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
                {searchQuery.length > 0 && (
                    <TouchableOpacity onPress={() => setSearchQuery("")}>
                        <Ionicons name="close-circle" size={20} color="#999" />
                    </TouchableOpacity>
                )}
            </View>

            {/* Categories */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.categoriesContainer}
                contentContainerStyle={styles.categoriesContent}
            >
                {categories.map((category) => (
                    <TouchableOpacity
                        key={category.id}
                        style={[
                            styles.categoryChip,
                            selectedCategory === category.name && styles.categoryChipActive
                        ]}
                        onPress={() => setSelectedCategory(category.name)}
                    >
                        <Ionicons
                            name={category.icon}
                            size={18}
                            color={selectedCategory === category.name ? "#fff" : "#667eea"}
                        />
                        <Text style={[
                            styles.categoryChipText,
                            selectedCategory === category.name && styles.categoryChipTextActive
                        ]}>
                            {category.name}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Stats Bar */}
            <View style={styles.statsBar}>
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>{habits.length}</Text>
                    <Text style={styles.statLabel}>Habits</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>25K+</Text>
                    <Text style={styles.statLabel}>Active Users</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>1M+</Text>
                    <Text style={styles.statLabel}>Completions</Text>
                </View>
            </View>

            {/* Habits List */}
            <FlatList
                data={habits}
                renderItem={renderHabitCard}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.habitsList}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8F9FA",
    },
    header: {
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: "#fff",
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#1a1a1a",
    },
    headerSubtitle: {
        fontSize: 14,
        color: "#666",
        marginTop: 4,
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        marginHorizontal: 20,
        marginTop: 16,
        paddingHorizontal: 16,
        height: 50,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: "#1a1a1a",
    },
    categoriesContainer: {
        marginTop: 16,
        flexGrow: 0,
    },
    categoriesContent: {
        paddingHorizontal: 20,
        gap: 8,
    },
    categoryChip: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
        backgroundColor: "#fff",
        marginRight: 8,
        borderWidth: 1,
        borderColor: "#667eea",
    },
    categoryChipActive: {
        backgroundColor: "#667eea",
        borderColor: "#667eea",
    },
    categoryChipText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#667eea",
        marginLeft: 6,
    },
    categoryChipTextActive: {
        color: "#fff",
    },
    statsBar: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "#fff",
        marginHorizontal: 20,
        marginTop: 16,
        padding: 16,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    statItem: {
        alignItems: "center",
    },
    statNumber: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#667eea",
    },
    statLabel: {
        fontSize: 12,
        color: "#999",
        marginTop: 2,
    },
    statDivider: {
        width: 1,
        height: 30,
        backgroundColor: "#E5E5EA",
    },
    habitsList: {
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 100,
    },
    habitCard: {
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 3,
    },
    cardHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },
    iconContainer: {
        width: 56,
        height: 56,
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
    },
    cardHeaderInfo: {
        flex: 1,
        marginLeft: 16,
    },
    habitCardName: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#1a1a1a",
        marginBottom: 6,
    },
    categoryBadge: {
        alignSelf: "flex-start",
        backgroundColor: "#F8F9FA",
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
    },
    categoryText: {
        fontSize: 12,
        color: "#667eea",
        fontWeight: "600",
    },
    habitDescription: {
        fontSize: 14,
        color: "#666",
        lineHeight: 20,
        marginBottom: 16,
    },
    cardFooter: {
        marginBottom: 16,
    },
    metaInfo: {
        flexDirection: "row",
        marginBottom: 12,
        gap: 16,
    },
    metaItem: {
        flexDirection: "row",
        alignItems: "center",
    },
    metaText: {
        fontSize: 13,
        color: "#999",
        marginLeft: 6,
    },
    cardTags: {
        flexDirection: "row",
        gap: 8,
    },
    tag: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F8F9FA",
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 8,
        gap: 4,
    },
    difficultyTag: {
        backgroundColor: "#FFF4E6",
    },
    tagText: {
        fontSize: 12,
        color: "#667eea",
        fontWeight: "600",
    },
    adoptCardButton: {
        borderRadius: 12,
        overflow: "hidden",
    },
    adoptGradient: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 14,
        gap: 8,
    },
    adoptCardButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});