import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import AppText from "../../src/components/common/AppText";
import ScreenWrapper from "../../src/components/common/ScreenWrapper";
import spacing from "../../src/constants/spacing";
import { useTheme } from "../../src/theme/useTheme";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

import { useLanguage } from "@/constants/localization/useLanguage";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Platform } from "react-native";




const ProfitLossStatement = () => {
const { colors } = useTheme();    
  const { t } = useLanguage();       
  const styles = createStyles(colors); 

const [date, setDate] = React.useState(new Date());
const [showPicker, setShowPicker] = React.useState(false);

const BASE_URL = "https://astrabytte-ai.onrender.com";


const [sales, setSales] = React.useState({
  dailyMilkSales: "",
  calfSales: "",
  cattleSales: "",
  slurrySales: "",
  otherIncome: "",
  feedExpenses: "",
  workerSalary: "",
  medicalExpenses: "",
  farmId: "",
});

const getStoredToken = async () => {
  const token = await AsyncStorage.getItem("access_token");
  return token;
};
const handleSubmit = async () => {
  try {
    const token = await getStoredToken();
    const farmId = await AsyncStorage.getItem("farm_id");

    console.log("Retrieved Token:", token);
    console.log("Retrieved Farm ID:", farmId);

    if (!token) {
      Alert.alert("Error", "User not authenticated");
      return;
    }

    if (!farmId) {
      Alert.alert("Error", "Farm ID not found");
      return;
    }

    const safeNumber = (value: string) =>
      value && value.trim() !== "" ? Number(value) : 0;

    const payload = {
      farmId: farmId,   

      date: date.toISOString().split("T")[0],

      manual: {
        daily_milk_sales: safeNumber(sales.dailyMilkSales),
        calf_sales: safeNumber(sales.calfSales),
        cattle_sales: safeNumber(sales.cattleSales),
        slurry_sales: safeNumber(sales.slurrySales),
        other_income: safeNumber(sales.otherIncome),

        feed_expenses: safeNumber(sales.feedExpenses),
        worker_salary: safeNumber(sales.workerSalary),
        medical_expenses: safeNumber(sales.medicalExpenses),

        water_usage: safeNumber(expenseAmounts.water),
        owner_salary: safeNumber(expenseAmounts.ownerSalary),
        loan_interest: safeNumber(expenseAmounts.loanInterest),
        electricity: safeNumber(expenseAmounts.electricity),
        rent: safeNumber(expenseAmounts.rent),
        repair_maintenance: safeNumber(expenseAmounts.infrastructureRepair),
        equipment_purchase: safeNumber(expenseAmounts.farmEquipment),
        misc_expense: safeNumber(expenseAmounts.miscellaneous),
      },
    };

    console.log("Sending Profit Payload:", payload);
    console.log("API URL:", `${BASE_URL}/api/v1/profit/daily/compute`);

    const response = await fetch(
      `${BASE_URL}/api/v1/profit/daily/compute`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      }
    );

    console.log("API Response Status:", response.status);

    const data = await response.json();
    console.log("Profit API Response:", data);

    if (!response.ok) {
      Alert.alert("Error", JSON.stringify(data.detail || data.message));
      return;
    }

    Alert.alert("Success", "Profit & Loss saved successfully");

  } catch (error: any) {
    console.log("API Error:", error);
    Alert.alert("Error", error.message || "Server error");
  }
};

const [expenses, setExpenses] = React.useState({
  water: false,
  ownerSalary: false,
  farmEquipment: false,
  rent: false,
  loanInterest: false,
  miscellaneous: false,
  electricity: false,
  infrastructureRepair: false,
});

const [expenseAmounts, setExpenseAmounts] = React.useState({
  water: "",
  ownerSalary: "",
  farmEquipment: "",
  rent: "",
  loanInterest: "",
  miscellaneous: "",
  electricity: "",
  infrastructureRepair: "",
});

const EmptyCol = () => <View style={styles.col} />;



