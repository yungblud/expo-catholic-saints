# Tasks: Catholic Saints Search

**Input**: Design documents from `/specs/001-saints-search/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, contracts/

**Tests**: Included per Constitution (Test-First Development is NON-NEGOTIABLE)

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story?] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Mobile (Expo)**: `app/`, `components/`, `lib/`, `data/`, `__tests__/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Create Expo project with TypeScript template using `npx create-expo-app`
- [x] T002 Install core dependencies (tinybase, fuse.js, zod) in package.json
- [x] T003 [P] Install and configure NativeWind with tailwind.config.js
- [x] T004 [P] Configure Jest and React Native Testing Library in jest.config.js
- [x] T005 [P] Setup ESLint and Prettier configuration in .eslintrc.js and .prettierrc
- [x] T006 Create project directory structure per plan.md (app/, components/, lib/, data/)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

### Tests for Foundational

- [x] T007 [P] Unit test for Saint type validation in lib/store/__tests__/saints.test.ts
- [x] T008 [P] Unit test for dateUtils functions in lib/utils/__tests__/dateUtils.test.ts
- [x] T009 [P] Unit test for stringUtils functions in lib/utils/__tests__/stringUtils.test.ts

### Implementation for Foundational

- [x] T010 Create Saint and Favorite TypeScript types in lib/types/saints.ts (from contracts/)
- [x] T011 [P] Create patronage category constants in lib/constants/patronages.ts
- [x] T012 [P] Implement dateUtils (formatDate, getTodayMonthDay) in lib/utils/dateUtils.ts
- [x] T013 [P] Implement stringUtils (normalizeKorean, getInitials) in lib/utils/stringUtils.ts
- [x] T014 Create sample saints.json data file with 10+ saints in data/saints.json
- [x] T015 Initialize TinyBase store with saints table in lib/store/saints.ts
- [x] T016 [P] Create SaintAvatar component (initials placeholder) in components/saints/SaintAvatar.tsx
- [x] T017 [P] Create EmptyState component in components/ui/EmptyState.tsx
- [x] T018 [P] Create LoadingState component in components/ui/LoadingState.tsx
- [x] T019 Setup Expo Router root layout with tab navigation in app/_layout.tsx

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Search Saints by Name (Priority: P1) 🎯 MVP

**Goal**: 사용자가 성인 이름을 입력하여 검색하고 상세 정보를 확인할 수 있다

**Independent Test**: 검색창에 "프란치스코"를 입력하고 아시시의 성 프란치스코 정보가 표시되는지 확인

### Tests for User Story 1

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T020 [P] [US1] Unit test for searchSaints function in lib/search/__tests__/searchSaints.test.ts
- [ ] T021 [P] [US1] Component test for SearchInput in components/search/__tests__/SearchInput.test.tsx
- [ ] T022 [P] [US1] Component test for SaintCard in components/saints/__tests__/SaintCard.test.tsx
- [ ] T023 [P] [US1] Component test for SaintDetail in components/saints/__tests__/SaintDetail.test.tsx
- [ ] T024 [US1] Integration test for search flow in __tests__/integration/search.test.tsx

### Implementation for User Story 1

- [ ] T025 [US1] Implement searchSaints with Fuse.js in lib/search/searchSaints.ts
- [ ] T026 [US1] Create useSearch custom hook in lib/hooks/useSearch.ts
- [ ] T027 [P] [US1] Create SearchInput component with debounce in components/search/SearchInput.tsx
- [ ] T028 [P] [US1] Create SaintCard component in components/saints/SaintCard.tsx
- [ ] T029 [US1] Create SaintDetail component in components/saints/SaintDetail.tsx
- [ ] T030 [US1] Create search screen with list in app/(tabs)/search.tsx
- [ ] T031 [US1] Create saint detail screen in app/saint/[id].tsx
- [ ] T032 [US1] Add empty state handling for no search results in app/(tabs)/search.tsx

**Checkpoint**: User Story 1 완료 - 이름 검색 및 상세 보기 기능이 독립적으로 작동

---

## Phase 4: User Story 2 - Browse Saints by Feast Day (Priority: P2)

**Goal**: 사용자가 오늘 또는 선택한 날짜의 축일 성인을 확인할 수 있다

**Independent Test**: 앱을 열고 오늘 날짜의 축일 성인 목록이 자동으로 표시되는지 확인

### Tests for User Story 2

- [ ] T033 [P] [US2] Unit test for filterByDate function in lib/search/__tests__/filterByDate.test.ts
- [ ] T034 [P] [US2] Component test for DatePicker in components/calendar/__tests__/DatePicker.test.tsx
- [ ] T035 [US2] Integration test for feast day flow in __tests__/integration/feastDay.test.tsx

### Implementation for User Story 2

- [ ] T036 [US2] Implement filterByDate (get saints by month/day) in lib/search/filterByDate.ts
- [ ] T037 [US2] Create useFeastDay custom hook in lib/hooks/useFeastDay.ts
- [ ] T038 [US2] Create DatePicker component in components/calendar/DatePicker.tsx
- [ ] T039 [US2] Create home screen with today's saints in app/(tabs)/index.tsx
- [ ] T040 [US2] Add date selection functionality to home screen in app/(tabs)/index.tsx
- [ ] T041 [US2] Add empty state for dates with no feast day saints

