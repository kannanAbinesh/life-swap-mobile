/* Plugins. */
import { View, StyleSheet, Dimensions, Text } from "react-native";
import LottieView from "lottie-react-native";

const { width } = Dimensions.get('window');

export const NoDataFound = () => {
    return (
        <View style={styles.container}>
            <LottieView
                source={require('../../../assets/JSON/NoDataFound.json')}
                autoPlay
                loop
                style={styles.animation}
            />
            <Text style={styles?.text}>No habits found</Text>
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
        width: width * 0.9,
        height: width * 0.9,
        maxWidth: 250,
        maxHeight: 250,
    },
    text: {
        fontSize: 25,
        fontWeight: 'bold'
    }
});