import AppText from "@/components/common/AppText";
import Success from "@/components/common/success";
import { useLanguage } from "@/constants/localization/useLanguage";
import { useTheme } from "@/theme/useTheme";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router } from "expo-router";
import { useState } from "react";
import { Dropdown } from "react-native-element-dropdown";

import {
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

const { colors } = useTheme();

export default function AddFeed() {
  const { t, setLanguage, language } = useLanguage();

  const [formData, setFormData] = useState({
    feed_name: "",
    feed_type: "",
    quantity_kg: "",
    cost_per_kg: "",
    supplier_name: "",
    reorder_level_kg: "0", // Handled as string in state, parsed to number for API
    purchase_date: new Date(),
    integrate_with_existing: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState("select");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const req = <AppText style={{ color: "red" }}> *</AppText>;

  // UPDATE THIS: Adjust these based on your backend's accepted enums
  const feedNameOptions = [
    { label: "Corn", value: "Corn" },
    { label: "Soybean Meal", value: "Soybean Meal" },
    { label: "Wheat", value: "Wheat" },
    { label: "Fish Meal", value: "Fish Meal" },
  ];

  // Updated to include "Green" based on your backend example
  const feedTypeOptions = [
    { label: "Green", value: "Green" },
    { label: "Dry", value: "Dry" },
    { label: "Concentrate", value: "Concentrate" },
    { label: "Mineral", value: "Mineral" },
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || formData.purchase_date;
    setShowDatePicker(Platform.OS === "ios");
    handleInputChange("purchase_date", currentDate);
  };

  const totalcost = () => {
    const qty = parseFloat(formData.quantity_kg) || 0;
    const cost = parseFloat(formData.cost_per_kg) || 0;
    return (qty * cost).toFixed(2);
  };

  const handleSave = async () => {
    // 1. Validate required fields before attempting to send
    if (!formData.feed_name || !formData.feed_type || !formData.supplier_name) {
      Alert.alert(
        "Error",
        "Please fill in all required fields (Feed Name, Type, and Supplier).",
      );
      return;
    }

    try {
      setIsLoading(true);
      const token = await AsyncStorage.getItem("access_token");

      const year = formData.purchase_date.getFullYear();
      const month = String(formData.purchase_date.getMonth() + 1).padStart(
        2,
        "0",
      );
      const day = String(formData.purchase_date.getDate()).padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;

      const payload = {
        feed_name: formData.feed_name,
        feed_type: formData.feed_type,
        quantity_kg: Number(formData.quantity_kg) || 1, // Ensures it's a number, defaults to 1
        cost_per_kg: Number(formData.cost_per_kg) || 1, // Ensures it's a number, defaults to 1
        supplier_name: formData.supplier_name,
        reorder_level_kg: Number(formData.reorder_level_kg) || 0, // Ensures it's a number, defaults to 0
        purchase_date: formattedDate, // "2026-02-27"
        integrate_with_existing: formData.integrate_with_existing, // boolean false
      };

      // Check the payload in your console before sending
      console.log("Sending payload:", JSON.stringify(payload, null, 2));

      const response = await fetch(`${BASE_URL}/api/v1/feed/purchase`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Backend Validation Error:", errorData);
        Alert.alert("Error", "Failed to save. Please check your inputs.");
        return;
      }
      setIsSaved(true);
      setTimeout(() => {
        router.replace("./FeedStock");
        setIsSaved(false);
      }, 2000);
    } catch (error) {
      console.error("Network Error:", error);
      Alert.alert("Error", "Could not connect to the server.");
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
          Feed Added Successfully!
        </AppText>
      </>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t.feedmanagement}</Text>
        <TouchableOpacity onPress={() => router.replace("/tabs")}>
          <Feather name="x" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Top Toggles */}
          <View style={styles.toggleContainer}>
            <TouchableOpacity
              style={styles.toggleOption}
              onPress={() => setSelectedOption("select")}
            >
              <MaterialCommunityIcons
                name={
                  selectedOption === "select"
                    ? "radiobox-marked"
                    : "radiobox-blank"
                }
                size={20}
                color={
                  selectedOption === "select"
                    ? colors.primary
                    : colors.subHeading
                }
              />
              <Text
                style={[
                  styles.toggleText,
                  selectedOption === "select" && styles.toggleTextActive,
                ]}
              >
                {t.selectoption}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.toggleOption}
              onPress={() => setSelectedOption("create")}
            >
              <MaterialCommunityIcons
                name={
                  selectedOption === "create"
                    ? "radiobox-marked"
                    : "radiobox-blank"
                }
                size={20}
                color={
                  selectedOption === "create"
                    ? colors.primary
                    : colors.subHeading
                }
              />
              <Text
                style={[
                  styles.toggleText,
                  selectedOption === "create" && styles.toggleTextActive,
                ]}
              >
                {t.createnewfeed}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Feed Name Dropdown */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>
              {t.feedname}
              {req}
            </Text>
            <Dropdown
              style={styles.dropdownInput}
              selectedTextStyle={[styles.dropdownText, { color: colors.text }]}
              placeholderStyle={styles.dropdownText}
              iconColor={colors.subHeading}
              data={feedNameOptions}
              labelField="label"
              valueField="value"
              placeholder={t.selectfeed}
              value={formData.feed_name}
              onChange={(item) => handleInputChange("feed_name", item.value)}
            />
          </View>

          {/* Feed Type Dropdown */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>
              {t.feedtype}
              {req}
            </Text>
            <Dropdown
              style={styles.dropdownInput}
              selectedTextStyle={[styles.dropdownText, { color: colors.text }]}
              placeholderStyle={styles.dropdownText}
              iconColor={colors.subHeading}
              data={feedTypeOptions}
              labelField="label"
              valueField="value"
              placeholder={t.selecttype}
              value={formData.feed_type}
              onChange={(item) => handleInputChange("feed_type", item.value)}
            />
          </View>

          {/* Supplier Name */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>
              {t.suppliername}
              {req}
            </Text>
            <TextInput
              style={styles.textInput}
              placeholder={t.suppliername}
              placeholderTextColor={colors.subHeading}
              value={formData.supplier_name}
              onChangeText={(text) => handleInputChange("supplier_name", text)}
            />
          </View>

          {/* Quantity */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>
              {t.quantity_kg}
              {req}
            </Text>
            <TextInput
              style={styles.textInput}
              placeholder={t.enterquantity_kg}
              placeholderTextColor={colors.subHeading}
              keyboardType="numeric"
              value={String(formData.quantity_kg)}
              onChangeText={(text) => handleInputChange("quantity_kg", text)}
            />
          </View>

          {/* Cost */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>
              {t.cost}
              {req}
            </Text>
            <TextInput
              style={styles.textInput}
              placeholder={t.entercostperkg}
              placeholderTextColor={colors.subHeading}
              keyboardType="numeric"
              value={String(formData.cost_per_kg)}
              onChangeText={(text) => handleInputChange("cost_per_kg", text)}
            />
          </View>

          {/* Total Cost Auto-calc */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>{t.totalcost}</Text>
            <View style={styles.costInputContainer}>
              <Text style={styles.currencySymbol}>₹</Text>
              <TextInput
                style={styles.costInput}
                placeholder="0"
                placeholderTextColor={colors.text}
                keyboardType="numeric"
                value={String(totalcost())}
                editable={false}
              />
              <MaterialCommunityIcons
                name="calculator-variant-outline"
                size={20}
                color={colors.subHeading}
              />
            </View>
            <Text style={styles.helperText}>{t.autocalculated}</Text>
          </View>

          {/* Purchase Date Picker */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>
              {t.purchasedate}
              {req}
            </Text>
            <TouchableOpacity
              style={[styles.dropdownInput, { paddingHorizontal: 12 }]}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={[styles.dropdownText, { color: colors.text }]}>
                {/* Visual display for the user can be local format, but backend gets strict YYYY-MM-DD */}
                {formData.purchase_date.toLocaleDateString()}
              </Text>
              <Feather name="calendar" size={20} color={colors.subHeading} />
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                value={formData.purchase_date}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Bottom Actions */}
      <View style={styles.bottomActions}>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => router.replace("./FeedStock")}
          disabled={isLoading}
        >
          <Text style={styles.cancelButtonText}>{t.cancel}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.saveButton, { opacity: isLoading ? 0.7 : 1 }]}
          onPress={handleSave}
          disabled={isLoading}
        >
          <Text style={styles.saveButtonText}>
            {/* {isLoading ? "Saving..." : `${t.save}`} */}
            {t.save}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 12, backgroundColor: colors.background },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: { fontSize: 20, fontWeight: "bold", color: colors.text },
  scrollContent: { padding: 20, paddingBottom: 40 },
  toggleContainer: { flexDirection: "row", marginBottom: 24 },
  toggleOption: { flexDirection: "row", alignItems: "center", marginRight: 20 },
  toggleText: {
    marginLeft: 8,
    fontSize: 14,
    color: colors.subHeading,
    fontWeight: "500",
  },
  toggleTextActive: { color: colors.text, fontWeight: "600" },
  formGroup: { marginBottom: 20 },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 8,
  },
  dropdownInput: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 48,
    backgroundColor: colors.card,
  },
  dropdownText: { fontSize: 15, color: colors.subHeading },
  textInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 48,
    fontSize: 15,
    color: colors.text,
    backgroundColor: colors.card,
  },
  costInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 48,
    backgroundColor: colors.background,
  },
  currencySymbol: { fontSize: 16, color: colors.text, marginRight: 8 },
  costInput: { flex: 1, fontSize: 16, color: colors.text },
  helperText: { fontSize: 12, color: colors.subHeading, marginTop: 6 },
  bottomActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.card,
  },
  cancelButton: {
    flex: 0.48,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
    borderRadius: 8,
    height: 48,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.subHeading,
  },
  saveButton: {
    flex: 0.48,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    borderRadius: 8,
    height: 48,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.textInverse,
  },
});
