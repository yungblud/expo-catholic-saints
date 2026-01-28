# Implementation Plan: EAS Build Setup

**Branch**: `003-eas-build` | **Date**: 2026-01-28 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/003-eas-build/spec.md`

## Summary

Expo Application Services (EAS) Build를 프로젝트에 설정하여 iOS와 Android 앱을 클라우드에서 빌드할 수 있도록 한다. development, preview, production 세 가지 빌드 프로필을 구성하고, OTA 업데이트를 위한 EAS Update도 설정한다. 이를 통해 로컬 빌드 환경 없이도 앱 바이너리를 생성하고 배포할 수 있다.

## Technical Context

**Language/Version**: TypeScript 5.x, Expo SDK 52+
**Primary Dependencies**: EAS CLI, expo-dev-client, expo-updates
**Storage**: EAS Cloud (빌드 아티팩트, 자격 증명)
**Testing**: EAS CLI 명령어 실행 및 빌드 결과 검증
**Target Platform**: iOS 15+, Android API 24+
**Project Type**: Mobile (Expo/React Native)
**Performance Goals**: 빌드 완료 30분 이내 (큐 제외)
**Constraints**: Apple Developer 계정 필요, 인터넷 연결 필수
**Scale/Scope**: 단일 앱, 3개 빌드 프로필 (development, preview, production)

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

### I. Test-First Development

| Checkpoint             | Status | Notes                                       |
| ---------------------- | ------ | ------------------------------------------- |
| Tests written first    | N/A    | 설정/인프라 feature - EAS CLI 명령어로 검증 |
| Failing tests exist    | N/A    | 빌드 성공/실패로 검증                       |
| Tests as documentation | PASS   | eas.json과 빌드 프로필이 문서 역할 수행     |

### II. Mobile-First Quality

| Checkpoint           | Status | Notes                             |
| -------------------- | ------ | --------------------------------- |
| Performance budgets  | PASS   | 빌드 시간 30분 목표 설정          |
| Responsive design    | N/A    | 빌드 설정 feature                 |
| Offline resilience   | N/A    | 클라우드 빌드 필수                |
| Platform conventions | PASS   | iOS/Android 각각 적절한 빌드 구성 |
| Accessibility        | N/A    | 빌드 설정 feature                 |

### III. Iterative Delivery

| Checkpoint                 | Status | Notes                                             |
| -------------------------- | ------ | ------------------------------------------------- |
| User stories as MVP slices | PASS   | 각 빌드 프로필이 독립적으로 사용 가능             |
| Vertical slices            | PASS   | development → preview → production 순차 배포 가능 |
| Feedback loops             | PASS   | 빌드 완료 알림, 테스터 피드백 루프                |
| Reversibility              | PASS   | 프로필 수정/삭제 언제든 가능                      |

**Gate Result**: PASS - 모든 적용 가능한 원칙 준수

## Project Structure

### Documentation (this feature)

```text
specs/003-eas-build/
├── plan.md              # This file
├── research.md          # EAS 설정 best practices 연구
├── data-model.md        # eas.json 구조 정의
├── quickstart.md        # 빠른 시작 가이드
├── contracts/           # 빌드 프로필 스키마
│   └── eas-json-schema.md
└── tasks.md             # Phase 2 output
```

### Source Code (repository root)

```text
/                                    # Repository root
├── eas.json                         # EAS Build 설정 파일
├── app.json                         # Expo 앱 설정 (업데이트)
├── .easignore                       # EAS 빌드 시 제외할 파일
└── src/
    └── config/
        └── updates.ts               # EAS Update 설정 (선택)
```

**Structure Decision**: EAS 설정 파일들은 프로젝트 루트에 위치. 앱 코드 변경은 최소화하고 설정 파일 중심으로 구성.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
| --------- | ---------- | ------------------------------------ |
| N/A       | N/A        | N/A                                  |

---

## Phase 0 Output: Research

See [research.md](./research.md) for detailed findings.

## Phase 1 Output: Design Artifacts

- [data-model.md](./data-model.md) - eas.json 구조 정의
- [contracts/](./contracts/) - 빌드 프로필 스키마
- [quickstart.md](./quickstart.md) - 빠른 시작 가이드
