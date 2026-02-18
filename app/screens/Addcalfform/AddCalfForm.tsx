import { ENDPOINTS } from "@/api/endpoints";
import { GET } from "@/api/methods";
import AppText from "@/components/common/AppText";
import { useLanguage } from "@/constants/localization/useLanguage";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import Success from "../success";

const { t, setLanguage, language } = useLanguage();

const buffaloBreeds = [
  { label: `${t.murrah}`, value: "murrah" },
  { label: `${t.nili_ravi}`, value: "nili_ravi" },
  { label: `${t.bhadawari}`, value: "bhadawari" },
  { label: `${t.mehsana}`, value: "mehsana" },
  { label: `${t.surti}`, value: "surti" },
  { label: `${t.jaffarabadi}`, value: "jaffarabadi" },
  { label: `${t.nagpuri}`, value: "nagpuri" },
  { label: `${t.pandharpuri}`, value: "pandharpuri" },
  { label: `${t.marathwadi}`, value: "marathwadi" },
  { label: `${t.toda}`, value: "toda" },
];

const cowBreeds = [
  { label: `${t.hf}`, value: "hf" },
  { label: `${t.jersey}`, value: "jersey" },
  { label: `${t.brown_swiss}`, value: "brown swiss" },
  { label: `${t.karan_fries}`, value: "karan fries" },
  { label: `${t.karan_swiss}`, value: "karan swiss" },
  { label: `${t.frieswal}`, value: "frieswal" },
  { label: `${t.sunandini}`, value: "sunandini" },
  { label: `${t.phule_triveni}`, value: "phule triveni" },
  { label: `${t.vrindavani}`, value: "vrindavani" },
  { label: `${t.jersindh}`, value: "jersindh" },
  { label: `${t.gir}`, value: "gir" },
  { label: `${t.sahiwal}`, value: "sahiwal" },
  { label: `${t.red_sindhi}`, value: "red sindhi" },
  { label: `${t.tharparkar}`, value: "tharparkar" },
  { label: `${t.rathi}`, value: "rathi" },
  { label: `${t.kankrej}`, value: "kankrej" },
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

const calfStates = [
  { label: `${t.heifer}`, value: "heifer" },
  { label: `${t.on_heatlactating}`, value: "on_heatlactating" },
  { label: `${t.on_heatnot_lactating}`, value: "on_heatnot_lactating" },
  { label: `${t.calved}`, value: "calved" },
  { label: `${t.calvedlactating}`, value: "calvedlactating" },
  { label: `${t.calvednot_lactating}`, value: "calvednot_lactating" },
  { label: `${t.inseminatedlactating}`, value: "inseminatedlactating" },
  {
    label: `${t.inseminatednot_lactating}`,
    value: "inseminated_&_not_lactating",
  },
  { label: `${t.pregnantlactating}`, value: "pregnantlactating" },
  { label: `${t.pregnantnot_lactating}`, value: "pregnantnot_lactating" },
  { label: `${t.non_pregnantlactating}`, value: "non_pregnantlactating" },
  {
    label: `${t.non_pregnantnot_lactating}`,
    value: "non_pregnant_&_not_lactating",
  },
  { label: `${t.dry_off}`, value: "dry_off" },
];

const calfStatuses = [
  { label: `${t.active}`, value: "active" },
  { label: `${t.inactive}`, value: "inactive" },
];

// Mock data - replace with your actual data source (e.g., API call)
// const workers = async () => {
//   const url = "http://10.124.247.84:3000/workers";
//   let result = await fetch(url);
//   result = await result.json();
//   return result;
// };

const workers = [
  { label: "Ram", value: "ram" },
  { label: "Sham", value: "sham" },
];

const vets = [
  { label: "Dr. Patil", value: "dr_patil" },
  { label: "Dr. Shinde", value: "dr_shinde" },
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

export default function AddCalfForm() {
  const [formData, setFormData] = useState({
    calfId: "",
    calfName: "",
    calfType: "buffalo",
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
    status: "active",
    workerAssigned: null,
    vetAssigned: null,
    state: null,
    currentStateDate: null,
    insuranceNumber: "",
    remark: "",
  });

  const reset = {
    CalfId: "",
    calfName: "",
    calfType: "buffalo",
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
    status: "active",
    workerAssigned: null,
    vetAssigned: null,
    state: null,
    currentStateDate: null,
    insuranceNumber: "",
    remark: "",
  };

  const saveFormData = async (formData) => {
    const url = "http://10.124.247.84:3000/calfstock";
    let result = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    result = await result.json();
    if (result) {
      console.log("Form data saved successfully:");
    }
  };

  const [mothercalfId, setMothercalfId] = useState("");
  const [mothercalfData, setMothercalfData] = useState(null);
  const [mothercalfError, setMothercalfError] = useState("");
  const [isMothercalfLoading, setIsMothercalfLoading] = useState(false);

  const [errors, setErrors] = useState({});
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [focusState, setFocusState] = useState({
    calfType: false,
    breed: false,
    colostrumIntake: false,
    healthObservations: false,
    calvingType: false,
  });
  // Separate focus state for health management dropdowns
  const [isStatusFocus, setIsStatusFocus] = useState(false);
  const [isWorkerFocus, setIsWorkerFocus] = useState(false);
  const [isVetFocus, setIsVetFocus] = useState(false);
  const [isStateFocus, setIsStateFocus] = useState(false);
  const [showHealthManagementDatePicker, setShowHealthManagementDatePicker] =
    useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const router = useRouter();
  const req = <AppText style={{ color: "red" }}> *</AppText>;

  const handleSearchMothercalf = async () => {
    if (!mothercalfId.trim()) {
      setMothercalfError("Please enter a calf ID to search.");
      return;
    }
    setIsMothercalfLoading(true);
    setMothercalfError("");
    setMothercalfData(null);
    try {
      const result = await GET(ENDPOINTS.calf.search(mothercalfId));
      if (result) {
        setMothercalfData(result);
      } else {
        setMothercalfError("No calf found with this ID.");
      }
    } catch (error) {
      console.error(error);
      setMothercalfError("An error occurred while searching for the calf.");
    } finally {
      setIsMothercalfLoading(false);
    }
  };

  const handleSave = () => {
    // 1. Define what needs to be checked
    const validationRules = {
      status: `${t.statusrequired}`,
      workerAssigned: `${t.workerAssignedrequired}`,
      vetAssigned: `${t.vetAssignedrequired}`,
      state: `${t.staterequired}`,
      currentStateDate: `${t.currentStateDaterequired}`,
    };

    // 2. Call the function
    const validationErrors = validateForm(formData, validationRules);

    // 3. Update the UI state
    setErrors(validationErrors);

    // 4. If no errors (empty object), save and show success
    if (Object.keys(validationErrors).length === 0) {
      console.log("Success! All form data validated:", formData);
      setIsSaved(true);
      saveFormData(formData);
      setTimeout(() => {
        router.push("../../tabs");
        setIsSaved(false);
      }, 2000);
      setFormData(reset);
      {
        back();
      }
    }
  };

  const handleCancel = () => {
    router.back();
    // setFormData(reset);
  };

  const [screen1, setScreen1] = useState(true);
  const [screen2, setScreen2] = useState(false);

  const next = () => {
    const validationRules = {
      calfId: `${t.calfIdrequired}`,
      calfName: `${t.calfNamerequired}`,
      calfType: `${t.calfTyperequired}`,
      breed: `${t.breedrequired}`,
      treatment: `${t.treatmentrequired}`,
      treatmentExpence: `${t.treatmentExpencerequired}`,
      dob: `${t.dobrequired}`,
      age: `${t.agerequired}`,
      weight: `${t.weightrequired}`,
      ColostrumIntake: `${t.ColostrumIntakerequired}`,
      HealthObservations: `${t.HealthObservationsrequired}`,
      calvingType: `${t.calvingTyperequired}`,
    };
    const validationErrors = validateForm(formData, validationRules);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      setScreen1(!screen1);
      setScreen2(!screen2);
    }
    // setScreen1(!screen1);
    // setScreen2(!screen2);
  };
  const back = () => {
    setScreen1(!screen1);
    setScreen2(!screen2);
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

  const handleHealthManagementDateChange = (event, selectedDate) => {
    setShowHealthManagementDatePicker(false);
    if (selectedDate) {
      setFormData({
        ...formData,
        currentStateDate: selectedDate,
      });
      setErrors((prev) => ({ ...prev, currentStateDate: null }));
    }
  };

  const setFocus = (field, value) => {
    setFocusState((prevState) => ({ ...prevState, [field]: value }));
  };

  const setFormValue = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: null }));
  };

  if (isSaved) {
    return <Success style={{ flex: 1, backgroundColor: "#bbffc4" }} />;
  }

  if (screen1) {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.header}>
          <AppText style={styles.headerTitle}>{t.addNewCalf}</AppText>
          <AppText style={styles.headerSub}>{t.registerCalfDetails}</AppText>
        </View>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled" // CRITICAL: Allows dropdown to click while keyboard is open
        >
          <View style={styles.sectionCard}>
            <AppText style={styles.sectionTitle}>{t.basicInformation}</AppText>
            <View style={styles.separator} />

            {/* calf ID */}
            <View style={styles.inputGroup}>
              <AppText style={styles.label}>
                {t.calfId}
                {req}
              </AppText>
              <TextInput
                style={[styles.input, errors.calfId && styles.inputError]}
                placeholder="e.g. CAF-001"
                value={formData.calfId}
                onChangeText={(val) =>
                  setFormData({ ...formData, calfId: val })
                }
              />
              {errors.calfId && (
                <AppText style={styles.errorText}>{errors.calfId}</AppText>
              )}
            </View>

            {/* calf Name */}
            <View style={styles.inputGroup}>
              <AppText style={styles.label}>
                {t.calfName}
                {req}
              </AppText>
              <TextInput
                style={[styles.input, errors.calfName && styles.inputError]}
                placeholder="e.g. Daisy"
                value={formData.calfName}
                onChangeText={(val) =>
                  setFormData({ ...formData, calfName: val })
                }
              />
              {errors.calfName && (
                <AppText style={styles.errorText}>{errors.calfName}</AppText>
              )}
            </View>

            {/* Dropdown: calf Type Selection */}
            <View style={styles.inputGroup}>
              <AppText style={styles.label}>
                {t.calfType}
                {req}
              </AppText>
              <Dropdown
                style={[
                  styles.dropdown,
                  focusState.calfType && { borderColor: "#2D6A4F" },
                  errors.calfType && { borderColor: "red" },
                ]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                // inputSearchStyle={styles.inputSearchStyle}
                data={breed}
                // search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!focusState.calfType ? "Select calf type" : "..."}
                // searchPlaceholder="Search type..."
                value={formData.calfType}
                onFocus={() => setFocus("calfType", true)}
                onBlur={() => setFocus("calfType", false)}
                onChange={(item) => {
                  setFormData({
                    ...formData,
                    calfType: item.value,
                    breed: null,
                  });
                  setFocus("calfType", false);
                  setErrors((prev) => ({
                    ...prev,
                    calfType: null,
                    breed: null,
                  }));
                }}
              />
              {errors.calfType && (
                <AppText style={styles.errorText}>{errors.calfType}</AppText>
              )}
            </View>

            {/* Dropdown: Breed Selection */}
            <View style={styles.inputGroup}>
              <AppText style={styles.label}>
                {t.breed}
                {req}
              </AppText>
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
                  formData.calfType === "buffalo" ? buffaloBreeds : cowBreeds
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
                disable={!formData.calfType}
              />
              {errors.breed && (
                <AppText style={styles.errorText}>{errors.breed}</AppText>
              )}
            </View>

            {/* Treatment */}
            <View style={styles.inputGroup}>
              <AppText style={styles.label}>
                {t.treatment}
                {req}
              </AppText>
              <TextInput
                style={[styles.input, errors.treatment && styles.inputError]}
                placeholder="e.g. Vaccination"
                value={formData.treatment}
                onChangeText={(val) =>
                  setFormData({ ...formData, treatment: val })
                }
              />
              {errors.treatment && (
                <AppText style={styles.errorText}>{errors.treatment}</AppText>
              )}
            </View>

            {/* Treatment Expence */}
            <View style={styles.inputGroup}>
              <AppText style={styles.label}>
                {t.treatmentExpence} (₹){req}
              </AppText>
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
                <AppText style={styles.errorText}>
                  {errors.treatmentExpence}
                </AppText>
              )}
            </View>

            {/* Colostrum Intake */}
            <View style={styles.inputGroup}>
              <AppText style={styles.label}>
                {t.colostrumIntake}
                {req}
              </AppText>
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
                <AppText style={styles.errorText}>
                  {errors.ColostrumIntake}
                </AppText>
              )}
            </View>

            {/* Health Observations */}
            <View style={styles.inputGroup}>
              <AppText style={styles.label}>
                {t.healthObservations} {req}
              </AppText>
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
                  setFormData({
                    ...formData,
                    HealthObservations: item.value,
                  });
                  setFocus("healthObservations", false);
                }}
              />
              {errors.HealthObservations && (
                <AppText style={styles.errorText}>
                  {errors.HealthObservations}
                </AppText>
              )}
            </View>

            {/* NDDB Number */}
            <View style={styles.inputGroup}>
              <AppText style={styles.label}>{t.nddbNumber}</AppText>
              <TextInput
                style={[styles.input, errors.nddbNumber && styles.inputError]}
                placeholder="e.g. U01403DL2009NPL195142"
                value={formData.nddbNumber}
                onChangeText={(val) =>
                  setFormData({ ...formData, nddbNumber: val })
                }
              />
              {errors.nddbNumber && (
                <AppText style={styles.errorText}>{errors.nddbNumber}</AppText>
              )}
            </View>

            {/* Gender Selector */}
            <AppText style={styles.label}>Gender{req}</AppText>
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
                  <AppText
                    style={
                      formData.gender === gender
                        ? styles.genderTextActive
                        : styles.genderText
                    }
                  >
                    {gender}
                  </AppText>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.sectionCard}>
            <AppText style={styles.sectionTitle}>{t.basicInformation}</AppText>
            <View style={styles.separator} />
            <View style={styles.inputGroup}>
              <AppText style={styles.label}>Dam (Mother calf){req}</AppText>
              <View style={styles.searchRow}>
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search Mother calf by ID"
                  value={mothercalfId}
                  onChangeText={setMothercalfId}
                />
                <TouchableOpacity
                  style={styles.searchButton}
                  onPress={handleSearchMothercalf}
                >
                  <AppText style={styles.searchButtonText}>Search</AppText>
                </TouchableOpacity>
              </View>
              {isMothercalfLoading && <ActivityIndicator />}
              {mothercalfError && (
                <AppText style={styles.errorText}>{mothercalfError}</AppText>
              )}
              {mothercalfData && (
                <View style={styles.searchResult}>
                  <AppText>
                    <AppText style={{ fontWeight: "bold" }}>Name:</AppText>{" "}
                    {mothercalfData.calfName}
                  </AppText>
                  <AppText>
                    <AppText style={{ fontWeight: "bold" }}>Breed:</AppText>{" "}
                    {mothercalfData.breed}
                  </AppText>
                </View>
              )}
            </View>

            {/* Calving Type */}
            <View style={styles.inputGroup}>
              <AppText style={styles.label}>
                {t.calvingType} {req}
              </AppText>
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
                <AppText style={styles.errorText}>{errors.calvingType}</AppText>
              )}
            </View>

            {/* DOB */}
            <View style={styles.inputGroup}>
              <AppText style={styles.label}>
                {t.dateOfBirth}
                {req}
              </AppText>
              <TouchableOpacity
                style={[
                  styles.input,
                  errors.dob && styles.inputError,
                  { justifyContent: "center" },
                ]}
                onPress={() => setShowDatePicker(true)}
              >
                <AppText style={{ color: formData.dob ? "#000" : "#999" }}>
                  {formData.dob
                    ? formData.dob.toLocaleDateString()
                    : "Select Date"}
                </AppText>
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
              {errors.dob && (
                <AppText style={styles.errorText}>{errors.dob}</AppText>
              )}
            </View>

            {/* Age (auto-calculated) */}
            <View style={styles.inputGroup}>
              <AppText style={styles.label}>{t.age}</AppText>
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
              {errors.age && (
                <AppText style={styles.errorText}>{errors.age}</AppText>
              )}
            </View>

            {/* Weight */}
            <View style={styles.inputGroup}>
              <AppText style={styles.label}>
                {t.weight}
                {req}
              </AppText>
              <TextInput
                style={[styles.input, errors.weight && styles.inputError]}
                placeholder="500"
                value={formData.weight}
                keyboardType="numeric"
                onChangeText={(val) =>
                  setFormData({ ...formData, weight: val })
                }
              />
              {errors.weight && (
                <AppText style={styles.errorText}>{errors.weight}</AppText>
              )}
            </View>
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.cancelBtn} onPress={handleCancel}>
              <AppText style={styles.cancelBtnText}>{t.cancel}</AppText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveBtn} onPress={next}>
              <AppText style={styles.saveBtnText}>{t.next}</AppText>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }

  if (screen2) {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.header}>
          <AppText style={styles.headerTitle}>{t.addNewCalf}</AppText>
          <AppText style={styles.headerSub}>{t.registerCalfDetails}</AppText>
        </View>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.sectionCard}>
            <AppText style={styles.sectionTitle}>{t.healthmanagement}</AppText>
            <View style={styles.separator} />

            <View style={styles.inputGroup}>
              <AppText style={styles.label}>
                {t.status}
                {req}
              </AppText>
              <Dropdown
                style={[
                  styles.dropdown,
                  isStatusFocus && { borderColor: "#2D6A4F" },
                  errors.status && { borderColor: "red" },
                ]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                data={calfStatuses}
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
              {errors.status && (
                <AppText style={styles.errorText}>{errors.status}</AppText>
              )}
            </View>

            <View style={styles.inputGroup}>
              <AppText style={styles.label}>
                {t.workerAssigned}
                {req}
              </AppText>
              <Dropdown
                style={[
                  styles.dropdown,
                  isWorkerFocus && { borderColor: "#2D6A4F" },
                  errors.workerAssigned && { borderColor: "red" },
                ]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                data={workers}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isWorkerFocus ? "Select worker" : "..."}
                value={formData.workerAssigned}
                onFocus={() => setIsWorkerFocus(true)}
                onBlur={() => setIsWorkerFocus(false)}
                onChange={(item) => {
                  setFormValue("workerAssigned", item.value);
                  setIsWorkerFocus(false);
                }}
              />
              {errors.workerAssigned && (
                <AppText style={styles.errorText}>
                  {errors.workerAssigned}
                </AppText>
              )}
            </View>

            <View style={styles.inputGroup}>
              <AppText style={styles.label}>
                {t.vetAssigned}
                {req}
              </AppText>
              <Dropdown
                style={[
                  styles.dropdown,
                  isVetFocus && { borderColor: "#2D6A4F" },
                  errors.vetAssigned && { borderColor: "red" },
                ]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                data={vets}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isVetFocus ? "Select vet" : "..."}
                value={formData.vetAssigned}
                onFocus={() => setIsVetFocus(true)}
                onBlur={() => setIsVetFocus(false)}
                onChange={(item) => {
                  setFormValue("vetAssigned", item.value);
                  setIsVetFocus(false);
                }}
              />
              {errors.vetAssigned && (
                <AppText style={styles.errorText}>{errors.vetAssigned}</AppText>
              )}
            </View>

            <View style={styles.inputGroup}>
              <AppText style={styles.label}>State{req}</AppText>
              <Dropdown
                style={[
                  styles.dropdown,
                  isStateFocus && { borderColor: "#2D6A4F" },
                  errors.state && { borderColor: "red" },
                ]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                data={calfStates}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isStateFocus ? "Select State" : "..."}
                value={formData.state}
                onFocus={() => setIsStateFocus(true)}
                onBlur={() => setIsStateFocus(false)}
                onChange={(item) => {
                  setFormValue("state", item.value);
                  setIsStateFocus(false);
                }}
              />
              {errors.state && (
                <AppText style={styles.errorText}>{errors.state}</AppText>
              )}
            </View>

            <View style={styles.inputGroup}>
              <AppText style={styles.label}>
                {t.currentStateDate}
                {req}
              </AppText>
              <TouchableOpacity
                style={[
                  styles.input,
                  errors.currentStateDate && styles.inputError,
                  { justifyContent: "center" },
                ]}
                onPress={() => setShowHealthManagementDatePicker(true)}
              >
                <AppText
                  style={{
                    color: formData.currentStateDate ? "#000" : "#999",
                  }}
                >
                  {formData.currentStateDate
                    ? formData.currentStateDate.toLocaleDateString()
                    : "Select Date"}
                </AppText>
              </TouchableOpacity>
              {showHealthManagementDatePicker && (
                <DateTimePicker
                  value={formData.currentStateDate || new Date()}
                  mode="date"
                  display="default"
                  onChange={handleHealthManagementDateChange}
                  maximumDate={new Date()}
                />
              )}
              {errors.currentStateDate && (
                <AppText style={styles.errorText}>
                  {errors.currentStateDate}
                </AppText>
              )}
            </View>

            <View style={styles.inputGroup}>
              <AppText style={styles.label}>{t.insuranceNumber}</AppText>
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
                <AppText style={styles.errorText}>
                  {errors.insuranceNumber}
                </AppText>
              )}
            </View>
          </View>

          <View style={styles.sectionCard}>
            <AppText style={styles.sectionTitle}>{t.calfImages}</AppText>
            <View style={styles.separator} />
            <TouchableOpacity style={styles.uploadBox}>
              <Ionicons name="cloud-upload-outline" size={40} color="#000000" />
              <AppText style={styles.uploadText}>
                Click to upload calf images
              </AppText>
            </TouchableOpacity>
          </View>

          <View style={styles.sectionCard}>
            <AppText style={styles.sectionTitle}>
              {t.additionalInformation}
            </AppText>
            <View style={styles.separator} />
            <AppText style={styles.label}>{t.remarks}</AppText>
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
            <TouchableOpacity style={styles.cancelBtn} onPress={back}>
              <AppText style={styles.cancelBtnText}>{t.back}</AppText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
              <Ionicons name="save-outline" size={20} color="white" />
              <AppText style={styles.saveBtnText}>{t.save}</AppText>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
  return null;
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
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    padding: 10,
    backgroundColor: "#fff",
  },
  searchButton: {
    backgroundColor: "#2D6A4F",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 6,
  },
  searchButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  searchResult: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#e9f5e9",
    borderRadius: 6,
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
