import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Card from './Card';

interface FeaturedMarketCardProps {
  title: string;
  timeLeft: string;
  percentage: number;
  value: string;
  onPress: () => void;
}

const FeaturedMarketCard: React.FC<FeaturedMarketCardProps> = ({
  title,
  timeLeft,
  percentage,
  value,
  onPress,
}) => {
  return (
    <Card style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.header}>
          <Text style={styles.timeLeft}>{timeLeft} left</Text>
        </View>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        <View style={styles.footer}>
          <View style={styles.percentageContainer}>
            <Icon
              name={percentage >= 0 ? 'trending-up' : 'trending-down'}
              size={16}
              color={percentage >= 0 ? '#4ADE80' : '#EF4444'}
              style={styles.trendIcon}
            />
            <Text
              style={[
                styles.percentage,
                { color: percentage >= 0 ? '#4ADE80' : '#EF4444' },
              ]}
            >
              {Math.abs(percentage)}% {percentage >= 0 ? 'Yes' : 'No'}
            </Text>
          </View>
          <Text style={styles.value}>${value}</Text>
        </View>
        <TouchableOpacity style={styles.viewButton} onPress={onPress}>
          <Text style={styles.viewButtonText}>View Market</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width * 0.75,
    marginRight: 12,
    padding: 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 8,
    padding: 16,
    paddingBottom: 0,
  },
  timeLeft: {
    color: '#8B5CF6',
    fontSize: 12,
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    lineHeight: 24,
    padding: 16,
    paddingTop: 8,
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
  percentageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trendIcon: {
    marginRight: 4,
  },
  percentage: {
    fontSize: 16,
    fontWeight: '600',
  },
  value: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  viewButton: {
    backgroundColor: '#8B5CF6',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 16,
  },
  viewButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default FeaturedMarketCard; 