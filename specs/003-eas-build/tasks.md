# Implementation Tasks: EAS Build Setup

**Feature Branch**: `003-eas-build`
**Created**: 2026-01-28
**Input**: [spec.md](./spec.md), [plan.md](./plan.md)

## Overview

Total Tasks: 24

- Phase 1: EAS CLI 설치 및 초기화 (5 tasks)
- Phase 2: eas.json 빌드 프로필 설정 (5 tasks)
- Phase 3: iOS 빌드 설정 (4 tasks)
- Phase 4: Android 빌드 설정 (3 tasks)
- Phase 5: EAS Update 설정 (4 tasks)
- Phase 6: 검증 및 문서화 (3 tasks)

---

## Phase 1: EAS CLI 설치 및 초기화

### Task 1.1: EAS CLI 전역 설치 확인

- **User Story**: US1 - Configure EAS Build for Development
- **Description**: EAS CLI가 전역으로 설치되어 있는지 확인하고, 없으면 설치한다.
- **Files**: N/A (시스템 설치)
- **Test**: `eas --version` 명령이 성공적으로 실행되는지 확인
- **Status**: [ ] Pending

### Task 1.2: Expo 계정 로그인

- **User Story**: US1 - Configure EAS Build for Development
- **Description**: EAS CLI에서 Expo 계정으로 로그인한다.
- **Files**: N/A (계정 인증)
- **Test**: `eas whoami` 명령으로 로그인 상태 확인
- **Status**: [ ] Pending

### Task 1.3: 프로젝트 EAS 초기화

- **User Story**: US1 - Configure EAS Build for Development
- **Description**: `eas init` 명령으로 프로젝트를 EAS와 연결하고 프로젝트 ID를 생성한다.
- **Files**: `app.json` (extra.eas.projectId 추가)
- **Test**: app.json에 projectId가 추가되었는지 확인
- **Status**: [ ] Pending

### Task 1.4: eas.json 파일 생성

- **User Story**: US1 - Configure EAS Build for Development
- **Description**: `eas build:configure` 명령으로 기본 eas.json 파일을 생성한다.
- **Files**: `eas.json`
- **Test**: eas.json 파일이 프로젝트 루트에 생성되었는지 확인
- **Status**: [ ] Pending

### Task 1.5: .easignore 파일 생성

- **User Story**: US1 - Configure EAS Build for Development
- **Description**: 빌드 시 제외할 파일 목록을 정의하는 .easignore 파일을 생성한다.
- **Files**: `.easignore`
- **Test**: .easignore 파일이 존재하고 적절한 패턴이 포함되어 있는지 확인
- **Status**: [ ] Pending

---

## Phase 2: eas.json 빌드 프로필 설정

### Task 2.1: base 프로필 구성

- **User Story**: US1, US2, US3 - All Build Stories
- **Description**: 모든 프로필이 상속할 base 프로필을 구성한다. 공통 환경 변수와 설정을 정의한다.
- **Files**: `eas.json`
- **Test**: base 프로필에 공통 설정이 포함되어 있는지 확인
- **Status**: [ ] Pending

### Task 2.2: development 프로필 구성

- **User Story**: US1 - Configure EAS Build for Development
- **Description**: 개발용 빌드 프로필을 구성한다. developmentClient: true, iOS 시뮬레이터 빌드 설정.
- **Files**: `eas.json`
- **Test**: development 프로필에 필수 설정이 포함되어 있는지 확인
- **Status**: [ ] Pending

### Task 2.3: preview 프로필 구성

- **User Story**: US2 - Create Preview Builds for Testing
- **Description**: 테스트용 빌드 프로필을 구성한다. internal 배포, Android APK 빌드 설정.
- **Files**: `eas.json`
- **Test**: preview 프로필에 distribution: internal, Android buildType: apk가 설정되어 있는지 확인
- **Status**: [ ] Pending

