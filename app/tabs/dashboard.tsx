import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');

const ICON_SIZES = {
  header: 28,
  notification: 20,
  stat: 22,
  expense: 20,
};

const COLORS = {
  primary: '#16a34a', 
  primaryLight: '#dcfce7', 
  secondary: '#3b82f6', 
  secondaryLight: '#dbeafe', 
  warning: '#f59e0b', 
  warningLight: '#fef3c7', 
  danger: '#ef4444', 
  dangerLight: '#fee2e2', 
  white: '#ffffff',
  gray800: '#1f2937',
  gray600: '#4b5563',
  gray500: '#6b7280',
  gray50: '#f9fafb',
  background: '#f0fdf4', 
};

interface StatsData {
  totalAnimals: number;
  totalCattle: number;
  totalCalves: number;
  todayMilking: number;
  todayTreatments: number;
  upcomingTreatments: number;
  treatmentExpenses: number;
  workers: number;
  veterinarians: number;
}

interface Activity {
  id: number;
  message: string;
  time: string;
  type: 'treatment' | 'milking' | 'health' | 'general';
}

// Main Dashboard Component
const DashboardScreen: React.FC = () => {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [farmName, setFarmName] = useState('Dairy Farm');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
    
      const token = await getStoredToken(); 
      
      
      const mockStats: StatsData = {
        totalAnimals: 150,
        totalCattle: 95,
        totalCalves: 55,
        todayMilking: 45,
        todayTreatments: 3,
        upcomingTreatments: 8,
        treatmentExpenses: 5500,
        workers: 8,
        veterinarians: 2,
      };

      const mockActivities: Activity[] = [
        {
          id: 1,
          message: 'Cow #C-001 milking completed',
          time: '2 hours ago',
          type: 'milking',
        },
        {
          id: 2,
          message: 'Vaccination for Calf #CAL-05 scheduled',
          time: '4 hours ago',
          type: 'health',
        },
        {
          id: 3,
          message: 'Treatment expense recorded: ₹1,500',
          time: '6 hours ago',
          type: 'treatment',
        },
        {
          id: 4,
          message: 'Worker assigned to milking shift',
          time: '8 hours ago',
          type: 'general',
        },
      ];

      setStats(mockStats);
      setActivities(mockActivities);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchDashboardData();
    setRefreshing(false);
  };

  const getStoredToken = async () => {
    return 'token';
  };

  if (loading && !refreshing) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Loading Dashboard...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={[COLORS.background, '#e0f2fe']}
        style={styles.gradient}
      >
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={COLORS.primary}
            />
          }
        >
          {/* Header */}
          <HeaderSection farmName={farmName} />

          {/* Quick Stats Cards */}
          {stats && (
            <>
              {/* Animal Count Cards */}
              <SectionTitle title="Animal Summary" />
              <View style={styles.cardGrid}>
                <StatCard
                  label="Total Animals"
                  value={stats.totalAnimals.toString()}
                  icon="cow"
                  backgroundColor={COLORS.primaryLight}
                  iconColor={COLORS.primary}
                  subtext="Overall count"
                />
                <StatCard
                  label="Cattle"
                  value={stats.totalCattle.toString()}
                  icon="sheep"
                  backgroundColor={COLORS.primaryLight}
                  iconColor={COLORS.primary}
                  subtext="Adult animals"
                />
                <StatCard
                  label="Calves"
                  value={stats.totalCalves.toString()}
                  icon="baby-face"
                  backgroundColor={COLORS.secondaryLight}
                  iconColor={COLORS.secondary}
                  subtext="Young animals"
                />
              </View>

              {/* Milking Section */}
              <SectionTitle title="Milking Details" />
              <StatCard
                label="Today's Milking"
                value={stats.todayMilking.toString()}
                icon="water"
                backgroundColor={COLORS.primaryLight}
                iconColor={COLORS.primary}
                subtext="Animals milked today"
                fullWidth
              />

              {/* Treatment Section */}
              <SectionTitle title="Health & Treatment" />
              <View style={styles.cardRowTwo}>
                <StatCard
                  containerStyle={styles.statCardTwo}
                  label="Today's Treatment"
                  value={stats.todayTreatments.toString()}
                  icon="medical-bag"
                  backgroundColor={COLORS.dangerLight}
                  iconColor={COLORS.danger}
                  subtext="Appointments today"
                />
                <StatCard
                  containerStyle={[styles.statCardTwo, styles.statCardTwoLast]}
                  label="Upcoming Treatment"
                  value={stats.upcomingTreatments.toString()}
                  icon="calendar-clock"
                  backgroundColor={COLORS.warningLight}
                  iconColor={COLORS.warning}
                  subtext="Next 7 days"
                />
              </View>

              {/* Treatment Expenses */}
              <View style={styles.expenseCard}>
                <View style={styles.expenseHeader}>
                  <MaterialCommunityIcons
                    name="cash"
                    size={ICON_SIZES.expense}
                    color={COLORS.primary}
                  />
                  <Text style={styles.expenseLabel}>
                    Treatment Expenses (This Month)
                  </Text>
                </View>
                <Text style={styles.expenseAmount}>
                  ₹{stats.treatmentExpenses.toLocaleString()}
                </Text>
                <Text style={styles.expenseSubtext}>
                  Total spent on treatments
                </Text>
              </View>

              {/* Staff Section */}
              <SectionTitle title="Staff" />
              <View style={styles.cardRowTwo}>
                <StatCard
                  containerStyle={styles.statCardTwo}
                  label="Workers"
                  value={stats.workers.toString()}
                  icon="account-multiple"
                  backgroundColor={COLORS.secondaryLight}
                  iconColor={COLORS.secondary}
                  subtext="Assigned workers"
                />
                <StatCard
                  containerStyle={[styles.statCardTwo, styles.statCardTwoLast]}
                  label="Veterinarians"
                  value={stats.veterinarians.toString()}
                  icon="doctor"
                  backgroundColor={COLORS.dangerLight}
                  iconColor={COLORS.danger}
                  subtext="Assigned vets"
                />
              </View>

              {/* Recent Activities */}
              <SectionTitle title="Recent Activities" />
              <ActivityList activities={activities} />
            </>
          )}

          {/* Bottom Spacing */}
          <View style={styles.bottomSpacing} />
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

