import AppText from '@/components/common/AppText';
import { useLanguage } from '@/constants/localization/useLanguage';
import BottomTabBar from '@/navigation/BottomNavigationBar';
import { useTheme } from '@/theme/useTheme';
import { Tabs, useNavigation } from 'expo-router';
import { List, UserCircle } from 'phosphor-react-native';
import { StyleSheet, TouchableOpacity } from 'react-native';


export default function TabsLayout() {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const { t } = useLanguage();

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: colors.card,
        },
        headerTitleStyle: {
          color: colors.text,
        },
        headerLeft: () => (
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => navigation.openDrawer()}
          >
            <List size={28} color={colors.text} />
          </TouchableOpacity>
        ),
        headerTitle: ({ children }) => (
          <AppText style={{ color: colors.text, fontSize: 20, paddingLeft: 10}}>
            {children}
          </AppText>
        ),
        headerRight: () => (
          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => {
              // TODO: navigate to profile later
              console.log('Profile pressed');
            }}
          >
            <UserCircle size={30} color={colors.text} />
          </TouchableOpacity>
        ),
      }}
      tabBar={(props) => <BottomTabBar {...props} />}
    >
      <Tabs.Screen name="index" options={{ title: t.home }} />
      <Tabs.Screen name="lactation" options={{ title: t.lactation }} />
      <Tabs.Screen name="search" options={{ title: t.home }} />
      <Tabs.Screen name="feed" options={{ title: t.feed}} />
      <Tabs.Screen name="profit" options={{ title: t.profit }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
  },
  item: {
    flexDirection: 'row',
    gap: 12,
    marginVertical: 12,
    alignItems: 'center',
  },
  menuButton: {
    marginLeft: 12,
    paddingLeft: 3,
  },
  profileButton: {
    marginRight: 12,
  },
});
