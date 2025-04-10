import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import type { RootStackScreenProps } from '../navigation/types';

const CreateMarket1: React.FC<RootStackScreenProps<'CreateMarket1'>> = ({ navigation }) => {
  const [title, setTitle] = useState('');

  const handleBack = () => {
    navigation.goBack();
  };

  const handleContinue = () => {
    if (title.length >= 10) {
      navigation.navigate('CreateMarket2');
    }
  };

  const isValidLength = title.length >= 10 && title.length <= 100;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Create Market</Text>
        </View>
      </View>

      {/* Progress Section */}
      <View style={styles.progressSection}>
        <View style={styles.progressHeader}>
          <View style={styles.progressInfo}>
            <Text style={styles.stepText}>Step 1 of 4</Text>
            <Text style={styles.stepDot}>•</Text>
            <Text style={styles.stepTitle}>Market Title</Text>
          </View>
          <TouchableOpacity onPress={handleBack}>
            <Icon name="help-circle-outline" size={24} color="#8B5CF6" />
          </TouchableOpacity>
        </View>
        <View style={styles.progressBar}>
          <View style={styles.progressFill} />
        </View>
      </View>

      {/* Title Section */}
      <View style={styles.contentSection}>
        <Text style={styles.sectionTitle}>Market Title</Text>
        <Text style={styles.description}>
          Create a clear and specific title for your prediction market. Make it easy to understand and verify.
        </Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter market title"
            placeholderTextColor="#9CA3AF"
            value={title}
            onChangeText={setTitle}
            multiline
            maxLength={100}
          />
          <Text style={styles.charCount}>{title.length}/100</Text>
          {isValidLength && (
            <View style={styles.validIcon}>
              <Icon name="checkmark-circle" size={20} color="#10B981" />
              <Text style={styles.validText}>Valid length</Text>
            </View>
          )}
        </View>

        {/* Requirements */}
        <View style={styles.requirementsContainer}>
          <Text style={styles.requirementsTitle}>Title Requirements:</Text>
          <View style={styles.requirement}>
            <Icon 
              name={title.length >= 10 ? "checkmark-circle" : "ellipse-outline"} 
              size={20} 
              color={title.length >= 10 ? "#10B981" : "#6B7280"} 
            />
            <Text style={styles.requirementText}>Minimum 10 characters</Text>
          </View>
          <View style={styles.requirement}>
            <Icon 
              name={title.length <= 100 ? "checkmark-circle" : "ellipse-outline"} 
              size={20} 
              color={title.length <= 100 ? "#10B981" : "#6B7280"} 
            />
            <Text style={styles.requirementText}>Maximum 100 characters</Text>
          </View>
          <View style={styles.requirement}>
            <Icon 
              name={title.length >= 10 ? "checkmark-circle" : "ellipse-outline"} 
              size={20} 
              color={title.length >= 10 ? "#10B981" : "#6B7280"} 
            />
            <Text style={styles.requirementText}>Clear and specific</Text>
          </View>
        </View>

        {/* Example Titles */}
        <View style={styles.examplesContainer}>
          <View style={styles.examplesHeader}>
            <Text style={styles.examplesTitle}>Example Titles:</Text>
            <TouchableOpacity>
              <Text style={styles.seeMoreText}>See More</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.examples}>
            <View style={styles.example}>
              <Icon name="ellipse" size={8} color="#8B5CF6" />
              <Text style={styles.exampleText}>Will Bitcoin reach $100k by end of 2025?</Text>
            </View>
            <View style={styles.example}>
              <Icon name="ellipse" size={8} color="#8B5CF6" />
              <Text style={styles.exampleText}>Will SpaceX launch Starship successfully in 2025?</Text>
            </View>
            <View style={styles.example}>
              <Icon name="ellipse" size={8} color="#8B5CF6" />
              <Text style={styles.exampleText}>Will Tesla release a sub-$30k EV in 2025?</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Bottom Buttons */}
      <View style={styles.bottomButtons}>
        <TouchableOpacity style={styles.cancelButton} onPress={handleBack}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[
            styles.continueButton,
            !isValidLength && styles.continueButtonDisabled
          ]} 
          onPress={handleContinue}
          disabled={!isValidLength}
        >
          <Text style={[
            styles.continueButtonText,
            !isValidLength && styles.continueButtonTextDisabled
          ]}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0F',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
    marginRight: 40, // To offset the back button width and keep the title centered
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
  },
  backButton: {
    padding: 4,
  },
  progressSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepText: {
    fontSize: 14,
    color: '#8B5CF6',
  },
  stepDot: {
    fontSize: 14,
    color: '#8B5CF6',
    marginHorizontal: 8,
  },
  stepTitle: {
    fontSize: 14,
    color: '#888888',
    fontWeight: '600',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#1E1E2D',
    borderRadius: 3,
  },
  progressFill: {
    width: '25%',
    height: '100%',
    backgroundColor: '#8B5CF6',
    borderRadius: 3,
  },
  contentSection: {
    flex: 1,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#94A3B8',
    marginBottom: 24,
    lineHeight: 24,
  },
  inputContainer: {
    marginBottom: 24,
    position: 'relative',
  },
  input: {
    backgroundColor: '#1E1E2D',
    borderRadius: 12,
    padding: 16,
    color: '#fff',
    fontSize: 16,
    minHeight: 56,
    borderWidth: 1,
    borderColor: '#2A2B35',
  },
  charCount: {
    position: 'absolute',
    right: 16,
    bottom: -24,
    color: '#94A3B8',
    fontSize: 14,
  },
  validIcon: {
    position: 'absolute',
    right: 16,
    top: 18,
    flexDirection: 'row',
    alignItems: 'center',
  },
  validText: {
    color: '#10B981',
    marginLeft: 4,
    fontSize: 14,
  },
  requirementsContainer: {
    marginBottom: 32,
  },
  requirementsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 16,
  },
  requirement: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  requirementText: {
    color: '#9CA3AF',
    marginLeft: 8,
    fontSize: 14,
  },
  examplesContainer: {
    backgroundColor: '#1A1B25',
    borderRadius: 12,
    padding: 16,
  },
  examplesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  examplesTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  seeMoreText: {
    color: '#8B5CF6',
    fontSize: 14,
  },
  examples: {
    gap: 12,
  },
  example: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  exampleText: {
    color: '#9CA3AF',
    fontSize: 14,
  },
  bottomButtons: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
    backgroundColor: '#0A0A0F',
    borderTopWidth: 1,
    borderTopColor: '#1E1E2D',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#1E1E2D',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  continueButton: {
    flex: 1,
    backgroundColor: '#6366F1',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  continueButtonDisabled: {
    backgroundColor: '#1E1E2D',
    opacity: 0.5,
  },
  cancelButtonText: {
    color: '#94A3B8',
    fontSize: 16,
    fontWeight: '600',
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  continueButtonTextDisabled: {
    color: '#94A3B8',
  },
});

export default CreateMarket1; 