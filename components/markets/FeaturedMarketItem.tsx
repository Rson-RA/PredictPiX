import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Link, router } from 'expo-router';
import { Market } from '@/types/models';
import { Colors } from '@/constants/Colors';
import { formatDistanceToNow } from 'date-fns';
import { useColorScheme } from '@/hooks/useColorScheme';
import { MaterialIcons } from '@expo/vector-icons';

interface FeaturedMarketItemProps {
  market: Market;
}

const FeaturedMarketItem: React.FC<FeaturedMarketItemProps> = ({ market }) => {
  const isDark = useColorScheme() === 'dark';
  
  // Calculate time remaining
  const getTimeRemaining = () => {
    try {
      return formatDistanceToNow(new Date(market.end_time), { addSuffix: true });
    } catch {
      return 'Ended';
    }
  };

  // Calculate prediction percentage
  const yesPercentage = Math.round((market.yes_pool / (market.yes_pool + market.no_pool || 1)) * 100);
  
  return (
    <TouchableOpacity style={[styles.marketCard, { backgroundColor: isDark ? '#1F2937' : '#F3F4F6' }]}>
      <View>
        <View style={styles.marketTimeLeft}>
          <Text style={[styles.timeLeftText, { color: '#8B5CF6' }]}>{getTimeRemaining()} left</Text>
        </View>
        <Text style={[styles.marketQuestion, { color: isDark ? '#FFFFFF' : '#1F2937' }]}>
          {market.title}
        </Text>
        <View style={styles.marketStats}>
          <View style={styles.predictionStats}>
            <MaterialIcons name="trending-up" size={16} color="#10B981" />
            <Text style={[styles.predictionText, { color: '#10B981' }]}>{yesPercentage}% Yes</Text>
          </View>
          <Text style={[styles.marketValue, { color: isDark ? '#9CA3AF' : '#6B7280' }]}>π {market.total_pool.toLocaleString()}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.viewMarketButton} onPress={() => router.push(`/market/${market.id}`)}>
        <Text style={styles.viewMarketText}>View Market</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
});

export default FeaturedMarketItem; 