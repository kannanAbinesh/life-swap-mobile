/* Plugins. */
import { View, StyleSheet, Dimensions, Text } from "react-native";
import LottieView from "lottie-react-native";
import { useTheme } from '../Theme/ThemeContext';

const { width } = Dimensions.get('window');

export const NoDataFound = () => {
    
    const { isDark } = useTheme();
    const styles = createStyles(isDark);

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <LottieView
                    source={require('../../../assets/JSON/NoDataFound.json')}
                    autoPlay
                    loop
                    style={styles.animation}
                    pointerEvents="none"
                />
                <View style={styles.textContainer}>
                    <Text style={styles.title}>No Habits Found</Text>
                    <Text style={styles.subtitle}>
                        Start building better habits today!
                    </Text>
                    <Text style={styles.description}>
                        Tap the + button below to create your first habit
                    </Text>
                </View>
            </View>
        </View>
    );
};

function createStyles(isDark) {
    return StyleSheet.create({
        container: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1,
            paddingHorizontal: 20,
        },
        content: {
            alignItems: 'center',
            justifyContent: 'center',
            maxWidth: 400,
        },
        animation: {
            width: width * 0.7,
            height: width * 0.7,
            maxWidth: 280,
            maxHeight: 280,
        },
        textContainer: {
            alignItems: 'center',
        },
        title: {
            fontSize: 24,
            fontWeight: '700',
            color: isDark ? "#ffffff" : "#1a1a1a",
            marginBottom: 8,
            fontFamily: 'Lexend_700Bold',
            textAlign: 'center',
        },
        subtitle: {
            fontSize: 16,
            fontWeight: '500',
            color: isDark ? "#b0b0b0" : "#4a5568",
            marginBottom: 6,
            fontFamily: 'Lexend_500Medium',
            textAlign: 'center',
        },
        description: {
            fontSize: 14,
            color: isDark ? "#808080" : "#718096",
            fontFamily: 'Lexend_400Regular',
            textAlign: 'center',
            lineHeight: 20,
            paddingHorizontal: 20,
        }
    });
}