import React from 'react';
import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { Colors } from '../constants/Colors';

type ConnectWalletDialogProps = {
  visible: boolean;
  onClose: () => void;
  onOpenWallet: () => void;
};

export default function ConnectWalletDialog({ visible, onClose, onOpenWallet }: ConnectWalletDialogProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.dialog}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Connect Your Pi Wallet</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeIcon}>×</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.subtitle}>Scan or tap to link your wallet</Text>

          {/* Steps */}
          <View style={styles.steps}>
            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>1</Text>
              </View>
              <Text style={styles.stepText}>Open your Pi Wallet app</Text>
            </View>

            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>2</Text>
              </View>
              <Text style={styles.stepText}>Scan the QR code below, or tap "Open Pi Wallet"</Text>
            </View>

            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>3</Text>
              </View>
              <Text style={styles.stepText}>Approve the connection request</Text>
            </View>
          </View>

          {/* QR Code */}
          <View style={styles.qrContainer}>
            <Image
              source={require('@/assets/images/qr-code.png')}
              style={styles.qrCode}
              contentFit="contain"
            />
            <Text style={styles.qrText}>Scan with your Pi Wallet app</Text>
          </View>

          {/* Buttons */}
          <View style={styles.buttons}>
            <TouchableOpacity style={styles.openWalletButton} onPress={onOpenWallet}>
              <Text style={styles.openWalletText}>Open Pi Wallet</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialog: {
    backgroundColor: '#111827',
    width: '90%',
    maxWidth: 340,
    borderRadius: 16,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    color: Colors.dark.text,
    fontSize: 18,
    fontWeight: '600',
  },
  closeButton: {
    padding: 4,
  },
  closeIcon: {
    color: Colors.dark.text,
    fontSize: 24,
    lineHeight: 24,
  },
  subtitle: {
    color: '#9BA1A6',
    fontSize: 14,
    marginBottom: 24,
  },
  steps: {
    gap: 16,
    marginBottom: 24,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#9747FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumberText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  stepText: {
    color: Colors.dark.text,
    fontSize: 14,
    flex: 1,
  },
  qrContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  qrCode: {
    width: 200,
    height: 200,
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 8,
  },
  qrText: {
    color: '#9BA1A6',
    fontSize: 14,
  },
  buttons: {
    gap: 12,
  },
  openWalletButton: {
    backgroundColor: '#9747FF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  openWalletText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelText: {
    color: Colors.dark.text,
    fontSize: 16,
  },
}); 