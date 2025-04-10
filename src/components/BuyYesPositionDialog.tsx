import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ConfirmPositionDialog from './ConfirmPositionDialog';

interface BuyYesPositionDialogProps {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: (amount: string) => void;
  position: 'Yes' | 'No';
  probability: number;
  marketQuestion: string;
}

const BuyYesPositionDialog: React.FC<BuyYesPositionDialogProps> = ({
  isVisible,
  onClose,
  onConfirm,
  position,
  probability,
  marketQuestion,
}) => {
  const [amount, setAmount] = React.useState('');
  const [showConfirmation, setShowConfirmation] = React.useState(false);

  const potentialProfit = React.useMemo(() => {
    const numAmount = parseFloat(amount) || 0;
    return (numAmount / (probability / 100) - numAmount).toFixed(2);
  }, [amount, probability]);

  const fee = React.useMemo(() => {
    const numAmount = parseFloat(amount) || 0;
    return (numAmount * 0.025).toFixed(2); // 2.5% fee
  }, [amount]);

  const totalCost = React.useMemo(() => {
    const numAmount = parseFloat(amount) || 0;
    const numFee = parseFloat(fee);
    return (numAmount + numFee).toFixed(2);
  }, [amount, fee]);

  const handleConfirm = () => {
    if (amount) {
      setShowConfirmation(true);
    }
  };

  const handleConfirmFinal = () => {
    onConfirm(amount);
    setAmount('');
    setShowConfirmation(false);
  };

  const handleClose = () => {
    setAmount('');
    setShowConfirmation(false);
    onClose();
  };

  return (
    <>
      <Modal
        visible={isVisible}
        transparent
        animationType="fade"
        onRequestClose={handleClose}
      >
        <TouchableWithoutFeedback onPress={handleClose}>
          <View style={styles.overlay}>
            <TouchableWithoutFeedback>
              <View style={styles.dialog}>
                <View style={styles.header}>
                  <Text style={styles.title}>Buy {position} Position</Text>
                  <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
                    <Icon name="close" size={24} color="#94A3B8" />
                  </TouchableOpacity>
                </View>

                <View style={styles.content}>
                  <View style={styles.probabilitySection}>
                    <Text style={styles.sectionLabel}>Current Probability</Text>
                    <Text style={styles.probabilityValue}>{probability}%</Text>
                  </View>

                  <View style={styles.amountSection}>
                    <Text style={styles.sectionLabel}>Stake Amount</Text>
                    <View style={styles.amountInput}>
                      <TextInput
                        style={styles.input}
                        placeholder="Enter amount"
                        placeholderTextColor="#94A3B8"
                        keyboardType="decimal-pad"
                        value={amount}
                        onChangeText={setAmount}
                      />
                      <Text style={styles.currency}>USD</Text>
                    </View>
                    <View style={styles.limitsContainer}>
                      <Text style={styles.limitText}>Min: $10</Text>
                      <Text style={styles.limitText}>Max: $10,000</Text>
                    </View>
                  </View>

                  <View style={styles.detailsSection}>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Potential Profit</Text>
                      <Text style={[styles.detailValue, styles.profitValue]}>+${potentialProfit}</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Transaction Fee</Text>
                      <Text style={styles.detailValue}>${fee}</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Total Cost</Text>
                      <Text style={styles.detailValue}>${totalCost}</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.footer}>
                  <TouchableOpacity 
                    style={[
                      styles.confirmButton,
                      (!amount || parseFloat(amount) < 10 || parseFloat(amount) > 10000) && styles.confirmButtonDisabled
                    ]} 
                    onPress={handleConfirm}
                    disabled={!amount || parseFloat(amount) < 10 || parseFloat(amount) > 10000}
                  >
                    <Text style={styles.confirmButtonText}>Confirm Purchase</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.cancelButton} 
                    onPress={handleClose}
                  >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <ConfirmPositionDialog
        isVisible={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirm={handleConfirmFinal}
        marketQuestion={marketQuestion}
        position={`${position} @ ${probability}%`}
        probability={probability}
        stake={parseFloat(amount) || 0}
        potentialProfit={parseFloat(potentialProfit)}
        fee={parseFloat(fee)}
      />
    </>
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
    gap: 24,
  },
  probabilitySection: {
    backgroundColor: '#37415180',
    padding: 16,
    borderRadius: 12,
  },
  sectionLabel: {
    fontSize: 14,
    color: '#94A3B8',
    marginBottom: 8,
  },
  probabilityValue: {
    fontSize: 24,
    fontWeight: '600',
    color: '#4ADE80',
  },
  amountSection: {
    gap: 8,
  },
  amountInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#37415180',
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
    paddingVertical: 12,
  },
  currency: {
    color: '#94A3B8',
    fontSize: 16,
    fontWeight: '500',
  },
  limitText: {
    fontSize: 12,
    color: '#94A3B8',
  },
  limitsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  detailsSection: {
    gap: 12,
    backgroundColor: '#37415180',
    padding: 16,
    borderRadius: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 14,
    color: '#94A3B8',
  },
  detailValue: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  profitValue: {
    color: '#4ADE80',
  },
  footer: {
    padding: 16,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: '#2A2B35',
  },
  cancelButton: {
    backgroundColor: '#37415180',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  confirmButton: {
    backgroundColor: '#4ADE80',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  confirmButtonDisabled: {
    opacity: 0.5,
  },
  cancelButtonText: {
    color: '#94A3B8',
    fontSize: 16,
    fontWeight: '600',
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default BuyYesPositionDialog; 