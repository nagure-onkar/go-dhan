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

const buffaloBreeds = [
  { label: "Murrah", value: "murrah" },
  { label: "Nili Ravi", value: "nili_ravi" },
  { label: "Bhadawari", value: "bhadawari" },
  { label: "Mehsana", value: "mehsana" },
  { label: "Surti", value: "surti" },
  { label: "Jaffarabadi", value: "jaffarabadi" },
  { label: "Nagpuri", value: "nagpuri" },
  { label: "Pandharpuri", value: "pandharpuri" },
  { label: "Marathwadi", value: "marathwadi" },
  { label: "Toda", value: "toda" },
];

const cowBreeds = [
  { label: "HF", value: "hf" },
  { label: "Jersey", value: "jersey" },
  { label: "Brown Swiss", value: "brown swiss" },
  { label: "Karan Fries", value: "karan fries" },
  { label: "Karan Swiss", value: "karan swiss" },
  { label: "Frieswal", value: "frieswal" },
  { label: "Sunandini", value: "sunandini" },
  { label: "Phule Triveni", value: "phule triveni" },
  { label: "Vrindavani", value: "vrindavani" },
  { label: "Jersindh", value: "jersindh" },
  { label: "Gir", value: "gir" },
  { label: "Sahiwal", value: "sahiwal" },
  { label: "Red Sindhi", value: "red sindhi" },
  { label: "Tharparkar", value: "tharparkar" },
  { label: "Rathi", value: "rathi" },
  { label: "Kankrej", value: "kankrej" },
];

const breed = [
  { label: "Buffalo", value: "buffalo" },
  { label: "Cow", value: "cow" },
];

const ColostrumIntakes = [
  {
    label: "Calf Successfully suckled colostrum",
    value: "Calf_Successfully_suckled_colostrum",
  },
  {
    label: "Artificial feeding was required",
    value: "Artificial_feeding_was_required",
  },
];

const calvingTypes = [
  { label: "Assisted", value: "Assisted" },
  { label: "C-Section", value: "C-Section" },
  { label: "Premature", value: "Premature" },
  { label: "Normal Delivery", value: "Normal_Delivery" },
];

const HealthObservations = [
  { label: "Treatment Required", value: "Treatment_Required" },
  { label: "Fully fit Calf", value: "Fully_fit_Calf" },
];

const validateForm = (data, rules) => {
  let errors = {};

  Object.keys(rules).forEach((field) => {
    const value = data[field];
    const errorMessage = rules[field];

    // Logical Check: If value is missing OR is a string that's just empty spaces
    if (!value || (typeof value === "string" && !value.trim())) {
      errors[field] = errorMessage;
    }
  });

  return errors;
};
const reset = {
  cattleId: "",
  cattleName: "",
  cattleType: "buffalo",
  breed: null,
  ColostrumIntake: null,
  HealthObservations: null,
  gender: "Female",
  calvingType: "",
  treatment: "",
  nddbNumber: "",
  dob: null,
  age: "",
  weight: "",
};

