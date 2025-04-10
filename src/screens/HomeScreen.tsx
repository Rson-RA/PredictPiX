import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import type { RootTabScreenProps } from '../navigation/types';
import FeaturedMarketCard from '../components/FeaturedMarketCard';
import TopTraderCard from '../components/TopTraderCard';

const HomeScreen: React.FC<RootTabScreenProps<'Home'>> = ({ navigation }) => {
  const handleCreateMarket = () => {
    navigation.navigate('ChooseMarket');
  };

  const handleExploreAll = () => {
    navigation.navigate('Markets');
  };

  const handleReferAndEarn = () => {
    // Handle refer and earn
  };

  const handleViewAllMarkets = () => {
    navigation.navigate('Markets');
  };

  const handleViewLeaderboard = () => {
    navigation.navigate('Leaderboard');
  };

  const handleWalletPress = () => {
    // Handle wallet press
  };

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <Image
              source={require('../assets/images/avatar.png')}
              style={styles.avatar}
            />
            <View>
              <Text style={styles.welcomeText}>Welcome back,</Text>
              <Text style={styles.userName}>Alex Thompson</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.walletButton} onPress={handleWalletPress}>
            <Icon name="wallet-outline" size={20} color="#fff" />
            <Text style={styles.walletText}>Wallet</Text>
          </TouchableOpacity>
        </View>

        {/* Stats Banner */}
        <View style={styles.statsBanner}>
          <Icon name="flame" size={24} color="#FF6B00" />
          <Text style={styles.statsText}>12,000 Pioneers trading today</Text>
          <Icon name="arrow-up" size={20} color="#8B5CF6" />
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.createButton} onPress={handleCreateMarket}>
            <Icon name="add" size={24} color="#fff" />
            <Text style={styles.buttonText}>Create{'\n'}Market</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={handleExploreAll}>
            <Icon name="compass" size={24} color="#fff" />
            <Text style={styles.buttonText}>Explore All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={handleReferAndEarn}>
            <Icon name="share-social" size={24} color="#fff" />
            <Text style={styles.buttonText}>Refer & Earn</Text>
          </TouchableOpacity>
        </View>

        {/* Featured Markets */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Markets</Text>
            <TouchableOpacity onPress={handleViewAllMarkets}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.featuredMarketsScroll}
            contentContainerStyle={styles.featuredMarketsContent}>
            <FeaturedMarketCard
              title="Will Bitcoin reach $100k by end of 2025?"
              timeLeft="2d 14h"
              percentage={75}
              value="847,392"
              onPress={() => {}}
            />
            <FeaturedMarketCard
              title="Will Apple launch AI-powered device in 2024?"
              timeLeft="5d 8h"
              percentage={-32}
              value="523,157"
              onPress={() => {}}
            />
          </ScrollView>
        </View>

        {/* Top Traders */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Top Traders This Week</Text>
            <TouchableOpacity onPress={handleViewLeaderboard}>
              <Text style={styles.viewAllText}>Full Leaderboard</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.tradersContainer}>
            <TopTraderCard
              rank={1}
              name="John D."
              profit="+$124,392"
              avatar={require('../assets/images/trader1.png')}
            />
            <TopTraderCard
              rank={2}
              name="Sarah M."
              profit="+$98,157"
              avatar={require('../assets/images/trader2.png')}
            />
            <TopTraderCard
              rank={3}
              name="Mike R."
              profit="+$76,891"
              avatar={require('../assets/images/trader3.png')}
            />
          </View>
        </View>

        {/* Referral Banner */}
        <View style={styles.referralBanner}>
          <View style={styles.referralContent}>
            <View style={styles.referralHeader}>
              <Text style={styles.referralTitle}>Earn 5% from referrals</Text>
              <Icon name="gift-outline" size={24} color="#8B5CF6" />
            </View>
            <Text style={styles.referralText}>
              Invite your friends and earn 5% of their trading volume!
            </Text>
            <TouchableOpacity style={styles.referralButton} onPress={handleReferAndEarn}>
              <Icon name="link-outline" size={20} color="#fff" style={styles.referralIcon} />
              <Text style={styles.referralButtonText}>Copy Referral Link</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#111827',
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  welcomeText: {
    color: '#6B7280',
    fontSize: 14,
  },
  userName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  walletButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1B25',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginLeft: 16,
  },
  walletText: {
    color: '#fff',
    marginLeft: 6,
    fontSize: 14,
  },
  statsBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#7C3AED33',
    marginHorizontal: 16,
    marginVertical: 12,
    padding: 12,
    borderRadius: 12,
  },
  statsText: {
    color: '#fff',
    fontSize: 14,
    flex: 1,
    marginHorizontal: 8,
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  createButton: {
    flex: 1,
    backgroundColor: '#8B5CF6',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginRight: 8,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginRight: 8,
  },
  buttonText: {
    color: '#fff',
    marginTop: 8,
    fontSize: 14,
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
  viewAllText: {
    color: '#8B5CF6',
    fontSize: 14,
  },
  featuredMarketsScroll: {
    paddingLeft: 16,
  },
  featuredMarketsContent: {
    paddingRight: 16,
  },
  tradersContainer: {
    marginHorizontal: 16,
    paddingTop: 8,
  },
  referralBanner: {
    backgroundColor: '#7C3AED33',
    marginHorizontal: 16,
    marginBottom: 24,
    borderRadius: 16,
    padding: 20,
  },
  referralContent: {
    flex: 1,
  },
  referralHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  referralTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
  referralText: {
    color: '#9CA3AF',
    fontSize: 14,
    marginBottom: 20,
    lineHeight: 20,
  },
  referralButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8B5CF6',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    width: '100%',
  },
  referralIcon: {
    marginRight: 8,
  },
  referralButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default HomeScreen; 