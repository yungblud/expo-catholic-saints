import { useMemo } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const ESTIMATED_BOTTOM_SPACE_FOR_TAB_BAR = 150;

export const SafeArea = ({
  children,
  withBottomTabBar = false,
  style,
}: {
  children: React.ReactNode;
  withBottomTabBar?: boolean;
  style?: StyleProp<ViewStyle>;
}) => {
  const insets = useSafeAreaInsets();
  const edgeStyles: StyleProp<ViewStyle> = useMemo(() => {
    const styles = {
      paddingTop: insets.top,
      paddingBottom: withBottomTabBar ? ESTIMATED_BOTTOM_SPACE_FOR_TAB_BAR : 0,
    };
    return styles;
  }, [insets, withBottomTabBar]);
  return <View style={[style, { flex: 1, backgroundColor: 'white' }, edgeStyles]}>{children}</View>;
};
