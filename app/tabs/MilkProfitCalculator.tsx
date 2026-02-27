import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import AppText from '../../src/components/common/AppText';
import ScreenWrapper from '../../src/components/common/ScreenWrapper';

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { Platform } from "react-native";



const SectionTitle = ({ title }: { title: string }) => (
  <View style={styles.sectionHeader}>
    <AppText style={styles.sectionText}>{title}</AppText>
  </View>
);

const MilkProfitCalculator = () => {
    const [date, setDate] = React.useState(new Date());
const [showPicker, setShowPicker] = React.useState(false);

const onChangeDate = (_: any, selectedDate?: Date) => {
  setShowPicker(false);
  if (selectedDate) setDate(selectedDate);
};

const BASE_URL = "https://astrabytte-ai.onrender.com/api/v1/milk/profit/daily";

  const [form, setForm] = useState({
  totalMilkProduced: "",
  forWorkers: "",
  forCalf: "",
  inHouseUtility: "",
  wastage: "",
  actualProduced: "",
  fat: "",
  snf: "",
  expectedRate: "",
  expectedTotal: "",
  salesLitres: "",
  salesFat: "",
  salesSnf: "",
  orgRate: "",
  orgTotal: "",
});

const handleSave = async () => {
  try {
    const token = await AsyncStorage.getItem("access_token");

    if (!token) {
      Alert.alert("Error", "User not authenticated");
      return;
    }

    if (!recordType) {
      Alert.alert("Error", "Please select session");
      return;
    }

    if (!cattleType || !recordType) {
      Alert.alert("Error", "Please select cattle type and record type");
      return;
    }

    const payload = {
      date: date.toISOString().split("T")[0],

      session: recordType === "morning" ? "Morning" : "Evening",

      for_workers_litre: Number(form.forWorkers) || 0,
      for_calf_litre: Number(form.forCalf) || 0,
      for_utility_litre: Number(form.inHouseUtility) || 0,
      wastage_litre: Number(form.wastage) || 0,

      expected_fat_percent: Number(form.fat) || 0,
      expected_snf_percent: Number(form.snf) || 0,
      expected_price_per_litre: Number(form.expectedRate) || 0,

      total_sales_litre: Number(form.salesLitres) || 0,
      sales_fat_percent: Number(form.salesFat) || 0,
      sales_snf_percent: Number(form.salesSnf) || 0,

      org_price_per_litre: Number(form.orgRate) || 0,
    };

    const response = await fetch(
      "https://astrabytte-ai.onrender.com/api/v1/milk/profit/daily",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await response.json();

    if (response.ok) {
      Alert.alert("Success", "Record saved successfully");
    } else {
      Alert.alert("Error", data.message || "Something went wrong");
    }

  } catch (error) {
    console.log(error);
    Alert.alert("Error", "Server error");
  }
};

  const [cattleType, setCattleType] = React.useState("cow");
  const [recordType, setRecordType] = React.useState("");


  return (
    <View style={styles.container}>
      <ScreenWrapper>
        <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <MaterialCommunityIcons name="cow" size={26} color="#16a34a" />
            <View>
              <AppText style={styles.title}>Milk Profit Calculator</AppText>
              <AppText style={styles.subtitle}>
                Simple daily calculation of milk usage, sales & profit
              </AppText>
            </View>
          </View>

          
        </View>

           
       
<View style={styles.row}>

  <View style={styles.col}>
    <AppText style={styles.label}>Cattle Type *</AppText>

    <View style={styles.pickerWrapper}>
      <Picker
        selectedValue={cattleType}
        onValueChange={(value) => setCattleType(value)}
        style={styles.picker}
        dropdownIconColor="#000"
        mode="dropdown"
      >
        <Picker.Item label="Select Cattle Type" value="" />
        <Picker.Item label="Cow" value="cow" />
        <Picker.Item label="Buffalo" value="buffalo" />
      </Picker>
    </View>
  </View>

  <View style={[styles.col, { marginRight: 0 }]}>
    {/* Empty half column */}
  </View>

</View>

  


        {/* Basic Information */}
        <SectionTitle title="Basic Information" />

        
<View style={styles.row}>

  <View style={styles.col}>
    <AppText style={styles.label}>Date</AppText>

    <TouchableOpacity
      style={styles.dateInputWrapper}
      onPress={() => setShowPicker(true)}
    >
      <Text style={styles.dateText}>
        {date.toLocaleDateString("en-GB")}
      </Text>

      <MaterialCommunityIcons
        name="calendar-month"
        size={20}
        color="#16a34a"
      />
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

  <View style={[styles.col, { marginRight: 0 }]}>
    <AppText style={styles.label}>Record Type *</AppText>

    <View style={styles.pickerWrapper}>
      <Picker
        selectedValue={recordType}
        onValueChange={(value) => setRecordType(value)}
        style={styles.picker}
        dropdownIconColor="#000"
        mode="dropdown"
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
            <AppText style={styles.label}>Total Milk Produced</AppText>
            <TextInput
  style={styles.input}
  keyboardType="numeric"
  value={form.totalMilkProduced}
  onChangeText={(text) =>
    setForm({ ...form, totalMilkProduced: text })
  }
/>
          </View>
          <View style={styles.col}>
            <AppText style={styles.label}>For Workers</AppText>
            <TextInput
  style={styles.input}
  keyboardType="numeric"
  value={form.forWorkers}
  onChangeText={(text) =>
    setForm({ ...form, forWorkers: text })
  }
/>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.col}>
            <AppText style={styles.label}>For Calf</AppText>
            <TextInput
  style={styles.input}
  keyboardType="numeric"
  value={form.forCalf}
  onChangeText={(text) =>
    setForm({ ...form, forCalf: text })
  }
/>
          </View>
          <View style={styles.col}>
            <AppText style={styles.label}>In House Utility</AppText>
            <TextInput
  style={styles.input}
  keyboardType="numeric"
  value={form.inHouseUtility}
  onChangeText={(text) =>
    setForm({ ...form, inHouseUtility: text })
  }
/>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.col}>
            <AppText style={styles.label}>Wastage</AppText>
            <TextInput
  style={styles.input}
  keyboardType="numeric"
  value={form.wastage}
  onChangeText={(text) =>
    setForm({ ...form, wastage: text })
  }
/>
          </View>
          <View style={styles.col}>
            <AppText style={styles.label}>Actual Produced</AppText>
            <TextInput
  style={styles.input}
  keyboardType="numeric"
  value={form.actualProduced}
  onChangeText={(text) =>
    setForm({ ...form, actualProduced: text })
  }
/>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.col}>
            <AppText style={styles.label}>FAT %</AppText>
            <TextInput
  style={styles.input}
  keyboardType="numeric"
  value={form.fat}
  onChangeText={(text) =>
    setForm({ ...form, fat: text })
  }
