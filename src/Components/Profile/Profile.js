/* Plugins. */
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Formik } from 'formik';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
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
        userDetails?.profilePicture || 
        'https://ichef.bbci.co.uk/ace/standard/3840/cpsprodpb/3255/live/becce000-388c-11f0-ae03-09fcb5edc49f.jpg'
    );
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState(
        userDetails?.dateOfBirth ? new Date(userDetails.dateOfBirth) : new Date()
    );
    const [isUploading, setIsUploading] = useState(false); // ✅ Added loading state

    /* Hooks. */
    const navigation = useNavigation();

    const handleImagePick = async () => {
        try {
            // Request permission
            const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
            
            if (!permissionResult.granted) {
                Alert.alert('Permission Required', 'Permission to access camera roll is required!');
                return;
            }

            // Launch image picker
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: false,
                aspect: [1, 1],
                quality: 0.8,
            });

            if (!result.canceled && result.assets[0]) {
                const selectedImage = result.assets[0];
                
                // Show loading state
                setIsUploading(true);

                // Create FormData
                const formData = new FormData();
                formData.append('files', {
                    uri: selectedImage.uri,
                    type: selectedImage.type || 'image/jpeg',
                    name: selectedImage.fileName || `profile_${Date.now()}.jpg`,
                });

                // Call Redux action
                const response = await editProfilePicture(formData);
                
                setIsUploading(false);

                // Handle response
                if (response.success) {
                    // Update local state with new image URL
                    setProfileImage(response.imageUrl || selectedImage.uri);
                    Alert.alert('Success', response.message);
                } else {
                    Alert.alert('Error', response.message);
                }
            }
        } catch (error) {
            setIsUploading(false);
            console.error('Error picking image:', error);
            Alert.alert('Error', 'Failed to pick image. Please try again.');
        }
    };

    const handleUpdateProfile = (values) => {
        editProfile(values);
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
                                    source={{ uri: profileImage }}
                                    style={styles.profileImage}
                                />
                            ) : (
                                <View style={styles.imagePlaceholder}>
                                    <Ionicons name="person" size={35} color="#FF8A8A" />
                                </View>
                            )}
                            
                            <TouchableOpacity
                                style={styles.cameraButton}
                                onPress={handleImagePick}
                                disabled={isUploading} // ✅ Disable while uploading
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

                {/* Form Section */}
                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.formContainer}>
                        <Formik
                            initialValues={userDetails || {
                                name: '',
                                email: '',
                                phoneNumber: '',
                                dateOfBirth: '',
                                aboutMe: ''
                            }}
                            validationSchema={validate}
                            onSubmit={handleUpdateProfile}
                            validateOnChange={true}
                            validateOnBlur={true}
                            enableReinitialize={true}
                        >
                            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                                <>
                                    {/* Full Name */}
                                    <View style={styles.inputContainer}>
                                        <Text style={styles.label}>Full Name</Text>
                                        <View style={styles.inputWrapper}>
                                            <Ionicons
                                                name="person-outline"
                                                size={20}
                                                color="#FF8A8A"
                                                style={styles.inputIcon}
                                            />
                                            <TextInput
                                                style={styles.input}
                                                value={values.name}
                                                onChangeText={handleChange('name')}
                                                onBlur={handleBlur('name')}
                                                placeholder="Enter your name"
                                                placeholderTextColor={isDark ? "#666" : "#999"}
                                            />
                                        </View>
                                        {touched.name && errors.name && (
                                            <Text style={styles.errorText}>{errors.name}</Text>
                                        )}
                                    </View>

                                    {/* Email */}
                                    <View style={styles.inputContainer}>
                                        <Text style={styles.label}>Email Address</Text>
                                        <View style={styles.inputWrapper}>
                                            <Ionicons
                                                name="mail-outline"
                                                size={20}
                                                color="#FF8A8A"
                                                style={styles.inputIcon}
                                            />
                                            <TextInput
                                                style={[styles.input, styles.inputDisabled]}
                                                value={values.email}
                                                onChangeText={handleChange('email')}
                                                onBlur={handleBlur('email')}
                                                placeholder="Enter your email"
                                                placeholderTextColor={isDark ? "#666" : "#999"}
                                                keyboardType="email-address"
                                                autoCapitalize="none"
                                                editable={false}
                                            />
                                        </View>
                                        {touched.email && errors.email && (
                                            <Text style={styles.errorText}>{errors.email}</Text>
                                        )}
                                    </View>

                                    {/* Phone */}
                                    <View style={styles.inputContainer}>
                                        <Text style={styles.label}>Phone Number</Text>
                                        <View style={styles.inputWrapper}>
                                            <Ionicons
                                                name="call-outline"
                                                size={20}
                                                color="#FF8A8A"
                                                style={styles.inputIcon}
                                            />
                                            <TextInput
                                                style={styles.input}
                                                value={values.phoneNumber}
                                                onChangeText={handleChange('phoneNumber')}
                                                onBlur={handleBlur('phoneNumber')}
                                                placeholder="Enter your phone number"
                                                placeholderTextColor={isDark ? "#666" : "#999"}
                                                keyboardType="phone-pad"
                                            />
                                        </View>
                                        {touched.phoneNumber && errors.phoneNumber && (
                                            <Text style={styles.errorText}>{errors.phoneNumber}</Text>
                                        )}
                                    </View>

                                    {/* Date of Birth */}
                                    <View style={styles.inputContainer}>
                                        <Text style={styles.label}>Date of Birth</Text>
                                        <TouchableOpacity
                                            style={styles.inputWrapper}
                                            onPress={() => setShowDatePicker(true)}
                                            activeOpacity={0.7}
                                        >
                                            <Ionicons
                                                name="calendar-outline"
                                                size={20}
                                                color="#FF8A8A"
                                                style={styles.inputIcon}
                                            />
                                            <Text style={[styles.input, styles.dateText]}>
                                                {values.dateOfBirth
                                                    ? new Date(values.dateOfBirth).toLocaleDateString()
                                                    : 'Select your date of birth'}
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
                                                        handleChange('dateOfBirth')(date.toISOString().split('T')[0]);
                                                    }
                                                }}
                                                maximumDate={new Date()}
                                            />
                                        )}
                                        {touched.dateOfBirth && errors.dateOfBirth && (
                                            <Text style={styles.errorText}>{errors.dateOfBirth}</Text>
                                        )}
                                    </View>

                                    {/* About Me */}
                                    <View style={styles.inputContainer}>
                                        <Text style={styles.label}>About Me</Text>
                                        <View style={styles.textareaWrapper}>
                                            <Ionicons
                                                name="information-circle-outline"
                                                size={20}
                                                color="#FF8A8A"
                                                style={styles.textareaIcon}
                                            />
                                            <TextInput
                                                style={styles.textarea}
                                                value={values.aboutMe}
                                                onChangeText={handleChange('aboutMe')}
                                                onBlur={handleBlur('aboutMe')}
                                                placeholder="Tell us about yourself..."
                                                placeholderTextColor={isDark ? "#666" : "#999"}
                                                multiline={true}
                                                numberOfLines={4}
                                            />
                                        </View>
                                        {touched.aboutMe && errors.aboutMe && (
                                            <Text style={styles.errorText}>{errors.aboutMe}</Text>
                                        )}
                                    </View>

                                    {/* Save Button */}
                                    <TouchableOpacity
                                        style={styles.saveButton}
                                        onPress={handleSubmit}
                                    >
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