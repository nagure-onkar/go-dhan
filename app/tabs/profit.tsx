import AppText from "@/components/common/AppText";
import { useTheme } from "@/theme/useTheme";
import MilkProfitCalculator from "app/screens/proft-loss/MilkProfitCalculator";
import ProfitLossStatement from "app/screens/proft-loss/ProfitLossStatement";
import { Calculator, FileText } from "phosphor-react-native";
import React, { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");
const TAB_WIDTH = width - 32; // 16 margin both sides

type TabType = "statement" | "calculator";

export default function ProfitScreen() {
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState<TabType>("statement");

  const slideAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const switchTab = (tab: TabType) => {
    if (tab === activeTab) return;

    // Fade out
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start(() => {
      setActiveTab(tab);

      // Slide indicator
      Animated.spring(slideAnim, {
        toValue: tab === "statement" ? 0 : TAB_WIDTH / 2,
        useNativeDriver: true,
      }).start();

      // Fade in
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Floating Segmented Control */}
      <View style={styles.segmentWrapper}>
        <View
          style={[styles.segmentContainer, { backgroundColor: colors.card }]}
        >
          {/* Sliding Indicator */}
          <Animated.View
            style={[
              styles.indicator,
              {
                backgroundColor: colors.primary,
                transform: [{ translateX: slideAnim }],
              },
            ]}
          />

          <TouchableOpacity
            style={styles.segmentButton}
            onPress={() => switchTab("statement")}
          >
            <FileText
              size={18}
              weight={activeTab === "statement" ? "fill" : "regular"}
              color={
                activeTab === "statement" ? colors.textInverse : colors.text
              }
            />
            <AppText
              style={[
                styles.segmentText,
                {
                  color:
                    activeTab === "statement"
                      ? colors.textInverse
                      : colors.text,
                },
              ]}
            >
              Statement
            </AppText>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.segmentButton}
            onPress={() => switchTab("calculator")}
          >
            <Calculator
              size={18}
              weight={activeTab === "calculator" ? "fill" : "regular"}
              color={
                activeTab === "calculator" ? colors.textInverse : colors.text
              }
            />
            <AppText
              style={[
                styles.segmentText,
                {
                  color:
                    activeTab === "calculator"
                      ? colors.textInverse
                      : colors.text,
                },
              ]}
            >
              Calculator
            </AppText>
          </TouchableOpacity>
        </View>
      </View>

      {/* Animated Content */}
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        {activeTab === "statement" ? (
          <ProfitLossStatement />
        ) : (
          <MilkProfitCalculator />
        )}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  segmentWrapper: {
    marginHorizontal: 16,
    marginTop: 20,
  },
  segmentContainer: {
    flexDirection: "row",
    borderRadius: 30,
    padding: 6,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    position: "relative",
  },
  indicator: {
    position: "absolute",
    top: 6,
    bottom: 6,
    left: 6,
    width: (Dimensions.get("window").width - 32 - 12) / 2,
    borderRadius: 24,
  },
  segmentButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
    zIndex: 2,
  },
  segmentText: {
    marginLeft: 6,
    fontSize: 14,
  },
  content: {
    flex: 1,
    marginTop: 10,
  },
});
