import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

interface ConfirmPurchaseScreenProps {
  route: {
    params: {
      marketQuestion: string;
      position: string;
      probability: number;
      stake: number;
      potentialProfit: number;
      fee: number;
    };
  };
}

const ConfirmPurchaseScreen: React.FC<ConfirmPurchaseScreenProps> = ({ route }) => {
  const navigation = useNavigation();
  const { marketQuestion, position, probability, stake, potentialProfit, fee } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image 
            source={require('../assets/profile-pic.png')} 
            style={styles.avatar}
          />
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText}>Welcome back,</Text>
            <Text style={styles.userName}>Alex Thompson</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Icon name="notifications" size={24} color="#94A3B8" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <View style={styles.successIcon}>
            <Icon name="checkmark" size={48} color="#FFFFFF" />
          </View>
          <Text style={styles.title}>Purchase Successful!</Text>
          <Text style={styles.subtitle}>Your position has been confirmed</Text>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Order Details</Text>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Market</Text>
              <Text style={styles.detailValue}>{marketQuestion}</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Position</Text>
              <Text style={[styles.detailValue, styles.positionValue]}>Yes @ {probability}%</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Stake Amount</Text>
              <Text style={styles.detailValue}>${stake.toFixed(2)}</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Transaction Fee</Text>
              <Text style={styles.detailValue}>${fee.toFixed(2)}</Text>
            </View>

            <View style={styles.divider} />

            <View style={[styles.detailRow]}>
              <Text style={styles.detailLabel}>Potential Profit</Text>
              <Text style={[styles.detailValue, styles.profitValue]}>+${potentialProfit.toFixed(2)}</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => navigation.navigate('Positions')}
          >
            <Text style={styles.primaryButtonText}>View My Positions</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => navigation.navigate('Main', { screen: 'Markets' })}
          >
            <Text style={styles.secondaryButtonText}>Back to Markets</Text>
          </TouchableOpacity>

          <View style={styles.shareSection}>
            <View style={styles.shareContainer}>
              <View style={styles.shareTitleRow}>
                <Text style={styles.shareText}>Share your position</Text>
                <Icon name="share-social" size={20} color="#7C3AED" />
              </View>
              <View style={styles.shareButtons}>
                <TouchableOpacity style={[styles.shareButton, styles.twitterButton]}>
                  <Icon name="logo-twitter" size={24} color="#FFFFFF" />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.shareButton, styles.telegramButton]}>
                  <Icon name="paper-plane" size={24} color="#FFFFFF" />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.shareButton, styles.linkButton]}>
                  <Icon name="link" size={24} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#1A1B25',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  welcomeContainer: {
    gap: 2,
  },
  welcomeText: {
    fontSize: 14,
    color: '#94A3B8',
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#7C3AED',
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2A2B35',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
  },
  successIcon: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#94A3B8',
    marginBottom: 32,
  },
  card: {
    width: '100%',
    backgroundColor: '#1F2937',
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 24,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB40',
    width: '100%',
  },
  detailLabel: {
    fontSize: 16,
    color: '#64748B',
  },
  detailValue: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500',
    textAlign: 'right',
    flex: 1,
    marginLeft: 16,
  },
  positionValue: {
    color: '#4ADE80',
  },
  profitValue: {
    color: '#4ADE80',
  },
  primaryButton: {
    width: '100%',
    height: 56,
    backgroundColor: '#8B5CF6',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  secondaryButton: {
    width: '100%',
    height: 56,
    backgroundColor: '#1F2937',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  shareSection: {
    width: '100%',
    paddingHorizontal: 16,
    marginTop: 24,
    marginBottom: 24,
  },
  shareContainer: {
    backgroundColor: '#1F2937',
    borderRadius: 16,
    padding: 16,
  },
  shareTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  shareText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  shareButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  shareButton: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  twitterButton: {
    backgroundColor: '#1D4ED8',
  },
  telegramButton: {
    backgroundColor: '#0D6B3F',
  },
  linkButton: {
    backgroundColor: '#4B5563',
  },
});

export default ConfirmPurchaseScreen; 