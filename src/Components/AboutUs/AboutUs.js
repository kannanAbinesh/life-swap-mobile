/* Plugins. */
import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';

function AboutUs() {

    /* Hooks. */
    const navigation = useNavigation();

    return (
        <ScrollView style={styles.container}>
            {/* Header Section */}
            <View style={styles.headerSection}>
                <View style={styles.topNav}>
                    <TouchableOpacity style={styles.navButton}>
                        <Ionicons name="arrow-back" onPress={() => navigation.goBack()} size={24} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>About Us</Text>
                    <View style={styles.navButton} />
                </View>

                <View style={styles.headerIconContainer}>
                    <View style={styles.iconCircle}>
                        <Ionicons name="information-circle" size={40} color="#fff" />
                    </View>
                </View>
            </View>

            {/* Content Section */}
            <View style={styles.content}>

                {/* <View style={styles.logoContainer}>
                    <Image
                        source={logo}
                        style={styles.appLogo}
                        resizeMode="contain"
                    />
                </View> */}

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
                    <Text style={styles.copyrightText}>© 2024 Habit Tracker. All rights reserved.</Text>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    headerSection: {
        backgroundColor: '#FF4D67',
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        paddingTop: 50,
        paddingBottom: 40,
        paddingHorizontal: 20,
    },
    topNav: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    navButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#fff',
        fontFamily: 'Lexend_400Regular',
    },
    headerIconContainer: {
        alignItems: 'center',
        marginTop: 10,
    },
    iconCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 3,
        borderColor: '#fff',
    },
    content: {
        marginTop: 20,
        padding: 20,
        paddingBottom: 40,
    },
    logoContainer: {
        marginBottom: 25
    },
    appLogo: {
        width: 80,
        height: 80,
        borderRadius: 20,
    },
    section: {
        marginBottom: 30,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#333',
        marginBottom: 15,
        fontFamily: 'Lexend_400Regular',
    },
    sectionText: {
        fontSize: 15,
        color: '#666',
        lineHeight: 24,
        textAlign: 'justify',
        fontFamily: 'Lexend_400Regular',
    },
    featureCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        marginBottom: 15,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    featureImage: {
        width: '100%',
        height: 150,
        backgroundColor: '#E0E0E0',
    },
    featureContent: {
        padding: 20,
    },
    featureIconContainer: {
        marginBottom: 10,
    },
    featureTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
        fontFamily: 'Lexend_400Regular',
    },
    featureText: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
        fontFamily: 'Lexend_400Regular',
    },
    teamContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
    teamMember: {
        alignItems: 'center',
        width: '30%',
        marginBottom: 20,
    },
    teamImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#E0E0E0',
        marginBottom: 10,
        borderWidth: 3,
        borderColor: '#FF4D67',
    },
    teamName: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        textAlign: 'center',
        marginBottom: 4,
        fontFamily: 'Lexend_400Regular',
    },
    teamRole: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
        fontFamily: 'Lexend_400Regular',
    },
    statsSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30,
    },
    statCard: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        alignItems: 'center',
        marginHorizontal: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    statNumber: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FF4D67',
        marginTop: 10,
        fontFamily: 'Lexend_400Regular',
    },
    statLabel: {
        fontSize: 11,
        color: '#666',
        textAlign: 'center',
        marginTop: 5,
        fontFamily: 'Lexend_400Regular',
    },
    contactItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 12,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },
    contactText: {
        fontSize: 14,
        color: '#333',
        marginLeft: 15,
        fontFamily: 'Lexend_400Regular',
    },
    socialSection: {
        marginBottom: 30,
        paddingTop: 20,
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
    },
    socialContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: 15,
    },
    socialButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#FF4D67',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#FF4D67',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 4,
    },
    versionContainer: {
        alignItems: 'center',

    },
    versionText: {
        fontSize: 12,
        color: '#999',
        marginBottom: 5,
        fontFamily: 'Lexend_400Regular',
    },
    copyrightText: {
        fontSize: 12,
        color: '#999',
        fontFamily: 'Lexend_400Regular',
    },
});

export default AboutUs;