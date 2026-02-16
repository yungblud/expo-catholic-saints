import { CommonMetaHead } from '@/components/meta/CommonMetaHead';
import { LoadingState } from '@/components/ui/LoadingState';
import '@/global.css';
import { initializeSaintsStore } from '@/lib/store/saints';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();
SplashScreen.setOptions({
  duration: 300,
  fade: true,
});

export default function RootLayout() {
  const [isInitialized, setIsInitialized] = useState(false);
  useEffect(() => {
    async function initialize() {
      try {
        // Initialize saints data store
        await initializeSaintsStore();
      } catch (error) {
        console.error('Failed to initialize app:', error);
      } finally {
        setIsInitialized(true);
        // Hide splash screen
        await SplashScreen.hideAsync();
      }
    }

    initialize();
  }, []);

  return (
    <>
      <CommonMetaHead />
      {isInitialized ? (
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
            <Stack.Screen name="privacy-policy" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
        </>
      ) : (
        <LoadingState />
      )}
    </>
  );
}