### Task 2.4: production 프로필 구성

- **User Story**: US3 - Create Production Builds for Store Submission
- **Description**: 스토어 제출용 빌드 프로필을 구성한다. autoIncrement, Android app-bundle 설정.
- **Files**: `eas.json`
- **Test**: production 프로필에 autoIncrement: true, Android buildType: app-bundle이 설정되어 있는지 확인
- **Status**: [ ] Pending

### Task 2.5: 환경 변수 구성

- **User Story**: US1, US2, US3 - All Build Stories
- **Description**: 각 프로필에 적절한 환경 변수(APP_ENV 등)를 설정한다.
- **Files**: `eas.json`
- **Test**: 각 프로필에 APP_ENV 환경 변수가 올바르게 설정되어 있는지 확인
- **Status**: [ ] Pending

---

## Phase 3: iOS 빌드 설정

### Task 3.1: Apple Developer 계정 연결 안내

- **User Story**: US1, US2, US3 - All Build Stories
- **Description**: iOS 빌드를 위해 Apple Developer 계정을 EAS에 연결하는 방법을 문서화한다.
- **Files**: `specs/003-eas-build/quickstart.md` (업데이트)
- **Test**: Apple 계정 연결 단계가 문서에 포함되어 있는지 확인
- **Status**: [ ] Pending

### Task 3.2: iOS development 빌드 테스트

- **User Story**: US1 - Configure EAS Build for Development
- **Description**: iOS development 프로필로 시뮬레이터 빌드를 생성하여 설정을 검증한다.
- **Files**: N/A (빌드 실행)
- **Test**: `eas build --profile development --platform ios` 명령이 성공하는지 확인
- **Status**: [ ] Pending

### Task 3.3: iOS preview 빌드 테스트

- **User Story**: US2 - Create Preview Builds for Testing
- **Description**: iOS preview 프로필로 Ad Hoc 빌드를 생성한다.
- **Files**: N/A (빌드 실행)
- **Test**: `eas build --profile preview --platform ios` 명령이 성공하는지 확인
- **Status**: [ ] Pending

### Task 3.4: iOS 테스트 디바이스 등록 안내

- **User Story**: US2 - Create Preview Builds for Testing
- **Description**: iOS Ad Hoc 빌드를 위한 테스트 디바이스 등록 방법을 문서화한다.
- **Files**: `specs/003-eas-build/quickstart.md` (업데이트)
- **Test**: 디바이스 등록 단계가 문서에 포함되어 있는지 확인
- **Status**: [ ] Pending

---

## Phase 4: Android 빌드 설정

### Task 4.1: Android development 빌드 테스트

- **User Story**: US1 - Configure EAS Build for Development
- **Description**: Android development 프로필로 APK 빌드를 생성하여 설정을 검증한다.
- **Files**: N/A (빌드 실행)
- **Test**: `eas build --profile development --platform android` 명령이 성공하는지 확인
- **Status**: [ ] Pending

### Task 4.2: Android preview 빌드 테스트

- **User Story**: US2 - Create Preview Builds for Testing
- **Description**: Android preview 프로필로 APK 빌드를 생성한다.
- **Files**: N/A (빌드 실행)
- **Test**: `eas build --profile preview --platform android` 명령이 성공하는지 확인
- **Status**: [ ] Pending

### Task 4.3: Android 키스토어 관리 안내

- **User Story**: US3 - Create Production Builds for Store Submission
- **Description**: Android 키스토어 관리 및 Google Play App Signing 연동 방법을 문서화한다.
- **Files**: `specs/003-eas-build/quickstart.md` (업데이트)
- **Test**: 키스토어 관리 단계가 문서에 포함되어 있는지 확인
- **Status**: [ ] Pending

---

## Phase 5: EAS Update 설정

### Task 5.1: expo-updates 패키지 설치

