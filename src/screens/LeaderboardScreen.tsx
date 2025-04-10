import React, { useState, useLayoutEffect } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, Text, TouchableOpacity, Dimensions } from 'react-native';
import type { RootTabScreenProps } from '../navigation/types';
import LeaderboardItem from '../components/LeaderboardItem';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// @ts-ignore
import avatarImage from '../assets/images/avatar.png';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const MOCK_DATA = [
  {
    id: '1',
    rank: 1,
    name: 'Alex Thompson',
    username: '@alex_t',
    volume: 2400000,
    profit: 847000,
    trades: 1200,
    avatar: avatarImage,
  },
  {
    id: '2',
    rank: 2,
    name: 'Sarah Chen',
    username: '@sarah_c',
    volume: 1800000,
    profit: 523000,
    trades: 956,
    avatar: avatarImage,
  },
  {
    id: '3',
    rank: 3,
    name: 'Mike Wilson',
    username: '@mike_w',
    volume: 1200000,
    profit: 412000,
    trades: 784,
    avatar: avatarImage,
  },
];

interface FilterButtonProps {
  label: string;
  isSelected: boolean;
  onPress: () => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({ label, isSelected, onPress }) => (
  <TouchableOpacity
    style={[styles.filterButton, isSelected && styles.filterButtonSelected]}
    onPress={onPress}
  >
    <Text style={[styles.filterButtonText, isSelected && styles.filterButtonTextSelected]}>
      {label}
    </Text>
  </TouchableOpacity>
);

const LeaderboardScreen: React.FC<RootTabScreenProps<'Leaderboard'>> = ({ navigation }) => {
  const [selectedTimeFilter, setSelectedTimeFilter] = useState('Daily');
  const [selectedView, setSelectedView] = useState('List');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const timeFilters = ['Daily', 'Weekly', 'Monthly', 'All Time'];
  const viewTypes = ['List View', 'Rank View'];

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <Icon name="trophy" size={24} color="#A78BFA" />
        <Text style={styles.headerTitle}>Leaderboard</Text>
      </View>      
      <View style={styles.filterSection}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersContainer}
        >
          {timeFilters.map((filter) => (
            <FilterButton
              key={filter}
              label={filter}
              isSelected={selectedTimeFilter === filter}
              onPress={() => setSelectedTimeFilter(filter)}
            />
          ))}
        </ScrollView>
      </View>

      <View style={styles.viewToggleContainer}>
        <View style={styles.viewToggleWrapper}>
          {viewTypes.map((view, index) => (
            <TouchableOpacity
              key={view}
              style={[
                styles.viewToggleButton,
                selectedView === view.split(' ')[0] && styles.viewToggleButtonSelected,
                index === 0 && styles.viewToggleButtonLeft,
                index === viewTypes.length - 1 && styles.viewToggleButtonRight,
              ]}
              onPress={() => setSelectedView(view.split(' ')[0])}
            >
              <Text
                style={[
                  styles.viewToggleText,
                  selectedView === view.split(' ')[0] && styles.viewToggleTextSelected,
                ]}
              >
                {view}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ScrollView style={styles.listContainer}>
        {MOCK_DATA.map(item => (
          <LeaderboardItem
            key={item.id}
            rank={item.rank}
            name={item.name}
            username={item.username}
            volume={item.volume}
            profit={item.profit}
            trades={item.trades}
            avatar={item.avatar}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#111827',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  filterSection: {
    height: 48,
    justifyContent: 'center',
    marginTop: 8,
  },
  filtersContainer: {
    paddingHorizontal: 16,
    gap: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterButton: {
    paddingHorizontal: 16,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#1F2937',
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterButtonSelected: {
    backgroundColor: '#8B5CF6',
  },
  filterButtonText: {
    color: '#8E8E93',
    fontSize: 14,
    fontWeight: '500',
  },
  filterButtonTextSelected: {
    color: '#FFFFFF',
  },
  viewToggleContainer: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  viewToggleWrapper: {
    width: SCREEN_WIDTH * 0.7,
    flexDirection: 'row',
    backgroundColor: '#1F2937',
    borderRadius: 18,
    overflow: 'hidden',
  },
  viewToggleButton: {
    flex: 1,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  viewToggleButtonSelected: {
    backgroundColor: '#8B5CF6',
  },
  viewToggleButtonLeft: {
    // borderTopLeftRadius: 18,
    // borderBottomLeftRadius: 18,
    borderRadius: 18,
  },
  viewToggleButtonRight: {
    // borderTopRightRadius: 18,
    // borderBottomRightRadius: 18,
    borderRadius: 18,
  },
  viewToggleText: {
    color: '#8E8E93',
    fontSize: 14,
    fontWeight: '500',
  },
  viewToggleTextSelected: {
    color: '#FFFFFF',
  },
  listContainer: {
    flex: 1,
  },
});

export default LeaderboardScreen; 