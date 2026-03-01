import { GET } from "@/api/methods";
import AppText from "@/components/common/AppText";
import { useLanguage } from "@/constants/localization/useLanguage";
import { useTheme } from "@/theme/useTheme";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import Success from "../../../src/components/common/success";

const BASE_URL = "https://astrabytte-ai.onrender.com";

const { t } = useLanguage();
const router = useRouter();

const BuffaloBreeds = [
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

const CowBreeds = [
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

const cattleType = [
  { label: `${t.Buffalo}`, value: "Buffalo" },
  { label: `${t.Cow}`, value: "Cow" },
];

const colostrumIntakes = [
  {
    label: `${t.Calf_Successfully_suckled_colostrum}`,
    value: "Calf_Successfully_suckled_colostrum",
  },
  {
    label: `${t.Artificial_feeding_was_required}`,
    value: "Artificial_feeding_was_required",
  },
];

const calvingTypes = [
  { label: `${t.assisted}`, value: "Assisted" },
  { label: `${t.cSection}`, value: "C-Section" },
  { label: `${t.premature}`, value: "Premature" },
  { label: `${t.normal_delivery}`, value: "Normal_Delivery" },
];

const initialHealthObservations = [
  { label: `${t.treatment_required}`, value: "Treatment_Required" },
  { label: `${t.fully_fit_calf}`, value: "Fully_fit_Calf" },
];

const calfStates = [
  { label: `${t.on_heatlactating}`, value: "calf" },
  { label: `${t.heifer}`, value: "heifer" },
  { label: `${t.on_heat}`, value: "on_heat" },
  { label: `${t.calvedlactating}`, value: "inseminated" },
  { label: `${t.calved}`, value: "calved" },
  { label: `${t.dry_off}`, value: "dry_off" },
];

const calfStatuses = [
  { label: `${t.active}`, value: "Active" },
  { label: `${t.inactive}`, value: "Inactive" },
];

const getStoredToken = async () => {
  try {
    const token = await AsyncStorage.getItem("access_token");
    return token; // Returns the string or null
  } catch (error) {
    console.error("Error retrieving the token:", error);
    return null;
  }
};

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
  const { t } = useLanguage();
  const { colors } = useTheme();
  const [isLoading, setIsLoading] = useState(false);

  // 1. States for the dropdown lists
  const [workerList, setWorkerList] = useState([]);
  const [vetList, setVetList] = useState([]);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const token = await AsyncStorage.getItem("access_token");
      const headers = { Authorization: `Bearer ${token}` };

      // Fetch both Workers and Vets at the same time
      const [workerRes, vetRes] = await Promise.all([
        fetch(`${BASE_URL}/api/v1/worker-registry/`, { headers }),
        fetch(`${BASE_URL}/api/v1/vet-registry/`, { headers }),
      ]);

      const workers = await workerRes.json();
      const vets = await vetRes.json();

      // Transform data for the Dropdown component
      if (Array.isArray(workers)) {
        setWorkerList(
          workers.map((w) => ({ label: w.full_name, value: w.worker_id })),
        );
      }
      if (Array.isArray(vets)) {
        setVetList(vets.map((v) => ({ label: v.full_name, value: v.vet_id })));
      }
    } catch (error) {
      console.error("Error loading dropdown data:", error);
    }
  };

  const [formData, setFormData] = useState({
    cattleId: "",
    nddbRegistrationNumber: "",
    nameOfCattle: "",
    colostrumIntake: "",
    initialHealthObservations: "",
    treatmentExpenses: null,
    cattleType: "Buffalo",
    breed: "",
    gender: "Female",
    damMother: "",
    dateOfBirth: "",
    age: null,
    calvingType: "",
    state: "",
    stateDate: "",
    status: "Active",
    workerAssigned: "",
    veterinarianAssigned: "",
    remarks: "",
    convertToFullGrown: false,
    weightKg: null,
    insuranceNumber: "",
    images: [],
  });

  const reset = {
    cattleId: "",
    nddbRegistrationNumber: "N/A",
    nameOfCattle: "",
    colostrumIntake: "",
    initialHealthObservations: "",
    treatmentExpenses: null,
    cattleType: "",
    breed: "",
    gender: "",
    damMother: "",
    dateOfBirth: "",
    age: null,
    calvingType: "",
    state: "",
    stateDate: "",
    status: "",
    workerAssigned: "",
    veterinarianAssigned: "",
    remarks: "",
    convertToFullGrown: false,
    weightKg: null,
    insuranceNumber: "",
    images: [],
  };

  const saveCalfFormData = async () => {
    try {
      setIsLoading(true);
      const token = await getStoredToken();

      const url = `${BASE_URL}/api/v1/calf/`;

      // Helper to format date as YYYY-MM-DD for both dateOfBirth and stateDate
      const toShortDate = (date) => {
        if (!date) return new Date().toISOString().split("T")[0];
        return new Date(date).toISOString().split("T")[0];
      };

      // console.log("Calf Form Data:", formData);

      const payload = {
        cattleId: formData.cattleId || "",
        nddbRegistrationNumber: formData.nddbRegistrationNumber || "N/A",
        nameOfCattle: formData.nameOfCattle || "",
        colostrumIntake: formData.colostrumIntake || "",
        initialHealthObservations: formData.initialHealthObservations || "",
        treatmentExpenses: Number(formData.treatmentExpenses) || 0,
        cattleType: formData.cattleType || "Calf",
        breed: formData.breed || "",
        gender: formData.gender || "Female",
        damMother: formData.damMother || "",

        // Matches "2026-02-28"
        dateOfBirth: toShortDate(formData.dateOfBirth),

        age: Number(formData.age) || 0,
        calvingType: formData.calvingType || "",
        state: formData.state || "",

        // Matches "2026-02-28"
        stateDate: toShortDate(formData.stateDate),

        status: formData.status || "active",
        workerAssigned: formData.workerAssigned || "",
        veterinarianAssigned: formData.veterinarianAssigned || "",

        // Adjusted from formData.remark to formData.remarks to match your new payload
        remarks: formData.remarks || formData.remark || "",

        // Ensures this is strictly a boolean value
        convertToFullGrown: Boolean(formData.convertToFullGrown),

        weightKg: Number(formData.weightKg) || 0,
        insuranceNumber: formData.insuranceNumber || "",
        images: formData.images || [],
      };
      // console.log("Payload:", payload);

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      console.log("Raw Response:", response);
      const result = await response.json();

      if (!response.ok) {
        console.log(
          "BACKEND VALIDATION ERROR:",
          JSON.stringify(result, null, 2),
        );
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log("Success:", result);
      return result;
    } catch (error) {
      console.error("Error saving calf form data:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const [mothercattleId, setMothercattleId] = useState();
  const [mothercalfData, setMothercalfData] = useState(null);
  const [mothercalfError, setMothercalfError] = useState("");
  const [isMothercalfLoading, setIsMothercalfLoading] = useState(false);

  const [errors, setErrors] = useState({});
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [focusState, setFocusState] = useState({
    cattleType: false,
    breed: false,
    colostrumIntake: false,
    initialHealthObservations: false,
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
  const req = <AppText style={{ color: "red" }}> *</AppText>;

  const handleSearchMothercalf = async () => {
    if (!mothercattleId.trim()) {
      setMothercalfError("Please enter a calf ID to search.");
      return;
    }
    setIsMothercalfLoading(true);
    setMothercalfError("");
    setMothercalfData(null);
    try {
      const result = await GET(
        `${BASE_URL}/api/v1/cattle/search?q=${mothercattleId}&page=1&page_size=10`,
      );
      console.log("Search Result:", result);

      // Handle if result is an array (common for search) or a paginated object
      const cattleList = Array.isArray(result)
        ? result
        : result?.results || result?.data;

      if (cattleList && cattleList.length > 0) {
        setMothercalfData(cattleList[0]); // Select the first match
      } else {
        setMothercalfError("No Cattle found with this ID.");
        setMothercalfData(null);
      }
    } catch (error) {
      console.error(error);
      setMothercalfError("An error occurred while searching for the calf.");
    } finally {
      setIsMothercalfLoading(false);
    }
  };

  const handleSave = async () => {
    // 1. Define what needs to be checked
    const validationRules = {
      status: `${t.statusrequired}`,
      workerAssigned: `${t.workerAssignedrequired}`,
      veterinarianAssigned: `${t.veterinarianAssignedrequired}`,
      state: `${t.staterequired}`,
      stateDate: `${t.stateDaterequired}`,
    };

    // 2. Call the function
    const validationErrors = validateForm(formData, validationRules);

    // 3. Update the UI state
    setErrors(validationErrors);

    // 4. If no errors (empty object), save and show success
    if (Object.keys(validationErrors).length === 0) {
      try {
        await saveCalfFormData(); // Wait for the API to finish
        setIsSaved(true); // Only show success if no error was thrown

        setTimeout(() => {
          router.push("../../tabs");
          setIsSaved(false);
          setFormData(reset);
          back();
        }, 2000);
      } catch (error) {
        Alert.alert("Error", "Failed to save calf details. Please try again.");
      }
    }
  };

  const handleCancel = () => {
    router.back();
    setFormData(reset);
  };

  const [screen1, setScreen1] = useState(true);
  const [screen2, setScreen2] = useState(false);

  const next = () => {
    const validationRules = {
      cattleId: `${t.cattleIdrequired}`,
      nameOfCattle: `${t.nameOfCattlerequired}`,
      cattleType: `${t.cattleTyperequired}`,
      breed: `${t.breedrequired}`,
      treatmentExpenses: `${t.treatmentExpencerequired}`,
      dateOfBirth: `${t.dateOfBirthrequired}`,
      age: `${t.agerequired}`,
      weightKg: `${t.weightKgrequired}`,
      colostrumIntake: `${t.colostrumIntakerequired}`,
      initialHealthObservations: `${t.initialHealthObservationsrequired}`,
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

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Permission required");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0]);
    }
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
        dateOfBirth: selectedDate,
        age: ageYears.toString(),
      });
    }
  };

  const handleHealthManagementDateChange = (event, selectedDate) => {
    setShowHealthManagementDatePicker(false);
    if (selectedDate) {
      setFormData({
        ...formData,
        stateDate: selectedDate,
      });
      setErrors((prev) => ({ ...prev, stateDate: null }));
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
    return (
      <>
        <Success style={{ flex: 1, backgroundColor: colors.background }} />
        <AppText
          style={{
            textAlign: "center",
            fontSize: 24,
            fontWeight: "bold",
            marginBottom: 170,
            backgroundColor: colors.background,
          }}
        >
          Calf Added Successfully!
        </AppText>
      </>
    );
  }

  if (screen1) {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <View style={styles.header}>
          <AppText style={[styles.headerTitle, { color: colors.text }]}>
            {t.addNewCalf}
          </AppText>
          <AppText style={[styles.headerSub, { color: colors.text }]}>
            {t.registerCalfDetails}
          </AppText>
        </View>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled" // CRITICAL: Allows dropdown to click while keyboard is open
        >
          <View style={[styles.sectionCard, { backgroundColor: colors.card }]}>
            <AppText style={[styles.sectionTitle, { color: colors.primary }]}>
              {t.basicInformation}
            </AppText>
            <View style={styles.separator} />

            {/* calf ID */}
            <View style={styles.inputGroup}>
              <AppText style={[styles.label, { color: colors.text }]}>
                {t.cattleId}
                {req}
              </AppText>
              <Ionicons
                name="pricetag-outline"
                size={20}
                color="#666"
                style={styles.inputIcon}
              />
              <TextInput
                style={[
                  styles.input,
                  errors.cattleId && styles.inputError,
                  { color: colors.text, borderColor: colors.border },
                ]}
                placeholder={`${t.egcalf}`}
                value={formData.cattleId}
                onChangeText={(val) =>
                  setFormData({ ...formData, cattleId: val })
                }
              />
              {errors.cattleId && (
                <AppText style={styles.errorText}>{errors.cattleId}</AppText>
              )}
            </View>

            {/* calf Name */}
            <View style={styles.inputGroup}>
              <AppText style={[styles.label, { color: colors.text }]}>
                {t.nameOfCattle}
                {req}
              </AppText>
              <MaterialCommunityIcons
                name="cow"
                size={20}
                color="#666"
                style={styles.inputIcon}
              />
              <TextInput
                style={[
                  styles.input,
                  errors.nameOfCattle && styles.inputError,
                  { color: colors.text, borderColor: colors.border },
                ]}
                placeholder={`${t.egdaisy}`}
                value={formData.nameOfCattle}
                onChangeText={(val) =>
                  setFormData({ ...formData, nameOfCattle: val })
                }
              />
              {errors.nameOfCattle && (
                <AppText style={styles.errorText}>
                  {errors.nameOfCattle}
                </AppText>
              )}
            </View>

            {/* Dropdown: calf Type Selection */}
            <View style={styles.inputGroup}>
              <AppText style={[styles.label, { color: colors.text }]}>
                {t.cattleType}
                {req}
              </AppText>
              <Dropdown
                style={[
                  styles.dropdown,
                  focusState.cattleType && { borderColor: "#2D6A4F" },
                  errors.cattleType && { borderColor: "red" },
                  { backgroundColor: colors.card, borderColor: colors.border },
                ]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={[
                  styles.selectedTextStyle,
                  { color: colors.text },
                ]}
                // inputSearchStyle={styles.inputSearchStyle}
                data={cattleType}
                // search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={
                  !focusState.cattleType ? "Select calf type" : "..."
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
                renderLeftIcon={() => (
                  <Ionicons
                    name="git-network-outline"
                    size={20}
                    color="#666"
                    style={styles.icon}
                  />
                )}
              />
              {errors.cattleType && (
                <AppText style={styles.errorText}>{errors.cattleType}</AppText>
              )}
            </View>

            {/* Dropdown: Breed Selection */}
            <View style={styles.inputGroup}>
              <AppText style={[styles.label, { color: colors.text }]}>
                {t.breed}
                {req}
              </AppText>
              <Dropdown
                style={[
                  styles.dropdown,
                  focusState.breed && { borderColor: "#2D6A4F" },
                  errors.breed && { borderColor: "red" },
                  { backgroundColor: colors.card, borderColor: colors.border },
                ]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={[
                  styles.selectedTextStyle,
                  { color: colors.text },
                ]}
                // inputSearchStyle={styles.inputSearchStyle}
                data={
                  formData.cattleType === "Buffalo" ? BuffaloBreeds : CowBreeds
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
                renderLeftIcon={() => (
                  <Ionicons
                    name="logo-buffer"
                    size={20}
                    color="#666"
                    style={styles.icon}
                  />
                )}
                disable={!formData.cattleType}
              />
              {errors.breed && (
                <AppText style={styles.errorText}>{errors.breed}</AppText>
              )}
            </View>

            {/* Treatment
            <View style={styles.inputGroup}>
              <AppText style={[styles.label, { color: colors.text }]}>
                {t.treatment}
                {req}
              </AppText>
              <Ionicons
                name="medkit-outline"
                size={20}
                color="#666"
                style={styles.inputIcon}
              />
              <TextInput
                style={[
                  styles.input,
                  errors.treatment && styles.inputError,
                  { color: colors.text, borderColor: colors.border },
                ]}
                placeholder="e.g. Vaccination"
                value={formData.treatment}
                onChangeText={(val) =>
                  setFormData({ ...formData, treatment: val })
                }
              />
              {errors.treatment && (
                <AppText style={styles.errorText}>{errors.treatment}</AppText>
              )}
            </View> */}

            {/* Treatment Expence */}
            <View style={styles.inputGroup}>
              <AppText style={[styles.label, { color: colors.text }]}>
                {t.treatmentExpence} (₹){req}
              </AppText>
              <Ionicons
                name="cash-outline"
                size={20}
                color="#666"
                style={styles.inputIcon}
              />
              <TextInput
                style={[
                  styles.input,
                  errors.treatmentExpenses && styles.inputError,
                  { color: colors.text, borderColor: colors.border },
                ]}
                placeholder={`${t.egtreatmentcost}`}
                value={formData.treatmentExpenses}
                keyboardType="numeric"
                onChangeText={(val) =>
                  setFormData({ ...formData, treatmentExpenses: val })
                }
              />
              {errors.treatmentExpenses && (
                <AppText style={styles.errorText}>
                  {errors.treatmentExpenses}
                </AppText>
              )}
            </View>

            {/* Colostrum Intake */}
            <View style={styles.inputGroup}>
              <AppText style={[styles.label, { color: colors.text }]}>
                {t.colostrumIntake}
                {req}
              </AppText>
              <Dropdown
                style={[
                  styles.dropdown,
                  focusState.colostrumIntake && { borderColor: "#2D6A4F" },
                  errors.colostrumIntake && { borderColor: "red" },
                  { backgroundColor: colors.card, borderColor: colors.border },
                ]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={[
                  styles.selectedTextStyle,
                  { color: colors.text },
                ]}
                // inputSearchStyle={styles.inputSearchStyle}
                data={colostrumIntakes}
                // search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={
                  !focusState.colostrumIntake ? "Select colostrumIntake" : "..."
                }
                // searchPlaceholder="Search colostrumIntake..."
                value={formData.colostrumIntake}
                onFocus={() => setFocus("colostrumIntake", true)}
                onBlur={() => setFocus("colostrumIntake", false)}
                onChange={(item) => {
                  setFormData({ ...formData, colostrumIntake: item.value });
                  setFocus("colostrumIntake", false);
                }}
                renderLeftIcon={() => (
                  <Ionicons
                    name="water-outline"
                    size={20}
                    color="#666"
                    style={styles.icon}
                  />
                )}
              />
              {errors.colostrumIntake && (
                <AppText style={styles.errorText}>
                  {errors.colostrumIntake}
                </AppText>
              )}
            </View>

            {/* Health Observations */}
            <View style={styles.inputGroup}>
              <AppText style={[styles.label, { color: colors.text }]}>
                {t.initialHealthObservations} {req}
              </AppText>
              <Dropdown
                style={[
                  styles.dropdown,
                  focusState.initialHealthObservations && {
                    borderColor: "#2D6A4F",
                  },
                  errors.initialHealthObservations && { borderColor: "red" },
                  { backgroundColor: colors.card, borderColor: colors.border },
                ]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={[
                  styles.selectedTextStyle,
                  { color: colors.text },
                ]}
                // inputSearchStyle={styles.inputSearchStyle}
                data={initialHealthObservations}
                // search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={
                  !focusState.initialHealthObservations
                    ? "Select Health Observations"
                    : "..."
                }
                // searchPlaceholder="Search Health Observations..."
                value={formData.initialHealthObservations}
                onFocus={() => setFocus("initialHealthObservations", true)}
                onBlur={() => setFocus("initialHealthObservations", false)}
                onChange={(item) => {
                  setFormData({
                    ...formData,
                    initialHealthObservations: item.value,
                  });
                  setFocus("initialHealthObservations", false);
                }}
                renderLeftIcon={() => (
                  <Ionicons
                    name="heart-outline"
                    size={20}
                    color="#666"
                    style={styles.icon}
                  />
                )}
              />
              {errors.initialHealthObservations && (
                <AppText style={styles.errorText}>
                  {errors.initialHealthObservations}
                </AppText>
              )}
            </View>

            {/* NDDB Number */}
            <View style={styles.inputGroup}>
              <AppText style={[styles.label, { color: colors.text }]}>
                {t.nddbRegistrationNumber}
              </AppText>
              <Ionicons
                name="document-text-outline"
                size={20}
                color="#666"
                style={styles.inputIcon}
              />
              <TextInput
                style={[
                  styles.input,
                  errors.nddbRegistrationNumber && styles.inputError,
                  { color: colors.text, borderColor: colors.border },
                ]}
                placeholder={`${t.egnddb}`}
                value={formData.nddbRegistrationNumber}
                onChangeText={(val) =>
                  setFormData({ ...formData, nddbRegistrationNumber: val })
                }
              />
              {errors.nddbRegistrationNumber && (
                <AppText style={styles.errorText}>
                  {errors.nddbRegistrationNumber}
                </AppText>
              )}
            </View>

            {/* Gender Selector */}
            <AppText style={[styles.label, { color: colors.text }]}>
              Gender{req}
            </AppText>
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

          <View style={[styles.sectionCard, { backgroundColor: colors.card }]}>
            <AppText style={[styles.sectionTitle, { color: colors.primary }]}>
              {t.basicInformation}
            </AppText>
            <View style={styles.separator} />
            <View style={styles.inputGroup}>
              <AppText style={[styles.label, { color: colors.text }]}>
                Dam (Mother calf){req}
              </AppText>
              <View style={styles.searchRow}>
                <Ionicons
                  name="search-outline"
                  size={20}
                  color="#666"
                  style={styles.inputIconsearch}
                />
                <TextInput
                  style={[
                    styles.searchInput,
                    { color: colors.text, borderColor: colors.border },
                  ]}
                  placeholder="Search Mother by ID"
                  value={mothercattleId}
                  onChangeText={setMothercattleId}
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
                    {mothercalfData.nameOfCattle}
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
              <AppText style={[styles.label, { color: colors.text }]}>
                {t.calvingType} {req}
              </AppText>
              <Dropdown
                style={[
                  styles.dropdown,
                  focusState.calvingType && { borderColor: "#2D6A4F" },
                  errors.calvingType && { borderColor: "red" },
                  { backgroundColor: colors.card, borderColor: colors.border },
                ]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={[
                  styles.selectedTextStyle,
                  { color: colors.text },
                ]}
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
                renderLeftIcon={() => (
                  <Ionicons
                    name="git-commit-outline"
                    size={20}
                    color="#666"
                    style={styles.icon}
                  />
                )}
              />
              {errors.calvingType && (
                <AppText style={styles.errorText}>{errors.calvingType}</AppText>
              )}
            </View>

            {/* dateOfBirth */}
            <View style={styles.inputGroup}>
              <AppText style={[styles.label, { color: colors.text }]}>
                {t.dateOfBirth}
                {req}
              </AppText>
              <Ionicons
                name="calendar-outline"
                size={20}
                color="#666"
                style={styles.inputIcon}
              />
              <TouchableOpacity
                style={[
                  styles.input,
                  errors.dateOfBirth && styles.inputError,
                  {
                    justifyContent: "center",
                    backgroundColor: colors.card,
                    borderColor: colors.border,
                  },
                ]}
                onPress={() => setShowDatePicker(true)}
              >
                <AppText
                  style={{ color: formData.dateOfBirth ? colors.text : "#999" }}
                >
                  {formData.dateOfBirth
                    ? formData.dateOfBirth.toLocaleDateString()
                    : "Select Date"}
                </AppText>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={formData.dateOfBirth || new Date()}
                  mode="date"
                  display="default"
                  onChange={handleDateChange}
                  maximumDate={new Date()}
                />
              )}
              {errors.dateOfBirth && (
                <AppText style={styles.errorText}>{errors.dateOfBirth}</AppText>
              )}
            </View>

            {/* Age (auto-calculated) */}
            <View style={styles.inputGroup}>
              <AppText style={[styles.label, { color: colors.text }]}>
                {t.age}
              </AppText>
              <Ionicons
                name="return-up-forward-outline"
                size={20}
                color="#666"
                style={styles.inputIcon}
              />
              <TextInput
                style={[
                  styles.input,
                  styles.disabledInput,
                  errors.age && styles.inputError,
                  { color: colors.text, borderColor: colors.border },
                ]}
                placeholder={`${t.egautocalculated}`}
                value={formData.age}
                editable={false}
              />
              {errors.age && (
                <AppText style={styles.errorText}>{errors.age}</AppText>
              )}
            </View>

            {/* Weight */}
            <View style={styles.inputGroup}>
              <AppText style={[styles.label, { color: colors.text }]}>
                {t.weightKg}
                {req}
              </AppText>
              <Ionicons
                name="scale-outline"
                size={20}
                color="#666"
                style={styles.inputIcon}
              />
              <TextInput
                style={[
                  styles.input,
                  errors.weightKg && styles.inputError,
                  { color: colors.text, borderColor: colors.border },
                ]}
                placeholder="500"
                value={formData.weightKg}
                keyboardType="numeric"
                onChangeText={(val) =>
                  setFormData({ ...formData, weightKg: val })
                }
              />
              {errors.weightKg && (
                <AppText style={styles.errorText}>{errors.weightKg}</AppText>
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
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <View style={styles.header}>
          <AppText style={[styles.headerTitle, { color: colors.text }]}>
            {t.addNewCalf}
          </AppText>
          <AppText style={[styles.headerSub, { color: colors.text }]}>
            {t.registerCalfDetails}
          </AppText>
        </View>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={[styles.sectionCard, { backgroundColor: colors.card }]}>
            <AppText style={[styles.sectionTitle, { color: colors.primary }]}>
              {t.healthmanagement}
            </AppText>
            <View style={styles.separator} />

            <View style={styles.inputGroup}>
              <AppText style={[styles.label, { color: colors.text }]}>
                {t.status}
                {req}
              </AppText>
              <Dropdown
                style={[
                  styles.dropdown,
                  isStatusFocus && { borderColor: "#2D6A4F" },
                  errors.status && { borderColor: "red" },
                  { backgroundColor: colors.card, borderColor: colors.border },
                ]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={[
                  styles.selectedTextStyle,
                  { color: colors.text },
                ]}
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
                renderLeftIcon={() => (
                  <Ionicons
                    name="analytics-outline"
                    size={20}
                    color="#666"
                    style={styles.icon}
                  />
                )}
              />
              {errors.status && (
                <AppText style={styles.errorText}>{errors.status}</AppText>
              )}
            </View>

            <View style={styles.inputGroup}>
              <AppText style={[styles.label, { color: colors.text }]}>
                {t.workerAssigned}
                {req}
              </AppText>
              <Dropdown
                style={[
                  styles.dropdown,
                  isWorkerFocus && { borderColor: "#2D6A4F" },
                  errors.workerAssigned && { borderColor: "red" },
                  { backgroundColor: colors.card, borderColor: colors.border },
                ]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={[
                  styles.selectedTextStyle,
                  { color: colors.text },
                ]}
                data={workerList}
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
                renderLeftIcon={() => (
                  <Ionicons
                    name="person-outline"
                    size={20}
                    color="#666"
                    style={styles.icon}
                  />
                )}
              />
              {errors.workerAssigned && (
                <AppText style={styles.errorText}>
                  {errors.workerAssigned}
                </AppText>
              )}
            </View>

            <View style={styles.inputGroup}>
              <AppText style={[styles.label, { color: colors.text }]}>
                {t.veterinarianAssigned}
                {req}
              </AppText>
              <Dropdown
                style={[
                  styles.dropdown,
                  isVetFocus && { borderColor: "#2D6A4F" },
                  errors.veterinarianAssigned && { borderColor: "red" },
                  { backgroundColor: colors.card, borderColor: colors.border },
                ]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={[
                  styles.selectedTextStyle,
                  { color: colors.text },
                ]}
                data={vetList}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isVetFocus ? "Select vet" : "..."}
                value={formData.veterinarianAssigned}
                onFocus={() => setIsVetFocus(true)}
                onBlur={() => setIsVetFocus(false)}
                onChange={(item) => {
                  setFormValue("veterinarianAssigned", item.value);
                  setIsVetFocus(false);
                }}
                renderLeftIcon={() => (
                  <Ionicons
                    name="medkit-outline"
                    size={20}
                    color="#666"
                    style={styles.icon}
                  />
                )}
              />
              {errors.veterinarianAssigned && (
                <AppText style={styles.errorText}>
                  {errors.veterinarianAssigned}
                </AppText>
              )}
            </View>

            <View style={styles.inputGroup}>
              <AppText style={[styles.label, { color: colors.text }]}>
                State{req}
              </AppText>
              <Dropdown
                style={[
                  styles.dropdown,
                  isStateFocus && { borderColor: "#2D6A4F" },
                  errors.state && { borderColor: "red" },
                  { backgroundColor: colors.card, borderColor: colors.border },
                ]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={[
                  styles.selectedTextStyle,
                  { color: colors.text },
                ]}
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
                renderLeftIcon={() => (
                  <Ionicons
                    name="pulse-outline"
                    size={20}
                    color="#666"
                    style={styles.icon}
                  />
                )}
              />
              {errors.state && (
                <AppText style={styles.errorText}>{errors.state}</AppText>
              )}
            </View>

            <View style={styles.inputGroup}>
              <AppText style={[styles.label, { color: colors.text }]}>
                {t.stateDate}
                {req}
              </AppText>
              <Ionicons
                name="calendar-outline"
                size={20}
                color="#666"
                style={styles.inputIcon}
              />
              <TouchableOpacity
                style={[
                  styles.input,
                  errors.stateDate && styles.inputError,
                  {
                    justifyContent: "center",
                    backgroundColor: colors.card,
                    borderColor: colors.border,
                  },
                ]}
                onPress={() => setShowHealthManagementDatePicker(true)}
              >
                <AppText
                  style={{
                    color: formData.stateDate ? colors.text : "#999",
                  }}
                >
                  {formData.stateDate
                    ? formData.stateDate.toLocaleDateString()
                    : "Select Date"}
                </AppText>
              </TouchableOpacity>
              {showHealthManagementDatePicker && (
                <DateTimePicker
                  value={formData.stateDate || new Date()}
                  mode="date"
                  display="default"
                  onChange={handleHealthManagementDateChange}
                  maximumDate={new Date()}
                />
              )}
              {errors.stateDate && (
                <AppText style={styles.errorText}>{errors.stateDate}</AppText>
              )}
            </View>

            <View style={styles.inputGroup}>
              <AppText style={[styles.label, { color: colors.text }]}>
                {t.insuranceNumber}
              </AppText>
              <Ionicons
                name="shield-checkmark-outline"
                size={20}
                color="#666"
                style={styles.inputIcon}
              />
              <TextInput
                style={[
                  styles.input,
                  errors.insuranceNumber && styles.inputError,
                  { color: colors.text, borderColor: colors.border },
                ]}
                placeholder={`${t.egins}`}
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

          {/* <View style={styles.sectionCard}>
            <AppText style={styles.sectionTitle}>{t.calfImages}</AppText>
            <View style={styles.separator} />
            <TouchableOpacity style={styles.uploadBox}>
              <Ionicons name="cloud-upload-outline" size={40} color="#000000" />
              <AppText style={styles.uploadText}>
                Click to upload calf images
              </AppText>
            </TouchableOpacity>
          </View> */}

          <View style={styles.sectionCard}>
            <AppText style={[styles.sectionTitle, { color: colors.primary }]}>
              {t.calfImages}
            </AppText>

            <TouchableOpacity style={styles.uploadBox} onPress={pickImage}>
              <Ionicons name="cloud-upload-outline" size={30} color="#16a34a" />
              <AppText style={styles.uploadText}>
                Click to upload calf images
              </AppText>
              <AppText style={styles.uploadSub}>PNG, JPG up to 10MB</AppText>
            </TouchableOpacity>

            {selectedImage && (
              <Image
                source={{ uri: selectedImage.uri }}
                style={{
                  width: "100%",
                  height: 150,
                  marginTop: 10,
                  borderRadius: 8,
                }}
                resizeMode="cover"
              />
            )}
          </View>

          <View style={styles.sectionCard}>
            <AppText style={[styles.sectionTitle, { color: colors.primary }]}>
              {t.additionalInformation}
            </AppText>
            <AppText
              style={[styles.label, { color: colors.text, marginTop: 15 }]}
            >
              Convert to Full Grown
            </AppText>
            <View style={styles.genderRow}>
              <TouchableOpacity
                style={[
                  styles.genderBtn,
                  formData.convertToFullGrown === true &&
                    styles.genderBtnActive,
                ]}
                onPress={() => setFormValue("convertToFullGrown", true)}
              >
                <AppText
                  style={
                    formData.convertToFullGrown === true
                      ? styles.genderTextActive
                      : styles.genderText
                  }
                >
                  Yes
                </AppText>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.genderBtn,
                  formData.convertToFullGrown === false &&
                    styles.genderBtnActive,
                ]}
                onPress={() => setFormValue("convertToFullGrown", false)}
              >
                <AppText
                  style={
                    formData.convertToFullGrown === false
                      ? styles.genderTextActive
                      : styles.genderText
                  }
                >
                  No
                </AppText>
              </TouchableOpacity>
            </View>
            <View style={styles.separator} />
            <AppText style={[styles.label, { color: colors.text }]}>
              {t.remarks}
            </AppText>
            <Ionicons
              name="reader-outline"
              size={20}
              color="#666"
              style={styles.remarksIcon}
            />
            <TextInput
              style={[
                styles.remarksInput,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                  color: colors.text,
                },
              ]}
              placeholder="Add any additional remarkss here..."
              multiline={true}
              numberOfLines={4}
              value={formData.remarks}
              onChangeText={(val) => setFormValue("remarks", val)}
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
  container: { flex: 1 },
  scrollContent: { padding: 20 },
  header: { paddingBottom: 8, marginLeft: 20, paddingTop: 30 },
  headerTitle: { fontSize: 24, fontWeight: "bold" },
  headerSub: { fontSize: 14 },
  sectionCard: {
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
    marginBottom: 5,
  },
  separator: { height: 1, backgroundColor: "#eee", marginBottom: 15 },
  inputGroup: { marginBottom: 15 },
  label: { fontSize: 14, fontWeight: "500", marginBottom: 5 },
  input: {
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingLeft: 40,
    height: 50,
    justifyContent: "center",
  },
  inputIcon: {
    position: "absolute",
    left: 10,
    top: 40,
    zIndex: 1,
  },
  inputIconsearch: {
    position: "absolute",
    left: 10,
    top: 15,
    zIndex: 1,
    color: "#666",
  },
  inputError: { borderColor: "red" },
  disabledInput: { backgroundColor: "#f0f0f0" },
  errorText: { color: "red", fontSize: 11, marginTop: 4 },
  dropdown: {
    height: 50,
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 8,
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
    position: "relative",
  },
  searchInput: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingLeft: 40,
  },
  searchButton: {
    backgroundColor: "#2D6A4F",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 6,
    height: 50,
    justifyContent: "center",
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
  // uploadBox: {
  //   justifyContent: "center",
  //   alignItems: "center",
  //   height: 100,
  //   borderWidth: 2,
  //   borderStyle: "dashed",
  //   borderColor: "#5fcd54",
  //   borderRadius: 10,
  //   backgroundColor: "#e0f5e5c3",
  //   marginBottom: 20,
  // },
  uploadBox: {
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#22c55e",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    backgroundColor: "#f0fdf4",
  },
  uploadText: { marginTop: 8, color: "#333" },
  uploadSub: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 4,
  },
  remarksIcon: {
    position: "absolute",
    left: 10,
    top: 48,
    zIndex: 1,
  },
  remarksInput: {
    height: 100,
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    paddingLeft: 40,
    textAlignVertical: "top",
  },
});
