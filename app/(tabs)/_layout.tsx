import NativeTabsLayout from '@/components/tabs/NativeTabsLayout';
import OldLegacyTabs from '@/components/tabs/OldLegacyTabs';
import { Platform } from 'react-native';

export default function TabLayout() {
  if (Platform.OS === 'web') {
    return <OldLegacyTabs />;
  }

  return <NativeTabsLayout />;
}
