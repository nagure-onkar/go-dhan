import { Ionicons } from "@expo/vector-icons";
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

const AlertsReportScreen = () => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [alertType, setAlertType] = useState("All");

  const handleClear = () => {
    setFromDate("");
    setToDate("");
    setAlertType("All");
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>

        {/* Header */}
        <View style={styles.headerRow}>
          <Text style={styles.title}>Alerts Report</Text>

          <TouchableOpacity style={styles.downloadBtn}>
            <Ionicons name="download-outline" size={18} color="#fff" />
            <Text style={styles.downloadText}> Download</Text>
          </TouchableOpacity>
        </View>

        {/* Date Range */}
        <Text style={styles.label}>Date Range</Text>

        <View style={styles.dateRow}>
          <TextInput
            style={styles.dateInput}
            placeholder="dd-mm-yyyy"
            value={fromDate}
            onChangeText={setFromDate}
          />

          <Text style={styles.toText}>to</Text>

          <TextInput
            style={styles.dateInput}
            placeholder="dd-mm-yyyy"
            value={toDate}
            onChangeText={setToDate}
          />

          {/* Dropdown */}
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={alertType}
              onValueChange={(itemValue) => setAlertType(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="All" value="All" />
              <Picker.Item label="System" value="System" />
              <Picker.Item label="Feed" value="Feed" />
            </Picker>
          </View>

          <TouchableOpacity style={styles.clearBtn} onPress={handleClear}>
            <Text style={styles.clearText}>Clear</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.rowsText}>Showing 0 rows</Text>

        <Text style={styles.rangeText}>
          Showing <Text style={{ fontWeight: "700" }}>1 - 0</Text>
        </Text>


{/* Pagination */}
        <View style={styles.pagination}>
          <TouchableOpacity style={styles.pageBtnDisabled}>
            <Text style={styles.pageTextDisabled}>Previous</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.pageBtnDisabled}>
            <Text style={styles.pageTextDisabled}>Next</Text>
          </TouchableOpacity>
        </View>
        
        {/* Table Header */}
        <View style={styles.tableHeader}>
          <Text style={styles.headerCell}>Date</Text>
          <Text style={styles.headerCell}>Alert Type</Text>
          <Text style={styles.headerCell}>Message</Text>
        </View>

        {/* Empty State */}
        <View style={styles.emptyBox}>
          <Text style={styles.emptyText}>
            No data for selected range
          </Text>
        </View>

        

      </View>
    </ScrollView>
  );
};

export default AlertsReportScreen;

/* ---------- Styles ---------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E6F4EC",
    padding: 14,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E0F2EA",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
  },
  downloadBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1A8F5A",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  downloadText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 6,
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  dateInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    width: 110,
    marginRight: 6,
    marginBottom: 6,
  },
  toText: {
    marginHorizontal: 4,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    width: 120,
    marginRight: 6,
    marginBottom: 6,
  },
  picker: {
    height: 40,
  },
  clearBtn: {
    backgroundColor: "#f0f0f0",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 6,
  },
  clearText: {
    fontSize: 13,
  },
  rowsText: {
    fontSize: 12,
    color: "#555",
    marginTop: 4,
  },
  rangeText: {
    marginTop: 8,
    fontSize: 13,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#E8F8F1",
    padding: 10,
    borderRadius: 8,
    marginTop: 12,
  },
  headerCell: {
    flex: 1,
    fontWeight: "700",
    fontSize: 13,
  },
  emptyBox: {
    alignItems: "center",
    paddingVertical: 18,
  },
  emptyText: {
    color: "#777",
    fontSize: 13,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  pageBtnDisabled: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 8,
    width: "48%",
    alignItems: "center",
  },
  pageTextDisabled: {
    color: "#aaa",
    fontWeight: "600",
  },
});