import { Stack } from "expo-router";

export default function MoreLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" options={{ title: "More" }} />
            <Stack.Screen name="profile" options={{ title: "Profile" }} />
            <Stack.Screen name="your-habits" options={{ title: "Your Habits" }} />
            <Stack.Screen name="adopted-habits" options={{ title: "Adopted Habits" }} />
            <Stack.Screen name="privacy-and-policy" options={{ title: "Privacy & Policy" }} />
        </Stack>
    );
}
