import React, { useState } from "react";
import {
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Platform,
  FlatList,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "../../src/theme/useTheme";
import AppText from "../../src/components/common/AppText";
import { useLanguage } from "../../src/constants/localization/useLanguage";

const Assessment = () => {
  const { t } = useLanguage();
  const { colors } = useTheme();
  const [animalId, setAnimalId] = useState("");
  const [assessedBy, setAssessedBy] = useState("");
  const [ribsVisibility, setRibsVisibility] = useState("");
  const [backboneSharpness, setBackboneSharpness] = useState("");
  const [hookBoneVisibility, setHookBoneVisibility] = useState("");
  const [pinBoneVisibility, setPinBoneVisibility] = useState("");
  const [tailHeadFatCover, setTailHeadFatCover] = useState("");
  const [loinFatCover, setLoinFatCover] = useState("");
  const [thighFullness, setThighFullness] = useState("");
  const [weight, setWeight] = useState("");
  const [hipHeight, setHipHeight] = useState("");
  const [bodyLength, setBodyLength] = useState("");
  const [heartGirth, setHeartGirth] = useState("");
  const [bcsScore, setBcsScore] = useState("");
  const [remarks, setRemarks] = useState("");
  const [doctorFees, setDoctorFees] = useState("");
  const [treatmentExpenses, setTreatmentExpenses] = useState("");
  const [otherExpenses, setOtherExpenses] = useState("");

  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const onChangeDate = (event: any, selectedDate?: Date) => {
    setShowPicker(false);
    if (event?.type === "set" && selectedDate) {
      setDate(selectedDate);
    }
  };
  const handleSaveAssessment = async () => {
  try {
    const token = await AsyncStorage.getItem("access_token");

    if (!token) {
      alert("Please login again");
      return;
    }

    if (!animalId) {
      alert("Animal ID is required");
      return;
    }

    const body = {
      assessment_date: date.toISOString().split("T")[0], // YYYY-MM-DD
      assessed_by: assessedBy || "Owner",
      ribs_visibility: ribsVisibility,
      backbone_sharpness: backboneSharpness,
      hook_bone_visibility: hookBoneVisibility,
      pin_bone_visibility: pinBoneVisibility,
      tail_head_fat_cover: tailHeadFatCover,
      loin_fat_cover: loinFatCover,
      thigh_fullness: thighFullness,
      weight_kg: Number(weight) || 0,
      hip_height: Number(hipHeight) || 0,
      body_length: Number(bodyLength) || 0,
      heart_girth: Number(heartGirth) || 0,
      bcs_score: Number(bcsScore) || 0,
      remarks: remarks || "",
      doctor_fees: Number(doctorFees) || 0,
      treatment_expenses: Number(treatmentExpenses) || 0,
      other_expenses: Number(otherExpenses) || 0,
      animal_id: animalId,
    };

    console.log("BCS Request Body:", body);

    const response = await fetch(
      "https://astrabytte-ai.onrender.com/api/v1/bcs/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();
    console.log("BCS Response:", data);

    if (response.ok) {
      alert("Assessment saved successfully");
      router.back();
    } else {
      alert(data?.detail || "Something went wrong");
    }

  } catch (error) {
    console.log("BCS API Error:", error);
    alert("Network error");
  }
};

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      
      {/* HEADER */}
      <View style={[styles.header, { backgroundColor: colors.card }]}>
        <View style={styles.avatar}>
          <Ionicons name="clipboard-outline" size={22} color="#16a34a" />
        </View>
        <View>
          <AppText style={styles.title}>
            {t("Assessment Details")}
          </AppText>
          <AppText style={[styles.subtitle, { color: colors.text }]}>
            {t("Record BCS assessment details")}
          </AppText>
        </View>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* Assessment Details */}
        <Section title={t("Assessment Details")} icon="document-text-outline">

          {/* Date */}
          <View style={{ marginBottom: 14 }}>
            <AppText style={[styles.label, { color: colors.text }]}>
              {t("Assessment Date*")}
            </AppText>

            <TouchableOpacity
              style={styles.inputWithIcon}
              onPress={() => setShowPicker(true)}
            >
              <Ionicons name="calendar-outline" size={18} color="#000" />
              <AppText style={{ marginLeft: 8 }}>
                {date.toLocaleDateString()}
              </AppText>
            </TouchableOpacity>

            {showPicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display={Platform.OS === "android" ? "default" : "spinner"}
                onChange={onChangeDate}
              />
            )}
          </View>

          <Input
  label={t("Cattle ID*")}
  icon="pricetag-outline"
  value={animalId}
  onChangeText={setAnimalId}
/>
          <Input label={t("Age*")} icon="time-outline" editable={false} />
          <Input label={t("Current State*")} icon="information-circle-outline" editable={false} />

          <Dropdown
            label={t("Assessed By*")}
            icon="person-outline"
            items={[t("Owner"), t("Doctor")]}
          />
        </Section>

        {/* Backbone & Ribs */}
        <Section title={t("Backbone & Ribs")} icon="body-outline">
          <Dropdown
            icon="eye-outline"
            label={t("Visibility of Ribs*")}
            items={[t("Visible"), t("Slightly visible"), t("Not visible")]}
          />
          <Dropdown
            icon="fitness-outline"
            label={t("Spinous Process Sharpness")}
            items={[t("Sharp"), t("Slight"), t("Smooth")]}
          />
        </Section>

        {/* Hip & Pin Bones */}
        <Section title={t("Hip & Pin Bones")} icon="analytics-outline">
          <Dropdown
            icon="ellipse-outline"
            label={t("Hook Bone Visibility*")}
            items={[t("High"), t("Medium"), t("Low")]}
          />
          <Dropdown
            icon="ellipse-outline"
            label={t("Pin Bone Visibility*")}
            items={[t("High"), t("Medium"), t("Low")]}
          />
          <Dropdown
            icon="leaf-outline"
            label={t("Tail Head Fat Cover*")}
            items={[t("Sunken"), t("Slight cover"), t("Full cover")]}
          />
        </Section>

        {/* Thigh & Loin */}
        <Section title={t("Thigh & Loin Area")} icon="barbell-outline">
          <Dropdown
            icon="layers-outline"
            label={t("Loin Fat Cover*")}
            items={[t("Hollow"), t("Flat"), t("Filled")]}
          />
          <Dropdown
            icon="trending-up-outline"
            label={t("Thigh Area Fullness*")}
            items={[t("Thin"), t("Normal"), t("Fatty")]}
          />
        </Section>

        {/* Body Length */}
        <Section title={t("Body Length & Weight")} icon="resize-outline">
          <Input icon="scale-outline" label={t("Weight (KG)")} />
          <Input icon="resize-outline" label={t("Hip Height")} />
          <Input icon="expand-outline" label={t("Body Length")} />
          <Input icon="heart-outline" label={t("Heart Girth")} />
        </Section>

        {/* ✅ BCS Score Section (Before Expenses) */}
        <Section title={t("BCS Score")} icon="star-outline">
          <Dropdown
            icon="star-outline"
            label={t("BCS Score*")}
            items={["1", "2", "3", "4", "5"]}
          />

         <View style={{ marginTop: 16 }}>
  <AppText style={styles.label}>
    {t("Remarks")}
  </AppText>

  <TextInput
  style={styles.remarkInput}
  placeholder="Any additional notes..."
  multiline
  value={remarks}
  onChangeText={setRemarks}
/>
</View>
        </Section>

        {/* Expenses */}
        <Section title={t("Expenses")} icon="cash-outline">
          <Input icon="cash-outline" label={t("Doctor Fees*")} />
          <Input icon="wallet-outline" label={t("Treatment Expenses*")} />
          <Input icon="card-outline" label={t("Other Expenses*")} />
        </Section>

        {/* Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.cancelBtn} onPress={router.back}>
            <AppText>{t("Cancel")}</AppText>
          </TouchableOpacity>

          <TouchableOpacity
  style={styles.saveBtn}
  onPress={handleSaveAssessment}
>
            <Ionicons name="save" size={18} color="#fff" />
            <AppText style={styles.saveText}>
              {t("Save Assessment")}
            </AppText>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
};

export default Assessment;

/* ================= REUSABLE ================= */

const Section = ({ title, children, icon }: any) => (
  <View style={styles.section}>
    <View style={styles.sectionHeader}>
      <Ionicons
        name={icon}
        size={18}
        color="#000"
        style={{ marginRight: 6 }}
      />
      <AppText style={styles.sectionTitle}>{title}</AppText>
    </View>

    <View style={styles.sectionDivider} />
    {children}
  </View>
);

const Input = ({ label, icon, ...props }: any) => (
  <View style={{ marginBottom: 14 }}>
    <AppText style={styles.label}>{label}</AppText>
    <View style={styles.inputWithIcon}>
      <Ionicons name={icon} size={18} color="#000" />
      <TextInput
        style={styles.input}
        placeholderTextColor="#9ca3af"
        {...props}
      />
    </View>
  </View>
);

const Dropdown = ({ label, items, icon }: any) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <View style={{ marginBottom: 14 }}>
      <AppText style={styles.label}>{label}</AppText>

      <TouchableOpacity
        style={styles.inputWithIcon}
        onPress={() => setOpen(!open)}
        activeOpacity={0.8}
      >
        <Ionicons name={icon} size={18} color="#000" />
        <AppText style={{ flex: 1, marginLeft: 8 }}>
          {value || "Select"}
        </AppText>
        <Ionicons
          name={open ? "chevron-up" : "chevron-down"}
          size={18}
          color="#6b7280"
        />
      </TouchableOpacity>

      {open && (
        <View style={styles.dropdownList}>
          {items.map((item: string, index: number) => (
            <TouchableOpacity
              key={index}
              style={styles.dropdownItem}
              activeOpacity={0.7}
              onPress={() => {
                setValue(item);
                setOpen(false);
              }}
            >
              <AppText>{item}</AppText>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#f9fafb" },

  header: {
    flexDirection: "row",
    gap: 12,
    padding: 16,
    backgroundColor: "#fff",
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

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: "600",
  },

  sectionDivider: {
    height: 2,
    backgroundColor: "#16a34a",
    marginVertical: 8,
  },

  label: {
    fontSize: 13,
    color: "#374151",
    marginBottom: 6,
  },

  inputWithIcon: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 48,
    backgroundColor: "#fff",
  },

  /* ✅ FIXED FULL WIDTH INPUT */
  input: {
    flex: 1,
    marginLeft: 8,
    height: "100%",
  },

  textArea: {
    flex: 1,
    marginLeft: 8,
    height: 100,
    textAlignVertical: "top",
  },
  remarkInput: {
  borderWidth: 1,
  borderColor: "#e5e7eb",
  borderRadius: 10,
  padding: 14,
  height: 110,
  backgroundColor: "#f9fafb",
  textAlignVertical: "top",
},

  dropdownList: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    marginTop: 4,
    backgroundColor: "#fff",
  },

  dropdownItem: {
    padding: 14,
    borderBottomWidth: 0.5,
    borderColor: "#e5e7eb",
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
    gap: 6,
    justifyContent: "center",
  },

  saveText: {
    color: "#fff",
    fontWeight: "600",
  },
});
