import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

interface StylesType {
  container: ViewStyle;
  headerTitle: TextStyle;
  backButton: ViewStyle;
  section: ViewStyle;
  supportItem: ViewStyle;
  itemContent: ViewStyle;
  iconContainer: ViewStyle;
  itemText: TextStyle;
  backButtonBottom: ViewStyle;
  backButtonText: TextStyle;
}

export default function SupportScreen(): React.JSX.Element {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Support & Feedback",
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

      {/* Support Options */}
      <View style={styles.section}>
        {/* View FAQ */}
        <TouchableOpacity 
          style={styles.supportItem}
          accessibilityRole="button"
          accessibilityLabel="View frequently asked questions"
        >
          <View style={styles.itemContent}>
            <View style={styles.iconContainer}>
              <MaterialIcons name="help-outline" size={24} color="#9747FF" />
            </View>
            <Text style={styles.itemText}>View FAQ</Text>
          </View>
          <MaterialIcons name="chevron-right" size={24} color="#6B7280" />
        </TouchableOpacity>

        {/* Send Feedback */}
        <TouchableOpacity 
          style={styles.supportItem}
          accessibilityRole="button"
          accessibilityLabel="Send feedback"
        >
          <View style={styles.itemContent}>
            <View style={styles.iconContainer}>
              <MaterialIcons name="chat-bubble-outline" size={24} color="#9747FF" />
            </View>
            <Text style={styles.itemText}>Send Feedback</Text>
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
  supportItem: {
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