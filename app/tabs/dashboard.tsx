import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";

import AppText from "../../src/components/common/AppText";
import ScreenWrapper from "../../src/components/common/ScreenWrapper";
import { useLanguage } from "../../src/constants/localization/useLanguage";
import spacing from "../../src/constants/spacing";
import { useTheme } from "../../src/theme/useTheme";

import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  Dimensions,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

const BASE_URL = "https://astrabytte-ai.onrender.com/api/v1";

const { width } = Dimensions.get("window");

const ICON_SIZES = {
  header: 28,
  notification: 20,
  stat: 22,
  expense: 20,
};

interface DashboardData {
  summary: {
    date: string;
    total_animals: number;
    total_cattle: number;
    total_calves: number;
  };

  milk: {
    today: {
      total_litre: number;
    };
  };

  health: {
    treatments_today: number;
  };

  expenses_month_to_date: {
    medical_total: number;
  };

  people: {
    workers: number;
    veterinarians: number;
  };
}


interface Activity {
  id: number;
  message: string;
  time: string;
  type: "treatment" | "milking" | "health" | "general";
}

const DashboardScreen: React.FC = () => {
  const { colors } = useTheme();
  const { t } = useLanguage();
  const styles = createStyles(colors);
  const [stats, setStats] = useState<DashboardData | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [farmName] = useState("Dairy Farm");

  const fetchDashboardData = async () => {
    try {
      const token = await AsyncStorage.getItem("access_token");

      console.log("Auth Token: ", token);

      if (!token) {
        console.log("No token found");
        return;
      }

      const response = await fetch(
        "https://astrabytte-ai.onrender.com/api/v1/dashboard/stats",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      console.log("\n📦 Pretty Response:\n", JSON.stringify(data, null, 2));

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch dashboard");
      }

      setStats(data);
      
    } catch (error) {
      console.log("Dashboard error:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    setLoading(true);
    fetchDashboardData();
  }, []);

  const getStoredToken = async () => {
    return await AsyncStorage.getItem("access_token");
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchDashboardData();
    setRefreshing(false);
  };

  return (
    <ScreenWrapper>
      <LinearGradient
        colors={[colors.background, colors.card]}
        style={styles.gradient}
      >
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={colors.primary}
            />
          }
        >
          <HeaderSection farmName={farmName} />

          {stats && (
            <>
              <SectionTitle title={t.animalSummary} />

              <View style={styles.cardGrid}>
                <StatCard
                  label="Total Animals"
                  value={stats.summary.total_animals.toString()}
                  icon="cow"
                  backgroundColor={colors.card}
                  iconColor={colors.primary}
                  subtext="Overall count"
                />
                <StatCard
                  label="Cattle"
                  value={stats.summary.total_cattle.toString()}
                  icon="sheep"
                  backgroundColor={colors.card}
                  iconColor={colors.primary}
                  subtext="Adult animals"
                />
                <StatCard
                  label="Calves"
                  value={stats.summary.total_calves.toString()}
                  icon="baby-face"
                  backgroundColor={colors.card}
                  iconColor={colors.primary}
                  subtext="Young animals"
                />
              </View>

              <SectionTitle title={t.milkingDetails} />
              <StatCard
                label="Today's Milking"
                value={stats.milk.today.total_litre.toString()}
                icon="water"
                backgroundColor={colors.card}
                iconColor={colors.primary}
                subtext="Animals milked today"
                fullWidth
                compact
              />

              <SectionTitle title={t.healthTreatment} />
              <View style={styles.cardRowTwo}>
                <StatCard
                  containerStyle={styles.statCardTwo}
                  label="Today's Treatment"
                  value={stats.health.treatments_today.toString()}
                  icon="medical-bag"
                  backgroundColor={colors.card}
                  iconColor={colors.primary}
                  subtext="Appointments today"
                />
                {/*<StatCard
                  containerStyle={[styles.statCardTwo, styles.statCardTwoLast]}
                  label="Upcoming Treatment"
                  value={stats.summary.upcoming_treatments.toString()}
                  icon="calendar-clock"
                  backgroundColor={colors.card}
                  iconColor={colors.primary}
                  subtext="Next 7 days"
                />*/}
              </View>

              <View style={styles.expenseCard}>
                <View style={styles.expenseHeader}>
                  <MaterialCommunityIcons
                    name="cash"
                    size={ICON_SIZES.expense}
                    color={colors.primary}
                  />
                  <AppText style={styles.expenseLabel}>
                    Treatment Expenses (This Month)
                  </AppText>
                </View>
                <AppText style={styles.expenseAmount}>
                  ₹{stats.expenses_month_to_date.medical_total.toLocaleString()}
                </AppText>
                <AppText style={styles.expenseSubtext}>
                  Total spent on treatments
                </AppText>
              </View>

              <SectionTitle title={t.staff} />
              <View style={styles.cardRowTwo}>
                <StatCard
                  containerStyle={styles.statCardTwo}
                  label="Workers"
                  value={stats.people.workers.toString()}
                  icon="account-multiple"
                  backgroundColor={colors.card}
                  iconColor={colors.primary}
                  subtext="Assigned workers"
                  compact
                />
                <StatCard
                  containerStyle={[styles.statCardTwo, styles.statCardTwoLast]}
                  label="Veterinarians"
                  value={stats.people.veterinarians.toString()}
                  icon="doctor"
                  backgroundColor={colors.card}
                  iconColor={colors.primary}
                  subtext="Assigned vets"
                  compact
                />
              </View>

             
            </>
          )}

          <View style={styles.bottomSpacing} />
        </ScrollView>
      </LinearGradient>
    </ScreenWrapper>
  );
};

