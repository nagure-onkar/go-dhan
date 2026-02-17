import { useLanguage } from "@/constants/localization/useLanguage";
import { useTheme } from "@/theme/useTheme";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

const MilkProfitReportForm = () => {
  const { colors } = useTheme();
  const { t } = useLanguage();

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [orgPrice, setOrgPrice] = useState("");
  const [expectedPrice, setExpectedPrice] = useState("");
  const [difference, setDifference] = useState("");
  const [status, setStatus] = useState("");
  const [remarks, setRemarks] = useState("");

  return (
    <ScrollView style={styles.container}>
      {/* Date Range */}
      <Section title="Date Range">
        <Label text="From Date *" />
        <TextInput
          style={styles.input}
          placeholder="dd mm yyyy"
          value={fromDate}
          onChangeText={setFromDate}
        />

        <Label text="To Date *" />
        <TextInput
          style={styles.input}
          placeholder="dd mm yyyy"
          value={toDate}
          onChangeText={setToDate}
        />
      </Section>

      {/* Price Details */}
      <Section title="Milk Price Details">
        <Label text="Organization Total Price (₹) *" />
        <TextInput
          style={styles.input}
          placeholder="Enter organization price"
          keyboardType="numeric"
          value={orgPrice}
          onChangeText={setOrgPrice}
        />

        <Label text="Expected Price (₹) *" />
        <TextInput
          style={styles.input}
          placeholder="Enter expected price"
          keyboardType="numeric"
          value={expectedPrice}
          onChangeText={setExpectedPrice}
        />

        <Label text="Difference Amount (₹) *" />
        <TextInput
          style={styles.input}
          placeholder="Profit / Loss amount"
          keyboardType="numeric"
          value={difference}
          onChangeText={setDifference}
        />
      </Section>

      {/* Status */}
      <Section title="Profit Status">
        <Label text="Status *" />
        <PickerField value={status} onChange={setStatus}>
          <Picker.Item label="Select status" value="" />
          <Picker.Item label="Profit" value="Profit" />
          <Picker.Item label="Loss" value="Loss" />
          <Picker.Item label="Neutral" value="Neutral" />
        </PickerField>
      </Section>

      {/* Remarks */}
      <Section title="Additional Notes">
        <Label text="Remarks" />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Any additional notes..."
          multiline
          value={remarks}
          onChangeText={setRemarks}
        />
      </Section>

      {/* Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.cancelBtn}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.submitBtn}>
          <Text style={styles.submitText}>Submit Report</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

/* ---------- Reusable Components ---------- */

const Section = ({ title, children }: any) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </View>
);

const Label = ({ text }: any) => (
  <Text style={styles.label}>{text}</Text>
);

const PickerField = ({ children, value, onChange }: any) => (
  <View style={styles.pickerWrapper}>
    <Picker selectedValue={value} onValueChange={onChange}>
      {children}
    </Picker>
  </View>
);

/* ---------- Styles ---------- */

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F2FFF7",
    padding: 12,
  },
  section: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#3CB371",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2E8B57",
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    marginBottom: 10,
    overflow: "hidden",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  cancelBtn: {
    backgroundColor: "#ddd",
    padding: 14,
    borderRadius: 6,
    width: "48%",
    alignItems: "center",
  },
  submitBtn: {
    backgroundColor: "#2E8B57",
    padding: 14,
    borderRadius: 6,
    width: "48%",
    alignItems: "center",
  },
  cancelText: {
    color: "#333",
    fontWeight: "600",
  },
  submitText: {
    color: "#fff",
    fontWeight: "700",
  },
});

export default MilkProfitReportForm;
