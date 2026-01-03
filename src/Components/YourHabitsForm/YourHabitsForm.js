/* Plugins */
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Ionicons } from '@expo/vector-icons';
import { Formik } from "formik";
import * as ImagePicker from 'expo-image-picker';
import { View, Text, ScrollView, TouchableOpacity, Image, TextInput, ActivityIndicator, Modal, Alert } from 'react-native';

/* Helpers */
import { manageYourHabits } from "../../ActionCreators/manageYourHabits";
import { HabitSchema } from "./validate";
import { createStyles } from "../YourHabits/yourHabitsStyles";
import { useTheme } from "../Theme/ThemeContext";
import { closeModal } from '../../ActionCreators/modal';
import { baseURL } from '../../config';

function YourHabitsForm({ manageYourHabits, closeModal, editingHabit, modelData }) {

    const [imagePickerVisible, setImagePickerVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const { isDark } = useTheme();
    const styles = createStyles(isDark);

    // Get initial values based on whether we're editing or adding
    const getInitialValues = () => {
        const habitToEdit = editingHabit || modelData?.editingHabit;
        
        if (habitToEdit) {
            // Editing mode - convert existing images to proper format
            const existingImages = habitToEdit.images?.map(img => ({
                uri: typeof img === 'string' ? `${baseURL}uploads/habits/${img}` : `${baseURL}uploads/habits/${img.image}`,
                isExisting: true,
                image: typeof img === 'string' ? img : img.image
            })) || [];

            return {
                habitName: habitToEdit.habitName || '',
                description: habitToEdit.description || '',
                timeDuration: habitToEdit.timeDuration || '',
                lifeStyle: habitToEdit.lifeStyle || 'none',
                images: existingImages,
                thumbnail: habitToEdit.thumbnail || 0,
                _id: habitToEdit._id
            };
        }

        // Adding new habit
        return {
            habitName: '',
            description: '',
            timeDuration: '',
            lifeStyle: 'none',
            images: [],
            thumbnail: 0
        };
    };

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
                mediaTypes: ['images'],
                allowsEditing: false,
                allowsMultipleSelection: true,
                quality: 0.7,
            });

            if (!result.canceled && result.assets?.length > 0) {
                const newImages = result.assets.map(asset => ({
                    uri: asset.uri,
                    isExisting: false,
                    isNew: true
                }));
                
                setFieldValue('images', [...values.images, ...newImages]);
                Alert.alert(
                    'Success', 
                    `${newImages.length} image${newImages.length > 1 ? 's' : ''} added successfully!`
                );
            }
        } catch (err) {
            Alert.alert('Error', 'Failed to pick images: ' + err.message);
        } finally {
            setImagePickerVisible(false);
        }
    };

    const takePhoto = async (values, setFieldValue) => {
        try {
            const hasPermission = await requestPermissions();
            if (!hasPermission) return;

            const result = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                quality: 0.7,
                cameraType: ImagePicker.CameraType.back,
                aspect: [4, 3],
            });

            if (!result.canceled && result.assets?.length > 0) {
                const newImage = {
                    uri: result.assets[0].uri,
                    isExisting: false,
                    isNew: true
                };
                
                setFieldValue('images', [...values.images, newImage]);
                Alert.alert('Success', 'Photo added successfully!');
            }
        } catch (err) {
            Alert.alert('Error', 'Failed to take photo: ' + err.message);
        } finally {
            setImagePickerVisible(false);
        }
    };

    const removeImage = (index, values, setFieldValue) => {
        const updatedImages = values.images.filter((_, i) => i !== index);
        setFieldValue('images', updatedImages);
        
        // Adjust thumbnail if needed
        if (values.thumbnail >= updatedImages.length) {
            setFieldValue('thumbnail', Math.max(0, updatedImages.length - 1));
        } else if (values.thumbnail === index && updatedImages.length > 0) {
            setFieldValue('thumbnail', 0);
        }
    };

    const setAsThumbnail = (index, setFieldValue) => {
        setFieldValue('thumbnail', index);
    };

    const handleManageHabits = async (values, { resetForm }) => {
        if (values.images.length === 0) {
            Alert.alert('Validation Error', 'Please add at least one image for your habit.');
            return;
        }

        setLoading(true);
        try {
            // Prepare the payload to match your action creator structure
            const payload = {
                habitName: values.habitName,
                description: values.description,
                timeDuration: values.timeDuration,
                lifeStyle: values.lifeStyle,
                thumbnail: values.thumbnail,
                images: []
            };

            // If editing, add the ID
            if (values._id) {
                payload._id = values._id;
            }

            // Process all images (both existing and new)
            payload.images = values.images.map((img, index) => {
                if (img.isExisting) {
                    // For existing images, return the reference
                    return {
                        uri: img.uri,
                        isExisting: true,
                        image: img.image
                    };
                } else {
                    // For new images, prepare for upload
                    const uriParts = img.uri.split('/');
                    const fileName = uriParts[uriParts.length - 1];
                    const match = /\.(\w+)$/.exec(fileName);
                    const fileType = match ? match[1] : 'jpeg';
                    
                    return {
                        uri: img.uri,
                        name: `habit_${Date.now()}_${index}.${fileType}`,
                        type: `image/${fileType}`,
                        isNew: true
                    };
                }
            });

            // Call the action creator
            const result = await manageYourHabits(payload);
            
            if (result) {
                resetForm();
                closeModal();
                Alert.alert(
                    'Success', 
                    values._id ? 'Habit updated successfully!' : 'Habit created successfully!'
                );
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to save habit: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
                <Formik
                    initialValues={getInitialValues()}
                    validationSchema={HabitSchema}
                    onSubmit={handleManageHabits}
                    enableReinitialize={true}
                >
                    {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
                        <>
                            <View style={styles.modalHeader}>
                                <Text style={styles.modalTitle}>
                                    {(editingHabit || modelData?.editingHabit) ? 'Edit Habit' : 'Add New Habit'}
                                </Text>
                                <TouchableOpacity onPress={() => closeModal()}>
                                    <Ionicons name="close" size={28} color={isDark ? "#fff" : "#333"} />
                                </TouchableOpacity>
                            </View>

                            <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
                                {/* Images Section */}
                                <Text style={styles.label}>
                                    Images {values.images.length > 0 && `(${values.images.length})`}
                                </Text>
                                <ScrollView 
                                    horizontal 
                                    showsHorizontalScrollIndicator={false} 
                                    style={styles.imageScroll}
                                >
                                    {values.images.map((img, index) => (
                                        <View key={index} style={styles.imagePreviewContainer}>
                                            <Image 
                                                source={{ uri: img.uri }} 
                                                style={styles.imagePreview} 
                                            />
                                            
                                            {/* Remove Button */}
                                            <TouchableOpacity
                                                style={styles.removeImageButton}
                                                onPress={() => removeImage(index, values, setFieldValue)}
                                            >
                                                <Ionicons name="close" size={16} color="#fff" />
                                            </TouchableOpacity>
                                        </View>
                                    ))}
                                    
                                    {/* Add Image Button */}
                                    <TouchableOpacity
                                        style={styles.addImageButton}
                                        onPress={() => setImagePickerVisible(true)}
                                    >
                                        <Ionicons name="camera-outline" size={28} color="#FF4D67" />
                                        <Text style={styles.addImageText}>Add Photos</Text>
                                    </TouchableOpacity>
                                </ScrollView>
                                {errors.images && touched.images && (
                                    <Text style={styles.errorText}>{errors.images}</Text>
                                )}

                                {/* Habit Name */}
                                <Text style={styles.label}>Habit Name</Text>
                                <TextInput
                                    style={[
                                        styles.input, 
                                        errors.habitName && touched.habitName && styles.inputError
                                    ]}
                                    placeholder="e.g., Morning Workout"
                                    placeholderTextColor={isDark ? "#666" : "#999"}
                                    value={values.habitName}
                                    onChangeText={handleChange('habitName')}
                                    onBlur={handleBlur('habitName')}
                                />
                                {errors.habitName && touched.habitName && (
                                    <Text style={styles.errorText}>{errors.habitName}</Text>
                                )}

                                {/* Description */}
                                <Text style={styles.label}>Description</Text>
                                <TextInput
                                    style={[
                                        styles.input, 
                                        styles.textArea, 
                                        errors.description && touched.description && styles.inputError
                                    ]}
                                    placeholder="Describe your habit..."
                                    placeholderTextColor={isDark ? "#666" : "#999"}
                                    multiline
                                    numberOfLines={3}
                                    value={values.description}
                                    onChangeText={handleChange('description')}
                                    onBlur={handleBlur('description')}
                                />
                                {errors.description && touched.description && (
                                    <Text style={styles.errorText}>{errors.description}</Text>
                                )}

                                {/* Time Duration */}
                                <Text style={styles.label}>Time Duration</Text>
                                <TextInput
                                    style={[
                                        styles.input, 
                                        errors.timeDuration && touched.timeDuration && styles.inputError
                                    ]}
                                    placeholder="e.g., 30 min"
                                    placeholderTextColor={isDark ? "#666" : "#999"}
                                    value={values.timeDuration}
                                    onChangeText={handleChange('timeDuration')}
                                    onBlur={handleBlur('timeDuration')}
                                />
                                {errors.timeDuration && touched.timeDuration && (
                                    <Text style={styles.errorText}>{errors.timeDuration}</Text>
                                )}

                                {/* Lifestyle Radio Group */}
                                <Text style={styles.label}>Lifestyle</Text>
                                <View style={styles.radioGroup}>
                                    {[
                                        { name: 'Productive', value: 'productive' },
                                        { name: 'Very busy', value: 'veryBusy' },
                                        { name: 'Night owl', value: 'nightOwl' },
                                        { name: 'Social', value: 'social' },
                                        { name: 'Morning person', value: 'morningPerson' },
                                        { name: 'None', value: 'none' },
                                    ].map((option) => (
                                        <TouchableOpacity
                                            key={option.value}
                                            style={styles.radioOption}
                                            onPress={() => setFieldValue('lifeStyle', option.value)}
                                        >
                                            <View style={[
                                                styles.radioCircle, 
                                                values.lifeStyle === option.value && styles.radioCircleSelected
                                            ]}>
                                                {values.lifeStyle === option.value && (
                                                    <View style={styles.radioInner} />
                                                )}
                                            </View>
                                            <Text style={styles.radioLabel}>{option.name}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </ScrollView>

                            {/* Save Button */}
                            <TouchableOpacity
                                style={[styles.saveButton, loading && styles.saveButtonDisabled]}
                                onPress={handleSubmit}
                                disabled={loading}
                            >
                                {loading ? (
                                    <ActivityIndicator color="#fff" />
                                ) : (
                                    <Text style={styles.saveButtonText}>
                                        {(editingHabit || modelData?.editingHabit) ? 'Update Habit' : 'Add Habit'}
                                    </Text>
                                )}
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
                                        <TouchableOpacity 
                                            style={styles.pickerOption} 
                                            onPress={() => takePhoto(values, setFieldValue)}
                                        >
                                            <Ionicons name="camera" size={24} color="#FF4D67" />
                                            <Text style={styles.pickerOptionText}>Take Photo</Text>
                                        </TouchableOpacity>
                                        
                                        <View style={styles.pickerDivider} />
                                        
                                        <TouchableOpacity 
                                            style={styles.pickerOption} 
                                            onPress={() => pickImageFromGallery(values, setFieldValue)}
                                        >
                                            <Ionicons name="images" size={24} color="#FF4D67" />
                                            <Text style={styles.pickerOptionText}>Choose from Gallery</Text>
                                        </TouchableOpacity>
                                        
                                        <View style={styles.pickerDivider} />
                                        
                                        <TouchableOpacity 
                                            style={styles.pickerOption} 
                                            onPress={() => setImagePickerVisible(false)}
                                        >
                                            <Ionicons name="close" size={24} color="#666" />
                                            <Text style={[styles.pickerOptionText, { color: '#666' }]}>
                                                Cancel
                                            </Text>
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

const mapState = state => ({
    modelData: state.modal
});

const mapDispatch = {
    manageYourHabits,
    closeModal
};

export default connect(mapState, mapDispatch)(YourHabitsForm);