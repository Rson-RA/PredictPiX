import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';
import { Link, useRouter } from 'expo-router';
import MarketCard from '../components/MarketCard';

export default function FeaturedMarketsScreen(): JSX.Element {
  const router = useRouter();

  const handleBuyYes = (amount: number) => {
    console.log('Buy Yes action triggered with amount:', amount);
    // TODO: Implement buy yes logic
  };

  const handleBuyNo = (amount: number) => {
    console.log('Buy No action triggered with amount:', amount);
    // TODO: Implement buy no logic
  };

  const handleHome = () => {
    router.push('/');
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.marketsContainer}>
          <MarketCard
            title="Will Bitcoin reach $100,000 by the end of 2024?"
            timeLeft="2d 5h"
            percentage="75%"
            volume="$50,234"
            onBuyYes={handleBuyYes}
            onBuyNo={handleBuyNo}
          />
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity 
          style={styles.homeButton}
          onPress={handleHome}
        >
          <Text style={styles.homeButtonText}>Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  scrollView: {
    flex: 1,
  },
  marketsContainer: {
    padding: 16,
    paddingBottom: 80,
  },
  bottomContainer: {
    padding: 16,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#111827', 
  },
  homeButton: {
    backgroundColor: '#10B981',
    padding: 12,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
