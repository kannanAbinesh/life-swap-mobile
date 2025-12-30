import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    Dimensions,
    Pressable,
    Platform,
    Image,
} from 'react-native';
import { useRef, useState } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { onBoardingPages, BACKGROUND_COLOR } from '../../Helpers/onBoarding';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const OnBoarding = ({ onComplete }) => {
    const scrollViewRef = useRef(null);
    const [currentPageIndex, setCurrentPageIndex] = useState(0);

    const handleScrollEvent = (event) => {
        const scrollPositionX = event.nativeEvent.contentOffset.x;
        const pageIndex = Math.round(scrollPositionX / SCREEN_WIDTH);
        setCurrentPageIndex(pageIndex);
    };

    const handleNextPress = () => {
        const isLastPage = currentPageIndex === onBoardingPages.length - 1;

        if (isLastPage) {
            onComplete();
        } else {
            scrollViewRef.current.scrollTo({
                x: (currentPageIndex + 1) * SCREEN_WIDTH,
                animated: true,
            });
        }
    };

    const handleDotPress = (pageIndex) => {
        scrollViewRef.current.scrollTo({
            x: pageIndex * SCREEN_WIDTH,
            animated: true,
        });
        setCurrentPageIndex(pageIndex);
    };

    const handleSkipPress = () => {
        onComplete();
    };

    const isLastPage = currentPageIndex === onBoardingPages.length - 1;

    return (
        <View style={styles.container}>
            {/* Skip Button */}
            {!isLastPage && (
                <View style={styles.skipButtonContainer}>
                    <Pressable
                        onPress={handleSkipPress}
                        style={({ pressed }) => [
                            styles.skipButton,
                            pressed && styles.skipButtonPressed
                        ]}
                    >
                        <Text style={styles.skipButtonText}>Skip</Text>
                    </Pressable>
                </View>
            )}

            {/* Scrollable Pages */}
            <ScrollView
                ref={scrollViewRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={handleScrollEvent}
                scrollEventThrottle={16}
            >
                {onBoardingPages.map((page, index) => (
                    <View key={index} style={styles.pageContainer}>
                        <View style={styles.contentContainer}>
                            <Image source={page.source} style={styles.pageImage} />
                            <Text style={styles.pageTitle}>{page.title}</Text>
                            <Text style={styles.pageDescription}>{page.description}</Text>
                        </View>
                    </View>
                ))}
            </ScrollView>

            {/* Footer Navigation */}
            <View style={styles.footerContainer}>
                <View style={styles.footer}>
                    {/* Pagination Dots */}
                    <View style={styles.paginationDotsContainer}>
                        {onBoardingPages.map((_, index) => (
                            <Pressable
                                key={index}
                                onPress={() => handleDotPress(index)}
                                hitSlop={8}
                            >
                                <View
                                    style={[
                                        styles.paginationDot,
                                        currentPageIndex === index && styles.paginationDotActive,
                                    ]}
                                />
                            </Pressable>
                        ))}
                    </View>

                    {/* Center Text */}
                    <View style={styles.footerTextContainer}>
                        <Text style={styles.footerText}>
                            {isLastPage ? 'Get Started' : 'View Board'}
                        </Text>
                    </View>

                    {/* Navigation Arrow Button */}
                    <View style={styles.navigationButtonContainer}>
                        <Pressable
                            onPress={handleNextPress}
                            style={({ pressed }) => [
                                styles.navigationButton,
                                pressed && styles.navigationButtonPressed,
                            ]}
                        >
                            <AntDesign
                                name={isLastPage ? "check" : "arrow-right"}
                                size={24}
                                color="#fff"
                            />
                        </Pressable>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BACKGROUND_COLOR,
    },
    skipButtonContainer: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 60 : 40,
        right: 20,
        zIndex: 10,
    },
    skipButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    skipButtonPressed: {
        opacity: 0.7,
        transform: [{ scale: 0.95 }],
    },
    skipButtonText: {
        color: '#333',
        fontSize: 14,
        fontWeight: '600',
    },
    pageContainer: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        alignItems: 'center',
        justifyContent: 'center',
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 50,
        paddingBottom: 150,
    },
    pageImage: {
        width: SCREEN_WIDTH * 0.7,
        height: SCREEN_HEIGHT * 0.4,
        resizeMode: 'contain',
        marginBottom: 30,
    },
    pageTitle: {
        textAlign: 'center',
        fontSize: 28,
        fontWeight: '700',
        marginBottom: 15,
        color: '#000',
    },
    pageDescription: {
        textAlign: 'center',
        color: '#666',
        fontSize: 16,
        lineHeight: 24,
    },
    footerContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: SCREEN_WIDTH * 0.05,
        paddingBottom: Platform.OS === 'ios' ? 50 : 30,
    },
    footer: {
        height: 70,
        backgroundColor: '#fff',
        borderRadius: 35,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    paginationDotsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingRight: 10,
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#E0E0E0',
    },
    paginationDotActive: {
        width: 24,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#000',
    },
    footerTextContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    footerText: {
        fontSize: 13,
        textTransform: 'uppercase',
        letterSpacing: 1.5,
        fontWeight: '600',
        color: '#000',
    },
    navigationButtonContainer: {
        paddingLeft: 10,
    },
    navigationButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
    },
    navigationButtonPressed: {
        transform: [{ scale: 0.95 }],
        opacity: 0.8,
    },
});

export default OnBoarding