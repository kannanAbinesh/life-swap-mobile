/* Plugins. */
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Formik } from 'formik';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import { connect } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';

/* Helpers. */
import { validate } from './validate';
import { editProfile } from '../../ActionCreators/editProfile';
import { useTheme } from '../Theme/ThemeContext';
import { editProfilePicture } from '../../ActionCreators/editProfilePicture';
import { baseURL } from '../../config';

/* Styles. */
import { createStyles } from './profileStyles';

function Profile(props) {

    /* Props. */
    const { userDetails, editProfile, editProfilePicture } = props;

    const { isDark } = useTheme();
    const styles = createStyles(isDark);

    /* State. */
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState(userDetails?.dateOfBirth ? new Date(userDetails.dateOfBirth) : new Date());

    /* Edit profile picture. */
    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult?.granted) {
            Alert.alert('Permission required', 'Permission to access the media library is required.');
            return;
        };

        let result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], allowsEditing: true, aspect: [4, 3], quality: 1 });
        if (!result.canceled && result.assets && result.assets.length > 0) {
            let imageUri = result.assets[0].uri;
            let uriParts = imageUri.split('.');
            let fileType = uriParts[uriParts.length - 1];

            const formData = new FormData();
            formData.append("type", "profilePicture");
            formData.append('files', { uri: imageUri, type: `image/${fileType}`, name: `profile_${Date.now()}.${fileType}` });

            await editProfilePicture(formData);
        };
    };

    /* Functionality to update profile. */
    const handleUpdateProfile = async (values) => {
        let payload = { name: values?.name, phoneNumber: values?.phone, dateOfBirth: values?.dob, aboutMe: values?.aboutMe };
        await editProfile(payload);
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.profileContainer}>
            <ScrollView style={styles.profileScrollView} contentContainerStyle={styles.profileScrollContent} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
                <View style={styles.formContainer}>

                    <View style={styles.profileImageWrapper}>
                        <View style={styles.imageOuterContainer}>
                            <View style={styles.imageContainer}>
                                {userDetails?.profilePicture ? (
                                    <Image source={{ uri: `${baseURL}uploads/profilePicture/${userDetails?.profilePicture}` }} style={styles.profileImage} />
                                ) : (
                                    <LinearGradient colors={['#FFB5B5', '#FF8A8A']} style={styles.imagePlaceholder}>
                                        <Ionicons name="person" size={60} color="#fff" />
                                    </LinearGradient>
                                )}

                                <TouchableOpacity style={styles.cameraButton} onPress={pickImage} activeOpacity={0.8}>
                                    <LinearGradient colors={['#FF4D67', '#FF6B7A']} style={styles.cameraButtonGradient}>
                                        <Ionicons name="camera" size={18} color="#fff" />
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <Formik
                        initialValues={{
                            name: userDetails?.name || '',
                            email: userDetails?.email || '',
                            phone: userDetails?.phoneNumber || '',
                            dob: userDetails?.dateOfBirth ? new Date(userDetails.dateOfBirth).toISOString().split('T')[0] : '',
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
                                        <TextInput style={[styles.input, styles.inputDisabled]} value={values.email} editable={false} />
                                        <View style={styles.lockIcon}>
                                            <Ionicons name="lock-closed" size={16} color="#999" />
                                        </View>
                                    </View>
                                </View>

                                {/* Phone Field */}
                                <View style={styles.inputContainer}>
                                    <Text style={styles.label}>Phone Number</Text>
                                    <View style={[styles.inputWrapper, touched.phone && errors.phone && styles.inputError]}>
                                        <View style={styles.iconContainer}>
                                            <Ionicons name="call-outline" size={20} color="#FF6B7A" />
                                        </View>
                                        <TextInput
                                            style={styles.input}
                                            value={values.phone}
                                            onChangeText={handleChange('phone')}
                                            onBlur={handleBlur('phone')}
                                            placeholder="Enter phone number"
                                            keyboardType="phone-pad"
                                            placeholderTextColor={isDark ? "#666" : "#999"}
                                        />
                                    </View>
                                    {touched.phone && errors.phone && (
                                        <View style={styles.errorContainer}>
                                            <Ionicons name="alert-circle" size={14} color="#FF4D67" />
                                            <Text style={styles.errorText}>{errors.phone}</Text>
                                        </View>
                                    )}
                                </View>

                                {/* Date Picker */}
                                <View style={styles.inputContainer}>
                                    <Text style={styles.label}>Date of Birth</Text>
                                    <TouchableOpacity style={[styles.inputWrapper, touched.dob && errors.dob && styles.inputError]} onPress={() => setShowDatePicker(true)} activeOpacity={0.7}>
                                        <View style={styles.iconContainer}>
                                            <Ionicons name="calendar-outline" size={20} color="#FF6B7A" />
                                        </View>
                                        <Text style={[styles.input, styles.dateText, !values.dob && { color: isDark ? "#666" : "#999" }]}>
                                            {values.dob ? new Date(values.dob).toLocaleDateString() : 'Select date'}
                                        </Text>
                                        <View style={styles.chevronIcon}>
                                            <Ionicons name="chevron-down" size={20} color="#999" />
                                        </View>
                                    </TouchableOpacity>
                                    {touched.dob && errors.dob && (
                                        <View style={styles.errorContainer}>
                                            <Ionicons name="alert-circle" size={14} color="#FF4D67" />
                                            <Text style={styles.errorText}>{errors.dob}</Text>
                                        </View>
                                    )}
                                    {showDatePicker && (
                                        <DateTimePicker
                                            value={selectedDate}
                                            mode="date"
                                            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                            onChange={(event, date) => {
                                                setShowDatePicker(Platform.OS === 'ios');
                                                if (date) {
                                                    setSelectedDate(date);
                                                    setFieldValue('dob', date.toISOString().split('T')[0]);
                                                };
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

                                <TouchableOpacity style={styles.saveButton} onPress={handleSubmit} activeOpacity={0.8}>
                                    <LinearGradient colors={['#FF4D67', '#FF6B7A']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.saveButtonGradient}>
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