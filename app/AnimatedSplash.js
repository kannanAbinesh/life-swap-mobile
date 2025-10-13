import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated } from "react-native";
import LottieView from "lottie-react-native";

export default function AnimatedSplash({ onFinish }) {
    const fadeAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        const timer = setTimeout(() => {
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 600,
                useNativeDriver: true,
            }).start(() => onFinish && onFinish());
        }, 2500); // Duration of your animation
        return () => clearTimeout(timer);
    }, []);

    return (
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
            <LottieView
                source={require("../assets/JSON/splashScreen.json")}
                autoPlay
                loop={false}
                style={styles.animation}
            />
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
    },
    animation: {
        width: 250,
        height: 250,
    },
});
