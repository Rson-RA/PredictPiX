import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

interface ConfirmPositionDialogProps {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  marketQuestion: string;
  position: string;
  probability: number;
  stake: number;
  potentialProfit: number;
  fee: number;
}

const ConfirmPositionDialog: React.FC<ConfirmPositionDialogProps> = ({
  isVisible,
  onClose,
  onConfirm,
  marketQuestion,
  position,
  probability,
  stake,
  potentialProfit,
  fee,
}) => {
  const navigation = useNavigation();
  const totalCost = stake + fee;

  const handleConfirm = () => {
    onConfirm();
    onClose();
    navigation.navigate('ConfirmPurchase', {
      marketQuestion,
      position,
      probability,
      stake,
      potentialProfit,
      fee,
    });
  };

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.dialog}>
              <View style={styles.header}>
                <Text style={styles.title}>Confirm Your Position</Text>
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                  <Icon name="close" size={24} color="#94A3B8" />
                </TouchableOpacity>
              </View>

              <View style={styles.content}>
                <View style={styles.card}>
                  <Text style={styles.sectionLabel}>Market Question</Text>
                  <Text style={styles.marketQuestion}>{marketQuestion}</Text>
                </View>

                <View style={styles.detailsGrid}>
                  <View style={styles.detailsGridCard}>
                    <Text style={styles.sectionLabel}>Position</Text>
                    <Text style={styles.detailValue}>{position}</Text>
                  </View>
                  <View style={styles.detailsGridCard}>
                    <Text style={styles.sectionLabel}>Stake</Text>
                    <Text style={styles.stakeLabel}>${stake.toFixed(2)}</Text>
                  </View>
                </View>

                <View style={styles.card}>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Potential Profit</Text>
                    <Text style={[styles.detailValue, styles.profitValue]}>+${potentialProfit.toFixed(2)}</Text>
                  </View>
                  <View style={[styles.detailRow, styles.borderTop]}>
                    <Text style={styles.detailLabel}>Transaction Fee</Text>
                    <Text style={styles.detailLabel}>${fee.toFixed(2)}</Text>
                  </View>
                  <View style={[styles.detailRow, styles.borderTop]}>
                    <Text style={styles.detailLabel}>Total Cost</Text>
                    <Text style={styles.stakeLabel}>${totalCost.toFixed(2)}</Text>
                  </View>
                </View>

                <View style={styles.notice}>
                  <Icon name="warning" size={20} color="#F59E0B" />
                  <Text style={styles.noticeText}>
                    This position cannot be reversed once confirmed. Please verify all details before proceeding.
                  </Text>
                </View>
              </View>

              <View style={styles.footer}>
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
                  <Icon name="checkmark" size={24} color="#FFFFFF" />
                  <Text style={styles.confirmButtonText}>Confirm Position</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialog: {
    width: '90%',
    maxWidth: 400,
    backgroundColor: '#1F2937',
    borderRadius: 16,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2B35',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  closeButton: {
    padding: 4,
  },
  content: {
    padding: 16,
    gap: 16,
  },
  card: {
    backgroundColor: '#37415180',
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  sectionLabel: {
    fontSize: 14,
    color: '#94A3B8',
  },
  stakeLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  marketQuestion: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  detailsGrid: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  detailsGridCard: {
    flex: 1,
    backgroundColor: '#37415180',
    padding: 16,
    borderRadius: 12,
    gap: 12,
    // aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  borderTop: {
    borderTopWidth: 1,
    borderTopColor: '#2A2B35',
  },
  detailLabel: {
    fontSize: 14,
    color: '#94A3B8',
  },
  detailValue: {
    fontSize: 14,
    color: '#34D399',
    fontWeight: '500',
  },
  profitValue: {
    color: '#4ADE80',
  },
  notice: {
    backgroundColor: '#F59E0B1A',
    padding: 12,
    borderRadius: 8,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  noticeText: {
    flex: 1,
    fontSize: 14,
    color: '#F59E0B',
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: '#2A2B35',
  },
  cancelButton: {
    flex: 1,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: '#374151',
  },
  confirmButton: {
    flex: 1,
    height: 48,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: '#10B981',
    gap: 8,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default ConfirmPositionDialog; 