/* ---------- REST OF COMPONENTS & STYLES ----------
   UNCHANGED FROM YOUR ORIGINAL FILE
-------------------------------------------------- */

interface HeaderSectionProps {
  farmName: string;
}

const HeaderSection: React.FC<HeaderSectionProps> = ({ farmName }) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerContent}>
        <View style={styles.headerIconContainer}>
          <MaterialCommunityIcons
            name="home"
            size={ICON_SIZES.header}
            color={colors.card}
          />
        </View>
        <View style={styles.headerTextContainer}>
          <AppText style={styles.farmName}>{farmName}</AppText>
          <AppText style={styles.headerSubtext}>Dairy Farm Dashboard</AppText>
        </View>
      </View>
      <TouchableOpacity style={styles.notificationButton}>
        <MaterialCommunityIcons
          name="bell"
          size={ICON_SIZES.notification}
          color={colors.card}
        />
        <View style={styles.notificationBadge}>
          <AppText style={styles.notificationCount}>3</AppText>
        </View>
      </TouchableOpacity>
    </View>
  );
};

interface StatCardProps {
  label: string;
  value: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  backgroundColor: string;
  iconColor: string;
  subtext: string;
  fullWidth?: boolean;
  compact?: boolean;
  containerStyle?: any;
}

const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  icon,
  backgroundColor,
  iconColor,
  subtext,
  fullWidth = false,
  compact = false,
  containerStyle,
}) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <View
      style={[
        styles.statCard,
        compact && styles.statCardCompact,
        containerStyle,
        fullWidth && styles.statCardFullWidth,
      ]}
    >
      <View style={[styles.iconContainer, { backgroundColor }]}>
        <MaterialCommunityIcons
          name={icon}
          size={compact ? 18 : ICON_SIZES.stat}
          color={iconColor}
        />
      </View>

      <View style={styles.statContent}>
        <AppText style={styles.statLabel}>{label}</AppText>
        <AppText style={styles.statValue}>{value}</AppText>
        <AppText style={styles.statSubtext}>{subtext}</AppText>
      </View>
    </View>
  );
};

interface SectionTitleProps {
  title: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title }) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.sectionTitleContainer}>
      <AppText style={styles.sectionTitle}>{title}</AppText>
      <View style={styles.sectionDivider} />
    </View>
  );
};

interface ActivityListProps {
  activities: Activity[];
}

