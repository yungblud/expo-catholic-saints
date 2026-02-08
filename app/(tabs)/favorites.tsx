import { EmptyState } from '@/components/ui/EmptyState';
import { FEATURE_FLAGS } from '@/lib/constants/featureFlags';
import { Redirect } from 'expo-router';
import { StyleSheet, View } from 'react-native';

export default function FavoritesScreen() {
  if (!FEATURE_FLAGS.favorites) {
    return <Redirect href="/+not-found" />;
  }
  return (
    <View style={styles.container}>
      <EmptyState
        title="즐겨찾기"
        message="즐겨찾기 기능은 Phase 6에서 구현됩니다."
        icon="heart-outline"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});
