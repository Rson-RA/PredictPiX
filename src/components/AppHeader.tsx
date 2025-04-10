import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface AppHeaderProps {
  title: string;
}

const AppHeader: React.FC<AppHeaderProps> = ({ title }) => (
  <View style={styles.headerContainer}>
    <View style={styles.headerLeft}>
      <Icon name="stats-chart" size={24} color="#7B61FF" />
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
    <View style={styles.headerRight}>
      <Icon name="notifications-outline" size={24} color="#fff" style={styles.headerIcon} />
      <Icon name="wallet-outline" size={24} color="#fff" />
    </View>
  </View>
);

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#0A0A0F',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 8,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    marginRight: 16,
  },
});

export default AppHeader; 