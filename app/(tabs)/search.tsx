import { CommonMetaHead } from '@/components/meta/CommonMetaHead';
import { SaintCard } from '@/components/saints/SaintCard';
import { SearchInput } from '@/components/search/SearchInput';
import { EmptyState } from '@/components/ui/EmptyState';
import { useSearch } from '@/lib/hooks/useSearch';
import { Saint, SearchResult } from '@/lib/types/saints';
import { useScrollToTop } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import React, { useCallback, useRef } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

export default function SearchScreen() {
  const router = useRouter();
  const { results, query, search } = useSearch({ mode: 'name', limit: 50 });
  const listRef = useRef<FlatList<SearchResult>>(null);
  useScrollToTop(listRef);

  const handleSaintPress = useCallback(
    (saint: Saint) => {
      router.push(`/saint/${saint.id}`);
    },
    [router]
  );

  const renderItem = useCallback(
    ({ item }: { item: SearchResult }) => (
      <SaintCard
        saint={item.saint}
        onPress={handleSaintPress}
        testID={`saint-card-${item.saint.id}`}
      />
    ),
    [handleSaintPress]
  );

  const keyExtractor = useCallback((item: SearchResult) => item.saint.id, []);

  const renderEmptyComponent = useCallback(() => {
    if (!query) {
      return (
        <EmptyState
          title="성인 검색"
          message="성인의 한글, 영어, 또는 라틴어 이름으로 검색하세요."
          icon="search-outline"
          testID="empty-state-initial"
        />
      );
    }
    return (
      <EmptyState
        title="검색 결과 없음"
        message={`"${query}"에 해당하는 성인을 찾을 수 없습니다.\n다른 검색어를 시도해 보세요.`}
        icon="alert-circle-outline"
        testID="empty-state-no-results"
      />
    );
  }, [query]);

  return (
    <>
      <CommonMetaHead
        title="검색"
        description="카톨릭 성인의 이름, 영어, 또는 라틴어 이름으로 검색하세요."
      />
      <View style={styles.container}>
        <SearchInput
          value={query}
          onChangeText={search}
          placeholder="성인 이름 검색..."
          testID="search-input"
          autoFocus
        />

        <FlatList
          ref={listRef}
          data={results}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          ListEmptyComponent={renderEmptyComponent}
          contentContainerStyle={results.length === 0 ? styles.emptyContainer : undefined}
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
