# Data Model: Catholic Saints Search

**Feature**: 001-saints-search
**Date**: 2026-01-28

## Entities

### Saint (성인)

카톨릭 성인의 정보를 나타내는 핵심 엔티티.

```typescript
interface Saint {
  // Identity
  id: string;                    // Unique identifier (e.g., "francis-assisi")

  // Names (searchable)
  nameKo: string;                // 한글 이름 (e.g., "아시시의 성 프란치스코")
  nameEn: string;                // 영어 이름 (e.g., "Saint Francis of Assisi")
  nameLatin?: string;            // 라틴어 이름 (optional)
  shortName: string;             // 약칭 (e.g., "프란치스코")

  // Feast Day
  feastMonth: number;            // 축일 월 (1-12)
  feastDay: number;              // 축일 일 (1-31)

  // Patronage
  patronages: string[];          // 수호 분야 (e.g., ["동물", "환경", "이탈리아"])
  patronageCategories: PatronageCategory[]; // 카테고리 분류

  // Biography
  biography: string;             // 약력 (한글, 200-500자)

  // Dates
  birthYear?: number;            // 출생 연도 (unknown인 경우 null)
  deathYear?: number;            // 사망 연도
  canonizationYear?: number;     // 시성 연도

  // Display
  initials: string;              // 아바타용 이니셜 (e.g., "프")
}
```

**Validation Rules**:
- `id`: Required, unique, lowercase alphanumeric with hyphens
- `nameKo`: Required, non-empty string
- `nameEn`: Required, non-empty string
- `feastMonth`: Required, integer 1-12
- `feastDay`: Required, integer 1-31, valid for the month
- `patronages`: Array, can be empty
- `biography`: Required, minimum 50 characters
- `initials`: Auto-generated from `shortName` first character

### PatronageCategory (수호 분야 카테고리)

수호성인 분야의 분류 체계.

```typescript
type PatronageCategory =
  | 'occupation'   // 직업 (의사, 교사, 농부 등)
  | 'location'     // 지역/국가 (이탈리아, 한국 등)
  | 'situation'    // 상황 (여행자, 학생, 병자 등)
  | 'illness'      // 질병 (두통, 눈병 등)
  | 'cause'        // 대의 (평화, 환경 등)
  | 'other';       // 기타
```

### Favorite (즐겨찾기)

사용자가 저장한 성인 목록.

```typescript
interface Favorite {
  saintId: string;               // Saint.id 참조
  addedAt: number;               // Unix timestamp (ms)
}
```

**Validation Rules**:
- `saintId`: Required, must exist in Saints data
- `addedAt`: Required, valid timestamp

**Storage**: AsyncStorage에 영속화

### FeastDayIndex (축일 인덱스)

빠른 축일 조회를 위한 인덱스 구조 (런타임 생성).

```typescript
interface FeastDayIndex {
  [monthDay: string]: string[];  // "01-15" -> ["saint-id-1", "saint-id-2"]
}
```

## Relationships

```
┌─────────────┐
│   Saint     │
├─────────────┤
│ id (PK)     │◄────────────┐
│ nameKo      │             │
│ nameEn      │             │
│ feastMonth  │             │
│ feastDay    │             │
│ patronages  │             │
│ ...         │             │
└─────────────┘             │
       │                    │
       │ 1:N                │
       ▼                    │
┌─────────────────┐         │
│ PatronageCategory│         │
└─────────────────┘         │
                            │
┌─────────────┐             │
│  Favorite   │             │
├─────────────┤             │
│ saintId(FK) │─────────────┘
│ addedAt     │
└─────────────┘
```

## TinyBase Store Schema

