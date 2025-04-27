import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

export type TierType = 'basic' | 'trusted' | 'partner';

type Props = {
  visible: boolean;
  onClose: () => void;
  onContinue: () => void;
  onSelectTier: (tier: TierType) => void;
};

export default function MarketTier({ visible, onClose, onContinue, onSelectTier }: Props) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose} style={styles.backButton}>
              <FontAwesome5 name="arrow-left" size={20} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.title}>Choose Your Market Tier</Text>
          </View>

          <Text style={styles.description}>
            Select a tier to create your market. Higher tiers earn you more from market fees and attract greater visibility.
          </Text>

          {/* Basic Tier */}
          <View style={styles.tierCard}>
            <View style={styles.tierHeader}>
              <Text style={styles.tierTitle}>Basic Tier</Text>
              <View style={styles.pointsContainer}>
                <Text style={styles.pointsText}>5</Text>
              </View>
            </View>
            <Text style={styles.tierDescription}>Good for quick predictions</Text>
            <TouchableOpacity 
              style={styles.selectButton}
              onPress={() => onSelectTier('basic')}
            >
              <Text style={styles.selectButtonText}>Select Basic</Text>
            </TouchableOpacity>
          </View>

          {/* Trusted Tier */}
          <View style={styles.tierCard}>
            <View style={styles.tierHeader}>
              <Text style={styles.tierTitle}>Trusted Tier</Text>
              <View style={styles.pointsContainer}>
                <Text style={styles.pointsText}>20</Text>
              </View>
            </View>
            <Text style={styles.tierDescription}>Maximum exposure and earnings</Text>
            <View style={styles.profitShareContainer}>
              <FontAwesome5 name="chart-line" size={14} color="#8B5CF6" />
              <Text style={styles.profitShareText}>18% Creator Reward Share</Text>
            </View>
            <TouchableOpacity 
              style={styles.selectButton}
              onPress={() => onSelectTier('trusted')}
            >
              <Text style={styles.selectButtonText}>Select Trusted</Text>
            </TouchableOpacity>
          </View>

          {/* Partner Tier */}
          <View style={styles.tierCard}>
            <View style={styles.tierHeader}>
              <Text style={styles.tierTitle}>Partner Tier</Text>
              <View style={styles.pointsContainer}>
                <Text style={styles.pointsText}>50</Text>
              </View>
            </View>
            <Text style={styles.tierDescription}>Maximum exposure and earnings</Text>
            <View style={styles.profitShareContainer}>
              <FontAwesome5 name="chart-line" size={14} color="#8B5CF6" />
              <Text style={styles.profitShareText}>26.5% Creator Reward Share</Text>
            </View>
            <TouchableOpacity 
              style={styles.selectButton}
              onPress={() => onSelectTier('partner')}
            >
              <Text style={styles.selectButtonText}>Select Partner</Text>
            </TouchableOpacity>
          </View>

          {/* Bottom Buttons */}
          <View style={styles.bottomButtons}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.continueButton} onPress={onContinue}>
              <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#111827',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    maxHeight: '90%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  description: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 24,
    textAlign: 'center',
  },
  tierCard: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
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
    color: '#FFFFFF',
  },
  pointsContainer: {
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    borderRadius: 12,
    padding: 4,
    minWidth: 28,
    alignItems: 'center',
  },
  pointsText: {
    color: '#8B5CF6',
    fontSize: 14,
    fontWeight: '600',
  },
  tierDescription: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 12,
  },
  profitShareContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  profitShareText: {
    color: '#8B5CF6',
    fontSize: 14,
    fontWeight: '500',
  },
  selectButton: {
    backgroundColor: '#1F2937',
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: 'center',
  },
  selectButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  bottomButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#1F2937',
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: 'center',
  },
  continueButton: {
    flex: 1,
    backgroundColor: '#8B5CF6',
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
}); 