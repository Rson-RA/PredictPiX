import React from 'react';
import { StyleSheet, Text, View, Modal, TouchableOpacity, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { Colors } from '../constants/Colors';

type WalletConnectStatusProps = {
  visible: boolean;
  onContinue: () => void;
};

export default function WalletConnectStatus({ visible, onContinue }: WalletConnectStatusProps): JSX.Element {
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
                <Image
                  source={require('@/assets/images/wallet-icon.png')}
                  style={styles.walletIcon}
                  contentFit="contain"
                />
              </View>
              <Text style={styles.title}>Wallet Connected</Text>
              <Text style={styles.description}>
                Your Pi Wallet has been successfully linked! You're all set to start using the app.
              </Text>
            </View>

            <TouchableOpacity style={styles.continueButton} onPress={onContinue}>
              <Text style={styles.buttonText}>Continue</Text>
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
    backgroundColor: '#15171E',
    borderRadius: 20,
    overflow: 'hidden',
    padding: 24,
  },
  content: {
    alignItems: 'center',
    gap: 12,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(46, 196, 182, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  walletIcon: {
    width: 28,
    height: 28,
    tintColor: '#2EC4B6',
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
  continueButton: {
    backgroundColor: '#9747FF',
    padding: 16,
    borderRadius: 14,
    marginTop: 28,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
}); 