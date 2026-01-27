import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { router } from "expo-router";

export default function AddWorker() {
  const [gender, setGender] = useState("");

  const handleSave = () => {
   
    router.replace("/tabs"); 
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <Text style={styles.title}>Add New Worker</Text>
      <Text style={styles.subtitle}>
        Register a new worker with complete details
      </Text>

      {/* Personal Information */}
      <Section title="Personal Information">
        <Input label="Worker ID *" placeholder="e.g., WKR-001" />
        <Input label="First Name *" placeholder="e.g., Ravi" />
        <Input label="Father's Name *" placeholder="e.g., Mohan" />
        <Input label="Surname *" placeholder="e.g., Patil" />

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

        <Input label="Date of Birth *" placeholder="dd/mm/yyyy" />
        <Input label="Age" placeholder="Auto-calculated" editable={false} />
        <Input label="Salary *" placeholder="₹ 0" keyboardType="numeric" />
        <Input label="Date of Joining *" placeholder="dd/mm/yyyy" />
      </Section>

      {/* Contact Information */}
      <Section title="Contact Information">
        <Input
          label="Mobile Number *"
          placeholder="9876543210"
          keyboardType="phone-pad"
        />
        <Input
          label="Alternate Contact Number"
          placeholder="Optional"
          keyboardType="phone-pad"
        />
        <Input label="Address *" placeholder="Village Road, City Name" />
      </Section>

      {/* Document Upload (UI only) */}
      <Section title="Document Upload">
        <View style={styles.uploadBox}>
          <Text style={styles.uploadText}>Click to upload Aadhar card image</Text>
          <Text style={styles.uploadSub}>PNG, JPG up to 10MB</Text>
        </View>
      </Section>

      {/* Additional Info */}
      <Section title="Additional Information">
        <TextInput
          style={styles.textArea}
          placeholder="Any additional notes about the worker..."
          multiline
        />
      </Section>

      {/* Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.cancelBtn}>
          <Text>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={{ color: "#fff", fontWeight: "600" }}>
            Save Worker
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}



const Section = ({ title, children }: any) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </View>
);

const Input = ({ label, ...props }: any) => (
  <View style={{ marginBottom: 12 }}>
    <Text style={styles.label}>{label}</Text>
    <TextInput style={styles.input} {...props} />
  </View>
);


const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
  },
  subtitle: {
    color: "#666",
    marginBottom: 16,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#22c55e",
    paddingBottom: 4,
  },
  label: {
    fontSize: 13,
    marginBottom: 4,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    padding: 10,
  },
  row: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 12,
  },
  radio: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 8,
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
    borderRadius: 10,
    alignItems: "center",
  },
  uploadText: {
    fontWeight: "500",
  },
  uploadSub: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
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
    marginVertical: 20,
  },
  cancelBtn: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    width: "45%",
    alignItems: "center",
  },
  saveBtn: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#16a34a",
    width: "45%",
    alignItems: "center",
  },
});
