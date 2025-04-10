import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import type { RootTabScreenProps } from '../navigation/types';
import MarketListCard from '../components/MarketListCard';

const categories = ['All Markets', 'Crypto', 'Politics', 'Sports'];

const MarketsScreen: React.FC<RootTabScreenProps<'Markets'>> = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState('All Markets');

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const handleCreateMarket = () => {
    navigation.navigate('ChooseMarket');
  };

  const handleMarketPress = () => {
    // Navigate to market details
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <MaterialCommunityIcons name="chart-bar" size={24} color="#A78BFA" />
          <Text style={styles.title}>Markets</Text>
        </View>
        <TouchableOpacity style={styles.createButton} onPress={handleCreateMarket}>
          <Icon name="add" size={20} color="#fff" />
          <Text style={styles.createButtonText}>Create Market</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.categoriesSection}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.categoryButtonActive,
              ]}
              onPress={() => setSelectedCategory(category)}>
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category && styles.categoryTextActive,
                ]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={styles.container}>
        <MarketListCard
          title="Will Bitcoin reach $100k by end of 2025?"
          timeLeft="2d 14h"
          percentage={75}
          traders={2.4}
          value="847,392"
          onPress={handleMarketPress}
        />
        <MarketListCard
          title="Will AI surpass human intelligence in 2025?"
          timeLeft="5d 8h"
          percentage={32}
          traders={1.8}
          value="523,156"
          onPress={handleMarketPress}
        />
        <MarketListCard
          title="Will SpaceX launch Starship successfully?"
          timeLeft="12d"
          percentage={89}
          traders={3.2}
          value="651,847"
          onPress={handleMarketPress}
        />
        <MarketListCard
          title="Will Democrats win 2025 election?"
          timeLeft="45d"
          percentage={52}
          traders={5.6}
          value="924,931"
          onPress={handleMarketPress}
        />
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8B5CF6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  createButtonText: {
    color: '#fff',
    marginLeft: 4,
    fontSize: 14,
    fontWeight: '500',
  },
  categoriesSection: {
    height: 48,
    marginBottom: 16,
    marginTop: 8,
  },
  categoriesContainer: {
    paddingHorizontal: 16,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    marginRight: 12,
    backgroundColor: '#1F2937',
    borderWidth: 1,
    borderColor: '#2A2B35',
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryButtonActive: {
    backgroundColor: '#8B5CF6',
    borderColor: '#8B5CF6',
  },
  categoryText: {
    color: '#9CA3AF',
    fontSize: 15,
    fontWeight: '600',
  },
  categoryTextActive: {
    color: '#fff',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
});

export default MarketsScreen; 