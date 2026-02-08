# Research: StatusBar Color Scheme 자동 적용

**Feature Branch**: `004-statusbar-color-scheme`
**Date**: 2026-02-08

## R-001: expo-status-bar `style="auto"` 동작 방식

**Decision**: `<StatusBar style="auto" />`는 시스템 ColorScheme에 따라 StatusBar 텍스트/아이콘 색상을 자동으로 결정한다.

**Rationale**:

- `auto` 스타일은 `Appearance` 모듈에서 현재 색상 체계를 읽어 자동으로 선택
- 라이트 모드 → 어두운 텍스트/아이콘 (dark-content)
- 다크 모드 → 밝은 텍스트/아이콘 (light-content)
- `app.json`에 `"userInterfaceStyle": "automatic"` 설정이 필수 (이미 적용됨)
- 시스템 테마 변경 시 실시간으로 반응

**Alternatives considered**:

- `useColorScheme()` + 수동 스타일 매핑: 기능적으로 동일하지만 더 명시적이고 테스트 용이
- 고정 `style="dark"` 또는 `style="light"`: 시스템 테마 무시하므로 부적합

## R-002: useColorScheme() 훅 동작 방식

**Decision**: `react-native`의 `useColorScheme()`은 시스템 테마 변경을 실시간으로 감지하며, `"light"`, `"dark"`, 또는 `null`을 반환한다.

**Rationale**:

- `Appearance` 모듈을 구독하여 실시간 업데이트 제공
- iOS와 Android 양 플랫폼에서 동작
- `"userInterfaceStyle": "automatic"` 설정 시 네이티브 레이어에서 테마 변경 이벤트를 JS로 전달

## R-003: 현재 코드베이스 상태 분석

**Decision**: 현재 `app/_layout.tsx`에 `<StatusBar style="auto" />`가 이미 적용되어 있으며, `app.json`에 `"userInterfaceStyle": "automatic"`이 설정되어 있다. 기본적인 StatusBar 동작은 이미 충족됨.

**Rationale**:

- `app/_layout.tsx:30` — `<StatusBar style="auto" />` 존재
- `app.json:9` — `"userInterfaceStyle": "automatic"` 존재
- 따라서 기능 요구사항 FR-001~FR-004는 기본적으로 충족

**그러나 개선 필요 사항**:

1. `useColorScheme()`를 명시적으로 사용하여 동작을 더 테스트 가능하게 만들기
2. `null` 폴백 처리 (FR-005): colorScheme이 감지되지 않을 때 라이트 모드 기본값
3. 테스트 코드 부재: Constitution의 TDD 원칙에 따라 테스트 추가 필요

## R-004: 알려진 이슈

**Decision**: Expo SDK 52+ / React Native 0.76 환경에서 `style="auto"` + `"userInterfaceStyle": "automatic"` 조합은 안정적이다.

**Rationale**:

- SDK 49/Router v2 시절 layout 파일 내 StatusBar 무시 이슈는 해결됨
- iOS에서 `style="light"` 고정 시 테마 토글 오버라이드 이슈가 있으나, `auto` 사용 시 해당 없음
- Android edge-to-edge 모드에서 StatusBar 배경 투명화 이슈는 텍스트 색상과 무관

## R-005: 테스트 전략

**Decision**: `useColorScheme()` 훅을 모킹하여 StatusBar 스타일이 올바르게 결정되는지 단위 테스트로 검증한다.

**Rationale**:

- `react-native`의 `Appearance` 모듈을 모킹하여 라이트/다크/null 시나리오 테스트
- 실제 디바이스 테스트: iOS Simulator → Cmd+Shift+A, Android Emulator → `adb shell "cmd uimode night yes/no"`
- Constitution의 Test-First Development 원칙 준수
