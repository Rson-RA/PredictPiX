import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Modal, TouchableOpacity, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { Colors } from '../constants/Colors';

type WalletConnectStatusProps = {
  visible: boolean;
  onContinue: (isContinue: boolean) => void;
};

export default function WalletConnectStatus({ visible, onContinue }: WalletConnectStatusProps): JSX.Element {
  
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        setIsWalletConnected(true);
      }, 2000);
    }
  }, [visible]);
  
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
                  source={isWalletConnected ? require('@/assets/images/wallet-connected.png') : require('@/assets/images/wallet-wait-approval.png')}
                  style={styles.walletIcon}
                  contentFit="contain"
                />
              </View>
              <Text style={styles.title}>{isWalletConnected ? 'Wallet Connected' : 'Waiting for Wallet Approval'}</Text>
              <Text style={styles.description}>
                {isWalletConnected ? 'Your Pi Wallet has been successfully linked! You\'re all set to start using the app.' : 'Your Pi Wallet has been successfully linked! You\'re all set to start using the app.'}  
              </Text>
            </View>

            <TouchableOpacity style={isWalletConnected ? styles.continueButton : styles.cancelButton} onPress={() => onContinue(isWalletConnected)}>
              {isWalletConnected ? <Text style={styles.buttonText}>Continue</Text> : <Text style={styles.buttonText}>Cancel</Text>}
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
    // width: 100,
    // height: 100,
    borderRadius: 9999,
    backgroundColor: 'rgba(46, 196, 182, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  walletIcon: {
    width: 100,
    height: 100,
    // tintColor: '#2EC4B6',
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
  cancelButton: {
    backgroundColor: '#374151',
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