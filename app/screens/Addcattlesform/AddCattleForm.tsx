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

const cattleType = [
  { label: "Buffalo", value: "buffalo" },
  { label: "Cow", value: "cow" },
];

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
  const req = <Text style={{ color: "red" }}> *</Text>;

  const [screen1, setScreen1] = useState(true);
  const [screen2, setScreen2] = useState(false);

  const saveFormData = async (formData) => {
    const url = "http://10.240.244.84:3000/cattlestock";
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

  const next = () => {
    let newErrors = {};
    // Added .trim() to prevent empty spaces from passing
    if (!formData.cattleId.trim()) newErrors.cattleId = "Cattle ID is required";
    if (!formData.cattleName.trim())
      newErrors.cattleName = "Cattle Name is required";
    if (!formData.cattleType) newErrors.cattleType = "Cattle type is required";
    if (!formData.breed) newErrors.breed = "Please select a breed";
    if (!formData.treatment.trim())
      newErrors.treatment = "Treatment is required";
    // if (!formData.nddbNumber.trim())
    //   newErrors.nddbNumber = "NDDB Number is required";
    if (!formData.purchaseCost.trim())
      newErrors.purchaseCost = "Cost is required";
    if (!formData.purchaseSource.trim())
      newErrors.purchaseSource = "Source is required";
    if (!formData.dob) newErrors.dob = "Date of Birth is required";
    if (!formData.age.trim()) newErrors.age = "Age is required";
    if (!formData.weight.trim()) newErrors.weight = "Weight is required";

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
      console.log("Saving form data...", formData);
      saveFormData(formData);
      setIsSaved(true);
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
    router.back(); // Standard practice for cancel buttons
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
    return <Success style={{ flex: 1, backgroundColor: "#bbffc4" }} />;
  }

  if (screen1) {
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
          keyboardShouldPersistTaps="handled" // CRITICAL: Allows dropdown to click while keyboard is open
        >
          {/* <View style={styles.header}>
          <Text style={styles.headerTitle}>Add New Cattle</Text>
          <Text style={styles.headerSub}>Register a Cattle with details</Text>
        </View> */}

          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Basic Information</Text>
            <View style={styles.separator} />

            {/* Cattle ID */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Cattle ID{req}</Text>
              <TextInput
                style={[styles.input, errors.cattleId && styles.inputError]}
                placeholder="e.g. CTL-001"
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
                  isCattleTypeFocus && { borderColor: "#2D6A4F" },
                  errors.cattleType && { borderColor: "red" },
                ]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
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
                  isBreedFocus && { borderColor: "#2D6A4F" },
                  errors.breed && { borderColor: "red" },
                ]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
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
              />
              {errors.breed && (
                <Text style={styles.errorText}>{errors.breed}</Text>
              )}
            </View>

            {/* Treatment given */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Treatment Given At Purchase{req}</Text>
              <TextInput
                style={[styles.input, errors.treatment && styles.inputError]}
                placeholder="e.g. Deworming"
                value={formData.treatment}
                onChangeText={(val) =>
                  setFormData({ ...formData, treatment: val })
                }
              />
              {errors.treatment && (
                <Text style={styles.errorText}>{errors.treatment}</Text>
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
            <Text style={styles.sectionTitle}>Purchase Details</Text>
            <View style={styles.separator} />

            {/* Cattle ID */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Purchasing Cost (₹){req}</Text>
              <TextInput
                style={[styles.input, errors.purchaseCost && styles.inputError]}
                placeholder="50000"
                value={formData.purchaseCost}
                keyboardType="numeric"
                onChangeText={(val) =>
                  setFormData({ ...formData, purchaseCost: val })
                }
              />
              {errors.purchaseCost && (
                <Text style={styles.errorText}>{errors.purchaseCost}</Text>
              )}
            </View>

            {/* Cattle Name */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Purchase Source{req}</Text>
              <TextInput
                style={[
                  styles.input,
                  errors.purchaseSource && styles.inputError,
                ]}
                placeholder="e.g. Local Farm"
                value={formData.purchaseSource}
                onChangeText={(val) =>
                  setFormData({ ...formData, purchaseSource: val })
                }
              />
              {errors.purchaseSource && (
                <Text style={styles.errorText}>{errors.purchaseSource}</Text>
              )}
            </View>

            {/* Cattle ID */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Date of Birth{req}</Text>
              <TouchableOpacity
                style={[
                  styles.input,
                  errors.dob && styles.inputError,
                  { justifyContent: "center" },
                ]}
                onPress={() => setDatePickerFor("dob")}
              >
                <Text style={{ color: formData.dob ? "#000" : "#999" }}>
                  {formData.dob
                    ? formData.dob.toLocaleDateString()
                    : "Select Date"}
                </Text>
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

            {/* Cattle ID */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Weight (Kg){req}</Text>
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
                <Text style={styles.errorText}>{errors.weight}</Text>
              )}
            </View>
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.cancelBtn} onPress={handleCancel}>
              <Text style={styles.cancelBtnText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveBtn} onPress={next}>
              {/* <Ionicons name="save-outline" size={20} color="white" /> */}
              <Text style={styles.saveBtnText}>Next Page</Text>
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
                onPress={() => setDatePickerFor("currentState")}
              >
                <Text
                  style={{ color: formData.currentStateDate ? "#000" : "#999" }}
                >
                  {formData.currentStateDate
                    ? formData.currentStateDate.toLocaleDateString()
                    : "Select Date"}
                </Text>
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
              <Text style={styles.uploadText}>
                Click to upload Cattle images
              </Text>
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
            <TouchableOpacity style={styles.cancelBtn} onPress={back}>
              <Text style={styles.cancelBtnText}>Back</Text>
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
  cancelBtn: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: "#f1f1f1",
  },
  cancelBtnText: { color: "#666" },
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
