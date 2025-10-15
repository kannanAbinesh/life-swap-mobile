/* Plugins */
import { useEffect, useState } from "react";
import { View } from "react-native";
import { Provider } from "react-redux";
import { useFonts, Lexend_400Regular, Lexend_500Medium, Lexend_700Bold } from "@expo-google-fonts/lexend";

/* Components */
import LifeSwapIndex from "./LifeSwap";
import AnimatedSplash from "./AnimatedSplash";
import { ThemeProvider } from "../src/Components/Theme/ThemeContext";

/* Helpers */
import { store } from "../src/Reducers";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Lexend_400Regular,
    Lexend_500Medium,
    Lexend_700Bold,
  });

  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Optional delay to ensure animation shows even if fonts are ready fast
    if (fontsLoaded) {
      const timer = setTimeout(() => setShowSplash(false), 2800);
      return () => clearTimeout(timer);
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <Provider store={store}>
      <ThemeProvider>
        <View style={{ flex: 1 }}>
          <LifeSwapIndex />
          {showSplash && <AnimatedSplash onFinish={() => setShowSplash(false)} />}
        </View>
      </ThemeProvider>
    </Provider>
  );
}
