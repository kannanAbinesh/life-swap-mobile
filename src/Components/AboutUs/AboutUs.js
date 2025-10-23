/* Plugins. */
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';

/* Helpers. */
import { useTheme } from '../Theme/ThemeContext';

/* Styles. */
import { createStyles } from "./aboutStyles";

function AboutUs() {

    /* Hooks. */
    const navigation = useNavigation();
    const { isDark } = useTheme();

    /* Variables. */
    const styles = createStyles(isDark);

    return (
        <View style={styles?.container}>

            <View style={styles.headerSection}>
                <View style={styles.topNav}>
                    <TouchableOpacity style={styles.navButton}>
                        <Ionicons name="arrow-back" onPress={() => navigation.goBack()} size={24} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>About Us</Text>
                    <View style={styles.navButton} />
                </View>
            </View>

            <ScrollView style={styles.scrollView}>
                <View style={styles.content}>

                    {/* Mission Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Our Mission</Text>
                        <Text style={styles.sectionText}>
                            We're dedicated to helping you build better habits and transform your life.
                            Our app provides the tools, motivation, and support you need to achieve your goals
                            and create lasting positive change.
                        </Text>
                    </View>

                    {/* Features Grid with Images */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>What We Offer</Text>

                        <View style={styles.featureCard}>
                            <Image
                                source={{ uri: 'https://www.quirks.com/storage/attachments/5de925bd21b49d09eb0f6433/639284714bcc8766c13ce24f/original/5-ways-to-clearly-and-easily-track-your-progress-every-day.png' }}
                                style={styles.featureImage}
                                resizeMode="cover"
                            />
                            <View style={styles.featureContent}>
                                <View style={styles.featureIconContainer}>
                                    <Ionicons name="trending-up" size={24} color="#FF4D67" />
                                </View>
                                <Text style={styles.featureTitle}>Track Your Progress</Text>
                                <Text style={styles.featureText}>
                                    Monitor your habits daily and watch your streaks grow with detailed analytics.
                                </Text>
                            </View>
                        </View>

                        <View style={styles.featureCard}>
                            <Image
                                source={{ uri: 'https://t3.ftcdn.net/jpg/06/96/11/88/360_F_696118869_uERSchG7i4ccQuHxTQAVpBwCbfttpClc.jpg' }}
                                style={styles.featureImage}
                                resizeMode="cover"
                            />
                            <View style={styles.featureContent}>
                                <View style={styles.featureIconContainer}>
                                    <Ionicons name="notifications" size={24} color="#FF4D67" />
                                </View>
                                <Text style={styles.featureTitle}>Smart Reminders</Text>
                                <Text style={styles.featureText}>
                                    Get timely notifications to keep you on track with your daily routines.
                                </Text>
                            </View>
                        </View>

                        <View style={styles.featureCard}>
                            <Image
                                source={{ uri: 'https://www.geaugajfs.org/sites/default/files/community.jpg' }}
                                style={styles.featureImage}
                                resizeMode="cover"
                            />
                            <View style={styles.featureContent}>
                                <View style={styles.featureIconContainer}>
                                    <Ionicons name="people" size={24} color="#FF4D67" />
                                </View>
                                <Text style={styles.featureTitle}>Community Support</Text>
                                <Text style={styles.featureText}>
                                    Join thousands of users on their journey to better habits and personal growth.
                                </Text>
                            </View>
                        </View>
                    </View>

                    {/* Social Media Section */}
                    <View style={styles.socialSection}>
                        <Text style={styles.sectionTitle}>Follow Us</Text>
                        <View style={styles.socialContainer}>
                            <TouchableOpacity style={styles.socialButton}>
                                <Ionicons name="logo-facebook" size={24} color="#fff" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.socialButton}>
                                <Ionicons name="logo-twitter" size={24} color="#fff" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.socialButton}>
                                <Ionicons name="logo-instagram" size={24} color="#fff" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.socialButton}>
                                <Ionicons name="logo-linkedin" size={24} color="#fff" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Version Info */}
                    <View style={styles.versionContainer}>
                        <Text style={styles.versionText}>Version 1.0.0</Text>
                        <Text style={styles.copyrightText}>© 2025 VSPL. All rights reserved.</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

export default AboutUs;