import AppText from "@/components/common/AppText";
import ScreenWrapper from "@/components/common/ScreenWrapper";
import { useLanguage } from "@/constants/localization/useLanguage";
import { commonPageStyles } from "@/constants/styles/pageStyling";
import { useTheme } from "@/theme/useTheme";
import { StyleSheet, View } from "react-native";

export default function HomeScreen() {
  const { t, setLanguage, language } = useLanguage();
  const { colors } = useTheme();

  const stats = [
    { id: 1, number: 24, emoji: "𓃖", label: "Total Animals" },
    { id: 2, number: 16, emoji: "🐄", label: "Cattle" },
    { id: 3, number: 8, emoji: "𓃔", label: "Calves" },
  ];

  return (
    <ScreenWrapper>
      <View style={commonPageStyles.container}>
        {/* Horizontal Cards Row */}
        <View style={styles.row}>
          {stats.map((item) => {
            return (
              <View
                key={item.id}
                style={[styles.card, { backgroundColor: colors.card }]}
              >
                <AppText style={styles.number}>{item.number}</AppText>
                <AppText style={styles.emoji}>{item.emoji}</AppText>
                <AppText style={styles.label}>{item.label}</AppText>
              </View>
            );
          })}
        </View>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 0, // reduce top space
    marginBottom: 2,
    width: "100%", // IMPORTANT — makes it span full screen
  },
  card: {
    padding: 8,
    borderRadius: 16,
    alignItems: "center",
    width: "30%", // 3 cards in one row
    elevation: 3,
  },
  number: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 8,
  },
  label: {
    marginTop: 6,
    fontSize: 12,
    textAlign: "center",
  },
  emoji: {
    fontSize: 28,
    marginVertical: 6,
  },
});
