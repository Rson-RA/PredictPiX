import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import { MaterialIcons, FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import * as Sharing from 'expo-sharing';
import { Link } from 'expo-router';

interface ShareReferralSheetProps {
  isVisible: boolean;
  onClose: () => void;
  referralLink: string;
}

interface Styles {
  overlay: ViewStyle;
  container: ViewStyle;
  header: ViewStyle;
  headerText: TextStyle;
  closeButton: ViewStyle;
  content: ViewStyle;
  option: ViewStyle;
  optionText: TextStyle;
  divider: ViewStyle;
  closeButtonBottom: ViewStyle;
  closeButtonText: TextStyle;
}

export default function ShareReferralSheet({ isVisible, onClose, referralLink }: ShareReferralSheetProps) {
  if (!isVisible) return null;

  const handleSystemShare = async () => {
    try {
      await Sharing.shareAsync(referralLink);
      onClose();
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleCopyLink = async () => {
    await Clipboard.setStringAsync(referralLink);
    onClose();
  };

  const handleTwitterShare = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=Join%20me%20on%20PredictPix!%20Use%20my%20referral%20link:%20${encodeURIComponent(referralLink)}`;
    Link.openURL(twitterUrl);
    onClose();
  };

  const handleFacebookShare = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`;
    Link.openURL(facebookUrl);
    onClose();
  };

  return (
    <View style={styles.overlay}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Share Your Referral</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <MaterialIcons name="close" size={24} color="#6B7280" />
          </TouchableOpacity>
        </View>
        <Text style={[styles.headerText, { fontSize: 14, color: '#6B7280', marginTop: -10, marginBottom: 16 }]}>
          Choose how you'd like to share your link:
        </Text>

        <View style={styles.content}>
          <TouchableOpacity style={styles.option} onPress={handleSystemShare}>
            <MaterialIcons name="share" size={24} color="#9747FF" />
            <Text style={styles.optionText}>Use System Share</Text>
            <MaterialIcons name="chevron-right" size={24} color="#6B7280" />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.option} onPress={handleCopyLink}>
            <MaterialIcons name="link" size={24} color="#9747FF" />
            <Text style={styles.optionText}>Copy Link</Text>
            <MaterialIcons name="chevron-right" size={24} color="#6B7280" />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.option} onPress={handleTwitterShare}>
            <FontAwesome name="twitter" size={24} color="#1DA1F2" />
            <Text style={styles.optionText}>Share on Twitter</Text>
            <MaterialIcons name="chevron-right" size={24} color="#6B7280" />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.option} onPress={handleFacebookShare}>
            <FontAwesome name="facebook" size={24} color="#1877F2" />
            <Text style={styles.optionText}>Share on Facebook</Text>
            <MaterialIcons name="chevron-right" size={24} color="#6B7280" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.closeButtonBottom} onPress={onClose}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'flex-end',
    zIndex: 1000,
  },
  container: {
    backgroundColor: '#111827',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  closeButton: {
    padding: 4,
  },
  content: {
    marginBottom: 16,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1F2937',
    borderRadius: 12,
    marginBottom: 12,
    padding: 12,
  },
  optionText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#FFFFFF',
  },
  divider: {
    height: 1,
    backgroundColor: '#2A2B2E',
  },
  closeButtonBottom: {
    backgroundColor: '#1F2937',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
}); 