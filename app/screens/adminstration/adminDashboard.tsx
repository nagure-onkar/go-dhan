import { ENDPOINTS } from "@/api/endpoints";
import { GET } from "@/api/methods";
import AppText from "@/components/common/AppText";
import { useTheme } from "@/theme/useTheme";
import { Feather } from "@expo/vector-icons";
import { AddVetScreen, AddWorkerScreen } from "app/navigation/AppNavigator";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  BackHandler,
  FlatList,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

export default function Administration() {
  const { colors } = useTheme();
  const router = useRouter();

  const [data, setData] = useState<any>(null);
  const [selectedTab, setSelectedTab] = useState<"vets" | "workers">("vets");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [showActions, setShowActions] = useState(false);

  // 🔥 Fetch API
  const fetchRegistry = async () => {
    try {
      const response = await GET<any>(
        ENDPOINTS.administration.combinedRegistry,
        { page: 1, limit: 6 },
      );

      setData(response);
    } catch (error) {
      console.log("Registry Error:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchRegistry();
  }, []);

  useEffect(() => {
    const backAction = () => {
      router.replace("/tabs");
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const listData = selectedTab === "vets" ? data?.vets : data?.workers;

  const renderInfoRow = (icon: any, text: string) => (
    <View style={styles.infoRow}>
      <Feather name={icon} size={14} color={colors.text} />
      <AppText style={styles.sub}>{text}</AppText>
    </View>
  );

  const renderCard = ({ item }: any) => (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
        },
      ]}
    >
      <AppText style={styles.name}>{item.full_name}</AppText>

      {renderInfoRow("phone", item.mobileNumber || item.mobile_number)}

      {renderInfoRow("map-pin", item.address)}

      {renderInfoRow("calendar", item.dateOfJoining || item.date_of_joining)}

      {renderInfoRow("archive", `Cattle: ${item.cattle_count}`)}

      {selectedTab === "workers" &&
        renderInfoRow("dollar-sign", `Salary: ₹${item.salary || 0}`)}

      <View
        style={[
          styles.roleBadge,
          {
            backgroundColor: selectedTab === "vets" ? "#2563eb20" : "#16a34a20",
          },
        ]}
      >
        <AppText
          style={{
            color: selectedTab === "vets" ? "#2563eb" : "#16a34a",
            fontSize: 12,
          }}
        >
          {selectedTab === "vets" ? "Vet" : "Worker"}
        </AppText>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: colors.background, justifyContent: "center" },
        ]}
      >
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.replace("/")}>
          <Feather name="arrow-left" size={22} color={colors.text} />
        </TouchableOpacity>

        <AppText style={styles.headerTitle}>Administration</AppText>

        <View style={{ width: 22 }} />
      </View>

      {/* Summary Cards */}
      <View style={styles.summaryRow}>
        <View style={[styles.summaryCard, { backgroundColor: "#2563eb15" }]}>
          <AppText style={styles.summaryNumber}>{data?.total_vets}</AppText>
          <AppText style={styles.summaryLabel}>Vets</AppText>
        </View>

        <View style={[styles.summaryCard, { backgroundColor: "#16a34a15" }]}>
          <AppText style={styles.summaryNumber}>{data?.total_workers}</AppText>
          <AppText style={styles.summaryLabel}>Workers</AppText>
        </View>
      </View>

      {/* Tabs */}
      <View style={[styles.tabWrapper, { backgroundColor: colors.card }]}>
        {["vets", "workers"].map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setSelectedTab(tab as any)}
            style={[
              styles.tab,
              selectedTab === tab && {
                backgroundColor: colors.primary,
              },
            ]}
          >
            <AppText
              style={{
                color: selectedTab === tab ? "#fff" : colors.text,
              }}
            >
              {tab === "vets" ? "Vets" : "Workers"}
            </AppText>
          </TouchableOpacity>
        ))}
      </View>

      {/* List */}
      <FlatList
        data={listData}
        keyExtractor={(item) => item.id}
        renderItem={renderCard}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              fetchRegistry();
            }}
            colors={[colors.primary]}
          />
        }
        contentContainerStyle={{ paddingBottom: 140 }}
        showsVerticalScrollIndicator={false}
      />

      {/* Add Options */}
      {showActions && (
        <View style={styles.actionContainer}>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: "#2563eb" }]}
            onPress={() => {
              setShowActions(false);
              router.push(AddVetScreen);
            }}
          >
            <AppText style={{ color: "#fff" }}>Add Vet</AppText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: "#16a34a" }]}
            onPress={() => {
              setShowActions(false);
              router.push(AddWorkerScreen);
            }}
          >
            <AppText style={{ color: "#fff" }}>Add Worker</AppText>
          </TouchableOpacity>
        </View>
      )}

      {/* FAB */}
      <TouchableOpacity
        style={[styles.fab, { backgroundColor: colors.primary }]}
        onPress={() => setShowActions(!showActions)}
      >
        <Feather name={showActions ? "x" : "plus"} size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  headerTitle: { fontSize: 20, fontWeight: "700" },

  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  summaryCard: {
    flex: 1,
    padding: 18,
    borderRadius: 16,
    alignItems: "center",
    marginHorizontal: 6,
  },
  summaryNumber: { fontSize: 22, fontWeight: "700" },
  summaryLabel: { marginTop: 4, opacity: 0.7 },

  tabWrapper: {
    flexDirection: "row",
    borderRadius: 14,
    padding: 5,
    marginBottom: 15,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },

  card: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 14,
  },
  name: { fontSize: 16, fontWeight: "600", marginBottom: 6 },
  sub: { marginLeft: 6, fontSize: 13, opacity: 0.7 },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },

  roleBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },

  fab: {
    position: "absolute",
    bottom: 25,
    right: 25,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
  },

  actionContainer: {
    position: "absolute",
    bottom: 100,
    right: 25,
    alignItems: "flex-end",
  },

  actionButton: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 25,
    marginBottom: 10,
  },
});
