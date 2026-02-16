# Tasks: 개인정보 처리방침 웹 페이지

**Input**: Design documents from `/specs/005-privacy-policy-web/`
**Prerequisites**: plan.md (required), spec.md (required), research.md

**Tests**: Included per constitution (Test-First Development, NON-NEGOTIABLE).

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2)
- Include exact file paths in descriptions

## Phase 1: Setup (Route Registration)

**Purpose**: Register the privacy-policy route in the existing Expo Router structure

- [x] T001 Register privacy-policy route as Stack.Screen in app/\_layout.tsx with `headerShown: false` option so the page renders without native navigation header

**Checkpoint**: Route is registered and Expo Router recognizes `/privacy-policy` path

---

## Phase 2: User Story 1 - 앱스토어 심사관의 개인정보 처리방침 확인 (Priority: P1) MVP

**Goal**: 개인정보 처리방침 페이지가 웹에서 접근 가능하고, PIPA 필수 항목 8개 섹션과 앱 정보를 포함한다.

**Independent Test**: 웹 브라우저에서 `/privacy-policy`에 접속하여 한국어 개인정보 처리방침 전문이 표시되고, 앱 이름·연락처·시행일자가 포함되어 있는지 확인한다.

### Tests for User Story 1

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [x] T002 [US1] Write rendering test that verifies page renders with app name "Cursed By Jesus", all 8 PIPA section headings, contact email, and effective date in app/**tests**/privacy-policy.test.tsx

### Implementation for User Story 1

- [x] T003 [US1] Create privacy policy page component in app/privacy-policy.tsx with complete PIPA content: (1) 개인정보의 처리 목적, (2) 처리하는 개인정보의 항목, (3) 개인정보의 처리 및 보유 기간, (4) 제3자 제공, (5) 파기 절차 및 방법, (6) 정보주체의 권리·의무, (7) 개인정보 보호책임자 연락처, (8) 시행일자. All sections state "수집하지 않음" or "해당 없음" as appropriate. Include app name "Cursed By Jesus" and developer contact email.
- [x] T004 [US1] Verify T002 tests pass after implementation by running `npx jest app/__tests__/privacy-policy.test.tsx`

**Checkpoint**: Privacy policy page renders with all required PIPA content. US1 acceptance scenarios are met.

---

## Phase 3: User Story 2 - 앱 사용자의 개인정보 처리방침 열람 (Priority: P2)

**Goal**: 모바일 환경에서 가독성 있는 반응형 레이아웃을 제공하고, 섹션 구조가 명확하여 원하는 정보를 쉽게 찾을 수 있다.

**Independent Test**: 모바일 브라우저(320px~428px)와 데스크톱(1024px+)에서 텍스트가 잘리거나 겹치지 않고 가독성을 유지하는지 확인한다.

### Implementation for User Story 2

- [x] T005 [US2] Apply NativeWind responsive styles to app/privacy-policy.tsx: mobile-first layout with max-width container, responsive padding (px-4 mobile, px-8 desktop), readable font sizes, proper heading hierarchy (h1/h2), and adequate spacing between sections for scannability
- [x] T006 [US2] Verify responsive layout by running `npm run web` and testing at 320px, 428px, and 1024px+ viewport widths in browser DevTools

**Checkpoint**: Page displays correctly on both mobile and desktop. US2 acceptance scenarios are met.

---

## Phase 4: Polish & Cross-Cutting Concerns

**Purpose**: Final verification and web build validation

- [x] T007 Run full test suite with `npm test` to ensure no regressions in existing tests (72/72 passed)
- [x] T008 Run web static export with `npx expo export --platform web` and verify `/privacy-policy` page is included in dist/ output — Fixed pre-existing expo-sqlite issue via lazy initialization in `lib/store/saints.ts`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - start immediately
- **User Story 1 (Phase 2)**: Depends on Phase 1 (route registration)
- **User Story 2 (Phase 3)**: Depends on Phase 2 (page must exist before styling refinement)
- **Polish (Phase 4)**: Depends on Phase 3 completion

### User Story Dependencies

- **User Story 1 (P1)**: Depends on Setup (Phase 1) only
- **User Story 2 (P2)**: Depends on US1 (same file - responsive styling applied to existing page)

### Within Each User Story

- Tests MUST be written and FAIL before implementation (TDD red phase)
- Implementation makes tests pass (TDD green phase)
- Story complete before moving to next priority

### Parallel Opportunities

- T002 (US1 test) can be written immediately after T001 completes
- T005 and T006 (US2) are sequential refinements to the same file
- T007 and T008 (Polish) can run in parallel

---

## Parallel Example: Phase 4

```bash
# Launch polish tasks together:
Task: "Run full test suite with npm test"
Task: "Run web static export with npx expo export --platform web"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Register route in \_layout.tsx
2. Complete Phase 2: TDD - write test, implement PIPA content page
3. **STOP and VALIDATE**: Verify page renders all required content at `/privacy-policy`
4. This alone is sufficient for App Store submission

### Incremental Delivery

1. Phase 1: Route setup → Route ready
2. Phase 2: US1 PIPA content → Test independently → MVP ready for App Store
3. Phase 3: US2 responsive polish → Better mobile UX
4. Phase 4: Full validation → Production ready

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- US1 and US2 share the same file (app/privacy-policy.tsx) so they must be sequential
- Constitution requires TDD: tests before implementation
- Contact email must be provided by the developer during T003 implementation
- Commit after each task or logical group
