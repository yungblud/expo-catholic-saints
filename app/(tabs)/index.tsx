import { EmptyState } from '@/components/ui/EmptyState';
import { FEATURE_FLAGS } from '@/lib/constants/featureFlags';
import { Redirect } from 'expo-router';
import { StyleSheet, View } from 'react-native';

export default function HomeScreen() {
  if (!FEATURE_FLAGS['today-saints']) {
    return <Redirect href="/search" />;
  }
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
