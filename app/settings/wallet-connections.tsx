import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function WalletConnectionsScreen() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const handleDisconnect = () => {
    // Implement wallet disconnect logic
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Wallet Connections",
          headerTitleStyle: styles.headerTitle,
          headerLeft: () => (
            <TouchableOpacity onPress={handleBack} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: '#111827',
          },
        }}
      />

      {/* Connected Wallet */}
      <TouchableOpacity style={styles.walletItem}>
        <View style={styles.walletInfo}>
          <MaterialIcons name="account-balance-wallet" size={24} color="#9747FF" />
          <View>
            <Text style={styles.walletTitle}>Pi Wallet (Connected)</Text>
            <Text style={styles.walletSubtitle}>Tap to view details</Text>
          </View>
        </View>
        <MaterialIcons name="chevron-right" size={24} color="#6B7280" />
      </TouchableOpacity>

      {/* Security Status */}
      <View style={styles.infoSection}>
        <View style={styles.infoHeader}>
          <MaterialIcons name="security" size={20} color="#4ADE80" />
          <Text style={styles.infoTitle}>Security Status</Text>
        </View>
        <Text style={styles.infoText}>
          Your wallet connection is secure and encrypted.
        </Text>
        <Text style={styles.infoSubtext}>Last activity: Today at 2:30 PM</Text>
      </View>

      {/* Connection Info */}
      <View style={styles.infoSection}>
        <View style={styles.infoHeader}>
          <MaterialIcons name="info" size={20} color="#3B82F6" />
          <Text style={styles.infoTitle}>Connection Info</Text>
        </View>
        <Text style={styles.infoText}>
          Connected via secure Pi Network protocol. All transactions are verified and logged.
        </Text>
      </View>

      {/* Disconnect Button */}
      <TouchableOpacity 
        style={styles.disconnectButton}
        onPress={handleDisconnect}
      >
        <Text style={styles.disconnectButtonText}>Disconnect Wallet</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  backButton: {
    marginLeft: 8,
  },
  walletItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1F2937',
    padding: 16,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
  },
  walletInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  walletTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  walletSubtitle: {
    color: '#6B7280',
    fontSize: 14,
  },
  infoSection: {
    backgroundColor: '#1F2937',
    padding: 16,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  infoTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  infoText: {
    color: '#9CA3AF',
    fontSize: 14,
    lineHeight: 20,
  },
  infoSubtext: {
    color: '#6B7280',
    fontSize: 14,
    marginTop: 4,
  },
  disconnectButton: {
    backgroundColor: '#FF4B55',
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 16,
    marginTop: 'auto',
    marginBottom: 16,
    alignItems: 'center',
  },
  disconnectButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
}); 