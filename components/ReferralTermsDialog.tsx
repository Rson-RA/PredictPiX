import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle, TextStyle, Modal } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';

interface ReferralTermsDialogProps {
  isVisible: boolean;
  onClose: () => void;
}

interface Styles {
  overlay: ViewStyle;
  container: ViewStyle;
  content: ViewStyle;
  title: TextStyle;
  item: ViewStyle;
  itemIcon: ViewStyle;
  itemText: TextStyle;
  button: ViewStyle;
  buttonText: TextStyle;
  link: ViewStyle;
  linkText: TextStyle;
}

export default function ReferralTermsDialog({ isVisible, onClose }: ReferralTermsDialogProps) {
  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.content}>
            <Text style={styles.title}>Referral Terms & Conditions</Text>

            <View style={styles.item}>
              <View style={[styles.itemIcon, { backgroundColor: 'rgba(151, 71, 255, 0.1)' }]}>
                <MaterialIcons name="percent" size={20} color="#9747FF" />
              </View>
              <Text style={styles.itemText}>
                You earn 5% of your referees' transaction fees.
              </Text>
            </View>

            <View style={styles.item}>
              <View style={[styles.itemIcon, { backgroundColor: 'rgba(151, 71, 255, 0.1)' }]}>
                <MaterialIcons name="schedule" size={20} color="#9747FF" />
              </View>
              <Text style={styles.itemText}>
                Rewards are credited within 24 hours of each completed transaction.
              </Text>
            </View>

            <View style={styles.item}>
              <View style={[styles.itemIcon, { backgroundColor: 'rgba(255, 86, 86, 0.1)' }]}>
                <MaterialIcons name="warning" size={20} color="#FF5656" />
              </View>
              <Text style={styles.itemText}>
                Abuse or self-referral will forfeit rewards.
              </Text>
            </View>

            <TouchableOpacity 
              style={styles.link}
              onPress={() => Link.openURL('https://predictpix.app/terms')}
            >
              <MaterialIcons name="description" size={20} color="#6B7280" />
              <Text style={styles.linkText}>Full terms at predictpix.app/terms</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.button}
              onPress={onClose}
              accessibilityRole="button"
              accessibilityLabel="Close terms dialog"
            >
              <Text style={styles.buttonText}>Got it</Text>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    margin: 20,
    backgroundColor: '#111827F2',
    borderRadius: 16,
    width: '90%',
    maxWidth: 400,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 24,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  itemIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  itemText: {
    flex: 1,
    fontSize: 15,
    color: '#FFFFFF',
    lineHeight: 20,
  },
  link: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 8,
    marginBottom: 24,
  },
  linkText: {
    color: '#6B7280',
    fontSize: 14,
  },
  button: {
    backgroundColor: '#9747FF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
}); 