const toggleExpense = (key: keyof typeof expenses) => {
  setExpenses(prev => ({
    ...prev,
    [key]: !prev[key],
  }));
};

const updateExpenseAmount = (
  key: keyof typeof expenseAmounts,
  value: string
) => {
  setExpenseAmounts(prev => ({
    ...prev,
    [key]: value,
  }));
};



const onChangeDate = (_: any, selectedDate?: Date) => {
  setShowPicker(false);
  if (selectedDate) setDate(selectedDate);
};

const Section = ({
  title,
  style,
}: {
  title: string;
  style?: any;
}) => (
  <View style={[styles.sectionHeader, style]}>
    <AppText style={styles.sectionText}>{title}</AppText>
  </View>
);

const Row = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: any;
}) => (
  <View style={[styles.row, style]}>{children}</View>
);


const Input = ({
  label,
  value,
  onChangeText,
}: {
  label: string;
  value?: string;
  onChangeText?: (text: string) => void;
}) => (
  <View style={styles.col}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      keyboardType="numeric"
      placeholder="₹ 0"
    />
  </View>
);

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <MaterialCommunityIcons
              name="chart-line"
              size={26}
              color="#ffffff"
            />
            <View>
              <AppText style={styles.headerTitle}>
                Profit & Loss Statement
              </AppText>
              <AppText style={styles.headerSub}>
                Track monthly income, expenses, and net profit
              </AppText>
            </View>
          </View>

         
        </View>

        {/* Period */}
       <AppText style={styles.label}>Date *</AppText>

<TouchableOpacity onPress={() => setShowPicker(true)}>
  <View style={styles.dateInputContainer}>
    
    <AppText style={styles.dateText}>
      {date.toLocaleDateString("en-GB")}
    </AppText>

    <MaterialCommunityIcons
      name="calendar-blank-outline"
      size={20}
      color="#000"
    />

  </View>
</TouchableOpacity>


{showPicker && (
  <DateTimePicker
    value={date}
    mode="date"
    display={Platform.OS === "ios" ? "spinner" : "default"}
    onChange={onChangeDate}
  />
)}


        {/* Sales / Income */}
        <Section title="Sales / Income" />

        <Row>
          <Input
  label="Daily Milk Sales"
  value={sales.dailyMilkSales}
  onChangeText={(text) =>
    setSales({ ...sales, dailyMilkSales: text })
  }
/>
          <Input
  label="Calf Sales"
  value={sales.calfSales}
  onChangeText={(text) =>
    setSales({ ...sales, calfSales: text })
  }
/>
          <Input
  label="Cattle Sales"
  value={sales.cattleSales}
  onChangeText={(text) =>
    setSales({ ...sales, cattleSales: text })
  }
/>
        </Row>

        {/* Slurry + Other Income (Half Half) */}
<Row>
  <View style={{ flex: 1 }}>
    <Input
      label="Slurry/Compost Sales"
      value={sales.slurrySales}
      onChangeText={(text) =>
        setSales({ ...sales, slurrySales: text })
      }
    />
  </View>

  <View style={{ flex: 1 }}>
   <Input
  label="Other Income"
  value={sales.otherIncome}
  onChangeText={(text) =>
    setSales({ ...sales, otherIncome: text })
  }
/>
  </View>
</Row>

{/* Total Sales Turnover - Half Width Below */}
<Row>
  <View style={{ flex: 1 }}>
    <View style={styles.totalSalesBox}>
      <AppText style={styles.totalLabel}>
        Total Sales Turnover
      </AppText>
      <AppText style={styles.totalValue}>₹0</AppText>
    </View>
  </View>

  <View style={{ flex: 1 }} /> 
