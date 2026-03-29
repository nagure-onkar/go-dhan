import AppText from "@/components/common/AppText";
import { useLanguage } from "@/constants/localization/useLanguage";
import { useTheme } from "@/theme/useTheme";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import Success from "../../../src/components/common/success"; // Ensure this path is correct for your project

import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const BASE_URL = "https://astrabytte-ai.onrender.com";

export default function ConsumeFeed() {
  const router = useRouter();
  const { t } = useLanguage();
  const { colors } = useTheme();
  const req = <AppText style={{ color: "red" }}> *</AppText>;

  // 1. Capture the dynamic params passed from FeedStock
  const {
    feed_name = "Unknown Feed",
    feed_type = "Green",
    available = "0",
    purchase_id = "",
  } = useLocalSearchParams();

  // 2. Form State
  const [quantityUsed, setQuantityUsed] = useState("");
  const [wastageQuantity, setWastageQuantity] = useState("0");
  const [remarks, setRemarks] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // 3. Handle the consumption submission
  const handleConsume = async () => {
    // Validation
    if (
      !quantityUsed ||
      isNaN(Number(quantityUsed)) ||
      Number(quantityUsed) <= 0
    ) {
      Alert.alert(
        "Invalid Input",
        "Please enter a valid consumption quantity.",
      );
      return;
    }

    if (Number(quantityUsed) > Number(available)) {
      Alert.alert("Warning", "Consumption quantity exceeds available stock!");
      return;
    }

    if (!purchase_id) {
      Alert.alert(
        "Missing Data",
        "No purchase ID found for this stock. Please go back and try again.",
      );
      return;
    }

    setIsLoading(true);

    try {
      const token = await AsyncStorage.getItem("access_token");

      // Payload strictly matches the backend requirements
      const payload = {
        feed_name: String(feed_name),
        feed_type: String(feed_type),
        quantity_used_kg: Number(quantityUsed),
        wastage_quantity_kg: Number(wastageQuantity) || 0,
        purchase_id: String(purchase_id),
        usage_date: new Date().toISOString().split("T")[0], // Formats to "YYYY-MM-DD"
        remarks: remarks || "",
      };

      const response = await fetch(`${BASE_URL}/api/v1/feed/consume`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSaved(true);
        setTimeout(() => {
          router.replace("./FeedStock"); // Sends user back to the refreshed list
          setIsSaved(false);
        }, 2000);
      } else {
        // Extract error message based on Pydantic/FastAPI error structures
        const errorMsg = data.detail
          ? typeof data.detail === "string"
            ? data.detail
            : data.detail[0]?.msg
          : data.message || "Failed to consume feed.";

        Alert.alert("Submission Error", errorMsg);
      }
    } catch (error) {
      console.error("Consume API Error:", error);
      Alert.alert("Network Error", "Unable to connect to the server.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSaved) {
    return (
      <>
        <Success style={{ flex: 1, backgroundColor: colors.background }} />
        <AppText
          style={{
            textAlign: "center",
            fontSize: 24,
            fontWeight: "bold",
            marginBottom: 170,
            backgroundColor: colors.background,
          }}
        >
          Consumption Recorded Successfully
        </AppText>
      </>
    );
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Feather name="chevron-left" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          {t.consumefeed}
        </Text>
        <View style={styles.placeholder} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Dynamic Feed Information Card */}
          <View style={styles.infoCard}>
            <Text
              style={[
                styles.infoTitle,
                { color: colors.text, textTransform: "capitalize" },
              ]}
            >
              {feed_name} {feed_type ? `(${feed_type})` : ""}
            </Text>
            <Text style={[styles.infoSubtitle, { color: colors.subHeading }]}>
              {t.available} : {available} Kg
            </Text>
          </View>

          <View style={[styles.divider, { backgroundColor: colors.border }]} />

          {/* Form Fields */}
          <View style={styles.formGroup}>
            <Text style={[styles.label, { color: colors.text }]}>
              {t.quantity_kg}
              {req}
            </Text>
            <TextInput
              style={[
                styles.textInput,
                {
                  borderColor: colors.border,
                  color: colors.text,
                  backgroundColor: colors.card,
                },
              ]}
              placeholder={t.enterquantityused}
              placeholderTextColor={colors.subHeading}
              keyboardType="numeric"
              value={quantityUsed}
              onChangeText={setQuantityUsed}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={[styles.label, { color: colors.text }]}>
              {t.wastagequantity}
              {req}
            </Text>
            <TextInput
              style={[
                styles.textInput,
                {
                  borderColor: colors.border,
                  color: colors.text,
                  backgroundColor: colors.card,
                },
              ]}
              placeholder="0"
              placeholderTextColor={colors.subHeading}
              keyboardType="numeric"
              value={wastageQuantity}
              onChangeText={setWastageQuantity}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={[styles.label, { color: colors.text }]}>
              {t.usagedate}
              {req}
            </Text>
            <View
              style={[
                styles.dateInput,
                { borderColor: colors.border, backgroundColor: colors.card },
              ]}
            >
              <Text style={[styles.dateText, { color: colors.text }]}>
                {new Date().toISOString().split("T")[0]}
              </Text>
              <Feather name="calendar" size={20} color={colors.subHeading} />
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={[styles.label, { color: colors.text }]}>
              {t.remarks}
            </Text>
            <TextInput
              style={[
                styles.textInput,
                styles.textArea,
                {
                  borderColor: colors.border,
                  color: colors.text,
                  backgroundColor: colors.card,
                },
              ]}
              placeholder={t.enterremarksoptional}
              placeholderTextColor={colors.subHeading}
              multiline={true}
              numberOfLines={4}
              textAlignVertical="top"
              value={remarks}
              onChangeText={setRemarks}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Bottom Actions */}
      <View
        style={[
          styles.bottomActions,
          { borderTopColor: colors.border, backgroundColor: colors.card },
        ]}
      >
        <TouchableOpacity
          style={[styles.cancelButton, { backgroundColor: colors.background }]}
          onPress={() => router.back()}
          disabled={isLoading}
        >
          <Text style={[styles.cancelButtonText, { color: colors.subHeading }]}>
            {t.cancel}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.confirmButton,
            { backgroundColor: colors.primary, opacity: isLoading ? 0.7 : 1 },
          ]}
          onPress={handleConsume}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.confirmButtonText}>{t.confirmconsumption}</Text>
          )}
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
  backButton: { padding: 4 },
  headerTitle: { fontSize: 18, fontWeight: "bold" },
  placeholder: { width: 32 },
  scrollContent: { padding: 20, paddingBottom: 40 },
  infoCard: { marginBottom: 16 },
  infoTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 6 },
  infoSubtitle: { fontSize: 15 },
  divider: { height: 1, marginBottom: 24 },
  formGroup: { marginBottom: 20 },
  label: { fontSize: 14, fontWeight: "600", marginBottom: 8 },
  textInput: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 48,
    fontSize: 15,
  },
  dateInput: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 48,
  },
  dateText: { fontSize: 15 },
  textArea: { height: 100, paddingTop: 12 },
  bottomActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    borderTopWidth: 1,
  },
  cancelButton: {
    flex: 0.35,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    height: 48,
  },
  cancelButtonText: { fontSize: 16, fontWeight: "600" },
  confirmButton: {
    flex: 0.6,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    height: 48,
  },
  confirmButtonText: { fontSize: 16, fontWeight: "600", color: "#FFF" },
});
