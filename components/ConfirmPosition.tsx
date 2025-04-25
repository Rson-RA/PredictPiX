import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { useRouter } from 'expo-router';

interface ConfirmPositionProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  marketQuestion: string;
  position: string;
  stake: number;
  potentialReturn: number;
  transactionFee: number;
  totalCost: number;
}

export default function ConfirmPosition({
  visible,
  onClose,
  onConfirm,
  marketQuestion,
  position,
  stake,
  potentialReturn,
  transactionFee,
  totalCost,
}: ConfirmPositionProps) {
  const router = useRouter();

  const handleConfirm = () => {
    onConfirm();
    router.push({
      pathname: '/purchase-status',
      params: {
        market: marketQuestion,
        position: position,
        stakeAmount: stake?.toFixed(2),
        transactionFee: transactionFee?.toFixed(2),
        potentialProfit: potentialReturn?.toFixed(2),
      }
    });
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.dialog}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Confirm Your Position</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
          </View>

          {/* Market Question */}
          <View style={styles.section}>
            <Text style={styles.label}>Market Question</Text>
            <Text style={styles.marketQuestion}>{marketQuestion}</Text>
          </View>

          {/* Position and Stake */}
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.label}>Position</Text>
              <Text style={styles.value}>{position}</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.label}>Stake</Text>
              <Text style={styles.value}>${stake.toFixed(2)}</Text>
            </View>
          </View>

          {/* Transaction Details */}
          <View style={styles.transactionDetails}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Potential Return</Text>
              <Text style={styles.potentialReturn}>+${potentialReturn?.toFixed(2)}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Transaction Fee</Text>
              <Text style={styles.detailValue}>${transactionFee?.toFixed(2)}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Total Cost</Text>
              <Text style={styles.detailValue}>${totalCost?.toFixed(2)}</Text>
            </View>
          </View>

          {/* Important Notice */}
          <View style={styles.notice}>
            <Text style={styles.noticeIcon}>⚠</Text>
            <Text style={styles.noticeText}>
              This position cannot be reversed once confirmed. Please verify all details before proceeding.
            </Text>
          </View>

          {/* Action Buttons */}
          <View style={styles.actions}>
            <TouchableOpacity 
              style={styles.cancelButton} 
              onPress={onClose}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.confirmButton} 
              onPress={handleConfirm}
            >
              <Text style={styles.confirmButtonText}>
                Confirm Position
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  dialog: {
    backgroundColor: '#111827',
    borderRadius: 16,
    width: '100%',
    maxWidth: 400,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  closeButton: {
    padding: 4,
  },
  closeButtonText: {
    color: '#9CA3AF',
    fontSize: 24,
    fontWeight: '500',
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  marketQuestion: {
    fontSize: 16,
    color: '#FFFFFF',
    lineHeight: 24,
  },
  row: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 20,
  },
  column: {
    flex: 1,
  },
  value: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  transactionDetails: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  detailValue: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  potentialReturn: {
    fontSize: 14,
    color: '#10B981',
  },
  notice: {
    flexDirection: 'row',
    gap: 8,
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
  },
  noticeIcon: {
    fontSize: 16,
    color: '#F59E0B',
  },
  noticeText: {
    flex: 1,
    fontSize: 14,
    color: '#F59E0B',
    lineHeight: 20,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#1F2937',
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: 'center',
  },
  confirmButton: {
    flex: 1,
    backgroundColor: '#10B981',
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
}); 