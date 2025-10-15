/* React */
import { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Modal, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

/* Components */
import YourHabitsForm from '../YourHabitsForm/YourHabitsForm';
import { useTheme } from '../Theme/ThemeContext';

/* Styles */
import { createStyles } from "./yourHabitsStyles";
import { getHabits } from '../../ActionCreators/getHabits';
import { connect } from 'react-redux';

// Auto-scrolling image component for each habit
function HabitImageCarousel({ images }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    console.log(images, 'imagesimagesimagesimages----')

    useEffect(() => {
        if (!images || images.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 3000); // Change image every 3 seconds

        return () => clearInterval(interval);
    }, [images]);

    if (!images || images.length === 0) {
        return (
            <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f0f0' }}>
                <Ionicons name="image-outline" size={48} color="#ccc" />
            </View>
        );
    }

    return (
        <>
            <Image
                source={{ uri: `http://192.168.0.107:3005/uploads/habits/${images[currentImageIndex]?.image}` }}
                style={{ width: '100%', height: '100%' }}
                resizeMode="cover"
            />
            {images.length > 1 && (
                <View style={{
                    position: 'absolute',
                    bottom: 8,
                    left: 0,
                    right: 0,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    gap: 4
                }}>
                    {images.map((_, index) => (
                        <View
                            key={index}
                            style={{
                                width: 6,
                                height: 6,
                                borderRadius: 3,
                                backgroundColor: index === currentImageIndex ? '#fff' : 'rgba(255,255,255,0.5)'
                            }}
                        />
                    ))}
                </View>
            )}
        </>
    );
}

function YourHabits({ getHabits, habits }) {

    const [modalVisible, setModalVisible] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(false);

    const { isDark } = useTheme();
    const styles = createStyles(isDark);

    useEffect(() => {
        const fetchHabits = async () => {
            setFetchLoading(true);
            await getHabits({ type: 'myhabit' });
            setFetchLoading(false);
        };
        fetchHabits();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Your Habits</Text>
                <Text style={styles.headerSubtitle}>{habits.length} habits tracked</Text>
            </View>

            {fetchLoading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#FF4D67" />
                    <Text style={styles.loadingText}>Loading habits...</Text>
                </View>
            ) : habits?.data?.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Ionicons name="fitness-outline" size={64} color="#ccc" />
                    <Text style={styles.emptyText}>No habits yet</Text>
                    <Text style={styles.emptySubtext}>Tap the + button to add your first habit</Text>
                </View>
            ) : (
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
                                    <TouchableOpacity
                                        onPress={() => deleteHabit(habit._id)}
                                        style={styles.deleteButton}
                                    >
                                        <Ionicons name="trash-outline" size={20} color="#FF4D67" />
                                    </TouchableOpacity>
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
            )}

            <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
                <Ionicons name="add" size={32} color="#fff" />
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <YourHabitsForm closeModal={() => setModalVisible(false)} />
            </Modal>
        </View>
    );
};

const mapState = state => ({
    habits: state?.habits
})

const mapDispatch = {
    getHabits
}

export default connect(mapState, mapDispatch)(YourHabits);