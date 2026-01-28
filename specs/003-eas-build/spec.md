# Feature Specification: EAS Build Setup

**Feature Branch**: `003-eas-build`
**Created**: 2026-01-28
**Status**: Draft
**Input**: User description: "Add EAS Build functionality for iOS and Android app builds"

## User Scenarios & Testing _(mandatory)_

### User Story 1 - Configure EAS Build for Development (Priority: P1)

개발자가 프로젝트에 EAS Build를 설정하여 개발용 빌드(development build)를 클라우드에서 생성할 수 있도록 한다. 개발 빌드는 Expo Go 없이 네이티브 모듈을 테스트할 수 있게 해준다.

**Why this priority**: EAS Build의 기본 설정 없이는 어떤 빌드도 생성할 수 없으므로 가장 기본적인 기능이다.

**Independent Test**: `eas build --profile development --platform ios` 명령으로 개발 빌드가 성공적으로 생성되는지 확인한다.

**Acceptance Scenarios**:

1. **Given** EAS가 설정되지 않은 프로젝트가 있을 때, **When** 개발자가 EAS 초기 설정을 완료하면, **Then** `eas.json` 파일이 생성되고 development, preview, production 프로필이 정의된다.
2. **Given** EAS가 설정된 프로젝트에서, **When** 개발자가 iOS development 빌드를 요청하면, **Then** 클라우드에서 빌드가 시작되고 완료 시 설치 가능한 빌드 파일이 제공된다.
3. **Given** EAS가 설정된 프로젝트에서, **When** 개발자가 Android development 빌드를 요청하면, **Then** 클라우드에서 APK 또는 AAB 파일이 생성된다.

---

### User Story 2 - Create Preview Builds for Testing (Priority: P1)

QA 팀이나 내부 테스터가 앱을 테스트할 수 있도록 preview 빌드를 생성하고 배포한다. Preview 빌드는 프로덕션과 유사하지만 내부 배포용이다.

**Why this priority**: 개발 빌드와 함께 테스트 워크플로우의 핵심 기능이다.

**Independent Test**: `eas build --profile preview --platform all` 명령으로 iOS와 Android preview 빌드가 모두 생성되는지 확인한다.

**Acceptance Scenarios**:

1. **Given** preview 프로필이 설정되어 있을 때, **When** 개발자가 preview 빌드를 요청하면, **Then** iOS는 Ad Hoc 또는 Enterprise 배포용, Android는 APK로 빌드된다.
2. **Given** preview 빌드가 완료되었을 때, **When** 테스터가 빌드 링크를 받으면, **Then** 디바이스에 직접 설치할 수 있다.
3. **Given** iOS preview 빌드를 위해, **When** 테스트 디바이스 UDID가 필요하면, **Then** EAS에 디바이스를 등록하고 프로비저닝 프로필에 포함시킬 수 있다.

---

### User Story 3 - Create Production Builds for Store Submission (Priority: P2)

앱 스토어(App Store, Google Play)에 제출할 프로덕션 빌드를 생성한다.

**Why this priority**: 앱 출시 전 단계로, 개발/테스트 빌드가 안정화된 후 필요하다.

**Independent Test**: `eas build --profile production --platform all` 명령으로 스토어 제출용 빌드가 생성되는지 확인한다.

**Acceptance Scenarios**:

1. **Given** production 프로필이 설정되어 있을 때, **When** 개발자가 production 빌드를 요청하면, **Then** iOS는 App Store 배포용(.ipa), Android는 Google Play 배포용(.aab)으로 빌드된다.
2. **Given** production 빌드가 완료되었을 때, **When** 개발자가 빌드를 다운로드하면, **Then** 각 스토어의 제출 요구사항을 충족하는 바이너리가 제공된다.
3. **Given** iOS production 빌드를 위해, **When** 앱 서명이 필요하면, **Then** EAS에서 관리하는 인증서와 프로비저닝 프로필이 자동으로 사용된다.

---

