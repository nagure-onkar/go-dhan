import React, { useState } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router } from "expo-router";
import { useTheme } from "../../src/theme/useTheme";
import { useLanguage } from "../../src/constants/localization/useLanguage";
import AppText from "../../src/components/common/AppText";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CallDoctor = () => {
  const { t } = useLanguage();
  const { colors } = useTheme();

  const [visitConfirmed, setVisitConfirmed] = useState("");
  const [reason, setReason] = useState("");
  const [cattleId, setCattleId] = useState("");
  const [remarks, setRemarks] = useState("");

  const [openVisitDropdown, setOpenVisitDropdown] = useState(false);
  const [openReasonDropdown, setOpenReasonDropdown] = useState(false);

  /* ================= DATE TIME STATES ================= */
  const [dateTime, setDateTime] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState(false);
  const [pickerMode, setPickerMode] = useState<"date" | "time">("date");

  /* ================= FORMAT FUNCTION ================= */
  const formatDateTime = (date: Date) => {
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${month}/${day}/${year} ${hours}:${minutes}`;
  };
  
  const handleScheduleVisit = async () => {
  try {
    const token = await AsyncStorage.getItem("access_token");

    if (!cattleId || !dateTime || !visitConfirmed || !reason) {
      alert("Please fill all required fields");
      return;
    }

    const body = {
      cattleId: cattleId,
      dateTime: dateTime.toISOString(), // IMPORTANT (API needs ISO)
      isDoctorVisitConfirmed: visitConfirmed === "Yes",
      selectedDoctorId: "string", // change if dynamic
      reasonToCall: reason,
      remarks: remarks || "",
    };

    console.log("Request Body:", body);

    const response = await fetch(
      "https://astrabytte-ai.onrender.com/api/v1/call-doctor",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // if API requires auth
        },
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();
    console.log("Response:", data);

    if (response.ok) {
      alert("Doctor visit scheduled successfully");
      router.back();
    } else {
      alert(data.message || "Something went wrong");
    }
  } catch (error) {
    console.log("API Error:", error);
    alert("Network error");
  }
};



  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      {/* ================= HEADER ================= */}
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <View style={styles.avatar}>
          <Ionicons name="call" size={22} color="#16a34a" />
        </View>
        <View>
          <AppText style={styles.title}>{t("Call Doctor")}</AppText>
          <AppText style={styles.subtitle}>
            {t("Schedule a veterinary visit for your cattle")}
          </AppText>
        </View>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* ================= BASIC DETAILS ================= */}
        <View style={[styles.section, { borderColor: colors.border }]}>
          <AppText style={styles.sectionTitle}>
            {t("Basic Details")}
          </AppText>

          {/* Cattle ID */}
          <View style={{ marginBottom: 14 }}>
            <AppText style={styles.label}>
              {t("Cattle ID")}
            </AppText>
            <View style={styles.inputWrapper}>
              <TextInput
  style={styles.input}
  placeholder="Enter cattle ID"
  placeholderTextColor="#9ca3af"
  value={cattleId}
  onChangeText={setCattleId}
/>
            </View>
          </View>

          {/* Date & Time Field */}
          <AppText style={styles.label}>
            {t("Date & Time")} *
          </AppText>

          <TouchableOpacity
            style={styles.dateBox}
            onPress={() => {
              setPickerMode("date");
              setShowPicker(true);
            }}
          >
            <AppText
              style={{
                color: dateTime ? "#111827" : "#9ca3af",
              }}
            >
              {dateTime
                ? formatDateTime(dateTime)
                : "mm/dd/yyyy --:--"}
            </AppText>

            <Ionicons name="calendar-outline" size={18} color="#6b7280" />
          </TouchableOpacity>

          {showPicker && (
            <DateTimePicker
              value={dateTime || new Date()}
              mode={pickerMode}
              display="default"
              is24Hour
              onChange={(event, selected) => {
                if (!selected) {
                  setShowPicker(false);
                  return;
                }

                if (pickerMode === "date") {
                  const base = new Date(selected);

                  if (dateTime) {
                    base.setHours(
                      dateTime.getHours(),
                      dateTime.getMinutes()
                    );
                  }

                  setDateTime(base);

                  if (Platform.OS !== "ios") {
                    setPickerMode("time");
                    setShowPicker(true);
                  }
                } else {
                  const updated = dateTime
                    ? new Date(dateTime)
                    : new Date();

                  updated.setHours(
                    selected.getHours(),
                    selected.getMinutes()
                  );

                  setDateTime(updated);
                  setShowPicker(false);
                  setPickerMode("date");
                }
              }}
            />
          )}
        </View>

        {/* ================= VISIT DETAILS ================= */}
        <View style={[styles.section, { borderColor: colors.border }]}>
          <AppText style={styles.sectionTitle}>
            {t("Visit Details")}
          </AppText>

          {/* Doctor Visit Confirmed */}
          <AppText style={styles.label}>
            {t("Doctor Visit Confirmed")} *
          </AppText>
          <TouchableOpacity
            style={styles.dropdownBox}
            onPress={() => {
              setOpenVisitDropdown(!openVisitDropdown);
              setOpenReasonDropdown(false);
            }}
          >
            <AppText style={{ color: visitConfirmed ? "#111" : "#9ca3af" }}>
              {visitConfirmed || "Select"}
            </AppText>
            <Ionicons name="chevron-down" size={18} />
          </TouchableOpacity>

          {openVisitDropdown && (
            <View style={styles.dropdownList}>
              {["Yes", "No"].map((item) => (
                <TouchableOpacity
                  key={item}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setVisitConfirmed(item);
                    setOpenVisitDropdown(false);
                  }}
                >
                  <AppText>{item}</AppText>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Reason */}
          <AppText style={styles.label}>
            {t("Reason to Call Doctor")} *
          </AppText>
          <TouchableOpacity
            style={styles.dropdownBox}
            onPress={() => {
              setOpenReasonDropdown(!openReasonDropdown);
              setOpenVisitDropdown(false);
            }}
          >
            <AppText style={{ color: reason ? "#111" : "#9ca3af" }}>
              {reason || "Select Reason"}
            </AppText>
            <Ionicons name="chevron-down" size={18} />
          </TouchableOpacity>

          {openReasonDropdown && (
            <View style={styles.dropdownList}>
              {[
                "Heat Confirmation",
                "Treatment",
                "Insemination / Delivery Details",
                "Treatment Follow Up",
              ].map((item) => (
                <TouchableOpacity
                  key={item}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setReason(item);
                    setOpenReasonDropdown(false);
                  }}
                >
                  <AppText>{item}</AppText>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* ================= ADDITIONAL INFO ================= */}
        <View style={[styles.section, { borderColor: colors.border }]}>
          <AppText style={styles.sectionTitle}>
            {t("Additional Information")}
          </AppText>

          <AppText style={styles.label}>{t("Remarks")}</AppText>
          <TextInput
  style={styles.textArea}
  placeholder="Any additional notes or observations..."
  placeholderTextColor="#9ca3af"
  multiline
  value={remarks}
  onChangeText={setRemarks}
/>
        </View>

        {/* ================= BUTTONS ================= */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.cancelBtn}
            onPress={() => router.back()}
          >
            <AppText>Cancel and Go back to Cattle Dashboard</AppText>
          </TouchableOpacity>

          <TouchableOpacity
  style={styles.saveBtn}
  onPress={handleScheduleVisit}
>
            <Ionicons name="calendar" size={18} color="#fff" />
            <AppText style={styles.saveText}>
              Schedule Visit
            </AppText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default CallDoctor;

/* ================= INPUT ================= */

const Input = ({
  label,
  icon,
  ...props
}: {
  label: string;
  icon: any;
  [key: string]: any;
}) => (
  <View style={{ marginBottom: 14 }}>
    <AppText style={styles.label}>{label}</AppText>
    <View style={styles.inputWrapper}>
      <Ionicons name={icon} size={18} color="#6b7280" />
      <TextInput
        style={styles.input}
        placeholderTextColor="#9ca3af"
        {...props}
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  screen: { flex: 1 },

  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
  },

  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#dcfce7",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  title: { fontSize: 20, fontWeight: "700" },
  subtitle: { fontSize: 13, color: "#6b7280" },

  container: { padding: 16 },

  section: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    marginBottom: 20,
    borderWidth: 1,
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: "600",
    borderBottomWidth: 1.5,
    borderBottomColor: "#22c55e",
    paddingBottom: 6,
    marginBottom: 14,
  },

  label: { fontSize: 13, marginBottom: 4 },

  inputWrapper: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: "#f9fafb",
  },

  input: { flex: 1 },

  dateBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    padding: 12,
    backgroundColor: "#f9fafb",
    marginBottom: 12,
  },

  dropdownBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    padding: 12,
    backgroundColor: "#f9fafb",
    marginBottom: 8,
  },

  dropdownList: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    backgroundColor: "#fff",
    marginBottom: 14,
  },

  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },

  textArea: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    padding: 12,
    height: 110,
    backgroundColor: "#f9fafb",
    textAlignVertical: "top",
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 24,
  },

  cancelBtn: {
    width: "60%",
    borderWidth: 1,
    borderColor: "#d1d5db",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },

  saveBtn: {
    width: "35%",
    backgroundColor: "#16a34a",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
  },

  saveText: { color: "#fff", fontWeight: "600" },
});
