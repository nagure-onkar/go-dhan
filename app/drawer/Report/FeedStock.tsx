import { useLanguage } from "@/constants/localization/useLanguage";
import { useTheme } from "@/theme/useTheme";
import React, { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

const FeedReportForm = () => {
  const { colors } = useTheme();
  const { t } = useLanguage();

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <Text style={styles.pageTitle}>Feed Report</Text>

      {/* Date Range Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Date Range</Text>

        <Text style={styles.label}>From Date *</Text>
        <TextInput
          style={styles.input}
          placeholder="dd-mm-yyyy"
          value={fromDate}
          onChangeText={setFromDate}
        />

        <Text style={styles.label}>To Date *</Text>
        <TextInput
          style={styles.input}
          placeholder="dd-mm-yyyy"
          value={toDate}
          onChangeText={setToDate}
        />

        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.clearBtn}>
            <Text style={styles.clearText}>Clear</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.downloadBtn}>
            <Text style={styles.downloadText}>Download</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Report Table Header */}
      <View style={styles.tableHeader}>
        <Text style={styles.colSmall}>Date</Text>
        <Text style={styles.col}>Feed Name</Text>
        <Text style={styles.col}>Feed Type</Text>
        <Text style={styles.col}>Transaction</Text>
        <Text style={styles.col}>In (Kg)</Text>
        <Text style={styles.col}>Out (Kg)</Text>
        <Text style={styles.col}>Wastage</Text>
      </View>

      {/* Empty State */}
      <View style={styles.emptyBox}>
        <Text style={styles.emptyText}>
          No data for selected range
        </Text>
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
    color: "#2E8B57",
    marginBottom: 14,
  },
  section: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
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
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  clearBtn: {
    backgroundColor: "#ddd",
    padding: 12,
    borderRadius: 6,
    width: "48%",
    alignItems: "center",
  },
  clearText: {
    fontWeight: "600",
    color: "#333",
  },
  downloadBtn: {
    backgroundColor: "#2E8B57",
    padding: 12,
    borderRadius: 6,
    width: "48%",
    alignItems: "center",
  },
  downloadText: {
    fontWeight: "700",
    color: "#fff",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#E8F8F1",
    paddingVertical: 10,
    paddingHorizontal: 6,
    borderRadius: 6,
  },
  colSmall: {
    width: 70,
    fontSize: 12,
    fontWeight: "700",
  },
  col: {
    width: 90,
    fontSize: 12,
    fontWeight: "700",
  },
  emptyBox: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 6,
    marginTop: 10,
    alignItems: "center",
  },
  emptyText: {
    color: "#777",
    fontSize: 14,
  },
});

export default FeedReportForm;
