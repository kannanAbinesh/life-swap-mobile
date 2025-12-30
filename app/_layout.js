/* Plugins */
import { useEffect, useState } from "react";
import { View } from "react-native";
import { Provider } from "react-redux";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    useFonts,
    Lexend_400Regular,
    Lexend_500Medium,
    Lexend_700Bold,
    Lexend_100Thin,
    Lexend_200ExtraLight,
    Lexend_300Light,
    Lexend_600SemiBold,
    Lexend_800ExtraBold,
    Lexend_900Black,
} from "@expo-google-fonts/lexend";

/* Components */
import LifeSwapIndex from "./index";
import SplashScreen from "../src/Components/SplashScreen/SplashScreen";
import OnBoarding from "../src/Components/OnBoarding/OnBoarding";
import { ThemeProvider } from "../src/Components/Theme/ThemeContext";

/* Helpers */
import { store } from "../src/Reducers";
import { toastConfig } from "../src/Helpers/toastConfig";

export default function RootLayout() {
    const [showSplash, setShowSplash] = useState(true);
    const [showOnboarding, setShowOnboarding] = useState(false);

    console.log("🔵 RootLayout rendered");

    const [fontsLoaded] = useFonts({
        Lexend_400Regular,
        Lexend_500Medium,
        Lexend_700Bold,
        Lexend_100Thin,
        Lexend_200ExtraLight,
        Lexend_300Light,
        Lexend_600SemiBold,
        Lexend_800ExtraBold,
        Lexend_900Black,
    });

    console.log("🟢 Fonts loaded:", fontsLoaded);

    useEffect(() => {
        console.log("🟡 useEffect triggered, fontsLoaded:", fontsLoaded);
        
        if (!fontsLoaded) {
            console.log("🔴 Fonts not loaded yet, returning early");
            return;
        }

        const initApp = async () => {
            console.log("🟣 initApp started");
            
            try {
                const onboardingStatus = await AsyncStorage.getItem(
                    "@onboarding_completed"
                );

                console.log("✅ Onboarding Status:", onboardingStatus);

                if (!onboardingStatus) {
                    console.log("🎯 Setting showOnboarding to true");
                    setShowOnboarding(true);
                } else {
                    console.log("⏭️ Onboarding already completed");
                }
            } catch (error) {
                console.log("❌ AsyncStorage error:", error);
            }

            setTimeout(() => {
                console.log("⏰ Hiding splash screen");
                setShowSplash(false);
            }, 2800);
        };

        initApp();
    }, [fontsLoaded]);

    const handleOnboardingComplete = async () => {
        console.log("🎉 Onboarding completed, saving to AsyncStorage");
        try {
            await AsyncStorage.setItem("@onboarding_completed", "true");
            console.log("💾 Onboarding status saved");
            setShowOnboarding(false);
        } catch (error) {
            console.log("❌ Error saving onboarding status:", error);
        }
    };

    console.log("📊 Current state:", { showSplash, showOnboarding, fontsLoaded });

    // Block UI ONLY until fonts load
    if (!fontsLoaded) {
        console.log("⏳ Waiting for fonts...");
        return null;
    }

    return (
        <Provider store={store}>
            <ThemeProvider>
                <View style={{ flex: 1 }}>
                    {showOnboarding ? (
                        <OnBoarding onComplete={handleOnboardingComplete} />
                    ) : (
                        <LifeSwapIndex />
                    )}

                    {showSplash && <SplashScreen />}
                </View>

                <Toast config={toastConfig} />
            </ThemeProvider>
        </Provider>
    );
}