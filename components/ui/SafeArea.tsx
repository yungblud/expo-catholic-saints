import { StyleProp, ViewStyle } from 'react-native';
import { Edge, SafeAreaView } from 'react-native-safe-area-context';

export const ESTIMATED_BOTTOM_SPACE_FOR_TAB_BAR = 150;

export const SafeArea = ({
  children,
  edges = ['top'],
  withBottomTabBar = false,
  style,
}: {
  children: React.ReactNode;
  edges?: Edge[];
  withBottomTabBar?: boolean;
  style?: StyleProp<ViewStyle>;
}) => {
  const bottomSpace = withBottomTabBar ? ESTIMATED_BOTTOM_SPACE_FOR_TAB_BAR : 0;
  return (
    <SafeAreaView edges={edges} style={[style, { flex: 1, paddingBottom: bottomSpace }]}>
      {children}
    </SafeAreaView>
  );
};
