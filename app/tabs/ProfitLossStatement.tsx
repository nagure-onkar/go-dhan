import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";
import { Platform } from "react-native";




const ProfitLossStatement = () => {
    const [date, setDate] = React.useState(new Date());
const [showPicker, setShowPicker] = React.useState(false);



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
  return (
    <SafeAreaView style={styles.container}>
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
              <Text style={styles.headerTitle}>
                Profit & Loss Statement
              </Text>
              <Text style={styles.headerSub}>
                Track monthly income, expenses, and net profit
              </Text>
            </View>
          </View>

         
        </View>

        {/* Period */}
        <Section title="Period" />

        <Text style={styles.label}>Date *</Text>
        <TouchableOpacity onPress={() => setShowPicker(true)}>
  <View pointerEvents="none">
    <TextInput
      style={styles.input}
      value={date.toLocaleDateString("en-GB")}
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
          <Input label="Daily Milk Sales" />
          <Input label="Calf Sales" />
          <Input label="Cattle Sales" />
        </Row>

        <Row>
          <Input label="Slurry/Compost Sales" />
          <Input label="Other Income" />
          <View style={styles.totalSalesBox}>
            <Text style={styles.totalLabel}>Total Sales Turnover</Text>
            <Text style={styles.totalValue}>₹0</Text>
          </View>
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


        <Text style={styles.checkboxText}>{item.label}</Text>
      </TouchableOpacity>
    ))}
  </View>
</View>


        {/* Total Expenses */}
        <Section title="Total Expenses" />

       {/* Dynamic Expense Inputs – 3 per row */}

<Row>
  {expenses.water ? (
    <Input
      label="Water Usage"
      value={expenseAmounts.water}
      onChangeText={v => updateExpenseAmount("water", v)}
    />
  ) : (
    <EmptyCol />
  )}

  {expenses.ownerSalary ? (
    <Input
      label="Owner Salary"
      value={expenseAmounts.ownerSalary}
      onChangeText={v => updateExpenseAmount("ownerSalary", v)}
    />
  ) : (
    <EmptyCol />
  )}

  {expenses.loanInterest ? (
    <Input
      label="Loan Interest"
      value={expenseAmounts.loanInterest}
      onChangeText={v => updateExpenseAmount("loanInterest", v)}
    />
  ) : (
    <EmptyCol />
  )}
</Row>

<Row>
  {expenses.farmEquipment ? (
    <Input
      label="Farm Equipment"
      value={expenseAmounts.farmEquipment}
      onChangeText={v => updateExpenseAmount("farmEquipment", v)}
    />
  ) : (
    <EmptyCol />
  )}

  {expenses.electricity ? (
    <Input
      label="Electricity"
      value={expenseAmounts.electricity}
      onChangeText={v => updateExpenseAmount("electricity", v)}
    />
  ) : (
    <EmptyCol />
  )}

  {expenses.miscellaneous ? (
    <Input
      label="Miscellaneous"
      value={expenseAmounts.miscellaneous}
      onChangeText={v => updateExpenseAmount("miscellaneous", v)}
    />
  ) : (
    <EmptyCol />
  )}
</Row>


<Row>
  {expenses.rent ? (
    <Input
      label="Rent"
      value={expenseAmounts.rent}
      onChangeText={v => updateExpenseAmount("rent", v)}
    />
  ) : (
    <EmptyCol />
  )}

  {expenses.infrastructureRepair ? (
    <Input
      label="Infrastructure Repair"
      value={expenseAmounts.infrastructureRepair}
      onChangeText={v =>
        updateExpenseAmount("infrastructureRepair", v)
      }
    />
  ) : (
    <EmptyCol />
  )}

  <EmptyCol />
