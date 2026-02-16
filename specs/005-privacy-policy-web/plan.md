# Implementation Plan: 개인정보 처리방침 웹 페이지

**Branch**: `005-privacy-policy-web` | **Date**: 2026-02-15 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/005-privacy-policy-web/spec.md`

## Summary

앱스토어 심사 제출을 위한 개인정보 처리방침 웹 페이지를 Expo Web으로 구현한다. 기존 Expo Router 파일 기반 라우팅을 활용하여 `/privacy-policy` 경로에 정적 한국어 페이지를 추가하며, NativeWind를 사용한 반응형 레이아웃으로 모바일·데스크톱 환경을 모두 지원한다.

## Technical Context

**Language/Version**: TypeScript 5.x + Expo SDK 52+, React Native 0.76
**Primary Dependencies**: expo-router ~4.0.0, NativeWind 4.x, react-native-web ~0.19.13
**Storage**: N/A (정적 콘텐츠, 데이터 저장 없음)
**Testing**: Jest + React Testing Library
**Target Platform**: Web (정적 빌드, 모든 모던 브라우저)
**Project Type**: mobile (기존 Expo 앱에 웹 라우트 추가)
**Performance Goals**: 3초 이내 페이지 로드 (정적 텍스트 콘텐츠로 달성 용이)
**Constraints**: 정적 콘텐츠 전용, 별도 서버 불필요
**Scale/Scope**: 단일 페이지, 1개 라우트 추가

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

### Pre-Design Check

| Principle                 | Status | Notes                                                |
| ------------------------- | ------ | ---------------------------------------------------- |
| I. Test-First Development | PASS   | 페이지 렌더링 테스트를 먼저 작성한 후 컴포넌트 구현  |
| II. Mobile-First Quality  | PASS   | NativeWind 반응형 레이아웃, 접근성 고려, 시맨틱 HTML |
| III. Iterative Delivery   | PASS   | 단일 페이지로 독립 배포 가능한 수직 슬라이스         |

### Post-Design Check

| Principle                 | Status | Notes                                                                   |
| ------------------------- | ------ | ----------------------------------------------------------------------- |
| I. Test-First Development | PASS   | 테스트 계획: 필수 콘텐츠 렌더링 검증, 반응형 레이아웃 검증              |
| II. Mobile-First Quality  | PASS   | 320px~1024px+ 반응형, 시맨틱 구조, 접근성                               |
| III. Iterative Delivery   | PASS   | P1 스토리(심사관 확인)와 P2 스토리(사용자 열람) 모두 단일 페이지로 충족 |

## Project Structure

### Documentation (this feature)

```text
specs/005-privacy-policy-web/
├── spec.md
├── plan.md              # This file
├── research.md          # Phase 0 output
├── quickstart.md        # Phase 1 output
└── tasks.md             # Phase 2 output (/speckit.tasks)
```

### Source Code (repository root)

```text
app/
├── privacy-policy.tsx          # 개인정보 처리방침 웹 페이지 라우트
├── _layout.tsx                 # 루트 레이아웃 (Stack.Screen 추가)
└── __tests__/
    └── privacy-policy.test.tsx # 페이지 렌더링 테스트
```

**Structure Decision**: 기존 Expo Router 파일 기반 라우팅 구조에 최상위 라우트 1개를 추가한다. 별도 컴포넌트 분리 없이 단일 페이지 파일에 콘텐츠와 레이아웃을 함께 구성한다. 정적 텍스트 콘텐츠이므로 별도 데이터 모델이나 서비스 레이어가 불필요하다.
