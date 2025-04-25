import React, { useState } from 'react';
import { StyleSheet, Text, View, Modal, TouchableOpacity, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { Colors } from '../constants/Colors';

type ConnectPiDialogProps = {
  visible: boolean;
  onClose: () => void;
  onConnect: () => void;
  onHelp: () => void;
};

export default function ConnectPiDialog({ visible, onClose, onConnect, onHelp }: ConnectPiDialogProps) {

  const handleConnect = () => {
    onConnect();
  };

  return (
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={onClose}
      >
        <Pressable style={styles.overlay} onPress={onClose}>
          <View style={styles.dialogContainer}>
            <View style={styles.dialog}>
              {/* Header */}
              <View style={styles.header}>
                <View style={styles.titleContainer}>
                  <View style={styles.folderIcon}>
                    <Image
                      source={require('@/assets/images/folder-icon.png')}
                      style={styles.icon}
                      contentFit="contain"
                    />
                  </View>
                  <Text style={styles.title}>Connect Pi Wallet</Text>
                </View>
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                  <Text style={styles.closeIcon}>×</Text>
                </TouchableOpacity>
              </View>

              {/* Content */}
              <View style={styles.content}>
                <Image
                  source={require('@/assets/images/wallet-icon.png')}
                  style={styles.walletIcon}
                  contentFit="contain"
                />
                <Text style={styles.description}>
                  To finish signing up, please link your Pi Wallet. This allows you to securely access features and complete transactions within the app.
                </Text>
              </View>

              {/* Buttons */}
              <View style={styles.buttons}>
                <TouchableOpacity style={styles.connectButton} onPress={handleConnect}>
                  <Image
                    source={require('@/assets/images/wallet-connect-icon.png')}
                    style={styles.buttonIcon}
                    contentFit="contain"
                  />
                  <Text style={styles.buttonText}>Connect Pi Wallet</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.helpButton} onPress={onHelp}>
                  <Image
                    source={require('@/assets/images/help-icon.png')}
                    style={styles.helpIcon}
                    contentFit="contain"
                  />
                  <Text style={styles.helpText}>Need Help?</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Pressable>
      </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialogContainer: {
    width: '90%',
    maxWidth: 340,
  },
  dialog: {
    backgroundColor: '#111827',
    borderRadius: 16,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  folderIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  icon: {
    width: '100%',
    height: '100%',
  },
  title: {
    color: Colors.dark.text,
    fontSize: 16,
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
  content: {
    alignItems: 'center',
    padding: 24,
  },
  walletIcon: {
    width: 120,
    height: 120,
    marginBottom: 24,
  },
  description: {
    color: Colors.dark.text,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  buttons: {
    padding: 16,
    gap: 12,
  },
  connectButton: {
    backgroundColor: '#9747FF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  buttonIcon: {
    width: 20,
    height: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  helpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  helpIcon: {
    width: 16,
    height: 16,
  },
  helpText: {
    color: Colors.dark.text,
    fontSize: 14,
  },
}); 