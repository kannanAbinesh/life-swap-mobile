/* Plugins. */
import { View, Text, TouchableOpacity, ScrollView, Image, Platform, KeyboardAvoidingView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';

/* Helpers. */
import { useTheme } from '../Theme/ThemeContext';

/* Styles. */
import { createStyles } from './aboutUsStyles';

function AboutUs() {

    /* Hooks. */
    const navigation = useNavigation();
    const { isDark } = useTheme()

    /* Variable declarations. */
    const styles = createStyles(isDark);

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles?.container} >

            {/* Header section. */}
            <View style={styles.headerSection}>
                <TouchableOpacity style={styles.navButton}>
                    <Ionicons name="arrow-back" onPress={() => navigation.goBack()} size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>About us</Text>
                <View style={styles.navButton} />
            </View>

            {/* Content section. */}
            <ScrollView style={styles.scrollViewContainer}>
                <View style={styles.content}>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Our Mission</Text>
                        <Text style={styles.sectionText}>
                            We're dedicated to helping you build better habits and transform your life.
                            Our app provides the tools, motivation, and support you need to achieve your goals
                            and create lasting positive change.
                        </Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>What We Offer</Text>

                        {
                            [
                                { image: "https://www.quirks.com/storage/attachments/5de925bd21b49d09eb0f6433/639284714bcc8766c13ce24f/original/5-ways-to-clearly-and-easily-track-your-progress-every-day.png", title: "Track Your Progress", text: "Monitor your habits daily and watch your streaks grow with detailed analytics.", icon: "trending-up" },
                                { image: "https://t3.ftcdn.net/jpg/06/96/11/88/360_F_696118869_uERSchG7i4ccQuHxTQAVpBwCbfttpClc.jpg", title: "Smart Reminders", text: "Get timely notifications to keep you on track with your daily routines.", icon: "notifications" },
                                { image: "https://www.geaugajfs.org/sites/default/files/community.jpg", title: "Community Support", text: "Join thousands of users on their journey to better habits and personal growth.", icon: "people" },
                            ]?.map((ele, index) => (
                                <View style={styles.featureCard} key={index}>
                                    <Image source={{ uri: ele?.image }} style={styles.featureImage} resizeMode="cover" />
                                    <View style={styles.featureContent}>
                                        <View style={styles.featureIconContainer}>
                                            <Ionicons name={ele?.icon} size={24} color="#FF4D67" />
                                        </View>
                                        <Text style={styles.featureTitle}>{ele?.title}</Text>
                                        <Text style={styles.featureText}>{ele?.text}</Text>
                                    </View>
                                </View>
                            ))
                        }
                    </View>

                    {/* Social Media Section */}
                    <View style={styles.socialSection}>
                        <Text style={styles.sectionTitle}>Follow Us</Text>
                        <View style={styles.socialContainer}>
                            {['logo-facebook', 'logo-twitter', 'logo-instagram', 'logo-linkedin']?.map((ele, index) => (
                                <TouchableOpacity key={index} style={styles.socialButton}>
                                    <Ionicons name={ele} size={24} color="#fff" />
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {/* Version Info */}
                    <View style={styles.versionContainer}>
                        <Text style={styles.versionText}>Version 1.0.0</Text>
                        <Text style={styles.copyrightText}>© 2024 Habit Tracker. All rights reserved.</Text>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default AboutUs;