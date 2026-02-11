import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import {
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

/* -------------------- DUMMY DATA -------------------- */

const DUMMY_STATS = {
  totalAnimals: 120,
  totalCattle: 80,
  totalCalves: 40,
  todayMilking: 65,
  todayTreatments: 4,
  upcomingTreatments: 7,
  treatmentExpenses: 18500,
  workers: 12,
  veterinarians: 2,
};

const DUMMY_ACTIVITIES: Activity[] = [
  {
    id: 1,
    message: 'Cow #23 vaccinated',
    time: '10 minutes ago',
    type: 'treatment',
  },
  {
    id: 2,
    message: 'Morning milking completed',
    time: '1 hour ago',
    type: 'milking',
  },
  {
    id: 3,
    message: 'Calf health check scheduled',
    time: '3 hours ago',
    type: 'health',
  },
  {
    id: 4,
    message: 'Feed stock updated',
    time: 'Yesterday',
    type: 'general',
  },
];

/* --------------------------------------------------- */

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

const DashboardScreen: React.FC = () => {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [farmName] = useState('Dairy Farm');

  useEffect(() => {
    loadDummyData();
  }, []);

  const loadDummyData = async () => {
    setLoading(true);
    await new Promise(res => setTimeout(res, 500));
    setStats(DUMMY_STATS);
    setActivities(DUMMY_ACTIVITIES);
    setLoading(false);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadDummyData();
    setRefreshing(false);
  };

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
          <HeaderSection farmName={farmName} />

          {stats && (
            <>
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

              <SectionTitle title="Milking Details" />
              <StatCard
                label="Today's Milking"
                value={stats.todayMilking.toString()}
                icon="water"
                backgroundColor={COLORS.primaryLight}
                iconColor={COLORS.primary}
                subtext="Animals milked today"
                fullWidth
                compact
              />

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
                  containerStyle={[
                    styles.statCardTwo,
                    styles.statCardTwoLast,
                  ]}
                  label="Upcoming Treatment"
                  value={stats.upcomingTreatments.toString()}
                  icon="calendar-clock"
                  backgroundColor={COLORS.warningLight}
                  iconColor={COLORS.warning}
                  subtext="Next 7 days"
                />
              </View>

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
                  compact
                />
                <StatCard
                  containerStyle={[
                    styles.statCardTwo,
                    styles.statCardTwoLast,
                  ]}
                  label="Veterinarians"
                  value={stats.veterinarians.toString()}
                  icon="doctor"
                  backgroundColor={COLORS.dangerLight}
                  iconColor={COLORS.danger}
                  subtext="Assigned vets"
                  compact
                />
              </View>

              <SectionTitle title="Recent Activities" />
              <ActivityList activities={activities} />
            </>
          )}

          <View style={styles.bottomSpacing} />
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

/* ---------- REST OF COMPONENTS & STYLES ----------
   UNCHANGED FROM YOUR ORIGINAL FILE
-------------------------------------------------- */



interface HeaderSectionProps {
  farmName: string;
}

const HeaderSection: React.FC<HeaderSectionProps> = ({ farmName }) => (
  <View style={styles.headerContainer}>
    <View style={styles.headerContent}>
      <View style={styles.headerIconContainer}>
        <MaterialCommunityIcons
          name="barn"
          size={ICON_SIZES.header}
          color={COLORS.primary}
        />
      </View>
      <View style={styles.headerTextContainer}>
        <Text style={styles.farmName}>{farmName}</Text>
        <Text style={styles.headerSubtext}>
          Dairy Farm Dashboard
        </Text>
      </View>
    </View>
    <TouchableOpacity style={styles.notificationButton}>
      <MaterialCommunityIcons
        name="bell"
        size={ICON_SIZES.notification}
        color={COLORS.primary}
      />
      <View style={styles.notificationBadge}>
        <Text style={styles.notificationCount}>3</Text>
      </View>
    </TouchableOpacity>
  </View>
);

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
}) => (
  <View
    style={[
      styles.statCard,
      compact && styles.statCardCompact,
      containerStyle,
      fullWidth && styles.statCardFullWidth,
    ]}
  >
    <View
      style={[styles.iconContainer, { backgroundColor }]}
    >
      <MaterialCommunityIcons
        name={icon}
        size={ compact ?18 :ICON_SIZES.stat}
        color={iconColor}
      />
    </View>
    <View style={styles.statContent}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statSubtext}>{subtext}</Text>
    </View>
  </View>
);

interface SectionTitleProps {
  title: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
}) => (
  <View style={styles.sectionTitleContainer}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <View style={styles.sectionDivider} />
  </View>
);

interface ActivityListProps {
  activities: Activity[];
}

const ActivityList: React.FC<ActivityListProps> = ({
  activities,
}) => (
  <View style={styles.activityContainer}>
    {activities.map((activity) => (
      <View
        key={activity.id}
        style={styles.activityItem}
      >
        <View style={styles.activityDot} />
        <View style={styles.activityContent}>
          <Text style={styles.activityMessage}>
            {activity.message}
          </Text>
          <Text style={styles.activityTime}>
            {activity.time}
          </Text>
        </View>
      </View>
    ))}
  </View>
);

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
  statCardCompact: {
  paddingVertical: 8,
  paddingHorizontal: 10,
  borderRadius: 12,
},

  statCardFullWidth: {
    width: '100%',
    marginRight: 0,
  },
  iconContainer: {
    width: 42,
    height: 42,
    borderRadius: 221,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statContent: {
    flex: 1,
  },
  statLabel: {
    fontSize: 11,
    color: COLORS.gray600,
    marginBottom: 6,
    fontWeight: '500',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.gray800,
    marginBottom: 8,
  },
  statSubtext: {
    fontSize: 10,
    color: COLORS.primary,
    fontWeight: '600',
  },

  cardRowTwo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  statCardTwo: {
    width: '49%',
  },
  statCardTwoLast: {
    marginRight: 0,
  },

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

  bottomSpacing: {
    height: 40,
  },
});

export default DashboardScreen;
