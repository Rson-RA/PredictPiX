import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import marketsApi from '@/api/markets';
import { Market } from '@/types/models';
import { useAuth } from '@/context/AuthContext';
import { getTimeRemaining, renderTimeRemaining } from '@/utils';
const categories = ['All Markets', 'trending', 'newly created', 'soon-to-resolve'] as const;

export default function MarketsScreen() {
  const [selectedCategory, setSelectedCategory] = useState<typeof categories[number]>('All Markets');
  const [markets, setMarkets] = useState<Market[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const {user} = useAuth();

  useEffect(() => {
    fetchMarkets();
  }, [selectedCategory]);

  const fetchMarkets = async (isRefresh = false) => {
    try {
      if (!isRefresh) {
        setIsLoading(true);
      }
      setError(null);
      const filters = selectedCategory !== 'All Markets' ? 
      { category: selectedCategory.toLowerCase(), status: 'active' as Market['status'] } : 
      { status: 'active' as Market['status'] };
      const response = await marketsApi.getMarkets(filters);
      setMarkets(response);
    } catch (err) {
      setError('Failed to load markets. Please try again.');
      console.error('Error fetching markets:', err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchMarkets(true);
  };

  const handleCreateMarket = () => {
    router.push('/create-market' as const);
  };

  const handleMarketPress = (marketId: number) => {
    router.push({
      pathname: '/market/[id]' as const,
      params: { id: marketId }
    });
  };

  const renderMarketCard = ({ item }: { item: Market }) => (
    <TouchableOpacity 
      style={styles.marketCard}
      onPress={() => handleMarketPress(item.id)}
    >
      <View style={styles.marketContent}>
        <View style={styles.marketHeader}>
          <Text style={styles.marketQuestion}>{item.title}</Text>
          <View style={styles.timeLeft}>
            <Text style={[
              styles.timeLeftText,
              !getTimeRemaining(item.end_time) && styles.timeEndedText
            ]}>
              {renderTimeRemaining(item.end_time)}
            </Text>
          </View>
        </View>
        <View style={styles.marketStats}>
          <View style={styles.predictionStats}>
            {/*<Text style={[
              styles.predictionText,
              { color: item.yes_pool > item.no_pool ? '#10B981' : '#EF4444' }
            ]}>
              {Math.round((item.yes_pool / (item.yes_pool + item.no_pool || 1)) * 100)}
              {item.yes_pool}
            </Text> */}
            <View style={styles.participantsContainer}>
              <FontAwesome5 name="user-friends" size={12} color="#6B7280" />
              <Text style={styles.participantsText}>
                {item.total_predictions || 0}
              </Text>
            </View>
          </View>
          <Text style={styles.valueText}>π {item.total_pool.toLocaleString()}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Markets</Text>
        <View style={styles.headerButtons}>
          { !user ? (<TouchableOpacity style={styles.signInButton}>
            <Text style={styles.signInText}>Sign In</Text>
          </TouchableOpacity>) : (<> </>) }
          <TouchableOpacity 
            style={styles.createButton}
            onPress={handleCreateMarket}
          >
            <Text style={styles.createButtonText}>+ Create Market</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Categories */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
        contentContainerStyle={styles.categoriesContent}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.categoryButtonActive
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text style={[
              styles.categoryText,
              selectedCategory === category && styles.categoryTextActive
            ]}>{category}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Market List */}
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#8B5CF6" />
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={fetchMarkets}
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={markets}
          renderItem={renderMarketCard}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.marketList}
          showsVerticalScrollIndicator={false}
          refreshing={isRefreshing}
          onRefresh={handleRefresh}
        />
      )}
    </View>
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
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  headerButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  signInButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  signInText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  createButton: {
    backgroundColor: '#8B5CF6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  createButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  categoriesContainer: {
    height: 40,
    marginTop: 10,
    marginBottom: 10,
    flexGrow: 0,
  },
  categoriesContent: {
    paddingHorizontal: 16,
    gap: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#1F2937',
    marginRight: 8,
  },
  categoryButtonActive: {
    backgroundColor: '#8B5CF6',
  },
  categoryText: {
    color: '#9CA3AF',
    fontSize: 14,
    fontWeight: '500',
  },
  categoryTextActive: {
    color: '#FFFFFF',
  },
  marketList: {
    padding: 16,
    gap: 12,
  },
  marketCard: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    marginBottom: 12,
  },
  marketContent: {
    padding: 16,
  },
  marketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  marketQuestion: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    flex: 1,
    marginRight: 12,
  },
  timeLeft: {
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  timeLeftText: {
    color: '#8B5CF6',
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
  marketStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  predictionStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  predictionText: {
    fontSize: 14,
    fontWeight: '600',
  },
  participantsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  participantsText: {
    color: '#9CA3AF',
    fontSize: 12,
    marginLeft: 4,
  },
  valueText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  errorText: {
    color: '#EF4444',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#8B5CF6',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  timeEndedText: {
    color: '#EF4444', // Red color for ended markets
  },
}); 