</Row>


        {/* Expense Categories */}
        <Section title="Add Expense Categories" />

        <View style={styles.checkboxBox}>
  <View style={styles.checkboxGrid}>
    {[
      { key: "water", label: "Water Usage" },
      { key: "ownerSalary", label: "Owner Salary" },
      { key: "farmEquipment", label: "Farm Equipment" },
      { key: "rent", label: "Rent" },
      { key: "loanInterest", label: "Loan Interest" },
      { key: "miscellaneous", label: "Miscellaneous" },
      { key: "electricity", label: "Electricity" },
      { key: "infrastructureRepair", label: "Infrastructure Repair" },
    ].map(item => (
      <TouchableOpacity
        key={item.key}
        style={styles.checkboxItem}
        onPress={() =>
          toggleExpense(item.key as keyof typeof expenses)
        }
        activeOpacity={0.7}
      >
       <View
  style={[
    styles.checkbox,
    expenses[item.key as keyof typeof expenses] && styles.checkboxChecked,
  ]}
>
  {expenses[item.key as keyof typeof expenses] && (
    <MaterialCommunityIcons
      name="check"
      size={14}
      color="#ffffff"
    />
  )}
</View>


        <AppText style={styles.checkboxText}>{item.label}</AppText>
      </TouchableOpacity>
    ))}
  </View>
</View>


        {/* Total Expenses */}
        <Section title="Total Expenses" />

       {/* Dynamic Expense Inputs – 3 per row */}
{/* Fixed Expense Fields - Always Visible */}
<Row>
  <Input
  label="Feed Expenses *"
  value={sales.feedExpenses}
  onChangeText={(text) =>
    setSales({ ...sales, feedExpenses: text })
  }
/>
  <Input
  label="Worker Salary *"
  value={sales.workerSalary}
  onChangeText={(text) =>
    setSales({ ...sales, workerSalary: text })
  }
/>
  <Input
  label="Medical Expenses *"
  value={sales.medicalExpenses}
  onChangeText={(text) =>
    setSales({ ...sales, medicalExpenses: text })
  }
/>
</Row>

{/* Dynamic Expense Inputs - Below Fixed Fields */}

{(() => {
  const selectedExpenses = Object.keys(expenses).filter(
    key => expenses[key as keyof typeof expenses]
  );

  const labelMap: Record<string, string> = {
    water: "Water Usage",
    ownerSalary: "Owner Salary",
    farmEquipment: "Farm Equipment",
    rent: "Rent",
    loanInterest: "Loan Interest",
    miscellaneous: "Miscellaneous",
    electricity: "Electricity",
    infrastructureRepair: "Infrastructure Repair",
  };

  const rows = [];
  for (let i = 0; i < selectedExpenses.length; i += 3) {
    rows.push(
      <Row key={i}>
        {selectedExpenses.slice(i, i + 3).map(key => (
          <Input
            key={key}
            label={labelMap[key]}
            value={expenseAmounts[key as keyof typeof expenseAmounts]}
            onChangeText={(v) =>
              updateExpenseAmount(
                key as keyof typeof expenseAmounts,
                v
              )
            }
          />
        ))}
      </Row>
    );
  }

  return rows;
})()}
        <View style={styles.expenseBox}>
          <AppText style={styles.expenseLabel}>Total Expenses</AppText>
          <AppText style={styles.expenseValue}>₹0</AppText>
        </View>

        {/* Net Profit */}
        <View style={styles.netProfitBox}>
          <View>
            <AppText style={styles.netLabel}>Monthly Net Profit</AppText>
            <AppText style={styles.netSub}>
              Total Sales - Total Expenses
            </AppText>
          </View>
          <AppText style={styles.netValue}>₹0</AppText>
        </View>

        {/* Submit */}
      <View style={styles.submitContainer}>
  <TouchableOpacity
  style={styles.submitButton}
  onPress={handleSubmit}
>
    <AppText style={styles.submitText}>Submit</AppText>
  </TouchableOpacity>
</View>


        </ScrollView>
      </View>
    </ScreenWrapper>
  );
};

export default ProfitLossStatement;

/* ---------- Reusable ---------- */




/* ---------- Styles ---------- */

