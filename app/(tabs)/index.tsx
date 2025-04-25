import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, ImageBackground, ActivityIndicator, Alert, RefreshControl } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { FontAwesome5, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { getFullAvatarUrl, getFullName } from '@/utils';
import { Market } from '@/types/models';
import marketsApi from '@/api/markets';
import { FeaturedMarketItem } from '@/components/markets';
import { Colors } from '@/constants/Colors';
import usersApi, { Trader } from '@/api/users';
import { TraderItem } from '@/components/traders';

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const router = useRouter();
  const { user } = useAuth();
  const [featuredMarkets, setFeaturedMarkets] = useState<Market[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [topTraders, setTopTraders] = useState<Trader[]>([]);
  const [isLoadingTraders, setIsLoadingTraders] = useState(true);

  const loadFeaturedMarkets = async () => {
    try {
      setIsLoading(true);
      const [popular, trending] = await Promise.all([
        marketsApi.getPopularMarkets(3), []
        // marketsApi.getTrendingMarkets(2)
      ]);
      
      // Combine and deduplicate markets
      const combinedMarkets = [...popular];
      const uniqueMarkets = Array.from(new Map(combinedMarkets.map(market => [market.id, market])).values());
      setFeaturedMarkets(uniqueMarkets.slice(0, 5));
    } catch (error) {
      console.error('Error loading featured markets:', error);
      Alert.alert(
        'Error',
        'Failed to load featured markets. Please try again later.'
      );
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  const loadTopTraders = async () => {
    try {
      setIsLoadingTraders(true);
      const traders = await usersApi.getTopTraders('week', 3);
      setTopTraders(traders);
    } catch (error) {
      console.error('Error loading top traders:', error);
      Alert.alert(
        'Error',
        'Failed to load top traders. Please try again later.'
      );
    } finally {
      setIsLoadingTraders(false);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await Promise.all([
      loadFeaturedMarkets(),
      loadTopTraders()
    ]);
    setIsRefreshing(false);
  };

  useEffect(() => {
    loadFeaturedMarkets();
    loadTopTraders()
  }, []);

  const handleViewAll = () => {
    router.push('/featured-markets');
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: isDark ? '#111827' : '#F9FAFB' }]}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={handleRefresh}
          tintColor={isDark ? Colors.white : Colors.primary}
        />
      }
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.welcomeContainer}>
          <Image 
            source={{ uri: getFullAvatarUrl(user?.avatar_url || '') }}
            style={styles.avatar}
          />
          <View>
            <Text style={[styles.welcomeText, { color: isDark ? '#9CA3AF' : '#6B7280' }]}>Welcome back,</Text>
            <Text style={[styles.userName, { color: isDark ? '#FFFFFF' : '#1F2937' }]}>{getFullName(user?.first_name || '', user?.last_name || '')}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => router.push('/settings')}>
          <Ionicons name="settings-outline" size={24} color={isDark ? '#9CA3AF' : '#6B7280'} />
        </TouchableOpacity>
      </View>

      {/* Stats Card */}
      <View style={[styles.statsCard, { backgroundColor: isDark ? '#7C3AED33' : '#F3F4F6' }]}>
        <FontAwesome5 name="fire" size={20} color="#FF6B00" />
        <Text style={[styles.statsText, { color: isDark ? '#FFFFFF' : '#1F2937' }]}>
          12,000 Pioneers trading today
        </Text>
        <MaterialIcons name="arrow-forward-ios" size={16} color={isDark ? '#9CA3AF' : '#6B7280'} />
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#8B5CF6' }]} onPress={() => router.push('/create-market')}>
          <Text style={styles.plusIcon}>+</Text>
          <Text style={styles.actionButtonText}>Create{'\n'}Market</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, { backgroundColor: isDark ? '#1F2937' : '#F3F4F6' }]} onPress={() => router.push('/referral')}>
          <FontAwesome5 name="share-alt" size={20} color={isDark ? '#FFFFFF' : '#1F2937'} />
          <Text style={[styles.actionButtonText, { color: isDark ? '#FFFFFF' : '#1F2937' }]}>Refer & Earn</Text>
        </TouchableOpacity>
      </View>

      {/* Featured Markets */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: isDark ? '#FFFFFF' : '#1F2937' }]}>
            Featured Markets
          </Text>
          <TouchableOpacity style={styles.viewAll} onPress={handleViewAll}>
            <Text style={[styles.viewAllText, { color: '#8B5CF6' }]}>View All</Text>
            <MaterialIcons name="chevron-right" size={20} color="#8B5CF6" />
          </TouchableOpacity>
        </View>
        
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={Colors.primary} />
          </View>
        ) : featuredMarkets.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: isDark ? Colors.white : Colors.text }]}>
              No featured markets available
            </Text>
          </View>
        ) : (
          <ScrollView 
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.marketCardsContainer}
          >
            {featuredMarkets.map((market) => (
              <FeaturedMarketItem key={market.id} market={market} />
            ))}
        
          </ScrollView>
        )}
      </View>

      {/* Top Traders */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: isDark ? '#FFFFFF' : '#1F2937' }]}>
            Top Traders This Week
          </Text>
          <TouchableOpacity style={styles.viewAll} onPress={() => router.push('/leaderboard')}>
            <Text style={[styles.viewAllText, { color: '#8B5CF6' }]}>Full Leaderboard</Text>
            <MaterialIcons name="chevron-right" size={20} color="#8B5CF6" />
          </TouchableOpacity>
        </View>

        {isLoadingTraders ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={Colors.primary} />
          </View>
        ) : topTraders.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: isDark ? Colors.white : Colors.text }]}>
              No traders available
            </Text>
          </View>
        ) : (
          topTraders.map((trader, index) => (
            <TraderItem
              key={trader.id}
              trader={trader}
              rank={index + 1}
            />
          ))
        )}
      </View>

      {/* Referral Banner */}
      <View style={[styles.referralBanner, { backgroundColor: isDark ? '#1F2937' : '#F3F4F6' }]}>
        <View style={styles.referralContent}>
          <View style={styles.referralIcon}>
            <FontAwesome5 name="gift" size={20} color="#8B5CF6" />
          </View>
          <Text style={[styles.referralTitle, { color: isDark ? '#FFFFFF' : '#1F2937' }]}>
            Earn 5% from referrals
          </Text>
          <Text style={[styles.referralDescription, { color: isDark ? '#9CA3AF' : '#6B7280' }]}>
            Invite your friends and earn 5% of their trading volume!
          </Text>
        </View>
        <TouchableOpacity style={styles.copyLinkButton}>
          <FontAwesome5 name="link" size={16} color="#FFFFFF" />
          <Text style={styles.copyLinkText}>Copy Referral Link</Text>
        </TouchableOpacity>
      </View>
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
  welcomeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  welcomeText: {
    fontSize: 14,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
  },
  statsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    margin: 16,
    padding: 12,
    borderRadius: 12,
  },
  statsText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    margin: 16,
  },
  actionButton: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    gap: 8,
  },
  plusIcon: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  section: {
    margin: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  viewAll: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '500',
  },
  marketCardsContainer: {
    paddingRight: 16,
  },
  marketCard: {
    padding: 16,
    borderRadius: 12,
    gap: 16,
    width: 300,
    marginRight: 12,
  },
  marketTimeLeft: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 8,
  },
  timeLeftText: {
    fontSize: 12,
    fontWeight: '500',
  },
  marketQuestion: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  marketStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  predictionStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  predictionText: {
    fontSize: 14,
    fontWeight: '600',
  },
  marketValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  viewMarketButton: {
    backgroundColor: '#8B5CF6',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  viewMarketText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  traderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  traderInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  traderRank: {
    fontSize: 16,
    fontWeight: '600',
    width: 24,
  },
  traderAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  traderName: {
    fontSize: 14,
    fontWeight: '500',
  },
  traderProfit: {
    fontSize: 14,
    fontWeight: '600',
  },
  referralBanner: {
    margin: 16,
    padding: 16,
    borderRadius: 12,
    marginBottom: 32,
  },
  referralContent: {
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  referralIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  referralTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  referralDescription: {
    fontSize: 14,
    textAlign: 'center',
  },
  copyLinkButton: {
    backgroundColor: '#8B5CF6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: 12,
    borderRadius: 8,
  },
  copyLinkText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  loadingContainer: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: 16,
    marginHorizontal: 16,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
  },
  featuredSection: {
    paddingVertical: 16,
  },
});
