# Research: EAS Build Setup

**Feature**: 003-eas-build
**Date**: 2026-01-28

## Research Tasks

### 1. EAS Build Profile Best Practices

**Task**: EAS Build의 development, preview, production 프로필 구성 방법 조사

**Findings**:

#### Development Build

```json
{
  "development": {
    "developmentClient": true,
    "distribution": "internal",
    "ios": {
      "simulator": true
    }
  }
}
```

- `developmentClient: true`: expo-dev-client 포함, 네이티브 모듈 디버깅 가능
- `distribution: internal`: 내부 배포용 (Ad Hoc)
- iOS 시뮬레이터 빌드 옵션 제공

#### Preview Build

```json
{
  "preview": {
    "distribution": "internal",
    "ios": {
      "resourceClass": "m-medium"
    },
    "android": {
      "buildType": "apk"
    }
  }
}
```

- `distribution: internal`: 테스터 배포용
- Android는 APK로 빌드 (설치 편의성)
- iOS는 Ad Hoc 프로비저닝

#### Production Build

```json
{
  "production": {
    "autoIncrement": true,
    "ios": {
      "resourceClass": "m-medium"
    },
    "android": {
      "buildType": "app-bundle"
    }
  }
}
```

- `autoIncrement: true`: 빌드 번호 자동 증가
- Android는 AAB (Google Play 요구사항)
- iOS는 App Store 배포용

**Decision**: 세 가지 표준 프로필 사용 (development, preview, production)
**Rationale**: Expo 공식 권장 패턴, 대부분의 워크플로우 커버
**Alternatives Rejected**:

- staging 프로필 추가: 현재 규모에서 과도함
- 플랫폼별 별도 프로필: 관리 복잡성 증가

---

### 2. iOS Credentials Management

**Task**: iOS 빌드를 위한 자격 증명 관리 방법 조사

**Findings**:

#### EAS Managed Credentials (권장)

- EAS가 인증서와 프로비저닝 프로필 자동 생성/관리
- Apple Developer 계정만 연결하면 됨
- 팀 환경에서 자격 증명 공유 간편

#### Local Credentials

- 기존 인증서/프로필 직접 업로드
- 레거시 앱 마이그레이션 시 유용

#### 프로비저닝 프로필 유형

| 유형        | 용도                    | 배포   |
| ----------- | ----------------------- | ------ |
| Development | 개발 디바이스           | 제한적 |
| Ad Hoc      | 테스트 디바이스 (100대) | 내부   |
| Enterprise  | 조직 내 무제한          | 내부   |
| App Store   | 스토어 제출             | 공개   |

**Decision**: EAS Managed Credentials 사용
**Rationale**: 설정 간편, 자동 갱신, 팀 공유 용이
**Alternatives Rejected**:

- Local Credentials: 수동 관리 필요, 만료 관리 어려움

---

### 3. Android Keystore Management

**Task**: Android 빌드를 위한 키스토어 관리 방법 조사

**Findings**:

#### EAS Managed Keystore (권장)

- EAS가 키스토어 자동 생성/관리
- 암호화하여 안전하게 저장
- 첫 빌드 시 자동 생성

#### Local Keystore

- 기존 키스토어 업로드 가능
- Play App Signing 사용 시 업로드 키만 관리

#### Google Play App Signing

- Google이 릴리스 키 관리
- 업로드 키로 서명 후 Google이 재서명
- 키 분실 시에도 앱 업데이트 가능

**Decision**: EAS Managed + Play App Signing 조합
**Rationale**: 보안 강화, 키 분실 위험 감소
**Alternatives Rejected**:

- Local Keystore만 사용: 키 분실 시 앱 업데이트 불가

---

### 4. EAS Update Configuration

**Task**: OTA 업데이트를 위한 EAS Update 설정 방법 조사

**Findings**:

#### app.json 설정

```json
{
  "expo": {
    "updates": {
      "url": "https://u.expo.dev/[PROJECT_ID]"
    },
    "runtimeVersion": {
      "policy": "appVersion"
    }
  }
}
```

#### Runtime Version Policy

| Policy        | 설명                  | 용도               |
| ------------- | --------------------- | ------------------ |
| appVersion    | app.json version 기반 | 단순한 프로젝트    |
| nativeVersion | 네이티브 버전 기반    | 네이티브 변경 빈번 |
| fingerprint   | 네이티브 코드 해시    | 자동 관리          |

#### Update Branches

- `production`: production 빌드와 연결
- `preview`: preview 빌드와 연결
- `development`: development 빌드와 연결 (선택)

**Decision**: fingerprint 정책 + 프로필별 브랜치
**Rationale**: 네이티브 변경 자동 감지, 명확한 채널 분리
**Alternatives Rejected**:

- appVersion: 수동 관리 필요
- 단일 브랜치: 환경 분리 불가

---

### 5. Environment Variables

**Task**: 빌드 환경별 환경 변수 관리 방법 조사

**Findings**:

#### eas.json에서 설정

```json
{
  "build": {
    "development": {
      "env": {
        "APP_ENV": "development",
        "API_URL": "https://dev-api.example.com"
      }
    },
    "production": {
      "env": {
        "APP_ENV": "production",
        "API_URL": "https://api.example.com"
      }
    }
  }
}
```

#### EAS Secrets (민감한 값)

```bash
eas secret:create --name API_KEY --value xxx --scope project
```

- 프로젝트 또는 계정 범위 지정 가능
- 빌드 시 자동 주입
- 대시보드에서 관리

**Decision**: eas.json env + EAS Secrets 조합
**Rationale**: 민감하지 않은 값은 버전 관리, 민감한 값은 Secrets
**Alternatives Rejected**:

- .env 파일만 사용: Secrets 누출 위험
- 모든 값 Secrets: 과도한 관리 복잡성

---

### 6. Build Notification Setup

**Task**: 빌드 완료 알림 설정 방법 조사

**Findings**:

#### 기본 알림

- 이메일: Expo 계정 이메일로 자동 발송
- 푸시 알림: Expo Go 앱으로 알림

#### Webhook

```json
{
  "build": {
    "production": {
      "channel": "production"
    }
  },
  "submit": {
    "production": {}
  }
}
```

#### Slack/Discord 연동

- EAS 대시보드에서 설정
- 빌드 시작/완료/실패 알림

**Decision**: 이메일 + Slack 웹훅
**Rationale**: 기본 알림으로 충분, 팀 협업 시 Slack 추가
**Alternatives Rejected**:

- 커스텀 웹훅 서버: 과도한 인프라 필요

---

## Summary of Decisions

| Decision              | Chosen Approach                  | Key Rationale        |
| --------------------- | -------------------------------- | -------------------- |
| Build Profiles        | development, preview, production | Expo 표준 패턴       |
| iOS Credentials       | EAS Managed                      | 자동 관리, 팀 공유   |
| Android Keystore      | EAS Managed + Play App Signing   | 보안 강화            |
| OTA Updates           | fingerprint + 프로필별 브랜치    | 자동 관리, 환경 분리 |
| Environment Variables | eas.json + EAS Secrets           | 보안과 편의성 균형   |
| Notifications         | 이메일 + Slack                   | 간편한 설정          |
