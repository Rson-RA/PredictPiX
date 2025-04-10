import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import {spacing} from '../styles/theme';

interface MarketCardProps {
  category: string;
  title: string;
  volume: string;
  timeFrame: string;
  percentage: number;
  price: string;
  chartData: number[];
  totalTrades: number;
  yesPrice: string;
  noPrice: string;
  onPress?: () => void;
}

const MarketCard: React.FC<MarketCardProps> = ({
  category,
  title,
  volume,
  timeFrame,
  percentage,
  price,
  chartData,
  totalTrades,
  yesPrice,
  noPrice,
  onPress,
}) => {

  const width = Dimensions.get('window').width - spacing.lg * 3;

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.category}>{category}</Text>
        <View style={styles.volumeContainer}>
          <Text style={styles.volumeText}>Volume: ${volume}</Text>
          <Text style={styles.timeFrame}>{timeFrame}</Text>
        </View>
      </View>
      
      <Text style={styles.title}>{title}</Text>
      
      <View style={styles.priceContainer}>
        <Text style={[
          styles.percentage,
          { color: percentage >= 0 ? '#4CAF50' : '#F44336' }
        ]}>
          {percentage >= 0 ? '+' : ''}{percentage}%
        </Text>
        <Text style={styles.price}>{price}¢</Text>
      </View>

      <View style={styles.chartContainer}>
        <LineChart
          data={{
            labels: [],
            datasets: [{
              data: chartData
            }]
          }}
          width={width}
          height={100}
          chartConfig={{
            backgroundColor: 'transparent',
            backgroundGradientFrom: 'transparent',
            backgroundGradientTo: 'transparent',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(123, 97, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          bezier
          style={styles.chart}
          withDots={false}
          withVerticalLines={false}
          withHorizontalLines={false}
        />
      </View>

      <View style={styles.footer}>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={[styles.button, styles.yesButton]}>
            <Text style={styles.buttonText}>Yes ({yesPrice}¢)</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.noButton]}>
            <Text style={styles.buttonText}>No ({noPrice}¢)</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.trades}>Total Trades: {totalTrades}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1A1A23',
    borderRadius: 16,
    padding: 16,
    marginVertical: 6,
    marginHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  category: {
    color: '#7B61FF',
    fontSize: 14,
    fontWeight: '600',
  },
  volumeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  volumeText: {
    color: '#8F9BB3',
    fontSize: 13,
  },
  timeFrame: {
    color: '#8F9BB3',
    backgroundColor: '#2E3447',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 13,
    overflow: 'hidden',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    lineHeight: 22,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  percentage: {
    fontSize: 15,
    fontWeight: '600',
  },
  price: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '500',
  },
  chartContainer: {
    marginBottom: 16,
  },
  chart: {
    borderRadius: 16,
  },
  footer: {
    marginTop: 12,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    gap: 8,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  yesButton: {
    backgroundColor: '#1C3B2B',
  },
  noButton: {
    backgroundColor: '#3B1C1C',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  trades: {
    color: '#8F9BB3',
    fontSize: 13,
    textAlign: 'center',
  },
});

export type { MarketCardProps };
export default MarketCard; 