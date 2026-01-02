/* Plugins. */
import { View, StyleSheet, Dimensions } from "react-native";
import LottieView from "lottie-react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get('window');

export const Loader = () => {
    return (
        <View style={styles.container} >
            <LottieView
                source={require('../../../assets/JSON/loader.json')} // Replace with your animation path
                autoPlay
                loop
                style={styles.animation}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
    },
    animation: {
        width: width * 0.5,
        height: width * 0.5,
        maxWidth: 250,
        maxHeight: 250,
    },
});