import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const cattleList = [
  { id: "B-008", status: "Inseminated & Lactating" },
  { id: "B-09", status: "On Heat & Lactating" },
  { id: "B-12", status: "Inseminated & Lactating" },
  { id: "B-13", status: "Inseminated & Lactating" },
];

export default function RecordLactation() {
  const { workerId, name } = useLocalSearchParams();

  const [recordType, setRecordType] = useState("Morning");
  const [date, setDate] = useState("27-01-2026");
  const [milkData, setMilkData] = useState({});

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <Text style={styles.title}>Record Lactation</Text>
      <Text style={styles.sub}>Worker ID: {workerId}</Text>
      <Text style={styles.sub}>Name: {name}</Text>

      {/* RECORD TYPE */}
      <Text style={styles.label}>Record Type *</Text>
      <View style={styles.typeRow}>
        {["Morning", "Evening"].map((type) => (
          <TouchableOpacity
            key={type}
            style={[
              styles.typeBtn,
              recordType === type && styles.typeActive,
            ]}
            onPress={() => setRecordType(type)}
          >
            <Text
              style={[
                styles.typeText,
                recordType === type && styles.typeTextActive,
              ]}
            >
              {type}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* DATE INPUT */}
      <Text style={styles.label}>Date</Text>
      <TextInput
        style={styles.dateInput}
        value={date}
        placeholder="DD-MM-YYYY"
        onChangeText={setDate}
      />

      {/* ANIMALS */}
      <Text style={styles.label}>Animals</Text>

      <FlatList
        data={cattleList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View>
              <Text style={styles.cattleId}>{item.id}</Text>
              <Text style={styles.status}>{item.status}</Text>
            </View>

            <TextInput
              placeholder="Milk (L)"
              keyboardType="decimal-pad"
              style={styles.input}
              onChangeText={(value) =>
                setMilkData({ ...milkData, [item.id]: value })
              }
            />
          </View>
        )}
      />

      {/* SUBMIT */}
      <TouchableOpacity style={styles.submit}>
        <Text style={styles.submitText}>Save Record</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#F4FFF8" },
  title: { fontSize: 22, fontWeight: "700" },
  sub: { color: "#555", marginBottom: 4 },

  label: { marginTop: 14, fontWeight: "600" },

  typeRow: { flexDirection: "row", marginTop: 8 },
  typeBtn: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#BFEBD4",
    marginRight: 8,
    alignItems: "center",
  },
  typeActive: { backgroundColor: "#0A8F47" },
  typeText: { color: "#0A8F47", fontWeight: "600" },
  typeTextActive: { color: "#fff" },

  dateInput: {
    marginTop: 8,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#BFEBD4",
  },

  row: {
    backgroundColor: "#ECFFF4",
    padding: 14,
    borderRadius: 12,
    marginVertical: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cattleId: { fontWeight: "600", fontSize: 16 },
  status: { color: "#0A8F47", fontSize: 12 },

  input: {
    borderWidth: 1,
    borderColor: "#BFEBD4",
    padding: 8,
    width: 90,
    borderRadius: 8,
    backgroundColor: "#fff",
    textAlign: "center",
  },

  submit: {
    backgroundColor: "#0A8F47",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },
  submitText: { color: "#fff", fontWeight: "700" },
});
