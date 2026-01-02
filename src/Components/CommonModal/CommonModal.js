/* Plugins. */
import { Modal } from 'react-native';
import { connect } from 'react-redux';
import YourHabitsForm from '../YourHabitsForm/YourHabitsForm';

function CommonModal({ modelData }) {
    return (
        <Modal visible={modelData?.isOpen ?? false} transparent={true} animationType="slide">
            <YourHabitsForm />
        </Modal>
    )
};

const mapState = state => ({
    modelData: state.modal
});

const mapDispatch = {};

export default connect(mapState, mapDispatch)(CommonModal);