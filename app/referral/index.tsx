import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ViewStyle, TextStyle, Share, ScrollView } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import ShareReferralSheet from '@/components/ShareReferralSheet';
import ReferralTermsDialog from '@/components/ReferralTermsDialog';

interface StylesType {
  container: ViewStyle;
  headerTitle: TextStyle;
  backButton: ViewStyle;
  content: ViewStyle;
  header: ViewStyle;
  headerIcon: ViewStyle;
  title: TextStyle;
  description: TextStyle;
  imageContainer: ViewStyle;
  referralImage: ViewStyle;
  section: ViewStyle;
  sectionTitle: TextStyle;
  codeContainer: ViewStyle;
  code: TextStyle;
  copyButton: ViewStyle;
  copyButtonText: TextStyle;
  linkContainer: ViewStyle;
  link: TextStyle;
  shareButton: ViewStyle;
  shareButtonText: TextStyle;
  historyButton: ViewStyle;
  historyButtonText: TextStyle;
  termsButton: ViewStyle;
  termsText: TextStyle;
  scrollView: ViewStyle;
}

export default function ReferralScreen(): React.JSX.Element {
  const [isShareSheetVisible, setIsShareSheetVisible] = useState(false);
  const [isTermsVisible, setIsTermsVisible] = useState(false);
  const router = useRouter();
  const referralCode = 'ABCD1234';
  const referralLink = `https://predictpix.app/r/${referralCode}`;

  const handleBack = () => {
    router.back();
  };

  const copyCode = async () => {
    await Clipboard.setStringAsync(referralCode);
    // You can add a toast or notification here to show success
  };

  const openShareSheet = () => {
    setIsShareSheetVisible(true);
  };

  const closeShareSheet = () => {
    setIsShareSheetVisible(false);
  };

  const openTerms = () => {
    setIsTermsVisible(true);
  };

  const closeTerms = () => {
    setIsTermsVisible(false);
  };

  const viewHistory = () => {
    router.push('/referral/history');
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: false,
          headerTitle: "Refer & Earn",
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

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.headerIcon}>
              <MaterialIcons name="card-giftcard" size={24} color="#9747FF" />
            </View>
            <Text style={styles.title}>Refer & Earn</Text>
          </View>

          <View style={styles.imageContainer}>
            <Image 
              source={require('@/assets/images/referral.png')} 
              style={styles.referralImage}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.description}>
            Share your unique code or link and earn 5% of your friends' transaction fees.
          </Text>
          
          {/* Referral Code Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Your Referral Code</Text>
            <View style={styles.codeContainer}>
              <Text style={styles.code}>{referralCode}</Text>
              <TouchableOpacity 
                style={styles.copyButton}
                onPress={copyCode}
                accessibilityRole="button"
                accessibilityLabel="Copy referral code"
              >
                <MaterialIcons name="content-copy" size={20} color="#FFFFFF" />
                <Text style={styles.copyButtonText}>Copy Code</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Referral Link Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Your Referral Link</Text>
            <View style={styles.linkContainer}>
              <Text style={styles.link} numberOfLines={1}>{referralLink}</Text>
            </View>
            <TouchableOpacity 
              style={styles.shareButton}
              onPress={openShareSheet}
              accessibilityRole="button"
              accessibilityLabel="Share referral link"
            >
              <MaterialIcons name="share" size={20} color="#FFFFFF" />
              <Text style={styles.shareButtonText}>Share Link</Text>
            </TouchableOpacity>
          </View>

          {/* View History Button */}
          <TouchableOpacity 
            style={styles.historyButton}
            onPress={viewHistory}
            accessibilityRole="button"
            accessibilityLabel="View referral history"
          >
            <MaterialIcons name="history" size={20} color="#FFFFFF" />
            <Text style={styles.historyButtonText}>View Referral History</Text>
          </TouchableOpacity>

          {/* Terms & Conditions */}
          <TouchableOpacity 
            style={styles.termsButton}
            onPress={openTerms}
            accessibilityRole="button"
            accessibilityLabel="View terms and conditions"
          >
            <MaterialIcons name="description" size={20} color="#6B7280" />
            <Text style={styles.termsText}>Terms & Conditions</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <ShareReferralSheet
        isVisible={isShareSheetVisible}
        onClose={closeShareSheet}
        referralLink={referralLink}
      />

      <ReferralTermsDialog
        isVisible={isTermsVisible}
        onClose={closeTerms}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827F2',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  backButton: {
    marginLeft: 8,
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  content: {
    flex: 1,
    padding: 16,
    paddingBottom: 32,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  headerIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(151, 71, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  description: {
    fontSize: 16,
    color: '#9CA3AF',
    marginBottom: 24,
  },
  imageContainer: {
    width: '100%',
    height: 180,
    marginBottom: 24,
    borderRadius: 16,
    overflow: 'hidden',
  },
  referralImage: {
    width: '100%',
    height: '100%',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1F2937',
    padding: 16,
    borderRadius: 12,
  },
  code: {
    fontSize: 20,
    fontWeight: '600',
    color: '#9747FF',
    letterSpacing: 1,
  },
  copyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#9747FF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  copyButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  linkContainer: {
    backgroundColor: '#1F2937',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  link: {
    fontSize: 14,
    color: '#9747FF',
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#9747FF',
    padding: 16,
    borderRadius: 12,
  },
  shareButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  historyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#1F2937',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  historyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  termsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  termsText: {
    color: '#6B7280',
    fontSize: 14,
  },
}); 