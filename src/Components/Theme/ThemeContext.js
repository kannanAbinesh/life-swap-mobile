/* Plugins. */
import { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

/* Global variables. */
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {

    const [themeMode, setThemeModeState] = useState('light'); /* State declaraions. */
    const isDark = themeMode === 'dark'; /* Variables. */

    /* Load the  */
    useEffect(() => {
        const loadThemePreference = async () => {
            try {
                const savedTheme = await AsyncStorage.getItem('theme');
                if (savedTheme && ['light', 'dark'].includes(savedTheme)) setThemeModeState(savedTheme);
            } catch (error) { Toast.show({ type: 'success', text1: 'We are unable to get your prefered theme' }) };
        };
        loadThemePreference();
    }, []);

    const setThemeMode = async (mode) => {
        try {
            if (!['light', 'dark'].includes(mode)) return;
            setThemeModeState(mode);
            await AsyncStorage.setItem('theme', mode);
        } catch (error) {
            console.error('Error saving theme preference:', error);
        }
    };

    const toggleTheme = () => {
        const newMode = isDark ? 'light' : 'dark';
        setThemeMode(newMode);
    };

    return (
        <ThemeContext.Provider value={{ themeMode, isDark, toggleTheme, setThemeMode }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error('useTheme must be used within ThemeProvider');
    return context;
};
