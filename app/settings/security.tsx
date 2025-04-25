import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function SecurityScreen() {
  const router = useRouter();
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);

  const handleBack = () => {
    router.back();
  };

  const handleToggle2FA = (value: boolean) => {
    setIs2FAEnabled(value);
    // Implement 2FA toggle logic here
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Security",
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

      {/* Security Options */}
      <View style={styles.section}>
        {/* Change PIN/Password */}
        <TouchableOpacity style={styles.securityItem}>
          <View style={styles.itemContent}>
            <View style={styles.iconContainer}>
              <MaterialIcons name="lock" size={24} color="#9747FF" />
            </View>
            <Text style={styles.itemText}>Change PIN/Password</Text>
          </View>
          <MaterialIcons name="chevron-right" size={24} color="#6B7280" />
        </TouchableOpacity>

        {/* Two-Factor Authentication */}
        <View style={styles.securityItem}>
          <View style={styles.itemContent}>
            <View style={styles.iconContainer}>
              <MaterialIcons name="security" size={24} color="#9747FF" />
            </View>
            <View>
              <Text style={styles.itemText}>Two-Factor Authentication</Text>
              <Text style={styles.itemStatus}>
                {is2FAEnabled ? 'On' : 'Off'}
              </Text>
            </View>
          </View>
          <Switch
            value={is2FAEnabled}
            onValueChange={handleToggle2FA}
            trackColor={{ false: '#374151', true: '#9747FF' }}
            thumbColor="#FFFFFF"
          />
        </View>
      </View>

      {/* Back Button */}
      <TouchableOpacity 
        style={styles.backButtonBottom}
        onPress={handleBack}
      >
        <Text style={styles.backButtonText}>Back</Text>
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
  section: {
    padding: 16,
  },
  securityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1F2937',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(151, 71, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  itemStatus: {
    color: '#6B7280',
    fontSize: 14,
    marginTop: 2,
  },
  backButtonBottom: {
    backgroundColor: '#9747FF',
    margin: 16,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 'auto',
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
}); 