import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import {colors, spacing, typography} from '../../../theme';

interface ChipProps {
  label: string;
  active?: boolean;
  onPress?: () => void;
}

export const Chip: React.FC<ChipProps> = ({label, active = false, onPress}) => {
  return (
    <TouchableOpacity
      style={[styles.chip, active && styles.activeChip]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.text, active && styles.activeText]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chip: {
    height: 32,
    paddingHorizontal: spacing.md,
    borderRadius: 16,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeChip: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  text: {
    ...typography.bodySmall,
    color: colors.textPrimary,
  },
  activeText: {
    color: colors.white,
  },
});
