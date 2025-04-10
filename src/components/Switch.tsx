import React from 'react';
import {Switch as RNSwitch, StyleSheet, View, Text} from 'react-native';

interface SwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  label?: string;
  description?: string;
}

const Switch: React.FC<SwitchProps> = ({
  value,
  onValueChange,
  label,
  description,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        {label && <Text style={styles.label}>{label}</Text>}
        {description && <Text style={styles.description}>{description}</Text>}
      </View>
      <RNSwitch
        value={value}
        onValueChange={onValueChange}
        trackColor={{false: '#3f4046', true: '#7c3aed'}}
        thumbColor="#ffffff"
        ios_backgroundColor="#3f4046"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  textContainer: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#9ca3af',
  },
});

export default Switch; 