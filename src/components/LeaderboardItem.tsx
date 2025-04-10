import React from 'react';
import { View, Text, Image, StyleSheet, ImageSourcePropType } from 'react-native';
import Card from './Card';

interface LeaderboardItemProps {
  rank: number;
  name: string;
  username: string;
  volume: number;
  profit: number;
  trades: number;
  avatar: ImageSourcePropType;
}

const LeaderboardItem: React.FC<LeaderboardItemProps> = ({
  rank,
  name,
  username,
  volume,
  profit,
  trades,
  avatar,
}) => {
  return (
    <Card style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.rank}>#{rank}</Text>
        <Image source={avatar} style={styles.avatar} />
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.username}>{username}</Text>
        </View>
      </View>
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Volume</Text>
          <Text style={styles.volumeValue}>${(volume / 1000000).toFixed(1)}M</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Profit</Text>
          <Text style={styles.profitValue}>${(profit / 1000).toFixed(0)}K</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Trades</Text>
          <Text style={styles.tradesValue}>{trades.toLocaleString()}</Text>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    padding: 16,
    paddingBottom: 0,
  },
  rank: {
    color: '#A78BFA',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 12,
    width: 28,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
  },
  nameContainer: {
    flex: 1,
  },
  name: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  username: {
    color: '#8E8E93',
    fontSize: 14,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    padding: 16,
    paddingTop: 16,
  },
  statItem: {
    flex: 1,
    backgroundColor: '#11182780',
    borderRadius: 12,
    padding: 12,
  },
  statLabel: {
    color: '#8E8E93',
    fontSize: 13,
    marginBottom: 4,
  },
  volumeValue: {
    color: '#A78BFA',
    fontSize: 16,
    fontWeight: '600',
  },
  profitValue: {
    color: '#34D399',
    fontSize: 16,
    fontWeight: '600',
  },
  tradesValue: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default LeaderboardItem; 