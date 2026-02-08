import { useRouter } from "expo-router";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const workers = [
  {
    id: "wp-001",
    name: "Shamrao Vasudev Patil",
    gender: "Male",
    mobile: "9926658020",
    cattle: 6,
    joined: "Jan 1, 2026",
    address: "Hanuman Nagar, Gijawane",
  },
  {
    id: "wp-002",
    name: "Ravi Arjun Khot",
    gender: "Male",
    mobile: "9926658121",
    cattle: 4,
    joined: "Jan 2, 2026",
    address: "Hanuman Nagar, Gijawane",
  },
];

export default function LactationDashboard() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lactation</Text>

      <FlatList
        data={workers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text>ID: {item.id}</Text>
            <Text>Assigned Cattle: {item.cattle}</Text>
            <Text>Mobile: {item.mobile}</Text>
            <Text>Joined: {item.joined}</Text>
            <Text>{item.address}</Text>

            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                router.push({
                  pathname: "/lactation/record",
                  params: { workerId: item.id, name: item.name },
                })
              }
            >
              <Text style={styles.buttonText}>Record Milking</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#F4FFF8" },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 10 },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 14,
    elevation: 2,
  },
  name: { fontSize: 16, fontWeight: "600" },
  button: {
    marginTop: 10,
    backgroundColor: "#E8FFF1",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: "#0A8F47", fontWeight: "600" },
});
