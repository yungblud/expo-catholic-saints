# Implementation Plan: Catholic Saints Search

**Branch**: `001-saints-search` | **Date**: 2026-01-28 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-saints-search/spec.md`

## Summary

카톨릭 성인 검색 모바일 앱 개발. 사용자가 성인 이름, 축일, 수호 분야로 검색하고 상세 정보를 확인할 수 있다. 모든 데이터는 앱 번들에 내장되어 서버 없이 완전한 오프라인 작동을 지원한다.

## Technical Context

**Language/Version**: TypeScript 5.x
**Primary Dependencies**: Expo SDK 52+, React Native, Expo Router, TinyBase (local state/persistence)
**Storage**: TinyBase for reactive state + AsyncStorage for favorites persistence, bundled JSON for saint data
**Testing**: Jest + React Native Testing Library + Expo Testing
**Target Platform**: iOS 15+ / Android 10+ (Expo cross-platform)
**Project Type**: Mobile (Expo)
**Performance Goals**: 0.5s search response, 5s cold start, 60fps scrolling
**Constraints**: Offline-capable (100%), <50MB app bundle, 1,000+ saints data
**Scale/Scope**: Single mobile app, ~5 screens, 1,000+ saints dataset

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### I. Test-First Development (NON-NEGOTIABLE)

| Gate | Status | Notes |
|------|--------|-------|
| Tests written before implementation | PLANNED | Jest + RNTL for all components/services |
| Red-Green-Refactor cycle | PLANNED | CI will enforce test-first workflow |
| No untested code | PLANNED | Coverage threshold enforced |

### II. Mobile-First Quality

| Gate | Status | Notes |
|------|--------|-------|
| Performance budgets defined | PASS | 0.5s search, 5s cold start, 60fps |
| Responsive design | PLANNED | Expo responsive utilities |
| Offline resilience | PASS | 100% offline via bundled data |
| Platform conventions | PLANNED | NativeWind + platform-specific patterns |
| Accessibility | PLANNED | WCAG AA target, screen reader support |

### III. Iterative Delivery

| Gate | Status | Notes |
|------|--------|-------|
| User stories as MVP slices | PASS | 3 independent stories (P1→P2→P3) |
| Vertical slices | PLANNED | Each story delivers end-to-end functionality |
| Feedback loops | PLANNED | Story-by-story deployment capability |

**Constitution Check Result**: PASS - No violations requiring justification.

## Project Structure

### Documentation (this feature)

```text
specs/001-saints-search/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output (internal data contracts)
└── tasks.md             # Phase 2 output (/speckit.tasks)
```

### Source Code (repository root)

```text
app/
├── (tabs)/
│   ├── index.tsx           # Home: Today's feast day saints
│   ├── search.tsx          # Search: Name/patronage search
│   └── favorites.tsx       # Favorites: Saved saints
├── saint/
│   └── [id].tsx            # Saint detail screen
├── _layout.tsx             # Root layout with navigation
└── +not-found.tsx          # 404 handling

components/
├── saints/
│   ├── SaintCard.tsx       # Saint list item component
│   ├── SaintDetail.tsx     # Saint detail view
│   ├── SaintAvatar.tsx     # Placeholder avatar (initials)
│   └── __tests__/          # Component tests
├── search/
│   ├── SearchInput.tsx     # Search input with debounce
│   ├── SearchFilters.tsx   # Filter tabs (name/patronage)
│   └── __tests__/
├── calendar/
│   ├── DatePicker.tsx      # Date selection for feast days
│   └── __tests__/
└── ui/
    ├── EmptyState.tsx      # No results view
    └── LoadingState.tsx    # Loading indicator

data/
├── saints.json             # Bundled saint data (1,000+ entries)
└── patronages.json         # Patronage categories

lib/
├── store/
│   ├── saints.ts           # TinyBase store for saints
│   ├── favorites.ts        # Favorites persistence
│   └── __tests__/
├── search/
│   ├── searchSaints.ts     # Search algorithm (name/patronage)
│   ├── filterByDate.ts     # Feast day filtering
│   └── __tests__/
└── utils/
    ├── dateUtils.ts        # Date formatting/comparison
    ├── stringUtils.ts      # Korean/Latin name normalization
    └── __tests__/

__tests__/
├── integration/
│   ├── search.test.tsx     # Search flow tests
│   ├── feastDay.test.tsx   # Feast day flow tests
│   └── favorites.test.tsx  # Favorites flow tests
└── e2e/                    # Future: Detox e2e tests
```

**Structure Decision**: Expo Router file-based routing with feature-organized components. TinyBase for reactive local state management. All saint data bundled as JSON.

## Complexity Tracking

> No violations requiring justification - all decisions align with constitution principles.
