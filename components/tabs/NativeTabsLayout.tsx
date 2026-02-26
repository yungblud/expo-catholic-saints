import { useNavigationTheme } from '@/components/navigation/NavigationThemeProvider';
import { Icon, Label, NativeTabs } from 'expo-router/unstable-native-tabs';

export default function NativeTabsLayout() {
  const { backgroundColor } = useNavigationTheme();

  return (
    <NativeTabs backgroundColor={backgroundColor}>
      <NativeTabs.Trigger name="index" options={{ backgroundColor }}>
        <Label>모아보기</Label>
        <Icon sf="house.fill" drawable="custom_android_drawable" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="search" options={{ backgroundColor }}>
        <Label>검색</Label>
        <Icon sf="magnifyingglass" drawable="custom_android_drawable" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="favorites" options={{ backgroundColor }}>
        <Label>즐겨찾기</Label>
        <Icon sf="heart.fill" drawable="custom_android_drawable" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