</Row>



        <Row>
          <Input label="Feed Expenses" />
          <Input label="Worker Salary *" />
          <Input label="Medical Expenses" />
        </Row>

        <View style={styles.expenseBox}>
          <Text style={styles.expenseLabel}>Total Expenses</Text>
          <Text style={styles.expenseValue}>₹0</Text>
        </View>

        {/* Net Profit */}
        <View style={styles.netProfitBox}>
          <View>
            <Text style={styles.netLabel}>Monthly Net Profit</Text>
            <Text style={styles.netSub}>
              Total Sales - Total Expenses
            </Text>
          </View>
          <Text style={styles.netValue}>₹0</Text>
        </View>

        {/* Submit */}
       <View style={styles.bottomRow}>
  <TouchableOpacity style={styles.exportBottomBtn}>
    <Text style={styles.exportBottomText}>Export Profit-Loss</Text>
  </TouchableOpacity>

  <TouchableOpacity style={styles.submitHalfBtn}>
    <Text style={styles.submitText}>Submit</Text>
  </TouchableOpacity>
</View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfitLossStatement;

/* ---------- Reusable ---------- */

const Section = ({ title }: { title: string }) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionText}>{title}</Text>
  </View>
);

const Row = ({ children }: any) => (
  <View style={styles.row}>{children}</View>
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


/* ---------- Styles ---------- */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ffffff" },

  header: {
    backgroundColor: "#16a34a",
    padding: 16,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerLeft: { flexDirection: "row", gap: 10 },
  headerTitle: { color: "#fff", fontSize: 16, fontWeight: "600" },
  headerSub: { color: "#dcfce7", fontSize: 12 },

  exportBtn: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  exportText: { fontSize: 12, color: "#16a34a", fontWeight: "600" },

  sectionHeader: {
    borderBottomWidth: 1,
    borderBottomColor: "#22c55e",
    marginVertical: 16,
  },
  sectionText: { fontWeight: "600", marginBottom: 6 },

  row: { flexDirection: "row", gap: 12 },
  col: { flex: 1 },

  label: { fontSize: 12, marginBottom: 4 },
  input: {
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
  },

  totalSalesBox: {
    flex: 1,
    backgroundColor: "#f0fdf4",
    borderWidth: 1,
    borderColor: "#22c55e",
    borderRadius: 6,
    padding: 12,
    justifyContent: "center",
  },
  totalLabel: { fontSize: 12 },
  totalValue: { fontSize: 16, fontWeight: "700", color: "#16a34a" },

  checkboxBox: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    padding: 12,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  checkbox: {
    width: 16,
    height: 16,
    borderWidth: 1,
    borderColor: "#9ca3af",
    marginRight: 8,
  },
  checkboxText: { fontSize: 12 },

  expenseBox: {
    backgroundColor: "#fff1f2",
    borderWidth: 1,
    borderColor: "#f87171",
    borderRadius: 6,
    padding: 12,
    marginVertical: 16,
  },
  expenseLabel: { fontSize: 12 },
  expenseValue: { fontSize: 16, fontWeight: "700", color: "#dc2626" },

  netProfitBox: {
    backgroundColor: "#eff6ff",
    borderWidth: 1,
    borderColor: "#60a5fa",
    borderRadius: 8,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  netLabel: { fontSize: 14, fontWeight: "600" },
  netSub: { fontSize: 11, color: "#475569" },
  netValue: { fontSize: 18, fontWeight: "700", color: "#16a34a" },

  submitBtn: {
    backgroundColor: "#16a34a",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 30,
  },
  bottomRow: {
  flexDirection: "row",
  gap: 12,
  marginBottom: 30,
},

exportBottomBtn: {
  flex: 1,
  backgroundColor: "#ffffff",
  borderWidth: 1,
  borderColor: "#16a34a",
  padding: 14,
  borderRadius: 8,
  alignItems: "center",
},

exportBottomText: {
  color: "#16a34a",
  fontWeight: "600",
},

submitHalfBtn: {
  flex: 1,
  backgroundColor: "#16a34a",
  padding: 14,
  borderRadius: 8,
  alignItems: "center",
},
checkboxGrid: {
  flexDirection: "row",
  flexWrap: "wrap",
},

checkboxItem: {
  width: "50%", // 2 items per row
  flexDirection: "row",
  alignItems: "center",
  marginBottom: 10,
},

checkboxChecked: {
  backgroundColor: "#2563eb", // blue
  borderColor: "#2563eb",
},



  submitText: { color: "#fff", fontWeight: "600" },
});
