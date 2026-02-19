import React, { useState } from "react";
import {
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import { useTheme } from "../../src/theme/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import AppText from "../components/AppText";
import { useLanguage } from "../../src/constants/localization/useLanguage";

const BASE_URL = "https://astrabytte-ai.onrender.com";

const AddWorker = () => {
  const { t } = useLanguage();
  const { colors } = useTheme();

  const [gender, setGender] = useState<string>("");
  const [dob, setDob] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [joiningDate, setJoiningDate] = useState<string>("");

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showJoiningPicker, setShowJoiningPicker] = useState(false);

  const [selectedImage, setSelectedImage] = useState<any>(null);

  const [workerId, setWorkerId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [surname, setSurname] = useState("");
  const [salary, setSalary] = useState("");
  const [mobile, setMobile] = useState("");
  const [alternateMobile, setAlternateMobile] = useState("");
  const [address, setAddress] = useState("");
  const [remarks, setRemarks] = useState("");
  const [loading, setLoading] = useState(false);

  /* ================= DOB PICKER ================= */

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (!selectedDate) return;

    const formatted =
      selectedDate.getMonth() + 1 +
      "/" +
      selectedDate.getDate() +
      "/" +
      selectedDate.getFullYear();

    setDob(formatted);

    const today = new Date();
    let calculatedAge =
      today.getFullYear() - selectedDate.getFullYear();
    const monthDiff = today.getMonth() - selectedDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 &&
        today.getDate() < selectedDate.getDate())
    ) {
      calculatedAge--;
    }

    setAge(calculatedAge.toString());
  };

  /* ================= JOINING DATE PICKER ================= */

  const handleJoiningChange = (event: any, selectedDate?: Date) => {
    setShowJoiningPicker(false);
    if (!selectedDate) return;

    const formatted =
      selectedDate.getMonth() + 1 +
      "/" +
      selectedDate.getDate() +
      "/" +
      selectedDate.getFullYear();

    setJoiningDate(formatted);
  };

  /* ================= IMAGE PICKER ================= */

  const pickImage = async () => {
    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

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

  /* ================= MOBILE VALIDATION ================= */

  const handleMobileChange = (text: string) => {
    const cleaned = text.replace(/[^0-9]/g, "");
    if (cleaned.length <= 10) {
      setMobile(cleaned);
    }
  };

  const handleAlternateMobileChange = (text: string) => {
    const cleaned = text.replace(/[^0-9]/g, "");
    if (cleaned.length <= 10) {
      setAlternateMobile(cleaned);
    }
  };

  /* ================= SAVE ================= */

  const handleSave = async () => {
    if (!workerId.trim()) return Alert.alert("Validation Error", "Please enter Worker ID");
    if (!firstName.trim()) return Alert.alert("Validation Error", "Please enter First Name");
    if (!fatherName.trim()) return Alert.alert("Validation Error", "Please enter Father's Name");
    if (!surname.trim()) return Alert.alert("Validation Error", "Please enter Surname");
    if (!gender) return Alert.alert("Validation Error", "Please select Gender");
    if (!dob) return Alert.alert("Validation Error", "Please select Date of Birth");
    if (!salary.trim()) return Alert.alert("Validation Error", "Please enter Salary");
    if (!joiningDate) return Alert.alert("Validation Error", "Please select Date of Joining");
    if (!mobile || mobile.length < 10) return Alert.alert("Validation Error", "Please enter valid Mobile Number");
    if (!address.trim()) return Alert.alert("Validation Error", "Please enter Address");

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("worker_id", workerId);
      formData.append("first_name", firstName);
      formData.append("father_name", fatherName);
      formData.append("surname", surname);
      formData.append("gender", gender);
      formData.append("date_of_birth", dob);
      formData.append("salary", salary);
      formData.append("date_of_joining", joiningDate);
      formData.append("mobile_number", mobile);
      formData.append("alternate_contact_number", alternateMobile);
      formData.append("address", address);
      formData.append("remarks", remarks);

      if (selectedImage) {
        formData.append("aadhar_image", {
          uri: selectedImage.uri,
          name: "aadhar.jpg",
          type: "image/jpeg",
        } as any);
      }

      const response = await fetch(
        `${BASE_URL}/api/v1/worker-registry/`,
        {
          method: "POST",
          body: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        Alert.alert("Error", data.detail || "Something went wrong");
        return;
      }

      Alert.alert("Success", "Worker Added Successfully ");
      router.replace("/tabs");
    } catch (error) {
      Alert.alert("Error", "Server Error");
    } finally {
      setLoading(false);
    }
  };

   return (
    <View
      style={[
        styles.screen,
        { backgroundColor: colors.background }, 
      ]}
    >
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Ionicons
            name="person-add"
            size={22}
            color={colors.primary} 
          />
        </View>
        <View>
          <AppText style={styles.title}>
            {t("Add New Worker")}
          </AppText>
          <AppText style={styles.subtitle}>
            {t("Register a new worker with complete details")}
          </AppText>
        </View>
      </View>
      
  


      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <AppText style={styles.sectionTitle}>
            {t("Personal Information")}
          </AppText>

          <Input label={t("workerId")} icon="id-card" placeholder="eg.WKR-001 " value={workerId} onChangeText={setWorkerId} />
          <Input label={t("First Name *")} icon="person"placeholder=" eg Ravi " value={firstName} onChangeText={setFirstName} />
          <Input label={t("Father's Name *")} icon="person-outline"placeholder="eg. Mohan " value={fatherName} onChangeText={setFatherName} />
          <Input label={t("Surname *")} icon="people-outline" value={surname} placeholder="eg.Patil" onChangeText={setSurname} />

          <AppText style={styles.label}>{t("Gender *")}</AppText>
          <View style={styles.row}>
            {[t("male"), t("female"), t("other")].map((g) => (
              <TouchableOpacity
                key={g}
                style={[styles.radio, gender === g && styles.radioSelected]}
                onPress={() => setGender(g)}
              >
                <AppText>{g}</AppText>
              </TouchableOpacity>
            ))}
          </View>

          {/* DOB */}
          <AppText style={styles.label}>{t("Date of Birth *")}</AppText>
          <TouchableOpacity
            style={styles.inputWrapper}
            onPress={() => setShowDatePicker(true)}
          >
            <Ionicons name="calendar" size={18} color="#6b7280" />
            <TextInput
              style={styles.input}
              placeholder="mm/dd/yyyy"
              value={dob}
              editable={false}
            />
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={dob ? new Date(dob) : new Date()}
              mode="date"
              display="default"
              onChange={handleDateChange}
              maximumDate={new Date()}
            />
          )}

          <Input label={t("Age")} icon="calculator"placeholder="0" value={age} editable={false} />

          <Input
            label={t("Salary *")}
            icon="cash"
            placeholder="0"
            keyboardType="numeric"
            value={salary}
            onChangeText={setSalary}
          />

          {/* JOINING DATE */}
          <AppText style={styles.label}>{t("Date of Joining *")}</AppText>
          <TouchableOpacity
            style={styles.inputWrapper}
            onPress={() => setShowJoiningPicker(true)}
          >
            <Ionicons name="calendar-outline" size={18} color="#6b7280" />
            <TextInput
              style={styles.input}
              placeholder="mm/dd/yyyy"
              value={joiningDate}
              editable={false}
            />
          </TouchableOpacity>

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

        {/* CONTACT */}
        <View style={styles.section}>
          <AppText style={styles.sectionTitle}>
            {t("Contact Information")}
          </AppText>

          <Input
            label={t("Mobile Number *")}
            icon="call"
            keyboardType="phone-pad"
            placeholder="9876543210"
            value={mobile}
            onChangeText={handleMobileChange}
          />

          <Input
            label={t("Alternate Contact Number")}
            icon="call-outline"
            keyboardType="phone-pad"
            placeholder="Optional"
            value={alternateMobile}
            onChangeText={handleAlternateMobileChange}
          />

          <Input
            label={t("Address *")}
            placeholder="Village Road,City name"
            icon="location"
            value={address}
            onChangeText={setAddress}
          />
        </View>

        {/* DOCUMENT UPLOAD */}
        <View style={styles.section}>
          <AppText style={styles.sectionTitle}>
            {t("Document Upload")}
          </AppText>

          <TouchableOpacity style={styles.uploadBox} onPress={pickImage}>
            <Ionicons name="cloud-upload-outline" size={30} color="#16a34a" />
            <AppText style={styles.uploadText}>
              {t("Upload Aadhar Card Image")}
            </AppText>
            <AppText style={styles.uploadSub}>
              PNG, JPG up to 10MB
            </AppText>
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

        {/* ADDITIONAL */}
        <View style={styles.section}>
          <AppText style={styles.sectionTitle}>
            {t("Additional Information")}
          </AppText>

          <AppText style={styles.label}>{t("Remarks")}</AppText>
          <TextInput
            style={styles.textArea}
            placeholder="Any additional notes..."
            multiline
            value={remarks}
            onChangeText={setRemarks}
          />
        </View>
        
        

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.cancelBtn}>
            <AppText style={{ fontWeight: "600" }}>
              {t("Cancel")}
            </AppText>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.saveBtn}
            onPress={handleSave}
            disabled={loading}
          >
            <Ionicons name="save" size={18} color="#fff" />
            <AppText style={styles.saveText}>
              {loading ? t("Saving...") : t("Save Worker")}
            </AppText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
    
  );
};

export default AddWorker;



/* ================= INPUT COMPONENT ================= */

const Input = ({
  icon,
  label,
  ...props
}: {
  icon: any;
  label: string;
  [key: string]: any;
}) =>
   (
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
  radioSelected: {
    backgroundColor: "#dcfce7",
    borderColor: "#22c55e",
  },
  uploadBox: {
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#22c55e",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    backgroundColor: "#f0fdf4",
  },
  uploadText: {
    marginTop: 8,
    fontWeight: "500",
  },
  uploadSub: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 4,
  },
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
