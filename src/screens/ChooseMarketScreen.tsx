import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import type { RootStackScreenProps } from '../navigation/types';

const ChooseMarketScreen: React.FC<RootStackScreenProps<'ChooseMarket'>> = ({ navigation }) => {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);


  useEffect(() => {
    console.log(selectedTier);
    setSelectedTier('trusted');
  }, []);   

  const handleBack = () => {
    navigation.goBack();
  };

  const handleContinue = () => {
    if (selectedTier) {
      navigation.navigate('CreateMarket1');
    }
  };

  const handleSelectTier = (tier: string) => {
    setSelectedTier(tier);
  };

  return (
    <SafeAreaView style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Choose Your Market Tier</Text>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.description}>
          Select a tier to create your market. Higher tiers earn you more from market fees and attract greater visibility.
        </Text>

        {/* Market Tiers */}
        <View style={styles.tiersContainer}>
          {/* Basic Level */}
          <TouchableOpacity 
            style={[
              styles.tierCard,
              selectedTier === 'basic' && styles.selectedCard
            ]} 
            onPress={() => handleSelectTier('basic')}
          >
            <View style={styles.tierHeader}>
              <Text style={styles.tierTitle}>Basic Level</Text>
              <View style={styles.costBadge}>
                <Text style={styles.costText}>5</Text>
              </View>
            </View>
            <Text style={styles.tierDescription}>Good for quick predictions</Text>
            <TouchableOpacity 
              style={[
                styles.selectButton,
                selectedTier === 'basic' && styles.selectedButton
              ]}
              onPress={() => handleSelectTier('basic')}
            >
              <Text style={styles.selectButtonText}>Select Basic</Text>
            </TouchableOpacity>
          </TouchableOpacity>

          {/* Trusted Level */}
          <TouchableOpacity 
            style={[
              styles.tierCard,
              selectedTier === 'trusted' && styles.selectedCard
            ]} 
            onPress={() => handleSelectTier('trusted')}
          >
            <View style={styles.recommendedBadge}>
              <Text style={styles.recommendedText}>Recommended</Text>
            </View>
            <View style={styles.tierHeader}>
              <Text style={styles.tierTitle}>Trusted Level</Text>
              <View style={styles.costBadge}>
                <Text style={styles.costText}>20</Text>
              </View>
            </View>
            <Text style={styles.tierDescription}>More credibility, more rewards</Text>
            <View style={styles.profitShare}>
              <Icon name="trending-up" size={16} color="#8B5CF6" />
              <Text style={styles.profitShareText}>18% Profit Share</Text>
            </View>
            <TouchableOpacity 
              style={[
                styles.selectButton,
                selectedTier === 'trusted' && styles.selectedButton
              ]}
              onPress={() => handleSelectTier('trusted')}
            >
              <Text style={styles.selectButtonText}>Select Trusted</Text>
            </TouchableOpacity>
          </TouchableOpacity>

          {/* Partner Level */}
          <TouchableOpacity 
            style={[
              styles.tierCard,
              selectedTier === 'partner' && styles.selectedCard
            ]} 
            onPress={() => handleSelectTier('partner')}
          >
            <View style={styles.tierHeader}>
              <Text style={styles.tierTitle}>Partner Level</Text>
              <View style={styles.costBadge}>
                <Text style={styles.costText}>50</Text>
              </View>
            </View>
            <Text style={styles.tierDescription}>Maximum exposure and earnings</Text>
            <View style={styles.profitShare}>
              <Icon name="trending-up" size={16} color="#8B5CF6" />
              <Text style={styles.profitShareText}>26.5% Profit Share</Text>
            </View>
            <TouchableOpacity 
              style={[
                styles.selectButton,
                selectedTier === 'partner' && styles.selectedButton
              ]}
              onPress={() => handleSelectTier('partner')}
            >
              <Text style={styles.selectButtonText}>Select Partner</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Buttons */}
      <View style={styles.bottomButtons}>
        <TouchableOpacity style={styles.cancelButton} onPress={handleBack}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[
            styles.continueButton,
            !selectedTier && styles.continueButtonDisabled
          ]} 
          onPress={handleContinue}
          disabled={!selectedTier}
        >
          <Text style={[
            styles.continueButtonText,
            !selectedTier && styles.continueButtonTextDisabled
          ]}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#111827',
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
  },
  description: {
    fontSize: 14,
    color: '#9CA3AF',
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  tiersContainer: {
    paddingHorizontal: 16,
  },
  tierCard: {
    backgroundColor: '#1A1B25',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#2A2B35',
  },
  selectedCard: {
    borderColor: '#8B5CF6',
  },
  recommendedCard: {
    borderColor: '#8B5CF6',
  },
  recommendedBadge: {
    position: 'absolute',
    top: -12,
    right: 16,
    backgroundColor: '#8B5CF6',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  recommendedText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  tierHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  tierTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  costBadge: {
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  costText: {
    color: '#8B5CF6',
    fontSize: 16,
    fontWeight: '600',
  },
  tierDescription: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 16,
  },
  profitShare: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  profitShareText: {
    color: '#8B5CF6',
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
  },
  selectButton: {
    backgroundColor: '#2A2B35',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#8B5CF6',
  },
  recommendedButton: {
    backgroundColor: '#8B5CF6',
  },
  selectButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  bottomButtons: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
    backgroundColor: '#111827',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#2A2B35',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  continueButton: {
    flex: 1,
    backgroundColor: '#8B5CF6',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  continueButtonDisabled: {
    backgroundColor: '#2A2B35',
    opacity: 0.5,
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  continueButtonTextDisabled: {
    color: '#9CA3AF',
  },
});

export default ChooseMarketScreen; 