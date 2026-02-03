import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import Success from "../success";

const cattleStates = [
  { label: "Heifer", value: "heifer" },
  { label: "On Heat & lactating", value: "on_heat_&_lactating" },
  { label: "On Heat & Not lactating", value: "on_heat_&_not_lactating" },
  { label: "Calved", value: "calved" },
  { label: "Calved & lactating", value: "calved_&_lactating" },
  { label: "Calved & Not lactating", value: "calved_&_not_lactating" },
  { label: "Inseminated & lactating", value: "inseminated_&_lactating" },
  {
    label: "Inseminated & Not lactating",
    value: "inseminated_&_not_lactating",
  },
  { label: "Pregnant & lactating", value: "pregnant_&_lactating" },
  { label: "Pregnant & Not lactating", value: "pregnant_&_not_lactating" },
  { label: "Non Pregnant & lactating", value: "non_pregnant_&_lactating" },
  {
    label: "Non Pregnant & Not lactating",
    value: "non_pregnant_&_not_lactating",
  },
  { label: "Dry off", value: "dry_off" },
];

const cattleStatuses = [
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
];

// Mock data - replace with your actual data source (e.g., API call)
const workers = [
  { label: "Ram", value: "ram" },
  { label: "Sham", value: "sham" },
];
const vets = [
  { label: "Dr. Patil", value: "dr_patil" },
  { label: "Dr. Shinde", value: "dr_shinde" },
];

const req = <Text style={{ color: "red" }}> *</Text>;

const reset = {
  status: "active",
  workerAssigned: null,
  vetAssigned: null,
  state: null,
  currentStateDate: null,
  bloodLine: "",
  insuranceNumber: "",
  lactationNumber: "",
  remark: "",
};