```typescript
// Store Tables
const saintsTable = {
  tableName: 'saints',
  schema: {
    id: { type: 'string' },
    nameKo: { type: 'string' },
    nameEn: { type: 'string' },
    nameLatin: { type: 'string' },
    shortName: { type: 'string' },
    feastMonth: { type: 'number' },
    feastDay: { type: 'number' },
    patronages: { type: 'string' }, // JSON serialized array
    patronageCategories: { type: 'string' }, // JSON serialized array
    biography: { type: 'string' },
    birthYear: { type: 'number' },
    deathYear: { type: 'number' },
    canonizationYear: { type: 'number' },
    initials: { type: 'string' },
  }
};

const favoritesTable = {
  tableName: 'favorites',
  schema: {
    saintId: { type: 'string' },
    addedAt: { type: 'number' },
  }
};

// Indexes for fast queries
const indexes = {
  // Feast day lookup: "MM-DD" -> saint ids
  byFeastDay: {
    tableId: 'saints',
    cellId: (row) => `${row.feastMonth.toString().padStart(2, '0')}-${row.feastDay.toString().padStart(2, '0')}`
  },
  // Patronage category lookup
  byPatronageCategory: {
    tableId: 'saints',
    cellId: 'patronageCategories' // Requires iteration for array matching
  }
};
```

## Sample Data

```json
{
  "saints": [
    {
      "id": "francis-assisi",
      "nameKo": "아시시의 성 프란치스코",
      "nameEn": "Saint Francis of Assisi",
      "nameLatin": "Franciscus Assisiensis",
      "shortName": "프란치스코",
      "feastMonth": 10,
      "feastDay": 4,
      "patronages": ["동물", "환경", "이탈리아", "상인"],
      "patronageCategories": ["cause", "location", "occupation"],
      "biography": "아시시의 성 프란치스코(1181/1182-1226)는 이탈리아의 수도자이자 프란치스코회의 창설자입니다. 부유한 상인의 아들로 태어났으나 모든 것을 버리고 가난과 청빈의 삶을 선택했습니다. 자연과 동물을 사랑하여 '피조물의 찬가'를 지었으며, 가톨릭교회에서 환경 수호성인으로 공경받습니다.",
      "birthYear": 1182,
      "deathYear": 1226,
      "canonizationYear": 1228,
      "initials": "프"
    },
    {
      "id": "andrew-kim",
      "nameKo": "성 김대건 안드레아",
      "nameEn": "Saint Andrew Kim Taegon",
      "nameLatin": "Andreas Kim Taegon",
      "shortName": "김대건",
      "feastMonth": 9,
      "feastDay": 20,
      "patronages": ["한국", "성직자", "한국 천주교회"],
      "patronageCategories": ["location", "occupation"],
      "biography": "성 김대건 안드레아(1821-1846)는 한국 최초의 천주교 사제입니다. 조선 시대 박해 속에서 중국 마카오에서 신학을 공부하고 사제로 서품되었습니다. 귀국 후 선교 활동을 하다가 체포되어 26세의 나이로 순교하였습니다. 1984년 성인품에 올랐습니다.",
      "birthYear": 1821,
      "deathYear": 1846,
      "canonizationYear": 1984,
      "initials": "김"
    }
  ]
}
```

## State Transitions

### Favorite State

```
┌──────────┐    addFavorite()    ┌──────────┐
│ Not      │ ─────────────────► │ Favorited│
│ Favorited│                     │          │
└──────────┘ ◄───────────────── └──────────┘
              removeFavorite()
```

## Query Patterns

### 1. Search by Name (FR-001, FR-002)
```typescript
// Fuse.js search across nameKo, nameEn, nameLatin, shortName
const results = fuse.search(query, { limit: 50 });
```

### 2. Filter by Feast Day (FR-004)
```typescript
// O(1) lookup using FeastDayIndex
const saintIds = feastDayIndex[`${month}-${day}`];
const saints = saintIds.map(id => store.getRow('saints', id));
```

### 3. Search by Patronage (FR-005)
```typescript
// Filter by patronage text or category
const results = store.getTable('saints')
  .filter(saint =>
    saint.patronages.some(p => p.includes(query)) ||
    saint.patronageCategories.includes(category)
  );
```

### 4. Get Favorites (FR-007)
```typescript
// Join favorites with saints
const favorites = store.getTable('favorites');
const favoriteSaints = favorites.map(f => store.getRow('saints', f.saintId));
```
