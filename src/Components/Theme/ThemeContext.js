/* Plugins. */
import { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'react-native';

/* Global variables. */
const ThemeContext = createContext();
const THEME_STORAGE_KEY = 'theme';

export const ThemeProvider = ({ children }) => {

    const systemColorScheme = useColorScheme(); /* Hooks. */

    /* State. */
    const [themeMode, setThemeModeState] = useState('system');

    /* Variables. */
    const isDark = themeMode === 'system' ? systemColorScheme === 'dark' : themeMode === 'dark';

    useEffect(() => {
        const loadThemePreference = async () => {
            try {
                const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
                if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) setThemeModeState(savedTheme);
            } catch (error) { console.error('Error loading theme preference:', error) }
            finally { };
        };

        loadThemePreference();
    }, []);

    const setThemeMode = async (mode) => {
        try {
            setThemeModeState(mode);
            await AsyncStorage.setItem(THEME_STORAGE_KEY, mode);
        } catch (error) { console.error('Error saving theme preference:', error) }
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
