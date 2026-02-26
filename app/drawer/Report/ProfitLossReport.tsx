import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ProfitLossReportScreen = () => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const handleClear = () => {
    setFromDate("");
    setToDate("");
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        
        {/* Header */}
        <View style={styles.headerRow}>
          <Text style={styles.title}>Profit / Loss Report</Text>

          <TouchableOpacity style={styles.downloadBtn}>
            <Ionicons name="download-outline" size={18} color="#fff" />
            <Text style={styles.downloadText}> Download</Text>
          </TouchableOpacity>
        </View>

        {/* Date Range */}
        <Text style={styles.label}>Date Range</Text>

        <View style={styles.dateRow}>
          <TextInput
            placeholder="dd-mm-yyyy"
            value={fromDate}
            onChangeText={setFromDate}
            style={styles.dateInput}
          />

          <Text style={styles.toText}>to</Text>

          <TextInput
            placeholder="dd-mm-yyyy"
            value={toDate}
            onChangeText={setToDate}
            style={styles.dateInput}
          />

          <TouchableOpacity style={styles.clearBtn} onPress={handleClear}>
            <Text style={styles.clearText}>Clear</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.showingText}>Showing 0 rows</Text>

        {/* Showing Info */}
        <Text style={styles.rangeText}>Showing 1 – 0</Text>

        {/* Pagination */}
        <View style={styles.paginationRow}>
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
          <Text style={[styles.headerCell, { textAlign: "right" }]}>
            Net Profit (₹)
          </Text>
        </View>

        {/* Empty State */}
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            No data for selected range
          </Text>
        </View>

        

      </View>
    </ScrollView>
  );
};

export default ProfitLossReportScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e6f0ec",
  },
  card: {
    backgroundColor: "#fff",
    margin: 15,
    borderRadius: 12,
    padding: 15,
    elevation: 3,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  downloadBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1a8f5a",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  downloadText: {
    color: "#fff",
    fontSize: 14,
  },
  label: {
    marginTop: 15,
    fontSize: 14,
    fontWeight: "600",
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    flexWrap: "wrap",
  },
  dateInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginRight: 8,
    width: 110,
  },
  toText: {
    marginRight: 8,
  },
  clearBtn: {
    backgroundColor: "#eee",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  clearText: {
    fontSize: 12,
  },
  showingText: {
    marginTop: 10,
    fontSize: 12,
    color: "gray",
  },
  rangeText: {
    marginTop: 10,
    fontSize: 13,
  },
  tableHeader: {
    flexDirection: "row",
    marginTop: 15,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    paddingBottom: 8,
  },
  headerCell: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
  },
  emptyContainer: {
    paddingVertical: 20,
  },
  emptyText: {
    textAlign: "left",
    color: "#888",
  },
  paginationRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 15,
  },
  pageBtnDisabled: {
    backgroundColor: "#eee",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginLeft: 8,
  },
  pageTextDisabled: {
    color: "#aaa",
  },
});