/* Plugins */
import { useEffect, useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import { Provider } from "react-redux";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts, Lexend_400Regular, Lexend_500Medium, Lexend_700Bold, Lexend_100Thin, Lexend_200ExtraLight, Lexend_300Light, Lexend_600SemiBold, Lexend_800ExtraBold, Lexend_900Black } from "@expo-google-fonts/lexend";

/* Components */
import LifeSwapIndex from "./index";
import { ThemeProvider } from "../src/Components/Theme/ThemeContext";
import OnBoarding from "../src/Components/OnBoarding/OnBoarding";
import CommonModal from '../src/Components/CommonModal/CommonModal'

/* Helpers */
import { store } from "../src/Reducers";
import { toastConfig } from "../src/Helpers/toastConfig";

export default function RootLayout() {

    /* State declarations. */
    const [showOnboarding, setShowOnboarding] = useState(false);

    /* Hooks declaration. */
    const [fontsLoaded] = useFonts({ Lexend_400Regular, Lexend_500Medium, Lexend_700Bold, Lexend_100Thin, Lexend_200ExtraLight, Lexend_300Light, Lexend_600SemiBold, Lexend_800ExtraBold, Lexend_900Black });

    useEffect(() => {
        if (!fontsLoaded) return;

        const initApp = async () => {
            try {
                const onboardingStatus = await AsyncStorage.getItem("@onboarding_completed");
                if (!onboardingStatus) setShowOnboarding(true);
            } catch (error) { }
        };

        initApp();
    }, [fontsLoaded]);

    const handleOnboardingComplete = async () => {
        try {
            await AsyncStorage.setItem("@onboarding_completed", "true");
            setShowOnboarding(false);
        } catch (error) { };
    };

    if (!fontsLoaded) return null;

    return (
        <Provider store={store}>
            <ThemeProvider>
                <View style={{ flex: 1 }}>
                    <CommonModal />
                    {showOnboarding ? (<OnBoarding onComplete={handleOnboardingComplete} />) : (<LifeSwapIndex />)}
                </View>
                <Toast config={toastConfig} />
            </ThemeProvider>
        </Provider>
    );
};

const styles = StyleSheet.create({
    splashContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
    },
    splashImage: {
        width: '60%',
        height: '60%',
        maxWidth: 300,
        maxHeight: 300,
    },
});