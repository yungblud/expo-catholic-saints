import { CommonMetaHead } from '@/components/meta/CommonMetaHead';
import { LoadingState } from '@/components/ui/LoadingState';
import '@/global.css';
import { initializeSaintsStore } from '@/lib/store/saints';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import * as Updates from 'expo-updates';
import { useEffect, useState } from 'react';
import { ColorSchemeProvider } from '@coldsurfers/ocean-road/native';

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

        // Hide splash screen
        await SplashScreen.hideAsync();

        // check EAS OTA Update
        if (!__DEV__) {
          const update = await Updates.checkForUpdateAsync();
          if (update.isAvailable) {
            await Updates.fetchUpdateAsync();
            // 즉시 재시작 (강제 업데이트)
            await Updates.reloadAsync();
          }
        }
      } catch (error) {
        console.error('Failed to initialize app:', error);
      } finally {
        setIsInitialized(true);
      }
    }

    initialize();
  }, []);

  return (
    <ColorSchemeProvider initialColorScheme="light">
      <StatusBar style="dark" />
      <CommonMetaHead />
      {isInitialized ? (
        <>
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
    </ColorSchemeProvider>
  );
}
