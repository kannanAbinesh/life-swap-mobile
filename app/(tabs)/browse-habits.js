import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, ActivityIndicator, Image, Dimensions } from "react-native";
import { useEffect, useState, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getHabits } from "../../src/ActionCreators/getHabits";
import { connect } from "react-redux";

const { width } = Dimensions.get('window');
const IMAGE_WIDTH = width - 40; // Account for card padding

// Image Carousel Component
function HabitImageCarousel({ images }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const scrollViewRef = useRef(null);
    const autoScrollTimer = useRef(null);

    useEffect(() => {
        if (!images || images.length <= 1) return;

        startAutoScroll();

        return () => {
            if (autoScrollTimer.current) {
                clearInterval(autoScrollTimer.current);
            }
        };
    }, [images, currentImageIndex]);

    const startAutoScroll = () => {
        if (autoScrollTimer.current) {
            clearInterval(autoScrollTimer.current);
        }

        autoScrollTimer.current = setInterval(() => {
            const nextIndex = currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1;
            setCurrentImageIndex(nextIndex);
            scrollViewRef.current?.scrollTo({
                x: nextIndex * IMAGE_WIDTH,
                animated: true,
            });
        }, 3500);
    };

    const handleScroll = (event) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const newIndex = Math.round(contentOffsetX / IMAGE_WIDTH);

        if (newIndex !== currentImageIndex && newIndex >= 0 && newIndex < images.length) {
            setCurrentImageIndex(newIndex);
        }
    };

    const handleScrollBegin = () => {
        if (autoScrollTimer.current) {
            clearInterval(autoScrollTimer.current);
        }
    };

    const handleScrollEnd = () => {
        startAutoScroll();
    };

    if (!images || images.length === 0) {
        return (
            <View style={carouselStyles.emptyContainer}>
                <View style={carouselStyles.emptyIconContainer}>
                    <Ionicons name="image-outline" size={56} color="#d0d0d0" />
                </View>
                <Text style={carouselStyles.emptyText}>No images</Text>
            </View>
        );
    }

    return (
        <View style={carouselStyles.container}>
            <ScrollView
                ref={scrollViewRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                onScrollBeginDrag={handleScrollBegin}
                onScrollEndDrag={handleScrollEnd}
                scrollEventThrottle={16}
                style={carouselStyles.scrollView}
            >
                {images.map((img, index) => (
                    <Image
                        key={index}
                        source={{ uri: `http://192.168.0.107:3005/uploads/habits/${img?.image}` }}
                        style={carouselStyles.image}
                        resizeMode="cover"
                    />
                ))}
            </ScrollView>

            {images.length > 1 && (
                <View style={carouselStyles.indicatorContainer}>
                    <View style={carouselStyles.indicatorWrapper}>
                        {images.map((_, index) => (
                            <View
                                key={index}
                                style={[
                                    carouselStyles.indicator,
                                    index === currentImageIndex && carouselStyles.indicatorActive
                                ]}
                            />
                        ))}
                    </View>
                </View>
            )}
        </View>
    );
}

const carouselStyles = {
    container: {
        position: 'relative',
        height: 200,
        marginBottom: 16,
        borderRadius: 16,
        overflow: 'hidden',
    },
    scrollView: {
        flex: 1,
    },
    image: {
        width: IMAGE_WIDTH,
        height: 200,
    },
    emptyContainer: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    emptyIconContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 2,
    },
    emptyText: {
        fontSize: 14,
        color: '#999',
        fontWeight: '500',
    },
    indicatorContainer: {
        position: 'absolute',
        bottom: 12,
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    indicatorWrapper: {
        flexDirection: 'row',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
        gap: 6,
    },
    indicator: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
    indicatorActive: {
        backgroundColor: '#fff',
        width: 24,
    },
};

