import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import { colors, typography, spacing } from '../styles/theme';
import { commonStyles } from '../styles/common';
import { LineChart } from 'react-native-chart-kit';

const TIME_PERIODS = ['1D', '1W', '1M', 'ALL'];
const screenWidth = Dimensions.get('window').width;

type Props = NativeStackScreenProps<RootStackParamList, 'MarketDetail'>;

const MarketDetailScreen: React.FC<Props> = ({ route }) => {
  const navigation = useNavigation();
  const [selectedPeriod, setSelectedPeriod] = useState('1W');
  const market = route.params.market;

  return (
    <SafeAreaView style={commonStyles.screen}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <Icon name="arrow-left" size={24} color={colors.text.primary} />
            </TouchableOpacity>
            <Text style={styles.category}>{market.category}</Text>
          </View>
          <TouchableOpacity style={styles.shareButton}>
            <Icon name="share-variant" size={24} color={colors.text.primary} />
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>{market.title}</Text>

        <View style={styles.divider} />

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Current Price</Text>
            <Text style={styles.statValue}>{market.currentPrice}¢</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>24h Volume</Text>
            <Text style={styles.statValue}>${market.volume}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Total Trades</Text>
            <Text style={styles.statValue}>{market.totalTrades}</Text>
          </View>
        </View>

        <View style={styles.timeRemainingContainer}>
          <View style={styles.timeRemainingHeader}>
            <Text style={styles.timeRemainingLabel}>Time Remaining</Text>
            <Text style={styles.timeRemainingValue}>{market.timeRemaining}</Text>
          </View>
          <View style={styles.timeRemainingBar}>
            <View style={styles.timeRemainingProgress} />
          </View>
        </View>

        <View style={styles.chartSection}>
          <View style={styles.chartSectionHeader}>
            <Text style={styles.sectionTitle}>Price History</Text>
            <View style={styles.periodSelector}>
              {TIME_PERIODS.map(period => (
                <TouchableOpacity
                  key={period}
                  style={[
                    styles.periodButton,
                    selectedPeriod === period && styles.periodButtonActive,
                  ]}
                  onPress={() => setSelectedPeriod(period)}
                >
                  <Text
                    style={[
                      styles.periodButtonText,
                      selectedPeriod === period && styles.periodButtonTextActive,
                    ]}
                  >
                    {period}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View style={styles.chartContainer}>
            <LineChart
              data={{
                labels: [],
                datasets: [{
                  data: market.chartData
                }]
              }}
              width={screenWidth - 32}
              height={300}
              chartConfig={{
                backgroundColor: '#050507',
                backgroundGradientFrom: '#050507',
                backgroundGradientTo: '#050507',
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(130, 71, 229, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: '0',
                },
                propsForBackgroundLines: {
                  stroke: '#141722',
                  strokeDasharray: [],
                  strokeWidth: 1,
                },
              }}
              bezier
              style={styles.chart}
              withDots={false}
              withVerticalLines={false}
              withHorizontalLines={false}
            />
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.actionButton, styles.buyYesButton]}
            onPress={() => {}}
          >
            <Text style={styles.actionButtonText}>Buy Yes ({market.yesPrice}¢)</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.buyNoButton]}
            onPress={() => {}}
          >
            <Text style={styles.actionButtonText}>Buy No ({market.noPrice}¢)</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.divider} />

        <View style={styles.positionsSection}>
          <Text style={styles.sectionTitle}>Your Positions</Text>
          <View style={styles.positionCard}>
            <View style={styles.positionRow}>
              <View style={styles.pricePosition}>
                <Text style={styles.positionLabelYes}>Yes Position</Text>
                <Text style={styles.positionShares}>100 shares</Text>
              </View>
              <View style={styles.priceAvg}>
                <Text style={styles.priceLabel}>Avg. Price</Text>
                <Text style={styles.positionPrice}>${market.yesPrice}</Text>
              </View>
            </View>
          </View>
          <View style={styles.positionCard}>
            <View style={styles.positionRow}>
              <View style={styles.pricePosition}>
                <Text style={styles.positionLabelNo}>No Position</Text>
                <Text style={styles.positionShares}>50 shares</Text>
              </View>
              <View style={styles.priceAvg}>
                <Text style={styles.priceLabel}>Avg. Price</Text>
                <Text style={styles.positionPrice}>${market.noPrice}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.viewMarketButton}>
          <Text style={styles.viewMarketButtonText}>View Market</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 8,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 12,
  },
  category: {
    fontSize: 16,
    color: '#8247E5',
    fontWeight: '500',
  },
  shareButton: {
    padding: 8,
    backgroundColor: '#1E2132',
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 24,
  },
  divider: {
    height: 1,
    backgroundColor: '#1E2132',
    marginBottom: 32,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 14,
    color: '#8F9BB3',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  timeRemainingContainer: {
    backgroundColor: '#1E2132',
    borderRadius: 12,
    padding: 16,
    marginBottom: 32,
  },
  timeRemainingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  timeRemainingLabel: {
    fontSize: 14,
    color: '#8F9BB3',
  },
  timeRemainingValue: {
    fontSize: 16,
    color: '#8247E5',
    fontWeight: '600',
  },
  timeRemainingBar: {
    height: 8,
    backgroundColor: '#2A2F45',
    borderRadius: 4,
  },
  timeRemainingProgress: {
    width: '60%',
    height: '100%',
    backgroundColor: '#8247E5',
    borderRadius: 4,
  },
  chartSection: {
    marginBottom: 32,
  },
  chartSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 24,
  },
  periodSelector: {
    flexDirection: 'row',
    gap: 8,
  },
  periodButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#1E2132',
  },
  periodButtonActive: {
    backgroundColor: '#8247E5',
  },
  periodButtonText: {
    fontSize: 14,
    color: '#8F9BB3',
  },
  periodButtonTextActive: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  chartContainer: {
    backgroundColor: '#050507',
    borderRadius: 12,
    padding: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#141722',
  },
  chart: {
    marginHorizontal: -16,
    marginVertical: -16,
  },
  positionsSection: {
    marginBottom: 32,
  },
  positionCard: {
    backgroundColor: '#1E2132',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  positionRow: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: 4,
  },
  positionLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  positionLabelYes: {
    fontSize: 16,
    fontWeight: '500',
    color: '#00D672',
  },
  positionLabelNo: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FF6B6B',
  },
  positionShares: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500',
    marginBottom: 4,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  pricePosition: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  priceAvg: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceLabel: {
    fontSize: 14,
    color: '#8F9BB3',
  },
  positionPrice: {
    fontSize: 14,
    color: '#8F9BB3',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    marginBottom: 32,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buyYesButton: {
    backgroundColor: '#1C3B2B',
  },
  buyNoButton: {
    backgroundColor: '#3B1C1C',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  screen: {
    flex: 1,
    backgroundColor: '#111827',
  },
  viewMarketButton: {
    backgroundColor: '#8B5CF6',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  viewMarketButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default MarketDetailScreen; 