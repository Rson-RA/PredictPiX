import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import type { RootStackScreenProps } from '../navigation/types';

const CreateMarket2: React.FC<RootStackScreenProps<'CreateMarket2'>> = ({ navigation }) => {
  const [description, setDescription] = useState('');

  const handleBack = () => {
    navigation.goBack();
  };

  const handleContinue = () => {
    if (description.length >= 50) {
      navigation.navigate('CreateMarket3');
    }
  };

  const isValidLength = description.length >= 50 && description.length <= 1000;

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
            <Text style={styles.stepText}>Step 2 of 4</Text>
            <Text style={styles.stepDot}>•</Text>
            <Text style={styles.stepTitle}>Market Description</Text>
          </View>
          <TouchableOpacity onPress={handleBack}>
            <Icon name="help-circle-outline" size={24} color="#8B5CF6" />
          </TouchableOpacity>
        </View>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '50%' }]} />
        </View>
      </View>

      {/* Content Section */}
      <View style={styles.contentSection}>
        <Text style={styles.sectionTitle}>Market Description</Text>
        <Text style={styles.description}>
          Provide context or background for the prediction to help traders make informed decisions.
        </Text>

        <Text style={styles.label}>Description</Text>

        {/* Editor Toolbar */}
        <View style={styles.toolbar}>
          <TouchableOpacity style={styles.toolbarButton}>
            <Text style={styles.toolbarIcon}>B</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.toolbarButton}>
            <Text style={styles.toolbarIcon}>I</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.toolbarButton}>
            <Icon name="list" size={20} color="#94A3B8" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.toolbarButton}>
            <Icon name="link" size={20} color="#94A3B8" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.toolbarButton}>
            <Icon name="image" size={20} color="#94A3B8" />
          </TouchableOpacity>
        </View>

        {/* Description Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter market description"
            placeholderTextColor="#9CA3AF"
            value={description}
            onChangeText={setDescription}
            multiline
            maxLength={1000}
          />
          <Text style={styles.charCount}>{description.length}/1000</Text>
          <Text style={styles.minChars}>Min. 50 characters</Text>
        </View>

        {/* Image Upload */}
        <View style={styles.uploadContainer}>
          <View style={styles.uploadBox}>
            <Icon name="cloud-upload" size={24} color="#94A3B8" />
            <Text style={styles.uploadText}>Drag and drop or click to upload images</Text>
            <TouchableOpacity style={styles.uploadButton}>
              <Text style={styles.uploadButtonText}>Choose File</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Tips Section */}
        <View style={styles.tipsContainer}>
          <View style={styles.tipsHeader}>
            <Icon name="bulb" size={20} color="#8B5CF6" />
            <Text style={styles.tipsTitle}>Tips for a great description:</Text>
          </View>
          <View style={styles.tipsList}>
            <View style={styles.tipItem}>
              <Icon name="checkmark" size={16} color="#8B5CF6" />
              <Text style={styles.tipText}>Include relevant data sources</Text>
            </View>
            <View style={styles.tipItem}>
              <Icon name="checkmark" size={16} color="#8B5CF6" />
              <Text style={styles.tipText}>Explain market resolution criteria</Text>
            </View>
            <View style={styles.tipItem}>
              <Icon name="checkmark" size={16} color="#8B5CF6" />
              <Text style={styles.tipText}>Add supporting images or links</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Bottom Buttons */}
      <View style={styles.bottomButtons}>
        <TouchableOpacity style={styles.cancelButton} onPress={handleBack}>
          <Text style={styles.cancelButtonText}>Back</Text>
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
    color: '#888',
    fontWeight: '500',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#1E1E2D',
    borderRadius: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#8B5CF6',
    borderRadius: 4,
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
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 12,
  },
  toolbar: {
    flexDirection: 'row',
    backgroundColor: '#1E1E2D',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    padding: 8,
    gap: 8,
  },
  toolbarButton: {
    padding: 8,
  },
  inputContainer: {
    marginBottom: 24,
    position: 'relative',
  },
  input: {
    backgroundColor: '#1E1E2D',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    padding: 16,
    color: '#fff',
    fontSize: 16,
    minHeight: 120,
    textAlignVertical: 'top',
  },
  charCount: {
    position: 'absolute',
    right: 16,
    bottom: -24,
    color: '#94A3B8',
    fontSize: 14,
  },
  minChars: {
    position: 'absolute',
    left: 16,
    bottom: -24,
    color: '#94A3B8',
    fontSize: 14,
  },
  uploadContainer: {
    marginBottom: 24,
  },
  uploadBox: {
    borderWidth: 1,
    borderColor: '#1E1E2D',
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    gap: 12,
  },
  uploadText: {
    color: '#94A3B8',
    fontSize: 14,
  },
  uploadButton: {
    backgroundColor: '#1E1E2D',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  tipsContainer: {
    backgroundColor: '#1A1B25',
    borderRadius: 12,
    padding: 16,
  },
  tipsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  tipsTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  tipsList: {
    gap: 12,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  tipText: {
    color: '#94A3B8',
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
  toolbarIcon: {
    color: '#94A3B8',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CreateMarket2; 