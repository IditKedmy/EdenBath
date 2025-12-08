import React from 'react';
import {View, StyleSheet, TextInput, TextInputProps} from 'react-native';
import {Text} from 'react-native-paper';
import {colors, spacing, typography} from '../../../theme';
import {useDirection} from '../../utils';

interface InputProps extends TextInputProps {
  label: string;
  error?: string;
  required?: boolean;
}

export const Input: React.FC<InputProps> = ({label, error, required, style, ...props}) => {
  const {textAlign} = useDirection();

  return (
    <View style={styles.container}>
      {label && (
        <Text style={[styles.label, {textAlign}]}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
      )}
      <TextInput
        style={[styles.input, {textAlign}, error && styles.inputError, style]}
        placeholderTextColor={colors.textSecondary}
        {...props}
      />
      {error && <Text style={[styles.errorText, {textAlign}]}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  label: {
    ...typography.bodySmall,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  required: {
    color: colors.error,
  },
  input: {
    ...typography.body,
    height: 48,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.surface,
    color: colors.textPrimary,
  },
  inputError: {
    borderColor: colors.error,
  },
  errorText: {
    ...typography.caption,
    color: colors.error,
    marginTop: spacing.xs,
  },
});
