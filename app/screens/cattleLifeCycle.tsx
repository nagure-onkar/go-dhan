import { LifecycleItem, LifecycleStage } from "@/components/LifecycleItem";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";

const lifecycleData: LifecycleStage[] = [
  {
    id: "1",
    title: "Birth",
    description:
      "Calf is born. Record date of birth, weight and health status.",
    status: "completed",
  },
  {
    id: "2",
    title: "Weaning",
    description: "Transition from milk to solid feed.",
    status: "completed",
  },
  {
    id: "3",
    title: "Puberty",
    description: "Cattle becomes ready for breeding.",
    status: "current",
  },
  {
    id: "4",
    title: "Pregnancy",
    description: "Gestation period with monthly health monitoring.",
    status: "upcoming",
  },
  {
    id: "5",
    title: "Lactation",
    description: "Milk production cycle after calving.",
    status: "upcoming",
  },
];

export function CattleLifecycleScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {lifecycleData.map((item, index) => (
        <LifecycleItem
          key={item.id}
          item={item}
          isLast={index === lifecycleData.length - 1}
        />
      ))}
    </ScrollView>
  );
}

export default CattleLifecycleScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});
