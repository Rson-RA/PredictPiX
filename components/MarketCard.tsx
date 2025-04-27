import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import BuyPosition from './BuyPosition';
import { renderTimeRemaining } from '../utils';
import { Market } from '../types/models';

interface MarketCardProps {
  market: Market;
  onBuyYes: (market: Market) => void;
  onBuyNo: (market: Market) => void;
}

export default function MarketCard({
  market,
  onBuyYes,
  onBuyNo,
}: MarketCardProps) {

  return (
    <View style={styles.marketCard}>
      <View style={styles.marketHeader}>
        <Text style={styles.marketTitle}>{market.title}</Text>
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{renderTimeRemaining(market.end_time)}</Text>
          <Text style={styles.timeLabel}></Text>
        </View>
      </View>

      <View style={styles.marketInfo}>
        <View style={styles.predictionInfo}>
          <Text style={styles.percentage}>{market.yes_pool / market.total_pool} %</Text>
          <Text style={styles.predictionText}>Yes</Text>
        </View>
        <Text style={styles.volume}>{market.total_pool}</Text>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.buyYesButton]} 
          onPress={() => onBuyYes(market)}
        >
          <Text style={styles.buttonText}>Buy Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.actionButton, styles.buyNoButton]} 
          onPress={() => onBuyNo(market)}
        >
          <Text style={styles.buttonText}>Buy No</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  marketCard: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  marketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  marketTitle: {
    fontSize: 16,
    color: '#FFFFFF',
    flex: 1,
    marginRight: 12,
  },
  timeContainer: {
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    borderRadius: 12,
    padding: 8,
    alignItems: 'center',
  },
  timeText: {
    fontSize: 14,
    color: '#8B5CF6',
    fontWeight: '500',
  },
  timeLabel: {
    fontSize: 12,
    color: '#8B5CF6',
  },
  marketInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  predictionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  percentage: {
    fontSize: 16,
    color: '#10B981',
    fontWeight: '600',
  },
  predictionText: {
    fontSize: 16,
    color: '#9CA3AF',
  },
  volume: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: 'center',
  },
  buyYesButton: {
    backgroundColor: '#10B981',
  },
  buyNoButton: {
    backgroundColor: '#EF4444',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
}); 