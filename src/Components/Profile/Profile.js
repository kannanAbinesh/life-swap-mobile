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
import { LinearGradient } from 'expo-linear-gradient';

/* Helpers. */
import { validate } from './validate';
import { editProfile } from '../../ActionCreators/editProfile';
import { useTheme } from '../Theme/ThemeContext';
import { editProfilePicture } from '../../ActionCreators/editProfilePicture';

/* Styles. */
import { createStyles } from './profileStyles';

function Profile(props) {

    const { userDetails, editProfile, editProfilePicture, dispatch } = props;
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

    const handleImagePick = async () => {
        try {
            const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (!permissionResult.granted) {
                Alert.alert('Permission Required', 'Permission to access camera roll is required!');
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ['images'],
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });

            if (!result.canceled) {
                await processImage(result.assets[0].uri);
            }

        } catch (error) {
            Alert.alert('Error', 'Failed to pick image. Please try again.');
        }
    };

    const processImage = async (imageUri) => {
        try {
            setIsUploading(true);

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

            if (response && response.success) {
                setProfileImage(response.imageUrl);
                Alert.alert('Success', 'Profile picture updated successfully!');
            } else {
                Alert.alert('Error', response?.message || 'Failed to update profile picture');
            }
        } catch (error) {
            setIsUploading(false);
            Alert.alert('Error', `Failed to process image: ${error.message}`);
        }
    };

    const handleUpdateProfile = async (values) => {
        console.log('handleUpdateProfile called with:', values);
        
        try {
            // Dispatch the Redux thunk action
            await props.dispatch(editProfile(values));
            console.log('editProfile action dispatched successfully');
        } catch (error) {
            console.error('Profile update error:', error);
            Alert.alert('Error', 'Failed to update profile. Please try again.');
        }
    };

    const getFullImageUrl = (imageUrl) => {
        if (!imageUrl) return null;
        if (imageUrl.startsWith('http')) return imageUrl;
        const BASE_URL = 'http://192.168.29.73:5000';
        return `${BASE_URL}${imageUrl}`;
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.mainContainer}
        >
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.formContainer}>
                    {/* Profile Image Section */}
                    <View style={styles.profileImageWrapper}>
                        <View style={styles.imageOuterContainer}>
                            <View style={styles.imageContainer}>
                                {profileImage ? (
                                    <Image
                                        source={{ uri: getFullImageUrl(profileImage) }}
                                        style={styles.profileImage}
                                        onError={(error) => {
                                            setProfileImage(null);
                                        }}
                                    />
                                ) : (
                                    <LinearGradient
                                        colors={['#FFB5B5', '#FF8A8A']}
                                        style={styles.imagePlaceholder}
                                    >
                                        <Ionicons name="person" size={60} color="#fff" />
                                    </LinearGradient>
                                )}

                                <TouchableOpacity
                                    style={styles.cameraButton}
                                    onPress={handleImagePick}
                                    disabled={isUploading}
                                    activeOpacity={0.8}
                                >
                                    <LinearGradient
                                        colors={['#FF4D67', '#FF6B7A']}
                                        style={styles.cameraButtonGradient}
                                    >
                                        {isUploading ? (
                                            <Ionicons name="hourglass-outline" size={18} color="#fff" />
                                        ) : (
                                            <Ionicons name="camera" size={18} color="#fff" />
                                        )}
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>

                            {isUploading && (
                                <View style={styles.uploadingBadge}>
                                    <Text style={styles.uploadingText}>Uploading...</Text>
                                </View>
                            )}
                        </View>
                    </View>

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
                                    <View style={[styles.inputWrapper, touched.name && errors.name && styles.inputError]}>
                                        <View style={styles.iconContainer}>
                                            <Ionicons name="person-outline" size={20} color="#FF6B7A" />
                                        </View>
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
                                        <View style={styles.errorContainer}>
                                            <Ionicons name="alert-circle" size={14} color="#FF4D67" />
                                            <Text style={styles.errorText}>{errors.name}</Text>
                                        </View>
                                    )}
                                </View>

                                {/* Email (Read Only) */}
                                <View style={styles.inputContainer}>
                                    <Text style={styles.label}>Email Address</Text>
                                    <View style={styles.inputWrapper}>
                                        <View style={styles.iconContainer}>
                                            <Ionicons name="mail-outline" size={20} color="#FF6B7A" />
                                        </View>
                                        <TextInput
                                            style={[styles.input, styles.inputDisabled]}
                                            value={values.email}
                                            editable={false}
                                        />
                                        <View style={styles.lockIcon}>
                                            <Ionicons name="lock-closed" size={16} color="#999" />
                                        </View>
                                    </View>
                                </View>

                                {/* Phone Field */}
                                <View style={styles.inputContainer}>
                                    <Text style={styles.label}>Phone Number</Text>
                                    <View style={styles.inputWrapper}>
                                        <View style={styles.iconContainer}>
                                            <Ionicons name="call-outline" size={20} color="#FF6B7A" />
                                        </View>
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
                                        activeOpacity={0.7}
                                    >
                                        <View style={styles.iconContainer}>
                                            <Ionicons name="calendar-outline" size={20} color="#FF6B7A" />
                                        </View>
                                        <Text style={[styles.input, styles.dateText, !values.dateOfBirth && { color: isDark ? "#666" : "#999" }]}>
                                            {values.dateOfBirth ? new Date(values.dateOfBirth).toLocaleDateString() : 'Select date'}
                                        </Text>
                                        <View style={styles.chevronIcon}>
                                            <Ionicons name="chevron-down" size={20} color="#999" />
                                        </View>
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
                                        <View style={styles.textareaIconContainer}>
                                            <Ionicons name="information-circle-outline" size={20} color="#FF6B7A" />
                                        </View>
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

                                <TouchableOpacity
                                    style={styles.saveButton}
                                    onPress={() => {
                                        console.log('Button pressed!');
                                        console.log('Form values:', values);
                                        console.log('Form errors:', errors);
                                        handleSubmit();
                                    }}
                                    activeOpacity={0.8}
                                >
                                    <LinearGradient
                                        colors={['#FF4D67', '#FF6B7A']}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 0 }}
                                        style={styles.saveButtonGradient}
                                    >
                                        <Ionicons name="checkmark-circle-outline" size={22} color="#fff" style={{ marginRight: 8 }} />
                                        <Text style={styles.saveButtonText}>Save Changes</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </>
                        )}
                    </Formik>
                </View>
            </ScrollView>
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