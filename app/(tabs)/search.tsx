import { View, Text, StyleSheet } from 'react-native';
import { EmptyState } from '@/components/ui/EmptyState';

export default function SearchScreen() {
  return (
    <View style={styles.container}>
      <EmptyState
        title="성인 검색"
        message="검색 기능은 User Story 1에서 구현됩니다."
        icon="search-outline"
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
