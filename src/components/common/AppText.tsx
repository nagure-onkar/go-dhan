import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { useTheme } from '@/theme/useTheme';

interface Props extends TextProps {
  inverse?: boolean;
}

const AppText: React.FC<Props> = ({ style, inverse, children, ...props }) => {
  const { colors, typography } = useTheme();

  return (
    <Text
      {...props}
      style={[
        styles.text,
        {
          color: inverse ? colors.textInverse : colors.text,
          fontFamily: typography.fontRegular,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
  },
});

export default AppText;
