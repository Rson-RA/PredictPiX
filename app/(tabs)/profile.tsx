import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Clipboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { router, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import LogoutConfirmDialog from '@/components/LogoutConfirmDialog';
import { useAuth } from '@/context/AuthContext';
import usersApi from '@/api/users';
import { getFullAvatarUrl } from '@/utils';
import Toast from 'react-native-toast-message';
import { Profile, Referral, ReferralResponse } from '@/types/models';
import referralApi from '@/api/referral';

const connectedAccounts = [
  {
    id: 'twitter',
    name: 'Twitter',
    icon: 'twitter',
    status: 'Connect',
    color: '#1DA1F2'
  },
  {
    id: 'discord',
    name: 'Discord',
    icon: 'discord',
    status: 'Connected',
    color: '#5865F2'
  },
  {
    id: 'telegram',
    name: 'Telegram',
    icon: 'telegram',
    status: 'Connect',
    color: '#0088cc'
  }
];

export default function ProfileScreen() {
  const router = useRouter();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const { logout } = useAuth();
  const {user} = useAuth();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [referral, setReferral] = useState<ReferralResponse | null>(null);

  const fetchProfile = async () => {
    if (user) {
      const profile = await usersApi.getProfile(user.id);
      setProfile(profile);
    }
  }

  const fetchReferral = async () => {
    if (user) {
      const referral = await referralApi.getMyReferrals();
      setReferral(referral);
    }
  }

  useEffect(() => {
    fetchProfile();
    fetchReferral();
  }, [])    
  

  const handleLogout = async () => {
    // Implement logout logic here
    // For example: clear auth tokens, reset state, etc.
    await logout();
    router.replace("/sign-in");
    console.log('Logged out');
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
        <TouchableOpacity onPress={() => router.push('/settings')}>
          <Ionicons name="settings-outline" size={24} color="#9CA3AF" />
        </TouchableOpacity>
      </View>

      {/* Profile Info */}
      <View style={styles.profileSection}>
        <View style={styles.avatarContainer}>
          <Image source={{ uri: getFullAvatarUrl(profile?.avatar_url) }} style={styles.avatar} />
          <View style={styles.cameraButton}>
            <Ionicons name="camera" size={20} color="#FFFFFF" />
          </View>
        </View>
        <Text style={styles.name}>{profile?.firstname} {profile?.lastname}</Text>
        <Text style={styles.username}>{profile?.username}</Text>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{profile?.total_predictions || 0}</Text>
            <Text style={styles.statLabel}>Predictions</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>π{profile?.total_earnings || 0}</Text>
            <Text style={styles.statLabel}>Earnings</Text>
          </View>
        </View>
      </View>

      {/* Connected Accounts */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Connected Accounts</Text>
        {connectedAccounts.map((account) => (
          <View key={account.id} style={styles.accountItem}>
            <View style={styles.accountInfo}>
              <FontAwesome5 name={account.icon} size={24} color={account.color} />
              <Text style={styles.accountName}>{account.name}</Text>
            </View>
            <TouchableOpacity
              style={[
                styles.connectButton,
                account.status === 'Connected' && styles.connectedButton,
              ]}
            >
              <Text
                style={[
                  styles.connectButtonText,
                  account.status === 'Connected' && styles.connectedButtonText,
                ]}
              >
                {account.status}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Referral Program */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Referral Program</Text>
        <View style={styles.referralCodeContainer}>
          <Text style={styles.referralCode}>{profile?.referral_code}</Text>
          <TouchableOpacity style={styles.copyButton} onPress={() => {
            Clipboard.setString(profile?.referral_code || '');
            Toast.show({
              text1: 'Referral code copied to clipboard',
            });
          }}>
            <Ionicons name="copy-outline" size={20} color="#8B5CF6" />
          </TouchableOpacity>
        </View>
        <View style={styles.referralStats}>
          <View style={styles.referralStatItem}>
            <Text style={styles.referralLabel}>Total Referrals</Text>
            <Text style={styles.referralValue}>{referral?.total_referrals || 0}</Text>
          </View>
          <View style={styles.referralEarnings}>
            <Text style={styles.referralLabel}>Earned</Text>
            <Text style={styles.referralValue}>π {referral?.referral_earnings || 0}</Text>
          </View>
        </View>
      </View>

      {/* Logout Button */}
      <TouchableOpacity 
        style={styles.logoutButton}
        onPress={() => setShowLogoutDialog(true)}
      >
        <FontAwesome5 name="sign-out-alt" size={20} color="#FF4B55" />
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>

      <LogoutConfirmDialog
        visible={showLogoutDialog}
        onClose={() => setShowLogoutDialog(false)}
        onLogout={handleLogout}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#374151',
  },
  cameraButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#8B5CF6',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  username: {
    fontSize: 16,
    color: '#9CA3AF',
    marginBottom: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 32,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#374151',
  },
  sectionContainer: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  accountItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  accountInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  accountName: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  connectButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20
  },
  connectedButton: {
  },
  connectButtonText: {
    color: '#8B5CF6',
    fontSize: 14,
    fontWeight: '500',
  },
  connectedButtonText: {
    color: '#10B981',
  },
  referralCodeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#111827',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  referralCode: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  copyButton: {
    padding: 4,
  },
  referralStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  referralStatItem: {
    flex: 1,
  },
  referralEarnings: {
    alignItems: 'flex-end',
    flex: 1,
  },
  referralLabel: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  referralValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#1F2937',
    padding: 16,
    borderRadius: 8,
    marginTop: 24,
  },
  logoutButtonText: {
    color: '#FF4B55',
    fontSize: 16,
    fontWeight: '500',
  },
}); 