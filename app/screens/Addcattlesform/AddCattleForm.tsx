import AppText from "@/components/common/AppText";
import { useLanguage } from "@/constants/localization/useLanguage";
import { useTheme } from "@/theme/useTheme";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";

import {
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

const { t } = useLanguage();

const BASE_URL = "https://astrabytte-ai.onrender.com";

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

const cattleStates = [
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

const cattleStatuses = [
  { label: `${t.active}`, value: "Active" },
  { label: `${t.inactive}`, value: "Inactive" },
];

export default function AddCattleForm() {
  const { t } = useLanguage();
  const { colors } = useTheme();
  const [isSaved, setIsSaved] = useState(false);
  const [formData, setFormData] = useState({
    cattleId: "",
    nameOfCattle: "",
    breed: "",
    cattleType: "Buffalo",
    gender: "Female",
    treatmentGivenAtPurchase: "",
    nddbRegistrationNumber: "",
    purchasingCost: "",
    purchaseSource: "",
    dateOfBirth: "",
    weightKg: "",
    status: "active",
    workerAssigned: "",
    veterinarianAssigned: "",
    state: "",
    stateDate: "",
    bloodLine: "",
    insuranceNumber: "",
    lactationNumber: "",
    remark: "",
    images: [],
  });

  const reset = {
    cattleId: "",
    nameOfCattle: "",
    breed: null,
    cattleType: "Buffalo",
    gender: "Female",
    treatmentGivenAtPurchase: "",
    nddbRegistrationNumber: "",
    purchasingCost: "",
    purchaseSource: "",
    dateOfBirth: null,
    age: "",
    weightKg: "",
    status: "active",
    workerAssigned: null,
    veterinarianAssigned: null,
    state: null,
    stateDate: null,
    bloodLine: "",
    insuranceNumber: "",
    lactationNumber: "",
    remark: "",
    images: [],
  };

  const [errors, setErrors] = useState({});
  // track which date field opened the picker: 'dateOfBirth' or 'currentState'
  const [datePickerFor, setDatePickerFor] = useState<
    null | "dateOfBirth" | "currentState"
  >(null);
  const [isCattleTypeFocus, setIsCattleTypeFocus] = useState(false);
  const [isBreedFocus, setIsBreedFocus] = useState(false);
  const [isStatusFocus, setIsStatusFocus] = useState(false);
  const [isWorkerFocus, setIsWorkerFocus] = useState(false);
  const [isVetFocus, setIsVetFocus] = useState(false);
  const [isStateFocus, setIsStateFocus] = useState(false);
  const router = useRouter();
  const req = <AppText style={{ color: "red" }}> *</AppText>;

  const [screen1, setScreen1] = useState(true);
  const [screen2, setScreen2] = useState(false);
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
      setWorkerList(
        workers.map((w) => ({ label: w.full_name, value: w.worker_id })),
      );
      setVetList(vets.map((v) => ({ label: v.full_name, value: v.vet_id })));
    } catch (error) {
      console.error("Error loading dropdown data:", error);
    }
  };

  const getStoredToken = async () => {
    try {
      const token = await AsyncStorage.getItem("access_token");
      return token; // Returns the string or null
    } catch (error) {
      console.error("Error retrieving the token:", error);
      return null;
    }
  };

  // const saveFormData = async () => {
  //   try {
  //     setIsLoading(true);
  //     const token = await getStoredToken();
  //     const url = `${BASE_URL}/api/v1/cattle/`;

  //     // 1. Improved Formatter: Handles Undefined, Strings, and Date Objects
  //     const formatDate = (dateValue) => {
  //       if (!dateValue) return null; // If empty, don't try to split

  //       // If it's a Date object, convert to ISO string first
  //       const isoString =
  //         typeof dateValue === "string" ? dateValue : dateValue.toISOString();
  //       return isoString.split("T")[0];
  //     };

  //     // 2. Prepare the clean object
  //     const cleanData = {
  //       ...formData,
  //       // Use the safer formatter
  //       dateOfBirth: formatDate(formData.dateOfBirth),
  //       stateDate: formatDate(formData.stateDate),

  //       // Fix the naming mismatch from your previous error
  //       remarks: formData.remark || "",

  //       // Convert numbers to actual Integers if they are strings
  //       purchasingCost: formData.purchasingCost
  //         ? Number(formData.purchasingCost)
  //         : 0,
  //       weightKg: formData.weightKg ? Number(formData.weightKg) : 0,
  //       lactationNumber: formData.lactationNumber
  //         ? Number(formData.lactationNumber)
  //         : 0,
  //       age: formData.age ? Number(formData.age) : 0,
  //     };

  //     // Remove the key the backend doesn't like
  //     delete cleanData.remark;

  //     // console.log("Sending clean data:", cleanData);

  //     const response = await fetch(url, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify(cleanData),
  //     });

  //     if (!response.ok) {
  //       const errorData = await response.json();
  //       console.log(
  //         "BACKEND VALIDATION ERROR:",
  //         JSON.stringify(errorData, null, 2),
  //       );
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }

  //     const result = await response.json();
  //     console.log("Success:", result);
  //     return result;
  //   } catch (error) {
  //     console.error("Error saving form data:", error);
  //     throw error;
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const saveFormData = async () => {
    try {
      setIsLoading(true);
      const token = await getStoredToken();
      const url = `${BASE_URL}/api/v1/cattle/`;

      // Helper to format date as YYYY-MM-DD for stateDate
      const toShortDate = (date) => {
        if (!date) return new Date().toISOString().split("T")[0];
        return new Date(date).toISOString().split("T")[0];
      };

      // Helper to format date as Full ISO for dateOfBirth
      const toFullIso = (date) => {
        if (!date) return new Date().toISOString();
        return new Date(date).toISOString();
      };

      console.log(formData);

      const payload = {
        cattleId: formData.cattleId || "",
        nddbRegistrationNumber: formData.nddbRegistrationNumber || "N/A",
        cattleType: formData.cattleType || "",
        breed: formData.breed || "",
        gender: formData.gender || "Female",
        purchasingCost: Number(formData.purchasingCost) || 0,
        purchaseSource: formData.purchaseSource || "",

        // Matches "2026-02-27T16:25:02.090Z"
        dateOfBirth: toFullIso(formData.dateOfBirth),

        age: Number(formData.age) || 0,
        workerAssigned: formData.workerAssigned || "",
        veterinarianAssigned: formData.veterinarianAssigned || "",
        state: formData.state || "",

        // Matches "2026-02-27"
        stateDate: toShortDate(formData.stateDate),

        status: formData.status || "active",
        lactationNumber: Number(formData.lactationNumber) || 0,
        bloodLine: formData.bloodLine || "",
        remarks: formData.remark || "",
        insuranceNumber: formData.insuranceNumber || "",
        weightKg: Number(formData.weightKg) || 0,
        images: formData.images || [],
        nameOfCattle: formData.nameOfCattle || "",
        treatmentGivenAtPurchase: formData.treatmentGivenAtPurchase || "",
      };

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      console.log(response);
      // The line that was causing your error is now safely inside an async function
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
      console.error("Error saving form data:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const next = () => {
    let newErrors = {};
    // Added .trim() to prevent empty spaces from passing
    if (!formData.cattleId || !formData.cattleId.trim())
      newErrors.cattleId = `${t.cattleIdrequired}`;
    if (!formData.nameOfCattle || !formData.nameOfCattle.trim())
      newErrors.nameOfCattle = `${t.nameOfCattlerequired}`;
    if (!formData.cattleType) newErrors.cattleType = `${t.cattleTyperequired}`;
    if (!formData.breed) newErrors.breed = `${t.breedrequired}`;
    if (
      !formData.treatmentGivenAtPurchase ||
      !formData.treatmentGivenAtPurchase.trim()
    )
      newErrors.treatmentGivenAtPurchase = `${t.treatmentGivenAtPurchaserequired}`;
    // if (!formData.nddbRegistrationNumber || !formData.nddbRegistrationNumber.trim())
    //   newErrors.nddbRegistrationNumber = "NDDB Number is required";
    if (!formData.purchasingCost || !formData.purchasingCost.trim())
      newErrors.purchasingCost = `${t.purchasingCostrequired}`;
    if (!formData.purchaseSource || !formData.purchaseSource.trim())
      newErrors.purchaseSource = `${t.purchaseSourcerequired}`;
    if (!formData.dateOfBirth)
      newErrors.dateOfBirth = `${t.dateOfBirthrequired}`;
    if (!formData.age || !formData.age.trim())
      newErrors.age = `${t.agerequired}`;
    if (!formData.weightKg || !formData.weightKg.trim())
      newErrors.weightKg = `${t.weightKgrequired}`;

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setScreen1(!screen1);
      setScreen2(!screen2);
    }
  };

  const back = () => {
    setScreen1(!screen1);
    setScreen2(!screen2);
  };

  const handleSave = async () => {
    let newErrors = {};
    // if (!formData.status) newErrors.status = "Status is required";
    if (!formData.workerAssigned)
      newErrors.workerAssigned = `${t.workerAssignedrequired}`;
    if (!formData.veterinarianAssigned)
      newErrors.veterinarianAssigned = `${t.veterinarianAssignedrequired}`;
    if (!formData.state) newErrors.state = `${t.staterequired}`;
    if (!formData.stateDate) newErrors.stateDate = `${t.stateDaterequired}`;
    // if (!formData.bloodLine || !formData.bloodLine.trim())
    //   newErrors.bloodLine = "Blood Line is required";
    // if (!formData.insuranceNumber || !formData.insuranceNumber.trim())
    //   newErrors.insuranceNumber = "Insurance Number is required";
    if (!formData.lactationNumber || !formData.lactationNumber.trim())
      newErrors.lactationNumber = `${t.lactationNumberrequired}`;

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        console.log("Saving form data...", formData);
        await saveFormData(formData);
        setIsSaved(true);
        setFormData(reset);
        setScreen1(true);
        setScreen2(false);
        setTimeout(() => {
          router.push("../../tabs");
          setIsSaved(false);
        }, 2000);
      } catch (error) {
        console.error("Failed to save form:", error);
        setErrors({ submit: "Failed to save. Please try again." });
      }
    }
  };

  const handleCancel = () => {
    router.back(); // Standard practice for cancel buttons
    setFormData(reset);
  };

  const handleDateChange = (event, selectedDate) => {
    // close picker
    setDatePickerFor(null);
    if (!selectedDate) return;

    if (datePickerFor === "dateOfBirth") {
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
      setErrors((prev) => ({ ...prev, dateOfBirth: null }));
    }

    if (datePickerFor === "currentState") {
      setFormData({ ...formData, stateDate: selectedDate });
      setErrors((prev) => ({ ...prev, stateDate: null }));
    }
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
          Cattle Added Successfully!
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
            {t.addNewCattle}
          </AppText>
          <AppText style={[styles.headerSub, { color: colors.text }]}>
            {t.registerCattleDetails}{" "}
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

            {/* Cattle ID */}
            <View style={styles.inputGroup}>
              <AppText style={[styles.label, { color: colors.text }]}>
                {t.cattleId}
                {req}
              </AppText>
              <View
                style={[
                  styles.inputContainer,
                  errors.cattleId && styles.inputError,
                  { backgroundColor: colors.card, borderColor: colors.border },
                ]}
              >
                <Ionicons
                  name="pricetag-outline"
                  size={20}
                  color="#666"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={[styles.input, { color: colors.text }]}
                  placeholder={`${t.egctl}`}
                  value={formData.cattleId}
                  onChangeText={(val) =>
                    setFormData({ ...formData, cattleId: val })
                  }
                />
              </View>
              {errors.cattleId && (
                <AppText style={styles.errorAppText}>{errors.cattleId}</AppText>
              )}
            </View>

            {/* Cattle Name */}
            <View style={styles.inputGroup}>
              <AppText style={[styles.label, { color: colors.text }]}>
                {t.nameOfCattle}
                {req}
              </AppText>
              <View
                style={[
                  styles.inputContainer,
                  errors.nameOfCattle && styles.inputError,
                  { backgroundColor: colors.card, borderColor: colors.border },
                ]}
              >
                <MaterialCommunityIcons
                  name="cow"
                  size={20}
                  color="#666"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={[styles.input, { color: colors.text }]}
                  placeholder={`${t.egdaisy}`}
                  value={formData.nameOfCattle}
                  onChangeText={(val) =>
                    setFormData({ ...formData, nameOfCattle: val })
                  }
                />
              </View>
              {errors.nameOfCattle && (
                <AppText style={styles.errorAppText}>
                  {errors.nameOfCattle}
                </AppText>
              )}
            </View>

            {/* Dropdown: Cattle Type Selection */}
            <View style={styles.inputGroup}>
              <AppText style={[styles.label, { color: colors.text }]}>
                {t.cattleType}
                {req}
              </AppText>
              <Dropdown
                style={[
                  styles.dropdown,
                  isCattleTypeFocus && { borderColor: "#2D6A4F" },
                  errors.cattleType && { borderColor: "red" },
                  { backgroundColor: colors.card, borderColor: colors.border },
                ]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={[
                  styles.selectedTextStyle,
                  { color: colors.text },
                ]}
                data={cattleType}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isCattleTypeFocus ? "Select cattle type" : "..."}
                value={formData.cattleType}
                onFocus={() => setIsCattleTypeFocus(true)}
                onBlur={() => setIsCattleTypeFocus(false)}
                onChange={(item) => {
                  setFormData({
                    ...formData,
                    cattleType: item.value,
                    breed: null,
                  });
                  setIsCattleTypeFocus(false);
                  setErrors((prev) => ({ ...prev, cattleType: null }));
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
                <AppText style={styles.errorAppText}>
                  {errors.cattleType}
                </AppText>
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
                  isBreedFocus && { borderColor: "#2D6A4F" },
                  errors.breed && { borderColor: "red" },
                  { backgroundColor: colors.card, borderColor: colors.border },
                ]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={[
                  styles.selectedTextStyle,
                  { color: colors.text },
                ]}
                data={
                  formData.cattleType === "Buffalo" ? BuffaloBreeds : CowBreeds
                }
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isBreedFocus ? `${t.egselectbreed}` : "..."}
                value={formData.breed}
                onFocus={() => setIsBreedFocus(true)}
                onBlur={() => setIsBreedFocus(false)}
                onChange={(item) => {
                  setFormData({ ...formData, breed: item.value });
                  setIsBreedFocus(false);
                  setErrors((prev) => ({ ...prev, breed: null }));
                }}
                disable={!formData.cattleType}
                renderLeftIcon={() => (
                  <Ionicons
                    name="logo-buffer"
                    size={20}
                    color="#666"
                    style={styles.icon}
                  />
                )}
              />
              {errors.breed && (
                <AppText style={styles.errorAppText}>{errors.breed}</AppText>
              )}
            </View>

            {/* treatmentGivenAtPurchase given */}
            <View style={styles.inputGroup}>
              <AppText style={[styles.label, { color: colors.text }]}>
                {t.treatmentGivenAtPurchase}
                {req}
              </AppText>
              <View
                style={[
                  styles.inputContainer,
                  errors.treatmentGivenAtPurchase && styles.inputError,
                  { backgroundColor: colors.card, borderColor: colors.border },
                ]}
              >
                <Ionicons
                  name="medkit-outline"
                  size={20}
                  color="#666"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={[styles.input, { color: colors.text }]}
                  placeholder={`${t.egdeworming}`}
                  value={formData.treatmentGivenAtPurchase}
                  onChangeText={(val) =>
                    setFormData({ ...formData, treatmentGivenAtPurchase: val })
                  }
                />
              </View>
              {errors.treatmentGivenAtPurchase && (
                <AppText style={styles.errorAppText}>
                  {errors.treatmentGivenAtPurchase}
                </AppText>
              )}
            </View>

            {/* NDDB Number */}
            <View style={styles.inputGroup}>
              <AppText style={[styles.label, { color: colors.text }]}>
                {t.nddbRegistrationNumber}
              </AppText>
              <View
                style={[
                  styles.inputContainer,
                  errors.nddbRegistrationNumber && styles.inputError,
                  { backgroundColor: colors.card, borderColor: colors.border },
                ]}
              >
                <Ionicons
                  name="document-text-outline"
                  size={20}
                  color="#666"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={[styles.input, { color: colors.text }]}
                  placeholder={`${t.egnddb}`}
                  value={formData.nddbRegistrationNumber}
                  onChangeText={(val) =>
                    setFormData({ ...formData, nddbRegistrationNumber: val })
                  }
                />
              </View>
              {errors.nddbRegistrationNumber && (
                <AppText style={styles.errorAppText}>
                  {errors.nddbRegistrationNumber}
                </AppText>
              )}
            </View>

            {/* Gender Selector */}
            <AppText style={[styles.label, { color: colors.text }]}>
              {t.gender}
              {req}
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
                        ? styles.genderAppTextActive
                        : styles.genderAppText
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
              {t.purchaseDetails}
            </AppText>
            <View style={styles.separator} />

            {/* Cattle ID */}
            <View style={styles.inputGroup}>
              <AppText style={[styles.label, { color: colors.text }]}>
                {t.purchasingCost}
                {req}
              </AppText>
              <View
                style={[
                  styles.inputContainer,
                  errors.purchasingCost && styles.inputError,
                  { backgroundColor: colors.card, borderColor: colors.border },
                ]}
              >
                <Ionicons
                  name="cash-outline"
                  size={20}
                  color="#666"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={[styles.input, { color: colors.text }]}
                  placeholder="50000"
                  value={formData.purchasingCost}
                  keyboardType="numeric"
                  onChangeText={(val) =>
                    setFormData({ ...formData, purchasingCost: val })
                  }
                />
              </View>
              {errors.purchasingCost && (
                <AppText style={styles.errorAppText}>
                  {errors.purchasingCost}
                </AppText>
              )}
            </View>

            <View style={styles.inputGroup}>
              <AppText style={[styles.label, { color: colors.text }]}>
                {t.purchaseSource}
                {req}
              </AppText>
              <View
                style={[
                  styles.inputContainer,
                  errors.purchaseSource && styles.inputError,
                  { backgroundColor: colors.card, borderColor: colors.border },
                ]}
              >
                <Ionicons
                  name="location-outline"
                  size={20}
                  color="#666"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={[styles.input, { color: colors.text }]}
                  placeholder={t.egpurchasesource}
                  value={formData.purchaseSource}
                  onChangeText={(val) =>
                    setFormData({ ...formData, purchaseSource: val })
                  }
                />
              </View>
              {errors.purchaseSource && (
                <AppText style={styles.errorAppText}>
                  {errors.purchaseSource}
                </AppText>
              )}
            </View>

            <View style={styles.inputGroup}>
              <AppText style={[styles.label, { color: colors.text }]}>
                {t.dateOfBirth}
                {req}
              </AppText>
              <TouchableOpacity
                style={[
                  styles.inputContainer,
                  errors.dateOfBirth && styles.inputError,
                  {
                    justifyContent: "flex-start",
                    alignItems: "center",
                    backgroundColor: colors.card,
                    borderColor: colors.border,
                  },
                ]}
                onPress={() => setDatePickerFor("dateOfBirth")}
              >
                <Ionicons
                  name="calendar-outline"
                  size={20}
                  color="#666"
                  style={styles.inputIcon}
                />
                <AppText
                  style={{
                    color: formData.dateOfBirth ? colors.text : "#999",
                    paddingVertical: 10,
                  }}
                >
                  {formData.dateOfBirth
                    ? formData.dateOfBirth.toLocaleDateString()
                    : `${t.egselectdate}`}
                </AppText>
              </TouchableOpacity>
              {datePickerFor === "dateOfBirth" && (
                <DateTimePicker
                  value={formData.dateOfBirth || new Date()}
                  mode="date"
                  display="default"
                  onChange={handleDateChange}
                  maximumDate={new Date()}
                />
              )}
              {errors.dateOfBirth && (
                <AppText style={styles.errorAppText}>
                  {errors.dateOfBirth}
                </AppText>
              )}
            </View>

            {/* Age (auto-calculated) */}
            <View style={styles.inputGroup}>
              <AppText style={[styles.label, { color: colors.text }]}>
                {t.age}
              </AppText>
              <View
                style={[
                  styles.inputContainer,
                  styles.disabledInput,
                  errors.age && styles.inputError,
                  { backgroundColor: colors.card, borderColor: colors.border },
                ]}
              >
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
                    { color: colors.text },
                  ]}
                  placeholder={t.egselectdob}
                  value={formData.age}
                  editable={false}
                />
              </View>
              {errors.age && (
                <AppText style={styles.errorAppText}>{errors.age}</AppText>
              )}
            </View>

            <View style={styles.inputGroup}>
              <AppText style={[styles.label, { color: colors.text }]}>
                {t.weightKg}
                {req}
              </AppText>
              <View
                style={[
                  styles.inputContainer,
                  errors.weightKg && styles.inputError,
                  { backgroundColor: colors.card, borderColor: colors.border },
                ]}
              >
                <Ionicons
                  name="scale-outline"
                  size={20}
                  color="#666"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={[styles.input, { color: colors.text }]}
                  placeholder="500"
                  value={formData.weightKg}
                  keyboardType="numeric"
                  onChangeText={(val) =>
                    setFormData({ ...formData, weightKg: val })
                  }
                />
              </View>
              {errors.weightKg && (
                <AppText style={styles.errorAppText}>{errors.weightKg}</AppText>
              )}
            </View>
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.cancelBtn} onPress={handleCancel}>
              <AppText style={styles.cancelBtnAppText}>{t.cancel}</AppText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveBtn} onPress={next}>
              {/* <Ionicons name="save-outline" size={20} color="white" /> */}
              <AppText style={styles.saveBtnAppText}>{t.next}</AppText>
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
            {t.addCattle}
          </AppText>
          <AppText style={[styles.headerSub, { color: colors.text }]}>
            Register a Cattle with details
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
                renderLeftIcon={() => (
                  <Ionicons
                    name="analytics-outline"
                    size={20}
                    color="#666"
                    style={styles.icon}
                  />
                )}
              />
              {/* {errors.status && (
                <AppText style={styles.errorAppText}>{errors.status}</AppText>
              )} */}
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
                placeholder={!isWorkerFocus ? `${t.egselectworker}` : "..."}
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
                <AppText style={styles.errorAppText}>
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
                placeholder={!isVetFocus ? `${t.egselectvet}` : "..."}
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
                <AppText style={styles.errorAppText}>
                  {errors.veterinarianAssigned}
                </AppText>
              )}
            </View>

            <View style={styles.inputGroup}>
              <AppText style={[styles.label, { color: colors.text }]}>
                {t.state}
                {req}
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
                data={cattleStates}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isStateFocus ? `${t.egselectdate}` : "..."}
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
                <AppText style={styles.errorAppText}>{errors.state}</AppText>
              )}
            </View>

            <View style={styles.inputGroup}>
              <AppText style={[styles.label, { color: colors.text }]}>
                {t.stateDate}
                {req}
              </AppText>
              <TouchableOpacity
                style={[
                  styles.inputContainer,
                  errors.stateDate && styles.inputError,
                  {
                    justifyContent: "flex-start",
                    alignItems: "center",
                    backgroundColor: colors.card,
                    borderColor: colors.border,
                  },
                ]}
                onPress={() => setDatePickerFor("currentState")}
              >
                <Ionicons
                  name="calendar-outline"
                  size={20}
                  color="#666"
                  style={styles.inputIcon}
                />
                <AppText
                  style={{
                    color: formData.stateDate ? colors.text : "#999",
                    paddingVertical: 10,
                  }}
                >
                  {formData.stateDate
                    ? formData.stateDate.toLocaleDateString()
                    : `${t.egselectdate}`}
                </AppText>
              </TouchableOpacity>
              {datePickerFor === "currentState" && (
                <DateTimePicker
                  value={formData.stateDate || new Date()}
                  mode="date"
                  display="default"
                  onChange={handleDateChange}
                  maximumDate={new Date()}
                />
              )}
              {errors.stateDate && (
                <AppText style={styles.errorAppText}>
                  {errors.stateDate}
                </AppText>
              )}
            </View>

            <View style={styles.inputGroup}>
              <AppText style={[styles.label, { color: colors.text }]}>
                {t.bloodLine}
              </AppText>
              <View
                style={[
                  styles.inputContainer,
                  errors.bloodLine && styles.inputError,
                  { backgroundColor: colors.card, borderColor: colors.border },
                ]}
              >
                <Ionicons
                  name="water-outline"
                  size={20}
                  color="#666"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={[styles.input, { color: colors.text }]}
                  value={formData.bloodLine}
                  onChangeText={(val) => setFormValue("bloodLine", val)}
                />
              </View>
              {errors.bloodLine && (
                <AppText style={styles.errorAppText}>
                  {errors.bloodLine}
                </AppText>
              )}
            </View>

            <View style={styles.inputGroup}>
              <AppText style={[styles.label, { color: colors.text }]}>
                {t.insuranceNumber}
              </AppText>
              <View
                style={[
                  styles.inputContainer,
                  errors.insuranceNumber && styles.inputError,
                  { backgroundColor: colors.card, borderColor: colors.border },
                ]}
              >
                <Ionicons
                  name="shield-checkmark-outline"
                  size={20}
                  color="#666"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={[styles.input, { color: colors.text }]}
                  placeholder={`${t.egins}`}
                  value={formData.insuranceNumber}
                  onChangeText={(val) => setFormValue("insuranceNumber", val)}
                />
              </View>
              {errors.insuranceNumber && (
                <AppText style={styles.errorAppText}>
                  {errors.insuranceNumber}
                </AppText>
              )}
            </View>

            <View style={styles.inputGroup}>
              <AppText style={[styles.label, { color: colors.text }]}>
                {t.lactationNumber}
                {req}
              </AppText>
              <View
                style={[
                  styles.inputContainer,
                  errors.lactationNumber && styles.inputError,
                  { backgroundColor: colors.card, borderColor: colors.border },
                ]}
              >
                <MaterialCommunityIcons
                  name="bucket-outline"
                  size={20}
                  color="#666"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={[styles.input, { color: colors.text }]}
                  placeholder={`${t.eglactationnumber}`}
                  value={formData.lactationNumber}
                  keyboardType="numeric"
                  onChangeText={(val) => setFormValue("lactationNumber", val)}
                />
              </View>
              {errors.lactationNumber && (
                <AppText style={styles.errorAppText}>
                  {errors.lactationNumber}
                </AppText>
              )}
            </View>
          </View>

          <View
            style={[
              styles.sectionCard,
              {
                backgroundColor: colors.card,
                shadowColor: colors.shadow,
                elevation: 5,
              },
            ]}
          >
            <AppText style={[styles.sectionTitle, { color: colors.primary }]}>
              {t.cattleImages}
            </AppText>
            <View style={styles.separator} />
            <TouchableOpacity
              style={[
                styles.uploadBox,
                { backgroundColor: colors.card, borderColor: colors.border },
              ]}
            >
              <Ionicons
                name="cloud-upload-outline"
                size={40}
                color={colors.primary}
              />
              <AppText style={[styles.uploadAppText, { color: colors.text }]}>
                {t.egclicktouploadimage}
              </AppText>
            </TouchableOpacity>
          </View>

          <View
            style={[
              styles.sectionCard,
              {
                backgroundColor: colors.card,
                shadowColor: colors.shadow,
                elevation: 5,
              },
            ]}
          >
            <AppText style={[styles.sectionTitle, { color: colors.primary }]}>
              {t.additionalInformation}
            </AppText>
            <View style={styles.separator} />
            <AppText style={[styles.label, { color: colors.text }]}>
              {t.remarks}
            </AppText>
            <View
              style={[
                styles.inputContainer,
                {
                  minHeight: 100,
                  alignItems: "flex-start",
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                  shadowColor: colors.shadow,
                  elevation: 2,
                },
              ]}
            >
              <Ionicons
                name="reader-outline"
                size={20}
                color={colors.text}
                style={[styles.inputIcon, { paddingTop: 10 }]}
              />
              <TextInput
                style={[styles.remarkInput, { color: colors.text }]}
                placeholder={t.egaddanyremarks}
                multiline={true}
                numberOfLines={4}
                value={formData.remark}
                onChangeText={(val) => setFormValue("remark", val)}
              />
            </View>
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.cancelBtn} onPress={back}>
              <AppText style={styles.cancelBtnAppText}>{t.back}</AppText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
              <Ionicons name="save-outline" size={20} color="white" />
              <AppText style={styles.saveBtnAppText}>{t.save}</AppText>
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
    flex: 1,
    borderWidth: 0,
    padding: 10,
    backgroundColor: "transparent",
    minHeight: 40,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
  },
  inputIcon: {
    marginRight: 10,
  },
  inputError: { borderColor: "red" },
  disabledInput: { backgroundColor: "#f0f0f0" },
  errorAppText: { color: "red", fontSize: 11, marginTop: 4 },
  dropdown: {
    height: 50,
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 8,
  },
  icon: { marginRight: 6, marginTop: 3 },
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
  genderAppText: { color: "#2D6A4F", fontWeight: "600" },
  genderAppTextActive: { color: "white", fontWeight: "600" },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
    paddingBottom: 40,
  },
  uploadBox: {
    justifyContent: "center",
    alignItems: "center",
    height: 120,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  uploadAppText: { marginTop: 8 },
  saveBtn: {
    flexDirection: "row",
    backgroundColor: "#2D6A4F",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    gap: 8,
  },
  saveBtnAppText: { color: "white", fontWeight: "bold" },
  cancelBtn: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: "#f1f1f1",
  },
  cancelBtnAppText: { color: "#666" },
  backBtn: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: "#f1f1f1",
  },
  backBtnAppText: { color: "#666", fontWeight: "bold" },
  remarkInput: {
    flex: 1,
    padding: 10,
    textAlignVertical: "top",
    minHeight: 80,
    lineHeight: 20,
  },
});
