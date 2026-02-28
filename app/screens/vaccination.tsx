import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import { useTheme } from "../../src/theme/useTheme";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";

import AppText from "../../src/components/common/AppText";
import { useLanguage } from "../../src/constants/localization/useLanguage";
const BASE_URL = "https://astrabytte-ai.onrender.com";

const Vaccination = () => {
  const { t } = useLanguage();
  const { colors } = useTheme();

  const [bcs, setBcs] = useState("");
  const [illness, setIllness] = useState("No");
  const [category, setCategory] = useState("");
  const [route, setRoute] = useState("");
  const [site, setSite] = useState("");

  const [doctorFees, setDoctorFees] = useState("");
  const [treatmentFees, setTreatmentFees] = useState("");
  const [otherFees, setOtherFees] = useState("");
  // ADD THESE STATES inside Vaccination component (top)

const [loading, setLoading] = useState(false);

const [animalId, setAnimalId] = useState("");
const [bodyTemp, setBodyTemp] = useState("");
const [vaccineName, setVaccineName] = useState("");
const [doseAmount, setDoseAmount] = useState("");
const [batchNumber, setBatchNumber] = useState("");
const [manufacturer, setManufacturer] = useState("");
const [illnessDetails, setIllnessDetails] = useState("");
const [remarks, setRemarks] = useState("");
const [nextDoseNeeded, setNextDoseNeeded] = useState("No");

  const [expiryDate, setExpiryDate] = useState(new Date());
  const [vaccinationDate, setVaccinationDate] = useState(new Date());
  const [nextDate, setNextDate] = useState(new Date());

  const [showPicker, setShowPicker] = useState<
    null | "expiry" | "vaccination" | "next"
  >(null);

  const onChangeDate = (event: any, selectedDate?: Date) => {
    setShowPicker(null);

    if (event?.type === "set" && selectedDate) {
      if (showPicker === "expiry") setExpiryDate(selectedDate);
      if (showPicker === "vaccination") setVaccinationDate(selectedDate);
      if (showPicker === "next") setNextDate(selectedDate);
    }
  };
 const handleSaveVaccination = async () => {
  try {
    setLoading(true);

    const token = await AsyncStorage.getItem("access_token");

    if (!token) {
      alert("User not logged in");
      return;
    }

    const payload = {
      animal_id: animalId.trim(),

      body_temperature: bodyTemp ? Number(bodyTemp) : 0,
      bcs_score: bcs ? Number(bcs) : 0,

      any_illness_signs: illness === "Yes",
      illness_details: illness === "Yes" ? illnessDetails.trim() : "",

      vaccine_name: vaccineName.trim(),
      vaccination_category: category || "",

      dose_amount_ml: doseAmount ? Number(doseAmount) : 0,
      batch_number: batchNumber.trim(),
      manufacturer: manufacturer.trim(),

      expiry_date: expiryDate.toISOString().split("T")[0],

      route_of_administration: route || "",
      body_site: site || "",

      vaccination_date: vaccinationDate.toISOString().split("T")[0],

      next_dose_needed: nextDoseNeeded === "Yes",

      next_vaccination_date:
        nextDoseNeeded === "Yes"
          ? nextDate.toISOString().split("T")[0]
          : null,

      follow_up_date:
        nextDoseNeeded === "Yes"
          ? nextDate.toISOString().split("T")[0]
          : null,

      doctor_fees: doctorFees ? Number(doctorFees) : 0,
      treatment_expenses: treatmentFees
        ? Number(treatmentFees)
        : 0,
      other_expenses: otherFees ? Number(otherFees) : 0,
    };

    console.log("Sending Payload:", payload);

    const response = await fetch(
      "https://astrabytte-ai.onrender.com/api/v1/vaccinations",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      }
    );

    const result = await response.json();
    console.log("Server Response:", result);

    if (!response.ok) {
      alert(result?.detail || "Something went wrong");
      return;
    }

    alert("Vaccination Saved Successfully");
    router.back();
  } catch (error) {
    console.log("Vaccination Error:", error);
    alert("Server Error");
  } finally {
    setLoading(false);
  }
};

  const formatDate = (date: Date) => {
    return date.toISOString().split("T")[0];
  };
  

  return (
    <View style={styles.screen}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.headerIcon}>
          <Ionicons name="medkit-outline" size={22} color={colors.primary} />
        </View>
        <View>
          <AppText style={styles.headerTitle}>{t.vaccination}</AppText>
          <AppText style={styles.headerSub}>
            {t.recordVaccinationDetails}
          </AppText>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Health Status */}
        <Section title="Cattle Health Status Before Vaccination">
          <Input
  icon="thermometer-outline"
  label="Body Temperature (°C)*"
  keyboardType="numeric"
  value={bodyTemp}
  onChangeText={setBodyTemp}
