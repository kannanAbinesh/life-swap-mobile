/* Plugins. */
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, Alert, KeyboardAvoidingView, Platform, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Formik } from 'formik';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import { connect } from 'react-redux';

/* Helpers. */
import { validate } from './validate';
import { manageUsers } from '../../ActionCreators/manageUsers';

/* Styles. */
import styles from './profileStyles';
// import { profileImageUpload } from '../../ActionCreators/profileImageUpload';

function Profile(props) {

    const { userDetails, manageUsers } = props;

    /* State. */
    const [profileImage, setProfileImage] = useState('https://ichef.bbci.co.uk/ace/standard/3840/cpsprodpb/3255/live/becce000-388c-11f0-ae03-09fcb5edc49f.jpg');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState(userDetails?.dateOfBirth ? new Date(userDetails.dateOfBirth) : new Date());
    
    /* Hooks. */
    const navigation = useNavigation();

    const handleImagePick = async () => {
        try {
            const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (permissionResult.granted === false) {
                Alert.alert('Permission Required', 'Permission to access camera roll is required!');
                return;
            }

            // Launch image picker
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.8,
            });

            if (!result.canceled && result.assets[0]) {
                const selectedImage = result.assets[0];

                // Update local state to show the image immediately
                setProfileImage(selectedImage.uri);

                // Prepare image data for upload
                const imageData = {
                    uri: selectedImage.uri,
                    type: selectedImage.type || 'image/jpeg',
                    name: selectedImage.fileName || `profile_${Date.now()}.jpg`,
                    size: selectedImage.fileSize,
                };

                // Call the action creator to upload the image
                // profileImageUpload(imageData);
            }
        } catch (error) {
            console.error('Error picking image:', error);
            Alert.alert('Error', 'Failed to pick image. Please try again.');
        }
    };

    const handleUpdateProfile = (values) => {
        manageUsers(values)
        console.log('Form submitted:', values);
        Alert.alert('Success', 'Profile updated successfully!');
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
            <View style={styles.container}>
                {/* Sticky Header */}
                <View style={styles.headerSection}>
                    {/* Top Navigation */}
                    <View style={styles.topNav}>
                        <TouchableOpacity style={styles.navButton}>
                            <Ionicons onPress={() => navigation.goBack()} name="arrow-back" size={24} color="#fff" />
                        </TouchableOpacity>
                    </View>

                    {/* Profile Section */}
                    <View style={styles.profileSection}>

                        {/* About Me */}
                        <View style={styles.leftSection}>
                            {/* Profile Image */}
                            <View style={styles.imageContainer}>
                                {profileImage ? (
                                    <Image source={{ uri: profileImage }} style={styles.profileImage} />
                                ) : (
                                    <View style={styles.imagePlaceholder}>
                                        <Ionicons name="person" size={40} color="#FF4D67" />
                                    </View>
                                )}
                                <TouchableOpacity style={styles.cameraButton} onPress={handleImagePick} >
                                    <Ionicons name="camera" size={16} color="#fff" />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.rightSection}>
                            <Text style={styles.profileName}>{userDetails?.aboutMe}</Text>
                        </View>
                    </View>
                </View>

                {/* Scrollable Content */}
                <ScrollView
                    style={{ flex: 1 }}
                    scrollEventThrottle={16}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.content}>

                        <Formik
                            initialValues={userDetails || { name: '', email: '', phoneNumber: '', dateOfBirth: '', aboutMe: '' }}
                            // validationSchema={validate}
                            onSubmit={handleUpdateProfile}
                            validateOnChange={true}
                            validateOnBlur={true}
                            enableReinitialize={true}
                        >
                            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (
                                <>
                                    {/* Form Fields */}
                                    <View style={styles.formSection}>

                                        <View style={styles.fieldContainer}>
                                            <Text style={styles.label}>Full Name</Text>
                                            <View style={styles.inputWrapper}>
                                                <Ionicons name="person-outline" size={20} color="#FF4D67" style={styles.icon} />
                                                <TextInput
                                                    style={styles.input}
                                                    value={values.name}
                                                    onChangeText={handleChange('name')}
                                                    onBlur={handleBlur('name')}
                                                    placeholder="Enter your name"
                                                    placeholderTextColor="#999"
                                                />
                                            </View>
                                            {touched.name && errors.name && (<Text style={styles.errorText}>{errors.name}</Text>)}
                                        </View>

                                        {/* Email Field */}
                                        <View style={styles.fieldContainer}>
                                            <Text style={styles.label}>Email Address</Text>
                                            <View style={styles.inputWrapper}>
                                                <Ionicons name="mail-outline" size={20} color="#FF4D67" style={styles.icon} />
                                                <TextInput
                                                    style={styles.input}
                                                    value={values.email}
                                                    onChangeText={handleChange('email')}
                                                    onBlur={handleBlur('email')}
                                                    placeholder="Enter your email"
                                                    placeholderTextColor="#999"
                                                    keyboardType="email-address"
                                                    autoCapitalize="none"
                                                    editable={false}
                                                />
                                            </View>
                                            {touched.email && errors.email && (
                                                <Text style={styles.errorText}>{errors.email}</Text>
                                            )}
                                        </View>

                                        {/* Phone Field */}
                                        <View style={styles.fieldContainer}>
                                            <Text style={styles.label}>Phone Number</Text>
                                            <View style={styles.inputWrapper}>
                                                <Ionicons name="call-outline" size={20} color="#FF4D67" style={styles.icon} />
                                                <TextInput
                                                    style={styles.input}
                                                    value={values.phoneNumber}
                                                    onChangeText={handleChange('phoneNumber')}
                                                    onBlur={handleBlur('phoneNumber')}
                                                    placeholder="Enter your phone number"
                                                    placeholderTextColor="#999"
                                                    keyboardType="phone-pad"
                                                />
                                            </View>
                                            {touched.phoneNumber && errors.phoneNumber && (
                                                <Text style={styles.errorText}>{errors.phoneNumber}</Text>
                                            )}
                                        </View>

                                        {/* Date of Birth Field */}
                                        <View style={styles.fieldContainer}>
                                            <Text style={styles.label}>Date of Birth</Text>
                                            <TouchableOpacity
                                                style={styles.inputWrapper}
                                                onPress={() => setShowDatePicker(true)}
                                                activeOpacity={0.7}
                                            >
                                                <Ionicons name="calendar-outline" size={20} color="#FF4D67" style={styles.icon} />
                                                <Text style={[styles.input, { paddingVertical: 15 }]}>
                                                    {values.dateOfBirth ? new Date(values.dateOfBirth).toLocaleDateString() : 'Select your date of birth'}
                                                </Text>
                                            </TouchableOpacity>

                                            {showDatePicker && (
                                                <DateTimePicker
                                                    value={selectedDate}
                                                    mode="date"
                                                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                                    onChange={(event, date) => {
                                                        setShowDatePicker(Platform.OS === 'ios'); // keep open on iOS
                                                        if (date) {
                                                            setSelectedDate(date);
                                                            handleChange('dateOfBirth')(date.toISOString().split('T')[0]); // update Formik
                                                        }
                                                    }}
                                                    maximumDate={new Date()} // prevent future dates
                                                />
                                            )}

                                            {touched.dateOfBirth && errors.dateOfBirth && (
                                                <Text style={styles.errorText}>{errors.dateOfBirth}</Text>
                                            )}
                                        </View>


                                        {/* About Me Field */}
                                        <View style={styles.lastFieldContainer}>
                                            <Text style={styles.label}>About Me</Text>
                                            <View style={styles.textareaWrapper}>
                                                <Ionicons name="information-circle-outline" size={20} color="#FF4D67" style={styles.iconTop} />
                                                <TextInput
                                                    style={styles.textarea}
                                                    value={values.aboutMe}
                                                    onChangeText={handleChange('aboutMe')}
                                                    onBlur={handleBlur('aboutMe')}
                                                    placeholder="Tell us about yourself..."
                                                    placeholderTextColor="#999"
                                                    multiline={true}
                                                    numberOfLines={4}
                                                    textAlignVertical="top"
                                                />
                                            </View>
                                            {touched.aboutMe && errors.aboutMe && (
                                                <Text style={styles.errorText}>{errors.aboutMe}</Text>
                                            )}
                                        </View>
                                    </View>

                                    <TouchableOpacity style={styles.editButton} onPress={handleSubmit}>
                                        <Text style={styles.editButtonText}>Save Profile</Text>
                                    </TouchableOpacity>
                                </>
                            )}
                        </Formik>
                    </View>
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    );
};

const mapState = state => ({
    userDetails: state?.userDetails
});

const mapDispatch = {
    manageUsers,
    // profileImageUpload
};

export default connect(mapState, mapDispatch)(Profile)