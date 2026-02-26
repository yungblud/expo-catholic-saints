import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { createContext, useContext } from 'react';
import { ColorValue, DynamicColorIOS, Platform, useColorScheme } from 'react-native';

const iosBackgroundColor = DynamicColorIOS({
  dark: DarkTheme.colors.background,
  light: DefaultTheme.colors.background,
});

type NavigationThemeContextValue = {
  backgroundColor: ColorValue;
};

const NavigationThemeContext = createContext<NavigationThemeContextValue>({
  backgroundColor: DefaultTheme.colors.background,
});

export const useNavigationTheme = () => useContext(NavigationThemeContext);

export function NavigationThemeProvider({ children }: { children: React.ReactNode }) {
  const colorScheme = useColorScheme();

  const backgroundColor: ColorValue =
    Platform.OS === 'ios'
      ? iosBackgroundColor
      : colorScheme === 'dark'
        ? DarkTheme.colors.background
        : DefaultTheme.colors.background;

  return (
    <NavigationThemeContext.Provider value={{ backgroundColor }}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        {children}
      </ThemeProvider>
    </NavigationThemeContext.Provider>
  );
}
