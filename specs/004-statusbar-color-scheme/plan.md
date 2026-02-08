# Implementation Plan: StatusBar Color Scheme 자동 적용

**Branch**: `004-statusbar-color-scheme` | **Date**: 2026-02-08 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/004-statusbar-color-scheme/spec.md`

## Summary

기기의 시스템 ColorScheme(라이트/다크)을 감지하여 StatusBar 텍스트/아이콘 색상을 자동으로 설정한다. 현재 `app/_layout.tsx`에 `<StatusBar style="auto" />`가 이미 존재하여 기본 동작은 충족되나, 명시적 `useColorScheme()` 사용으로 테스트 가능성을 높이고, `null` 폴백 처리를 추가하며, Constitution의 TDD 원칙에 따라 테스트를 작성한다.

## Technical Context

**Language/Version**: TypeScript 5.x
**Primary Dependencies**: Expo SDK 52+, React Native 0.76, expo-status-bar ~2.0.0, expo-router ~4.0.0, NativeWind 4.x
**Storage**: N/A (시스템 상태 참조만, 영속성 없음)
**Testing**: Jest 29 + jest-expo + @testing-library/react-native
**Target Platform**: iOS 15+ / Android (Expo managed workflow)
**Project Type**: Mobile (Expo Router)
**Performance Goals**: StatusBar 스타일 전환 1초 이내 (시스템 이벤트 기반이므로 사실상 즉시)
**Constraints**: 오프라인에서도 동작 (시스템 API 기반), 추가 네이티브 모듈 없음
**Scale/Scope**: 단일 파일 수정 (`app/_layout.tsx`) + 테스트 파일 추가

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

### Pre-Design Check

| Principle                 | Status | Notes                                       |
| ------------------------- | ------ | ------------------------------------------- |
| I. Test-First Development | PASS   | 테스트 작성 후 구현 변경 예정               |
| II. Mobile-First Quality  | PASS   | 플랫폼 컨벤션 준수, 크로스 플랫폼 동작 보장 |
| III. Iterative Delivery   | PASS   | 단일 수직 슬라이스 — StatusBar 독립 기능    |

### Quality Gates

- [x] User story has clear acceptance criteria
- [x] Tests will be written first (TDD red phase)
- [x] Design artifacts reviewed

### Post-Design Check

| Principle                 | Status | Notes                                         |
| ------------------------- | ------ | --------------------------------------------- |
| I. Test-First Development | PASS   | 테스트 전략 정의됨 (research.md R-005)        |
| II. Mobile-First Quality  | PASS   | iOS/Android 양 플랫폼 검증 계획 포함          |
| III. Iterative Delivery   | PASS   | 최소 변경으로 최대 효과 — `style="auto"` 활용 |

## Project Structure

### Documentation (this feature)

```text
specs/004-statusbar-color-scheme/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/
│   └── statusbar-contract.md
├── checklists/
│   └── requirements.md
└── tasks.md             # Phase 2 output (/speckit.tasks)
```

### Source Code (repository root)

```text
app/
├── _layout.tsx          # Root layout — StatusBar 설정 (수정 대상)
├── (tabs)/
│   ├── _layout.tsx
│   ├── index.tsx
│   ├── search.tsx
│   └── favorites.tsx
├── saint/[id].tsx
└── +not-found.tsx

app/__tests__/
└── _layout.test.tsx     # 신규: Root layout StatusBar 테스트
```

**Structure Decision**: 기존 Expo Router 기반 `app/` 디렉토리 구조를 유지한다. 테스트는 해당 파일과 colocated된 `__tests__/` 디렉토리에 배치한다.

## Implementation Approach

### 핵심 변경 사항

1. **`app/_layout.tsx` 수정**: `useColorScheme()` 훅을 명시적으로 사용하여 StatusBar 스타일을 결정
   - 현재: `<StatusBar style="auto" />` (암시적 동작)
   - 변경: `useColorScheme()`로 colorScheme 감지 → `null` 폴백 처리 포함하여 `<StatusBar style="auto" />` 유지 또는 명시적 스타일 결정
   - `style="auto"`가 이미 요구사항을 충족하므로 최소 변경 원칙 적용

2. **`app.json` 확인**: `"userInterfaceStyle": "automatic"` 이미 설정됨 — 변경 불필요

3. **테스트 추가**: `app/__tests__/_layout.test.tsx`에 StatusBar 동작 검증 테스트 작성

### 테스트 전략

| 테스트 유형      | 대상                       | 방법                                                           |
| ---------------- | -------------------------- | -------------------------------------------------------------- |
| Unit             | StatusBar 스타일 결정 로직 | `useColorScheme` 모킹 → light/dark/null 시나리오               |
| Integration      | Root Layout 렌더링         | `@testing-library/react-native`로 StatusBar 컴포넌트 존재 확인 |
| Manual (iOS)     | 실제 디바이스/시뮬레이터   | Cmd+Shift+A로 테마 토글                                        |
| Manual (Android) | 실제 디바이스/에뮬레이터   | `adb shell "cmd uimode night yes/no"`                          |

## Complexity Tracking

해당 사항 없음. Constitution 위반 없음.
