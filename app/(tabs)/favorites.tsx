import { CommonMetaHead } from '@/components/meta/CommonMetaHead';
import { SaintCard } from '@/components/saints/SaintCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { getFavorites, getSaint, getStore } from '@/lib/store/saints';
import { useScrollToTop } from '@react-navigation/native';
import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { FlatList, ListRenderItem, StyleSheet, View } from 'react-native';

const renderItem: ListRenderItem<string> = ({ item }) => {
  const saint = getSaint(item);
  if (!saint) return null;
  return (
    <SaintCard
      saint={saint}
      onPress={() => router.push(`/saint/${saint.id}`)}
      testID={`saint-card-${saint.id}`}
    />
  );
};

const keyExtractor = (item: string) => item;

const renderEmptyComponent = () => {
  return <EmptyState title="즐겨찾기" message="즐겨찾기를 추가해 보세요." icon="heart-outline" />;
};

export default function FavoritesScreen() {
  const [favorites, setFavorites] = useState<string[]>(() => getFavorites());
  const listRef = useRef<FlatList<string>>(null);
  useScrollToTop(listRef);

  useEffect(() => {
    const store = getStore();
    const listenerId = store.addCellListener('favorites', null, 'isFavorite', () => {
      setFavorites(getFavorites());
    });

    return () => {
      store.delListener(listenerId);
    };
  }, []);

  return (
    <>
      <CommonMetaHead title="즐겨찾기" description="북마크한 카톨릭 성인들을 모아보세요." />
      <View style={styles.container}>
        <FlatList
          ref={listRef}
          data={favorites}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          ListEmptyComponent={renderEmptyComponent}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={5}
          contentContainerStyle={favorites.length === 0 ? styles.emptyContainer : undefined}
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
