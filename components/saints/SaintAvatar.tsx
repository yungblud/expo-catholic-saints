import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface SaintAvatarProps {
  initials: string;
  size?: 'small' | 'medium' | 'large';
  testID?: string;
}

const SIZES = {
  small: { container: 32, text: 14 },
  medium: { container: 48, text: 20 },
  large: { container: 80, text: 32 },
};

const COLORS = [
  '#0ea5e9', // sky-500
  '#8b5cf6', // violet-500
  '#ec4899', // pink-500
  '#f97316', // orange-500
  '#10b981', // emerald-500
  '#6366f1', // indigo-500
];

/**
 * Get a consistent color based on the initials
 */
function getColorForInitials(initials: string): string {
  const charCode = initials.charCodeAt(0) || 0;
  return COLORS[charCode % COLORS.length];
}

export function SaintAvatar({ initials, size = 'medium', testID }: SaintAvatarProps) {
  const dimensions = SIZES[size];
  const backgroundColor = getColorForInitials(initials);

  return (
    <View
      testID={testID}
      style={[
        styles.container,
        {
          width: dimensions.container,
          height: dimensions.container,
          borderRadius: dimensions.container / 2,
          backgroundColor,
        },
      ]}
      accessibilityLabel={`${initials} 아바타`}
      accessibilityRole="image"
    >
      <Text
        style={[
          styles.text,
          {
            fontSize: dimensions.text,
          },
        ]}
      >
        {initials}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#ffffff',
    fontWeight: '600',
  },
});
