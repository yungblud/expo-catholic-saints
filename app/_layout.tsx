import '@/global.css';
import { initializeSaintsStore } from '@/lib/store/saints';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();
SplashScreen.setOptions({
  duration: 300,
  fade: true,
});

export default function RootLayout() {
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
      <StatusBar style="dark" />
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
