import { useLanguage } from "@/constants/localization/useLanguage";
import { useTheme } from "@/theme/useTheme";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const BASE_URL = "https://astrabytte-ai.onrender.com";

export default function FeedStock() {
  const router = useRouter();
  const { t } = useLanguage();
  const { colors } = useTheme();

  const [feedData, setFeedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchFeedStock = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("access_token");

      const response = await fetch(`${BASE_URL}/api/v1/feed/stock`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const json = await response.json();

      const rawData = json.records || [];

      console.log("MY API RAW DATA:", JSON.stringify(rawData[0], null, 2));

      const formattedData = rawData.map((item, index) => ({
        id: index.toString(),
        name: item.feed_name || "Unknown",
        type: item.feed_type || "",
        available: item.total_qty || 0,
        purchase_id:
          item.batch_ids && item.batch_ids.length > 0 ? item.batch_ids[0] : "",
      }));

      setFeedData(formattedData);
    } catch (error) {
      console.error("Network Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchApi = async (text) => {
    setSearchQuery(text);
    if (text.trim() === "") {
      fetchFeedStock();
      return;
    }

    try {
      const token = await AsyncStorage.getItem("access_token");
      const response = await fetch(
        `${BASE_URL}/api/v1/feed/stock/search?feed_type=${text}&fuzzy=true`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const json = await response.json();
      const rawData = Array.isArray(json)
        ? json
        : json?.records || json?.data || [];

      const formattedData = rawData.map((item, index) => ({
        id: index.toString(),
        name: item.feed_name || "Unknown",
        type: item.feed_type || "",
        available: item.total_qty || 0,
        // IMPORTANT: Capture the ID here as well
        purchase_id: item.purchase_id || item.id || "",
      }));

      setFeedData(formattedData);
    } catch (error) {
      console.error("Search API Error:", error);
    }
  };

  useEffect(() => {
    fetchFeedStock();
  }, []);

  const renderFeedItem = ({ item }) => (
    <View style={[styles.card, { backgroundColor: colors.card }]}>
      <View style={styles.cardHeader}>
        <Text
          style={[
            styles.cardTitle,
            { color: colors.text, textTransform: "capitalize" },
          ]}
        >
          {item.name} ({item.type})
        </Text>
      </View>
      <Text style={[styles.cardSubtitle, { color: colors.subHeading }]}>
        {`${t.available}`} : {item.available} Kg
      </Text>

      <View style={styles.cardActions}>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: colors.background }]}
          onPress={() =>
            router.push({
              pathname: "./FeedDetails",
              params: { feed_name: item.name, feed_type: item.type },
            })
          }
        >
          <MaterialCommunityIcons
            name="tag-multiple"
            size={16}
            color={colors.subHeading}
          />
          <Text style={[styles.actionText, { color: colors.subHeading }]}>
            {`${t.view}`}
          </Text>
        </TouchableOpacity>

        {/* UPDATED CONSUME BUTTON */}
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: colors.background }]}
          onPress={() =>
            router.push({
              pathname: "./ConsumeFeed",
              params: {
                feed_name: item.name,
                feed_type: item.type,
                available: item.available.toString(), // Router params should be strings
                purchase_id: item.purchase_id, // Passing the vital ID to the consume screen
              },
            })
          }
        >
          <MaterialCommunityIcons
            name="flag-outline"
            size={16}
            color={colors.subHeading}
          />
          <Text style={[styles.actionText, { color: colors.subHeading }]}>
            {`${t.consume}`}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      {/* <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <MaterialCommunityIcons name="cow" size={28} color={colors.primary} />
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          {`${t.feedmanagement}`}
        </Text>
      </View> */}

      <View
        style={[
          styles.searchContainer,
          { backgroundColor: colors.card, borderColor: colors.border },
        ]}
      >
        <Feather
          name="search"
          size={20}
          color={colors.subHeading}
          style={styles.searchIcon}
        />
        <TextInput
          style={[styles.searchInput, { color: colors.text }]}
          placeholder={t.searchfeed}
          placeholderTextColor={colors.subHeading}
          value={searchQuery}
          onChangeText={handleSearchApi}
        />
      </View>

      {loading ? (
        <ActivityIndicator
          size="large"
          color={colors.primary}
          style={{ marginTop: 50 }}
        />
      ) : (
        <FlatList
          data={feedData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderFeedItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text
              style={{
                textAlign: "center",
                marginTop: 20,
                color: colors.subHeading,
              }}
            >
              No items found.
            </Text>
          }
        />
      )}

      <TouchableOpacity
        style={[styles.fab, { backgroundColor: colors.primary }]}
        onPress={() => router.push("/screens/FeedManagement/AddFeed")}
      >
        <Feather name="plus" size={28} color="#FFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 12 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
  },
  headerTitle: { fontSize: 22, fontWeight: "bold", marginLeft: 10 },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
    margin: 16,
    paddingHorizontal: 12,
    height: 45,
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, fontSize: 16 },
  listContent: { paddingHorizontal: 16, paddingBottom: 80 },
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTitle: { fontSize: 18, fontWeight: "bold" },
  cardSubtitle: { fontSize: 14, marginTop: 6 },
  cardActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 10,
    flex: 0.48,
  },
  actionText: { marginLeft: 6, fontSize: 14, fontWeight: "600" },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
  },
});
