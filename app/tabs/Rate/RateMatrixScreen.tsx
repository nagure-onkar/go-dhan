import { Picker } from "@react-native-picker/picker";
import React, { useMemo, useState } from "react";
import {
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import AppText from "@/components/common/AppText";
import ScreenWrapper from "@/components/common/ScreenWrapper";
import { useLanguage } from "@/constants/localization/useLanguage";

const BOTTOM_BAR_HEIGHT = 90;

type RateRow = {
  id: string;
  fat: string;
  snf: string;
  rate: string;
  isEditing: boolean;
};

type CattleType = "Cow" | "Buffalo";

export default function RateMatrixScreen() {
  const { t } = useLanguage();

  const [cattleType, setCattleType] = useState<CattleType>("Buffalo");

  const [data, setData] = useState<Record<CattleType, RateRow[]>>({
    Cow: [],
    Buffalo: [],
  });

  const rows = data[cattleType];

  const addNewRow = () => {
    const newRow: RateRow = {
      id: Date.now().toString(),
      fat: "",
      snf: "",
      rate: "",
      isEditing: true,
    };

    setData((prev) => ({
      ...prev,
      [cattleType]: [...prev[cattleType], newRow],
    }));
  };

  const updateRow = (id: string, key: keyof RateRow, value: string) => {
    setData((prev) => ({
      ...prev,
      [cattleType]: prev[cattleType].map((r) =>
        r.id === id ? { ...r, [key]: value } : r
      ),
    }));
  };

  const toggleEdit = (id: string) => {
    setData((prev) => ({
      ...prev,
      [cattleType]: prev[cattleType].map((r) =>
        r.id === id ? { ...r, isEditing: !r.isEditing } : r
      ),
    }));
  };

  const deleteRow = (id: string) => {
    setData((prev) => ({
      ...prev,
      [cattleType]: prev[cattleType].filter((r) => r.id !== id),
    }));
  };

  const averageRate = useMemo(() => {
    const validRates = rows
      .map((r) => Number(r.rate))
      .filter((v) => !isNaN(v) && v > 0);

    if (!validRates.length) return "0.00";

    const avg =
      validRates.reduce((a, b) => a + b, 0) / validRates.length;

    return avg.toFixed(2);
  }, [rows]);

  const renderRow = ({ item }: { item: RateRow }) => (
    <View style={styles.row}>
      <TextInput
        style={[styles.input, styles.colFat]}
        placeholder={t.fatPercentage}
        keyboardType="numeric"
        editable={item.isEditing}
        value={item.fat}
        onChangeText={(v) => updateRow(item.id, "fat", v)}
      />

      <TextInput
        style={[styles.input, styles.colSnf]}
        placeholder={t.snfPercentage}
        keyboardType="numeric"
        editable={item.isEditing}
        value={item.snf}
        onChangeText={(v) => updateRow(item.id, "snf", v)}
      />

      <TextInput
        style={[styles.input, styles.colRate]}
        placeholder={t.ratePerLitre}
        keyboardType="numeric"
        editable={item.isEditing}
        value={item.rate}
        onChangeText={(v) => updateRow(item.id, "rate", v)}
      />

      <View style={[styles.colAction, styles.actionBox]}>
        <TouchableOpacity onPress={() => toggleEdit(item.id)}>
          <AppText style={styles.doneText}>
            {item.isEditing ? t.done : t.edit}
          </AppText>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => deleteRow(item.id)}>
          <AppText style={styles.delete}>🗑</AppText>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {/* HEADER */}
        <View style={styles.topStrip}>
          <View style={styles.headerLeft}>
            <View style={styles.rupeeCircle}>
              <AppText style={styles.rupee}>₹</AppText>
            </View>

            <View style={{ flex: 1 }}>
              <AppText style={styles.title}>
                {t.rateMatrixConfig}
              </AppText>
              <AppText style={styles.subtitle}>
                {t.milkPricingConfig}
              </AppText>
            </View>
          </View>

          <View style={styles.userChip}>
            <AppText style={styles.userText}>
              adeep_desai_05
            </AppText>
          </View>
        </View>

        {/* CARDS */}
        <View style={styles.cards}>
          <View style={styles.card}>
            <AppText style={styles.cardLabel}>
              {t.averageRate}
            </AppText>
            <AppText style={styles.cardValue}>₹{averageRate}</AppText>
          </View>

          <View style={styles.card}>
            <AppText style={styles.cardLabel}>
              {t.lastUpdated}
            </AppText>
            <AppText style={styles.cardValue}>20/2/2026</AppText>
          </View>
        </View>

        {/* DROPDOWN */}
        <AppText style={styles.dropdownLabel}>
          {t.cattleType} *
        </AppText>

        <View style={styles.dropdown}>
          <Picker
            selectedValue={cattleType}
            onValueChange={(v) => setCattleType(v)}
          >
            <Picker.Item label={t.cow} value="Cow" />
            <Picker.Item label={t.buffalo} value="Buffalo" />
          </Picker>
        </View>

        {/* TABLE */}
        <View style={styles.tableBox}>
          <View style={styles.tableHeader}>
            <AppText style={[styles.th, styles.colFat]}>
              {t.fatPercentage}
            </AppText>
            <AppText style={[styles.th, styles.colSnf]}>
              {t.snfPercentage}
            </AppText>
            <AppText style={[styles.th, styles.colRate]}>
              {t.rate}
            </AppText>
            <AppText style={[styles.th, styles.colAction]}>
              {t.actions}
            </AppText>
          </View>

          <FlatList
            data={rows}
            keyExtractor={(item) => item.id}
            renderItem={renderRow}
            extraData={t}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: BOTTOM_BAR_HEIGHT + 20,
            }}
            ListEmptyComponent={
              <AppText style={styles.empty}>
                {t.noRecords}
              </AppText>
            }
          />
        </View>

        {/* BOTTOM BUTTONS */}
        <View style={styles.bottomBar}>
          <TouchableOpacity style={styles.addBtn} onPress={addNewRow}>
            <AppText style={styles.addText}>
              {t.addNewFatRate}
            </AppText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.saveBtn}>
            <AppText style={styles.saveText}>
              {t.saveChanges}
            </AppText>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F4FBF7" },

  topStrip: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },

  headerLeft: { flexDirection: "row", alignItems: "center", flex: 1 },

  rupeeCircle: {
    height: 44,
    width: 44,
    borderRadius: 22,
    backgroundColor: "#E8F7EE",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  rupee: { fontSize: 20, color: "#0B8F4D", fontWeight: "700" },

  title: { fontSize: 18, fontWeight: "700", color: "#111827" },

  subtitle: { fontSize: 12, color: "#6B7280" },

  userChip: {
    backgroundColor: "#E8F7EE",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginLeft: 8,
  },

  userText: { color: "#0B8F4D", fontWeight: "600", fontSize: 12 },

  cards: { flexDirection: "row", gap: 12, padding: 16 },

  card: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 14,
    elevation: 2,
  },

  cardLabel: { color: "#6B7280" },

  cardValue: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0B8F4D",
    marginTop: 6,
  },

  dropdownLabel: {
    marginLeft: 16,
    fontWeight: "600",
    marginBottom: 6,
  },

  dropdown: {
    marginHorizontal: 16,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 2,
  },

  tableBox: {
    flex: 1,
    margin: 16,
    backgroundColor: "#EAF7F0",
    borderRadius: 16,
    padding: 12,
  },

  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#CFEBDC",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },

  th: { fontWeight: "700", color: "#065F46" },

  row: { flexDirection: "row", alignItems: "center", marginBottom: 8 },

  colFat: { width: "22%" },
  colSnf: { width: "22%" },
  colRate: { width: "34%" },
  colAction: { width: "22%", alignItems: "center" },

  input: {
    height: 42,
    borderWidth: 1,
    borderColor: "#CFEBDC",
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: "#fff",
    marginRight: 6,
  },

  actionBox: { flexDirection: "row", alignItems: "center", gap: 10 },

  doneText: { color: "#0B8F4D", fontWeight: "600" },

  delete: { fontSize: 18 },

  empty: {
    textAlign: "center",
    color: "#888",
    marginVertical: 20,
  },

  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#F4FBF7",
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
    height: BOTTOM_BAR_HEIGHT,
  },

  addBtn: {
    backgroundColor: "#16A34A",
    paddingHorizontal: 18,
    justifyContent: "center",
    borderRadius: 10,
  },

  addText: { color: "#fff", fontWeight: "700" },

  saveBtn: {
    backgroundColor: "#2F9E75",
    paddingHorizontal: 18,
    justifyContent: "center",
    borderRadius: 10,
  },

  saveText: { color: "#fff", fontWeight: "700" },
});