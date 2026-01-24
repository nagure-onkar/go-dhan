import { lightColors, darkColors } from '@/constants/colors';
import spacing from '@/constants/spacing';
import typography from '@/constants/typography';

export type ThemeMode = 'light' | 'dark';

export type AppTheme = {
  colors: typeof lightColors;
  spacing: typeof spacing;
  typography: typeof typography;
  mode: ThemeMode;
};

export const LightTheme = {
  colors: lightColors,
  spacing,
  typography,
  mode: 'light' as const,
};

export const DarkTheme = {
  colors: darkColors,
  spacing,
  typography,
  mode: 'dark' as const,
};
