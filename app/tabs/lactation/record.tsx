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
  { id: "2", status: "Calved & Lactating" },
  { id: "4", status: "Calved & Lactating" },
];

export default function RecordLactation() {
  const { workerId } = useLocalSearchParams();

  const [recordType, setRecordType] = useState<"Morning" | "Evening">("Morning");
  const [date, setDate] = useState("31-01-2026");

  const [milkData, setMilkData] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  /** Handle Morning / Evening change */
  const handleRecordTypeChange = (type: "Morning" | "Evening") => {
    setRecordType(type);
    setMilkData({});      // clear values
    setIsSubmitted(false);
    setEditId(null);
  };

  const renderItem = ({ item }: any) => {
    const isEditing = editId === item.id;

    return (
      <View style={styles.row}>
        <View>
          <Text style={styles.cattleId}>{item.id}</Text>
          <Text style={styles.cattleType}>cattle</Text>
        </View>

        {(!isSubmitted || isEditing) ? (
          <TextInput
            placeholder="Milk (L)"
            style={styles.input}
            keyboardType="decimal-pad"
            value={milkData[item.id] || ""}
            onChangeText={(value) =>
              setMilkData({ ...milkData, [item.id]: value })
            }
          />
        ) : (
          <Text style={styles.milkText}>{milkData[item.id]} L</Text>
        )}

        {isSubmitted && (
          <TouchableOpacity
            style={styles.editBtn}
            onPress={() => setEditId(item.id)}
          >
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
        )}

        <View style={styles.badge}>
          <Text style={styles.badgeText}>{item.status}</Text>
        </View>
      </View>
    );
  };

  const isEditingAny = editId !== null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Record Lactation</Text>

      {/* Record Type */}
      <Text style={styles.label}>Record Type *</Text>
      <View style={styles.typeRow}>
        {["Morning", "Evening"].map((type) => (
          <TouchableOpacity
            key={type}
            style={[
              styles.typeBtn,
              recordType === type && styles.typeActive,
            ]}
            onPress={() => handleRecordTypeChange(type as any)}
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

      {/* Date */}
      <Text style={styles.label}>Date</Text>
      <TextInput
        style={styles.dateInput}
        value={date}
        onChangeText={setDate}
      />

      {/* Animals */}
      <Text style={styles.label}>Animals</Text>
      <FlatList
        data={cattleList}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />

      {/* Submit / Update */}
      {!isSubmitted && (
        <TouchableOpacity
          style={styles.submit}
          onPress={() => setIsSubmitted(true)}
        >
          <Text style={styles.submitText}>Save Record</Text>
        </TouchableOpacity>
      )}

      {isSubmitted && isEditingAny && (
        <TouchableOpacity
          style={styles.submit}
          onPress={() => setEditId(null)}
        >
          <Text style={styles.submitText}>Update Record</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#F4FFF8" },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 10 },

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
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#C9D6D0",
  },

  row: {
    backgroundColor: "#ECFFF4",
    padding: 14,
    borderRadius: 12,
    marginVertical: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  cattleId: { fontWeight: "700", fontSize: 16 },
  cattleType: { color: "#4A8F6A", fontSize: 12 },

  input: {
  width: 120,
  height: 42,
  borderRadius: 12,
  borderWidth: 1,
  borderColor: "#C9D6D0",
  backgroundColor: "#fff",
  textAlign: "center",      // 👈 THIS IS THE KEY
  fontSize: 16,
  fontWeight: "600",
},


  milkText: { fontWeight: "600" },

  editBtn: {
    borderWidth: 1,
    borderColor: "#4D8DFF",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  editText: { color: "#4D8DFF", fontWeight: "600" },

  badge: {
    backgroundColor: "#D9FFE6",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  badgeText: { color: "#0A8F47", fontWeight: "600", fontSize: 12 },

  submit: {
    backgroundColor: "#0A8F47",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },
  submitText: { color: "#fff", fontWeight: "700" },
});
