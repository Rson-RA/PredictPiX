import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Modal } from 'react-native';
import ConfirmPosition from './ConfirmPosition';

interface BuyPositionProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: (amount: number) => void;
  currentProbability: string;
  isYesPosition?: boolean;
  marketQuestion: string;
}

export default function BuyPosition({
  visible, 
  onClose, 
  onConfirm,
  currentProbability,
  isYesPosition = true,
  marketQuestion,
}: BuyPositionProps) {
  const [amount, setAmount] = useState<string>('');
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  
  const predefinedAmounts = ['10', '50', '100', '500'];
  const transactionFee = 2.50;
  const potentialReturn = amount ? Number(amount) * 3.245 : 0;
  const totalCost = amount ? Number(amount) + transactionFee : 0;

  const handleConfirm = () => {
    if (amount) {
      setShowConfirmDialog(true);
    }
  };

  const handleConfirmPosition = () => {
    setShowConfirmDialog(false);
    onConfirm(Number(amount));
  };

  return (
    <>
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
              <Text style={styles.title}>Buy {isYesPosition ? 'Yes' : 'No'} Position</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>×</Text>
              </TouchableOpacity>
            </View>

            {/* Current Probability */}
            <View style={styles.probabilityContainer}>
              <Text style={styles.probabilityLabel}>Current Probability</Text>
              <Text style={[
                styles.probabilityValue,
                !isYesPosition && { color: '#F87171' }
              ]}>{currentProbability}</Text>
            </View>

            {/* Stake Amount */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Stake Amount</Text>
              <View style={styles.amountInputContainer}>
                <TextInput
                  style={styles.amountInput}
                  value={amount}
                  onChangeText={setAmount}
                  keyboardType="numeric"
                  placeholder="Enter amount"
                  placeholderTextColor="#71717A"
                />
                <Text style={styles.unitText}>Units</Text>
              </View>
              <View style={styles.predefinedAmounts}>
                {predefinedAmounts.map((presetAmount) => (
                  <TouchableOpacity
                    key={presetAmount}
                    style={[
                      styles.amountButton,
                      amount === presetAmount && styles.amountButtonSelected
                    ]}
                    onPress={() => setAmount(presetAmount)}
                  >
                    <Text style={[
                      styles.amountButtonText,
                      amount === presetAmount && styles.amountButtonTextSelected
                    ]}>${presetAmount}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Transaction Details */}
            <View style={styles.detailsContainer}>
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

            {/* Action Buttons */}
            <View style={styles.actions}>
              <TouchableOpacity 
                style={styles.cancelButton} 
                onPress={onClose}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[
                  styles.confirmButton,
                  !isYesPosition && { backgroundColor: '#EF4444' },
                  !amount && styles.confirmButtonDisabled
                ]}
                onPress={handleConfirm}
                disabled={!amount}
              >
                <Text style={[
                  styles.confirmButtonText,
                  !amount && styles.confirmButtonTextDisabled
                ]}>
                  Confirm Position
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <ConfirmPosition
        visible={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
        onConfirm={handleConfirmPosition}
        marketQuestion={marketQuestion}
        position={`${isYesPosition ? 'YES' : 'NO'} @ ${currentProbability}`}
        stake={Number(amount)}
        potentialReturn={potentialReturn}
        transactionFee={transactionFee}
        totalCost={totalCost}
      />
    </>
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
  probabilityContainer: {
    marginBottom: 20,
  },
  probabilityLabel: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  probabilityValue: {
    fontSize: 24,
    fontWeight: '600',
    color: '#10B981',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 8,
  },
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1F2937',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  amountInput: {
    flex: 1,
    fontSize: 16,
    color: '#FFFFFF',
  },
  unitText: {
    fontSize: 14,
    color: '#9CA3AF',
    marginLeft: 8,
  },
  predefinedAmounts: {
    flexDirection: 'row',
    gap: 8,
  },
  amountButton: {
    flex: 1,
    backgroundColor: '#1F2937',
    borderRadius: 8,
    padding: 8,
    alignItems: 'center',
  },
  amountButtonSelected: {
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
  },
  amountButtonText: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  amountButtonTextSelected: {
    color: '#8B5CF6',
    fontWeight: '500',
  },
  detailsContainer: {
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
  confirmButtonDisabled: {
    opacity: 0.5,
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
  confirmButtonTextDisabled: {
    opacity: 0.5,
  },
}); 