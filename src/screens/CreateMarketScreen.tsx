import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import type { RootStackScreenProps } from '../navigation/types';

const CreateMarketScreen: React.FC<RootStackScreenProps<'CreateMarket'>> = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [date, setDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleContinue = () => {
    // Handle continue logic here
    navigation.navigate('CreateMarketStep2');
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const showDatePickerModal = () => {
    setShowDatePicker(true);
  };

  const formatDate = (date: Date | null) => {
    if (!date) return '';
    return date.toISOString().split('T')[0]; // Returns YYYY-MM-DD
  };

  return (
    <SafeAreaView style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#fff" />
          <Text style={styles.headerTitle}>Create Market</Text>
        </TouchableOpacity>
      </View>

      {/* Progress indicator */}
      <View style={styles.progressContainer}>
        <Text style={styles.stepText}>Step 1 of 4</Text>
        <Text style={styles.percentageText}>25%</Text>
        <View style={styles.progressBar}>
          <View style={styles.progressFill} />
        </View>
      </View>

      {/* Form */}
      <View style={styles.formContainer}>
        <Text style={styles.label}>Market Title</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., Will BTC reach $100k by Dec 2025?"
          placeholderTextColor="#9CA3AF"
        />

        <Text style={styles.label}>Category</Text>
        <View style={styles.categoryGrid}>
          <TouchableOpacity
            style={[
              styles.categoryButton,
              selectedCategory === 'crypto' && styles.categoryButtonActive,
            ]}
            onPress={() => setSelectedCategory('crypto')}
          >
            <Icon name="logo-bitcoin" size={24} color={selectedCategory === 'crypto' ? '#8B5CF6' : '#9CA3AF'} />
            <Text style={[styles.categoryText, selectedCategory === 'crypto' && styles.categoryTextActive]}>
              Crypto
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.categoryButton,
              selectedCategory === 'sports' && styles.categoryButtonActive,
            ]}
            onPress={() => setSelectedCategory('sports')}
          >
            <Icon name="football" size={24} color={selectedCategory === 'sports' ? '#8B5CF6' : '#9CA3AF'} />
            <Text style={[styles.categoryText, selectedCategory === 'sports' && styles.categoryTextActive]}>
              Sports
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.categoryButton,
              selectedCategory === 'politics' && styles.categoryButtonActive,
            ]}
            onPress={() => setSelectedCategory('politics')}
          >
            <Icon name="business" size={24} color={selectedCategory === 'politics' ? '#8B5CF6' : '#9CA3AF'} />
            <Text style={[styles.categoryText, selectedCategory === 'politics' && styles.categoryTextActive]}>
              Politics
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.categoryButton,
              selectedCategory === 'other' && styles.categoryButtonActive,
            ]}
            onPress={() => setSelectedCategory('other')}
          >
            <Icon name="star" size={24} color={selectedCategory === 'other' ? '#8B5CF6' : '#9CA3AF'} />
            <Text style={[styles.categoryText, selectedCategory === 'other' && styles.categoryTextActive]}>
              Other
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Resolution Date</Text>
        <View style={styles.dateInputContainer}>
          <TextInput
            style={styles.dateInput}
            placeholder="yyyy-mm-dd"
            placeholderTextColor="#9CA3AF"
            value={formatDate(date)}
            editable={false}
          />
          <TouchableOpacity style={styles.calendarButton} onPress={showDatePickerModal}>
            <Icon name="calendar-outline" size={24} color="#9CA3AF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Continue button */}
      <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={date || new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleDateChange}
          minimumDate={new Date()}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#111827',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 12,
  },
  progressContainer: {
    paddingHorizontal: 16,
    marginTop: 8,
  },
  stepText: {
    color: '#8B5CF6',
    fontSize: 18,
    marginBottom: 4,
  },
  percentageText: {
    color: '#fff',
    fontSize: 16,
    position: 'absolute',
    right: 16,
    top: 0,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#2D2E3D',
    borderRadius: 4,
    marginTop: 8,
  },
  progressFill: {
    width: '25%',
    height: '100%',
    backgroundColor: '#8B5CF6',
    borderRadius: 4,
  },
  formContainer: {
    flex: 1,
    padding: 16,
  },
  label: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 8,
    marginTop: 24,
  },
  input: {
    backgroundColor: '#2D2E3D',
    borderRadius: 12,
    padding: 16,
    color: '#fff',
    fontSize: 18,
  },
  dateInputContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    backgroundColor: '#2D2E3D',
    borderRadius: 12,
  },
  dateInput: {
    flex: 1,
    padding: 16,
    color: '#fff',
    fontSize: 18,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  calendarButton: {
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftWidth: 1,
    borderLeftColor: '#1A1B25',
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
    justifyContent: 'space-between',
  },
  categoryButton: {
    width: '48%',
    backgroundColor: '#2D2E3D',
    borderRadius: 12,
    paddingVertical: 24,
    paddingHorizontal: 16,
    margin: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  categoryButtonActive: {
    backgroundColor: '#2D2E3D',
    borderColor: '#8B5CF6',
  },
  categoryText: {
    color: '#9CA3AF',
    fontSize: 18,
    marginLeft: 8,
    fontWeight: '500',
  },
  categoryTextActive: {
    color: '#8B5CF6',
  },
  continueButton: {
    backgroundColor: '#8B5CF6',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CreateMarketScreen; 