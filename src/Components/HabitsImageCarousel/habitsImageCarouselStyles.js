/* Plugins. */
import { Dimensions, StyleSheet } from "react-native";

/* Variable declarations. */
const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;

export function createStyles(isDark) {
    return StyleSheet.create({
        habitsImageCarouselContainer: {
            position: 'relative',
            overflow: 'hidden'
        },

        habitsImageCarouselImage: {
            resizeMode: 'cover'
        },

        habitsImageCarouselEmpty: {
            width: '100%',
            backgroundColor: '#f0f0f0',
            justifyContent: 'center',
            alignItems: 'center'
        },

        habitsImageCarouselIndicatorContainer: {
            position: 'absolute',
            bottom: 8,
            left: 0,
            right: 0,
            alignItems: 'center'
        },

        habitsImageCarouselIndicatorWrapper: {
            flexDirection: 'row',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 12,
            gap: 4
        },

        habitsImageCarouselIndicator: {
            width: 6,
            height: 6,
            borderRadius: 3,
            backgroundColor: 'rgba(255, 255, 255, 0.5)'
        },

        habitsImageCarouselIndicatorActive: {
            backgroundColor: '#fff',
            width: 18
        }
    });
};