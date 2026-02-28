import AppText from "@/components/common/AppText";
import { useTheme } from "@/theme/useTheme";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function Administration() {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <AppText style={styles.title}>Administration Panel</AppText>
      <AppText>Temporary Admin Page</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    marginBottom: 10,
  },
});
