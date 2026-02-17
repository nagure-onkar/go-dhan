import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { Platform } from "react-native";



const SectionTitle = ({ title }: { title: string }) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionText}>{title}</Text>
  </View>
);

const MilkProfitCalculator = () => {
    const [date, setDate] = React.useState(new Date());
const [showPicker, setShowPicker] = React.useState(false);

const onChangeDate = (_: any, selectedDate?: Date) => {
  setShowPicker(false);
  if (selectedDate) setDate(selectedDate);
};

  const [form, setForm] = useState({
    cattleType: "cow",
    date: "10-02-2026",
    recordType: "",
  });

  const [cattleType, setCattleType] = React.useState("cow");
  const [recordType, setRecordType] = React.useState("");


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <MaterialCommunityIcons name="cow" size={26} color="#16a34a" />
            <View>
              <Text style={styles.title}>Milk Profit Calculator</Text>
              <Text style={styles.subtitle}>
                Simple daily calculation of milk usage, sales & profit
              </Text>
            </View>
          </View>

          
        </View>

           
       

       <View style={styles.col}>
  <Text style={styles.label}>Cattle Type *</Text>
  <View style={styles.pickerWrapper}>
    <Picker
      selectedValue={cattleType}
      onValueChange={(value) => setCattleType(value)}
      style={{ height: 44 }} 
    >
      <Picker.Item label="Select Cattle Type" value="" />
      <Picker.Item label="Cow" value="cow" />
      <Picker.Item label="Buffalo" value="buffalo" />
    </Picker>
  </View>
</View>



        {/* Basic Information */}
        <SectionTitle title="Basic Information" />

        

        <View style={styles.row}>
          <View style={styles.col}>
            <Text style={styles.label}>Date</Text>
            <TouchableOpacity onPress={() => setShowPicker(true)}>
  <View pointerEvents="none">
    <TextInput
      style={styles.input}
      value={date.toLocaleDateString("en-GB")}
    />
  </View>
</TouchableOpacity>

{showPicker && (
  <DateTimePicker
    value={date}
    mode="date"
    display={Platform.OS === "ios" ? "spinner" : "default"}
    onChange={onChangeDate}
  />
)}

          </View>

          <View style={styles.col}>
            <Text style={styles.label}>Record Type *</Text>
            <View style={styles.pickerWrapper}>
  <Picker
    selectedValue={recordType}
    onValueChange={(value) => setRecordType(value)}
    style={{ height: 44 }} 
  >
    <Picker.Item label="Select Record Type" value="" />
    <Picker.Item label="Morning" value="morning" />
    <Picker.Item label="Evening" value="evening" />
  </Picker>
</View>

          </View>
        </View>

        {/* Milk Produced Details */}
        <SectionTitle title="Milk Produced Details" />

        <View style={styles.row}>
          <View style={styles.col}>
            <Text style={styles.label}>Total Milk Produced</Text>
            <TextInput style={styles.input} value="0" />
          </View>
          <View style={styles.col}>
            <Text style={styles.label}>For Workers</Text>
            <TextInput style={styles.input} value="0" />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.col}>
            <Text style={styles.label}>For Calf</Text>
            <TextInput style={styles.input} value="0" />
          </View>
          <View style={styles.col}>
            <Text style={styles.label}>In House Utility</Text>
            <TextInput style={styles.input} value="0" />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.col}>
            <Text style={styles.label}>Wastage</Text>
            <TextInput style={styles.input} value="0" />
          </View>
          <View style={styles.col}>
            <Text style={styles.label}>Actual Produced</Text>
            <TextInput style={styles.input} value="0" />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.col}>
            <Text style={styles.label}>FAT %</Text>
            <TextInput style={styles.input} value="0" />
          </View>
          <View style={styles.col}>
            <Text style={styles.label}>SNF %</Text>
            <TextInput style={styles.input} />
          </View>
        </View>

        <View style={styles.row}>
  <View style={styles.col}>
    <Text style={styles.label}>Expected Rate per litre</Text>
    <TextInput style={styles.input} />
  </View>

  <View style={styles.col}>
    <Text style={styles.label}>Expected Total</Text>
    <TextInput style={styles.input} value="0" />
  </View>
</View>
        {/* Milk Sales Details */}
        <SectionTitle title="Milk Sales Details" />

        <View style={styles.row}>
          <View style={styles.col}>
            <Text style={styles.label}>Sales in Litres</Text>
            <TextInput style={styles.input} />
          </View>
          <View style={styles.col}>
            <Text style={styles.label}>Sales FAT %</Text>
            <TextInput style={styles.input} value="0" />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.col}>
            <Text style={styles.label}>Sales SNF %</Text>
            <TextInput style={styles.input} />
          </View>
          <View style={styles.col}>
            <Text style={styles.label}>Org Rate per Litre</Text>
            <TextInput style={styles.input} />
          </View>
        </View>

        <View style={styles.row}>
  <View style={styles.col}>
    <Text style={styles.label}>Organization Total</Text>
    <TextInput style={styles.input} value="0" />
  </View>

  <View style={styles.col}>
    {/* Empty column to maintain equal width */}
  </View>
</View>

        {/* Profit */}
        <View style={styles.profitBox}>
          <Text style={styles.profitLabel}>Total Profit</Text>
          <Text style={styles.profitValue}>₹ 0.00</Text>
        </View>

        <TouchableOpacity style={styles.saveBtn}>
          <Text style={styles.saveText}>Save Record</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MilkProfitCalculator;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ffffff" },

  header: {
    backgroundColor: "#ECFDF5",
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 16,
  },
  headerLeft: { flexDirection: "row", gap: 10 },
  title: { fontSize: 18, fontWeight: "600" },
  subtitle: { fontSize: 12, color: "#555" },

  userBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#dcfce7",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  userText: { fontSize: 12 },

  sectionHeader: {
    borderBottomWidth: 1,
    borderBottomColor: "#22c55e",
    marginVertical: 16,
  },
  sectionText: { fontWeight: "600", marginBottom: 6 },

  row: { flexDirection: "row", gap: 12 },
  col: { flex: 1 },

  label: { fontSize: 12, marginBottom: 4 },
  input: {
    borderWidth: 1,
    borderColor: "#22c55e",
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
  },

  profitBox: {
    backgroundColor: "#f0fdf4",
    padding: 16,
    borderRadius: 8,
    marginVertical: 16,
  },
  profitLabel: { fontSize: 12 },
  profitValue: {
    fontSize: 20,
    fontWeight: "700",
    color: "#16a34a",
  },

  saveBtn: {
    backgroundColor: "#16a34a",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 30,
  },
pickerWrapper: {
  width: '49%',   
  borderWidth: 1,
  borderColor: "#22c55e",
  borderRadius: 6,
  marginBottom: 12,
}
,

  saveText: { color: "#fff", fontWeight: "600" },
});