const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },

    header: {
      backgroundColor: colors.primary,
      padding: 16,
      borderRadius: 10,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: spacing.md,
    },

    headerLeft: { flexDirection: "row", gap: spacing.sm },

    headerTitle: {
      color: colors.white,
      fontSize: 16,
      fontWeight: "600",
    },

    headerSub: {
      color: colors.textSecondary,
      fontSize: 12,
    },

    sectionHeader: {
      borderBottomWidth: 1,
      borderBottomColor: colors.primary,
      marginVertical: spacing.md,
    },

    sectionText: {
      fontWeight: "600",
      marginBottom: spacing.xs,
      color: colors.textPrimary,
    },

    row: {
      flexDirection: "row",
      gap: spacing.sm,
    },

    col: { flex: 1 },

    label: {
      fontSize: 12,
      marginBottom: spacing.xs,
      color: colors.textPrimary,
    },

    input: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 6,
      padding: spacing.sm,
      marginBottom: spacing.sm,
      color: colors.textPrimary,
    },

    totalSalesBox: {
      flex: 1,
      backgroundColor: colors.lightPrimary,
      borderWidth: 1,
      borderColor: colors.primary,
      borderRadius: 6,
      padding: spacing.sm,
      justifyContent: "center",
    },

    totalLabel: { fontSize: 12, color: colors.textSecondary },

    totalValue: {
      fontSize: 16,
      fontWeight: "700",
      color: colors.primary,
    },

    checkboxBox: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 8,
      padding: spacing.sm,
    },

    checkbox: {
      width: 16,
      height: 16,
      borderWidth: 1,
      borderColor: colors.border,
      marginRight: spacing.sm,
    },

    checkboxChecked: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },

    checkboxText: {
      fontSize: 12,
      color: colors.textPrimary,
    },

    expenseBox: {
      backgroundColor: colors.errorLight,
      borderWidth: 1,
      borderColor: colors.error,
      borderRadius: 6,
      padding: spacing.sm,
      marginVertical: spacing.md,
    },

    expenseLabel: { fontSize: 12 },

    expenseValue: {
      fontSize: 16,
      fontWeight: "700",
      color: colors.error,
    },

    netProfitBox: {
      backgroundColor: colors.infoLight,
      borderWidth: 1,
      borderColor: colors.info,
      borderRadius: 8,
      padding: spacing.md,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: spacing.md,
    },

    netLabel: {
      fontSize: 14,
      fontWeight: "600",
      color: colors.textPrimary,
    },

    netSub: {
      fontSize: 11,
      color: colors.textSecondary,
    },

    netValue: {
      fontSize: 18,
      fontWeight: "700",
      color: colors.primary,
    },

    bottomRow: {
      flexDirection: "row",
      gap: spacing.sm,
      marginBottom: spacing.lg,
    },

    exportBottomBtn: {
      flex: 1,
      backgroundColor: colors.background,
      borderWidth: 1,
      borderColor: colors.primary,
      padding: spacing.sm,
      borderRadius: 8,
      alignItems: "center",
    },

    exportBottomText: {
      color: colors.primary,
      fontWeight: "600",
    },

    submitHalfBtn: {
      flex: 1,
      backgroundColor: colors.primary,
      padding: spacing.sm,
      borderRadius: 8,
      alignItems: "center",
    },

    submitText: {
      color: colors.white,
      fontWeight: "600",
    },

    dateInputContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 8,
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.sm,
      marginBottom: spacing.sm,
    },

    dateText: {
      fontSize: 14,
      color: colors.textPrimary,
    },
checkboxGrid: {
  flexDirection: "row",
  flexWrap: "wrap",
  gap: spacing.sm,
},

checkboxItem: {
  flexDirection: "row",
  alignItems: "center",
  width: "48%",
  marginBottom: spacing.sm,
},

submitContainer: {
  alignItems: "center", 
  marginVertical: spacing.lg,
},

submitButton: {
  backgroundColor: colors.primary,
  paddingVertical: 12,
  paddingHorizontal: 40,  
  borderRadius: 8,
  alignItems: "center",
},

    
  });