/>
          </View>
          <View style={styles.col}>
            <AppText style={styles.label}>SNF %</AppText>
            <TextInput
  style={styles.input}
  keyboardType="numeric"
  value={form.snf}
  onChangeText={(text) =>
    setForm({ ...form, snf: text })
  }
/>
          </View>
        </View>

        <View style={styles.row}>
  <View style={styles.col}>
    <AppText style={styles.label}>Expected Rate per litre</AppText>
    <TextInput
  style={styles.input}
  keyboardType="numeric"
  value={form.expectedRate}
  onChangeText={(text) =>
    setForm({ ...form, expectedRate: text })
  }
/>
  </View>

  <View style={styles.col}>
    <AppText style={styles.label}>Expected Total</AppText>
    <TextInput
  style={styles.input}
  keyboardType="numeric"
  value={form.expectedTotal}
  onChangeText={(text) =>
    setForm({ ...form, expectedTotal: text })
  }
/>
  </View>
</View>
        {/* Milk Sales Details */}
        <SectionTitle title="Milk Sales Details" />

        <View style={styles.row}>
          <View style={styles.col}>
            <AppText style={styles.label}>Sales in Litres</AppText>
            <TextInput style={styles.input} />
          </View>
          <View style={styles.col}>
            <AppText style={styles.label}>Sales FAT %</AppText>
            <TextInput
  style={styles.input}
  keyboardType="numeric"
  value={form.salesFat}
  onChangeText={(text) =>
    setForm({ ...form, salesFat: text })
  }
/>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.col}>
            <AppText style={styles.label}>Sales SNF %</AppText>
            <TextInput
  style={styles.input}
  keyboardType="numeric"
  value={form.salesSnf}
  onChangeText={(text) =>
    setForm({ ...form, salesSnf: text })
  }
/>
          </View>
          <View style={styles.col}>
            <AppText style={styles.label}>Org Rate per Litre</AppText>
            <TextInput
  style={styles.input}
  keyboardType="numeric"
  value={form.orgRate}
  onChangeText={(text) =>
    setForm({ ...form, orgRate: text })
  }
/>
          </View>
        </View>

        <View style={styles.row}>
  <View style={styles.col}>
    <AppText style={styles.label}>Organization Total</AppText>
    <TextInput
  style={styles.input}
  keyboardType="numeric"
  value={form.orgTotal}
  onChangeText={(text) =>
    setForm({ ...form, orgTotal: text })
  }
/>
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

        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveText}>Save Record</Text>
        </TouchableOpacity>
      </ScrollView>
      </ScreenWrapper>
    </View>
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

  row: {
  flexDirection: "row",
  justifyContent: "space-between",
},

 col: {
  flex: 1,
  marginRight: 8,
},


  label: { fontSize: 12, marginBottom: 4 },
input: {
  borderWidth: 1,
  borderColor: "#22c55e",
  borderRadius: 6,
  paddingHorizontal: 10,
  height: 48,            // MATCH pickerWrapper height
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
  borderWidth: 1,
  borderColor: "#22c55e",
  borderRadius: 6,
  marginBottom: 12,
  height: 48,
  justifyContent: "center",
  backgroundColor: "#fff",
  overflow: "hidden",
},

picker: {
  width: "100%",
  color: "#000",
},

dateInputWrapper: {
  borderWidth: 1,
  borderColor: "#22c55e",
  borderRadius: 6,
  height: 48,
  paddingHorizontal: 12,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: 12,
  backgroundColor: "#fff",
  width: "100%",
},

dateText: {
  fontSize: 14,
  color: "#000",
},




  saveText: { color: "#fff", fontWeight: "600" },
});