/>

          <Dropdown
            icon="stats-chart-outline"
            label="BCS Score"
            value={bcs}
            onChange={setBcs}
            items={[
              { label: "Select", value: "" },
              { label: "1", value: "1" },
              { label: "2", value: "2" },
              { label: "3", value: "3" },
              { label: "4", value: "4" },
              { label: "5", value: "5" },
            ]}
          />
          <Input
        icon="id-card-outline"
        label="Animal ID"
        value={animalId}
        onChangeText={setAnimalId}
      />

          <Dropdown
            icon="alert-circle-outline"
            label="Any Illness Signs?"
            value={illness}
            onChange={setIllness}
            items={[
              { label: "No", value: "No" },
              { label: "Yes", value: "Yes" },
            ]}
          />
            {illness === "Yes" && (
        <Input
          icon="alert-circle-outline"
          label="Illness Details"
          value={illnessDetails}
          onChangeText={setIllnessDetails}
        />
      )}
        </Section>

        {/* Vaccine Info */}
        <Section title="Vaccine Information">
          <Input
  icon="medical-outline"
  label="Vaccine Name"
  value={vaccineName}
  onChangeText={setVaccineName}
/>

          <Dropdown
            icon="list-outline"
            label="Vaccination Category*"
            value={category}
            onChange={setCategory}
            items={[
              { label: "Select", value: "" },
              { label: "Routine", value: "Routine" },
              { label: "Booster", value: "Booster" },
              { label: "Emergency", value: "Emergency" },
            ]}
          />

          <Input icon="time-outline" label="Age" />
          <Input
  icon="flask-outline"
  label="Dose Amount (ml)*"
  value={doseAmount}
  onChangeText={setDoseAmount}
  keyboardType="numeric"
/>
          <Input
  icon="barcode-outline"
  label="Batch Number"
  value={batchNumber}
  onChangeText={setBatchNumber}
/>
          <Input
  icon="business-outline"
  label="Manufacturer*"
  value={manufacturer}
  onChangeText={setManufacturer}
/>

          <DateInput
            label="Expiry Date*"
            value={formatDate(expiryDate)}
            onPress={() => setShowPicker("expiry")}
          />

          <Dropdown
            icon="git-branch-outline"
            label="Route of Administration*"
            value={route}
            onChange={setRoute}
            items={[
              { label: "Select", value: "" },
              { label: "IM", value: "IM" },
              { label: "SC", value: "SC" },
              { label: "Oral", value: "Oral" },
              { label: "Nasal", value: "Nasal" },
            ]}
          />

          <Dropdown
            icon="body-outline"
            label="Body Site*"
            value={site}
            onChange={setSite}
            items={[
              { label: "Select", value: "" },
              { label: "Shoulder", value: "Shoulder" },
              { label: "Neck", value: "Neck" },
              { label: "Thigh", value: "Thigh" },
              { label: "Other", value: "Other" },
            ]}
          />
        </Section>

        {/* Schedule */}
        <Section title="Administration Details / Schedule">
          <DateInput
            label="Date of Vaccination*"
            value={formatDate(vaccinationDate)}
            onPress={() => setShowPicker("vaccination")}
          />

          <Dropdown
  icon="repeat-outline"
  label="Next Dose Needed?*"
  value={nextDoseNeeded}
  onChange={setNextDoseNeeded}
  items={[
    { label: "No", value: "No" },
    { label: "Yes", value: "Yes" },
  ]}
/>

          <DateInput
            label="Next Vaccination Date*"
            value={formatDate(nextDate)}
            onPress={() => setShowPicker("next")}
          />
        </Section>

        {/* Expenses */}
        <Section title="Expenses">
          <Input
            icon="cash-outline"
            label="Doctor Fees*"
            value={doctorFees}
            onChangeText={setDoctorFees}
            keyboardType="numeric"
          />
          <Input
            icon="wallet-outline"
            label="Treatment Expenses*"
            value={treatmentFees}
            onChangeText={setTreatmentFees}
            keyboardType="numeric"
          />
          <Input
            icon="pricetag-outline"
            label="Other Expenses*"
            value={otherFees}
            onChangeText={setOtherFees}
            keyboardType="numeric"
          />
        </Section>

        <TextInput
  style={styles.textArea}
  multiline
  placeholder="Enter remarks"
  value={remarks}
  onChangeText={setRemarks}
