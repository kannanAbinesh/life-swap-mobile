// /* Plugins. */
// import { View, ActivityIndicator } from "react-native";
// import { Provider } from 'react-redux';
// import { useFonts, Lexend_400Regular, Lexend_500Medium, Lexend_700Bold } from "@expo-google-fonts/lexend";

// /* Components. */
// import LifeSwapIndex from "./LifeSwap";

// /* Helpers. */
// import { store } from '../src/Reducers';

// export default function RootLayout() {

//   /* Hooks declarations. */
//   const [fontsLoaded, fontError] = useFonts({ Lexend_400Regular, Lexend_500Medium, Lexend_700Bold });

//   /* To make the default loader run until the fonts get loaded. */
//   if (!fontsLoaded) {
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <ActivityIndicator size="large" />
//       </View>
//     );
//   };

//   return (
//     <Provider store={store}>
//       < LifeSwapIndex />
//     </Provider>
//   );
// };


/* Plugins */
import { useEffect, useState } from "react";
import { View } from "react-native";
import { Provider } from "react-redux";
import { useFonts, Lexend_400Regular, Lexend_500Medium, Lexend_700Bold } from "@expo-google-fonts/lexend";

/* Components */
import LifeSwapIndex from "./LifeSwap";
import AnimatedSplash from "./AnimatedSplash";

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

  if (!fontsLoaded) {
    return null; // don’t render anything until fonts are ready
  }

  return (
    <Provider store={store}>
      <View style={{ flex: 1 }}>
        <LifeSwapIndex />
        {showSplash && <AnimatedSplash onFinish={() => setShowSplash(false)} />}
      </View>
    </Provider>
  );
}
