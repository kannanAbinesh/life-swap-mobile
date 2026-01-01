import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, ActivityIndicator, Image, Dimensions, Modal } from "react-native";
import { useEffect, useState, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getHabits } from "../../src/ActionCreators/getHabits";
import { connect } from "react-redux";

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;
const MODAL_IMAGE_WIDTH = width - 40;

// Image Carousel Component
function HabitImageCarousel({ images, height = 140, isModal = false }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const scrollViewRef = useRef(null);
    const autoScrollTimer = useRef(null);
    const imageWidth = isModal ? MODAL_IMAGE_WIDTH : CARD_WIDTH;

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
                x: nextIndex * imageWidth,
                animated: true,
            });
        }, 3500);
    };

    const handleScroll = (event) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const newIndex = Math.round(contentOffsetX / imageWidth);

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
            <View style={[styles.emptyImageContainer, { height }]}>
                <Ionicons name="image-outline" size={40} color="#ccc" />
            </View>
        );
    }

    return (
        <View style={[styles.carouselContainer, { height }]}>
            <ScrollView
                ref={scrollViewRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                onScrollBeginDrag={handleScrollBegin}
                onScrollEndDrag={handleScrollEnd}
                scrollEventThrottle={16}
            >
                {images.map((img, index) => (
                    <Image
                        key={index}
                        source={{ uri: `http://192.168.1.39:3005/uploads/habits/${img?.image}` }}
                        style={[styles.carouselImage, { width: imageWidth, height }]}
                        resizeMode="cover"
                    />
                ))}
            </ScrollView>

            {images.length > 1 && (
                <View style={styles.indicatorContainer}>
                    <View style={styles.indicatorWrapper}>
                        {images.map((_, index) => (
                            <View
                                key={index}
                                style={[
                                    styles.indicator,
                                    index === currentImageIndex && styles.indicatorActive
                                ]}
                            />
                        ))}
                    </View>
                </View>
            )}
        </View>
    );
}

