/* Plugins */
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Ionicons } from '@expo/vector-icons';
import { Formik } from "formik";
import * as ImagePicker from 'expo-image-picker';
import { View, Text, ScrollView, TouchableOpacity, Image, TextInput, ActivityIndicator, Modal, Alert } from 'react-native';

/* Helpers */
import { manageYourHabits } from "../../ActionCreators/manageYourHabits";
import { HabitSchema } from "./validate"; // make sure this exists
import { createStyles } from "../YourHabits/yourHabitsStyles";
import { useTheme } from "../Theme/ThemeContext";

function YourHabitsForm({ manageYourHabits, closeModal }) {

    const [imagePickerVisible, setImagePickerVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const { isDark } = useTheme();
    const styles = createStyles(isDark);

    const requestPermissions = async () => {
        const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
        const { status: galleryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (cameraStatus !== 'granted' || galleryStatus !== 'granted') {
            Alert.alert('Permission Required', 'Please grant camera and gallery permissions to upload images.');
            return false;
        }
        return true;
    };

    const pickImageFromGallery = async (values, setFieldValue) => {
        try {
            const hasPermission = await requestPermissions();
            if (!hasPermission) return;

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: false,
                quality: 0.7,
            });

            if (!result.canceled && result.assets?.length > 0) {
                const newImage = result.assets[0];
                setFieldValue('images', [...values.images, newImage]);
            }
        } catch (err) {
            Alert.alert('Error', 'Failed to pick image');
        } finally {
            setImagePickerVisible(false);
        }
    };

    const takePhoto = async (values, setFieldValue) => {
        try {
            const hasPermission = await requestPermissions();
            if (!hasPermission) return;

            const result = await ImagePicker.launchCameraAsync({
                allowsEditing: false,
                quality: 0.7,
                cameraType: ImagePicker.CameraType.back,
            });

            if (!result.canceled && result.assets?.length > 0) {
                const newImage = result.assets[0];
                setFieldValue('images', [...values.images, newImage]);
            }
        } catch (err) {
            Alert.alert('Error', 'Failed to take photo');
        } finally {
            setImagePickerVisible(false);
        }
    };

    const removeImage = (index, values, setFieldValue) => {
        const updatedImages = values.images.filter((_, i) => i !== index);
        setFieldValue('images', updatedImages);
        if (values.thumbnail >= updatedImages.length) {
            setFieldValue('thumbnail', Math.max(0, updatedImages.length - 1));
        }
    };

    const handleManageHabits = async (values, { resetForm }) => {
        setLoading(true);
        try {
            await manageYourHabits(values);
            resetForm();
            closeModal();
        } catch (error) {
            Alert.alert('Error', 'Failed to save habit.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
                <Formik
                    initialValues={{ habitName: '', description: '', timeDuration: '', lifestyle: 'none', images: [], thumbnail: 0 }}
                    validationSchema={HabitSchema}
                    onSubmit={handleManageHabits}
                >
                    {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
                        <>
                            <View style={styles.modalHeader}>
                                <Text style={styles.modalTitle}>Add New Habit</Text>
                                <TouchableOpacity onPress={closeModal}>
                                    <Ionicons name="close" size={28} color="#333" />
                                </TouchableOpacity>
                            </View>

                            <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
                                <Text style={styles.label}>Images</Text>
                                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imageScroll}>
                                    {values.images.map((img, index) => (
                                        <View key={index} style={styles.imagePreviewContainer}>
                                            <Image source={{ uri: img.uri }} style={styles.imagePreview} />
                                            <TouchableOpacity
                                                style={styles.removeImageButton}
                                                onPress={() => removeImage(index, values, setFieldValue)}
                                            >
                                                <Ionicons name="close" size={16} color="#fff" />
                                            </TouchableOpacity>
                                        </View>
                                    ))}
                                    <TouchableOpacity
                                        style={styles.addImageButton}
                                        onPress={() => setImagePickerVisible(true)}
                                    >
                                        <Ionicons name="camera-outline" size={28} color="#FF4D67" />
                                        <Text style={styles.addImageText}>Add Photo</Text>
                                    </TouchableOpacity>
                                </ScrollView>

                                <Text style={styles.label}>Habit Name</Text>
                                <TextInput
                                    style={[styles.input, errors.habitName && touched.habitName && styles.inputError]}
                                    placeholder="e.g., Morning Workout"
                                    value={values.habitName}
                                    onChangeText={handleChange('habitName')}
                                    onBlur={handleBlur('habitName')}
                                />

                                <Text style={styles.label}>Description</Text>
                                <TextInput
                                    style={[styles.input, styles.textArea]}
                                    placeholder="Describe your habit..."
                                    multiline
                                    numberOfLines={3}
                                    value={values.description}
                                    onChangeText={handleChange('description')}
                                    onBlur={handleBlur('description')}
                                />

                                <Text style={styles.label}>Time Duration</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="e.g., 30 min"
                                    value={values.timeDuration}
                                    onChangeText={handleChange('timeDuration')}
                                    onBlur={handleBlur('timeDuration')}
                                />

                                <Text style={styles.label}>Lifestyle</Text>
                                <View style={styles.radioGroup}>
                                    {[
                                        { name: 'Productive', value: 'production' },
                                        { name: 'Very busy', value: 'veryBusy' },
                                        { name: 'Night owl', value: 'nightOwl' },
                                        { name: 'Social', value: 'social' },
                                        { name: 'Morning person', value: 'morningPerson' },
                                        { name: 'None', value: 'none' },
                                    ].map((option) => (
                                        <TouchableOpacity
                                            key={option.value}
                                            style={styles.radioOption}
                                            onPress={() => setFieldValue('lifestyle', option.value)}
                                        >
                                            <View style={[styles.radioCircle, values.lifestyle === option.value && styles.radioCircleSelected]}>
                                                {values.lifestyle === option.value && <View style={styles.radioInner} />}
                                            </View>
                                            <Text style={styles.radioLabel}>{option.name}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </ScrollView>

                            <TouchableOpacity
                                style={[styles.saveButton, loading && styles.saveButtonDisabled]}
                                onPress={handleSubmit}
                                disabled={loading}
                            >
                                {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.saveButtonText}>Add Habit</Text>}
                            </TouchableOpacity>

                            {/* Image Picker Modal */}
                            <Modal
                                animationType="fade"
                                transparent={true}
                                visible={imagePickerVisible}
                                onRequestClose={() => setImagePickerVisible(false)}
                            >
                                <TouchableOpacity
                                    style={styles.pickerOverlay}
                                    activeOpacity={1}
                                    onPress={() => setImagePickerVisible(false)}
                                >
                                    <View style={styles.pickerContainer}>
                                        <TouchableOpacity style={styles.pickerOption} onPress={() => takePhoto(values, setFieldValue)}>
                                            <Ionicons name="camera" size={24} color="#FF4D67" />
                                            <Text style={styles.pickerOptionText}>Take Photo</Text>
                                        </TouchableOpacity>
                                        <View style={styles.pickerDivider} />
                                        <TouchableOpacity style={styles.pickerOption} onPress={() => pickImageFromGallery(values, setFieldValue)}>
                                            <Ionicons name="images" size={24} color="#FF4D67" />
                                            <Text style={styles.pickerOptionText}>Choose from Gallery</Text>
                                        </TouchableOpacity>
                                        <View style={styles.pickerDivider} />
                                        <TouchableOpacity style={styles.pickerOption} onPress={() => setImagePickerVisible(false)}>
                                            <Ionicons name="close" size={24} color="#666" />
                                            <Text style={[styles.pickerOptionText, { color: '#666' }]}>Cancel</Text>
                                        </TouchableOpacity>
                                    </View>
                                </TouchableOpacity>
                            </Modal>
                        </>
                    )}
                </Formik>
            </View>
        </View>
    );
}

const mapDispatch = { manageYourHabits };

export default connect(null, mapDispatch)(YourHabitsForm);
