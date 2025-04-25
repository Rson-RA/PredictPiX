import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ModalProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface LogoutConfirmDialogProps {
  visible: boolean;
  onClose: () => void;
  onLogout: () => void;
}

const LogoutConfirmDialog: React.FC<LogoutConfirmDialogProps> = ({
  visible,
  onClose,
  onLogout,
}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.dialog}>
          <View style={styles.header}>
            <Text style={styles.title}>Logout</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.message}>Are you sure you want to sign out?</Text>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.button, styles.cancelButton]} 
              onPress={onClose}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.button, styles.logoutButton]} 
              onPress={onLogout}
            >
              <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  dialog: {
    backgroundColor: '#111827',
    borderRadius: 12,
    width: '100%',
    maxWidth: 340,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  closeButton: {
    padding: 4,
  },
  message: {
    color: '#9CA3AF',
    fontSize: 16,
    marginBottom: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  button: {
    flex: 1,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#1F2937',
  },
  logoutButton: {
    backgroundColor: '#9747FF',
  },
  cancelButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default LogoutConfirmDialog; 