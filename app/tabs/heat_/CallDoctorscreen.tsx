import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import AppText from "@/components/common/AppText";
import ScreenWrapper from "@/components/common/ScreenWrapper";
import { useLanguage } from "@/constants/localization/useLanguage";

export default function CallDoctorscreen() {
  const router = useRouter();
  const { t } = useLanguage();

  const [date, setDate] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState(false);
  const [visitConfirmed, setVisitConfirmed] = useState<"Yes" | "No" | "">("");
  const [reason, setReason] = useState("");
  const [remarks, setRemarks] = useState("");

  const formatDateTime = (d: Date) => {
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");
    return `${day}-${month}-${year}  ${hours}:${minutes}`;
  };

  return (
    <ScreenWrapper>
      <ScrollView style={styles.page} showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.iconCircle}>
            <Ionicons name="medkit-outline" size={24} color="#16A34A" />
          </View>

          <View style={{ flex: 1 }}>
            <AppText style={styles.title}>{t.callDoctor}</AppText>
            <AppText style={styles.subtitle}>{t.scheduleVetVisit}</AppText>
          </View>
        </View>

        <View style={styles.card}>
          {/* CATTLE ID */}
          <AppText style={styles.label}>{t.cattleId}</AppText>

          <View style={styles.disabledBox}>
            <Ionicons name="paw-outline" size={16} color="#6B7280" />
            <AppText style={styles.disabledText}>13</AppText>
          </View>

          {/* DATE */}
          <AppText style={styles.label}>{t.dateTime} *</AppText>

          <TouchableOpacity
            style={styles.inputBox}
            onPress={() => setShowPicker(true)}
          >
            <Ionicons name="calendar-outline" size={18} color="#16A34A" />
            <AppText style={{ color: date ? "#111827" : "#9CA3AF" }}>
              {date ? formatDateTime(date) : "dd-mm-yyyy  --:--"}
            </AppText>
          </TouchableOpacity>

          {showPicker && (
            <DateTimePicker
              value={date || new Date()}
              mode="datetime"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={(_, selectedDate) => {
                setShowPicker(false);
                if (selectedDate) setDate(selectedDate);
              }}
            />
          )}

          {/* VISIT DETAILS */}
          <AppText style={styles.section}>{t.visitDetails}</AppText>

          <AppText style={styles.label}>{t.doctorVisitConfirmed} *</AppText>

          <View style={styles.toggleRow}>
            {[
              { label: t.yes, value: "Yes" },
              { label: t.no, value: "No" },
            ].map((v) => (
              <TouchableOpacity
                key={v.value}
                style={[
                  styles.toggleBtn,
                  visitConfirmed === v.value && styles.toggleActive,
                ]}
                onPress={() =>
                  setVisitConfirmed(v.value as "Yes" | "No")
                }
              >
                <AppText
                  style={[
                    styles.toggleText,
                    visitConfirmed === v.value && { color: "#065F46" },
                  ]}
                >
                  {v.label}
                </AppText>
              </TouchableOpacity>
            ))}
          </View>

          {/* REASON */}
          <AppText style={styles.label}>{t.reasonToCallDoctor} *</AppText>

          <View style={styles.pickerWrapper}>
            <Picker selectedValue={reason} onValueChange={setReason}>
              <Picker.Item label={t.selectReason} value="" />
              <Picker.Item label={t.heatConfirmation} value="Heat Confirmation" />
              <Picker.Item label={t.treatment} value="Treatment" />
              <Picker.Item
                label={t.pregnancyDiagnosis}
                value="Pregnancy Diagnosis"
              />
              <Picker.Item label={t.insemination} value="Insemination" />
              <Picker.Item label={t.deliveryDetails} value="Delivery Details" />
            </Picker>
          </View>

          {/* REMARKS */}
          <AppText style={styles.label}>{t.remarks}</AppText>

          <TextInput
            style={styles.textarea}
            placeholder={t.additionalNotes}
            multiline
            value={remarks}
            onChangeText={setRemarks}
          />

          {/* BUTTONS */}
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={() => router.back()}
            >
              <AppText style={styles.cancelText}>{t.cancel}</AppText>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.saveBtn}
              onPress={() => router.push("./PregnancyDiagnosisScreen")}
            >
              <Ionicons
                name="checkmark-circle-outline"
                size={18}
                color="#fff"
              />
              <AppText style={styles.saveText}>{t.scheduleVisit}</AppText>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: "#F6FBF8", padding: 16 },

  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ECFDF5",
    padding: 16,
    borderRadius: 18,
    marginBottom: 18,
  },

  iconCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#DCFCE7",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  title: { fontSize: 22, fontWeight: "700", color: "#064E3B" },
  subtitle: { color: "#047857", marginTop: 2 },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 4,
  },

  label: {
    marginTop: 14,
    marginBottom: 6,
    fontWeight: "600",
    color: "#374151",
  },

  section: {
    marginTop: 22,
    fontSize: 17,
    fontWeight: "700",
    color: "#065F46",
  },

  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderWidth: 1,
    borderColor: "#D1FAE5",
    backgroundColor: "#F9FEFB",
    borderRadius: 12,
    padding: 14,
  },

  disabledBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    padding: 14,
  },

  disabledText: { color: "#6B7280", fontWeight: "600" },

  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#D1FAE5",
    borderRadius: 12,
    backgroundColor: "#F9FEFB",
  },

  textarea: {
    borderWidth: 1,
    borderColor: "#D1FAE5",
    borderRadius: 12,
    padding: 14,
    height: 100,
    backgroundColor: "#F9FEFB",
  },

  toggleRow: { flexDirection: "row", gap: 12 },

  toggleBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#D1FAE5",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    backgroundColor: "#fff",
  },

  toggleActive: {
    backgroundColor: "#DCFCE7",
    borderColor: "#22C55E",
  },

  toggleText: { fontWeight: "600", color: "#374151" },

  buttonRow: { flexDirection: "row", gap: 12, marginTop: 26 },

  cancelBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    padding: 15,
    borderRadius: 14,
    alignItems: "center",
  },

  cancelText: { fontWeight: "600", color: "#374151" },

  saveBtn: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#16A34A",
    padding: 15,
    borderRadius: 14,
    elevation: 3,
  },

  saveText: { color: "#FFFFFF", fontWeight: "700" },
});