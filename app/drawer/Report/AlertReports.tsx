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

const AlertReportForm = () => {
  const { colors } = useTheme();
  const { t } = useLanguage();

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [alertSource, setAlertSource] = useState("System");

  const handleClear = () => {
    setFromDate("");
    setToDate("");
    setAlertSource("System");
  };

  const handleDownload = () => {
    console.log("Download Alert Report");
  };

  return (
    <ScrollView style={styles.container}>
      {/* Alert Report */}
      <Section title="Alerts Report">
        <Label text="Date Range" />

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

        <Label text="Alert Source *" />
        <PickerField value={alertSource} onChange={setAlertSource}>
          <Picker.Item label="System" value="System" />
          <Picker.Item label="Manual" value="Manual" />
        </PickerField>
      </Section>

      {/* Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.clearBtn} onPress={handleClear}>
          <Text style={styles.clearText}>Clear</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.downloadBtn} onPress={handleDownload}>
          <Text style={styles.downloadText}>Download</Text>
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
  clearBtn: {
    backgroundColor: "#ddd",
    padding: 14,
    borderRadius: 6,
    width: "48%",
    alignItems: "center",
  },
  downloadBtn: {
    backgroundColor: "#2E8B57",
    padding: 14,
    borderRadius: 6,
    width: "48%",
    alignItems: "center",
  },
  clearText: {
    color: "#333",
    fontWeight: "600",
  },
  downloadText: {
    color: "#fff",
    fontWeight: "700",
  },
});

export default AlertReportForm;

