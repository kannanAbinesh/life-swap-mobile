/* React */
import { useEffect, useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Modal, ActivityIndicator, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';

/* Components */
import YourHabitsForm from '../YourHabitsForm/YourHabitsForm';

/* Helpers. */
import { useTheme } from '../Theme/ThemeContext';
import { getHabits } from '../../ActionCreators/getHabits';
import { baseURL } from '../../config';

/* Styles */
import { createStyles } from "./yourHabitsStyles";
import { NoDataFound } from '../NoDataFound/NoDataFound';
import { Loader } from '../Loader/Loader';
import { openModal } from '../../ActionCreators/modal';

function YourHabits(props) {

    const { getHabits, habits, openModal } = props;

    /* State. */
    const [modalVisible, setModalVisible] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(false);
    const [editingHabit, setEditingHabit] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [debounceTimeout, setDebounceTimeout] = useState(null);

    /* Variables. */
    const { isDark } = useTheme();
    const styles = createStyles(isDark);

    // Initial fetch
    useEffect(() => {
        const fetchHabits = async () => {
            setFetchLoading(true);
            await getHabits({ type: 'myhabit' });
            setFetchLoading(false);
        };
        fetchHabits();
    }, []);

    // Debounced search function
    const handleSearchChange = useCallback((text) => {
        setSearchQuery(text);

        // Clear existing timeout
        if (debounceTimeout) {
            clearTimeout(debounceTimeout);
        }

        // Set new timeout
        const timeout = setTimeout(async () => {
            setFetchLoading(true);
            await getHabits({
                type: 'myhabit',
                query: text.trim()
            });
            setFetchLoading(false);
        }, 500); // 500ms debounce delay

        setDebounceTimeout(timeout);
    }, [debounceTimeout, getHabits]);

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (debounceTimeout) {
                clearTimeout(debounceTimeout);
            }
        };
    }, [debounceTimeout]);

    const handleAddHabit = () => {
        setEditingHabit(null);
        setModalVisible(true);
    };

    const handleEditHabit = (habit) => {
        openModal({ type: "manageHabits", data: habit });
        setEditingHabit(habit);
    };

    const handleDeleteHabit = (habit, e) => {
        // Prevent edit modal from opening when delete is clicked
        if (e) {
            e.stopPropagation();
        }

        Alert.alert(
            'Delete Habit',
            `Are you sure you want to delete "${habit.habitName}"?`,
            [
                {
                    text: 'Cancel',
                    style: 'cancel'
                },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            // Call your delete action here
                            // await deleteHabit(habit._id);
                            // Then refresh the habits list
                            await getHabits({ type: 'myhabit', query: searchQuery.trim() });
                            Alert.alert('Success', 'Habit deleted successfully!');
                        } catch (error) {
                            Alert.alert('Error', 'Failed to delete habit: ' + error.message);
                        }
                    }
                }
            ]
        );
    };

    const handleClearSearch = async () => {
        setSearchQuery('');
        if (debounceTimeout) {
            clearTimeout(debounceTimeout);
        }
        setFetchLoading(true);
        await getHabits({ type: 'myhabit' });
        setFetchLoading(false);
    };

    const closeModal = () => {
        setModalVisible(false);
        setEditingHabit(null);
    };

    return (
        <View style={styles.container}>
            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <View style={styles.searchInputWrapper}>
                    <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Enter your activity"
                        placeholderTextColor="#999"
                        value={searchQuery}
                        onChangeText={handleSearchChange}
                    />
                    {searchQuery.length > 0 && (
                        <TouchableOpacity onPress={handleClearSearch} style={styles.clearButton}>
                            <Ionicons name="close-circle" size={18} color="#999" />
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            {fetchLoading ? (
                <Loader />
            ) : habits?.data?.length === 0 ? (
                <View style={{ flex: 1 }} pointerEvents="box-none">
                    <NoDataFound />
                </View>
            ) : (
                <ScrollView
                    style={styles.habitsList}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.habitsListContent}
                >
                    {habits?.data?.map((habit) => {
                        return (
                            <View style={styles.habitCardWrapper} key={habit._id}>
                                <TouchableOpacity
                                    style={styles.habitCard}
                                    onPress={() => handleEditHabit(habit)}
                                    activeOpacity={0.8}
                                >
                                    {/* Image Container */}
                                    <View style={styles.habitImageContainer}>
                                        {habit.images && habit.images.length > 0 ? (
                                            <Image
                                                source={{ uri: `${baseURL}uploads/habits/${habit.images[0]?.image}` }}
                                                style={styles.habitImage}
                                                resizeMode="cover"
                                            />
                                        ) : (
                                            <View style={styles.habitImagePlaceholder}>
                                                <Ionicons name="image-outline" size={40} color="#ccc" />
                                            </View>
                                        )}

                                        {/* Lifestyle badge */}
                                        {habit.lifestyle && habit.lifestyle !== 'none' && (
                                            <View style={styles.lifestyleBadge}>
                                                <Text style={styles.lifestyleBadgeText}>{habit.lifestyle}</Text>
                                            </View>
                                        )}

                                        {/* Delete Button on Image */}
                                        <TouchableOpacity
                                            style={styles.deleteButtonOnImage}
                                            onPress={(e) => handleDeleteHabit(habit, e)}
                                            activeOpacity={0.8}
                                        >
                                            <Ionicons name="trash" size={16} color="#fff" />
                                        </TouchableOpacity>
                                    </View>

                                    {/* Habit Info */}
                                    <View style={styles.habitInfo}>
                                        <View style={styles.habitHeader}>
                                            <Text style={styles.habitName} numberOfLines={1}>
                                                {habit.habitName}
                                            </Text>
                                        </View>

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
                            </View>
                        )
                    })}
                </ScrollView>
            )}

            {/* Add Button */}
            <TouchableOpacity style={styles.addButton} onPress={() => openModal({ mode: 'add' })}>
                <Ionicons name="add" size={32} color="#fff" />
            </TouchableOpacity>
        </View>
    );
}

const mapState = state => ({
    habits: state?.habits
})

const mapDispatch = {
    getHabits,
    openModal
}

export default connect(mapState, mapDispatch)(YourHabits);