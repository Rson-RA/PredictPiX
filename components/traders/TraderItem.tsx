import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Colors } from '@/constants/Colors';
import { getFullAvatarUrl } from '@/utils';

type Trader = {
  id: string;
  firstname: string;
  lastname: string;
  username: string;
  avatar_url?: string;
  totalProfit: number;
  rank: number;
}

type TraderItemProps = {
  trader: Trader;
}

const TraderItem = ({ trader }: TraderItemProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
      <Text style={[styles.traderRank, { color: '#FFB800' }]}>{trader.rank || ""}</Text>
        <Image
          source={{ uri: getFullAvatarUrl(trader.avatar_url) || 'https://via.placeholder.com/40' }}
          style={styles.avatar}
        />
        <View style={styles.info}>
          <Text style={styles.name}>{trader.firstname} {trader.lastname}</Text>
          <Text style={styles.username}>@{trader.username}</Text>
        </View>
      </View>
      <View style={styles.stats}>
        // <Text style={styles.winRate}>Win Rate: {trader.winRate}%</Text>
        <Text style={styles.profit}>Profit: ${trader.totalProfit?.toFixed(2)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: Colors.background,
    borderRadius: 8,
    marginVertical: 4,
    borderWidth: 1,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  info: {
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.dark.text,
  },
  username: {
    fontSize: 14,
    color: Colors.dark.text,
  },
  stats: {
    alignItems: 'flex-end',
  },
  winRate: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.success,
  },
  profit: {
    fontSize: 14,
    color: Colors.success,
  },
  traderRank: {
    fontSize: 16,
    fontWeight: '600',
    width: 24,
  },
});

export default TraderItem; 