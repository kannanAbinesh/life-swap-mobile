/* Plugins. */
import { useEffect, useRef, useState } from "react";
import { Dimensions, Image, ScrollView, View } from "react-native"
import { Ionicons } from '@expo/vector-icons';

/* Helpers. */
import { baseURL } from "../../config";
import { useTheme } from "../Theme/ThemeContext";

/* Styles. */
import { createStyles } from "./habitsImageCarouselStyles";

function HabitsImageCarousel(props) {

    /* Props. */
    const { images, height = 140 } = props;

    /* State declarations. */
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    /* Hooks declarations. */
    const scrollViewRef = useRef(null);
    const autoScrollTimer = useRef(null);
    const { isDark } = useTheme();

    /* Variable declarations. */
    const styles = createStyles(isDark);
    const { width } = Dimensions.get('window');
    const CARD_WIDTH = (width - 48) / 2;

    /* useEffect to handle and intiate auto scroll/ */
    useEffect(() => {
        if (!images || images.length <= 1) return;
        startAutoScroll();
        return () => { if (autoScrollTimer.current) clearInterval(autoScrollTimer.current) };
    }, [images, currentImageIndex]);

    /* Functionality to handle auto scroll option. */
    const startAutoScroll = () => {
        if (autoScrollTimer.current) clearInterval(autoScrollTimer.current);
        autoScrollTimer.current = setInterval(() => {
            let nextIndex = currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1;
            setCurrentImageIndex(nextIndex);
            scrollViewRef.current?.scrollTo({ x: nextIndex * CARD_WIDTH, animated: true });
        }, 3500);
    };
    const handleScrollBegin = () => { if (autoScrollTimer.current) clearInterval(autoScrollTimer.current) };
    const handleScrollEnd = () => { startAutoScroll() };

    /* Functionalities to handle the manual scroll option. */
    const handleScroll = (event) => {
        let contentOffsetX = event.nativeEvent.contentOffset.x;
        let newIndex = Math.round(contentOffsetX / CARD_WIDTH);
        if (newIndex !== currentImageIndex && newIndex >= 0 && newIndex < images.length) setCurrentImageIndex(newIndex);
    };

    /* If no image is uploaded. */
    if (!images || images?.length === 0) {
        return (
            <View style={[styles.habitsImageCarouselEmpty, { height }]}>
                <Ionicons name="image-outline" size={40} color="#ccc" />
            </View>
        );
    };

    /* If images are uploaded and the count is more than one. */
    if (images?.length > 1) {
        return (
            <View style={[styles.habitsImageCarouselContainer, { height }]}>
                <ScrollView
                    ref={scrollViewRef}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onScroll={handleScroll}
                    onScrollBeginDrag={handleScrollBegin}
                    onScrollEndDrag={handleScrollEnd}
                    scrollEventThrottle={16}
                >
                    {images.map((img, index) => (
                        <Image
                            key={index}
                            source={{ uri: `${baseURL}uploads/habits/${img?.image}` }}
                            style={[styles.habitsImageCarouselImage, { width: CARD_WIDTH, height }]}
                            resizeMode="cover"
                        />
                    ))}
                </ScrollView>

                {/* Image indicator. */}
                <View style={styles.habitsImageCarouselIndicatorContainer}>
                    <View style={styles.habitsImageCarouselIndicatorWrapper}>
                        {images.map((_, index) => (<View key={index} style={[styles.habitsImageCarouselIndicator, index === currentImageIndex && styles.habitsImageCarouselIndicatorActive]} />))}
                    </View>
                </View>
            </View>
        );
    };
};

export default HabitsImageCarousel;