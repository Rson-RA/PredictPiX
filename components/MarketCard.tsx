import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import BuyPosition from './BuyPosition';

interface MarketCardProps {
  title: string;
  timeLeft: string;
  percentage: string;
  volume: string;
  onBuyYes: (amount: number) => void;
  onBuyNo: (amount: number) => void;
}

export default function MarketCard({
  title,
  timeLeft,
  percentage,
  volume,
  onBuyYes,
  onBuyNo,
}: MarketCardProps) {
  const [showBuyDialog, setShowBuyDialog] = useState(false);
  const [isYesPosition, setIsYesPosition] = useState(true);

  const handleBuyYes = () => {
    setIsYesPosition(true);
    setShowBuyDialog(true);
  };

  const handleBuyNo = () => {
    setIsYesPosition(false);
    setShowBuyDialog(true);
  };

  const handleConfirm = (amount: number) => {
    if (isYesPosition) {
      onBuyYes(amount);
    } else {
      onBuyNo(amount);
    }
    setShowBuyDialog(false);
  };

  return (
    <View style={styles.marketCard}>
      <View style={styles.marketHeader}>
        <Text style={styles.marketTitle}>{title}</Text>
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{timeLeft}</Text>
          <Text style={styles.timeLabel}>left</Text>
        </View>
      </View>

      <View style={styles.marketInfo}>
        <View style={styles.predictionInfo}>
          <Text style={styles.percentage}>{percentage}</Text>
          <Text style={styles.predictionText}>Yes</Text>
        </View>
        <Text style={styles.volume}>{volume}</Text>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.buyYesButton]} 
          onPress={handleBuyYes}
        >
          <Text style={styles.buttonText}>Buy Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.actionButton, styles.buyNoButton]} 
          onPress={handleBuyNo}
        >
          <Text style={styles.buttonText}>Buy No</Text>
        </TouchableOpacity>
      </View>

      <BuyPosition
        visible={showBuyDialog}
        onClose={() => setShowBuyDialog(false)}
        onConfirm={handleConfirm}
        currentProbability={percentage}
        isYesPosition={isYesPosition}
        marketQuestion={title}
      />
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