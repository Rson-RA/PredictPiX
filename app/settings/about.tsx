import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

interface StylesType {
  container: ViewStyle;
  headerTitle: TextStyle;
  backButton: ViewStyle;
  section: ViewStyle;
  versionContainer: ViewStyle;
  versionLabel: TextStyle;
  versionText: TextStyle;
  menuItem: ViewStyle;
  menuItemContent: ViewStyle;
  menuItemText: TextStyle;
  backButtonBottom: ViewStyle;
  backButtonText: TextStyle;
}

export default function AboutScreen(): React.JSX.Element {
  const router = useRouter();
  const appVersion = '2.1.0'; // You can make this dynamic by importing from your app config

  const handleBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "About",
          headerTitleStyle: styles.headerTitle,
          headerLeft: () => (
            <TouchableOpacity 
              onPress={handleBack} 
              style={styles.backButton}
              accessibilityRole="button"
              accessibilityLabel="Go back"
            >
              <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: '#111827',
          },
        }}
      />

      {/* Version Info */}
      <View style={styles.section}>
        <View style={styles.versionContainer}>
          <Text style={styles.versionLabel}>Version</Text>
          <Text style={styles.versionText}>{appVersion}</Text>
        </View>

        {/* Terms of Service */}
        <TouchableOpacity 
          style={styles.menuItem}
          accessibilityRole="button"
          accessibilityLabel="View Terms of Service"
        >
          <View style={styles.menuItemContent}>
            <Text style={styles.menuItemText}>Terms of Service</Text>
          </View>
          <MaterialIcons name="chevron-right" size={24} color="#6B7280" />
        </TouchableOpacity>

        {/* Privacy Policy */}
        <TouchableOpacity 
          style={styles.menuItem}
          accessibilityRole="button"
          accessibilityLabel="View Privacy Policy"
        >
          <View style={styles.menuItemContent}>
            <Text style={styles.menuItemText}>Privacy Policy</Text>
          </View>
          <MaterialIcons name="chevron-right" size={24} color="#6B7280" />
        </TouchableOpacity>
      </View>

      {/* Back Button */}
      <TouchableOpacity 
        style={styles.backButtonBottom}
        onPress={handleBack}
        accessibilityRole="button"
        accessibilityLabel="Go back"
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
  versionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1F2937',
    marginBottom: 16,
  },
  versionLabel: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  versionText: {
    color: '#6B7280',
    fontSize: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1F2937',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    color: '#FFFFFF',
    fontSize: 16,
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