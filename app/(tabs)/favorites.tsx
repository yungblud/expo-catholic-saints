import { View, StyleSheet } from 'react-native';
import { EmptyState } from '@/components/ui/EmptyState';

export default function FavoritesScreen() {
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