function BrowseHabits({ getHabits, habits }) {
    const insets = useSafeAreaInsets();
    const [searchQuery, setSearchQuery] = useState("");
    const [fetchLoading, setFetchLoading] = useState(false);

    useEffect(() => {
        const fetchHabits = async () => {
            setFetchLoading(true);
            await getHabits({ type: 'browse' });
            setFetchLoading(false);
        };
        fetchHabits();
    }, []);

    const filteredHabits = habits?.data?.filter(habit =>
        habit.habitName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        habit.description?.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

    const renderHabitCard = (item) => (
        <ScrollView style={styles.habitsList} showsVerticalScrollIndicator={false}>
            {habits?.data?.map((habit) => (
                <View key={habit._id} style={styles.habitCard}>
                    <View style={styles.habitImageContainer}>
                        <HabitImageCarousel images={habit.images} />
                        <View style={styles.lifestyleBadge}>
                            <Text style={styles.lifestyleBadgeText}>{habit.lifeStyle}</Text>
                        </View>
                    </View>

                    <View style={styles.habitInfo}>
                        <View style={styles.habitHeader}>
                            <Text style={styles.habitName}>{habit.habitName}</Text>
                        </View>
                        <Text style={styles.habitDescription}>{habit.description}</Text>

                        <View style={styles.habitFooter}>
                            <View style={styles.timeContainer}>
                                <Ionicons name="time-outline" size={16} color="#666" />
                                <Text style={styles.timeText}>{habit.timeDuration}</Text>
                            </View>
                            <View style={styles.imagesCount}>
                                <Ionicons name="images-outline" size={16} color="#666" />
                                <Text style={styles.imagesCountText}>
                                    {habit.images?.length || 0} photos
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            ))}
        </ScrollView>
    );

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>

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

            {/* Habits List */}
            {fetchLoading ? (
                <View style={styles.loadingContainer}>
                    <View style={styles.loadingSpinner}>
                        <ActivityIndicator size="large" color="#FF4D67" />
                    </View>
                    <Text style={styles.loadingText}>Loading habits...</Text>
                </View>
            ) : filteredHabits.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <View style={styles.emptyIconWrapper}>
                        <Ionicons name="search-outline" size={72} color="#FF4D67" />
                    </View>
                    <Text style={styles.emptyText}>
                        {searchQuery ? 'No habits found' : 'No habits available'}
                    </Text>
                    <Text style={styles.emptySubtext}>
                        {searchQuery ? 'Try searching with different keywords' : 'Check back later for new habits'}
                    </Text>
                </View>
            ) : (
                <ScrollView
                    style={styles.habitsList}
                    contentContainerStyle={styles.habitsListContent}
                    showsVerticalScrollIndicator={false}
                >
                    {filteredHabits.map((habit) => renderHabitCard(habit))}
                </ScrollView>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8F9FA",
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        marginHorizontal: 20,
        marginTop: 20,
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
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
    },
    loadingSpinner: {
        marginBottom: 20,
    },
    loadingText: {
        fontSize: 16,
        color: '#666',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
    },
    emptyIconWrapper: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#FFF0F3',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    emptyText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1a1a1a',
        marginBottom: 12,
    },
    emptySubtext: {
        fontSize: 15,
        color: '#666',
        textAlign: 'center',
        lineHeight: 22,
    },
    habitsList: {
        flex: 1,
    },
    habitsListContent: {
        paddingBottom: 50,
    },
    habitCard: {
        backgroundColor: "#fff",
        borderRadius: 20,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 4,
    },
    cardContent: {
        // Content wrapper
    },
    cardHeader: {
        marginBottom: 12,
    },
    cardHeaderInfo: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    habitCardName: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#1a1a1a",
        flex: 1,
    },
    lifestyleBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF0F3',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        gap: 4,
        marginLeft: 12,
    },
    lifestyleText: {
        fontSize: 12,
        color: "#FF4D67",
        fontWeight: "700",
        textTransform: "capitalize",
    },
    habitDescription: {
        fontSize: 15,
        color: "#666",
        lineHeight: 22,
        marginBottom: 16,
    },
    cardFooter: {
        marginBottom: 16,
    },
    metaInfo: {
        flexDirection: "row",
        gap: 12,
    },
    infoTag: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF0F3',
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 20,
        gap: 6,
    },
    infoTagText: {
        fontSize: 13,
        color: '#FF4D67',
        fontWeight: '600',
    },
    adoptCardButton: {
        borderRadius: 12,
        overflow: "hidden",
        shadowColor: "#FF4D67",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    adoptGradient: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 16,
        gap: 8,
    },
    adoptCardButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    habitsList: {
            flex: 1,
            padding: 16,
        },
        habitCard: {
            backgroundColor: '#fff',
            borderRadius: 16,
            marginBottom: 16,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 3,
            overflow: 'hidden',
        },
        habitImageContainer: {
            position: 'relative',
            height: 200,
        },
        habitImage: {
            width: '100%',
            height: '100%',
        },
        habitImagePlaceholder: {
            width: '100%',
            height: '100%',
            backgroundColor: '#f0f0f0',
            justifyContent: 'center',
            alignItems: 'center',
        },
        lifestyleBadge: {
            position: 'absolute',
            top: 12,
            right: 12,
            backgroundColor: 'rgba(255, 77, 103, 0.9)',
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 20,
        },
        lifestyleBadgeText: {
            color: '#fff',
            fontSize: 12,
            fontWeight: '600',
            textTransform: 'capitalize',
        },
        habitInfo: {
            padding: 16,
        },
        habitHeader: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 8,
        },
        habitName: {
            fontSize: 20,
            fontWeight: 'bold',
            color: '#333',
            flex: 1,
        },
        deleteButton: {
            padding: 4,
        },
        habitDescription: {
            fontSize: 14,
            color: '#666',
            marginBottom: 12,
            lineHeight: 20,
        },
        habitFooter: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        timeContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 6,
        },
        timeText: {
            fontSize: 13,
            color: '#666',
        },
        imagesCount: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 6,
        },
});

const mapState = state => ({
    habits: state?.habits
})

const mapDispatch = {
    getHabits
}

export default connect(mapState, mapDispatch)(BrowseHabits);