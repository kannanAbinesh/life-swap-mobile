/* Plugins. */
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { Ionicons } from '@expo/vector-icons';
import { connect } from "react-redux";
import { useRoute } from '@react-navigation/native';

/* Components. */
import HabitsImageCarousel from '../HabitsImageCarousel/HabitsImageCarousel';
import { NoDataFound } from "../NoDataFound/NoDataFound";

/* Helpers. */
import { useTheme } from "../Theme/ThemeContext";
import { openModal } from "../../ActionCreators/modal";
import { baseURL } from "../../config";

/* Styles. */
import { createStyles } from "./habitsCardsGridStyle";

const HabitsCardsGrid = (props) => {

    /* Props. */
    const { data } = props;
    const { openModal } = props;

    /* Hooks declarations. */
    const { isDark } = useTheme();
    const route = useRoute();

    /* Style variables. */
    const styles = createStyles(isDark);

    /* Open modal to describe about the habit in explore (OR) adopted habits page and to let the edit habits in the your habits page. */
    const handleClick = (habit) => {
        openModal({ type: "manageHabits", data: habit })
    };

    /* Functionality to delete habits which will be shown only in the your habits page. */
    const handleDeleteHabit = (habitId) => {

    };

    if (data?.length === 0) return <NoDataFound />; /* If no habits are listed by the other users. */
    return (
        <ScrollView style={styles?.habitsCardsGrid} showsVerticalScrollIndicator={false} contentContainerStyle={styles.habitsCardContainer}>
            {data?.map((habit, index) => {
                return (
                    <View key={index} style={styles?.habitsCardWrapper}>
                        <TouchableOpacity style={styles?.habitCard} activeOpacity={0.8} onPress={() => { handleClick(habit) }}>

                            {/* Habits image section. */}
                            <View style={styles?.habitCardImageWrapper}>
                                {habit?.images && habit?.images?.length > 0 ? (<HabitsImageCarousel images={habit?.images} />) : (
                                    <View style={styles?.habitsCardsEmptyImageContainer}>
                                        <Ionicons name="image-outline" size={40} color="#ccc" />
                                    </View>
                                )}

                                {/* Habit lifestyle. */}
                                {(habit?.lifeStyle && habit.lifeStyle !== 'none') && (
                                    <View style={styles.habitsCardsLifeStyleWrapper}>
                                        <Text style={styles.habitsCardsLifeStyle}>{habit?.lifeStyle}</Text>
                                    </View>
                                )}

                                {/* Delete habit button */}
                                {(route.name === 'your-habits') && (
                                    <TouchableOpacity style={styles.habitsCardDeleteBtn} onPress={(e) => handleDeleteHabit(habit?._id)} activeOpacity={0.8}>
                                        <Ionicons name="trash" size={16} color="#fff" />
                                    </TouchableOpacity>
                                )}
                            </View>

                            {/* Habit info. */}
                            <View style={styles?.habitCardInfoContainer}>

                                {/* User info in explore and adopted habits routes. */}
                                {(route.name !== 'your-habits') && habit?.user && (
                                    <View style={styles.habitCardUserInfo}>
                                        <View style={styles.habitCardUserImageWrapper}>
                                            {habit?.user?.profileImage ? (
                                                <Image
                                                    source={{ uri: `${baseURL}uploads/profilePicture/${habit.user.profileImage}` }}
                                                    style={styles.habitCardUserImage}
                                                    resizeMode="cover"
                                                />
                                            ) : (
                                                <View style={styles.habitCardUserImagePlaceholder}>
                                                    <Ionicons name="person" size={12} color="#999" />
                                                </View>
                                            )}
                                        </View>
                                        <Text style={styles.habitCardUserName} numberOfLines={1}>
                                            {habit?.user?.name || 'Anonymous'}
                                        </Text>
                                    </View>
                                )}

                                {/* Habit name. */}
                                <View style={styles.habitCardHeader}>
                                    <Text style={styles.habitCardName} numberOfLines={1}>{habit?.habitName}</Text>
                                </View>

                                {/* Habit descriptions. */}
                                <Text style={styles.habitCardDescription} numberOfLines={2}>{habit?.description}</Text>

                                {/* Card footer which has the time to spend and the number of images uploaded for the habit. */}
                                <View style={styles.habitCardFooter}>
                                    <View style={styles.habitCardTimeContainer}>
                                        <Ionicons name="time-outline" size={14} color="#666" />
                                        <Text style={styles.habitCardTimeDuration}>{habit.timeDuration}</Text>
                                    </View>
                                    {(habit?.images && habit.images.length > 0) && (
                                        <View style={styles.habitCardImagesCount}>
                                            <Ionicons name="images-outline" size={14} color="#666" />
                                            <Text style={styles.habitCardImagesCountText}>{habit?.images?.length}</Text>
                                        </View>
                                    )}
                                </View>

                            </View>
                        </TouchableOpacity>
                    </View>
                )
            })}
        </ScrollView>
    );
};

const mapState = () => ({});

const mapDispatch = {
    openModal
};

export default connect(mapState, mapDispatch)(HabitsCardsGrid);