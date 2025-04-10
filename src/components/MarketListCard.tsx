import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import BuyYesPositionDialog from './BuyYesPositionDialog';
import BuyNoPositionDialog from './BuyNoPositionDialog';
import Card from './Card';

interface MarketListCardProps {
  title: string;
  timeLeft: string;
  percentage: number;
  traders: number;
  value: string;
  onPress: () => void;
  onBuyPosition?: (position: 'Yes' | 'No', amount: string) => void;
}

const MarketListCard: React.FC<MarketListCardProps> = ({
  title,
  timeLeft,
  percentage,
  traders,
  value,
  onPress,
  onBuyPosition,
}) => {
  const [buyYesDialogVisible, setBuyYesDialogVisible] = useState(false);
  const [buyNoDialogVisible, setBuyNoDialogVisible] = useState(false);

  const handleBuyYes = () => {
    setBuyYesDialogVisible(true);
  };

  const handleBuyNo = () => {
    setBuyNoDialogVisible(true);
  };

  const handleConfirmBuyYes = (amount: string) => {
    if (onBuyPosition) {
      onBuyPosition('Yes', amount);
    }
    setBuyYesDialogVisible(false);
  };

  const handleConfirmBuyNo = (amount: string) => {
    if (onBuyPosition) {
      onBuyPosition('No', amount);
    }
    setBuyNoDialogVisible(false);
  };

  return (
    <>
      <Card style={styles.container}>
        <TouchableOpacity onPress={onPress}>
          <View style={styles.timeLeftBadge}>
            <Text style={styles.timeLeftText}>{timeLeft} left</Text>
          </View>
          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>
          <View style={styles.footer}>
            <View style={styles.stats}>
              <Text style={[
                styles.percentage,
                { color: percentage >= 50 ? '#4ADE80' : '#EF4444' }
              ]}>
                {percentage}% Yes
              </Text>
              <View style={styles.tradersContainer}>
                <Icon name="people" size={16} color="#9CA3AF" />
                <Text style={styles.tradersText}>{traders}k</Text>
              </View>
            </View>
            <Text style={styles.value}>${value}</Text>
          </View>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity 
              style={[styles.button, styles.buyYesButton]} 
              onPress={handleBuyYes}
            >
              <Text style={styles.buttonText}>Buy Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, styles.buyNoButton]} 
              onPress={handleBuyNo}
            >
              <Text style={styles.buttonText}>Buy No</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Card>

      <BuyYesPositionDialog
        isVisible={buyYesDialogVisible}
        onClose={() => setBuyYesDialogVisible(false)}
        onConfirm={handleConfirmBuyYes}
        probability={percentage}
        position="Yes"
        marketQuestion={title}
      />

      <BuyNoPositionDialog
        isVisible={buyNoDialogVisible}
        onClose={() => setBuyNoDialogVisible(false)}
        onConfirm={handleConfirmBuyNo}
        probability={100 - percentage}
        marketQuestion={title}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
    padding: 0,
  },
  timeLeftBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#374151',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  timeLeftText: {
    color: '#D1D5DB',
    fontSize: 13,
    fontWeight: '500',
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
    marginRight: 80,
    lineHeight: 24,
    padding: 16,
    paddingBottom: 0,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    padding: 16,
    paddingTop: 0,
    paddingBottom: 0,
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  percentage: {
    fontSize: 18,
    fontWeight: '600',
    marginRight: 16,
  },
  tradersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(55, 65, 81, 0.3)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tradersText: {
    color: '#D1D5DB',
    fontSize: 14,
    marginLeft: 4,
    fontWeight: '500',
  },
  value: {
    color: '#8B5CF6',
    fontSize: 18,
    fontWeight: '600',
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 12,
    padding: 16,
    paddingTop: 0,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buyYesButton: {
    backgroundColor: '#4ADE80',
  },
  buyNoButton: {
    backgroundColor: '#EF4444',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default MarketListCard; 