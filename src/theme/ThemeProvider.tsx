import React, { ReactNode, useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { ThemeContext } from './ThemeContext';
import { LightTheme, DarkTheme } from './theme';

type Props = {
  children: ReactNode;
};

const ThemeProvider = ({ children }: Props) => {
  const colorScheme = useColorScheme();

  const theme = useMemo(() => {
    return colorScheme === 'dark' ? DarkTheme : LightTheme;
  }, [colorScheme]);

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
