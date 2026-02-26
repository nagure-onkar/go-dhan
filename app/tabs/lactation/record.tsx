import AppText from "@/components/common/AppText";
import ScreenWrapper from "@/components/common/ScreenWrapper";
import { useLanguage } from "@/constants/localization/useLanguage";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const cattleList = Array.from({ length: 12 }, (_, i) => ({
  id: `${i + 1}`,
  status: [
    "Calved & Lactating",
    "On Heat & Lactating",
    "Inseminated & Lactating",
    "Pregnant & Lactating",
  ][i % 4],
}));

export default function RecordLactation() {
  const { t } = useLanguage();
  const { workerId } = useLocalSearchParams();

  const [recordType, setRecordType] = useState<"Morning" | "Evening">("Morning");
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [focusedId, setFocusedId] = useState<string | null>(null);
  const [milkData, setMilkData] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  const formattedDate = `${date
    .getDate()
    .toString()
    .padStart(2, "0")}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getFullYear()}`;

  const handleRecordTypeChange = (type: "Morning" | "Evening") => {
    setRecordType(type);
    setMilkData({});
    setIsSubmitted(false);
    setEditId(null);
    setFocusedId(null);
  };

  const renderItem = ({ item }: any) => {
    const isEditing = editId === item.id;
    const isFocused = focusedId === item.id;

    return (
      <View style={styles.row}>
        {/* LEFT */}
        <View style={styles.leftSection}>
          <AppText style={styles.cattleId}>A{item.id}</AppText>
          <AppText style={styles.cattleType}>{t.cattle}</AppText>
        </View>

        {/* MILK INPUT */}
        <View style={styles.centerSection}>
          {!isSubmitted || isEditing ? (
            <TextInput
              placeholder={t.milkPlaceholder}
              placeholderTextColor="#9CA3AF"
              style={[
                styles.input,
                isEditing && styles.inputSmall,
                isFocused && styles.inputFocused,
              ]}
              value={milkData[item.id] || ""}
              keyboardType="decimal-pad"
              onFocus={() => setFocusedId(item.id)}
              onBlur={() => setFocusedId(null)}
              onChangeText={(value) =>
                setMilkData({ ...milkData, [item.id]: value })
              }
            />
          ) : (
            <AppText style={styles.milkText}>
              {milkData[item.id]} L
            </AppText>
          )}
        </View>

        {/* ACTION BUTTONS */}
        {isSubmitted && (
          <View style={styles.actionArea}>
            {!isEditing ? (
              <TouchableOpacity
                style={styles.editBtn}
                onPress={() => setEditId(item.id)}
              >
                <AppText style={styles.editText}>{t.edit}</AppText>
              </TouchableOpacity>
            ) : (
              <>
                <TouchableOpacity
                  style={styles.saveBtn}
                  onPress={() => setEditId(null)}
                >
                  <AppText style={styles.saveText}>{t.save}</AppText>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.cancelBtn}
                  onPress={() => setEditId(null)}
                >
                  <AppText style={styles.cancelText}>{t.cancel}</AppText>
                </TouchableOpacity>
              </>
            )}
          </View>
        )}

        {/* STATUS BADGE */}
        <View style={styles.rightSection}>
          <View style={styles.badge}>
            <AppText style={styles.badgeText}>
              {item.status.replace(" & ", "\n& ")}
            </AppText>
          </View>
        </View>
      </View>
    );
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <AppText style={styles.title}>{t.recordLactation}</AppText>

        <View style={styles.card}>
          <AppText style={styles.label}>{t.recordType} *</AppText>

          <View style={styles.segment}>
            {(["Morning", "Evening"] as const).map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.segmentBtn,
                  recordType === type && styles.segmentActive,
                ]}
                onPress={() => handleRecordTypeChange(type)}
              >
                <AppText
                  style={[
                    styles.segmentText,
                    recordType === type && styles.segmentTextActive,
                  ]}
                >
                  {type === "Morning" ? t.morning : t.evening}
                </AppText>
              </TouchableOpacity>
            ))}
          </View>

          <AppText style={styles.label}>{t.date}</AppText>

          <TouchableOpacity
            style={styles.dateInput}
            onPress={() => setShowPicker(true)}
          >
            <AppText style={styles.dateText}>{formattedDate}</AppText>
            <Ionicons name="calendar-outline" size={20} color="#0A8F47" />
          </TouchableOpacity>

          {showPicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={(e, d) => {
                setShowPicker(false);
                if (d) setDate(d);
              }}
            />
          )}
        </View>

        <FlatList
          data={cattleList}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          extraData={t}
          contentContainerStyle={{ paddingBottom: 120 }}
          showsVerticalScrollIndicator={false}
        />

        <TouchableOpacity
          style={styles.submit}
          onPress={() => setIsSubmitted(true)}
        >
          <AppText style={styles.submitText}>{t.saveRecord}</AppText>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F2FBF6", padding: 16 },

  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 12,
    color: "#064E3B",
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
    elevation: 4,
  },

  label: { marginTop: 10, fontWeight: "600", color: "#374151" },

  segment: {
    flexDirection: "row",
    backgroundColor: "#F1F5F9",
    borderRadius: 14,
    padding: 4,
    marginTop: 8,
  },

  segmentBtn: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
  },

  segmentActive: { backgroundColor: "#0A8F47" },

  segmentText: { fontWeight: "600", color: "#0A8F47" },

  segmentTextActive: { color: "#fff" },

  dateInput: {
    marginTop: 8,
    padding: 15,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#F9FAFB",
  },

  dateText: { fontSize: 15, fontWeight: "600" },

  row: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 18,
    paddingHorizontal: 14,
    borderRadius: 18,
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
  },

  leftSection: { width: 60 },

  cattleId: { fontWeight: "700", fontSize: 17, color: "#047857" },

  cattleType: { fontSize: 12, color: "#9CA3AF", marginTop: 2 },

  centerSection: { width: 110, alignItems: "center" },

  input: {
    width: 110,
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#F9FAFB",
    textAlign: "center",
    fontWeight: "600",
  },

  inputSmall: { width: 90 },

  inputFocused: {
    borderColor: "#0A8F47",
    backgroundColor: "#FFFFFF",
  },

  milkText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#047857",
  },

  actionArea: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginRight: 6,
  },

  editBtn: {
    borderWidth: 1,
    borderColor: "#60A5FA",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },

  editText: { color: "#2563EB", fontWeight: "600", fontSize: 12 },

  saveBtn: {
    backgroundColor: "#DCFCE7",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },

  saveText: { color: "#047857", fontWeight: "600", fontSize: 12 },

  cancelBtn: {
    backgroundColor: "#E5E7EB",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },

  cancelText: { color: "#374151", fontWeight: "600", fontSize: 12 },

  rightSection: { flex: 1, alignItems: "flex-end" },

  badge: {
    backgroundColor: "#ECFDF5",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
    maxWidth: 140,
    alignItems: "center",
  },

  badgeText: {
    color: "#047857",
    fontWeight: "600",
    fontSize: 11.5,
    textAlign: "center",
    lineHeight: 14,
  },

  submit: {
    position: "absolute",
    bottom: 20,
    left: 16,
    right: 16,
    backgroundColor: "#0A8F47",
    padding: 18,
    borderRadius: 16,
    alignItems: "center",
    elevation: 6,
  },

  submitText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});