export default function HealthAndManagement() {
  const [isSaved, setIsSaved] = useState(false);
  const [formData, setFormData] = useState({
    status: "active",
    workerAssigned: null,
    vetAssigned: null,
    state: null,
    currentStateDate: null,
    bloodLine: "",
    insuranceNumber: "",
    lactationNumber: "",
    remark: "",
  });

  const [errors, setErrors] = useState({});
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Separate focus state for each dropdown
  const [isStatusFocus, setIsStatusFocus] = useState(false);
  const [isWorkerFocus, setIsWorkerFocus] = useState(false);
  const [isVetFocus, setIsVetFocus] = useState(false);
  const [isStateFocus, setIsStateFocus] = useState(false);

  const router = useRouter();

  const handleSave = () => {
    let newErrors = {};
    // if (!formData.status) newErrors.status = "Status is required";
    if (!formData.workerAssigned)
      newErrors.workerAssigned = "Worker is required";
    if (!formData.vetAssigned) newErrors.vetAssigned = "Vet is required";
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.currentStateDate)
      newErrors.currentStateDate = "Date is required";
    // if (!formData.bloodLine.trim())
    //   newErrors.bloodLine = "Blood Line is required";
    // if (!formData.insuranceNumber.trim())
    //   newErrors.insuranceNumber = "Insurance Number is required";
    if (!formData.lactationNumber.trim())
      newErrors.lactationNumber = "Lactation Number is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Saving Health & Management data...", formData);
      setIsSaved(true);
      setTimeout(() => {
        router.push("../../tabs");
      }, 2000);
      setFormData(reset);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setFormData({
        ...formData,
        currentStateDate: selectedDate,
      });
      setErrors((prev) => ({ ...prev, currentStateDate: null }));
    }
  };

  const setFormValue = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: null }));
  };

  if (isSaved) {
    return <Success style={{ flex: 1, backgroundColor: "#bbffc4" }} />;
  }

  if (isSaved) {
    setTimeout(() => {
      setIsSaved(false);
    }, 2000);
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Add New Cattle</Text>
        <Text style={styles.headerSub}>Register a Cattle with details</Text>
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Health & Management</Text>
          <View style={styles.separator} />

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Status{req}</Text>
            <Dropdown
              style={[
                styles.dropdown,
                isStatusFocus && { borderColor: "#2D6A4F" },
                errors.status && { borderColor: "red" },
              ]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              data={cattleStatuses}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isStatusFocus ? "Select status" : "..."}
              value={formData.status}
              onFocus={() => setIsStatusFocus(true)}
              onBlur={() => setIsStatusFocus(false)}
              onChange={(item) => {
                setFormValue("status", item.value);
                setIsStatusFocus(false);
              }}
            />
            {/* {errors.status && (
              <Text style={styles.errorText}>{errors.status}</Text>
            )} */}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Worker Assigned{req}</Text>
            <Dropdown
              style={[
                styles.dropdown,
                isWorkerFocus && { borderColor: "#2D6A4F" },
                errors.workerAssigned && { borderColor: "red" },
              ]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              // inputSearchStyle={styles.inputSearchStyle}
              data={workers}
              // search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isWorkerFocus ? "Select worker" : "..."}
              // searchPlaceholder="Search worker..."
              value={formData.workerAssigned}
              onFocus={() => setIsWorkerFocus(true)}
              onBlur={() => setIsWorkerFocus(false)}
              onChange={(item) => {
                setFormValue("workerAssigned", item.value);
                setIsWorkerFocus(false);
              }}
            />
            {errors.workerAssigned && (
              <Text style={styles.errorText}>{errors.workerAssigned}</Text>
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Vet Assigned{req}</Text>
            <Dropdown
              style={[
                styles.dropdown,
                isVetFocus && { borderColor: "#2D6A4F" },
                errors.vetAssigned && { borderColor: "red" },
              ]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              // inputSearchStyle={styles.inputSearchStyle}
              data={vets}
              // search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isVetFocus ? "Select vet" : "..."}
              // searchPlaceholder="Search vet..."
              value={formData.vetAssigned}
              onFocus={() => setIsVetFocus(true)}
              onBlur={() => setIsVetFocus(false)}
              onChange={(item) => {
                setFormValue("vetAssigned", item.value);
                setIsVetFocus(false);
              }}
            />
            {errors.vetAssigned && (
              <Text style={styles.errorText}>{errors.vetAssigned}</Text>
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>State{req}</Text>
            <Dropdown
              style={[
                styles.dropdown,
                isStateFocus && { borderColor: "#2D6A4F" },
                errors.state && { borderColor: "red" },
              ]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              // inputSearchStyle={styles.inputSearchStyle}
              data={cattleStates}
              // search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isStateFocus ? "Select State" : "..."}
              // searchPlaceholder="Search state..."
              value={formData.state}
              onFocus={() => setIsStateFocus(true)}
              onBlur={() => setIsStateFocus(false)}
              onChange={(item) => {
                setFormValue("state", item.value);
                setIsStateFocus(false);
              }}
            />
            {errors.state && (
              <Text style={styles.errorText}>{errors.state}</Text>
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Current State Date{req}</Text>
            <TouchableOpacity
              style={[
                styles.input,
                errors.currentStateDate && styles.inputError,
                { justifyContent: "center" },
              ]}
              onPress={() => setShowDatePicker(true)}
            >
              <Text
                style={{ color: formData.currentStateDate ? "#000" : "#999" }}
              >
                {formData.currentStateDate
                  ? formData.currentStateDate.toLocaleDateString()
                  : "Select Date"}
              </Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={formData.currentStateDate || new Date()}
                mode="date"
                display="default"
                onChange={handleDateChange}
                maximumDate={new Date()}
              />
            )}
            {errors.currentStateDate && (
              <Text style={styles.errorText}>{errors.currentStateDate}</Text>
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Blood Line</Text>
            <TextInput
              style={[styles.input, errors.bloodLine && styles.inputError]}
              value={formData.bloodLine}
              onChangeText={(val) => setFormValue("bloodLine", val)}
            />
            {errors.bloodLine && (
              <Text style={styles.errorText}>{errors.bloodLine}</Text>
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Insurance Number</Text>
            <TextInput
              style={[
                styles.input,
                errors.insuranceNumber && styles.inputError,
              ]}
              placeholder="e.g. INS-2024-001"
              value={formData.insuranceNumber}
              onChangeText={(val) => setFormValue("insuranceNumber", val)}
            />
            {errors.insuranceNumber && (
              <Text style={styles.errorText}>{errors.insuranceNumber}</Text>
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Lactation Number{req}</Text>
            <TextInput
              style={[
                styles.input,
                errors.lactationNumber && styles.inputError,
              ]}
              placeholder="e.g. 3"
              value={formData.lactationNumber}
              keyboardType="numeric"
              onChangeText={(val) => setFormValue("lactationNumber", val)}
            />
            {errors.lactationNumber && (
              <Text style={styles.errorText}>{errors.lactationNumber}</Text>
            )}
          </View>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Cattle Images</Text>
          <View style={styles.separator} />
          <TouchableOpacity style={styles.uploadBox}>
            <Ionicons name="cloud-upload-outline" size={40} color="#000000" />
            <Text style={styles.uploadText}>Click to upload Cattle images</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Additional Information</Text>
          <View style={styles.separator} />
          <Text style={styles.label}>Remarks</Text>
          <TextInput
            style={styles.remarkInput}
            placeholder="Add any additional remarks here..."
            multiline={true}
            numberOfLines={4}
            value={formData.remark}
            onChangeText={(val) => setFormValue("remark", val)}
          />
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.backBtn} onPress={handleCancel}>
            <Text style={styles.backBtnText}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
            <Ionicons name="save-outline" size={20} color="white" />
            <Text style={styles.saveBtnText}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa" },
  header: { paddingBottom: 8, marginLeft: 20, paddingTop: 30 },
  headerTitle: { fontSize: 24, fontWeight: "bold", color: "#333" },
  headerSub: { fontSize: 14, color: "#666" },
  scrollContent: { padding: 20 },
  sectionCard: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2D6A4F",
    marginBottom: 5,
  },
  separator: { height: 1, backgroundColor: "#eee", marginBottom: 15 },
  inputGroup: { marginBottom: 15 },
  label: { fontSize: 14, fontWeight: "500", marginBottom: 5, color: "#444" },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    padding: 10,
    backgroundColor: "#fff",
    minHeight: 48,
  },
  inputError: { borderColor: "red" },
  errorText: { color: "red", fontSize: 11, marginTop: 4 },
  dropdown: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 8,
    backgroundColor: "white",
  },
  placeholderStyle: { fontSize: 14, color: "#999" },
  selectedTextStyle: { fontSize: 14 },
  inputSearchStyle: { height: 40, fontSize: 14 },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
    paddingBottom: 40,
  },
  uploadBox: {
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#5fcd54",
    borderRadius: 10,
    backgroundColor: "#e0f5e5c3",
    marginBottom: 20,
  },
  uploadText: { marginTop: 8, color: "#333" },
  saveBtn: {
    flexDirection: "row",
    backgroundColor: "#2D6A4F",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    gap: 8,
  },
  saveBtnText: { color: "white", fontWeight: "bold" },
  backBtn: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: "#f1f1f1",
  },
  backBtnText: { color: "#666", fontWeight: "bold" },
  remarkInput: {
    height: 100,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    padding: 10,
    backgroundColor: "#fff",
    textAlignVertical: "top",
  },
});
