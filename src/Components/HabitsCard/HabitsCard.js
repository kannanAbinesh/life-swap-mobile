/* Plugins. */
import { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, Modal, Alert, ActivityIndicator } from 'react-native';
import { connect } from "react-redux";
import { useTheme } from "../Theme/ThemeContext";
import { createStyles } from "../YourHabits/yourHabitsStyles";
import { Ionicons } from '@expo/vector-icons';

function HabitsCard(props) {

    const { habit } = props;
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const { isDark } = useTheme();
    const styles = createStyles(isDark);

    // Handle next image
    const handleNextImage = () => {
        if (habit.images && habit.images.length > 0) {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === habit.images.length - 1 ? 0 : prevIndex + 1
            );
        }
    };

    // Handle previous image
    const handlePreviousImage = () => {
        if (habit.images && habit.images.length > 0) {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === 0 ? habit.images.length - 1 : prevIndex - 1
            );
        }
    };

    // Get current image
    const getCurrentImage = () => {
        if (!habit.images || habit.images.length === 0) return null;
        return habit.images[currentImageIndex];
    };

    const currentImage = getCurrentImage();
    const hasMultipleImages = habit.images && habit.images.length > 1;

    return (
        <View key={habit._id} style={styles.habitCard}>
            <View style={styles.habitImageContainer}>
                {habit.images && habit.images.length > 0 ? (
                    <View style={{ width: '100%', height: '100%', position: 'relative' }}>
                        <Image
                            source={{ uri: `http://192.168.0.100:3005/uploads/habits/${currentImage?.image}` }}
                            style={{ width: '100%', height: '100%' }}
                            resizeMode="cover"
                        />

                        {/* Left Arrow */}
                        {hasMultipleImages && (
                            <TouchableOpacity
                                style={{
                                    position: 'absolute',
                                    left: 8,
                                    top: '50%',
                                    transform: [{ translateY: -12 }],
                                    zIndex: 10,
                                    backgroundColor: 'rgba(0,0,0,0.5)',
                                    borderRadius: 20,
                                    padding: 8
                                }}
                                onPress={handlePreviousImage}
                            >
                                <Ionicons name="chevron-back" size={20} color="#fff" />
                            </TouchableOpacity>
                        )}

                        {/* Right Arrow */}
                        {hasMultipleImages && (
                            <TouchableOpacity
                                style={{
                                    position: 'absolute',
                                    right: 8,
                                    top: '50%',
                                    transform: [{ translateY: -12 }],
                                    zIndex: 10,
                                    backgroundColor: 'rgba(0,0,0,0.5)',
                                    borderRadius: 20,
                                    padding: 8
                                }}
                                onPress={handleNextImage}
                            >
                                <Ionicons name="chevron-forward" size={20} color="#fff" />
                            </TouchableOpacity>
                        )}

                        {/* Dot Indicators */}
                        {hasMultipleImages && (
                            <View
                                style={{
                                    position: 'absolute',
                                    bottom: 8,
                                    left: 0,
                                    right: 0,
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    gap: 4
                                }}
                            >
                                {habit.images.map((_, index) => (
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
                    </View>
                ) : (
                    <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f0f0' }}>
                        <Ionicons name="image-outline" size={48} color="#ccc" />
                    </View>
                )}
                <View style={styles.lifestyleBadge}>
                    <Text style={styles.lifestyleBadgeText}>{habit.lifeStyle}</Text>
                </View>
            </View>

            <View style={styles.habitInfo}>
                <View style={styles.habitHeader}>
                    <Text style={styles.habitName}>{habit.habitName}</Text>
                    <TouchableOpacity style={styles.deleteButton}>
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
    );
};

const mapState = state => ({});

const mapDispatch = {}

export default connect(mapState, mapDispatch)(HabitsCard);