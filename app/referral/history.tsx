import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface ReferralUser {
  id: string;
  name: string;
  joinedDate: string;
  avatar: string;
  reward: string;
}

interface Styles {
  container: ViewStyle;
  header: ViewStyle;
  headerTitle: TextStyle;
  backButton: ViewStyle;
  content: ViewStyle;
  userItem: ViewStyle;
  userInfo: ViewStyle;
  avatar: ImageStyle;
  userName: TextStyle;
  joinedDate: TextStyle;
  reward: ViewStyle;
  rewardText: TextStyle;
  backButtonBottom: ViewStyle;
  backButtonText: TextStyle;
}

const mockUsers: ReferralUser[] = [
  {
    id: '1',
    name: 'Emma Davis',
    joinedDate: 'Jan 15, 2025',
    avatar: 'https://i.pravatar.cc/100?img=1',
    reward: '+5 Pi'
  },
  {
    id: '2',
    name: 'James Wilson',
    joinedDate: 'Jan 12, 2025',
    avatar: 'https://i.pravatar.cc/100?img=2',
    reward: '+5 Pi'
  },
  {
    id: '3',
    name: 'Sarah Chen',
    joinedDate: 'Jan 10, 2025',
    avatar: 'https://i.pravatar.cc/100?img=3',
    reward: '+5 Pi'
  }
];

export default function ReferralHistoryScreen() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Referral History</Text>
      </View>

      <ScrollView style={styles.content}>
        {mockUsers.map((user) => (
          <View key={user.id} style={styles.userItem}>
            <View style={styles.userInfo}>
              <Image
                source={{ uri: user.avatar }}
                style={styles.avatar}
              />
              <View>
                <Text style={styles.userName}>{user.name}</Text>
                <Text style={styles.joinedDate}>Joined on {user.joinedDate}</Text>
              </View>
            </View>
            <View style={styles.reward}>
              <Text style={styles.rewardText}>{user.reward}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

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
    backgroundColor: '#111827F2',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2B2E',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  backButton: {
    marginLeft: 8,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  userItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#1E293BF2',
    borderRadius: 12,
    marginBottom: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  joinedDate: {
    fontSize: 14,
    color: '#6B7280',
  },
  reward: {
    backgroundColor: 'rgba(151, 71, 255, 0.1)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  rewardText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#9747FF',
  },
  backButtonBottom: {
    backgroundColor: '#9747FF',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
}); 