// Header Component
interface HeaderSectionProps {
  farmName: string;
}

const HeaderSection: React.FC<HeaderSectionProps> = ({ farmName }) => (
  <View style={styles.headerContainer}>
    <View style={styles.headerContent}>
      <View style={styles.headerIconContainer}>
        <MaterialCommunityIcons name="barn" size={ICON_SIZES.header} color={COLORS.primary} />
      </View>
      <View style={styles.headerTextContainer}>
        <Text style={styles.farmName}>{farmName}</Text>
        <Text style={styles.headerSubtext}>Dairy Farm Dashboard</Text>
      </View>
    </View>
    <TouchableOpacity style={styles.notificationButton}>
      <MaterialCommunityIcons name="bell" size={ICON_SIZES.notification} color={COLORS.primary} />
      <View style={styles.notificationBadge}>
        <Text style={styles.notificationCount}>3</Text>
      </View>
    </TouchableOpacity>
  </View>
);

// Stat Card Component
interface StatCardProps {
  label: string;
  value: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  backgroundColor: string;
  iconColor: string;
  subtext: string;
  fullWidth?: boolean;
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
  containerStyle,
}) => (
  <View
    style={[
      styles.statCard,
      containerStyle,
      fullWidth && styles.statCardFullWidth,
    ]}
  >
    <View style={[styles.iconContainer, { backgroundColor }]}>
      <MaterialCommunityIcons name={icon} size={ICON_SIZES.stat} color={iconColor} />
    </View>
    <View style={styles.statContent}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statSubtext}>{subtext}</Text>
    </View>
  </View>
);

// Section Title Component
interface SectionTitleProps {
  title: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title }) => (
  <View style={styles.sectionTitleContainer}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <View style={styles.sectionDivider} />
  </View>
);

// Activity List Component
interface ActivityListProps {
  activities: Activity[];
}

const ActivityList: React.FC<ActivityListProps> = ({ activities }) => (
  <View style={styles.activityContainer}>
    {activities.map((activity) => (
      <View key={activity.id} style={styles.activityItem}>
        <View style={styles.activityDot} />
        <View style={styles.activityContent}>
          <Text style={styles.activityMessage}>{activity.message}</Text>
          <Text style={styles.activityTime}>{activity.time}</Text>
        </View>
      </View>
    ))}
  </View>
);

// Styles
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: COLORS.gray600,
    fontWeight: '600',
  },

  // Header Styles
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    paddingVertical: 16,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerTextContainer: {
    flex: 1,
  },
  farmName: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.gray800,
    marginBottom: 4,
  },
  headerSubtext: {
    fontSize: 13,
    color: COLORS.gray600,
  },
  notificationButton: {
    position: 'relative',
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationBadge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: COLORS.danger,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationCount: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '700',
  },

  // Card Grid Styles
  cardGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  statCard: {
    width: '32%',
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    flexDirection: 'column',
  },
  statCardFullWidth: {
    width: '100%',
    marginRight: 0,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statContent: {
    flex: 1,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.gray600,
    marginBottom: 6,
    fontWeight: '500',
  },
  statValue: {
    fontSize: 26,
    fontWeight: '700',
    color: COLORS.gray800,
    marginBottom: 8,
  },
  statSubtext: {
    fontSize: 11,
    color: COLORS.primary,
    fontWeight: '600',
  },

  // Two-column Treatment row
  cardRowTwo: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 12,
  },
  statCardTwo: {
    width: '48%',
    marginRight: 12,
  },
  statCardTwoLast: {
    marginRight: 0,
  },

  // Expense Card Styles
  expenseCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  expenseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  expenseLabel: {
    fontSize: 14,
    color: COLORS.gray600,
    marginLeft: 12,
    fontWeight: '600',
  },
  expenseAmount: {
    fontSize: 32,
    fontWeight: '700',
    color: COLORS.gray800,
    marginBottom: 4,
  },
  expenseSubtext: {
    fontSize: 12,
    color: COLORS.gray500,
  },

  // Section Title Styles
  sectionTitleContainer: {
    marginTop: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.gray800,
    marginBottom: 12,
  },
  sectionDivider: {
    height: 3,
    backgroundColor: COLORS.primary,
    width: 40,
    borderRadius: 1.5,
  },

  // Activity Styles
  activityContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  activityItem: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  activityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
    marginTop: 6,
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityMessage: {
    fontSize: 14,
    color: COLORS.gray800,
    fontWeight: '500',
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 12,
    color: COLORS.gray500,
  },

  // Bottom Spacing
  bottomSpacing: {
    height: 40,
  },
});

export default DashboardScreen;
