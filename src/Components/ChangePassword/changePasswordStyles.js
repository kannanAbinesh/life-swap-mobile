/* Plugins. */
import { StyleSheet } from "react-native";

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
        paddingTop: 30,
        paddingBottom: 40,
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginBottom: 30,
        lineHeight: 20,
        fontFamily: 'Lexend_400Regular',
    },
    formSection: {
        marginBottom: 30,
    },
    fieldContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        color: '#5c5b5bff',
        marginBottom: 8,
        marginLeft: 4,
        fontFamily: 'Lexend_400Regular',
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 12,
        borderWidth: 1.5,
        borderColor: '#E0E0E0',
        paddingHorizontal: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },
    icon: {
        marginRight: 12,
    },
    input: {
        flex: 1,
        paddingVertical: 15,
        fontSize: 16,
        color: '#333',
        fontFamily: 'Lexend_400Regular',
    },
    eyeIcon: {
        padding: 5,
    },
    errorText: {
        color: '#FF4D67',
        fontSize: 12,
        marginTop: 5,
        marginLeft: 4,
        fontFamily: 'Lexend_400Regular',
    },
    requirementsContainer: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 15,
        marginTop: 10,
        borderWidth: 1.5,
        borderColor: '#E0E0E0',
    },
    requirementsTitle: {
        fontSize: 13,
        fontWeight: '600',
        color: '#333',
        marginBottom: 10,
        fontFamily: 'Lexend_400Regular',
    },
    requirementItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },
    requirementText: {
        fontSize: 12,
        color: '#666',
        marginLeft: 8,
        fontFamily: 'Lexend_400Regular',
    },
    submitButton: {
        backgroundColor: '#FF4D67',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: '#FF4D67',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 4,
    },
    submitButtonDisabled: {
        backgroundColor: '#FFB3C1',
        shadowOpacity: 0.1,
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        fontFamily: 'Lexend_400Regular',
    },
});

export default styles;