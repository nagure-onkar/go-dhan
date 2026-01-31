import { useTheme } from "@/theme/useTheme";
import { liveStockRouteMap } from "app/navigation/AppNavigator";
import { Stack, useRouter } from "expo-router";
import {
  CalendarCheck,
  ClipboardText,
  PencilSimple,
  Syringe,
} from "phosphor-react-native";
import React, { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

/* ---------------- MOCK DATA ---------------- */

type Cattle = {
  id: string;
  name: string;
  type: string;
  reproductionState: string;
  weight: number;
  worker: string;
};

const cattleList: Cattle[] = [
  {
    id: "C-101",
    name: "Abcde",
    type: "Cow",
    reproductionState: "Pregnant",
    weight: 420,
    worker: "Ramesh",
  },
  {
    id: "C-102",
    name: "Fghi",
    type: "Buffalo",
    reproductionState: "Lactating",
    weight: 510,
    worker: "Suresh",
  },
  {
    id: "C-103",
    name: "Abcde",
    type: "Cow",
    reproductionState: "Pregnant",
    weight: 420,
    worker: "Ramesh",
  },
  {
    id: "C-104",
    name: "Fghi",
    type: "Buffalo",
    reproductionState: "Lactating",
    weight: 510,
    worker: "Suresh",
  },
  {
    id: "C-105",
    name: "Abcde",
    type: "Cow",
    reproductionState: "Pregnant",
    weight: 420,
    worker: "Ramesh",
  },
  {
    id: "C-106",
    name: "Fghi",
    type: "Buffalo",
    reproductionState: "Lactating",
    weight: 510,
    worker: "Suresh",
  },
  {
    id: "C-107",
    name: "Abcde",
    type: "Cow",
    reproductionState: "Pregnant",
    weight: 420,
    worker: "Ramesh",
  },
  {
    id: "C-108",
    name: "Fghi",
    type: "Buffalo",
    reproductionState: "Lactating",
    weight: 510,
    worker: "Suresh",
  },
  {
    id: "C-109",
    name: "Abcde",
    type: "Cow",
    reproductionState: "Pregnant",
    weight: 420,
    worker: "Ramesh",
  },
  {
    id: "C-110",
    name: "Fghi",
    type: "Buffalo",
    reproductionState: "Lactating",
    weight: 510,
    worker: "Suresh",
  },
  {
    id: "C-111",
    name: "Abcde",
    type: "Cow",
    reproductionState: "Pregnant",
    weight: 420,
    worker: "Ramesh",
  },
  {
    id: "C-112",
    name: "Fghi",
    type: "Buffalo",
    reproductionState: "Lactating",
    weight: 510,
    worker: "Suresh",
  },
  {
    id: "C-113",
    name: "Abcde",
    type: "Cow",
    reproductionState: "Pregnant",
    weight: 420,
    worker: "Ramesh",
  },
  {
    id: "C-122",
    name: "Fghi",
    type: "Buffalo",
    reproductionState: "Lactating",
    weight: 510,
    worker: "Suresh",
  },
];

/* ---------------- SCREEN ---------------- */

type LiveStockAction = keyof typeof liveStockRouteMap;

export default function LiveStockScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const [openId, setOpenId] = useState<string | null>(null);

  const handleAction = (action: LiveStockAction, id: string) => {
    console.log(`${action} clicked for ${id}`);
    const route = liveStockRouteMap[action];

    router.push({
      pathname: route,
      params: {
        cattleId: id,
      },
    });

    setOpenId(null);
  };

  const renderItem = ({ item }: { item: Cattle }) => {
    const isOpen = openId === item.id;

    return (
      <View style={[styles.card, { backgroundColor: colors.card }]}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={[styles.name, { color: colors.text }]}>
              {item.name}
            </Text>
            <Text style={[styles.id, { color: colors.subHeading }]}>
              {item.id}
            </Text>
          </View>

          <Pressable
            style={[
              styles.editBtn,
              {
                backgroundColor: colors.primary,
              },
            ]}
            onPress={() => setOpenId(isOpen ? null : item.id)}
          >
            <PencilSimple size={18} color={colors.textInverse} />
          </Pressable>
        </View>

        {/* Tags */}
        <View style={styles.tagRow}>
          <Tag label={item.type} />
          <Tag label={item.reproductionState} variant />
        </View>
        {/* Info */}
        <View style={styles.infoRow}>
          <Info label="Weight" value={`${item.weight} kg`} colors={colors} />
          <Info label="Assigned Worker" value={item.worker} colors={colors} />
        </View>

        {isOpen && (
          <View style={styles.actionTray}>
            <ActionItem
              icon={<ClipboardText size={22} color={colors.primary} />}
              label="Assessment"
              onPress={() => handleAction("Assessment", item.id)}
            />
            <ActionItem
              icon={<Syringe size={22} color={colors.primary} />}
              label="Vaccination"
              onPress={() => handleAction("Vaccination", item.id)}
            />
            <ActionItem
              icon={<CalendarCheck size={22} color={colors.primary} />}
              label="Activities"
              onPress={() => handleAction("Manage_Activities", item.id)}
            />
          </View>
        )}
      </View>
    );
  };

  return (
    <>
      <Stack.Screen options={{ title: "Livestock" }} />

      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <FlatList
          data={cattleList}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </>
  );
}

/* ---------------- SMALL COMPONENTS ---------------- */

const Info = ({
  label,
  value,
  colors,
}: {
  label: string;
  value: string;
  colors: {
    text: string;
    subHeading: string;
  };
}) => (
  <View>
    <Text style={[styles.infoLabel, { color: colors.subHeading }]}>
      {label}
    </Text>
    <Text style={[styles.infoValue, { color: colors.text }]}>{value}</Text>
  </View>
);

const Tag = ({ label, variant }: { label: string; variant?: boolean }) => (
  <View style={[styles.tag, variant && styles.tagAccent]}>
    <Text style={styles.tagText}>{label}</Text>
  </View>
);

const ActionItem = ({
  icon,
  label,
  onPress,
}: {
  icon: React.ReactNode;
  label: string;
  onPress: () => void;
}) => (
  <Pressable style={styles.actionItem} onPress={onPress}>
    {icon}
    <Text style={styles.actionLabel}>{label}</Text>
  </Pressable>
);

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: { flex: 1 },
  list: { padding: 16 },

  card: {
    borderRadius: 18,
    padding: 16,
    marginBottom: 18,
    elevation: 4,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  name: {
    fontSize: 18,
    fontWeight: "700",
  },

  id: {
    fontSize: 12,
    opacity: 0.6,
    marginTop: 2,
  },

  editBtn: {
    padding: 8,
    borderRadius: 10,
  },

  tagRow: {
    flexDirection: "row",
    marginTop: 10,
    gap: 8,
  },

  tag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    backgroundColor: "#E5E7EB",
  },

  tagAccent: {
    backgroundColor: "#DBEAFE",
  },

  tagText: {
    fontSize: 12,
    fontWeight: "600",
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 14,
  },

  infoLabel: {
    fontSize: 12,
    opacity: 0.6,
  },

  infoValue: {
    fontSize: 15,
    fontWeight: "600",
    marginTop: 2,
  },

  actionTray: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 18,
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: "#F9FAFB",
  },

  actionItem: {
    alignItems: "center",
    gap: 6,
  },

  actionLabel: {
    fontSize: 12,
    fontWeight: "600",
  },
});