export default function AddCalfForm() {
  const [formData, setFormData] = useState({
    cattleId: "",
    cattleName: "",
    cattleType: "buffalo",
    breed: null,
    ColostrumIntake: null,
    HealthObservations: null,
    gender: "Female",
    calvingType: "",
    treatment: "",
    nddbNumber: "",
    treatmentExpence: "",
    dob: null,
    age: "",
    weight: "",
  });

  const [errors, setErrors] = useState({});
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [focusState, setFocusState] = useState({
    cattleType: false,
    breed: false,
    colostrumIntake: false,
    healthObservations: false,
    calvingType: false,
  });
  const router = useRouter();
  const req = <Text style={{ color: "red" }}> *</Text>;

  const handleSave = () => {
    // 1. Define what needs to be checked
    const validationRules = {
      cattleId: "Cattle ID is required",
      cattleName: "Cattle Name is required",
      cattleType: "Cattle type is required",
      breed: "Please select a breed",
      treatment: "Treatment is required",
      treatmentExpence: "Cost is required",
      dob: "Date of Birth is required",
      age: "Age is required",
      weight: "Weight is required",
      ColostrumIntake: "Colostrum Intake is required",
      HealthObservations: "Health Observations is required",
      calvingType: "Calving Type is required",
    };

    // 2. Call the function
    const validationErrors = validateForm(formData, validationRules);

    // 3. Update the UI state
    setErrors(validationErrors);

    // 4. If no errors (empty object), move to next screen
    if (Object.keys(validationErrors).length === 0) {
      console.log("Success! Navigating...");
      router.push("./HealthManagement");
      setFormData(reset);
    }
  };

  const handleCancel = () => {
    router.back(); // Standard practice for cancel buttons
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const today = new Date();
      let ageYears = today.getFullYear() - selectedDate.getFullYear();
      const monthDifference = today.getMonth() - selectedDate.getMonth();
      if (
        monthDifference < 0 ||
        (monthDifference === 0 && today.getDate() < selectedDate.getDate())
      ) {
        ageYears--;
      }
      setFormData({
        ...formData,
        dob: selectedDate,
        age: ageYears.toString(),
      });
    }
  };

  const setFocus = (field, value) => {
    setFocusState((prevState) => ({ ...prevState, [field]: value }));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Add New Calf</Text>
        <Text style={styles.headerSub}>
          Register a newborn Calf with details
        </Text>
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled" // CRITICAL: Allows dropdown to click while keyboard is open
      >
        {/* <View style={styles.header}>
          <Text style={styles.headerTitle}>Add New Calf</Text>
          <Text style={styles.headerSub}>
            Register a newborn Calf with details
          </Text>
        </View> */}

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Basic Information</Text>
          <View style={styles.separator} />

          {/* Cattle ID */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Cattle ID{req}</Text>
            <TextInput
              style={[styles.input, errors.cattleId && styles.inputError]}
              placeholder="e.g. CAF-001"
              value={formData.cattleId}
              onChangeText={(val) =>
                setFormData({ ...formData, cattleId: val })
              }
            />
            {errors.cattleId && (
              <Text style={styles.errorText}>{errors.cattleId}</Text>
            )}
          </View>

          {/* Cattle Name */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Cattle Name{req}</Text>
            <TextInput
              style={[styles.input, errors.cattleName && styles.inputError]}
              placeholder="e.g. Daisy"
              value={formData.cattleName}
              onChangeText={(val) =>
                setFormData({ ...formData, cattleName: val })
              }
            />
            {errors.cattleName && (
              <Text style={styles.errorText}>{errors.cattleName}</Text>
            )}
          </View>

          {/* Dropdown: Cattle Type Selection */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Cattle Type{req}</Text>
            <Dropdown
              style={[
                styles.dropdown,
                focusState.cattleType && { borderColor: "#2D6A4F" },
                errors.cattleType && { borderColor: "red" },
              ]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              // inputSearchStyle={styles.inputSearchStyle}
              data={breed}
              // search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={
                !focusState.cattleType ? "Select cattle type" : "..."
              }
              // searchPlaceholder="Search type..."
              value={formData.cattleType}
              onFocus={() => setFocus("cattleType", true)}
              onBlur={() => setFocus("cattleType", false)}
              onChange={(item) => {
                setFormData({
                  ...formData,
                  cattleType: item.value,
                  breed: null,
                });
                setFocus("cattleType", false);
                setErrors((prev) => ({
                  ...prev,
                  cattleType: null,
                  breed: null,
                }));
              }}
            />
            {errors.cattleType && (
              <Text style={styles.errorText}>{errors.cattleType}</Text>
            )}
          </View>

          {/* Dropdown: Breed Selection */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Breed{req}</Text>
            <Dropdown
              style={[
                styles.dropdown,
                focusState.breed && { borderColor: "#2D6A4F" },
                errors.breed && { borderColor: "red" },
              ]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              // inputSearchStyle={styles.inputSearchStyle}
              data={
                formData.cattleType === "buffalo" ? buffaloBreeds : cowBreeds
              }
              // search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!focusState.breed ? "Select breed" : "..."}
              // searchPlaceholder="Search breed..."
              value={formData.breed}
              onFocus={() => setFocus("breed", true)}
              onBlur={() => setFocus("breed", false)}
              onChange={(item) => {
                setFormData({ ...formData, breed: item.value });
                setFocus("breed", false);
                setErrors((prev) => ({ ...prev, breed: null }));
              }}
              disable={!formData.cattleType}
            />
            {errors.breed && (
              <Text style={styles.errorText}>{errors.breed}</Text>
            )}
          </View>

          {/* Treatment */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Treatment{req}</Text>
            <TextInput
              style={[styles.input, errors.treatment && styles.inputError]}
              placeholder="e.g. Vaccination"
              value={formData.treatment}
              onChangeText={(val) =>
                setFormData({ ...formData, treatment: val })
              }
            />
            {errors.treatment && (
              <Text style={styles.errorText}>{errors.treatment}</Text>
            )}
          </View>

          {/* Treatment Expence */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Treatment Expence (₹){req}</Text>
            <TextInput
              style={[
                styles.input,
                errors.treatmentExpence && styles.inputError,
              ]}
              placeholder="Enter treatment cost"
              value={formData.treatmentExpence}
              keyboardType="numeric"
              onChangeText={(val) =>
                setFormData({ ...formData, treatmentExpence: val })
              }
            />
            {errors.treatmentExpence && (
              <Text style={styles.errorText}>{errors.treatmentExpence}</Text>
            )}
          </View>

          {/* Colostrum Intake */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Colostrum Intake{req}</Text>
            <Dropdown
              style={[
                styles.dropdown,
                focusState.colostrumIntake && { borderColor: "#2D6A4F" },
                errors.ColostrumIntake && { borderColor: "red" },
              ]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              // inputSearchStyle={styles.inputSearchStyle}
              data={ColostrumIntakes}
              // search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={
                !focusState.colostrumIntake ? "Select ColostrumIntake" : "..."
              }
              // searchPlaceholder="Search ColostrumIntake..."
              value={formData.ColostrumIntake}
              onFocus={() => setFocus("colostrumIntake", true)}
              onBlur={() => setFocus("colostrumIntake", false)}
              onChange={(item) => {
                setFormData({ ...formData, ColostrumIntake: item.value });
                setFocus("colostrumIntake", false);
              }}
            />
            {errors.ColostrumIntake && (
              <Text style={styles.errorText}>{errors.ColostrumIntake}</Text>
            )}
          </View>

          {/* Health Observations */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Health Observations {req}</Text>
            <Dropdown
              style={[
                styles.dropdown,
                focusState.healthObservations && { borderColor: "#2D6A4F" },
                errors.HealthObservations && { borderColor: "red" },
              ]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              // inputSearchStyle={styles.inputSearchStyle}
              data={HealthObservations}
              // search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={
                !focusState.healthObservations
                  ? "Select Health Observations"
                  : "..."
              }
              // searchPlaceholder="Search Health Observations..."
              value={formData.HealthObservations}
              onFocus={() => setFocus("healthObservations", true)}
              onBlur={() => setFocus("healthObservations", false)}
              onChange={(item) => {
                setFormData({ ...formData, HealthObservations: item.value });
                setFocus("healthObservations", false);
              }}
            />
            {errors.HealthObservations && (
              <Text style={styles.errorText}>{errors.HealthObservations}</Text>
            )}
          </View>

          {/* NDDB Number */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>NDDB Registration Number</Text>
            <TextInput
              style={[styles.input, errors.nddbNumber && styles.inputError]}
              placeholder="e.g. U01403DL2009NPL195142"
              value={formData.nddbNumber}
              onChangeText={(val) =>
                setFormData({ ...formData, nddbNumber: val })
              }
            />
            {errors.nddbNumber && (
              <Text style={styles.errorText}>{errors.nddbNumber}</Text>
            )}
          </View>

          {/* Gender Selector */}
          <Text style={styles.label}>Gender{req}</Text>
          <View style={styles.genderRow}>
            {["Male", "Female"].map((gender) => (
              <TouchableOpacity
                key={gender}
                style={[
                  styles.genderBtn,
                  formData.gender === gender && styles.genderBtnActive,
                ]}
                onPress={() => setFormData({ ...formData, gender: gender })}
              >
                <Text
                  style={
                    formData.gender === gender
                      ? styles.genderTextActive
                      : styles.genderText
                  }
                >
                  {gender}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Birth Details</Text>
          <View style={styles.separator} />
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Dam (Mother Cattle){req}</Text>
            <TextInput
              style={styles.input}
              placeholder="Search Mother Cattle"
            />
          </View>

          {/* Calving Type */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Calving Type {req}</Text>
            <Dropdown
              style={[
                styles.dropdown,
                focusState.calvingType && { borderColor: "#2D6A4F" },
                errors.calvingType && { borderColor: "red" },
              ]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              // inputSearchStyle={styles.inputSearchStyle}
              data={calvingTypes}
              // search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={
                !focusState.calvingType ? "Select Calving Type" : "..."
              }
              // searchPlaceholder="Search Calving Type..."
              value={formData.calvingType}
              onFocus={() => setFocus("calvingType", true)}
              onBlur={() => setFocus("calvingType", false)}
              onChange={(item) => {
                setFormData({ ...formData, calvingType: item.value });
                setFocus("calvingType", false);
              }}
            />
            {errors.calvingType && (
              <Text style={styles.errorText}>{errors.calvingType}</Text>
            )}
          </View>

          {/* DOB */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Date of Birth{req}</Text>
            <TouchableOpacity
              style={[
                styles.input,
                errors.dob && styles.inputError,
                { justifyContent: "center" },
              ]}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={{ color: formData.dob ? "#000" : "#999" }}>
                {formData.dob
                  ? formData.dob.toLocaleDateString()
                  : "Select Date"}
              </Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={formData.dob || new Date()}
                mode="date"
                display="default"
                onChange={handleDateChange}
                maximumDate={new Date()}
              />
            )}
            {errors.dob && <Text style={styles.errorText}>{errors.dob}</Text>}
          </View>

          {/* Age (auto-calculated) */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Age (Years)</Text>
            <TextInput
              style={[
                styles.input,
                styles.disabledInput,
                errors.age && styles.inputError,
              ]}
              placeholder="Select DOB to calculate age"
              value={formData.age}
              editable={false}
            />
            {errors.age && <Text style={styles.errorText}>{errors.age}</Text>}
          </View>

          {/* Weight */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Weight (Kg){req}</Text>
            <TextInput
              style={[styles.input, errors.weight && styles.inputError]}
              placeholder="500"
              value={formData.weight}
              keyboardType="numeric"
              onChangeText={(val) => setFormData({ ...formData, weight: val })}
            />
            {errors.weight && (
              <Text style={styles.errorText}>{errors.weight}</Text>
            )}
          </View>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.cancelBtn} onPress={handleCancel}>
            <Text style={styles.cancelBtnText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
            {/* <Ionicons name="save-outline" size={20} color="white" /> */}
            <Text style={styles.saveBtnText}>Next Page</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa" },
  scrollContent: { padding: 20 },
  header: { paddingBottom: 8, marginLeft: 20, paddingTop: 30 },
  headerTitle: { fontSize: 24, fontWeight: "bold", color: "#333" },
  headerSub: { fontSize: 14, color: "#666" },
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
  },
  inputError: { borderColor: "red" },
  disabledInput: { backgroundColor: "#f0f0f0", color: "#666" },
  errorText: { color: "red", fontSize: 11, marginTop: 4 },
  dropdown: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 8,
    backgroundColor: "white",
  },
  icon: { marginRight: 8 },
  placeholderStyle: { fontSize: 14, color: "#999" },
  selectedTextStyle: { fontSize: 14 },
  // inputSearchStyle: { height: 40, fontSize: 14 },
  genderRow: { flexDirection: "row", gap: 10, marginTop: 5 },
  genderBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#2D6A4F",
    alignItems: "center",
  },
  genderBtnActive: { backgroundColor: "#2D6A4F" },
  genderText: { color: "#2D6A4F", fontWeight: "600" },
  genderTextActive: { color: "white", fontWeight: "600" },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
    paddingBottom: 40,
  },
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
  cancelBtn: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: "#f1f1f1",
  },
  cancelBtnText: { color: "#666" },
});
