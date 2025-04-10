import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import {spacing} from '../styles/theme';

interface PredictionCardProps {
  category: string;
  title: string;
  timeFrame: string;
  yesPercentage: string;
  noPercentage: string;
  data: number[];
}

export const PredictionCard: React.FC<PredictionCardProps> = ({
  category,
  title,
  timeFrame,
  yesPercentage,
  noPercentage,
  data,
}) => {
  const width = Dimensions.get('window').width - spacing.lg * 3;
  return (
    <View style={styles.predictionCard}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardCategory}>{category}</Text>
        <Text style={styles.timeFrame}>{timeFrame}</Text>
      </View>
      <Text style={styles.cardTitle}>{title}</Text>
      <View style={styles.chartContainer}>
        <LineChart
          data={{
            labels: [],
            datasets: [{ data }],
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
      <View style={styles.predictionButtons}>
        <TouchableOpacity style={[styles.predictionButton, styles.yesButton]}>
          <Text style={styles.buttonText}>Yes ({yesPercentage})</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.predictionButton, styles.noButton]}>
          <Text style={styles.buttonText}>No ({noPercentage})</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  predictionCard: {
    backgroundColor: '#1A1A23',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardCategory: {
    color: '#7B61FF',
    fontSize: 14,
  },
  timeFrame: {
    color: '#666',
    fontSize: 14,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  chartContainer: {
    marginBottom: 16,
  },
  chart: {
    borderRadius: 16,
  },
  predictionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  predictionButton: {
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
    color: '#fff',
    fontSize: 16,
  },
}); 