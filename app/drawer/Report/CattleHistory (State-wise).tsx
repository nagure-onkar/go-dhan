import React, { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

const CattleHistoryStateWiseReport = () => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  return (
    <ScrollView style={styles.container}>
      {/* Page Title */}
      <Text style={styles.pageTitle}>
        Cattle wise state Report
      </Text>

      {/* Date Range Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Date Range</Text>

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

          <TouchableOpacity style={styles.clearBtn}>
            <Text style={styles.clearText}>Clear</Text>
          </TouchableOpacity>

          <Text style={styles.rowsText}>Showing 0 rows</Text>
        </View>

        <TouchableOpacity style={styles.downloadBtn}>
          <Text style={styles.downloadText}>Download</Text>
        </TouchableOpacity>
      </View>

      {/* Showing Info */}
      <Text style={styles.showingText}>Showing 1 - 0</Text>

      {/* Table Header */}
      <View style={styles.tableHeader}>
        <Text style={styles.col}>Cattle Id</Text>
        <Text style={styles.col}>Current State</Text>
        <Text style={styles.col}>Date Start</Text>
        <Text style={styles.col}>Date End</Text>
      </View>

      {/* Empty State */}
      <View style={styles.emptyBox}>
        <Text style={styles.emptyText}>
          No data for selected range
        </Text>
      </View>

      {/* Pagination */}
      <View style={styles.pagination}>
        <TouchableOpacity style={styles.pageBtnDisabled}>
          <Text style={styles.pageTextDisabled}>Previous</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.pageBtnDisabled}>
          <Text style={styles.pageTextDisabled}>Next</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

/* ---------- Styles ---------- */

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F2FFF7",
    padding: 12,
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 14,
    color: "#000",
  },
  section: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E0F2EA",
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  dateInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 8,
    width: 110,
    marginRight: 6,
  },
  toText: {
    marginHorizontal: 4,
  },
  clearBtn: {
    backgroundColor: "#f0f0f0",
    padding: 8,
    borderRadius: 6,
    marginLeft: 6,
  },
  clearText: {
    fontSize: 12,
    color: "#333",
  },
  rowsText: {
    marginLeft: 10,
    fontSize: 12,
    color: "#555",
  },
  downloadBtn: {
    alignSelf: "flex-end",
    backgroundColor: "#2E8B57",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginTop: 10,
  },
  downloadText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 13,
  },
  showingText: {
    marginBottom: 6,
    fontSize: 13,
    color: "#555",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#E8F8F1",
    padding: 12,
    borderRadius: 6,
  },
  col: {
    width: "25%",
    fontWeight: "700",
    fontSize: 13,
  },
  emptyBox: {
    backgroundColor: "#fff",
    paddingVertical: 20,
    alignItems: "center",
    borderRadius: 6,
    marginTop: 10,
  },
  emptyText: {
    color: "#777",
    fontSize: 14,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  pageBtnDisabled: {
    backgroundColor: "#f0f0f0",
    padding: 12,
    borderRadius: 6,
    width: "48%",
    alignItems: "center",
  },
  pageTextDisabled: {
    color: "#aaa",
    fontWeight: "600",
  },
});

export default CattleHistoryStateWiseReport;
