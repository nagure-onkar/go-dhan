import { useTheme } from "@/theme/useTheme";
import { Stack } from "expo-router";

export default function LifecycleLayout() {
  const { colors } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTitleStyle: {
          color: colors.text,
          fontWeight: "600",
        },
        headerTintColor: colors.primary,
      }}
    />
  );
}
