import {MD3LightTheme} from 'react-native-paper';
import {colors} from './colors';

export const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: colors.primary,
    secondary: colors.secondary,
    background: colors.white,
    surface: colors.white,
    error: colors.error,
    text: colors.primary,
    border: colors.border,
    success: colors.success,
    warning: colors.warning,
    white: colors.white,
    shadow: colors.black,
    ripple: colors.ripple,
  },
};