const ActivityList: React.FC<ActivityListProps> = ({ activities }) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.activityContainer}>
      {activities.map((activity) => (
        <View key={activity.id} style={styles.activityItem}>
          <View style={styles.activityDot} />
          <View style={styles.activityContent}>
            <AppText style={styles.activityMessage}>{activity.message}</AppText>
            <AppText style={styles.activityTime}>{activity.time}</AppText>
          </View>
        </View>
      ))}
    </View>
  );
};
const createStyles = (colors: any) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    gradient: {
      flex: 1,
    },
    container: {
      flex: 1,
      paddingHorizontal: spacing.md,
      paddingTop: spacing.md,
    },

    headerContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 24,
      paddingVertical: spacing.md,
    },
    headerContent: {
      flexDirection: "row",
      alignItems: "center",
      flex: 1,
    },
    headerIconContainer: {
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: colors.primary,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 12,
    },
    headerTextContainer: {
      flex: 1,
    },
    farmName: {
      fontSize: 24,
      fontWeight: "700",
      color: colors.text,
      marginBottom: 4,
    },
    headerSubtext: {
      fontSize: 13,
      color: colors.textSecondary,
    },
    notificationButton: {
      position: "relative",
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: colors.primary,
      justifyContent: "center",
      alignItems: "center",
    },
    notificationBadge: {
      position: "absolute",
      top: -6,
      right: -6,
      backgroundColor: colors.primary,
      width: 24,
      height: 24,
      borderRadius: 12,
      justifyContent: "center",
      alignItems: "center",
    },
    notificationCount: {
      color: colors.card,
      fontSize: 12,
      fontWeight: "700",
    },

    cardGrid: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 12,
    },
    statCard: {
      width: "32%",
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: spacing.sm,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
      flexDirection: "column",
    },
    statCardCompact: {
      paddingVertical: spacing.xs,
      paddingHorizontal: spacing.sm,
      borderRadius: 12,
    },

    statCardFullWidth: {
      width: "100%",
      marginRight: 0,
    },
    iconContainer: {
      width: 42,
      height: 42,
      borderRadius: 221,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 12,
    },
    statContent: {
      flex: 1,
    },
    statLabel: {
      fontSize: 11,
      color: colors.textSecondary,
      marginBottom: 6,
      fontWeight: "500",
    },
    statValue: {
      fontSize: 20,
      fontWeight: "700",
      color: colors.text,
      marginBottom: 8,
    },
    statSubtext: {
      fontSize: 10,
      color: colors.primary,
      fontWeight: "600",
    },

    cardRowTwo: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 12,
    },
    statCardTwo: {
      width: "49%",
    },
    statCardTwoLast: {
      marginRight: 0,
    },

    expenseCard: {
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: spacing.lg,
      marginBottom: spacing.xl,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
      borderLeftWidth: 4,
      borderLeftColor: colors.primary,
    },
    expenseHeader: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: spacing.sm,
    },
    expenseLabel: {
      fontSize: 14,
      color: colors.textSecondary,
      marginLeft: spacing.sm,
      fontWeight: "600",
    },
    expenseAmount: {
      fontSize: 32,
      fontWeight: "700",
      color: colors.text,
      marginBottom: 4,
    },
    expenseSubtext: {
      fontSize: 12,
      color: colors.textSecondary,
    },

    sectionTitleContainer: {
      marginTop: spacing.lg,
      marginBottom: spacing.sm,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "700",
      color: colors.text,
      marginBottom: spacing.xs,
    },
    sectionDivider: {
      height: 3,
      backgroundColor: colors.primary,
      width: 40,
      borderRadius: 1.5,
    },

    activityContainer: {
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: spacing.md,
      marginBottom: spacing.xl,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
    },
    activityItem: {
      flexDirection: "row",
      paddingVertical: spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: "#f0f0f0",
    },
    activityDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: colors.primary,
      marginTop: 6,
      marginRight: spacing.sm,
    },
    activityContent: {
      flex: 1,
    },
    activityMessage: {
      fontSize: 14,
      color: colors.text,
      fontWeight: "500",
      marginBottom: 4,
    },
    activityTime: {
      fontSize: 12,
      color: colors.textSecondary,
    },

    bottomSpacing: {
      height: 40,
    },
  });

export default DashboardScreen;
