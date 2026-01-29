import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const AddVeterinarian = () => {
  const [gender, setGender] = useState<string>("");

  const handleSave = () => {
    router.replace("/tabs");
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={22} color="#16a34a" />
        </View>
        <View>
          <Text style={styles.title}>Add New Veterinarian</Text>
          <Text style={styles.subtitle}>
            Register a new veterinarian with complete details
          </Text>
        </View>
      </View>

      {/* Personal Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personal Information</Text>

        <Input icon="id-card" label="Veterinarian ID *" placeholder="e.g., VET-001" />
        <Input icon="person" label="First Name *" placeholder="e.g., Dr. Meena" />
        <Input icon="person-outline" label="Father's Name *" placeholder="e.g., Suresh" />
        <Input icon="person-circle-outline" label="Surname *" placeholder="e.g., Patil" />

        <Text style={styles.label}>Gender *</Text>
        <View style={styles.row}>
          {["Male", "Female", "Other"].map((g) => (
            <TouchableOpacity
              key={g}
              style={[
                styles.radio,
                gender === g && styles.radioSelected,
              ]}
              onPress={() => setGender(g)}
            >
              <Text>{g}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Input icon="calendar" label="Date of Birth *" placeholder="mm/dd/yyyy" />
        <Input
          icon="calculator"
          label="Age"
          placeholder="Auto-calculated"
          editable={false}
        />
        <Input icon="calendar-outline" label="Date of Joining *" placeholder="mm/dd/yyyy" />
      </View>

      {/* Contact Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact Information</Text>

        <Input
          icon="call"
          label="Mobile Number *"
          placeholder="9876543211"
          keyboardType="phone-pad"
        />

        <Input
          icon="call-outline"
          label="Alternate Contact Number"
          placeholder="Optional"
          keyboardType="phone-pad"
        />

        <Input
          icon="location"
          label="Address *"
          placeholder="e.g., Pune District Hospital, Pune"
        />
      </View>

      {/* Professional Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Professional Information</Text>

        <Text style={styles.label}>Specialization & Remarks</Text>
        <TextInput
          style={styles.textArea}
          placeholder="e.g., Specialist in bovine health, Large animal surgery expertise..."
          multiline
        />
      </View>

      {/* Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.cancelBtn}>
          <Text>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Ionicons name="save" size={18} color="#fff" />
          <Text style={styles.saveText}> Save Veterinarian</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AddVeterinarian;



const Input = ({
  icon,
  label,
  ...props
}: {
  icon: any;
  label: string;
  [key: string]: any;
}) => (
  <View style={{ marginBottom: 12 }}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.inputWrapper}>
      <Ionicons name={icon} size={18} color="#6b7280" />
      <TextInput style={styles.input} {...props} />
    </View>
  </View>
);



const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 16,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 12,
  },

  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#dcfce7",
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
  },

  subtitle: {
    color: "#6b7280",
    fontSize: 13,
  },

  section: {
    marginBottom: 22,
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: "600",
    borderBottomWidth: 2,
    borderBottomColor: "#22c55e",
    paddingBottom: 4,
    marginBottom: 12,
  },

  label: {
    fontSize: 13,
    color: "#374151",
    marginBottom: 4,
  },

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    paddingHorizontal: 10,
  },

  input: {
    flex: 1,
    padding: 10,
  },

  row: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 12,
  },

  radio: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
  },

  radioSelected: {
    backgroundColor: "#dcfce7",
    borderColor: "#22c55e",
  },

  textArea: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    padding: 10,
    height: 100,
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

  saveText: {
    color: "#fff",
    fontWeight: "600",
  },
});
