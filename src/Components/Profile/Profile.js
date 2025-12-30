/* Plugins. */
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Formik } from 'formik';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { connect } from 'react-redux';

/* Helpers. */
import { validate } from './validate';
import { editProfile } from '../../ActionCreators/editProfile';
import { useTheme } from '../Theme/ThemeContext';
import { editProfilePicture } from '../../ActionCreators/editProfilePicture';

/* Styles. */
import { createStyles } from './profileStyles';

function Profile(props) {
    const { userDetails, editProfile, editProfilePicture } = props;
    const { isDark } = useTheme();
    const styles = createStyles(isDark);

    /* State. */
    const [profileImage, setProfileImage] = useState(
        userDetails?.profilePicture || null
    );
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState(
        userDetails?.dateOfBirth ? new Date(userDetails.dateOfBirth) : new Date()
    );
    const [isUploading, setIsUploading] = useState(false);

    /* Hooks. */
    const navigation = useNavigation();

    /**
     * Fixes: 
     * 1. Warning: Changed MediaTypeOptions to ['images']
     * 2. Stuck Screen: Using allowsEditing: true provides native Done/Cancel buttons
     */
    const handleImagePick = async () => {
        try {
            const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (!permissionResult.granted) {
                Alert.alert('Permission Required', 'Permission to access camera roll is required!');
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ['images'], // FIXED: Deprecation warning resolved
                allowsEditing: true,    // Triggers native WhatsApp-style cropping UI
                aspect: [1, 1],         // Forces square aspect ratio
                quality: 1,
            });

            // If user clicks "Done", the result is processed here
            if (!result.canceled && result.assets[0]) {
                processImage(result.assets[0].uri);
            }
        } catch (error) {
            console.error('Error picking image:', error);
            Alert.alert('Error', 'Failed to pick image. Please try again.');
        }
    };

    const processImage = async (imageUri) => {
        try {
            setIsUploading(true);

            // Resize the cropped image for faster upload
            const manipulatedImage = await ImageManipulator.manipulateAsync(
                imageUri,
                [{ resize: { width: 500, height: 500 } }],
                { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
            );

            const formData = new FormData();
            const uriParts = manipulatedImage.uri.split('.');
            const fileType = uriParts[uriParts.length - 1];

            formData.append('files', {
                uri: manipulatedImage.uri,
                type: `image/${fileType}`,
                name: `profile_${Date.now()}.${fileType}`,
            });

            const response = await editProfilePicture(formData);
            setIsUploading(false);

            if (response.success) {
                setProfileImage(response.imageUrl);
                Alert.alert('Success', 'Profile picture updated successfully!');
            } else {
                Alert.alert('Error', response.message || 'Failed to update profile picture');
            }
        } catch (error) {
            setIsUploading(false);
            console.error('Error processing image:', error);
            Alert.alert('Error', 'Failed to process image.');
        }
    };

    const handleUpdateProfile = (values) => {
        editProfile(values);
    };

    const getFullImageUrl = (imageUrl) => {
        if (!imageUrl) return null;
        if (imageUrl.startsWith('http')) return imageUrl;
        const BASE_URL = 'http://192.168.29.73:5000'; // Replace with your IP/Domain
        return `${BASE_URL}${imageUrl}`;
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles?.mainContainer}
        >
            <View style={styles.container}>
                {/* Header section. */}
                <View style={styles.headerSection}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Ionicons name="arrow-back" size={24} color="#fff" />
                    </TouchableOpacity>

                    <View style={styles.profileImageSection}>
                        <View style={styles.imageContainer}>
                            {profileImage ? (
                                <Image
                                    source={{ uri: getFullImageUrl(profileImage) }}
                                    style={styles.profileImage}
                                    onError={() => setProfileImage(null)}
                                />
                            ) : (
                                <View style={styles.imagePlaceholder}>
                                    <Ionicons name="person" size={50} color="#FF8A8A" />
                                </View>
                            )}

                            <TouchableOpacity
                                style={styles.cameraButton}
                                onPress={handleImagePick}
                                disabled={isUploading}
                            >
                                {isUploading ? (
                                    <Ionicons name="hourglass-outline" size={16} color="#fff" />
                                ) : (
                                    <Ionicons name="camera" size={16} color="#fff" />
                                )}
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.profileTitle}>Edit Profile</Text>
                    </View>
                </View>

                <View style={styles.borderRadiusContainer} />

                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.formContainer}>
                        <Formik
                            initialValues={{
                                name: userDetails?.name || '',
                                email: userDetails?.email || '',
                                phoneNumber: userDetails?.phoneNumber || '',
                                dateOfBirth: userDetails?.dateOfBirth || '',
                                aboutMe: userDetails?.aboutMe || ''
                            }}
                            validationSchema={validate}
                            onSubmit={handleUpdateProfile}
                            enableReinitialize={true}
                        >
                            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
                                <>
                                    {/* Name Field */}
                                    <View style={styles.inputContainer}>
                                        <Text style={styles.label}>Full Name</Text>
                                        <View style={styles.inputWrapper}>
                                            <Ionicons name="person-outline" size={20} color="#FF8A8A" style={styles.inputIcon} />
                                            <TextInput
                                                style={styles.input}
                                                value={values.name}
                                                onChangeText={handleChange('name')}
                                                onBlur={handleBlur('name')}
                                                placeholder="Enter your name"
                                                placeholderTextColor={isDark ? "#666" : "#999"}
                                            />
                                        </View>
                                        {touched.name && errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
                                    </View>

                                    {/* Email (Read Only) */}
                                    <View style={styles.inputContainer}>
                                        <Text style={styles.label}>Email Address</Text>
                                        <View style={styles.inputWrapper}>
                                            <Ionicons name="mail-outline" size={20} color="#FF8A8A" style={styles.inputIcon} />
                                            <TextInput
                                                style={[styles.input, styles.inputDisabled]}
                                                value={values.email}
                                                editable={false}
                                            />
                                        </View>
                                    </View>

                                    {/* Phone Field */}
                                    <View style={styles.inputContainer}>
                                        <Text style={styles.label}>Phone Number</Text>
                                        <View style={styles.inputWrapper}>
                                            <Ionicons name="call-outline" size={20} color="#FF8A8A" style={styles.inputIcon} />
                                            <TextInput
                                                style={styles.input}
                                                value={values.phoneNumber}
                                                onChangeText={handleChange('phoneNumber')}
                                                onBlur={handleBlur('phoneNumber')}
                                                placeholder="Enter phone number"
                                                keyboardType="phone-pad"
                                                placeholderTextColor={isDark ? "#666" : "#999"}
                                            />
                                        </View>
                                    </View>

                                    {/* Date Picker */}
                                    <View style={styles.inputContainer}>
                                        <Text style={styles.label}>Date of Birth</Text>
                                        <TouchableOpacity
                                            style={styles.inputWrapper}
                                            onPress={() => setShowDatePicker(true)}
                                        >
                                            <Ionicons name="calendar-outline" size={20} color="#FF8A8A" style={styles.inputIcon} />
                                            <Text style={[styles.input, styles.dateText, !values.dateOfBirth && { color: isDark ? "#666" : "#999" }]}>
                                                {values.dateOfBirth ? new Date(values.dateOfBirth).toLocaleDateString() : 'Select date'}
                                            </Text>
                                        </TouchableOpacity>
                                        {showDatePicker && (
                                            <DateTimePicker
                                                value={selectedDate}
                                                mode="date"
                                                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                                onChange={(event, date) => {
                                                    setShowDatePicker(Platform.OS === 'ios');
                                                    if (date) {
                                                        setSelectedDate(date);
                                                        setFieldValue('dateOfBirth', date.toISOString().split('T')[0]);
                                                    }
                                                }}
                                                maximumDate={new Date()}
                                            />
                                        )}
                                    </View>

                                    {/* About Me Field */}
                                    <View style={styles.inputContainer}>
                                        <Text style={styles.label}>About Me</Text>
                                        <View style={styles.textareaWrapper}>
                                            <Ionicons name="information-circle-outline" size={20} color="#FF8A8A" style={styles.textareaIcon} />
                                            <TextInput
                                                style={styles.textarea}
                                                value={values.aboutMe}
                                                onChangeText={handleChange('aboutMe')}
                                                onBlur={handleBlur('aboutMe')}
                                                placeholder="Tell us about yourself..."
                                                multiline={true}
                                                numberOfLines={4}
                                                placeholderTextColor={isDark ? "#666" : "#999"}
                                            />
                                        </View>
                                    </View>

                                    <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
                                        <Text style={styles.saveButtonText}>Save Profile</Text>
                                    </TouchableOpacity>
                                </>
                            )}
                        </Formik>
                    </View>
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    );
}

const mapState = state => ({
    userDetails: state?.userDetails
});

const mapDispatch = {
    editProfile,
    editProfilePicture
};

export default connect(mapState, mapDispatch)(Profile);