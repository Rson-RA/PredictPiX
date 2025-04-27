import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';

const timePeriods = ['1D', '1W', '1M', '1Y'];

const activePredictions = [
  {
    id: '1',
    category: 'Crypto',
    title: 'BTC > π100k by Dec 2025',
    prediction: 'Yes @ 0.67π',
    invested: '$500 invested',
    profit: '+π125.50',
    isPositive: true,
  },
  {
    id: '2',
    category: 'Sports',
    title: 'Lakers NBA Champions 2025',
    prediction: 'No @ 0.55π',
    invested: 'π300 invested',
    profit: '-π45.30',
    isPositive: false,
  },
];

export default function PortfolioScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState('1W');
  const router = useRouter();
  const {user} = useAuth();

  const handleDeposit = () => {
    router.push('/deposit-pi');
  };

  const handleWithdraw = () => {
    router.push('/withdraw-pi');
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Portfolio</Text>
        <TouchableOpacity onPress={() => router.push('/settings')}>
          <Ionicons name="settings-outline" size={24} color="#9CA3AF" />
        </TouchableOpacity>
      </View>

      {/* Balance Card */}
      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Total Balance</Text>
        <Text style={styles.balanceAmount}>π{user?.balance || 0}</Text>
        <Text style={styles.balanceChange}>+π{user?.total_profit || 0} (24h)</Text>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.depositButton} onPress={handleDeposit}>
            <Text style={styles.depositButtonText}>Deposit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.withdrawButton} onPress={handleWithdraw}>
            <Text style={styles.withdrawButtonText}>Withdraw</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Performance Section */}
      <View style={styles.performanceCard}>
        <View style={styles.performanceHeader}>
          <Text style={styles.sectionTitle}>Performance</Text>
          <View style={styles.timeFilters}>
            {timePeriods.map((period) => (
              <TouchableOpacity
                key={period}
                style={[
                  styles.timeFilterButton,
                  selectedPeriod === period && styles.timeFilterButtonActive,
                ]}
                onPress={() => setSelectedPeriod(period)}
              >
                <Text style={[
                  styles.timeFilterText,
                  selectedPeriod === period && styles.timeFilterTextActive,
                ]}>{period}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        {/* Chart Placeholder */}
        <View style={styles.chartPlaceholder}>
          {/* Add your chart component here */}
        </View>
      </View>

      {/* Active Predictions */}
      <View style={styles.predictionsSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Active Predictions</Text>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        {activePredictions.map((prediction) => (
          <TouchableOpacity key={prediction.id} style={styles.predictionCard}>
            <View style={styles.predictionHeader}>
              <Text style={styles.predictionCategory}>{prediction.category}</Text>
              <Text style={[
                styles.predictionProfit,
                { color: prediction.isPositive ? '#10B981' : '#EF4444' }
              ]}>{prediction.profit}</Text>
            </View>
            <Text style={styles.predictionTitle}>{prediction.title}</Text>
            <View style={styles.predictionDetails}>
              <Text style={styles.predictionInfo}>{prediction.prediction} • {prediction.invested}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  balanceCard: {
    margin: 16,
    padding: 16,
    backgroundColor: '#1F2937',
    borderRadius: 12,
  },
  balanceLabel: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  balanceChange: {
    fontSize: 14,
    color: '#10B981',
    marginBottom: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  depositButton: {
    flex: 1,
    backgroundColor: '#8B5CF6',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  withdrawButton: {
    flex: 1,
    backgroundColor: '#374151',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  depositButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  withdrawButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  performanceCard: {
    margin: 16,
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
  },
  performanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  timeFilters: {
    flexDirection: 'row',
    gap: 8,
  },
  timeFilterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#1F2937',
  },
  timeFilterButtonActive: {
    backgroundColor: '#8B5CF6',
  },
  timeFilterText: {
    color: '#9CA3AF',
    fontSize: 14,
    fontWeight: '500',
  },
  timeFilterTextActive: {
    color: '#FFFFFF',
  },
  chartPlaceholder: {
    height: 200,
    backgroundColor: '#1F2937',
    borderRadius: 12,
    marginBottom: 16,
  },
  predictionsSection: {
    margin: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  viewAllText: {
    color: '#8B5CF6',
    fontSize: 14,
    fontWeight: '500',
  },
  predictionCard: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  predictionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  predictionCategory: {
    color: '#8B5CF6',
    fontSize: 14,
    fontWeight: '500',
  },
  predictionProfit: {
    fontSize: 14,
    fontWeight: '600',
  },
  predictionTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  predictionDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  predictionInfo: {
    color: '#9CA3AF',
    fontSize: 14,
  },
}); 