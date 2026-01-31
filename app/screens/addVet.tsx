import React, { useState } from "react";
import {
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import AppText from "../components/AppText";
import { useLanguage } from "../hooks/useLanguage";


const AddVeterinarian = () => {
  const { t } = useLanguage();
  const [gender, setGender] = useState<string>("");

  const handleSave = () => {
    router.replace("/tabs");
  };

  return (
    <View style={styles.screen}>
      {/* ================= HEADER ================= */}
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={22} color="#16a34a" />
        </View>
        <View>
          <AppText style={styles.title}>
            {t("Add New Veterinarian")}
          </AppText>
          <AppText style={styles.subtitle}>
            {t("Register a new veterinarian with complete details")}
          </AppText>
        </View>
      </View>

      {/* ================= CONTENT ================= */}
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* ===== PERSONAL INFO ===== */}
        <View style={styles.section}>
          <AppText style={styles.sectionTitle}>
            {t("Personal Information")}
          </AppText>

          <Input
            label={t("Veterinarian ID ")}
            placeholder={t("e.g., VET-001")}
            icon="id-card"
          />
          <Input
            label={t("First Name")}
            placeholder={t("e.g., Dr. Meena")}
            icon="person"
          />
          <Input
            label={t("Father's Name ")}
            placeholder={t("e.g., Suresh")}
            icon="person-outline"
          />
          <Input
            label={t("Surname")}
            placeholder={t("e.g., Patil")}
            icon="person-circle-outline"
          />

          <AppText style={styles.label}>{t("Gender")}</AppText>
          <View style={styles.row}>
            {["Male", "Female", "Other"].map((g) => (
              <TouchableOpacity
                key={g}
                style={[
                  styles.radio,
                  gender === g && styles.radioSelected,
                ]}
                onPress={() => setGender(g)}
              >
                <AppText>{t(g.toLowerCase())}</AppText>
              </TouchableOpacity>
            ))}
          </View>

          <Input
            label={t("Date of Birth")}
            placeholder={t("mm/dd/yyyy")}
            icon="calendar"
          />
          <Input
            label={t("Age")}
            placeholder={t("Auto-calculated")}
            icon="calculator"
            editable={false}
          />
          <Input
            label={t("Date of Joining")}
            placeholder={t("mm/dd/yyyy")}
            icon="calendar-outline"
          />
        </View>

        {/* ===== CONTACT INFO ===== */}
        <View style={styles.section}>
          <AppText style={styles.sectionTitle}>
            {t("Contact Information")}
          </AppText>

          <Input
            label={t("Mobile Number")}
            placeholder={t("9876543211")}
            keyboardType="phone-pad"
            icon="call"
          />
          <Input
            label={t("Alternate Contact Number")}
            placeholder={t("Optional")}
            keyboardType="phone-pad"
            icon="call-outline"
          />
          <Input
            label={t("Address")}
            placeholder={t("e.g., Pune District Hospital, Pune")}
            icon="location"
          />
        </View>

        {/* ===== PROFESSIONAL INFO ===== */}
        <View style={styles.section}>
          <AppText style={styles.sectionTitle}>
            {t("Professional Information")}
          </AppText>

          <AppText style={styles.label}>
            {t("Specialization & Remarks")}
          </AppText>
          <TextInput
            style={styles.textArea}
            placeholder={t("e.g., Specialist in bovine health, Large animal surgery expertise...")}
            placeholderTextColor="#9ca3af"
            multiline
          />
        </View>

        {/* ===== BUTTONS ===== */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.cancelBtn}>
            <AppText>{t("Cancle")}</AppText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
            <Ionicons name="save" size={18} color="#fff" />
            <AppText style={styles.saveText}>
              {t("Save Veterinarian")}
            </AppText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default AddVeterinarian;

/* ================= INPUT COMPONENT ================= */

const Input = ({
  icon,
  label,
  ...props
}: {
  icon: any;
  label: string;
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

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#f9fafb" },

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },

  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#dcfce7",
    alignItems: "center",
    justifyContent: "center",
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
    borderColor: "#e5e7eb",
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: "600",
    borderBottomWidth: 1.5,
    borderBottomColor: "#22c55e",
    paddingBottom: 6,
    marginBottom: 14,
  },

  label: { fontSize: 13, color: "#374151", marginBottom: 4 },

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    paddingHorizontal: 12,
    backgroundColor: "#f9fafb",
  },

  input: { flex: 1, padding: 10 },

  row: { flexDirection: "row", gap: 10, marginBottom: 14 },

  radio: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },

  radioSelected: {
    backgroundColor: "#dcfce7",
    borderColor: "#22c55e",
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
    width: "45%",
    borderWidth: 1,
    borderColor: "#d1d5db",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },

  saveBtn: {
    width: "45%",
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
