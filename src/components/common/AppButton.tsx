import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import AppText from './AppText';
import { useTheme } from '@/theme/useTheme';

type Props = {
  title: string;
  onPress: () => void;
};

const AppButton = ({ title, onPress }: Props) => {
  const { colors, spacing } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={[
        styles.button,
        {
          backgroundColor: colors.primary,
          paddingVertical: spacing.sm,
        },
      ]}
    >
      <AppText inverse>{title}</AppText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    alignItems: 'center',
  },
});

export default AppButton;
