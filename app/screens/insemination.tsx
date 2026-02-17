import { POST } from "@/api/methods";
import { ENDPOINTS } from "@/api/endpoints";
import React, { useState } from "react";
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Button,
} from "react-native";


import { useTheme } from "@/theme/useTheme";
import { useLanguage } from '@/constants/localization/useLanguage';
import { useNavigation } from "@react-navigation/native";


const InseminationForm = () => {

  const { colors } = useTheme();
  const navigation = useNavigation();
  const { t } = useLanguage();

  const [bodyTemp, setBodyTemp] = useState("");
  const [isLactating, setIsLactating] = useState("");
  const [mucusQuality, setMucusQuality] = useState("");
  const [bcsScore, setBcsScore] = useState("");
  const [inseminationDateString, setInseminationDateString] = useState("");
  const [aiType, setAiType] = useState("");
  const [strawId, setStrawId] = useState("");
  const [semenCompany, setSemenCompany] = useState("");
  const [semenType, setSemenType] = useState("");
  const [bullCode, setBullCode] = useState("");
  const [inseminatorName, setInseminatorName] = useState("");
  const [pregBooster, setPregBooster] = useState("");
  const [doctorFees, setDoctorFees] = useState("");
  const [treatmentExpenses, setTreatmentExpenses] = useState("");
  const [otherExpenses, setOtherExpenses] = useState("");
  const [inseminationExpenses, setInseminationExpenses] = useState("");
  const [nextHeatDateString, setNextHeatDateString] = useState("");
  const [pdDateString, setPdDateString] = useState("");
  const [remarks, setRemarks] = useState("");


  
  const handleSave = async () => {
  if (
    !bodyTemp ||
    !isLactating ||
    !mucusQuality ||
    !bcsScore ||
    !aiType ||
    !strawId ||
    !semenCompany ||
    !semenType ||
    !bullCode ||
    !inseminatorName ||
    !pregBooster ||
    !doctorFees ||
    !treatmentExpenses ||
    !otherExpenses ||
    !inseminationExpenses ||
    !inseminationDateString ||
    !nextHeatDateString ||
    !pdDateString
  ) {
    Alert.alert("Error", "Please fill all mandatory fields (*)");
    return;
  }

  try {
    await POST<any>(ENDPOINTS.insemination.create, {
      bodyTemperature: bodyTemp,
      isLactating,
      mucusQuality,
      bcsScore,
      inseminationDate: inseminationDateString,
      aiType,
      strawId,
      semenCompany,
      semenType,
      bullCode,
      inseminatorName,
      pregBooster,
      doctorFees,
      treatmentExpenses,
      otherExpenses,
      inseminationExpenses,
      nextHeatDate: nextHeatDateString,
      pdDate: pdDateString,
      remarks,
    });

    Alert.alert("Success", "Insemination record saved");
    navigation.goBack();
  } catch (error) {
    console.log("Insemination API error:", error);
    Alert.alert("Error", "Failed to save insemination record");
  }
};

  const RadioButtonGroup = ({ options, selected, onSelect }: any) => (
    <View style={{ flexDirection: "row", flexWrap: "wrap", marginVertical: 4 }}>
      {options.map((option: string) => (
        <TouchableOpacity
          key={option}
          style={styles.radioRow}
          onPress={() => onSelect(option)}
        >
          <View style={styles.radioOuter}>
            {selected === option && <View style={styles.radioInner} />}
          </View>
          <Text style={styles.radioText}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );


const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [loading, setLoading] = useState(false);
const [loggedIn, setLoggedIn] = useState(false);


  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Insemination Record (C003)</Text>
        <Text style={styles.headerSubtitle}>
          Record complete insemination and reproductive data
        </Text>
      </View>

      {/* Section 1 */}
      <Text style={styles.sectionTitle}>Animal Body Metrics</Text>
      <View style={styles.sectionBox}>
        <Text style={styles.label}>Body Temperature *</Text>
        <TextInput
          style={styles.input}
          placeholder="37.5 – 39"
          keyboardType="numeric"
          value={bodyTemp}
          onChangeText={setBodyTemp}
        />

        <Text style={styles.label}>Is Cattle Lactating *</Text>
        <RadioButtonGroup
          options={["Yes", "No"]}
          selected={isLactating}
          onSelect={setIsLactating}
        />

        <Text style={styles.label}>Mucus Quality *</Text>
        <RadioButtonGroup
          options={["Clear", "White", "Smelly", "Mixed"]}
          selected={mucusQuality}
          onSelect={setMucusQuality}
        />

        <Text style={styles.label}>BCS Score *</Text>
        <TextInput
          style={styles.input}
          placeholder="1 – 5"
          keyboardType="numeric"
          value={bcsScore}
          onChangeText={setBcsScore}
        />
      </View>

      {/* Section 2 */}
      <Text style={styles.sectionTitle}>Insemination Details</Text>
      <View style={styles.sectionBox}>
        <Text style={styles.label}>Insemination Date & Time *</Text>
        <TextInput
          style={styles.input}
          placeholder="dd/mm/yyyy hh:mm"
          value={inseminationDateString}
          onChangeText={setInseminationDateString}
        />

        <Text style={styles.label}>AI Type *</Text>
        <RadioButtonGroup
          options={["First AI", "Repeat AI"]}
          selected={aiType}
          onSelect={setAiType}
        />

        <Text style={styles.label}>Semen Straw ID *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Straw ID"
          value={strawId}
          onChangeText={setStrawId}
        />

        <Text style={styles.label}>Semen Company *</Text>
        <RadioButtonGroup
          options={["ABS", "BAIF", "Govt", "Other"]}
          selected={semenCompany}
          onSelect={setSemenCompany}
        />

        <Text style={styles.label}>Semen Type *</Text>
        <RadioButtonGroup
          options={["Conventional", "Sexed"]}
          selected={semenType}
          onSelect={setSemenType}
        />

        <Text style={styles.label}>Bull Code *</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. BULL 5678"
          value={bullCode}
          onChangeText={setBullCode}
        />

        <Text style={styles.label}>Inseminator Name *</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Dr. Mayuri Deshmukh"
          value={inseminatorName}
          onChangeText={setInseminatorName}
        />

        <Text style={styles.label}>Pregnancy Booster Hormone Given *</Text>
        <RadioButtonGroup
          options={["Yes", "No"]}
          selected={pregBooster}
          onSelect={setPregBooster}
        />
      </View>

      {/* Section 3 */}
      <Text style={styles.sectionTitle}>Expenses</Text>
      <View style={styles.sectionBox}>
        <Text style={styles.label}>Doctor Fees *</Text>
        <TextInput
          style={styles.input}
          placeholder="0"
          keyboardType="numeric"
          value={doctorFees}
          onChangeText={setDoctorFees}
        />

        <Text style={styles.label}>Treatment Expenses *</Text>
        <TextInput
          style={styles.input}
          placeholder="0"
          keyboardType="numeric"
          value={treatmentExpenses}
          onChangeText={setTreatmentExpenses}
        />

        <Text style={styles.label}>Other Expenses *</Text>
        <TextInput
          style={styles.input}
          placeholder="0"
          keyboardType="numeric"
          value={otherExpenses}
          onChangeText={setOtherExpenses}
        />

        <Text style={styles.label}>Insemination Expenses *</Text>
        <TextInput
          style={styles.input}
          placeholder="0"
          keyboardType="numeric"
          value={inseminationExpenses}
          onChangeText={setInseminationExpenses}
        />
      </View>

      {/* Section 4 */}
      <Text style={styles.sectionTitle}>Post AI Scheduling (Auto-calculated)</Text>
      <View style={styles.sectionBox}>
        <Text style={styles.label}>Next Heat Expected Date *</Text>
        <TextInput
          style={styles.input}
          placeholder="dd/mm/yyyy"
          value={nextHeatDateString}
          onChangeText={setNextHeatDateString}
        />

        <Text style={styles.label}>Pregnancy Diagnosis Date (PD) *</Text>
        <TextInput
          style={styles.input}
          placeholder="dd/mm/yyyy"
          value={pdDateString}
          onChangeText={setPdDateString}
        />
      </View>

      {/* Section 5 */}
      <Text style={styles.sectionTitle}>Additional Notes</Text>
      <View style={styles.sectionBox}>
        <TextInput
          style={[styles.input, { height: 80 }]}
          placeholder="Any special notes, unusual observations…"
          value={remarks}
          onChangeText={setRemarks}
          multiline
        />
      </View>

      {/* Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.button, styles.backButton]}
          onPress={() => navigation.goBack()}
  >
           <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.saveButton]}
          onPress={handleSave}
        >
          <Text style={styles.buttonText}>Save Insemination Record</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default InseminationForm;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f2f5f8", padding: 16 },
  header: { marginBottom: 20, backgroundColor: "#e6f4ea", padding: 16, borderRadius: 10 },
  headerTitle: { fontSize: 22, fontWeight: "bold", color: "#1f6d3a" },
  headerSubtitle: { fontSize: 14, color: "#4a4a4a", marginTop: 6 },

  sectionTitle: { fontSize: 16, fontWeight: "bold", color: "#1f6d3a", marginVertical: 8 },
  sectionBox: { backgroundColor: "#ffffff", padding: 14, borderRadius: 10, borderWidth: 1, borderColor: "#bde5c7", marginBottom: 16 },

  label: { marginTop: 8, fontWeight: "600", color: "#333" },
  input: {
    borderWidth: 1,
    borderColor: "#c4c4c4",
    borderRadius: 6,
    padding: 10,
    marginVertical: 6,
    backgroundColor: "#fafafa",
  },

  radioRow: { flexDirection: "row", alignItems: "center", marginRight: 16, marginVertical: 4 },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#1f6d3a",
    marginRight: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#1f6d3a",
  },
  radioText: { marginRight: 10, color: "#333" },

  buttonRow: { flexDirection: "row", justifyContent: "space-between", marginVertical: 20 },
  button: { flex: 1, padding: 14, borderRadius: 8, alignItems: "center", marginHorizontal: 4 },
  backButton: {
  backgroundColor: "#64748B", // grey back button
  flex: 1,
  marginRight: 10,
},

  saveButton: { backgroundColor: "#1f6d3a" },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 14 },
});
