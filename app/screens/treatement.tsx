import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useTheme } from "@/theme/useTheme";
import { useLanguage } from '@/constants/localization/useLanguage';

  const { t, setLanguage, language } = useLanguage();

/*- detect system theme - */
  const { colors } = useTheme();
  const TreatmentForm = () => {
  const [lactating, setLactating] = useState("No");
  const [severity, setSeverity] = useState("");
  const [milkingMethod, setMilkingMethod] = useState("");
  const [housingType, setHousingType] = useState("");
  const [waterSource, setWaterSource] = useState("");
  const [labTest, setLabTest] = useState("No");
  const [milkDiscard, setMilkDiscard] = useState("No");
  const [dosageRoute, setDosageRoute] = useState("");

  return (
    <ScrollView style={styles.container}>
      {/*- Lactation Details- */}
      <Section title="Lactation Details">
        <Label text="Is Cattle Lactating *" />
        <PickerField value={lactating} onChange={setLactating}>
          <Picker.Item label="Yes" value="Yes" />
          <Picker.Item label="No" value="No" />
        </PickerField>
      </Section>

      {/* -Symptoms Observed- */}
      <Section title="Symptoms Observed">
        <Label text="Onset Date *" />
        <TextInput style={styles.input} placeholder="dd mm yyyy" />

        <Label text="Severity *" />
        <PickerField value={severity} onChange={setSeverity}>
          <Picker.Item label="Select severity" value="" />
          <Picker.Item label="Mild" value="Mild" />
          <Picker.Item label="Moderate" value="Moderate" />
          <Picker.Item label="Severe" value="Severe" />
        </PickerField>

        <Label text="Main Symptoms *" />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Describe symptoms observed..."
          multiline
        />
      </Section>

      {/* -Environment & Management- */}
      <Section title="Environment & Management">
        <Label text="Temperature Today (°C)" />
        <TextInput style={styles.input} placeholder="Enter today’s temperature" />

        <Label text="Milking Method *" />
        <PickerField value={milkingMethod} onChange={setMilkingMethod}>
          <Picker.Item label="Select milking method" value="" />
          <Picker.Item label="Hand Milking" value="Hand" />
          <Picker.Item label="Machine Milking" value="Machine" />
        </PickerField>

        <Label text="Housing Type *" />
        <PickerField value={housingType} onChange={setHousingType}>
          <Picker.Item label="Select housing type" value="" />
          <Picker.Item label="Open" value="Open" />
          <Picker.Item label="Closed" value="Closed" />
        </PickerField>

        <Label text="Water Source *" />
        <PickerField value={waterSource} onChange={setWaterSource}>
          <Picker.Item label="Select water source" value="" />
          <Picker.Item label="Well" value="Well" />
          <Picker.Item label="Tap" value="Tap" />
          <Picker.Item label="River" value="River" />
        </PickerField>
      </Section>

      {/*- Clinical Diagnosis -*/}
      <Section title="Clinical Diagnosis">
        <Label text="Disease Category" />
        <PickerField>
          <Picker.Item label="Select category" value="" />
        </PickerField>

        <Label text="Disease" />
        <PickerField>
          <Picker.Item label="Select disease" value="" />
        </PickerField>

        <Label text="Lab Test Done?" />
        <PickerField value={labTest} onChange={setLabTest}>
          <Picker.Item label="Yes" value="Yes" />
          <Picker.Item label="No" value="No" />
        </PickerField>
      </Section>

      {/* -Treatment Given -*/}
      <Section title="Treatment Given">
        <Label text="Treatment Date *" />
        <TextInput style={styles.input} placeholder="dd mm yyyy" />

        <Label text="Dosage *" />
        <TextInput style={styles.input} placeholder="Example: 5ml twice a day" />

        <Label text="Dosage Route *" />
        <PickerField value={dosageRoute} onChange={setDosageRoute}>
          <Picker.Item label="Select dosage route" value="" />
          <Picker.Item label="Oral" value="Oral" />
          <Picker.Item label="Injection" value="Injection" />
        </PickerField>

        <Label text="Milk Discard for Safety?" />
        <PickerField value={milkDiscard} onChange={setMilkDiscard}>
          <Picker.Item label="Yes" value="Yes" />
          <Picker.Item label="No" value="No" />
        </PickerField>

        <Label text="Medicines Given" />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Enter medicines used..."
          multiline
        />
      </Section>

      {/*-Treatment Expenses- */}
      <Section title="Treatment Expenses">
        <Label text="Doctor Fees (₹)" />
        <TextInput style={styles.input} placeholder="Enter doctor fees" />

        <Label text="Treatment Expenses (₹)" />
        <TextInput style={styles.input} placeholder="Enter treatment expenses" />

        <Label text="Other Expenses (₹)" />
        <TextInput style={styles.input} placeholder="Enter other expenses" />
      </Section>

      {/*- Follow Up-*/}
      <Section title="Follow Up">
        <Label text="Follow-up Date" />
        <TextInput style={styles.input} placeholder="dd mm yyyy" />
      </Section>

      {/* -Buttons-*/}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.cancelBtn}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.submitBtn}>
          <Text style={styles.submitText}>Submit Treatment</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

/* - Reusable Components - */

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

/* - Styles -*/

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

export default TreatmentForm;
