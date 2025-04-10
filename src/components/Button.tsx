import React from 'react';
import {TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle} from 'react-native';
import {colors, typography, spacing, borderRadius} from '../styles/theme';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  style?: ViewStyle;
}

const Button = ({label, onPress, variant = 'primary', style}: ButtonProps): JSX.Element => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        variant === 'primary' ? styles.primary : styles.secondary,
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.7}>
      <Text
        style={[
          styles.label,
          variant === 'primary' ? styles.primaryLabel : styles.secondaryLabel,
        ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  } as ViewStyle,
  primary: {
    backgroundColor: colors.accent.primary,
  } as ViewStyle,
  secondary: {
    backgroundColor: colors.background.tertiary,
  } as ViewStyle,
  label: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.medium,
  } as TextStyle,
  primaryLabel: {
    color: colors.text.primary,
  } as TextStyle,
  secondaryLabel: {
    color: colors.text.primary,
  } as TextStyle,
});

export default Button; 