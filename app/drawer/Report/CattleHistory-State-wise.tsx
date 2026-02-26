import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

const CattleHistoryStateWiseReport = () => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [currentField, setCurrentField] = useState<"from" | "to">("from");

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowPicker(false);

    if (selectedDate) {
      const formatted = selectedDate
        .toLocaleDateString("en-GB")
        .replace(/\//g, "-");

      if (currentField === "from") setFromDate(formatted);
      else setToDate(formatted);
    }
  };

  const clearDates = () => {
    setFromDate("");
    setToDate("");
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.pageTitle}>Cattle wise state Report</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Date Range</Text>

        <View style={styles.dateRow}>
          {/* FROM DATE */}
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.dateInput}
              placeholder="dd-mm-yyyy"
              value={fromDate}
              onChangeText={setFromDate}
            />
            <TouchableOpacity
              style={styles.icon}
              onPress={() => {
                setCurrentField("from");
                setShowPicker(true);
              }}
            >
              <Ionicons name="calendar-outline" size={18} color="#666" />
            </TouchableOpacity>
          </View>

          <Text style={styles.toText}>to</Text>

          {/* TO DATE */}
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.dateInput}
              placeholder="dd-mm-yyyy"
              value={toDate}
              onChangeText={setToDate}
            />
            <TouchableOpacity
              style={styles.icon}
              onPress={() => {
                setCurrentField("to");
                setShowPicker(true);
              }}
            >
              <Ionicons name="calendar-outline" size={18} color="#666" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.clearBtn} onPress={clearDates}>
            <Text style={styles.clearText}>Clear</Text>
          </TouchableOpacity>

          <Text style={styles.rowsText}>Showing 0 rows</Text>
        </View>

        <TouchableOpacity style={styles.downloadBtn}>
          <Text style={styles.downloadText}>Download</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.showingText}>Showing 1 - 0</Text>

      <View style={styles.tableHeader}>
        <Text style={styles.col}>Cattle Id</Text>
        <Text style={styles.col}>Current State</Text>
        <Text style={styles.col}>Date Start</Text>
        <Text style={styles.col}>Date End</Text>
      </View>

      <View style={styles.emptyBox}>
        <Text style={styles.emptyText}>No data for selected range</Text>
      </View>

      <View style={styles.pagination}>
        <TouchableOpacity style={styles.pageBtnDisabled}>
          <Text style={styles.pageTextDisabled}>Previous</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.pageBtnDisabled}>
          <Text style={styles.pageTextDisabled}>Next</Text>
        </TouchableOpacity>
      </View>

      {/* DATE PICKER */}
      {showPicker && (
        <DateTimePicker
          value={new Date()}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}
    </ScrollView>
  );
};