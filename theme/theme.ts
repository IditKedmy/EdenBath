import {MD3LightTheme} from 'react-native-paper';
import {colors} from './colors';

export const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: colors.primary,
    secondary: colors.accent,
    accent: colors.accent,
    background: colors.background,
    surface: colors.surface,
    error: colors.error,
    text: colors.textPrimary,
    onSurface: colors.textPrimary,
    onBackground: colors.textPrimary,
    border: colors.border,
    success: colors.success,
    warning: colors.warning,
    white: colors.white,
    shadow: colors.black,
    ripple: colors.ripple,
  },
};
