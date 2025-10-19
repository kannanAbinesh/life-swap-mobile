/* Plugins. */
import { useEffect, useRef } from "react";
import { Animated } from "react-native";
import LottieView from "lottie-react-native";

/* Style. */
import { styles } from "./splashScreenStyles";

function SplashScreen(props) {

    const { onFinish } = props;

    const fadeAnim = useRef(new Animated.Value(1)).current;
    useEffect(() => {
        const timer = setTimeout(() => { Animated.timing(fadeAnim, { toValue: 0, duration: 600, useNativeDriver: true }).start(() => onFinish && onFinish()) }, 2500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
            <LottieView
                source={require('../../../assets/JSON/splashScreen.json')}
                autoPlay
                loop={false}
                style={styles.animation}
            />
        </Animated.View>
    );
};

export default SplashScreen;