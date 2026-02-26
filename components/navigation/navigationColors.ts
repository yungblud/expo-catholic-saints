import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { DynamicColorIOS } from 'react-native';

export const iosBackgroundColor = DynamicColorIOS({
  dark: DarkTheme.colors.background,
  light: DefaultTheme.colors.background,
});
