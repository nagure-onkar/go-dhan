import { useLanguage } from "@/constants/localization/useLanguage";
import { useTheme } from "@/theme/useTheme";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const BASE_URL = "https://astrabytte-ai.onrender.com";

export default function FeedDetails() {
  const router = useRouter();
  const { t } = useLanguage();
  const { colors } = useTheme();

  // 1. Capture the parameters passed from the FeedStock screen
  const { feed_name, feed_type } = useLocalSearchParams();

  const [feedData, setFeedData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeedDetails();
  }, [feed_name, feed_type]);

  const fetchFeedDetails = async () => {
    try {
      const token = await AsyncStorage.getItem("access_token");
      const response = await fetch(`${BASE_URL}/api/v1/feed/stock`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();

      // 2. Filter the 'records' array to find the specific item clicked
      if (data && data.records) {
        const selectedFeed = data.records.find(
          (item) =>
            item.feed_name.toLowerCase() === feed_name?.toLowerCase() &&
            item.feed_type.toLowerCase() === feed_type?.toLowerCase(),
        );
        setFeedData(selectedFeed);
      }
    } catch (error) {
      console.error("Error fetching feed data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <ActivityIndicator
        size="large"
        style={{ flex: 1 }}
        color={colors.primary}
      />
    );

  // 3. Handle Case where data isn't found
  if (!feedData)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: colors.text }}>No Data Found</Text>
        <TouchableOpacity
          onPress={() => router.back()}
          style={{ marginTop: 10 }}
        >
          <Text style={{ color: colors.primary }}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => router.replace("./FeedStock")}>
          <Feather name="chevron-left" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          {feedData.feed_name}
        </Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.mainInfoContainer}>
          <Text
            style={[
              styles.mainTitle,
              { color: colors.text, textTransform: "capitalize" },
            ]}
          >
            {feedData.feed_name} ({feedData.feed_type})
          </Text>
          <Text style={[styles.mainSubtitle, { color: colors.subHeading }]}>
            {t.availablestock} : {feedData.total_qty} Kg
          </Text>
        </View>

        <View style={[styles.divider, { backgroundColor: colors.border }]} />

        <View style={styles.detailsContainer}>
          <Text style={[styles.detailRow, { color: colors.text }]}>
            <Text style={{ fontWeight: "600" }}>{t.totalcost} : </Text>₹
            {feedData.stock_value}
          </Text>
          <Text style={[styles.detailRow, { color: colors.text }]}>
            <Text style={{ fontWeight: "600" }}>{t.avgcost_kg} : </Text>₹
            {feedData.weighted_avg_cost}
          </Text>
          <Text style={[styles.detailRow, { color: colors.text }]}>
            <Text style={{ fontWeight: "600" }}>{t.reorderlevel} : </Text>
            {feedData.reorder_level_kg} Kg
          </Text>
          {/* <Text style={[styles.detailRow, { color: colors.text }]}>
            <Text style={{ fontWeight: "600" }}>Recorder Level : </Text>
            {feedData.reorder_level_kg} Days
          </Text> */}
        </View>

        <TouchableOpacity
          style={styles.consumeButton}
          onPress={() => router.push("./ConsumeFeed")}
        >
          <MaterialCommunityIcons
            name="flag-outline"
            size={18}
            color={colors.subHeading}
          />
          <Text
            style={[styles.consumeButtonText, { color: colors.subHeading }]}
          >
            {t.consume}
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom Pill */}
      <View
        style={[
          styles.bottomContainer,
          { borderTopColor: colors.border, backgroundColor: colors.background },
        ]}
      >
        <TouchableOpacity
          style={styles.bottomPill}
          onPress={() => router.push("./FeedStock")}
        >
          <Feather name="x-circle" size={16} color={colors.subHeading} />
          <Text
            style={{
              marginLeft: 6,
              fontWeight: "600",
              color: colors.subHeading,
            }}
          >
            {t.feed}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 12 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  scrollContent: { padding: 20, paddingBottom: 100 },
  mainInfoContainer: { marginBottom: 16 },
  mainTitle: { fontSize: 22, fontWeight: "bold", marginBottom: 8 },
  mainSubtitle: { fontSize: 15 },
  divider: { height: 1, marginVertical: 16 },
  detailsContainer: { marginBottom: 8 },
  detailRow: { fontSize: 15, marginBottom: 12, lineHeight: 22 },
  consumeButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 14,
    marginTop: 8,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  consumeButtonText: { marginLeft: 8, fontSize: 16, fontWeight: "600" },
  bottomContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    paddingVertical: 16,
    alignItems: "center",
    borderTopWidth: 1,
  },
  bottomPill: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 40,
  },
});
