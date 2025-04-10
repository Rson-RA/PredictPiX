import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

interface TopTraderCardProps {
  rank: number;
  name: string;
  profit: string;
  avatar: any;
  onPress?: () => void;
}

const TopTraderCard: React.FC<TopTraderCardProps> = ({
  rank,
  name,
  profit,
  avatar,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.traderInfo}>
        <Text style={[styles.rank, styles[`rank${rank}` as keyof typeof styles]]}>
          {rank}
        </Text>
        <Image source={avatar} style={styles.avatar} />
        <Text style={styles.name}>{name}</Text>
      </View>
      <Text style={styles.profit}>{profit}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: '#1F2937',
    marginBottom: 8,
    marginHorizontal: 8,
    borderRadius: 12,
  },
  traderInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rank: {
    fontSize: 20,
    fontWeight: '700',
    width: 28,
  },
  rank1: {
    color: '#FFA500', // Orange/Gold
  },
  rank2: {
    color: '#A0A0A0', // Light Silver
  },
  rank3: {
    color: '#CD7F32', // Bronze
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 12,
    marginRight: 16,
  },
  name: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  profit: {
    color: '#4ADE80',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default TopTraderCard; 