import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import usersApi, { Trader } from '@/api/users';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { getFullAvatarUrl } from '@/utils';

const filterOptions = ['Profit', 'Volume', 'Trades'];

export default function LeaderboardScreen() {
  const [selectedFilter, setSelectedFilter] = useState('Profit');
  const [leaderboardData, setLeaderboardData] = useState<Trader[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const {user} = useAuth();
  const isDark = useColorScheme() === 'dark';

  useEffect(() => {
    fetchUsers();
  }, [selectedFilter]);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await usersApi.searchTraders(selectedFilter);
      console.log(response)
      setLeaderboardData(response);
    } catch (err) {
      setError('Failed to load markets. Please try again.');
      console.error('Error fetching markets:', err);
    } finally {
      setIsLoading(false);
    }
  };
  

  const renderTopThree = () => {
    const topThree = leaderboardData.slice(0, 3);
    const [first, second, third] = topThree;

    return (
      <View style={styles.topThreeContainer}>
        {/* Second Place */}
        <View style={[styles.topThreeItem, styles.secondPlace]}>
          <View style={styles.avatarContainer}>
            <Image source={{uri: getFullAvatarUrl(second?.avatar_url)}} style={styles.avatar} />
            <View style={styles.rankBadge}>
              <Text style={styles.rankText}>2</Text>
            </View>
          </View>
          <Text style={styles.username}>{second.username}</Text>
          <Text style={styles.profit}>{second.total_profit}</Text>
        </View>

        {/* First Place */}
        <View style={[styles.topThreeItem, styles.firstPlace]}>
          <View style={[styles.avatarContainer, styles.firstPlaceAvatar]}>
            <Image source={{ uri: getFullAvatarUrl(first?.avatar_url) }} style={styles.avatar} />
            <View style={[styles.rankBadge, styles.firstPlaceBadge]}>
              <Text style={styles.rankText}>1</Text>
            </View>
          </View>
          <Text style={styles.username}>{first.username}</Text>
          <Text style={styles.profit}>{first.total_profit}</Text>
        </View>

        {/* Third Place */}
        <View style={[styles.topThreeItem, styles.thirdPlace]}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: getFullAvatarUrl(third?.avatar_url)}} style={styles.avatar} />
            <View style={styles.rankBadge}>
              <Text style={styles.rankText}>3</Text>
            </View>
          </View>
          <Text style={styles.username}>{third?.username}</Text>
          <Text style={styles.profit}>{third?.total_profit}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Leaderboard</Text>
        <TouchableOpacity>
          <Ionicons name="settings-outline" size={24} color="#9CA3AF" />
        </TouchableOpacity>
      </View>

      {/* Filters */}
      <View style={styles.filters}>
        {filterOptions.map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterButton,
              selectedFilter === filter && styles.filterButtonActive,
            ]}
            onPress={() => setSelectedFilter(filter)}
          >
            <Text
              style={[
                styles.filterText,
                selectedFilter === filter && styles.filterTextActive,
              ]}
            >
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      ) : leaderboardData.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyText, { color: isDark ? Colors.white : Colors.text }]}>
            No featured markets available
          </Text>
        </View>
      ) : (
        <ScrollView style={styles.content}>
          {/* Top 3 */}
          {renderTopThree()}

          {/* Rest of the leaderboard */}
          <View style={styles.listContainer}>
            {leaderboardData.slice(3).map((user) => (
              <View key={user.id} style={styles.listItem}>
                <View style={styles.rankContainer}>
                  <Text style={styles.rankNumber}>{user.rank}</Text>
                </View>
                <Image source={{ uri: user.avatar_url || "" }} style={styles.listAvatar} />
                <Text style={styles.listUsername}>{user.username}</Text>
                <Text style={styles.listProfit}>{user.total_profit}</Text>
              </View>
            ))}
          </View>

          {/* Current User Rank */}
          {/*<View style={styles.currentUserContainer}>
            <View style={styles.listItem}>
              <View style={[styles.rankContainer, styles.currentUserRank]}>
                <Text style={styles.rankNumber}>{"no"}</Text>
              </View>
              <Image source={{ uri: user?.avatar_url || "" }} style={styles.listAvatar} />
              <Text style={styles.listUsername}>{user?.username}</Text>
              <Text style={styles.listProfit}>${user?.total_profit || 0}</Text>
            </View>
          </View>*/}
        </ScrollView>
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
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  filters: {
    flexDirection: 'row',
    padding: 16,
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#1F2937',
  },
  filterButtonActive: {
    backgroundColor: '#8B5CF6',
  },
  filterText: {
    color: '#9CA3AF',
    fontSize: 14,
    fontWeight: '500',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  topThreeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingBottom: 24,
    gap: 12,
  },
  topThreeItem: {
    alignItems: 'center',
    flex: 1,
    marginTop: 10,
  },
  firstPlace: {
    marginTop: -20,
  },
  secondPlace: {
    marginBottom: 0,
  },
  thirdPlace: {
    marginBottom: 0,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 8,
  },
  firstPlaceAvatar: {
    borderWidth: 2,
    borderColor: '#FFD700',
    borderRadius: 40,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#374151',
  },
  rankBadge: {
    position: 'absolute',
    bottom: -10,
    right: 20,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#374151',
    justifyContent: 'center',
    alignItems: 'center',
  },
  firstPlaceBadge: {
    backgroundColor: '#FFD700',
  },
  rankText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  username: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  profit: {
    color: '#10B981',
    fontSize: 14,
    fontWeight: '600',
  },
  listContainer: {
    paddingHorizontal: 16,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 12,
  },
  rankContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#1F2937',
    justifyContent: 'center',
    alignItems: 'center',
  },
  currentUserRank: {
    backgroundColor: '#8B5CF6',
  },
  rankNumber: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  listAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#374151',
  },
  listUsername: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  listProfit: {
    color: '#10B981',
    fontSize: 14,
    fontWeight: '600',
  },
  currentUserContainer: {
    margin: 16,
    padding: 10,
    backgroundColor: '#1F2937',
    borderRadius: 12,
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
}); 