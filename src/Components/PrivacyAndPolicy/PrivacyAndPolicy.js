/* Plugins. */
import { View, Text, TouchableOpacity, ScrollView, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';

/* Helpers. */
import { useTheme } from '../Theme/ThemeContext';

/* Styles. */
import { createStyles } from './privacyAndPloicyStyles';

function PrivacyPolicy() {

    /* Hooks. */
    const navigation = useNavigation();
    const { isDark } = useTheme();

    /* Variable declarations. */
    const styles = createStyles(isDark);

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles?.container} >

            {/* Header section. */}
            <View style={styles.headerSection}>
                <TouchableOpacity style={styles.navButton}>
                    <Ionicons name="arrow-back" onPress={() => navigation.goBack()} size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Privacy & policy</Text>
                <View style={styles.navButton} />
            </View>

            <ScrollView style={styles.scrollViewContainer}>
                <View style={styles.content}>

                    {/* "Pivacy policy" intro section. */}
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

                    {/* Information we collect */}
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Ionicons name="document-text" size={24} color="#FF4D67" />
                            <Text style={styles.sectionTitle}>Information We Collect</Text>
                        </View>

                        {/* Details we collect. */}
                        <View style={styles.subsection}>
                            <Text style={styles.subsectionTitle}>Personal Information</Text>
                            <Text style={styles.bodyText}>
                                When you register for an account, we may collect:
                            </Text>
                            {['Name and email address', 'Profile picture (optional)', 'Phone number (optional)', 'Date of birth']?.map((ele, index) => (
                                <View style={styles.bulletPoint} key={index}>
                                    <Ionicons name="checkmark-circle" size={16} color="#FF4D67" />
                                    <Text style={styles.bulletText}>{ele}</Text>
                                </View>
                            ))}
                        </View>

                        <View style={styles.subsection}>
                            <Text style={styles.subsectionTitle}>Usage Data</Text>
                            <Text style={styles.bodyText}>We automatically collect information about your interactions with the app, including:</Text>
                            {['Habit tracking data and progress', 'App usage statistics', 'Device information and identifiers']?.map((ele, index) => (
                                <View style={styles.bulletPoint} key={index}>
                                    <Ionicons name="checkmark-circle" size={16} color="#FF4D67" />
                                    <Text style={styles.bulletText}>{ele}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* How We Use Your Information */}
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Ionicons name="settings" size={24} color="#FF4D67" />
                            <Text style={styles.sectionTitle}>How We Use Your Information</Text>
                        </View>

                        <Text style={styles.bodyText}>We use the collected information for various purposes:</Text>
                        {
                            [
                                { title: 'Account Management', icon: "person-outline", text: "To create and manage your account, authenticate users, and provide customer support." },
                                { title: 'Service Improvement', icon: "analytics-outline", text: "To analyze usage patterns and improve app functionality and user experience." },
                                { title: 'Communications', icon: "notifications-outline", text: "To send you notifications, updates, and marketing communications (with your consent)." }
                            ]?.map((ele, index) => (
                                <View style={styles.card} key={index}>
                                    <View style={styles.cardIcon}>
                                        <Ionicons name={ele?.icon} size={20} color="#FF4D67" />
                                    </View>
                                    <View style={styles.cardContent}>
                                        <Text style={styles.cardTitle}>{ele?.title}</Text>
                                        <Text style={styles.cardText}>{ele?.text}</Text>
                                    </View>
                                </View>
                            ))
                        }
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
                            {
                                [
                                    { title: "Encryption", icon: "shield-checkmark-outline" },
                                    { title: "Secure Storage", icon: "key-outline" },
                                    { title: "Protected Servers", icon: "server-outline" },
                                    { title: "Access Control", icon: "eye-off-outline" }
                                ]?.map((ele, index) => (
                                    <View style={styles.securityItem} key={index}>
                                        <Ionicons name={ele?.icon} size={32} color="#FF4D67" />
                                        <Text style={styles.securityText}>{ele?.title}</Text>
                                    </View>
                                ))
                            }
                        </View>
                    </View>

                    {/* Data Sharing */}
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Ionicons name="share-social" size={24} color="#FF4D67" />
                            <Text style={styles.sectionTitle}>Data Sharing and Disclosure</Text>
                        </View>

                        <Text style={styles.bodyText}>We do not sell your personal information.</Text>
                    </View>

                    {/* Your Rights */}
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Ionicons name="hand-right" size={24} color="#FF4D67" />
                            <Text style={styles.sectionTitle}>Your Rights</Text>
                        </View>

                        <Text style={styles.bodyText}>You have the following rights regarding your personal data:</Text>



                        <View style={styles.rightsContainer}>
                            {
                                [
                                    { title: "Access", icon: "eye-outline", text: "View your personal data" },
                                    { title: "Rectification", icon: "create-outline", text: "Update incorrect data" },
                                    { title: "Deletion", icon: "trash-outline", text: "Request data removal" },
                                    { title: "Portability", icon: "download-outline", text: "Export your data" }
                                ]?.map((ele, index) => (
                                    <View style={styles.rightItem} key={index}>
                                        <View style={styles.rightIconContainer}>
                                            <Ionicons name={ele?.icon} size={24} color="#fff" />
                                        </View>
                                        <Text style={styles.rightTitle}>{ele?.title}</Text>
                                        <Text style={styles.rightText}>{ele?.text}</Text>
                                    </View>
                                ))
                            }
                        </View>
                    </View>

                    {/* Other sorts of policy. */}
                    {
                        [
                            { title: "Cookies and Tracking", icon: "analytics", text: "We use cookies and similar tracking technologies to track activity on our app and hold certain information to improve user experience." },
                            { title: "Children's Privacy", icon: "people", text: "Our service is not directed to children under 13. We do not knowingly collect personal information from children under 13. If you become aware that a child has provided us with personal information, please contact us." },
                            { title: "Changes to This Policy", icon: "refresh", text: "We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the 'Last Updated' date." },
                        ]?.map((ele, index) => (
                            <View style={styles.section} key={index}>
                                <View style={styles.sectionHeader}>
                                    <Ionicons name={ele?.icon} size={24} color="#FF4D67" />
                                    <Text style={styles.sectionTitle}>{ele?.title}</Text>
                                </View>
                                <Text style={styles.bodyText}>{ele?.text}</Text>
                            </View>
                        ))
                    }

                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default PrivacyPolicy;