import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, Modal, ViewStyle, TextStyle } from 'react-native';
import { MaterialIcons, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

interface NotificationsDialogProps {
  visible: boolean;
  onClose: () => void;
  onSave: (settings: NotificationSettings) => void;
}

interface NotificationSettings {
  tradeAlerts: boolean;
  leaderboardUpdates: boolean;
  marketReminders: boolean;
}

export default function NotificationsDialog({ visible, onClose, onSave }: NotificationsDialogProps): React.JSX.Element {
  const [settings, setSettings] = React.useState<NotificationSettings>({
    tradeAlerts: false,
    leaderboardUpdates: false,
    marketReminders: false,
  });

  const handleSave = () => {
    onSave(settings);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.dialog}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Notifications</Text>
            <TouchableOpacity 
              onPress={onClose}
              style={styles.closeButton}
              accessibilityRole="button"
              accessibilityLabel="Close dialog"
            >
              <Ionicons name="close" size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <Text style={styles.subtitle}>Choose which notifications you'd like to receive:</Text>

          {/* Notification Options */}
          <View style={styles.optionsContainer}>
            {/* Trade Alerts */}
            <View style={styles.optionItem}>
              <View style={styles.optionContent}>
                <View style={[styles.iconContainer, { backgroundColor: 'rgba(151, 71, 255, 0.1)' }]}>
                  <MaterialIcons name="notifications" size={20} color="#9747FF" />
                </View>
                <Text style={styles.optionText}>New Trade Alerts</Text>
              </View>
              <Switch
                value={settings.tradeAlerts}
                onValueChange={(value) => setSettings(prev => ({ ...prev, tradeAlerts: value }))}
                trackColor={{ false: '#1F2937', true: '#9747FF' }}
                thumbColor="#FFFFFF"
              />
            </View>

            {/* Leaderboard Updates */}
            <View style={styles.optionItem}>
              <View style={styles.optionContent}>
                <View style={[styles.iconContainer, { backgroundColor: 'rgba(151, 71, 255, 0.1)' }]}>
                  <MaterialIcons name="emoji-events" size={20} color="#9747FF" />
                </View>
                <Text style={styles.optionText}>Leaderboard Updates</Text>
              </View>
              <Switch
                value={settings.leaderboardUpdates}
                onValueChange={(value) => setSettings(prev => ({ ...prev, leaderboardUpdates: value }))}
                trackColor={{ false: '#1F2937', true: '#9747FF' }}
                thumbColor="#FFFFFF"
              />
            </View>

            {/* Market Reminders */}
            <View style={styles.optionItem}>
              <View style={styles.optionContent}>
                <View style={[styles.iconContainer, { backgroundColor: 'rgba(151, 71, 255, 0.1)' }]}>
                  <MaterialCommunityIcons name="chart-line" size={20} color="#9747FF" />
                </View>
                <Text style={styles.optionText}>Market Reminders</Text>
              </View>
              <Switch
                value={settings.marketReminders}
                onValueChange={(value) => setSettings(prev => ({ ...prev, marketReminders: value }))}
                trackColor={{ false: '#1F2937', true: '#9747FF' }}
                thumbColor="#FFFFFF"
              />
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actions}>
            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={onClose}
              accessibilityRole="button"
              accessibilityLabel="Cancel"
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.saveButton}
              onPress={handleSave}
              accessibilityRole="button"
              accessibilityLabel="Save notification settings"
            >
              <Text style={styles.saveButtonText}>Save</Text>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  dialog: {
    backgroundColor: '#111827',
    borderRadius: 16,
    width: '100%',
    maxWidth: 400,
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
  },
  closeButton: {
    padding: 4,
  },
  subtitle: {
    color: '#6B7280',
    fontSize: 14,
    marginBottom: 24,
  },
  optionsContainer: {
    gap: 16,
    marginBottom: 24,
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  cancelButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#1F2937',
  },
  cancelButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  saveButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#9747FF',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
}); 