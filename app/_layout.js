/* Plugins */
import { useEffect, useState } from "react";
import { View } from "react-native";
import { Provider } from "react-redux";
import Toast from 'react-native-toast-message';
import { useFonts, Lexend_400Regular, Lexend_500Medium, Lexend_700Bold, Lexend_100Thin, Lexend_200ExtraLight, Lexend_300Light, Lexend_600SemiBold, Lexend_800ExtraBold, Lexend_900Black } from "@expo-google-fonts/lexend";

/* Components */
import LifeSwapIndex from "./LifeSwap";
import AnimatedSplash from "./AnimatedSplash";
import { ThemeProvider } from "../src/Components/Theme/ThemeContext";

/* Helpers */
import { store } from "../src/Reducers";
import { toastConfig } from "../src/Helpers/toastConfig";

export default function RootLayout() {

  /* State declarations. */
  const [showSplash, setShowSplash] = useState(true);

  /* Hooks declarations */
  const [fontsLoaded] = useFonts({ Lexend_400Regular, Lexend_500Medium, Lexend_700Bold, Lexend_100Thin, Lexend_200ExtraLight, Lexend_300Light, Lexend_600SemiBold, Lexend_800ExtraBold, Lexend_900Black });

  useEffect(() => {
    if (fontsLoaded) {
      const timer = setTimeout(() => setShowSplash(false), 2800);
      return () => clearTimeout(timer);
    };
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <Provider store={store}>
      <ThemeProvider>
        <View style={{ flex: 1 }}>
          <LifeSwapIndex />
          {showSplash && <AnimatedSplash onFinish={() => setShowSplash(false)} />}
        </View>
        <Toast config={toastConfig} />
      </ThemeProvider>
    </Provider>
  );
};