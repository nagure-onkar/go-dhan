import AppText from "@/components/common/AppText";
import { LifecycleItem, LifecycleStage } from "@/components/LifecycleItem";
import { useTheme } from "@/theme/useTheme";
import { reproductionCycleRouteMap } from "app/navigation/AppNavigator";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

const ITEM_HEIGHT = 110;

const lifecycleData: LifecycleStage[] = [
  {
    id: "1",
    title: "Calf",
    description:
      "Newborn calf stage. Focus on colostrum feeding, vaccinations, and early health monitoring.",
    status: "completed",
  },
  {
    id: "2",
    title: "Young Calf",
    description:
      "Growth phase before maturity. Monitor weight gain, nutrition, and disease prevention.",
    status: "completed",
  },
  {
    id: "3",
    title: "Heifer",
    description:
      "Female cattle that has not yet calved. Ready for breeding preparation.",
    status: "completed",
  },
  {
    id: "4",
    title: "On Heat",
    description:
      "Estrus period detected. Optimal time window for insemination.",
    status: "completed",
  },
  {
    id: "5",
    title: "Insemination",
    description:
      "Artificial or natural insemination performed. Record semen details and date.",
    status: "completed",
  },
  {
    id: "6",
    title: "Pregnancy Test",
    description: "Pregnancy confirmation done after insemination.",
    status: "current",
  },
  {
    id: "7",
    title: "Dry Off",
    description: "Lactation stopped to allow rest before next calving.",
    status: "upcoming",
  },
  {
    id: "8",
    title: "Calved",
    description: "Cattle has calved successfully and enters lactation cycle.",
    status: "upcoming",
  },
];

export function CattleRepeoductionCycleScreen() {
  const { cattleId } = useLocalSearchParams<{ cattleId: string }>();

  const router = useRouter();
  const { colors } = useTheme();
  const scrollRef = useRef<ScrollView>(null);

  const currentIndex = lifecycleData.findIndex(
    (item) => item.status === "current",
  );

  useEffect(() => {
    if (currentIndex >= 0 && scrollRef.current) {
      const offset = Math.max(currentIndex * ITEM_HEIGHT - ITEM_HEIGHT, 0);

      scrollRef.current.scrollTo({
        y: offset,
        animated: true,
      });
    }
  }, [currentIndex]);

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: () => (
            <View style={{ alignItems: "flex-start" }}>
              <AppText style={{ fontSize: 16, fontWeight: "700" }}>
                Cattle Reproduction Cycle
              </AppText>
              <AppText style={{ fontSize: 12, opacity: 0.8 }}>
                ID: {cattleId}
              </AppText>
            </View>
          ),
        }}
      />

      <View style={[styles.screen, { backgroundColor: colors.background }]}>
        <ScrollView
          ref={scrollRef}
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
        >
          {lifecycleData.map((item, index) => (
            <LifecycleItem
              key={item.id}
              item={item}
              isLast={index === lifecycleData.length - 1}
              onPress={() => {
                const route = reproductionCycleRouteMap[item.id];
                if (route) {
                  router.push(route as any);
                }
              }}
            />
          ))}
        </ScrollView>
      </View>
    </>
  );
}

export default CattleRepeoductionCycleScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    padding: 16,
    paddingBottom: 32,
  },
});
