/* Plugins. */
import { Modal } from 'react-native';
import { connect } from 'react-redux';
import YourHabitsForm from '../YourHabitsForm/YourHabitsForm';

function CommonModal(props) {

    /* Props. */
    const { modelData } = props; 

    return (
        <Modal visible={modelData?.isOpen ?? false} transparent={true} animationType="slide">
            <YourHabitsForm editingHabit={modelData?.data} />
        </Modal>
    )
};

const mapState = state => ({
    modelData: state.modal
});

const mapDispatch = {};

export default connect(mapState, mapDispatch)(CommonModal);