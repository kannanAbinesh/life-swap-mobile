/* Plugins. */
import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

function PrivacyPolicy() {
    return (
        <ScrollView style={styles.container}>
            {/* Header Section */}
            <View style={styles.headerSection}>
                <View style={styles.topNav}>
                    <TouchableOpacity style={styles.navButton}>
                        <Ionicons name="arrow-back" size={24} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Privacy Policy</Text>
                    <View style={styles.navButton} />
                </View>

                <View style={styles.headerIconContainer}>
                    <View style={styles.iconCircle}>
                        <Ionicons name="shield-checkmark" size={40} color="#fff" />
                    </View>
                </View>
            </View>

            {/* Content Section */}
            <View style={styles.content}>
                {/* Introduction */}
                <View style={styles.introSection}>
                    <Image
                        source={{ uri: 'https://cncwebworld.com/image/policy/privacy-policy.jpg' }}
                        style={styles.bannerImage}
                        resizeMode="cover"
                    />
                    <Text style={styles.lastUpdated}>Last Updated: October 14, 2024</Text>
                    <Text style={styles.introText}>
                        At Habit Tracker, we take your privacy seriously. This Privacy Policy explains how we
                        collect, use, disclose, and safeguard your information when you use our mobile application.
                    </Text>
                </View>

                {/* Information We Collect */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Ionicons name="document-text" size={24} color="#FF4D67" />
                        <Text style={styles.sectionTitle}>Information We Collect</Text>
                    </View>

                    <View style={styles.subsection}>
                        <Text style={styles.subsectionTitle}>Personal Information</Text>
                        <Text style={styles.bodyText}>
                            When you register for an account, we may collect:
                        </Text>
                        <View style={styles.bulletPoint}>
                            <Ionicons name="checkmark-circle" size={16} color="#FF4D67" />
                            <Text style={styles.bulletText}>Name and email address</Text>
                        </View>
                        <View style={styles.bulletPoint}>
                            <Ionicons name="checkmark-circle" size={16} color="#FF4D67" />
                            <Text style={styles.bulletText}>Profile picture (optional)</Text>
                        </View>
                        <View style={styles.bulletPoint}>
                            <Ionicons name="checkmark-circle" size={16} color="#FF4D67" />
                            <Text style={styles.bulletText}>Phone number (optional)</Text>
                        </View>
                        <View style={styles.bulletPoint}>
                            <Ionicons name="checkmark-circle" size={16} color="#FF4D67" />
                            <Text style={styles.bulletText}>Date of birth</Text>
                        </View>
                    </View>

                    <View style={styles.subsection}>
                        <Text style={styles.subsectionTitle}>Usage Data</Text>
                        <Text style={styles.bodyText}>
                            We automatically collect information about your interactions with the app, including:
                        </Text>
                        <View style={styles.bulletPoint}>
                            <Ionicons name="checkmark-circle" size={16} color="#FF4D67" />
                            <Text style={styles.bulletText}>Habit tracking data and progress</Text>
                        </View>
                        <View style={styles.bulletPoint}>
                            <Ionicons name="checkmark-circle" size={16} color="#FF4D67" />
                            <Text style={styles.bulletText}>App usage statistics</Text>
                        </View>
                        <View style={styles.bulletPoint}>
                            <Ionicons name="checkmark-circle" size={16} color="#FF4D67" />
                            <Text style={styles.bulletText}>Device information and identifiers</Text>
                        </View>
                    </View>
                </View>

                {/* How We Use Your Information */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Ionicons name="settings" size={24} color="#FF4D67" />
                        <Text style={styles.sectionTitle}>How We Use Your Information</Text>
                    </View>

                    <Text style={styles.bodyText}>
                        We use the collected information for various purposes:
                    </Text>

                    <View style={styles.card}>
                        <View style={styles.cardIcon}>
                            <Ionicons name="person-outline" size={20} color="#FF4D67" />
                        </View>
                        <View style={styles.cardContent}>
                            <Text style={styles.cardTitle}>Account Management</Text>
                            <Text style={styles.cardText}>
                                To create and manage your account, authenticate users, and provide customer support.
                            </Text>
                        </View>
                    </View>

                    <View style={styles.card}>
                        <View style={styles.cardIcon}>
                            <Ionicons name="analytics-outline" size={20} color="#FF4D67" />
                        </View>
                        <View style={styles.cardContent}>
                            <Text style={styles.cardTitle}>Service Improvement</Text>
                            <Text style={styles.cardText}>
                                To analyze usage patterns and improve app functionality and user experience.
                            </Text>
                        </View>
                    </View>

                    <View style={styles.card}>
                        <View style={styles.cardIcon}>
                            <Ionicons name="notifications-outline" size={20} color="#FF4D67" />
                        </View>
                        <View style={styles.cardContent}>
                            <Text style={styles.cardTitle}>Communications</Text>
                            <Text style={styles.cardText}>
                                To send you notifications, updates, and marketing communications (with your consent).
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Data Security */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Ionicons name="lock-closed" size={24} color="#FF4D67" />
                        <Text style={styles.sectionTitle}>Data Security</Text>
                    </View>

                    <Text style={styles.bodyText}>
                        We implement appropriate technical and organizational security measures to protect your
                        personal information against unauthorized access, alteration, disclosure, or destruction.
                    </Text>

                    <View style={styles.securityGrid}>
                        <View style={styles.securityItem}>
                            <Ionicons name="shield-checkmark-outline" size={32} color="#FF4D67" />
                            <Text style={styles.securityText}>Encryption</Text>
                        </View>
                        <View style={styles.securityItem}>
                            <Ionicons name="key-outline" size={32} color="#FF4D67" />
                            <Text style={styles.securityText}>Secure Storage</Text>
                        </View>
                        <View style={styles.securityItem}>
                            <Ionicons name="server-outline" size={32} color="#FF4D67" />
                            <Text style={styles.securityText}>Protected Servers</Text>
                        </View>
                        <View style={styles.securityItem}>
                            <Ionicons name="eye-off-outline" size={32} color="#FF4D67" />
                            <Text style={styles.securityText}>Access Control</Text>
                        </View>
                    </View>
                </View>

                {/* Data Sharing */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Ionicons name="share-social" size={24} color="#FF4D67" />
                        <Text style={styles.sectionTitle}>Data Sharing and Disclosure</Text>
                    </View>

                    <Text style={styles.bodyText}>
                        We do not sell your personal information.
                    </Text>
                </View>

                {/* Your Rights */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Ionicons name="hand-right" size={24} color="#FF4D67" />
                        <Text style={styles.sectionTitle}>Your Rights</Text>
                    </View>

                    <Text style={styles.bodyText}>
                        You have the following rights regarding your personal data:
                    </Text>

                    <View style={styles.rightsContainer}>
                        <View style={styles.rightItem}>
                            <View style={styles.rightIconContainer}>
                                <Ionicons name="eye-outline" size={24} color="#fff" />
                            </View>
                            <Text style={styles.rightTitle}>Access</Text>
                            <Text style={styles.rightText}>View your personal data</Text>
                        </View>

                        <View style={styles.rightItem}>
                            <View style={styles.rightIconContainer}>
                                <Ionicons name="create-outline" size={24} color="#fff" />
                            </View>
                            <Text style={styles.rightTitle}>Rectification</Text>
                            <Text style={styles.rightText}>Update incorrect data</Text>
                        </View>

                        <View style={styles.rightItem}>
                            <View style={styles.rightIconContainer}>
                                <Ionicons name="trash-outline" size={24} color="#fff" />
                            </View>
                            <Text style={styles.rightTitle}>Deletion</Text>
                            <Text style={styles.rightText}>Request data removal</Text>
                        </View>

                        <View style={styles.rightItem}>
                            <View style={styles.rightIconContainer}>
                                <Ionicons name="download-outline" size={24} color="#fff" />
                            </View>
                            <Text style={styles.rightTitle}>Portability</Text>
                            <Text style={styles.rightText}>Export your data</Text>
                        </View>
                    </View>
                </View>

                {/* Cookies and Tracking */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Ionicons name="analytics" size={24} color="#FF4D67" />
                        <Text style={styles.sectionTitle}>Cookies and Tracking</Text>
                    </View>

                    <Text style={styles.bodyText}>
                        We use cookies and similar tracking technologies to track activity on our app and
                        hold certain information to improve user experience.
                    </Text>
                </View>

                {/* Children's Privacy */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Ionicons name="people" size={24} color="#FF4D67" />
                        <Text style={styles.sectionTitle}>Children's Privacy</Text>
                    </View>

                    <Text style={styles.bodyText}>
                        Our service is not directed to children under 13. We do not knowingly collect personal
                        information from children under 13. If you become aware that a child has provided us with
                        personal information, please contact us.
                    </Text>
                </View>

                {/* Changes to Policy */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Ionicons name="refresh" size={24} color="#FF4D67" />
                        <Text style={styles.sectionTitle}>Changes to This Policy</Text>
                    </View>

                    <Text style={styles.bodyText}>
                        We may update our Privacy Policy from time to time. We will notify you of any changes
                        by posting the new Privacy Policy on this page and updating the "Last Updated" date.
                    </Text>
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
        paddingBottom: 60,
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
        padding: 20,
        paddingBottom: 40,
    },
    introSection: {
        marginBottom: 30,
    },
    bannerImage: {
        width: '100%',
        height: 180,
        borderRadius: 16,
        marginBottom: 15,
        backgroundColor: '#E0E0E0',
    },
    lastUpdated: {
        fontSize: 12,
        color: '#999',
        marginBottom: 10,
        fontFamily: 'Lexend_400Regular',
    },
    introText: {
        fontSize: 15,
        color: '#666',
        lineHeight: 24,
        textAlign: 'justify',
        fontFamily: 'Lexend_400Regular',
    },
    section: {
        marginBottom: 30,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginLeft: 10,
        fontFamily: 'Lexend_400Regular',
    },
    subsection: {
        marginBottom: 20,
    },
    subsectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 10,
        fontFamily: 'Lexend_400Regular',
    },
    bodyText: {
        fontSize: 14,
        color: '#666',
        lineHeight: 22,
        marginBottom: 15,
        fontFamily: 'Lexend_400Regular',
    },
    bulletPoint: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        paddingLeft: 10,
    },
    bulletText: {
        fontSize: 14,
        color: '#666',
        marginLeft: 10,
        flex: 1,
        fontFamily: 'Lexend_400Regular',
    },
    contentImage: {
        width: '100%',
        height: 150,
        borderRadius: 12,
        marginTop: 15,
        backgroundColor: '#E0E0E0',
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 15,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cardIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#FFE5EA',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 15,
    },
    cardContent: {
        flex: 1,
    },
    cardTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: '#333',
        marginBottom: 5,
        fontFamily: 'Lexend_400Regular',
    },
    cardText: {
        fontSize: 13,
        color: '#666',
        lineHeight: 20,
        fontFamily: 'Lexend_400Regular',
    },
    securityGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 15,
    },
    securityItem: {
        width: '48%',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
        alignItems: 'center',
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    securityText: {
        fontSize: 13,
        color: '#333',
        marginTop: 10,
        textAlign: 'center',
        fontFamily: 'Lexend_400Regular',
    },
    highlightBox: {
        backgroundColor: '#FFF5F7',
        borderRadius: 12,
        padding: 15,
        borderLeftWidth: 4,
        borderLeftColor: '#FF4D67',
        marginTop: 10,
    },
    rightsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 15,
    },
    rightItem: {
        width: '48%',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 15,
        alignItems: 'center',
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    rightIconContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#FF4D67',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    rightTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        marginBottom: 5,
        textAlign: 'center',
        fontFamily: 'Lexend_400Regular',
    },
    rightText: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
        fontFamily: 'Lexend_400Regular',
    },
    contactSection: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        marginTop: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    contactTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 10,
        textAlign: 'center',
        fontFamily: 'Lexend_400Regular',
    },
    contactText: {
        fontSize: 14,
        color: '#666',
        marginBottom: 15,
        textAlign: 'center',
        fontFamily: 'Lexend_400Regular',
    },
    contactItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    contactItemText: {
        fontSize: 14,
        color: '#333',
        marginLeft: 15,
        fontFamily: 'Lexend_400Regular',
    },
    footerImageContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    footerImage: {
        width: '100%',
        height: 120,
        borderRadius: 12,
        backgroundColor: '#E0E0E0',
    },
});

export default PrivacyPolicy;