import { useTheme } from "@/theme/useTheme";
import { Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function CalvedScreen() {
  const { colors } = useTheme();

  return (
    <>
      <Stack.Screen
        options={{
          title: "Calved",
        }}
      />

      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.title, { color: colors.text }]}>Calved</Text>

        <Text style={[styles.subtitle, { color: colors.text, opacity: 0.7 }]}>
          Feature coming soon 🚧
        </Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
  },
});
