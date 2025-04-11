import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import type { RootStackScreenProps } from '../navigation/types';

const CreateMarket4: React.FC<RootStackScreenProps<'CreateMarket4'>> = ({ navigation, route }) => {
  const handleBack = () => {
    navigation.goBack();
  };

  const handleEdit = (section: 'title' | 'description' | 'outcomes') => {
    switch (section) {
      case 'title':
        navigation.navigate('CreateMarket1');
        break;
      case 'description':
        navigation.navigate('CreateMarket2');
        break;
      case 'outcomes':
        navigation.navigate('CreateMarket3');
        break;
    }
  };

  const handleSubmit = () => {
    // TODO: Implement market submission
    navigation.navigate('Main', { screen: 'Markets' });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Review Market</Text>
        </View>
      </View>

      {/* Progress Section */}
      <View style={styles.progressSection}>
        <View style={styles.progressHeader}>
          <View style={styles.progressInfo}>
            <Text style={styles.stepText}>Step 4 of 4</Text>
            <Text style={styles.stepDot}>•</Text>
            <Text style={styles.stepTitle}>Final Review</Text>
          </View>
        </View>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '100%' }]} />
        </View>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Content Section */}
        <View style={styles.contentSection}>
          {/* Market Title */}
          <View style={styles.reviewCard}>
            <View style={styles.reviewHeader}>
              <Text style={styles.reviewTitle}>Market Title</Text>
              <TouchableOpacity onPress={() => handleEdit('title')}>
                <View style={styles.editButton}>
                  <Icon name="pencil" size={16} color="#8B5CF6" />
                  <Text style={styles.editButtonText}>Edit</Text>
                </View>
              </TouchableOpacity>
            </View>
            <Text style={styles.reviewContent}>Will Bitcoin reach $100k by end of 2025?</Text>
          </View>

          {/* Description */}
          <View style={styles.reviewCard}>
            <View style={styles.reviewHeader}>
              <Text style={styles.reviewTitle}>Description</Text>
              <TouchableOpacity onPress={() => handleEdit('description')}>
                <View style={styles.editButton}>
                  <Icon name="pencil" size={16} color="#8B5CF6" />
                  <Text style={styles.editButtonText}>Edit</Text>
                </View>
              </TouchableOpacity>
            </View>
            <Text style={styles.reviewContent}>
              This market will resolve to YES if Bitcoin reaches or exceeds $100,000 USD on any major cryptocurrency exchange before December 31st, 2025.
            </Text>
          </View>

          {/* Outcomes */}
          <View style={styles.reviewCard}>
            <View style={styles.reviewHeader}>
              <Text style={styles.reviewTitle}>Outcomes</Text>
              <TouchableOpacity onPress={() => handleEdit('outcomes')}>
                <View style={styles.editButton}>
                  <Icon name="pencil" size={16} color="#8B5CF6" />
                  <Text style={styles.editButtonText}>Edit</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.outcomesContainer}>
              <View style={styles.outcomeCard}>
                <View style={styles.outcomeItem}>
                  <View style={styles.outcomeIndicatorYes} />
                  <Text style={styles.outcomeText}>Yes</Text>
                </View>
              </View>
              <View style={styles.outcomeCard}>
                <View style={styles.outcomeItem}>
                  <View style={styles.outcomeIndicatorNo} />
                  <Text style={styles.outcomeText}>No</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Ready to Launch */}
          <View style={styles.launchCard}>
            <View style={styles.launchHeader}>
              <Icon name="information-circle" size={20} color="#8B5CF6" />
              <Text style={styles.launchTitle}>Ready to Launch?</Text>
            </View>
            <Text style={styles.launchDescription}>
              Once submitted, your market will be reviewed by our team before going live.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Buttons */}
      <View style={styles.bottomButtons}>
        <TouchableOpacity style={styles.cancelButton} onPress={handleBack}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Icon name="checkmark" size={20} color="#fff" />
          <Text style={styles.submitButtonText}>Submit Market</Text>
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
  reviewCard: {
    backgroundColor: '#1A1B25',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  reviewTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editButtonText: {
    fontSize: 14,
    color: '#8B5CF6',
    fontWeight: '500',
  },
  reviewContent: {
    fontSize: 16,
    color: '#94A3B8',
    lineHeight: 24,
  },
  outcomesContainer: {
    backgroundColor: '#0F0F13',
    borderRadius: 8,
    overflow: 'hidden',
    gap: 1,
  },
  outcomeCard: {
    backgroundColor: '#1E1E2D',
    padding: 4,
  },
  outcomeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
  },
  outcomeIndicatorYes: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#15803D',
  },
  outcomeIndicatorNo: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#991B1B',
  },
  outcomeText: {
    fontSize: 16,
    color: '#fff',
  },
  launchCard: {
    backgroundColor: '#1A1B25',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  launchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  launchTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  launchDescription: {
    fontSize: 14,
    color: '#94A3B8',
    lineHeight: 20,
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
  submitButton: {
    flex: 1,
    backgroundColor: '#6366F1',
    paddingVertical: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  cancelButtonText: {
    color: '#94A3B8',
    fontSize: 16,
    fontWeight: '600',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CreateMarket4; 