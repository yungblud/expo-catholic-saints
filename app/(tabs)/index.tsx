import { CommonMetaHead } from '@/components/meta/CommonMetaHead';
import { SaintCard } from '@/components/saints/SaintCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { getAllSaints } from '@/lib/store/saints';
import { Saint } from '@/lib/types/saints';
import { router } from 'expo-router';
import { useMemo } from 'react';
import { FlatList, ListRenderItem, StyleSheet, View } from 'react-native';

const renderItem: ListRenderItem<Saint> = ({ item }) => {
  return (
    <SaintCard
      saint={item}
      onPress={() => router.push(`/saint/${item.id}`)}
      testID={`saint-card-${item.id}`}
    />
  );
};

const keyExtractor = (item: Saint) => item.id;

const renderEmptyComponent = () => {
  return <EmptyState title="성인 모아보기" message="성인을 모아보세요." icon="calendar-outline" />;
};

export default function HomeScreen() {
  const allSaints = useMemo(() => getAllSaints(), []);
  return (
    <>
      <CommonMetaHead title="모아보기" description="카톨릭 성인을 모아보세요." />
      <View style={styles.container}>
        <FlatList
          data={allSaints}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          ListEmptyComponent={renderEmptyComponent}
          contentContainerStyle={allSaints.length === 0 ? styles.emptyContainer : undefined}
          keyboardShouldPersistTaps="handled"
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={5}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  emptyContainer: {
    flex: 1,
  },
});