// Filter Modal Component
function FilterModal({ visible, onClose, filters, onApplyFilters }) {
    const [localFilters, setLocalFilters] = useState(filters);

    const lifestyleOptions = ['All', 'Fitness', 'Mindfulness', 'Productivity', 'Health', 'Learning', 'Social'];
    const durationOptions = ['All', '0-15 min', '15-30 min', '30-60 min', '60+ min'];
    const sortOptions = ['Recent', 'Most Popular', 'A-Z', 'Z-A'];

    useEffect(() => {
        setLocalFilters(filters);
    }, [filters]);

    const handleLifestyleSelect = (lifestyle) => {
        setLocalFilters(prev => ({ ...prev, lifestyle }));
    };

    const handleDurationSelect = (duration) => {
        setLocalFilters(prev => ({ ...prev, duration }));
    };

    const handleSortSelect = (sortBy) => {
        setLocalFilters(prev => ({ ...prev, sortBy }));
    };

    const handleApply = () => {
        onApplyFilters(localFilters);
        onClose();
    };

    const handleReset = () => {
        const resetFilters = {
            lifestyle: 'All',
            duration: 'All',
            sortBy: 'Recent'
        };
        setLocalFilters(resetFilters);
        onApplyFilters(resetFilters);
    };

    const getActiveFiltersCount = () => {
        let count = 0;
        if (localFilters.lifestyle !== 'All') count++;
        if (localFilters.duration !== 'All') count++;
        if (localFilters.sortBy !== 'Recent') count++;
        return count;
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.filterModalOverlay}>
                <View style={styles.filterModalContent}>
                    {/* Header */}
                    <View style={styles.filterHeader}>
                        <Text style={styles.filterTitle}>Filters</Text>
                        <TouchableOpacity onPress={onClose} style={styles.filterCloseButton}>
                            <Ionicons name="close" size={24} color="#333" />
                        </TouchableOpacity>
                    </View>

                    <ScrollView showsVerticalScrollIndicator={false} style={styles.filterScrollView}>
                        {/* Lifestyle Filter */}
                        <View style={styles.filterSection}>
                            <Text style={styles.filterSectionTitle}>Lifestyle</Text>
                            <View style={styles.filterOptionsGrid}>
                                {lifestyleOptions.map((option) => (
                                    <TouchableOpacity
                                        key={option}
                                        style={[
                                            styles.filterOption,
                                            localFilters.lifestyle === option && styles.filterOptionActive
                                        ]}
                                        onPress={() => handleLifestyleSelect(option)}
                                    >
                                        <Text style={[
                                            styles.filterOptionText,
                                            localFilters.lifestyle === option && styles.filterOptionTextActive
                                        ]}>
                                            {option}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>

                        {/* Duration Filter */}
                        <View style={styles.filterSection}>
                            <Text style={styles.filterSectionTitle}>Duration</Text>
                            <View style={styles.filterOptionsList}>
                                {durationOptions.map((option) => (
                                    <TouchableOpacity
                                        key={option}
                                        style={[
                                            styles.filterOptionRow,
                                            localFilters.duration === option && styles.filterOptionRowActive
                                        ]}
                                        onPress={() => handleDurationSelect(option)}
                                    >
                                        <Text style={[
                                            styles.filterOptionRowText,
                                            localFilters.duration === option && styles.filterOptionRowTextActive
                                        ]}>
                                            {option}
                                        </Text>
                                        {localFilters.duration === option && (
                                            <Ionicons name="checkmark-circle" size={20} color="#FF4D67" />
                                        )}
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>

                        {/* Sort By Filter */}
                        <View style={styles.filterSection}>
                            <Text style={styles.filterSectionTitle}>Sort By</Text>
                            <View style={styles.filterOptionsList}>
                                {sortOptions.map((option) => (
                                    <TouchableOpacity
                                        key={option}
                                        style={[
                                            styles.filterOptionRow,
                                            localFilters.sortBy === option && styles.filterOptionRowActive
                                        ]}
                                        onPress={() => handleSortSelect(option)}
                                    >
                                        <Text style={[
                                            styles.filterOptionRowText,
                                            localFilters.sortBy === option && styles.filterOptionRowTextActive
                                        ]}>
                                            {option}
                                        </Text>
                                        {localFilters.sortBy === option && (
                                            <Ionicons name="checkmark-circle" size={20} color="#FF4D67" />
                                        )}
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    </ScrollView>

                    {/* Footer Actions */}
                    <View style={styles.filterFooter}>
                        <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
                            <Text style={styles.resetButtonText}>Reset All</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
                            <Text style={styles.applyButtonText}>
                                Apply {getActiveFiltersCount() > 0 && `(${getActiveFiltersCount()})`}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

// Habit Detail Modal
function HabitDetailModal({ visible, habit, onClose, onAdopt, onChat }) {
    if (!habit) return null;

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    {/* Close Button */}
                    <TouchableOpacity style={styles.modalCloseButton} onPress={onClose}>
                        <Ionicons name="close" size={28} color="#333" />
                    </TouchableOpacity>

                    <ScrollView showsVerticalScrollIndicator={false}>
                        {/* Image Carousel */}
                        <View style={styles.modalImageContainer}>
                            <HabitImageCarousel images={habit.images} height={300} isModal={true} />
                            {habit.lifestyle && habit.lifestyle !== 'none' && (
                                <View style={styles.modalLifestyleBadge}>
                                    <Text style={styles.lifestyleBadgeText}>{habit.lifestyle}</Text>
                                </View>
                            )}
                        </View>

                        {/* Habit Details */}
                        <View style={styles.modalBody}>
                            <Text style={styles.modalHabitName}>{habit.habitName}</Text>
                            
                            <View style={styles.modalMetaInfo}>
                                <View style={styles.modalMetaItem}>
                                    <Ionicons name="time-outline" size={18} color="#FF4D67" />
                                    <Text style={styles.modalMetaText}>{habit.timeDuration}</Text>
                                </View>
                                <View style={styles.modalMetaItem}>
                                    <Ionicons name="images-outline" size={18} color="#FF4D67" />
                                    <Text style={styles.modalMetaText}>{habit.images?.length || 0} photos</Text>
                                </View>
                            </View>

                            <Text style={styles.modalSectionTitle}>Description</Text>
                            <Text style={styles.modalDescription}>{habit.description}</Text>

                            {habit.lifestyle && habit.lifestyle !== 'none' && (
                                <>
                                    <Text style={styles.modalSectionTitle}>Lifestyle</Text>
                                    <View style={styles.modalLifestyleTag}>
                                        <Ionicons name="fitness-outline" size={18} color="#FF4D67" />
                                        <Text style={styles.modalLifestyleText}>{habit.lifestyle}</Text>
                                    </View>
                                </>
                            )}
                        </View>
                    </ScrollView>

                    {/* Action Buttons */}
                    <View style={styles.modalActions}>
                        <TouchableOpacity style={styles.chatButton} onPress={onChat}>
                            <Ionicons name="chatbubble-ellipses-outline" size={20} color="#FF4D67" />
                            <Text style={styles.chatButtonText}>Chat</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.adoptButton} onPress={onAdopt}>
                            <Ionicons name="heart-outline" size={20} color="#fff" />
                            <Text style={styles.adoptButtonText}>Adopt Habit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

function BrowseHabits({ getHabits, habits }) {
    const insets = useSafeAreaInsets();
    const [searchQuery, setSearchQuery] = useState("");
    const [fetchLoading, setFetchLoading] = useState(false);
    const [selectedHabit, setSelectedHabit] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [filterModalVisible, setFilterModalVisible] = useState(false);
    const [filters, setFilters] = useState({
        lifestyle: 'All',
        duration: 'All',
        sortBy: 'Recent'
    });

    useEffect(() => {
        const fetchHabits = async () => {
            setFetchLoading(true);
            await getHabits({ type: 'browse' });
            setFetchLoading(false);
        };
        fetchHabits();
    }, []);

    const parseDuration = (duration) => {
        const match = duration.match(/(\d+)/);
        return match ? parseInt(match[0]) : 0;
    };

    const matchesDurationFilter = (habitDuration, filterDuration) => {
        if (filterDuration === 'All') return true;
        
        const minutes = parseDuration(habitDuration);
        
        switch (filterDuration) {
            case '0-15 min':
                return minutes <= 15;
            case '15-30 min':
                return minutes > 15 && minutes <= 30;
            case '30-60 min':
                return minutes > 30 && minutes <= 60;
            case '60+ min':
                return minutes > 60;
            default:
                return true;
        }
    };

    const getFilteredAndSortedHabits = () => {
        let result = habits?.data || [];

        // Apply search filter
        if (searchQuery) {
            result = result.filter(habit =>
                habit.habitName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                habit.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                habit.lifestyle?.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Apply lifestyle filter
        if (filters.lifestyle !== 'All') {
            result = result.filter(habit => 
                habit.lifestyle?.toLowerCase() === filters.lifestyle.toLowerCase()
            );
        }

        // Apply duration filter
        if (filters.duration !== 'All') {
            result = result.filter(habit => 
                matchesDurationFilter(habit.timeDuration, filters.duration)
            );
        }

        // Apply sorting
        switch (filters.sortBy) {
            case 'A-Z':
                result.sort((a, b) => a.habitName.localeCompare(b.habitName));
                break;
            case 'Z-A':
                result.sort((a, b) => b.habitName.localeCompare(a.habitName));
                break;
            case 'Most Popular':
                // Assuming there's a popularity field, otherwise keep original order
                break;
            case 'Recent':
            default:
                // Keep original order
                break;
        }

        return result;
    };

    const filteredHabits = getFilteredAndSortedHabits();

    const getActiveFiltersCount = () => {
        let count = 0;
        if (filters.lifestyle !== 'All') count++;
        if (filters.duration !== 'All') count++;
        if (filters.sortBy !== 'Recent') count++;
        return count;
    };

    const handleHabitPress = (habit) => {
        setSelectedHabit(habit);
        setModalVisible(true);
    };

    const handleAdopt = () => {
        setModalVisible(false);
    };

    const handleChat = () => {
        setModalVisible(false);
    };

    const handleApplyFilters = (newFilters) => {
        setFilters(newFilters);
    };

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            {/* Search Bar with Filter */}
            <View style={styles.searchContainer}>
                <View style={styles.searchInputWrapper}>
                    <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Enter your activity"
                        placeholderTextColor="#999"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                    {searchQuery.length > 0 && (
                        <TouchableOpacity onPress={() => setSearchQuery("")} style={styles.clearButton}>
                            <Ionicons name="close-circle" size={18} color="#999" />
                        </TouchableOpacity>
                    )}
                    <View style={styles.filterDivider} />
                    <TouchableOpacity 
                        style={styles.filterButton} 
                        onPress={() => setFilterModalVisible(true)}
                    >
                        <Ionicons name="options-outline" size={20} color="#FF4D67" />
                        {getActiveFiltersCount() > 0 && (
                            <View style={styles.filterBadge}>
                                <Text style={styles.filterBadgeText}>{getActiveFiltersCount()}</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>
            </View>

            {/* Habits List */}
            {fetchLoading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#FF4D67" />
                    <Text style={styles.loadingText}>Loading habits...</Text>
                </View>
            ) : filteredHabits.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Ionicons name={searchQuery ? "search-outline" : "fitness-outline"} size={64} color="#ccc" />
                    <Text style={styles.emptyText}>
                        {searchQuery ? 'No habits found' : 'No habits available'}
                    </Text>
                    <Text style={styles.emptySubtext}>
                        {searchQuery ? 'Try a different search term' : 'Check back later for new habits'}
                    </Text>
                </View>
            ) : (
                <ScrollView
                    style={styles.habitsList}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.habitsListContent}
                >
                    {filteredHabits.map((habit) => (
                        <TouchableOpacity
                            key={habit._id}
                            style={styles.habitCard}
                            onPress={() => handleHabitPress(habit)}
                            activeOpacity={0.8}
                        >
                            {/* Image Carousel */}
                            <View style={styles.habitImageContainer}>
                                <HabitImageCarousel images={habit.images} height={140} />
                                {habit.lifestyle && habit.lifestyle !== 'none' && (
                                    <View style={styles.lifestyleBadge}>
                                        <Text style={styles.lifestyleBadgeText}>{habit.lifestyle}</Text>
                                    </View>
                                )}
                            </View>

                            {/* Habit Info */}
                            <View style={styles.habitInfo}>
                                <Text style={styles.habitName} numberOfLines={1}>
                                    {habit.habitName}
                                </Text>
                                <Text style={styles.habitDescription} numberOfLines={2}>
                                    {habit.description}
                                </Text>

                                <View style={styles.habitFooter}>
                                    <View style={styles.timeContainer}>
                                        <Ionicons name="time-outline" size={14} color="#666" />
                                        <Text style={styles.timeText}>{habit.timeDuration}</Text>
                                    </View>
                                    {habit.images && habit.images.length > 0 && (
                                        <View style={styles.imagesCount}>
                                            <Ionicons name="images-outline" size={14} color="#666" />
                                            <Text style={styles.imagesCountText}>{habit.images.length}</Text>
                                        </View>
                                    )}
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            )}

            {/* Filter Modal */}
            <FilterModal
                visible={filterModalVisible}
                onClose={() => setFilterModalVisible(false)}
                filters={filters}
                onApplyFilters={handleApplyFilters}
            />

            {/* Habit Detail Modal */}
            <HabitDetailModal
                visible={modalVisible}
                habit={selectedHabit}
                onClose={() => setModalVisible(false)}
                onAdopt={handleAdopt}
                onChat={handleChat}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    searchContainer: {
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingTop: 20,
        paddingBottom: 16,
    },
    searchInputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderWidth: 1,
        borderColor: '#e5e5e5',
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 15,
        color: '#333',
        padding: 0,
    },
    clearButton: {
        padding: 4,
    },
    filterDivider: {
        width: 1,
        height: 24,
        backgroundColor: '#e5e5e5',
        marginHorizontal: 12,
    },
    filterButton: {
        padding: 4,
        position: 'relative',
    },
    filterBadge: {
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: '#FF4D67',
        borderRadius: 8,
        minWidth: 16,
        height: 16,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 4,
    },
    filterBadgeText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: 'bold',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 12,
        fontSize: 16,
        color: '#666',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
    },
    emptyText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 16,
    },
    emptySubtext: {
        fontSize: 14,
        color: '#666',
        marginTop: 8,
        textAlign: 'center',
    },
    habitsList: {
        flex: 1,
    },
    habitsListContent: {
        padding: 16,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    habitCard: {
        width: CARD_WIDTH,
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
        height: 140,
    },
    lifestyleBadge: {
        position: 'absolute',
        top: 8,
        left: 8,
        backgroundColor: '#FF4D67',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    lifestyleBadgeText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: '600',
        textTransform: 'capitalize',
    },
    habitInfo: {
        padding: 12,
    },
    habitName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 6,
    },
    habitDescription: {
        fontSize: 12,
        color: '#666',
        marginBottom: 10,
        lineHeight: 16,
    },
    habitFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    timeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    timeText: {
        fontSize: 11,
        color: '#666',
    },
    imagesCount: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    imagesCountText: {
        fontSize: 11,
        color: '#666',
    },
    // Carousel Styles
    carouselContainer: {
        position: 'relative',
        overflow: 'hidden',
    },
    carouselImage: {
        resizeMode: 'cover',
    },
    emptyImageContainer: {
        width: '100%',
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    indicatorContainer: {
        position: 'absolute',
        bottom: 8,
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    indicatorWrapper: {
        flexDirection: 'row',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        gap: 4,
    },
    indicator: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
    indicatorActive: {
        backgroundColor: '#fff',
        width: 18,
    },
    // Filter Modal Styles
    filterModalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    filterModalContent: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        maxHeight: '80%',
        paddingBottom: 20,
    },
    filterHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    filterTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
    },
    filterCloseButton: {
        padding: 4,
    },
    filterScrollView: {
        paddingHorizontal: 20,
    },
    filterSection: {
        marginTop: 24,
    },
    filterSectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 12,
    },
    filterOptionsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    filterOption: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
        backgroundColor: '#f5f5f5',
        borderWidth: 1,
        borderColor: '#e5e5e5',
    },
    filterOptionActive: {
        backgroundColor: '#FFF0F3',
        borderColor: '#FF4D67',
    },
    filterOptionText: {
        fontSize: 14,
        color: '#666',
        fontWeight: '500',
    },
    filterOptionTextActive: {
        color: '#FF4D67',
        fontWeight: '600',
    },
    filterOptionsList: {
        gap: 8,
    },
    filterOptionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderRadius: 12,
        backgroundColor: '#f5f5f5',
        borderWidth: 1,
        borderColor: '#e5e5e5',
    },
    filterOptionRowActive: {
        backgroundColor: '#FFF0F3',
        borderColor: '#FF4D67',
    },
    filterOptionRowText: {
        fontSize: 15,
        color: '#666',
        fontWeight: '500',
    },
    filterOptionRowTextActive: {
        color: '#FF4D67',
        fontWeight: '600',
    },
    filterFooter: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingTop: 16,
        gap: 12,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
    },
    resetButton: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 12,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#e5e5e5',
    },
    resetButtonText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#666',
    },
    applyButton: {
        flex: 2,
        paddingVertical: 14,
        borderRadius: 12,
        backgroundColor: '#FF4D67',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#FF4D67',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    applyButtonText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#fff',
    },
    // Modal Styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        maxHeight: '90%',
        paddingBottom: 20,
    },
    modalCloseButton: {
        position: 'absolute',
        top: 16,
        right: 16,
        zIndex: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    modalImageContainer: {
        position: 'relative',
        height: 300,
        marginBottom: 20,
    },
    modalLifestyleBadge: {
        position: 'absolute',
        top: 16,
        left: 16,
        backgroundColor: '#FF4D67',
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 16,
    },
    modalBody: {
        paddingHorizontal: 20,
    },
    modalHabitName: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 16,
    },
    modalMetaInfo: {
        flexDirection: 'row',
        gap: 16,
        marginBottom: 24,
    },
    modalMetaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF0F3',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 12,
        gap: 6,
    },
    modalMetaText: {
        fontSize: 13,
        color: '#FF4D67',
        fontWeight: '600',
    },
    modalSectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 12,
        marginTop: 8,
    },
    modalDescription: {
        fontSize: 15,
        color: '#666',
        lineHeight: 24,
        marginBottom: 20,
    },
    modalLifestyleTag: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF0F3',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 12,
        gap: 8,
        alignSelf: 'flex-start',
        marginBottom: 20,
    },
    modalLifestyleText: {
        fontSize: 15,
        color: '#FF4D67',
        fontWeight: '600',
        textTransform: 'capitalize',
    },
    modalActions: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingTop: 16,
        gap: 12,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
    },
    chatButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF0F3',
        paddingVertical: 16,
        borderRadius: 12,
        gap: 8,
    },
    chatButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FF4D67',
    },
    adoptButton: {
        flex: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FF4D67',
        paddingVertical: 16,
        borderRadius: 12,
        gap: 8,
        shadowColor: '#FF4D67',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    adoptButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
    },
});

const mapState = state => ({
    habits: state?.habits
});

const mapDispatch = {
    getHabits
};

export default connect(mapState, mapDispatch)(BrowseHabits);