- **User Story**: US4 - Configure OTA Updates with EAS Update
- **Description**: OTA 업데이트를 위해 expo-updates 패키지를 설치한다.
- **Files**: `package.json`
- **Test**: expo-updates가 dependencies에 추가되었는지 확인
- **Status**: [ ] Pending

### Task 5.2: app.json 업데이트 설정

- **User Story**: US4 - Configure OTA Updates with EAS Update
- **Description**: app.json에 runtimeVersion 정책과 updates URL을 설정한다.
- **Files**: `app.json`
- **Test**: runtimeVersion.policy와 updates.url이 설정되어 있는지 확인
- **Status**: [ ] Pending

### Task 5.3: 빌드 프로필 채널 연결

- **User Story**: US4 - Configure OTA Updates with EAS Update
- **Description**: eas.json의 각 빌드 프로필에 channel을 설정하여 Update 브랜치와 연결한다.
- **Files**: `eas.json`
- **Test**: 각 프로필에 channel이 설정되어 있는지 확인
- **Status**: [ ] Pending

### Task 5.4: OTA 업데이트 테스트

- **User Story**: US4 - Configure OTA Updates with EAS Update
- **Description**: preview 브랜치에 테스트 업데이트를 배포하여 EAS Update를 검증한다.
- **Files**: N/A (업데이트 실행)
- **Test**: `eas update --branch preview` 명령이 성공하는지 확인
- **Status**: [ ] Pending

---

## Phase 6: 검증 및 문서화

### Task 6.1: 전체 eas.json 검증

- **User Story**: All User Stories
- **Description**: 완성된 eas.json이 contracts/eas-json-schema.md의 스키마를 준수하는지 검증한다.
- **Files**: `eas.json`
- **Test**: JSON 구조가 스키마와 일치하는지 확인
- **Status**: [ ] Pending

### Task 6.2: 빌드 명령어 치트시트 작성

- **User Story**: All User Stories
- **Description**: 자주 사용하는 EAS 빌드 명령어를 정리한 치트시트를 작성한다.
- **Files**: `specs/003-eas-build/quickstart.md` (업데이트)
- **Test**: 모든 주요 명령어가 문서에 포함되어 있는지 확인
- **Status**: [ ] Pending

### Task 6.3: 트러블슈팅 가이드 작성

- **User Story**: All User Stories
- **Description**: 일반적인 빌드 오류와 해결 방법을 정리한 트러블슈팅 가이드를 작성한다.
- **Files**: `specs/003-eas-build/quickstart.md` (업데이트)
- **Test**: 주요 오류 시나리오와 해결책이 문서에 포함되어 있는지 확인
- **Status**: [ ] Pending

---

## Task Dependencies

```
Phase 1 (순차 실행)
  1.1 → 1.2 → 1.3 → 1.4 → 1.5

Phase 2 (1.4 완료 후)
  2.1 → 2.2, 2.3, 2.4 (병렬) → 2.5

Phase 3 (2.2, 2.3, 2.4 완료 후)
  3.1, 3.2, 3.3, 3.4 (병렬, 단 3.2는 Apple 계정 필요)

Phase 4 (2.2, 2.3, 2.4 완료 후)
  4.1, 4.2, 4.3 (병렬)

Phase 5 (Phase 1 완료 후)
  5.1 → 5.2 → 5.3 → 5.4

Phase 6 (모든 Phase 완료 후)
  6.1, 6.2, 6.3 (병렬)
```

## Progress Summary

| Phase     | Total  | Completed | Remaining |
| --------- | ------ | --------- | --------- |
| Phase 1   | 5      | 0         | 5         |
| Phase 2   | 5      | 0         | 5         |
| Phase 3   | 4      | 0         | 4         |
| Phase 4   | 3      | 0         | 3         |
| Phase 5   | 4      | 0         | 4         |
| Phase 6   | 3      | 0         | 3         |
| **Total** | **24** | **0**     | **24**    |
