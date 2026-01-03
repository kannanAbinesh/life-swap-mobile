/* React */
import { useEffect, useState, useCallback } from 'react';
import { View, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';

/* Components */
import HabitsCardsGrid from '../HabitsCardsGrid/HabitsCardsGrid';
import { Loader } from '../Loader/Loader';

/* Helpers. */
import { useTheme } from '../Theme/ThemeContext';
import { getHabits } from '../../ActionCreators/getHabits';
import { openModal } from '../../ActionCreators/modal';

/* Styles */
import { createStyles } from "./yourHabitsStyles";

function YourHabits(props) {

    /* Props. */
    const { yourHabits } = props;
    const { getHabits, openModal } = props;

    /* State. */
    const [searchQuery, setSearchQuery] = useState('');
    const [debounceTimeout, setDebounceTimeout] = useState(null);

    /* Variables. */
    const { isDark } = useTheme();
    const styles = createStyles(isDark);

    useEffect(() => { getHabits({ type: 'myhabit' }) }, [getHabits]); /* Get the users habits functionality. */
    useEffect(() => { return () => { if (debounceTimeout) clearTimeout(debounceTimeout) } }, [debounceTimeout]);

    /* Functionality to handle search. */
    const handleSearchChange = useCallback((text) => {
        setSearchQuery(text);
        if (debounceTimeout) clearTimeout(debounceTimeout);
        const timeout = setTimeout(async () => { await getHabits({ type: 'myhabit', query: text.trim() }) }, 500);
        setDebounceTimeout(timeout);
    }, [debounceTimeout, getHabits]);

    /* Functionality to handle clear search. */
    const handleClearSearch = async () => {
        setSearchQuery('');
        if (debounceTimeout) clearTimeout(debounceTimeout);
        await getHabits({ type: 'myhabit' });
    };

    return (
        <View style={styles.yourHabitsContainer}>

            {/* Search bar */}
            <View style={styles.yourHabitsSearchContainer}>
                <View style={styles.yourHabitsSearchInputWrapper}>
                    <Ionicons name="search" size={20} color="#999" style={styles.yourHabitsSearchIcon} />
                    <TextInput
                        style={styles.yourHabitsSearchInput}
                        placeholder="Enter your activity"
                        placeholderTextColor="#999"
                        value={searchQuery}
                        onChangeText={handleSearchChange}
                    />
                    {searchQuery.length > 0 && (
                        <TouchableOpacity onPress={handleClearSearch} style={styles.yourHabitsClearButton}>
                            <Ionicons name="close-circle" size={18} color="#999" />
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            {/* Component to display habits. */}
            {yourHabits?.loader ? (<Loader />) : (<HabitsCardsGrid data={yourHabits?.data} />)}

            {/* Add Button */}
            <TouchableOpacity style={styles.yourHabitsAddButton} onPress={() => openModal({ mode: 'add' })}>
                <Ionicons name="add" size={27} color="#fff" />
            </TouchableOpacity>
        </View>
    );
}

const mapState = state => ({
    yourHabits: state?.habits
});

const mapDispatch = {
    getHabits,
    openModal
};

export default connect(mapState, mapDispatch)(YourHabits);