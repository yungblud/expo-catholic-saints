# Quickstart: Catholic Saints Search

**Feature**: 001-saints-search
**Prerequisites**: Node.js 20+, Expo CLI, iOS Simulator / Android Emulator

## 1. Project Setup

```bash
# Create Expo project (if starting fresh)
npx create-expo-app@latest spec-kit-expo-app --template tabs
cd spec-kit-expo-app

# Install dependencies
npm install tinybase fuse.js
npm install -D @types/fuse.js

# Install NativeWind for styling
npm install nativewind
npm install -D tailwindcss@3.3.2

# Initialize Tailwind
npx tailwindcss init
```

## 2. Configure Tailwind (tailwind.config.js)

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

## 3. Configure Babel (babel.config.js)

```javascript
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['nativewind/babel'],
  };
};
```

## 4. Add Saint Data

Create `data/saints.json`:

```json
{
  "version": "1.0.0",
  "lastUpdated": "2026-01-28T00:00:00Z",
  "saints": [
    {
      "id": "francis-assisi",
      "nameKo": "아시시의 성 프란치스코",
      "nameEn": "Saint Francis of Assisi",
      "shortName": "프란치스코",
      "feastMonth": 10,
      "feastDay": 4,
      "patronages": ["동물", "환경"],
      "patronageCategories": ["cause"],
      "biography": "아시시의 성 프란치스코는 이탈리아의 수도자이자 프란치스코회의 창설자입니다...",
      "birthYear": 1182,
      "deathYear": 1226,
      "canonizationYear": 1228,
      "initials": "프"
    }
  ]
}
```

## 5. Initialize TinyBase Store

Create `lib/store/saints.ts`:

```typescript
import { createStore } from 'tinybase';
import saintsData from '../../data/saints.json';

const store = createStore();

export function initializeSaintsStore() {
  saintsData.saints.forEach((saint) => {
    store.setRow('saints', saint.id, {
      ...saint,
      patronages: JSON.stringify(saint.patronages),
      patronageCategories: JSON.stringify(saint.patronageCategories),
    });
  });
}

export { store };
```

## 6. Create Search Hook

Create `lib/hooks/useSearch.ts`:

```typescript
import Fuse from 'fuse.js';
import { useMemo, useState, useCallback } from 'react';
import { store } from '../store/saints';
import type { Saint, SearchResult } from '../../specs/001-saints-search/contracts/saints.schema';

export function useSearch() {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const fuse = useMemo(() => {
    const saints = Object.values(store.getTable('saints'));
    return new Fuse(saints, {
      keys: ['nameKo', 'nameEn', 'nameLatin', 'shortName'],
      threshold: 0.3,
      includeScore: true,
    });
  }, []);

  const search = useCallback((query: string) => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    setIsSearching(true);
    const fuseResults = fuse.search(query, { limit: 50 });
    setResults(fuseResults.map(r => ({
      saint: r.item as Saint,
      score: 1 - (r.score ?? 0),
      matchedField: r.matches?.[0]?.key ?? 'nameKo',
    })));
    setIsSearching(false);
  }, [fuse]);

  const clear = useCallback(() => setResults([]), []);

  return { results, isSearching, search, clear };
}
```

## 7. Create Basic Screen

Update `app/(tabs)/search.tsx`:

```typescript
import { useState, useCallback } from 'react';
import { View, TextInput, FlatList, Text, Pressable } from 'react-native';
import { useSearch } from '../../lib/hooks/useSearch';
import { SaintCard } from '../../components/saints/SaintCard';
import { useRouter } from 'expo-router';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const { results, search } = useSearch();
  const router = useRouter();

  const handleSearch = useCallback((text: string) => {
    setQuery(text);
    search(text);
  }, [search]);

  return (
    <View className="flex-1 bg-white">
      <TextInput
        className="m-4 p-3 border border-gray-300 rounded-lg"
        placeholder="성인 이름 검색..."
        value={query}
        onChangeText={handleSearch}
      />
      <FlatList
        data={results}
        keyExtractor={(item) => item.saint.id}
        renderItem={({ item }) => (
          <SaintCard
            saint={item.saint}
            onPress={() => router.push(`/saint/${item.saint.id}`)}
          />
        )}
        ListEmptyComponent={
          query ? (
            <Text className="text-center text-gray-500 mt-8">
              검색 결과가 없습니다
            </Text>
          ) : null
        }
      />
    </View>
  );
}
```

## 8. Run the App

```bash
# Start development server
npx expo start

# Press 'i' for iOS Simulator
# Press 'a' for Android Emulator
```

## 9. Run Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

## Key File Locations

| Purpose | Location |
|---------|----------|
| Saint data | `data/saints.json` |
| TinyBase store | `lib/store/saints.ts` |
| Favorites store | `lib/store/favorites.ts` |
| Search logic | `lib/search/searchSaints.ts` |
| Custom hooks | `lib/hooks/` |
| Screen components | `app/` |
| Reusable components | `components/` |
| Data contracts | `specs/001-saints-search/contracts/` |

## Testing Checklist

- [ ] Search returns results for Korean names (e.g., "프란치스코")
- [ ] Search returns results for English names (e.g., "Francis")
- [ ] Today's feast day saints display on home screen
- [ ] Date picker changes feast day display
- [ ] Favorites persist across app restarts
- [ ] Empty state shows when no results
- [ ] App works offline (airplane mode)

## Common Issues

### "Cannot find module 'tinybase'"
```bash
npm install tinybase
```

### NativeWind styles not applying
1. Ensure `babel.config.js` has `nativewind/babel` plugin
2. Run `npx expo start --clear` to clear cache

### TypeScript errors for saint data
Ensure `data/saints.json` matches the schema in `contracts/saints.schema.ts`
