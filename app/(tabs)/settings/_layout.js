/* Plugins. */
import { Stack } from "expo-router";

/* Helpers. */
import { useTheme } from "../../../src/Components/Theme/ThemeContext";

export default function SettingLayout() {

    /* Hooks declaration. */
    const { isDark } = useTheme();

    return (
        <Stack
            screenOptions={{
                headerShown: true,
                headerStyle: {
                    backgroundColor: !isDark ? "#F5F5F5" : "#171D37",
                },
                headerTintColor: isDark ? "#FFFFFF" : "#000000",
                headerTitleStyle: {
                    color: isDark ? "#FFFFFF" : "#000000",
                }
            }}
        >
            <Stack.Screen name="index" options={{ title: "Settings" }} />
            <Stack.Screen name="profile" options={{ title: "Profile" }} />
            <Stack.Screen name="change-password" options={{ title: "Change password" }} />
            <Stack.Screen name="your-habits" options={{ title: "Your Habits" }} />
            <Stack.Screen name="adopted-habits" options={{ title: "Adopted Habits" }} />
            <Stack.Screen name="about-us" options={{ title: "About us" }} />
            <Stack.Screen name="privacy-and-policy" options={{ title: "Privacy & Policy" }} />
        </Stack >
    );
};