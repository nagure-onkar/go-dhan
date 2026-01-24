import { createContext } from 'react';
import type { AppTheme } from './theme';
import { LightTheme } from './theme';

export const ThemeContext = createContext<AppTheme>(LightTheme);
