import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Icon, Label, NativeTabs } from 'expo-router/unstable-native-tabs';
import { DynamicColorIOS, Platform, useColorScheme } from 'react-native';

const iosBackgroundColor = DynamicColorIOS({
  dark: DarkTheme.colors.background,
  light: DefaultTheme.colors.background,
});

export default function NativeTabsLayout() {
  const colorScheme = useColorScheme();

  const backgroundColor =
    Platform.OS === 'ios'
      ? iosBackgroundColor
      : colorScheme === 'dark'
        ? DarkTheme.colors.background
        : DefaultTheme.colors.background;

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
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
    </ThemeProvider>
  );
}
