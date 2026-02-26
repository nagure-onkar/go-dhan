import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const LactationReports = () => {
  return (
    <ScrollView style={styles.container}>
      
      {/* Page Title */}
      <Text style={styles.pageTitle}>Lactation Reports</Text>

      {/* Report 1 */}
      <ReportCard title="Report 1 — Per Cattle Daily / Range">
        <DateRange rowsText="Showing 0 rows" />
        <TableHeader
          headers={[
            "Cattle ID",
            "Morning (L)",
            "Evening (L)",
            "Total (L)",
          ]}
        />
      </ReportCard>

      {/* Report 2 */}
      <ReportCard title="Report 2 — Date-wise Totals">
        <DateRange rowsText="Showing 0 data rows" />
        <TableHeader
          headers={[
            "Date",
            "Morning Total (L)",
            "Evening Total (L)",
            "Total (L)",
          ]}
        />
      </ReportCard>

      {/* Report 3 */}
      <ReportCard title="Report 3 — Cattle-wise Averages">
        <DateRange rowsText="Showing 0 cattle" />
        <TableHeader
          headers={[
            "Cattle ID",
            "Avg Morning (L)",
            "Avg Evening (L)",
            "Avg Total (L)",
          ]}
        />
      </ReportCard>

      {/* Report 4 */}
      <ReportCard title="Report 4 — Worker Wise Milk Collection Range">
        <DateRange rowsText="Showing 0 rows" />
        <TableHeader
          headers={[
            "Worker Name",
            "Total Morning (L)",
            "Avg Morning (L)",
            "Total Evening (L)",
            "Avg Evening (L)",
          ]}
        />
      </ReportCard>

    </ScrollView>
  );
};

/* ---------- Reusable Components ---------- */

const ReportCard = ({ title, children }: any) => (
  <View style={styles.card}>
    <View style={styles.headerRow}>
      <Text style={styles.cardTitle}>{title}</Text>

      <TouchableOpacity style={styles.downloadBtn}>
        <Ionicons name="download-outline" size={18} color="#fff" />
        <Text style={styles.downloadText}> Download</Text>
      </TouchableOpacity>
    </View>

    {children}

    <Text style={styles.showingText}>
      Showing <Text style={{ fontWeight: "700" }}>1 - 0</Text>
    </Text>

    <View style={styles.pagination}>
      <TouchableOpacity style={styles.pageBtnDisabled}>
        <Text style={styles.pageTextDisabled}>Previous</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.pageBtnDisabled}>
        <Text style={styles.pageTextDisabled}>Next</Text>
      </TouchableOpacity>
    </View>

    <View style={styles.emptyBox}>
      <Text style={styles.emptyText}>No data for selected range</Text>
    </View>
  </View>
);

const DateRange = ({ rowsText }: any) => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const handleClear = () => {
    setFromDate("");
    setToDate("");
  };

  return (
    <>
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

        <TouchableOpacity style={styles.clearBtn} onPress={handleClear}>
          <Text style={styles.clearText}>Clear</Text>
        </TouchableOpacity>

        <Text style={styles.rowsText}>{rowsText}</Text>
      </View>
    </>
  );
};

const TableHeader = ({ headers }: any) => (
  <View style={styles.tableHeader}>
    {headers.map((h: string, i: number) => (
      <Text key={i} style={styles.tableCol}>
        {h}
      </Text>
    ))}
  </View>
);

/* ---------- Styles ---------- */

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F2FFF7",
    padding: 14,
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 16,
    color: "#1a1a1a",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#E0F2EA",
    elevation: 2,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "700",
    flex: 1,
    marginRight: 10,
  },
  downloadBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2E8B57",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  downloadText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 13,
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
    marginBottom: 8,
  },
  dateInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 8,
    width: 110,
    marginRight: 6,
    marginBottom: 6,
  },
  toText: {
    marginHorizontal: 4,
  },
  clearBtn: {
    backgroundColor: "#f0f0f0",
    padding: 8,
    borderRadius: 6,
    marginLeft: 6,
    marginBottom: 6,
  },
  clearText: {
    fontSize: 12,
  },
  rowsText: {
    marginLeft: 10,
    fontSize: 12,
    color: "#555",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#E8F8F1",
    padding: 10,
    borderRadius: 6,
    marginTop: 6,
    flexWrap: "wrap",
  },
  tableCol: {
    marginRight: 18,
    fontWeight: "700",
    fontSize: 12,
  },
  showingText: {
    marginTop: 10,
    fontSize: 12,
    color: "#555",
  },
  emptyBox: {
    alignItems: "center",
    paddingVertical: 14,
  },
  emptyText: {
    color: "#777",
    fontSize: 13,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
  },
  pageBtnDisabled: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 6,
    width: "48%",
    alignItems: "center",
  },
  pageTextDisabled: {
    color: "#aaa",
    fontWeight: "600",
  },
});

export default LactationReports;