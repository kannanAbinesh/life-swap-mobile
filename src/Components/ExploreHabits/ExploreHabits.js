/* Plugins. */
import { View } from "react-native";
import { connect } from "react-redux";

/* Componenets. */
import HabitsCardsGrid from "../HabitsCardsGrid/HabitsCardsGrid";
import { Loader } from "../Loader/Loader";

/* Helpers. */
import { useTheme } from "../Theme/ThemeContext";

/* Style. */
import { createStyles } from "./exploreHabitsStyle";

function ExploreHabits(props) {

    /* Props. */
    const { habits } = props;

    /* Variables. */
    const { isDark } = useTheme();
    const styles = createStyles(isDark);

    return (
        <View style={styles.browseHabitsContainer}>

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

            {habits?.loader ? (<Loader />) : (<HabitsCardsGrid data={habits?.data} />)}

        </View>
    );
};

const mapState = state => ({
    habits: state?.habits
});

const mapDispatch = {};

export default connect(mapState, mapDispatch)(ExploreHabits);