### User Story 4 - Configure OTA Updates with EAS Update (Priority: P3)

JavaScript 번들 업데이트를 OTA(Over-The-Air)로 배포하여 앱 스토어 심사 없이 빠르게 업데이트를 제공한다.

**Why this priority**: 빌드 기능이 안정화된 후 추가되는 고급 기능이다.

**Independent Test**: `eas update --branch preview` 명령으로 OTA 업데이트가 배포되고 앱에서 수신되는지 확인한다.

**Acceptance Scenarios**:

1. **Given** EAS Update가 설정되어 있을 때, **When** 개발자가 코드 변경 후 업데이트를 푸시하면, **Then** 새 번들이 지정된 브랜치에 배포된다.
2. **Given** 앱이 특정 업데이트 브랜치를 구독하고 있을 때, **When** 해당 브랜치에 새 업데이트가 푸시되면, **Then** 앱 재시작 시 새 업데이트가 자동으로 적용된다.
3. **Given** 잘못된 업데이트가 배포되었을 때, **When** 개발자가 롤백을 요청하면, **Then** 이전 버전의 번들로 되돌릴 수 있다.

---

### Edge Cases

- EAS 계정 인증이 만료되었을 때 어떻게 재인증하는가?
- iOS 빌드에서 Apple Developer 계정 연결이 필요할 때 어떻게 처리하는가?
- 빌드 중 오류가 발생했을 때 로그를 어떻게 확인하는가?
- 무료 플랜의 빌드 큐 대기 시간이 길어질 때 대안은?
- 네이티브 모듈이 추가되었을 때 빌드 설정을 어떻게 업데이트하는가?

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: 프로젝트에 EAS CLI가 설치되고 인증이 완료되어야 한다
- **FR-002**: `eas.json` 파일에 development, preview, production 빌드 프로필이 정의되어야 한다
- **FR-003**: iOS 빌드를 위해 Apple Developer 계정이 EAS에 연결되어야 한다
- **FR-004**: Android 빌드를 위해 키스토어가 EAS에서 관리되거나 직접 제공되어야 한다
- **FR-005**: 각 빌드 프로필에서 환경 변수를 설정할 수 있어야 한다
- **FR-006**: 빌드 완료 시 알림(이메일, 웹훅 등)을 받을 수 있어야 한다
- **FR-007**: EAS Update 사용 시 업데이트 브랜치와 빌드 프로필이 연결되어야 한다
- **FR-008**: 빌드 히스토리와 아티팩트를 EAS 대시보드에서 관리할 수 있어야 한다

### Key Entities

- **Build Profile**: development, preview, production 등 빌드 구성을 정의하는 단위
- **Build**: 특정 프로필과 플랫폼으로 생성된 개별 빌드 인스턴스
- **Credentials**: iOS 인증서/프로비저닝 프로필, Android 키스토어 등 앱 서명 자격 증명
- **Update Branch**: OTA 업데이트가 배포되는 채널 (예: production, preview, development)

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: 개발자가 EAS 초기 설정을 15분 이내에 완료할 수 있어야 한다
- **SC-002**: development 빌드가 요청 후 30분 이내에 완료되어야 한다 (EAS 큐 대기 시간 제외)
- **SC-003**: preview 빌드를 테스터가 5분 이내에 디바이스에 설치할 수 있어야 한다
- **SC-004**: production 빌드가 각 스토어의 제출 요구사항을 100% 충족해야 한다
- **SC-005**: OTA 업데이트가 푸시 후 앱에서 5분 이내에 수신되어야 한다

## Assumptions

- Expo SDK 52 이상 버전을 사용하고 있다
- EAS CLI가 전역으로 설치되어 있거나 설치할 수 있다
- 개발자가 Expo 계정을 가지고 있다
- iOS 빌드를 위해 Apple Developer Program 멤버십이 있다 (연간 $99)
- Android 빌드를 위해 Google Play Console 계정이 있다 (최초 $25)
- 인터넷 연결이 안정적으로 유지된다