**Checkpoint**: User Story 2 완료 - 축일 조회 기능이 독립적으로 작동

---

## Phase 5: User Story 3 - Search by Patronage (Priority: P3)

**Goal**: 사용자가 특정 분야의 수호성인을 검색할 수 있다

**Independent Test**: "의사" 또는 "학생"을 검색하여 해당 분야의 수호성인이 표시되는지 확인

### Tests for User Story 3

- [ ] T042 [P] [US3] Unit test for patronage search in lib/search/__tests__/searchSaints.test.ts
- [ ] T043 [P] [US3] Component test for SearchFilters in components/search/__tests__/SearchFilters.test.tsx
- [ ] T044 [US3] Integration test for patronage search in __tests__/integration/search.test.tsx

### Implementation for User Story 3

- [ ] T045 [US3] Extend searchSaints to support patronage search mode in lib/search/searchSaints.ts
- [ ] T046 [US3] Create SearchFilters component (name/patronage toggle) in components/search/SearchFilters.tsx
- [ ] T047 [US3] Update useSearch hook for patronage mode in lib/hooks/useSearch.ts
- [ ] T048 [US3] Update search screen with filter toggle in app/(tabs)/search.tsx
- [ ] T049 [US3] Create patronages.json with category data in data/patronages.json

**Checkpoint**: User Story 3 완료 - 수호성인 검색 기능이 독립적으로 작동

---

## Phase 6: Favorites Feature (Cross-cutting)

**Goal**: 사용자가 자주 검색하는 성인을 즐겨찾기에 저장할 수 있다 (FR-007)

**Independent Test**: 성인 상세 화면에서 즐겨찾기 버튼을 누르고 즐겨찾기 탭에서 확인

### Tests for Favorites

- [ ] T050 [P] Unit test for favorites store in lib/store/__tests__/favorites.test.ts
- [ ] T051 [P] Integration test for favorites flow in __tests__/integration/favorites.test.tsx

### Implementation for Favorites

- [ ] T052 Implement favorites store with AsyncStorage persistence in lib/store/favorites.ts
- [ ] T053 Create useFavorites custom hook in lib/hooks/useFavorites.ts
- [ ] T054 Add favorite toggle button to SaintCard in components/saints/SaintCard.tsx
- [ ] T055 Add favorite toggle button to SaintDetail in components/saints/SaintDetail.tsx
- [ ] T056 Create favorites screen in app/(tabs)/favorites.tsx
- [ ] T057 Add empty state for no favorites in app/(tabs)/favorites.tsx

**Checkpoint**: Favorites 기능 완료 - 즐겨찾기 저장/조회가 작동

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T058 [P] Add accessibility labels to all interactive components
- [ ] T059 [P] Add loading states to all screens during data initialization
- [ ] T060 [P] Optimize FlatList performance with getItemLayout and keyExtractor
- [ ] T061 Add error boundary for graceful error handling in app/_layout.tsx
- [ ] T062 [P] Expand saints.json to 100+ saints for realistic testing in data/saints.json
- [ ] T063 Run quickstart.md validation checklist
- [ ] T064 Performance testing: verify <0.5s search response and <5s cold start

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-5)**: All depend on Foundational phase completion
  - User stories can proceed in priority order (P1 → P2 → P3)
  - Or in parallel if multiple developers available
- **Favorites (Phase 6)**: Can start after US1 (uses SaintCard, SaintDetail)
- **Polish (Phase 7)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - Independent of US1
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - Extends US1 search but independently testable
- **Favorites**: Depends on US1 (SaintCard, SaintDetail components)

### Within Each User Story

- Tests MUST be written and FAIL before implementation (TDD)
- Types/constants before stores
- Stores before hooks
- Hooks before components
- Components before screens
- Core implementation before integration

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- All tests for a user story marked [P] can run in parallel
- Components marked [P] can run in parallel within same phase
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 1

```bash
# Launch all tests for User Story 1 together:
Task: "Unit test for searchSaints function in lib/search/__tests__/searchSaints.test.ts"
Task: "Component test for SearchInput in components/search/__tests__/SearchInput.test.tsx"
Task: "Component test for SaintCard in components/saints/__tests__/SaintCard.test.tsx"
Task: "Component test for SaintDetail in components/saints/__tests__/SaintDetail.test.tsx"

# Launch parallel components after tests pass:
Task: "Create SearchInput component with debounce in components/search/SearchInput.tsx"
Task: "Create SaintCard component in components/saints/SaintCard.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1 (Search by Name)
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready - this is a functional MVP!

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Add Favorites → Test independently → Deploy/Demo
6. Polish → Final release

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2
   - Developer C: User Story 3
3. Favorites can be added after US1 components exist
4. Stories integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests FAIL before implementing (TDD Red phase)
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Constitution requires Test-First Development - all tests written before implementation
