import React from 'react';
import {TouchableOpacity, StyleSheet, ViewStyle, TextStyle} from 'react-native';
import {Text} from 'react-native-paper';
import {colors, spacing, typography} from '../../../theme';
import {useDirection} from '../../utils';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  style?: ViewStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  style,
}) => {
  const {isMobile} = useDirection();

  const buttonStyle: ViewStyle[] = [
    styles.button,
    variant === 'primary' ? styles.primary : undefined,
    variant === 'secondary' ? styles.secondary : undefined,
    variant === 'tertiary' ? styles.tertiary : undefined,
    isMobile ? styles.mobileButton : undefined,
    disabled ? styles.disabled : undefined,
    style,
  ].filter(Boolean) as ViewStyle[];

  const textStyle: TextStyle[] = [
    styles.text,
    variant === 'primary' ? styles.primaryText : undefined,
    variant === 'secondary' ? styles.secondaryText : undefined,
    variant === 'tertiary' ? styles.tertiaryText : undefined,
    disabled ? styles.disabledText : undefined,
  ].filter(Boolean) as TextStyle[];

  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress} disabled={disabled} activeOpacity={0.7}>
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  mobileButton: {
    width: '90%',
    alignSelf: 'center',
  },
  primary: {
    backgroundColor: colors.accent,
  },
  secondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.accent,
  },
  tertiary: {
    backgroundColor: 'transparent',
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    ...typography.button,
    color: colors.white,
  },
  primaryText: {
    color: colors.white,
  },
  secondaryText: {
    color: colors.accent,
  },
  tertiaryText: {
    color: colors.accent,
  },
  disabledText: {
    opacity: 0.7,
  },
});
