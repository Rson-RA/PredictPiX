import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, SafeAreaView, Image} from 'react-native';
import type {RootTabScreenProps} from '../navigation/types';
import {Card, Switch, TextField, IconButton} from '../components';
import {colors, typography, spacing, borderRadius} from '../styles/theme';
import {commonStyles} from '../styles/common';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

export default function ProfileScreen({navigation}: RootTabScreenProps<'Profile'>) {
  const [marketUpdates, setMarketUpdates] = useState(true);
  const [newFeatures, setNewFeatures] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          name="cog"
          onPress={() => {
            // Handle settings press
            console.log('Settings pressed');
          }}
          style={styles.settingsButton}
        />
      ),
    });
  }, [navigation]);

  return (
    <SafeAreaView style={commonStyles.screen}>
      <View style={commonStyles.container}>
        {/* Profile Info */}
        <View style={styles.profileInfo}>
          <View style={styles.profileImageContainer}>
            <Image
              source={require('../assets/profile-pic.png')}
              style={styles.profilePic}
            />
            <View style={styles.cameraButton}>
              <MaterialIcon name="photo-camera" size={20} color="#FFFFFF" />
            </View>
          </View>
          <Text style={styles.name}>Alex Thompson</Text>
          <Text style={styles.username}>@alexthompson</Text>
          <View style={commonStyles.rowBetween}>
            <View style={styles.stat}>
              <Text style={styles.statValue}>245</Text>
              <Text style={styles.statLabel}>Predictions</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statValue}>$12.5k</Text>
              <Text style={styles.statLabel}>Earnings</Text>
            </View>
          </View>
        </View>

        {/* Connected Accounts */}
        <Card>
          <Text style={styles.sectionTitle}>Connected Accounts</Text>
          <View style={styles.accountItem}>
            <View style={commonStyles.row}>
              <Icon name="twitter" size={24} color="#1DA1F2" />
              <Text style={styles.accountName}>Twitter</Text>
            </View>
            <Text style={styles.connectButton}>Connect</Text>
          </View>
          <View style={styles.accountItem}>
            <View style={commonStyles.row}>
              <MaterialIcon name="discord" size={24} color="#7289DA" />
              <Text style={styles.accountName}>Discord</Text>
            </View>
            <Text style={[styles.connectButton, styles.connected]}>Connected</Text>
          </View>
          <View style={styles.accountItem}>
            <View style={commonStyles.row}>
              <MaterialIcon name="telegram" size={24} color="#0088cc" />
              <Text style={styles.accountName}>Telegram</Text>
            </View>
            <Text style={styles.connectButton}>Connect</Text>
          </View>
        </Card>

        {/* Referral Program */}
        <Card>
          <Text style={styles.sectionTitle}>Referral Program</Text>
          <TextField
            label="Your Referral Code"
            value="ALEX2025"
            readOnly
            onCopy={() => {/* Implement copy functionality */}}
          />
          <View style={commonStyles.rowBetween}>
            <View style={styles.referralStat}>
              <Text style={styles.referralLabel}>Total Referrals</Text>
              <Text style={styles.referralValue}>23 users</Text>
            </View>
            <View style={styles.referralStat}>
              <Text style={styles.referralLabel}>Earned</Text>
              <Text style={styles.referralValue}>$156.00</Text>
            </View>
          </View>
          <View style={styles.referralButton}>
            <Text style={styles.referralButtonText}>Copy Referral Link</Text>
          </View>
        </Card>

        {/* Notification Settings */}
        <Card>
          <Text style={styles.sectionTitle}>Notification Settings</Text>
          <Switch
            label="Market Updates"
            description="Get notified about your active markets"
            value={marketUpdates}
            onValueChange={setMarketUpdates}
          />
          <Switch
            label="New Features"
            description="Stay updated with platform updates"
            value={newFeatures}
            onValueChange={setNewFeatures}
          />
        </Card>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#111827',
  },
  profileInfo: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: spacing.md,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: borderRadius.full,
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
    borderWidth: 2,
    borderColor: '#111827',
  },
  name: {
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.semibold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  username: {
    fontSize: typography.sizes.md,
    color: colors.text.secondary,
    marginBottom: spacing.md,
  },
  stat: {
    alignItems: 'center',
    marginHorizontal: spacing.md,
  },
  statValue: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.semibold,
    color: colors.text.primary,
  },
  statLabel: {
    fontSize: typography.sizes.sm,
    color: colors.text.secondary,
  },
  sectionTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  accountItem: {
    ...commonStyles.rowBetween,
    marginBottom: spacing.md,
    paddingVertical: 8,
  },
  accountName: {
    fontSize: typography.sizes.md,
    color: colors.text.primary,
    marginLeft: spacing.md,
  },
  connectButton: {
    fontSize: typography.sizes.md,
    color: '#8B5CF6',
    fontWeight: typography.weights.medium,
  },
  connected: {
    color: '#10B981',
  },
  referralStat: {
    alignItems: 'flex-start',
  },
  referralLabel: {
    fontSize: typography.sizes.sm,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  referralValue: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
    color: colors.text.primary,
  },
  referralButton: {
    backgroundColor: '#8B5CF6',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  referralButtonText: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    color: colors.text.primary,
  },
  settingsButton: {
    marginRight: spacing.sm,
  },
}); 