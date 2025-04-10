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

interface BuyNoPositionDialogProps {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: (amount: string) => void;
  probability: number;
  marketQuestion: string;
}

const BuyNoPositionDialog: React.FC<BuyNoPositionDialogProps> = ({
  isVisible,
  onClose,
  onConfirm,
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
                <Text style={styles.title}>Buy No Position</Text>
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
                  <View style={styles.amountButtons}>
                    <TouchableOpacity 
                      style={styles.amountButton} 
                      onPress={() => setAmount('10')}
                    >
                      <Text style={styles.amountButtonText}>$10</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={styles.amountButton}
                      onPress={() => setAmount('50')}
                    >
                      <Text style={styles.amountButtonText}>$50</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={styles.amountButton}
                      onPress={() => setAmount('100')}
                    >
                      <Text style={styles.amountButtonText}>$100</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={styles.amountButton}
                      onPress={() => setAmount('500')}
                    >
                      <Text style={styles.amountButtonText}>$500</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.detailsSection}>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Potential Return</Text>
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
      
      <ConfirmPositionDialog
        isVisible={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirm={handleConfirmFinal}
        marketQuestion={marketQuestion}
        position={`No @ ${probability}%`}
        probability={probability}
        stake={parseFloat(amount) || 0}
        potentialProfit={parseFloat(potentialProfit)}
        fee={parseFloat(fee)}
      />
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
    gap: 24,
  },
  probabilitySection: {
    backgroundColor: '#374151',
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
    color: '#EF4444',
  },
  amountSection: {
    gap: 8,
  },
  amountInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#374151',
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
  },
  amountButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 0,
    gap: 8,
  },
  amountButton: {
    flex: 1,
    padding: 0,
    alignItems: 'center',
  },
  amountButtonText: {
    color: '#8B5CF6',
    fontSize: 16,
    fontWeight: '600',
  },
  detailsSection: {
    gap: 12,
    backgroundColor: '#374151',
    padding: 16,
    borderRadius: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  detailLabel: {
    color: '#94A3B8',
    fontSize: 14,
  },
  detailValue: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  profitValue: {
    color: '#EF4444',
  },
  footer: {
    padding: 16,
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: '#2A2B35',
  },
  confirmButton: {
    backgroundColor: '#EF4444',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  confirmButtonDisabled: {
    opacity: 0.5,
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: '#374151',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#94A3B8',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default BuyNoPositionDialog; 