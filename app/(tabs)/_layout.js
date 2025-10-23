/* Plugins. */
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

/* Helpers. */
import { useTheme } from "../../src/Components/Theme/ThemeContext";

export default function TabsLayout() {

    /* Hooks declarations. */
    const insets = useSafeAreaInsets();
    const { isDark } = useTheme();

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: "#FF4D67",
                tabBarInactiveTintColor: isDark ? "#8E8E93" : "#8E8E93",
                tabBarStyle: {
                    backgroundColor: isDark ? "#252B47" : "#ffffff",
                    borderTopWidth: 1,
                    borderTopColor: isDark ? "#38383A" : "#E5E5EA",
                    height: 70 + insets.bottom,
                    paddingBottom: insets.bottom > 0 ? insets.bottom : 8,
                    paddingTop: 8,
                    elevation: 0,
                    shadowColor: isDark ? "#000" : "#000",
                    shadowOffset: { width: 0, height: -2 },
                    shadowOpacity: isDark ? 0.3 : 0.05,
                    shadowRadius: 8,
                },
                tabBarLabelStyle: {
                    fontSize: 11,
                    fontFamily: 'Lexend_600SemiBold',
                    marginTop: 4,
                },
                tabBarIconStyle: {
                    marginTop: 4,
                },
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color, size, focused }) => (<Ionicons name={focused ? "home" : "home-outline"} color={color} size={size} />)
                }}
            />
            <Tabs.Screen
                name="browse-habits"
                options={{
                    title: "Explore",
                    tabBarIcon: ({ color, size, focused }) => (<Ionicons name={focused ? "compass" : "compass-outline"} color={color} size={size} />)
                }}
            />
            <Tabs.Screen
                name="ai-coach"
                options={{
                    title: "AI coach",
                    tabBarIcon: ({ color, size, focused }) => (<Ionicons name={focused ? "sparkles" : "sparkles-outline"} color={color} size={size} />)
                }}
            />
            <Tabs.Screen
                name="more"
                options={{
                    title: "More",
                    tabBarIcon: ({ color, size, focused }) => (<Ionicons name={focused ? "person" : "person-outline"} color={color} size={size} />)
                }}
            />
        </Tabs>
    );
}