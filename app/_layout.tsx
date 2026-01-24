import LanguageProvider from '@/constants/localization/LanguageContext';
import DrawerContent from '@/navigation/Drawer';
import ThemeProvider from '@/theme/ThemeProvider';
import { Drawer } from 'expo-router/drawer';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
    <ThemeProvider>
      <LanguageProvider>
        <Drawer
          drawerContent={() => <DrawerContent />}
          screenOptions={{
            headerShown: false,
          }}
        >
           <Drawer.Screen
            name="(tabs)"
            options={{ title: 'Home' }}
          />
        </Drawer>
      </LanguageProvider>
    </ThemeProvider>
    </SafeAreaProvider>
  );
}
