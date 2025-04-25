import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, ViewStyle, TextStyle } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import LogoutConfirmDialog from '@/components/LogoutConfirmDialog';
import NotificationsDialog from '@/components/NotificationsDialog';
import AppearanceDialog from '@/components/AppearanceDialog';
import { useAuth } from '@/context/AuthContext';
import { getFullAvatarUrl } from '@/utils';

const settingsOptions = [
  {
    id: 'profile',
    title: 'Profile',
    icon: 'person-outline',
    iconType: 'Ionicons',
  },
  {
    id: 'wallet-connections',
    title: 'Wallet Connections',
    icon: 'wallet-outline',
    iconType: 'Ionicons',
  },
  {
    id: 'notifications',
    title: 'Notifications',
    icon: 'notifications-outline',
    iconType: 'Ionicons',
  },
  {
    id: 'appearance',
    title: 'Appearance',
    icon: 'color-palette-outline',
    iconType: 'Ionicons',
  },
  {
    id: 'security',
    title: 'Security',
    icon: 'shield-outline',
    iconType: 'Ionicons',
  },
  {
    id: 'support',
    title: 'Support & Feedback',
    icon: 'headset-outline',
    iconType: 'Ionicons',
  },
  {
    id: 'about',
    title: 'About',
    icon: 'information-circle-outline',
    iconType: 'Ionicons',
  }
];

interface StylesType {
  container: ViewStyle;
  headerTitle: TextStyle;
  backButton: ViewStyle;
  section: ViewStyle;
  menuItem: ViewStyle;
  menuItemContent: ViewStyle;
  iconContainer: ViewStyle;
  menuItemText: TextStyle;
  backButtonBottom: ViewStyle;
  backButtonText: TextStyle;
}

export default function SettingsScreen(): React.JSX.Element {
  const router = useRouter();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [showNotifications, setShowNotifications] = React.useState(false);
  const [showAppearance, setShowAppearance] = React.useState(false);
  const [currentTheme, setCurrentTheme] = React.useState<'dark' | 'light'>('dark');
  const { logout, user } = useAuth();

  const handleLogout = async () => {
    // Implement logout logic here
    // For example: clear auth tokens, reset state, etc.
    await logout();
    router.replace('/');
  };

  const handleNotificationSave = (settings: any) => {
    // Handle saving notification settings
    console.log('Notification settings:', settings);
  };

  const handleThemeChange = (theme: 'dark' | 'light') => {
    setCurrentTheme(theme);
    // Implement theme change logic here
    console.log('Theme changed to:', theme);
  };

  const handleItemPress = (item: any) => {
    switch (item.id) {
      case 'notifications':
        setShowNotifications(true);
        break;
      case 'appearance':
        setShowAppearance(true);
        break;
      default:
        router.push(`/settings/${item.id}`);
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Settings",
          headerTitleStyle: styles.headerTitle,
          headerLeft: () => (
            <TouchableOpacity 
              onPress={() => router.back()} 
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

      {/* User Profile Summary */}
      <View style={styles.profileSummary}>
        <Image source={{ uri: getFullAvatarUrl(user?.avatar_url) }} style={styles.avatar} />
        <View style={styles.profileInfo}>
          <Text style={styles.name}>{user?.first_name} {user?.last_name}</Text>
          <Text style={styles.username}>{user?.username}</Text>
        </View>
      </View>

      {/* Settings Options */}
      <ScrollView style={styles.optionsContainer}>
        {settingsOptions.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={styles.optionItem}
            onPress={() => handleItemPress(option)}
          >
            <View style={styles.optionLeft}>
              <Ionicons name={option.icon} size={24} color="#9CA3AF" />
              <Text style={styles.optionTitle}>{option.title}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        ))}

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutOption} onPress={() => setShowLogoutDialog(true)}>
          <View style={styles.optionLeft}>
            <Ionicons name="log-out-outline" size={24} color="#EF4444" />
            <Text style={styles.logoutText}>Logout</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>

      <LogoutConfirmDialog
        visible={showLogoutDialog}
        onClose={() => setShowLogoutDialog(false)}
        onLogout={handleLogout}
      />

      <NotificationsDialog
        visible={showNotifications}
        onClose={() => setShowNotifications(false)}
        onSave={handleNotificationSave}
      />

      <AppearanceDialog
        visible={showAppearance}
        onClose={() => setShowAppearance(false)}
        onApply={handleThemeChange}
        currentTheme={currentTheme}
      />
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
  profileSummary: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 8,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#374151',
  },
  profileInfo: {
    marginLeft: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  username: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  optionsContainer: {
    flex: 1,
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#1F2937',
    marginLeft: 16,
    marginRight: 16,
    marginTop: 2,
    marginBottom: 2,
    borderRadius: 12,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  optionTitle: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  logoutOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#1F2937',
    marginTop: 16,
    marginLeft: 16,
    marginRight: 16,
    borderRadius: 12,
  },
  logoutText: {
    fontSize: 16,
    color: '#EF4444',
  },
  section: {
    padding: 16,
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