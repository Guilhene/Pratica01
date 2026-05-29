import { Modal, StyleSheet, Text, View, Pressable } from 'react-native';
import { Colors } from '../../constants/theme';

function OptionModal({ visible, onClose, onEdit, onDelete, itemDescription }) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <Pressable style={styles.backdrop} onPress={onClose}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>{itemDescription}</Text>
          <View style={styles.buttonContainer}>
            <Pressable style={[styles.button, styles.editButton]} onPress={onEdit}>
              <Text style={styles.buttonText}>Editar</Text>
            </Pressable>
            <Pressable style={[styles.button, styles.deleteButton]} onPress={onDelete}>
              <Text style={styles.buttonText}>Excluir</Text>
            </Pressable>
          </View>
          <Pressable style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
}

export default OptionModal;

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 10,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    minWidth: 100,
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: Colors.primary500,
  },
  deleteButton: {
    backgroundColor: 'red',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  cancelButton: {
    marginTop: 10,
    padding: 10,
  },
  cancelButtonText: {
    color: Colors.primary500,
  },
});
