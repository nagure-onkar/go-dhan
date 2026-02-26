import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useRouter, usePathname } from "expo-router";

export default function ReportTabs() {
  const router = useRouter();
  const pathname = usePathname();

  const tabs = [
    { name: "Milk Profit Report", route: "/drawer/Report/MilkProfitReport" as const },
    { name: "Feed Report", route: "/drawer/Report/FeedStock" as const},
    { name: "Profit / Loss Report", route: "/drawer/Report/ProfitLossReport" as const },
    { name: "Health Management Reports", route: "/drawer/Report/HealthManagementReports" as const },
    { name: "Cattle History (State-wise)", route: "/drawer/Report/CattleHistory-State-wise" as const},
    { name: "Lactation Reports", route: "/drawer/Report/LactationReports" as const},
    { name: "Alert Reports", route: "/drawer/Report/AlertReports" as const},
  ];

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container}>
      {tabs.map((tab, index) => {
        const isActive = pathname === tab.route;

        return (
          <TouchableOpacity
            key={index}
            style={[styles.tab, isActive && styles.activeTab]}
            onPress={() => router.push(tab.route)}
            accessibilityLabel={`Navigate to ${tab.name}`}
          >
            <Text style={[styles.tabText, isActive && styles.activeText]}>
              {tab.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
  },
  tab: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  activeTab: {
    backgroundColor: '#007bff',
  },
  tabText: {
    fontSize: 16,
    color: '#333',
  },
  activeText: {
    color: '#fff',
  },
});

// ...existing code...