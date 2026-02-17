import { useTheme } from '@/theme/useTheme';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import {
  Cow,
  CurrencyInr,
  Grains,
  House,
  MagnifyingGlass,
} from 'phosphor-react-native';
import React from 'react';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';

const ANDROID_NAV_BAR_HEIGHT = Platform.OS === 'android' ? 24 : 0;

const icons = {
  index: House,
  feed: Grains,
  search: MagnifyingGlass,
  lactation: Cow, // 🍼
  profit: CurrencyInr,
} as const;

export default function BottomTabBar({
  state,
  navigation,
}: BottomTabBarProps) {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      {state.routes.map((route, index) => {
        const isSearch = route.name === 'search';
        const isFocused = state.index === index;

        // console.log('Route name:', route.name);

        const Icon =
          icons[route.name as keyof typeof icons] || House;

        return (
          <TouchableOpacity
            key={route.key}
            onPress={() => navigation.navigate(route.name)}
            style={isSearch ? styles.searchButton : styles.tabButton}
          >
            <Icon
              size={isSearch ? 32 : 28}
              weight={isFocused || isSearch ? 'fill' : 'regular'}
              color={
                isSearch
                  ? colors.textInverse
                  : isFocused
                  ? colors.primary
                  : colors.text
              }
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 70 + ANDROID_NAV_BAR_HEIGHT,
    paddingBottom: ANDROID_NAV_BAR_HEIGHT,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  tabButton: {
    padding: 10,
  },
  searchButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -32,
  },
});
