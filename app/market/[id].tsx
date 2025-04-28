import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Pressable, Alert } from 'react-native';
import { useLocalSearchParams, Stack, router } from 'expo-router';
import { Market } from '@/types/models';
import marketsApi from '@/api/markets';
import { formatDate, renderTimeRemaining } from '@/utils';
import BuyPosition from '@/components/BuyPosition';
import ConfirmPosition from '@/components/ConfirmPosition';
import { Colors } from '@/constants/Colors';
import predictionsApi from '@/api/predictions';

export default function MarketDetailsScreen() {
  const { id } = useLocalSearchParams();
  const [market, setMarket] = useState<Market | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showBuyDialog, setShowBuyDialog] = useState(false);
  const [isYesPosition, setIsYesPosition] = useState(true);

  const [amount, setAmount] = useState<string>('');
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [creatingPrediction, setCreatingPrediction] = useState(false);
  const transactionFee = 2.0;
  const potentialReturn = amount ? Number(amount) * 1.25 : 0;
  const totalCost = amount ? Number(amount) + transactionFee : 0;
  const currentProbability = ((market?.yes_pool || 0) / (market?.total_pool || 0)) * 100;

  useEffect(() => {
    fetchMarketDetails();
  }, [id]);

  const fetchMarketDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await marketsApi.getMarketById(parseInt(id as string));
      setMarket(response);
    } catch (err) {
      setError('Failed to load market details. Please try again.');
      console.error('Error fetching market details:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBuyYes = () => {
    if (market?.status === 'active') {
      setIsYesPosition(true);
      setShowBuyDialog(true);
    } else {
      Alert.alert('Market is not active');
    }
  };

  const handleBuyNo = () => {
    if (market?.status === 'active') {
      setIsYesPosition(false);
      setShowBuyDialog(true);
    } else {
      Alert.alert('Market is not active');
    }
  };

  const handleConfirmPosition = () => {
    setShowConfirmDialog(false);
    setShowBuyDialog(false);

    if(!market?.id) {
      Alert.alert('Error', 'Market not found');
      return;
    }
    // TODO: Implement API call to buy position
    setCreatingPrediction(true);
    predictionsApi.createPrediction({
      market_id: market?.id || 0,
      amount: Number(amount),
      predicted_outcome: isYesPosition ? 'yes' : 'no'
    }).then((prediction) => {
      console.log('Prediction created:', prediction);
      setCreatingPrediction(false);
      router.push({
        pathname: '/purchase-status',
        params: {
          market: market.title,
          position: isYesPosition ? 'yes' : 'no',
          stakeAmount: Number(amount)?.toFixed(2),
          transactionFee: transactionFee?.toFixed(2),
          potentialProfit: potentialReturn?.toFixed(2),
        }
      });
    }).catch((error) => {
      console.error('Error creating prediction:', error);
      setCreatingPrediction(false);
      Alert.alert('Error', error.message || 'Failed to create prediction');
    });
  };  

  const handleBuyPosition = (amount: number) => {
    setAmount(amount.toString());
    setShowConfirmDialog(true);
    setShowBuyDialog(false);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (error || !market) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
        <Pressable style={styles.retryButton} onPress={fetchMarketDetails}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Market Details',
          headerBackTitle: 'Back',
        }}
      />
      {creatingPrediction && (
        <View style={[styles.loadingOverlay, styles.centered]}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.loadingText}>Creating Prediction...</Text>
        </View>
      )}
      <View style={styles.mainContainer}>
        <ScrollView 
          style={styles.container}
          showsVerticalScrollIndicator={false}
        >
          {/* Market Title */}
          <View style={styles.section}>
            <Text style={styles.title}>{market.title}</Text>
            <View style={styles.timeLeftContainer}>
              <Text style={styles.timeLeft}>{renderTimeRemaining(market.end_time)}</Text>
              <Text style={styles.status}>{market.status}</Text>
            </View>
          </View>

          {/* Market Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Total Pool</Text>
              <Text style={styles.statValue}>{market.total_pool} π</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Yes Pool</Text>
              <Text style={styles.statValue}>{market.yes_pool} π</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>No Pool</Text>
              <Text style={styles.statValue}>{market.no_pool} π</Text>
            </View>
          </View>

          {/* Market Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{market.description}</Text>
          </View>

          {/* Market Info */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Market Information</Text>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Created by</Text>
              <Text style={styles.infoValue}>{market.creator.username}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>End Date</Text>
              <Text style={styles.infoValue}>{formatDate(market.end_time)}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Resolution Date</Text>
              <Text style={styles.infoValue}>{formatDate(market.resolution_time)}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Source</Text>
              <Text style={styles.infoValue}>{market.market_metadata?.source}</Text>
            </View>
          </View>

          {/* Market Outcomes */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Outcomes</Text>
            <View style={styles.outcomeContainer}>
              <Pressable 
                style={styles.outcome}
                onPress={handleBuyYes}
              >
                <Text style={styles.outcomeTitleYes}>Yes</Text>
                <Text style={styles.outcomeDescription}>
                  {market.market_metadata?.yesDescription}
                </Text>
                <Text style={styles.probability}>
                  Probability: {(market.implied_probabilities?.yes || 0).toFixed(2)}%
                </Text>
              </Pressable>
              <Pressable 
                style={styles.outcome}
                onPress={handleBuyNo}
              >
                <Text style={styles.outcomeTitleNo}>No</Text>
                {/* <Text style={styles.outcomeDescription}>
                  {market.market_metadata?.noDescription}
                </Text> */}
                <Text style={styles.probability}>
                  Probability: {(market.implied_probabilities?.no || 0).toFixed(2)}%
                </Text>
              </Pressable>
            </View>
          </View>

          {/* Buy Position Dialog */}
          {market.status === 'active' && showBuyDialog && (
            <BuyPosition
              visible={showBuyDialog}
              market={market}
              onConfirm={handleBuyPosition}
              onClose={() => setShowBuyDialog(false)}
              isYesPosition={isYesPosition}
            />
          )}
          {showConfirmDialog && <ConfirmPosition
            visible={showConfirmDialog}
            onClose={() => setShowConfirmDialog(false)}
            onConfirm={handleConfirmPosition}
            stake={Number(amount)}
            potentialReturn={potentialReturn}
            transactionFee={transactionFee}
            totalCost={totalCost}
            market={market}
            isYesPosition={isYesPosition}
          />}
        </ScrollView>
        <Pressable 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>Back</Text>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    marginBottom: 100, // Add space for the back button
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.dark.text,
    marginBottom: 8,
  },
  timeLeft: {
    fontSize: 16,
    color: '#9CA3AF',
    marginBottom: 8,
  },
  timeLeftContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  status: {
    fontSize: 16,
    color: '#9CA3AF',
    marginBottom: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#F3F4F600',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#9CA3AF',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#9CA3AF',
    lineHeight: 24,
  },
  outcomeContainer: {
    gap: 16,
  },
  outcome: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#1F2937',
    padding: 16,
    borderRadius: 8,
  },
  outcomeTitleYes: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#34D399',
    marginBottom: 8,
  },
  outcomeTitleNo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F87171',
    marginBottom: 8,
  },
  outcomeDescription: {
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 8,
  },
  probability: {
    fontSize: 14,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  infoValue: {
    fontSize: 14,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  errorText: {
    color: Colors.error,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    alignSelf: 'center',
  },
  retryButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '500',
  },
  backButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#374151',
    margin: 16,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingOverlay: {
    zIndex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 16,
  },
}); 