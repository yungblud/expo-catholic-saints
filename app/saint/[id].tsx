import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { SaintDetail } from '@/components/saints/SaintDetail';
import { LoadingState } from '@/components/ui/LoadingState';
import { EmptyState } from '@/components/ui/EmptyState';
import { getSaint } from '@/lib/store/saints';
import { Saint } from '@/lib/types/saints';

export default function SaintDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [saint, setSaint] = useState<Saint | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (id) {
      const foundSaint = getSaint(id);
      setSaint(foundSaint ?? null);
      setIsLoading(false);
    }
  }, [id]);

  const handleFavoriteToggle = () => {
    setIsFavorite((prev) => !prev);
    // TODO: Persist favorite state in Phase 6
  };

  if (isLoading) {
    return <LoadingState message="성인 정보를 불러오는 중..." />;
  }

  if (!saint) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: '성인을 찾을 수 없음' }} />
        <EmptyState
          title="성인을 찾을 수 없습니다"
          message="요청하신 성인 정보를 찾을 수 없습니다."
          icon="alert-circle-outline"
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: saint.shortName }} />
      <SaintDetail saint={saint} isFavorite={isFavorite} onFavoriteToggle={handleFavoriteToggle} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});
