import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Saint } from '@/lib/types/saints';
import { SaintAvatar } from './SaintAvatar';
import { formatFeastDayKo } from '@/lib/utils/dateUtils';
import { useColorScheme } from '@coldsurfers/ocean-road/native';

interface SaintCardProps {
  saint: Saint;
  onPress: (saint: Saint) => void;
  isFavorite?: boolean;
  onFavoriteToggle?: (saintId: string) => void;
  testID?: string;
}

export function SaintCard({
  saint,
  onPress,
  isFavorite = false,
  onFavoriteToggle,
  testID,
}: SaintCardProps) {
  const { semantics } = useColorScheme();
  const handlePress = () => {
    onPress(saint);
  };

  const handleFavoritePress = () => {
    onFavoriteToggle?.(saint.id);
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: semantics.background[1],
        },
      ]}
      onPress={handlePress}
      testID={testID}
      accessibilityLabel={`${saint.nameKo}, ${formatFeastDayKo(saint.feastMonth, saint.feastDay)} 축일`}
      accessibilityRole="button"
    >
      <SaintAvatar initials={saint.initials} size="medium" />

      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>
          {saint.nameKo}
        </Text>
        <Text style={styles.feastDay}>{formatFeastDayKo(saint.feastMonth, saint.feastDay)}</Text>
        {saint.patronages.length > 0 && (
          <Text style={styles.patronages} numberOfLines={1}>
            {saint.patronages.slice(0, 3).join(' · ')}
          </Text>
        )}
      </View>

      {onFavoriteToggle && (
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={handleFavoritePress}
          testID="favorite-button"
          accessibilityLabel={isFavorite ? '즐겨찾기 해제' : '즐겨찾기 추가'}
          accessibilityRole="button"
        >
          <Ionicons
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={24}
            color={isFavorite ? '#ef4444' : '#9ca3af'}
            testID={isFavorite ? 'favorite-icon' : undefined}
          />
        </TouchableOpacity>
      )}

      {!onFavoriteToggle && isFavorite && (
        <Ionicons
          name="heart"
          size={20}
          color="#ef4444"
          style={styles.favoriteIndicator}
          testID="favorite-icon"
        />
      )}

      <Ionicons name="chevron-forward" size={20} color="#d1d5db" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  content: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 2,
  },
  feastDay: {
    fontSize: 14,
    color: '#0ea5e9',
    marginBottom: 2,
  },
  patronages: {
    fontSize: 12,
    color: '#6b7280',
  },
  favoriteButton: {
    padding: 8,
    marginRight: 4,
  },
  favoriteIndicator: {
    marginRight: 8,
  },
});
