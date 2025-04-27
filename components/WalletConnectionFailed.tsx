import React from 'react';
import { StyleSheet, Text, View, Modal, TouchableOpacity, Pressable, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type ConnectionFailedProps = {
  visible: boolean;
  onRetry: () => void;
  onCancel: () => void;
};

export default function WalletConnectionFailed({ visible, onRetry, onCancel }: ConnectionFailedProps): JSX.Element {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
    >
      <Pressable style={styles.overlay}>
        <View style={styles.dialogContainer}>
          <View style={styles.dialog}>
            <View style={styles.content}>
              <View style={styles.iconContainer}>
                <Image source={require('@/assets/images/wallet-connect-failed-icon.png')} style={styles.icon} />
                <Text style={styles.title}>Connection Failed</Text>
                </View>
              <Text style={styles.description}>
                We couldn't connect to your Pi Wallet. Please try again or check your wallet app.
              </Text>
            </View>

            <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
              <Text style={styles.buttonText}>Retry</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialogContainer: {
    width: '90%',
    maxWidth: 340,
  },
  dialog: {
    backgroundColor: '#1F2937',
    borderRadius: 20,
    overflow: 'hidden',
    padding: 24,
  },
  content: {
    alignItems: 'center',
    gap: 12,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 12,
    marginBottom: 12,
  },
  icon: {
    width: 40,
    height: 40,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4,
  },
  description: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
  },
  retryButton: {
    backgroundColor: '#9747FF',
    padding: 16,
    borderRadius: 14,
    marginTop: 28,
  },
  cancelButton: {
    backgroundColor: '#374151',
    padding: 16,
    borderRadius: 14,
    marginTop: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  cancelButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    opacity: 0.8,
  },
}); 