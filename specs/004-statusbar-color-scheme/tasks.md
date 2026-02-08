# Tasks: StatusBar Color Scheme 자동 적용

**Input**: Design documents from `/specs/004-statusbar-color-scheme/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, contracts/

**Tests**: Included per Constitution Principle I (Test-First Development).

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Verify existing configuration and ensure prerequisites are met

- [ ] T001 Verify `app.json` has `"userInterfaceStyle": "automatic"` at `app.json:9` — no change expected, confirm setting exists
- [ ] T002 Verify `expo-status-bar` ~2.0.0 is installed in `package.json` dependencies — no change expected, confirm dependency exists

**Checkpoint**: Prerequisites confirmed — existing configuration supports color scheme detection

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Create test infrastructure for StatusBar testing

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T003 Create test directory `app/__tests__/` if not exists
- [ ] T004 Create test file `app/__tests__/_layout.test.tsx` with test setup: mock `expo-status-bar`, mock `expo-router`, mock `expo-splash-screen`, and mock `react-native` `useColorScheme`

**Checkpoint**: Test infrastructure ready — user story implementation can now begin

---

## Phase 3: User Story 1 & 2 - 라이트/다크 모드에서 StatusBar 자동 적용 (Priority: P1) 🎯 MVP

**Goal**: 기기의 시스템 ColorScheme(라이트/다크)에 따라 StatusBar 텍스트/아이콘이 올바른 색상으로 표시된다. `null` 폴백 시 라이트 모드 기본값 적용.

**Independent Test**: `useColorScheme` 모킹을 통해 라이트/다크/null 각 시나리오에서 StatusBar 스타일이 올바르게 결정되는지 검증.

**Note**: US1(라이트 모드)과 US2(다크 모드)는 동일한 구현(`style="auto"`)으로 동시 충족되므로 하나의 Phase에서 함께 처리한다.

### Tests for User Story 1 & 2 ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T005 [P] [US1] Write test: 라이트 모드에서 StatusBar가 렌더링되는지 확인 — mock `useColorScheme` to return `"light"`, assert `StatusBar` component is rendered with `style="auto"` in `app/__tests__/_layout.test.tsx`
- [ ] T006 [P] [US2] Write test: 다크 모드에서 StatusBar가 렌더링되는지 확인 — mock `useColorScheme` to return `"dark"`, assert `StatusBar` component is rendered with `style="auto"` in `app/__tests__/_layout.test.tsx`
- [ ] T007 [P] [US1] Write test: colorScheme이 `null`일 때 기본값(라이트 모드)으로 폴백 — mock `useColorScheme` to return `null`, assert `StatusBar` is rendered with `style="auto"` in `app/__tests__/_layout.test.tsx`

### Implementation for User Story 1 & 2

- [ ] T008 [US1] Update `app/_layout.tsx` to import `useColorScheme` from `react-native` and invoke it in `RootLayout` component — the `<StatusBar style="auto" />` already handles light/dark mapping, so the hook call ensures explicit awareness and testability
- [ ] T009 [US1] Run tests (`npm test -- --testPathPattern="_layout"`) and verify T005, T006, T007 all pass in `app/__tests__/_layout.test.tsx`

**Checkpoint**: 라이트/다크 모드 StatusBar 동작이 테스트를 통해 검증됨. US1과 US2 모두 독립적으로 동작 가능.

---

## Phase 4: User Story 3 - 실시간 테마 전환 반영 (Priority: P2)

**Goal**: 앱 사용 중 시스템 테마 전환 시 StatusBar 스타일이 앱 재시작 없이 즉시 반영된다.

**Independent Test**: `useColorScheme` 반환값 변경을 시뮬레이션하여 StatusBar가 재렌더링되는지 확인.

### Tests for User Story 3 ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T010 [US3] Write test: `useColorScheme` 반환값이 `"light"` → `"dark"`로 변경될 때 컴포넌트가 re-render되어 StatusBar가 유지되는지 확인 in `app/__tests__/_layout.test.tsx`

### Implementation for User Story 3

- [ ] T011 [US3] Verify that `useColorScheme()` in `app/_layout.tsx` already triggers re-render on system theme change — `expo-status-bar` `style="auto"` automatically reacts to `Appearance` module changes, so no additional implementation needed. Run test T010 to confirm.

**Checkpoint**: 실시간 테마 전환이 테스트를 통해 검증됨. US3 독립적으로 동작 확인.

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: 전체 테스트 실행 및 크로스 플랫폼 수동 검증

- [ ] T012 Run full test suite (`npm test`) and confirm all tests pass with no regressions
- [ ] T013 [P] Manual verification on iOS Simulator: toggle theme with Cmd+Shift+A, confirm StatusBar text color changes
- [ ] T014 [P] Manual verification on Android Emulator: toggle theme with `adb shell "cmd uimode night yes/no"`, confirm StatusBar text color changes
- [ ] T015 Run linter (`npm run lint`) and type check (`npm run typecheck`) to ensure no errors

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — verification only
- **Foundational (Phase 2)**: Depends on Setup completion — BLOCKS all user stories
- **US1 & US2 (Phase 3)**: Depends on Foundational phase completion
- **US3 (Phase 4)**: Depends on Phase 3 completion (builds on same `useColorScheme` hook)
- **Polish (Phase 5)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 & 2 (P1)**: Can start after Foundational (Phase 2) — No dependencies on other stories
- **User Story 3 (P2)**: Depends on US1/US2 implementation (same hook, same file) — tests the reactive behavior of the implementation from Phase 3

### Within Each User Story

- Tests MUST be written and FAIL before implementation (TDD)
- Implementation → Run tests → Verify pass
- Story complete before moving to next priority

### Parallel Opportunities

- T005, T006, T007 can all run in parallel (separate test cases, same file but independent)
- T013, T014 can run in parallel (different platforms)
- Phase 3 test writing (T005-T007) is parallelizable

---

## Parallel Example: User Story 1 & 2

```bash
# Launch all tests for US1/US2 together (they test different scenarios):
Task: "T005 [US1] Light mode StatusBar test in app/__tests__/_layout.test.tsx"
Task: "T006 [US2] Dark mode StatusBar test in app/__tests__/_layout.test.tsx"
Task: "T007 [US1] Null fallback test in app/__tests__/_layout.test.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 & 2 Only)

1. Complete Phase 1: Setup (verify existing config)
2. Complete Phase 2: Foundational (create test file)
3. Complete Phase 3: User Story 1 & 2 (TDD → implement → verify)
4. **STOP and VALIDATE**: Run tests, confirm light/dark/null all pass
5. Deploy/demo if ready — MVP delivers core value

### Incremental Delivery

1. Complete Setup + Foundational → Test infrastructure ready
2. Add US1 & US2 → Test independently → Deploy/Demo (MVP!)
3. Add US3 → Test independently → Deploy/Demo
4. Polish → Full validation → Final delivery

---

## Notes

- [P] tasks = different files or independent test cases, no dependencies
- [Story] label maps task to specific user story for traceability
- US1 and US2 are combined in Phase 3 because they share the exact same implementation (`style="auto"`)
- The existing `<StatusBar style="auto" />` already satisfies FR-001 through FR-004; this feature adds explicit `useColorScheme()` usage for testability and TDD compliance
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
