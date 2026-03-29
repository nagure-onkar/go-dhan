import AppText from "@/components/common/AppText";
import { useLanguage } from "@/constants/localization/useLanguage";
import { useTheme } from "@/theme/useTheme";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
const BASE_URL = "https://astrabytte-ai.onrender.com";

const AddVeterinarian = () => {
  const { t } = useLanguage();
  const { colors } = useTheme();

  // ================= STATE =================
  const [vetId, setVetId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [fathersName, setFathersName] = useState("");
  const [surname, setSurname] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [age, setAge] = useState("");
  const [joiningDate, setJoiningDate] = useState("");
  const [mobile, setMobile] = useState("");
  const [alternateMobile, setAlternateMobile] = useState("");
  const [address, setAddress] = useState("");
  const [specialization, setSpecialization] = useState("");

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showJoiningPicker, setShowJoiningPicker] = useState(false);

  // ================= DOB PICKER =================
  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === "android") setShowDatePicker(false);
    if (!selectedDate) return;

    const formatted =
      selectedDate.getMonth() +
      1 +
      "/" +
      selectedDate.getDate() +
      "/" +
      selectedDate.getFullYear();
    setDob(formatted);

    // Calculate age
    const today = new Date();
    let calculatedAge = today.getFullYear() - selectedDate.getFullYear();
    const monthDiff = today.getMonth() - selectedDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < selectedDate.getDate())
    ) {
      calculatedAge--;
    }
    setAge(calculatedAge.toString());
  };

  // ================= JOINING DATE PICKER =================
  const handleJoiningChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === "android") setShowJoiningPicker(false);
    if (!selectedDate) return;

    const formatted =
      selectedDate.getMonth() +
      1 +
      "/" +
      selectedDate.getDate() +
      "/" +
      selectedDate.getFullYear();
    setJoiningDate(formatted);
  };

  // ================= MOBILE VALIDATION =================
  const handleMobileChange = (text: string) => {
    const cleaned = text.replace(/[^0-9]/g, "");
    if (cleaned.length <= 10) setMobile(cleaned);
  };
  const handleAlternateMobileChange = (text: string) => {
    const cleaned = text.replace(/[^0-9]/g, "");
    if (cleaned.length <= 10) setAlternateMobile(cleaned);
  };

  // ================= SAVE =================
  const handleSave = async () => {
    try {
      const token = await AsyncStorage.getItem("access_token");

      if (!token) {
        Alert.alert("Error", "User not logged in");
        return;
      }

      if (!vetId.trim())
        return Alert.alert("Validation Error", "Enter Veterinarian ID");
      if (!firstName.trim())
        return Alert.alert("Validation Error", "Enter First Name");
      if (!fathersName.trim())
        return Alert.alert("Validation Error", "Enter Father's Name");
      if (!surname.trim())
        return Alert.alert("Validation Error", "Enter Surname");
      if (!gender) return Alert.alert("Validation Error", "Select Gender");
      if (!dob) return Alert.alert("Validation Error", "Select Date of Birth");
      if (!joiningDate)
        return Alert.alert("Validation Error", "Select Date of Joining");
      if (!mobile || mobile.length !== 10)
        return Alert.alert(
          "Validation Error",
          "Enter valid 10 digit mobile number",
        );
      if (!address.trim())
        return Alert.alert("Validation Error", "Enter Address");

      // FORMAT DATE
      const formatDate = (dateString: string) => {
        const parts = dateString.split("/");
        if (parts.length !== 3) return null;

        const month = parts[0].padStart(2, "0");
        const day = parts[1].padStart(2, "0");
        const year = parts[2];

        return `${year}-${month}-${day}`;
      };

      const formattedDOB = formatDate(dob);
      const formattedJoining = formatDate(joiningDate);

      if (!formattedDOB || !formattedJoining) {
        Alert.alert("Error", "Invalid date format");
        return;
      }

      const formattedGender =
        gender === "Male" ? "Male" : gender === "Female" ? "Female" : "";

      if (!formattedGender) {
        Alert.alert("Error", "Gender must be Male or Female");
        return;
      }

      const payload = {
        vetId: vetId.trim(),
        firstName: firstName.trim(),
        fathersName: fathersName.trim(),
        surname: surname.trim(),
        gender: formattedGender,
        dateOfBirth: formattedDOB,
        age: Number(age) || 0,
        address: address.trim(),
        dateOfJoining: formattedJoining,
        mobileNumber: mobile,
        alternateContactNumber: alternateMobile || null,
        remarks: specialization || "",
      };

      console.log("Sending Payload:", payload);

      // ✅ CORRECT ENDPOINT
      const response = await fetch(`${BASE_URL}/api/v1/vet-registry/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      console.log("Veterinarian API Response:", result);

      if (!response.ok) {
        Alert.alert(
          "Error",
          result?.detail?.[0]?.msg || result?.detail || "Something went wrong",
        );
        return;
      }

      Alert.alert("Success", "Veterinarian Added Successfully");
      router.replace("/tabs");
    } catch (error) {
      console.log("SAVE ERROR:", error);
      Alert.alert("Error", "Server Error");
    }
  };

  return (
    <View style={styles.screen}>
      {/* ================= HEADER ================= */}
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={22} color="#16a34a" />
        </View>
        <View>
          <AppText style={styles.title}>{t.addNewVeterinarian}</AppText>
          <AppText style={styles.subtitle}>{t.registerVeterinarian}</AppText>
        </View>
      </View>

      {/* ================= CONTENT ================= */}
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* ===== PERSONAL INFO ===== */}
        <View style={styles.section}>
          <AppText style={styles.sectionTitle}>{t.personalInformation}</AppText>

          <Input
            label={t.veterinarianId}
            placeholder={"e.g., VET-001"}
            icon="id-card"
            value={vetId}
            onChangeText={setVetId}
          />
          <Input
            label={t.firstName}
            placeholder={"e.g., Dr. Meena"}
            icon="person"
            value={firstName}
            onChangeText={setFirstName}
          />
          <Input
            label={t.fathersName}
            placeholder={"e.g., Suresh"}
            icon="person-outline"
            value={fathersName}
            onChangeText={setFathersName}
          />
          <Input
            label={t.surname}
            placeholder={"e.g., Patil"}
            icon="person-circle-outline"
            value={surname}
            onChangeText={setSurname}
          />

          <AppText style={styles.label}>{t.gender}</AppText>
          <View style={styles.row}>
            {[t.male, t.female, t.other].map((g) => (
              <TouchableOpacity
                key={g}
                style={[styles.radio, gender === g && styles.radioSelected]}
                onPress={() => setGender(g)}
              >
                <AppText>{g.toLowerCase()}</AppText>
              </TouchableOpacity>
            ))}
          </View>

          <Input
            label={t.dateOfBirth}
            placeholder={"mm/dd/yyyy"}
            icon="calendar"
            value={dob}
            onFocus={() => setShowDatePicker(true)}
          />
          {showDatePicker && (
            <DateTimePicker
              value={dob ? new Date(dob) : new Date()}
              mode="date"
              display="default"
              onChange={handleDateChange}
              maximumDate={new Date()}
            />
          )}

          <Input
            label={t.age}
            placeholder={"Auto-calculated"}
            icon="calculator"
            editable={false}
            value={age}
          />

          <Input
            label={t.dateOfJoining}
            placeholder={"mm/dd/yyyy"}
            icon="calendar-outline"
            value={joiningDate}
            onFocus={() => setShowJoiningPicker(true)}
          />
          {showJoiningPicker && (
            <DateTimePicker
              value={joiningDate ? new Date(joiningDate) : new Date()}
              mode="date"
              display="default"
              onChange={handleJoiningChange}
              maximumDate={new Date()}
            />
          )}
        </View>

        {/* ===== CONTACT INFO ===== */}
        <View style={styles.section}>
          <AppText style={styles.sectionTitle}>{t.contactInformation}</AppText>

          <Input
            label={t.mobileNumber}
            placeholder={"9876543211"}
            keyboardType="phone-pad"
            icon="call"
            value={mobile}
            onChangeText={handleMobileChange}
          />
          <Input
            label={t.alternateContactNumber}
            placeholder={"Optional"}
            keyboardType="phone-pad"
            icon="call-outline"
            value={alternateMobile}
            onChangeText={handleAlternateMobileChange}
          />
          <Input
            label={t.address}
            placeholder={"e.g., Pune District Hospital, Pune"}
            icon="location"
            value={address}
            onChangeText={setAddress}
          />
        </View>

        {/* ===== PROFESSIONAL INFO ===== */}
        <View style={styles.section}>
          <AppText style={styles.sectionTitle}>
            {t.professionalInformation}
          </AppText>
          <AppText style={styles.label}>{t.specializationRemarks}</AppText>
          <TextInput
            style={styles.textArea}
            placeholder={
              "e.g., Specialist in bovine health, Large animal surgery expertise..."
            }
            placeholderTextColor="#9ca3af"
            multiline
            value={specialization}
            onChangeText={setSpecialization}
          />
        </View>

        {/* ===== BUTTONS ===== */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.cancelBtn}>
            <AppText>{t.cancel}</AppText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
            <Ionicons name="save" size={18} color="#fff" />
            <AppText style={styles.saveText}>{t.saveVeterinarian}</AppText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default AddVeterinarian;

/* ================= INPUT COMPONENT ================= */
const Input = ({
  icon,
  label,
  ...props
}: {
  icon: any;
  label: string;
  [key: string]: any;
}) => (
  <View style={{ marginBottom: 14 }}>
    <AppText style={styles.label}>{label}</AppText>
    <View style={styles.inputWrapper}>
      <Ionicons name={icon} size={18} color="#6b7280" />
      <TextInput
        style={styles.input}
        placeholderTextColor="#9ca3af"
        {...props}
      />
    </View>
  </View>
);

/* ================= STYLES ================= */
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#f9fafb" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
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
  sectionTitle: {
    fontSize: 15,
    fontWeight: "600",
    borderBottomWidth: 1.5,
    borderBottomColor: "#22c55e",
    paddingBottom: 6,
    marginBottom: 14,
  },
  label: { fontSize: 13, color: "#374151", marginBottom: 4 },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    paddingHorizontal: 12,
    backgroundColor: "#f9fafb",
  },
  input: { flex: 1, padding: 10 },
  row: { flexDirection: "row", gap: 10, marginBottom: 14 },
  radio: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  radioSelected: { backgroundColor: "#dcfce7", borderColor: "#22c55e" },
  textArea: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    padding: 12,
    height: 110,
    backgroundColor: "#f9fafb",
    textAlignVertical: "top",
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
    justifyContent: "center",
    gap: 6,
  },
  saveText: { color: "#fff", fontWeight: "600" },
});
