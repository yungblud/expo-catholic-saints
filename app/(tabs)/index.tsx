import { View, StyleSheet } from 'react-native';
import { EmptyState } from '@/components/ui/EmptyState';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <EmptyState
        title="오늘의 성인"
        message="축일 기능은 User Story 2에서 구현됩니다."
        icon="calendar-outline"
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
