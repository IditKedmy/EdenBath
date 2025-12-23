import React, {Dispatch} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import {Chip} from 'shared/components/*';
import {useDirection} from 'shared/utils/*';
import {colors, spacing, typography} from 'theme/index';

interface SelectOptionSectionProps {
  title: string;
  options: string[];
  selectedOption: string | null;
  setSelected: Dispatch<React.SetStateAction<string | null>>;
}

export function SelectOptionSection({
  title,
  options,
  selectedOption,
  setSelected,
}: SelectOptionSectionProps) {
  const {textAlign} = useDirection();

  if (options.length === 0) {
    return null;
  }

  const handlePress = (opt: string) => {
    setSelected(selectedOption === opt ? null : opt);
  };

  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, {textAlign}]}>{title}</Text>
      <View style={styles.chipsContainer}>
        {options.map(opt => (
          <Chip
            key={opt}
            label={opt}
            active={selectedOption === opt}
            onPress={() => handlePress(opt)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    padding: spacing.md,
    backgroundColor: colors.surface,
    marginBottom: spacing.sm,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
});
