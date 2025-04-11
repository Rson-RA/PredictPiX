import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import type { RootStackScreenProps } from '../navigation/types';

const CreateMarket3: React.FC<RootStackScreenProps<'CreateMarket3'>> = ({ navigation }) => {
  const [selectedType, setSelectedType] = useState<'binary' | 'multiple'>('binary');
  const [yesOutcome, setYesOutcome] = useState('Yes');
  const [yesDescription, setYesDescription] = useState('');
  const [noOutcome, setNoOutcome] = useState('No');
  const [noDescription, setNoDescription] = useState('');
  const [resolutionSource, setResolutionSource] = useState('');

  const handleBack = () => {
    navigation.goBack();
  };

  const handleContinue = () => {
    if (resolutionSource) {
      navigation.navigate('CreateMarket4');
    }
  };

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
            <Text style={styles.stepText}>Step 3 of 4</Text>
            <Text style={styles.stepDot}>•</Text>
            <Text style={styles.stepTitle}>Market Creation</Text>
          </View>
          <TouchableOpacity onPress={handleBack}>
            <Icon name="help-circle-outline" size={24} color="#8B5CF6" />
          </TouchableOpacity>
        </View>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '75%' }]} />
        </View>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Content Section */}
        <View style={styles.contentSection}>
          <Text style={styles.sectionTitle}>Market Outcomes</Text>
          <Text style={styles.description}>
            Define the possible outcomes for your prediction market.
          </Text>

          {/* Market Type Selection */}
          <View style={styles.typeSelection}>
            <TouchableOpacity 
              style={[
                styles.typeButton,
                selectedType === 'binary' && styles.typeButtonSelected
              ]}
              onPress={() => setSelectedType('binary')}
            >
              <Text style={[
                styles.typeButtonText,
                selectedType === 'binary' && styles.typeButtonTextSelected
              ]}>Binary (Yes/No)</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[
                styles.typeButton,
                selectedType === 'multiple' && styles.typeButtonSelected
              ]}
              onPress={() => setSelectedType('multiple')}
            >
              <Text style={[
                styles.typeButtonText,
                selectedType === 'multiple' && styles.typeButtonTextSelected
              ]}>Multiple Choice</Text>
            </TouchableOpacity>
          </View>

          {/* Yes Outcome */}
          <View style={styles.outcomeCard}>
            <View style={styles.outcomeHeader}>
              <Text style={styles.outcomeTitle}>Yes Outcome</Text>
              <View style={styles.outcomeTag}>
                <Text style={styles.outcomeTagText}>Yes</Text>
              </View>
            </View>
            <TextInput
              style={styles.outcomeInput}
              value={yesOutcome}
              onChangeText={setYesOutcome}
              placeholder="Yes"
              placeholderTextColor="#9CA3AF"
              editable={false}
            />
            <TextInput
              style={styles.outcomeDescriptionInput}
              value={yesDescription}
              onChangeText={setYesDescription}
              placeholder="Add description (optional)"
              placeholderTextColor="#9CA3AF"
              multiline
            />
          </View>

          {/* No Outcome */}
          <View style={styles.outcomeCard}>
            <View style={styles.outcomeHeader}>
              <Text style={styles.outcomeTitle}>No Outcome</Text>
              <View style={[styles.outcomeTag, styles.outcomeTagNo]}>
                <Text style={styles.outcomeTagText}>No</Text>
              </View>
            </View>
            <TextInput
              style={styles.outcomeInput}
              value={noOutcome}
              onChangeText={setNoOutcome}
              placeholder="No"
              placeholderTextColor="#9CA3AF"
              editable={false}
            />
            <TextInput
              style={styles.outcomeDescriptionInput}
              value={noDescription}
              onChangeText={setNoDescription}
              placeholder="Add description (optional)"
              placeholderTextColor="#9CA3AF"
              multiline
            />
          </View>

          {/* Resolution Source */}
          <View style={styles.resolutionCard}>
            <View style={styles.resolutionHeader}>
              <Icon name="information-circle" size={20} color="#8B5CF6" />
              <Text style={styles.resolutionTitle}>Resolution Source</Text>
            </View>
            <Text style={styles.resolutionDescription}>
              Specify where the outcome will be verified
            </Text>
            <TextInput
              style={styles.resolutionInput}
              value={resolutionSource}
              onChangeText={setResolutionSource}
              placeholder="Enter URL or description of resolution source"
              placeholderTextColor="#9CA3AF"
            />
          </View>
        </View>
      </ScrollView>

      {/* Bottom Buttons */}
      <View style={styles.bottomButtons}>
        <TouchableOpacity style={styles.cancelButton} onPress={handleBack}>
          <Text style={styles.cancelButtonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[
            styles.continueButton,
            !resolutionSource && styles.continueButtonDisabled
          ]} 
          onPress={handleContinue}
          disabled={!resolutionSource}
        >
          <Text style={[
            styles.continueButtonText,
            !resolutionSource && styles.continueButtonTextDisabled
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
    marginRight: 40,
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
    color: '#fff',
    fontWeight: '500',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#1E1E2D',
    borderRadius: 3,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#8B5CF6',
    borderRadius: 3,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 24,
  },
  contentSection: {
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
  typeSelection: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  typeButton: {
    flex: 1,
    backgroundColor: '#1E1E2D',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  typeButtonSelected: {
    backgroundColor: '#8B5CF6',
  },
  typeButtonText: {
    color: '#94A3B8',
    fontSize: 16,
    fontWeight: '600',
  },
  typeButtonTextSelected: {
    color: '#fff',
  },
  outcomeCard: {
    marginBottom: 24,
    backgroundColor: '#1A1B25',
    borderRadius: 12,
    padding: 16,
  },
  outcomeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  outcomeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  outcomeTag: {
    backgroundColor: '#15803D',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    opacity: 0.8,
  },
  outcomeTagNo: {
    backgroundColor: '#991B1B',
  },
  outcomeTagText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  outcomeInput: {
    backgroundColor: '#1E1E2D',
    borderRadius: 12,
    padding: 16,
    color: '#94A3B8',
    fontSize: 16,
    marginBottom: 12,
  },
  outcomeDescriptionInput: {
    backgroundColor: '#1E1E2D',
    borderRadius: 12,
    padding: 16,
    color: '#fff',
    fontSize: 16,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  resolutionCard: {
    marginBottom: 24,
    backgroundColor: '#1A1B25',
    borderRadius: 12,
    padding: 16,
  },
  resolutionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  resolutionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  resolutionDescription: {
    fontSize: 14,
    color: '#94A3B8',
    marginBottom: 12,
  },
  resolutionInput: {
    backgroundColor: '#1E1E2D',
    borderRadius: 12,
    padding: 16,
    color: '#fff',
    fontSize: 16,
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

export default CreateMarket3; 