import AppText from "@/components/common/AppText";
import { useLanguage } from "@/constants/localization/useLanguage";
import { useTheme } from "@/theme/useTheme";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import React, { useState } from "react";

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

const cattleType = [
  { label: "Buffalo", value: "buffalo" },
  { label: "Cow", value: "cow" },
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
  { label: `${t.active}`, value: "active" },
  { label: `${t.inactive}`, value: "inactive" },
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

const reset = {
  cattleId: "",
  cattleName: "",
  breed: null,
  cattleType: "buffalo",
  gender: "Female",
  treatment: "",
  nddbNumber: "",
  purchaseCost: "",
  purchaseSource: "",
  dob: null,
  age: "",
  weight: "",
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

export default function AddCattleForm() {
  const { t, setLanguage, language } = useLanguage();
  const { colors } = useTheme();
  const [isSaved, setIsSaved] = useState(false);
  const [formData, setFormData] = useState({
    cattleId: "",
    cattleName: "",
    breed: null,
    cattleType: "buffalo",
    gender: "Female",
    treatment: "",
    nddbNumber: "",
    purchaseCost: "",
    purchaseSource: "",
    dob: null,
    age: "",
    weight: "",
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
  // track which date field opened the picker: 'dob' or 'currentState'
  const [datePickerFor, setDatePickerFor] = useState<
    null | "dob" | "currentState"
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

  const saveFormData = async (formData) => {
    try {
      setIsLoading(true);
      const url = "http://10.124.247.84:3000/cattlestock";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Form data saved successfully:", result);
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
    if (!formData.cattleName || !formData.cattleName.trim())
      newErrors.cattleName = `${t.cattleNamerequired}`;
    if (!formData.cattleType) newErrors.cattleType = `${t.cattleTyperequired}`;
    if (!formData.breed) newErrors.breed = `${t.breedrequired}`;
    if (!formData.treatment || !formData.treatment.trim())
      newErrors.treatment = `${t.treatmentrequired}`;
    // if (!formData.nddbNumber || !formData.nddbNumber.trim())
    //   newErrors.nddbNumber = "NDDB Number is required";
    if (!formData.purchaseCost || !formData.purchaseCost.trim())
      newErrors.purchaseCost = `${t.purchaseCostrequired}`;
    if (!formData.purchaseSource || !formData.purchaseSource.trim())
      newErrors.purchaseSource = `${t.purchaseSourcerequired}`;
    if (!formData.dob) newErrors.dob = `${t.dobrequired}`;
    if (!formData.age || !formData.age.trim())
      newErrors.age = `${t.agerequired}`;
    if (!formData.weight || !formData.weight.trim())
      newErrors.weight = `${t.weightrequired}`;

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
    if (!formData.vetAssigned)
      newErrors.vetAssigned = `${t.vetAssignedrequired}`;
    if (!formData.state) newErrors.state = `${t.staterequired}`;
    if (!formData.currentStateDate)
      newErrors.currentStateDate = `${t.currentStateDaterequired}`;
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

    if (datePickerFor === "dob") {
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
      setErrors((prev) => ({ ...prev, dob: null }));
    }

    if (datePickerFor === "currentState") {
      setFormData({ ...formData, currentStateDate: selectedDate });
      setErrors((prev) => ({ ...prev, currentStateDate: null }));
    }
  };

  const setFormValue = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: null }));
  };

  if (isSaved) {
    return <Success style={{ flex: 1, backgroundColor: colors.background }} />;
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
                {t.cattleName}
                {req}
              </AppText>
              <View
                style={[
                  styles.inputContainer,
                  errors.cattleName && styles.inputError,
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
                  value={formData.cattleName}
                  onChangeText={(val) =>
                    setFormData({ ...formData, cattleName: val })
                  }
                />
              </View>
              {errors.cattleName && (
                <AppText style={styles.errorAppText}>
                  {errors.cattleName}
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
                  formData.cattleType === "buffalo" ? buffaloBreeds : cowBreeds
                }
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isBreedFocus ? "Select breed" : "..."}
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

            {/* Treatment given */}
            <View style={styles.inputGroup}>
              <AppText style={[styles.label, { color: colors.text }]}>
                Treatment Given At Purchase{req}
              </AppText>
              <View
                style={[
                  styles.inputContainer,
                  errors.treatment && styles.inputError,
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
                  value={formData.treatment}
                  onChangeText={(val) =>
                    setFormData({ ...formData, treatment: val })
                  }
                />
              </View>
              {errors.treatment && (
                <AppText style={styles.errorAppText}>
                  {errors.treatment}
                </AppText>
              )}
            </View>

            {/* NDDB Number */}
            <View style={styles.inputGroup}>
              <AppText style={[styles.label, { color: colors.text }]}>
                {t.nddbNumber}
              </AppText>
              <View
                style={[
                  styles.inputContainer,
                  errors.nddbNumber && styles.inputError,
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
                  value={formData.nddbNumber}
                  onChangeText={(val) =>
                    setFormData({ ...formData, nddbNumber: val })
                  }
                />
              </View>
              {errors.nddbNumber && (
                <AppText style={styles.errorAppText}>
                  {errors.nddbNumber}
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
                {t.purchaseCost}
                {req}
              </AppText>
              <View
                style={[
                  styles.inputContainer,
                  errors.purchaseCost && styles.inputError,
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
                  value={formData.purchaseCost}
                  keyboardType="numeric"
                  onChangeText={(val) =>
                    setFormData({ ...formData, purchaseCost: val })
                  }
                />
              </View>
              {errors.purchaseCost && (
                <AppText style={styles.errorAppText}>
                  {errors.purchaseCost}
                </AppText>
              )}
            </View>

            {/* Cattle Name */}
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
                  placeholder="e.g. Local Farm"
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

            {/* Cattle ID */}
            <View style={styles.inputGroup}>
              <AppText style={[styles.label, { color: colors.text }]}>
                {t.dateOfBirth}
                {req}
              </AppText>
              <TouchableOpacity
                style={[
                  styles.inputContainer,
                  errors.dob && styles.inputError,
                  {
                    justifyContent: "flex-start",
                    alignItems: "center",
                    backgroundColor: colors.card,
                    borderColor: colors.border,
                  },
                ]}
                onPress={() => setDatePickerFor("dob")}
              >
                <Ionicons
                  name="calendar-outline"
                  size={20}
                  color="#666"
                  style={styles.inputIcon}
                />
                <AppText
                  style={{
                    color: formData.dob ? colors.text : "#999",
                    paddingVertical: 10,
                  }}
                >
                  {formData.dob
                    ? formData.dob.toLocaleDateString()
                    : "Select Date"}
                </AppText>
              </TouchableOpacity>
              {datePickerFor === "dob" && (
                <DateTimePicker
                  value={formData.dob || new Date()}
                  mode="date"
                  display="default"
                  onChange={handleDateChange}
                  maximumDate={new Date()}
                />
              )}
              {errors.dob && (
                <AppText style={styles.errorAppText}>{errors.dob}</AppText>
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
                  placeholder="Select DOB to calculate age"
                  value={formData.age}
                  editable={false}
                />
              </View>
              {errors.age && (
                <AppText style={styles.errorAppText}>{errors.age}</AppText>
              )}
            </View>

            {/* Cattle ID */}
            <View style={styles.inputGroup}>
              <AppText style={[styles.label, { color: colors.text }]}>
                {t.weight}
                {req}
              </AppText>
              <View
                style={[
                  styles.inputContainer,
                  errors.weight && styles.inputError,
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
                  value={formData.weight}
                  keyboardType="numeric"
                  onChangeText={(val) =>
                    setFormData({ ...formData, weight: val })
                  }
                />
              </View>
              {errors.weight && (
                <AppText style={styles.errorAppText}>{errors.weight}</AppText>
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
                {t.vetAssigned}
                {req}
              </AppText>
              <Dropdown
                style={[
                  styles.dropdown,
                  isVetFocus && { borderColor: "#2D6A4F" },
                  errors.vetAssigned && { borderColor: "red" },
                  { backgroundColor: colors.card, borderColor: colors.border },
                ]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={[
                  styles.selectedTextStyle,
                  { color: colors.text },
                ]}
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
                renderLeftIcon={() => (
                  <Ionicons
                    name="medkit-outline"
                    size={20}
                    color="#666"
                    style={styles.icon}
                  />
                )}
              />
              {errors.vetAssigned && (
                <AppText style={styles.errorAppText}>
                  {errors.vetAssigned}
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
                <AppText style={styles.errorAppText}>{errors.state}</AppText>
              )}
            </View>

            <View style={styles.inputGroup}>
              <AppText style={[styles.label, { color: colors.text }]}>
                {t.currentStateDate}
                {req}
              </AppText>
              <TouchableOpacity
                style={[
                  styles.inputContainer,
                  errors.currentStateDate && styles.inputError,
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
                    color: formData.currentStateDate ? colors.text : "#999",
                    paddingVertical: 10,
                  }}
                >
                  {formData.currentStateDate
                    ? formData.currentStateDate.toLocaleDateString()
                    : "Select Date"}
                </AppText>
              </TouchableOpacity>
              {datePickerFor === "currentState" && (
                <DateTimePicker
                  value={formData.currentStateDate || new Date()}
                  mode="date"
                  display="default"
                  onChange={handleDateChange}
                  maximumDate={new Date()}
                />
              )}
              {errors.currentStateDate && (
                <AppText style={styles.errorAppText}>
                  {errors.currentStateDate}
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
                <Ionicons
                  name=""
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

          <View style={styles.sectionCard}>
            <AppText style={[styles.sectionTitle, { color: colors.text }]}>
              {t.cattleImages}
            </AppText>
            <View style={styles.separator} />
            <TouchableOpacity style={styles.uploadBox}>
              <Ionicons name="cloud-upload-outline" size={40} color="#000000" />
              <AppText style={styles.uploadAppText}>
                Click to upload Cattle images
              </AppText>
            </TouchableOpacity>
          </View>

          <View style={styles.sectionCard}>
            <AppText style={[styles.sectionTitle, { color: colors.text }]}>
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
                },
              ]}
            >
              <Ionicons
                name="reader-outline"
                size={20}
                color="#666"
                style={[styles.inputIcon, { paddingTop: 10 }]}
              />
              <TextInput
                style={[styles.remarkInput, { color: colors.text }]}
                placeholder="Add any additional remarks here..."
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
    height: 100,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#5fcd54",
    borderRadius: 10,
    backgroundColor: "#e0f5e5c3",
    marginBottom: 20,
  },
  uploadAppText: { marginTop: 8, color: "#333" },
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
    height: 100,
    padding: 10,
    textAlignVertical: "top",
  },
});