/>

        {/* Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.cancelBtn}
            onPress={() => router.back()}
          >
            <AppText>{t.cancel}</AppText>
          </TouchableOpacity>

          <TouchableOpacity
  style={[styles.saveBtn, { backgroundColor: colors.primary }]}
  onPress={handleSaveVaccination}
  disabled={loading}
>
  <Ionicons name="save-outline" size={18} color="#fff" />
  <AppText style={styles.saveText}>
    {loading ? "Saving..." : t.saveVaccination}
  </AppText>
</TouchableOpacity>
        </View>
      </ScrollView>

      {showPicker && (
        <DateTimePicker
          value={
            showPicker === "expiry"
              ? expiryDate
              : showPicker === "vaccination"
              ? vaccinationDate
              : nextDate
          }
          mode="date"
          display={Platform.OS === "android" ? "default" : "spinner"}
          onChange={onChangeDate}
        />
      )}
    </View>
  );
};

export default Vaccination;

/* COMPONENTS */

const Section = ({ title, children }: any) => (
  <View style={styles.section}>
    <AppText style={styles.sectionTitle}>{title}</AppText>
    {children}
  </View>
);

const Input = ({ icon, label, ...props }: any) => (
  <View style={styles.inputWrapper}>
    <AppText style={styles.label}>{label}</AppText>
    <View style={styles.inputBox}>
      <Ionicons name={icon} size={18} color="#9ca3af" />
      <TextInput style={styles.input} {...props} />
    </View>
  </View>
);

const DateInput = ({ label, value, onPress }: any) => (
  <View style={styles.inputWrapper}>
    <AppText style={styles.label}>{label}</AppText>
    <TouchableOpacity style={styles.inputBox} onPress={onPress}>
      <Ionicons name="calendar-outline" size={18} color="#9ca3af" />
      <TextInput
        style={styles.input}
        value={value}
        editable={false}
        pointerEvents="none"
      />
    </TouchableOpacity>
  </View>
);

const Dropdown = ({ icon, label, value, onChange, items }: any) => (
  <View style={styles.inputWrapper}>
    <AppText style={styles.label}>{label}</AppText>

    <View style={styles.dropdownBox}>
      <Ionicons
        name={icon}
        size={18}
        color="#9ca3af"
        style={{ marginRight: 8 }}
      />

      <Picker
        selectedValue={value}
        onValueChange={onChange}
        dropdownIconColor="#6b7280"
        style={styles.picker}
        mode="dropdown"
      >
        {items.map((i: any, idx: number) => (
          <Picker.Item key={idx} label={i.label} value={i.value} />
        ))}
      </Picker>
    </View>
  </View>
);


/* ================= STYLES ================= */

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#f8fafc" },

  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },

  headerIcon: {
    backgroundColor: "#dcfce7",
    padding: 10,
    borderRadius: 50,
    marginRight: 12,
  },

  headerTitle: { fontSize: 18, fontWeight: "600" },
  headerSub: { fontSize: 12, color: "#6b7280" },

  content: { padding: 16, paddingBottom: 30 },

  section: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
    marginBottom: 18,
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 12,
    borderBottomWidth: 1,
    borderColor: "#e5e7eb",
    paddingBottom: 6,
  },

  inputWrapper: { marginBottom: 14 },
  label: { fontSize: 12, marginBottom: 6 },

  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9fafb",
    borderRadius: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },

  input: { flex: 1, padding: 10 },

  // dropdownBox: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   backgroundColor: "#f9fafb",
  //   borderRadius: 10,
  //   borderWidth: 1,
  //   borderColor: "#e5e7eb",
  // },
  dropdownBox: {
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: "#f9fafb",
  borderRadius: 10,
  borderWidth: 1,
  borderColor: "#e5e7eb",
  paddingHorizontal: 10,
  height: 50,
},

picker: {
  flex: 1,
  height: 50,
  color: "#111827",
},

  //picker: { flex: 1, height: 48 },

  textArea: {
    height: 90,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    padding: 12,
    backgroundColor: "#f9fafb",
    textAlignVertical: "top",
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },

  cancelBtn: {
    width: "45%",
    borderWidth: 1,
    borderColor: "#d1d5db",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "#fff",
  },

  saveBtn: {
    width: "45%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#16a34a",
    padding: 14,
    borderRadius: 10,
  },

  saveText: {
    color: "#fff",
    fontWeight: "600",
    marginLeft: 8,
  },
});
