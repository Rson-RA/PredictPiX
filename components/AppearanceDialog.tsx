import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';

interface AppearanceDialogProps {
  visible: boolean;
  onClose: () => void;
}

export default function AppearanceDialog({ visible, onClose }: AppearanceDialogProps): React.JSX.Element {
  const { theme, setTheme } = useTheme();
  const [selectedTheme, setSelectedTheme] = React.useState<'dark' | 'light'>(theme);

  const handleApply = async () => {
    await setTheme(selectedTheme);
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
            <Text style={styles.title}>Appearance</Text>
            <TouchableOpacity 
              onPress={onClose}
              style={styles.closeButton}
              accessibilityRole="button"
              accessibilityLabel="Close dialog"
            >
              <Ionicons name="close" size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <Text style={styles.subtitle}>Select your preferred theme:</Text>

          {/* Theme Options */}
          <View style={styles.optionsContainer}>
            {/* Dark Mode */}
            <TouchableOpacity 
              style={[
                styles.themeOption,
                selectedTheme === 'dark' && styles.selectedTheme
              ]}
              onPress={() => setSelectedTheme('dark')}
              accessibilityRole="radio"
              accessibilityState={{ checked: selectedTheme === 'dark' }}
              accessibilityLabel="Dark Mode"
            >
              <View style={styles.themeContent}>
                <View style={styles.radioContainer}>
                  <View style={[
                    styles.radioOuter,
                    selectedTheme === 'dark' && styles.radioOuterSelected
                  ]}>
                    {selectedTheme === 'dark' && (
                      <View style={styles.radioInner} />
                    )}
                  </View>
                  <View style={styles.themeTextContainer}>
                    <Text style={styles.themeTitle}>Dark Mode</Text>
                    <Text style={styles.themeDescription}>Perfect for night viewing</Text>
                  </View>
                </View>
                <MaterialCommunityIcons name="moon-waning-crescent" size={24} color="#9747FF" />
              </View>
            </TouchableOpacity>

            {/* Light Mode */}
            <TouchableOpacity 
              style={[
                styles.themeOption,
                selectedTheme === 'light' && styles.selectedTheme
              ]}
              onPress={() => setSelectedTheme('light')}
              accessibilityRole="radio"
              accessibilityState={{ checked: selectedTheme === 'light' }}
              accessibilityLabel="Light Mode"
            >
              <View style={styles.themeContent}>
                <View style={styles.radioContainer}>
                  <View style={[
                    styles.radioOuter,
                    selectedTheme === 'light' && styles.radioOuterSelected
                  ]}>
                    {selectedTheme === 'light' && (
                      <View style={styles.radioInner} />
                    )}
                  </View>
                  <View style={styles.themeTextContainer}>
                    <Text style={styles.themeTitle}>Light Mode</Text>
                    <Text style={styles.themeDescription}>Better for daylight viewing</Text>
                  </View>
                </View>
                <MaterialCommunityIcons name="white-balance-sunny" size={24} color="#9747FF" />
              </View>
            </TouchableOpacity>
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
              style={styles.applyButton}
              onPress={handleApply}
              accessibilityRole="button"
              accessibilityLabel="Apply theme"
            >
              <Text style={styles.applyButtonText}>Apply</Text>
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
    gap: 12,
    marginBottom: 24,
  },
  themeOption: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  selectedTheme: {
    borderColor: '#9747FF',
  },
  themeContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#6B7280',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioOuterSelected: {
    borderColor: '#9747FF',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#9747FF',
  },
  themeTextContainer: {
    gap: 4,
  },
  themeTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  themeDescription: {
    color: '#6B7280',
    fontSize: 14,
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
  applyButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#9747FF',
  },
  applyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
}); 