import React from "react";
import { StyleSheet, Text, View } from "react-native";

export type LifecycleStage = {
  id: string;
  title: string;
  description: string;
  status?: "completed" | "current" | "upcoming";
};

type Props = {
  item: LifecycleStage;
  isLast: boolean;
};

export const LifecycleItem: React.FC<Props> = ({ item, isLast }) => {
  return (
    <View style={styles.container}>
      {/* LEFT TIMELINE */}
      <View style={styles.timeline}>
        <View
          style={[
            styles.dot,
            item.status === "current" && styles.currentDot,
            item.status === "completed" && styles.completedDot,
          ]}
        />
        {!isLast && <View style={styles.line} />}
      </View>

      {/* RIGHT CONTENT */}
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 16,
  },
  timeline: {
    width: 40,
    alignItems: "center",
  },
  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#ccc",
    zIndex: 2,
  },
  completedDot: {
    backgroundColor: "#4CAF50",
  },
  currentDot: {
    backgroundColor: "#FF9800",
  },
  line: {
    width: 2,
    flex: 1,
    backgroundColor: "#ccc",
    marginTop: 2,
  },
  content: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    padding: 12,
    borderRadius: 8,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: "#555",
  },
});
