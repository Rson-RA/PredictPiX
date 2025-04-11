import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Dimensions, ScrollView} from 'react-native';
import type {RootTabScreenProps} from '../navigation/types';
import {Card, Button, IconButton} from '../components';
import {colors, typography, spacing} from '../styles/theme';
import {commonStyles} from '../styles/common';
import {LineChart} from 'react-native-chart-kit';

const MOCK_CHART_DATA = [840, 880, 800, 950, 850, 900, 1000, 920, 1100, 980, 1200];

const TIME_PERIODS = ['1D', '1W', '1M', '1Y'];

export default function PortfolioScreen({
  navigation,
}: RootTabScreenProps<'Portfolio'>) {
  const [selectedPeriod, setSelectedPeriod] = useState('1W');
  const width = Dimensions.get('window').width - 86;

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          name="cog"
          onPress={() => {
            console.log('Settings pressed');
          }}
          style={styles.settingsButton}
        />
      ),
    });
  }, [navigation]);

  return (
    <SafeAreaView style={commonStyles.screen}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={commonStyles.container}>
          {/* Balance Card */}
          <Card style={styles.balanceCard}>
            <View style={styles.balanceHeader}>
              <Text style={styles.balanceLabel}>Total Balance</Text>
              <IconButton name="eye" size={20} onPress={() => {}} />
            </View>
            <Text style={styles.balanceAmount}>$2,458.65</Text>
            <Text style={styles.balanceChange}>+$245.50 (24h)</Text>
            <View style={styles.buttonContainer}>
              <Button 
                label="Deposit" 
                onPress={() => {}} 
                style={styles.depositButton} 
              />
              <View style={styles.buttonSpacer} />
              <Button
                label="Withdraw"
                variant="secondary"
                onPress={() => {}}
                style={styles.withdrawButton}
              />
            </View>
          </Card>

          {/* Performance Chart */}
          <Card style={styles.chartCard}>
            <View style={styles.chartHeader}>
              <Text style={styles.sectionTitle}>Performance</Text>
              <View style={styles.periodSelector}>
                {TIME_PERIODS.map(period => (
                  <TouchableOpacity
                    key={period}
                    style={[
                      styles.periodButton,
                      selectedPeriod === period && styles.periodButtonActive,
                    ]}
                    onPress={() => setSelectedPeriod(period)}>
                    <Text
                      style={[
                        styles.periodButtonText,
                        selectedPeriod === period && styles.periodButtonTextActive,
                      ]}>
                      {period}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <View style={styles.chartWrapper}>
              <LineChart
                data={{
                  labels: [],
                  datasets: [{ data: MOCK_CHART_DATA }],
                }}
                width={width}
                height={200}
                chartConfig={{
                  backgroundColor: 'transparent',
                  backgroundGradientFrom: 'transparent',
                  backgroundGradientTo: 'transparent',
                  decimalPlaces: 0,
                  color: (opacity = 1) => `rgba(233, 125, 255, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(143, 155, 179, ${opacity})`,
                  propsForLabels: {
                    fontSize: 12,
                  },
                  formatYLabel: (value) => `$${value}`,
                  style: {
                    borderRadius: 16,
                  },
                }}
                bezier
                yAxisLabel=""
                yAxisInterval={1}
                style={styles.chart}
                withDots={false}
                withVerticalLines={false}
                withHorizontalLines={false}
                withVerticalLabels={true}
                withHorizontalLabels={true}
              />
            </View>
          </Card>

          {/* Active Predictions */}
          <View style={styles.predictionsHeader}>
            <Text style={styles.sectionTitle}>Active Predictions</Text>
            <TouchableOpacity onPress={() => {}}>
              <Text style={styles.viewAll}>View All</Text>
            </TouchableOpacity>
          </View>

          {/* Crypto Prediction */}
          <Card style={styles.predictionCard}>
            <View style={styles.predictionHeader}>
              <Text style={styles.predictionCategory}>Crypto</Text>
              <Text style={styles.profitAmount}>+$125.50</Text>
            </View>
            <Text style={styles.predictionTitle}>BTC {'>'} $100k by Dec 2025</Text>
            <View style={styles.predictionDetails}>
              <Text style={styles.predictionPosition}>Yes @ 0.67¢</Text>
              <Text style={styles.predictionAmount}>$500 invested</Text>
            </View>
          </Card>

          {/* Sports Prediction */}
          <Card style={styles.predictionCard}>
            <View style={styles.predictionHeader}>
              <Text style={styles.predictionCategory}>Sports</Text>
              <Text style={[styles.profitAmount, styles.lossAmount]}>-$45.30</Text>
            </View>
            <Text style={styles.predictionTitle}>Lakers NBA Champions 2025</Text>
            <View style={styles.predictionDetails}>
              <Text style={styles.predictionPosition}>No @ 0.55¢</Text>
              <Text style={styles.predictionAmount}>$300 invested</Text>
            </View>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: spacing.xl,
  },
  screen: {
    flex: 1,
    backgroundColor: '#111827',
  },
  settingsButton: {
    marginRight: spacing.sm,
  },
  balanceCard: {
    marginBottom: spacing.md,
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  balanceLabel: {
    fontSize: typography.sizes.md,
    color: colors.text.secondary,
  },
  balanceAmount: {
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.semibold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  balanceChange: {
    fontSize: typography.sizes.md,
    color: colors.accent.success,
    marginBottom: spacing.lg,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonSpacer: {
    width: spacing.md,
  },
  depositButton: {
    flex: 1,
    backgroundColor: '#8B5CF6',
  },
  withdrawButton: {
    flex: 1,
  },
  chartCard: {
    marginBottom: spacing.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.lg,
    // backgroundColor: '#13141A',
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
    color: colors.text.primary,
  },
  periodSelector: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  periodButton: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: 20,
  },
  periodButtonActive: {
    backgroundColor: '#7B61FF',
  },
  periodButtonText: {
    fontSize: typography.sizes.sm,
    color: '#8F9BB3',
  },
  periodButtonTextActive: {
    color: '#FFFFFF',
    fontWeight: typography.weights.medium,
  },
  chartWrapper: {
    marginHorizontal: 12,
    marginBottom: spacing.md,
  },
  chart: {
    borderRadius: 16,
    paddingRight: 0,
  },
  predictionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  viewAll: {
    fontSize: typography.sizes.md,
    color: colors.accent.primary,
  },
  predictionCard: {
    marginBottom: spacing.sm,
  },
  predictionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  predictionCategory: {
    fontSize: typography.sizes.sm,
    color: colors.accent.primary,
  },
  profitAmount: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.medium,
    color: colors.accent.success,
  },
  lossAmount: {
    color: colors.accent.error,
  },
  predictionTitle: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.medium,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  predictionDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  predictionPosition: {
    fontSize: typography.sizes.sm,
    color: colors.text.secondary,
  },
  predictionAmount: {
    fontSize: typography.sizes.sm,
    color: colors.text.secondary,
  },
}); 