import '@/global.css';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { initializeSaintsStore } from '@/lib/store/saints';

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const statusBarStyle = useColorScheme() === 'dark' ? 'light' : 'dark';

  useEffect(() => {
    async function initialize() {
      try {
        // Initialize saints data store
        initializeSaintsStore();
      } catch (error) {
        console.error('Failed to initialize app:', error);
      } finally {
        // Hide splash screen
        await SplashScreen.hideAsync();
      }
    }

    initialize();
  }, []);

  return (
    <>
      <StatusBar style={statusBarStyle} />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="saint/[id]"
          options={{
            title: '성인 상세',
            headerBackTitle: '뒤로',
          }}
        />
        <Stack.Screen name="+not-found" />
      </Stack>
    </>
  );
}
