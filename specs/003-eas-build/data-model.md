# Data Model: EAS Build Setup

**Feature**: 003-eas-build
**Date**: 2026-01-28

## Entity Definitions

### 1. EAS Configuration (eas.json)

**Description**: EAS Build 및 Submit 설정을 정의하는 최상위 구성 파일

**Attributes**:

| Field  | Type         | Required | Description      |
| ------ | ------------ | -------- | ---------------- |
| cli    | CliConfig    | No       | EAS CLI 설정     |
| build  | BuildConfig  | Yes      | 빌드 프로필 정의 |
| submit | SubmitConfig | No       | 스토어 제출 설정 |

**File Location**: 프로젝트 루트 `/eas.json`

---

### 2. Build Profile

**Description**: 특정 빌드 환경(development, preview, production)의 구성

**Attributes**:

| Field             | Type               | Required | Description                                     |
| ----------------- | ------------------ | -------- | ----------------------------------------------- |
| name              | string             | Yes      | 프로필 이름 (development, preview, production)  |
| distribution      | enum               | No       | internal, store                                 |
| developmentClient | boolean            | No       | expo-dev-client 포함 여부                       |
| autoIncrement     | boolean/string     | No       | 버전 자동 증가 (true, "version", "buildNumber") |
| channel           | string             | No       | EAS Update 채널 연결                            |
| env               | object             | No       | 환경 변수                                       |
| ios               | IosBuildConfig     | No       | iOS 전용 설정                                   |
| android           | AndroidBuildConfig | No       | Android 전용 설정                               |

**Standard Profiles**:

| Profile     | distribution | developmentClient | channel     |
| ----------- | ------------ | ----------------- | ----------- |
| development | internal     | true              | development |
| preview     | internal     | false             | preview     |
| production  | store        | false             | production  |

---

### 3. iOS Build Config

**Description**: iOS 빌드 전용 설정

**Attributes**:

| Field              | Type    | Required | Description                                         |
| ------------------ | ------- | -------- | --------------------------------------------------- |
| simulator          | boolean | No       | 시뮬레이터 빌드 여부                                |
| resourceClass      | string  | No       | 빌드 머신 사양 (default, m-medium, large)           |
| image              | string  | No       | 빌드 이미지 (latest, macos-ventura-13.6-xcode-15.2) |
| bundleIdentifier   | string  | No       | 번들 ID 오버라이드                                  |
| buildConfiguration | string  | No       | Debug/Release                                       |

---

### 4. Android Build Config

**Description**: Android 빌드 전용 설정

**Attributes**:

| Field         | Type   | Required | Description        |
| ------------- | ------ | -------- | ------------------ |
| buildType     | enum   | No       | apk, app-bundle    |
| resourceClass | string | No       | 빌드 머신 사양     |
| image         | string | No       | 빌드 이미지        |
| applicationId | string | No       | 앱 ID 오버라이드   |
| gradleCommand | string | No       | 커스텀 Gradle 명령 |

---

### 5. Credentials

**Description**: 앱 서명에 필요한 자격 증명

**Types**:

| Type                     | Platform | Description         |
| ------------------------ | -------- | ------------------- |
| Distribution Certificate | iOS      | 앱 서명용 인증서    |
| Provisioning Profile     | iOS      | 디바이스/배포 권한  |
| Keystore                 | Android  | 앱 서명용 키스토어  |
| Upload Key               | Android  | Play Store 업로드용 |

**Management**:

- EAS Managed: EAS가 자동 생성/관리
- Local: 직접 업로드하여 관리

---

### 6. Update Branch

**Description**: OTA 업데이트가 배포되는 채널

**Attributes**:

| Field          | Type     | Required | Description                                    |
| -------------- | -------- | -------- | ---------------------------------------------- |
| name           | string   | Yes      | 브랜치 이름 (production, preview, development) |
| runtimeVersion | string   | Yes      | 호환되는 런타임 버전                           |
| updates        | Update[] | Yes      | 배포된 업데이트 목록                           |

**Relationship with Build Profile**:

```
Build Profile (channel) ──────> Update Branch (name)
     └── production ──────────────> production
     └── preview ─────────────────> preview
     └── development ─────────────> development
```

---

## Entity Relationships

```
┌─────────────────────┐
│   eas.json          │
│                     │
│  - cli              │
│  - build            │
│  - submit           │
└──────────┬──────────┘
           │ contains 1..*
           ▼
┌─────────────────────┐
│   Build Profile     │
│                     │
│  - name             │
│  - distribution     │
│  - channel ─────────┼──────┐
└──────────┬──────────┘      │
           │ contains 0..1   │
           ▼                 │
┌─────────────────────┐      │
│  Platform Config    │      │
│  (iOS/Android)      │      │
│                     │      │
│  - resourceClass    │      │
│  - buildType        │      │
└─────────────────────┘      │
                             │
           ┌─────────────────┘
           │ links to
           ▼
┌─────────────────────┐
│   Update Branch     │
│                     │
│  - name             │
│  - runtimeVersion   │
└─────────────────────┘
```

---

## eas.json Structure

```json
{
  "cli": {
    "version": ">= 12.0.0",
    "appVersionSource": "remote"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "channel": "development",
      "ios": {
        "simulator": true
      }
    },
    "preview": {
      "distribution": "internal",
      "channel": "preview",
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "autoIncrement": true,
      "channel": "production",
      "android": {
        "buildType": "app-bundle"
      }
    }
  },
  "submit": {
    "production": {
      "ios": {
        "appleId": "your-apple-id@example.com",
        "ascAppId": "1234567890"
      },
      "android": {
        "serviceAccountKeyPath": "./google-service-account.json",
        "track": "internal"
      }
    }
  }
}
```

---

## app.json Updates for EAS

```json
{
  "expo": {
    "name": "Catholic Saints",
    "slug": "catholic-saints",
    "version": "1.0.0",
    "runtimeVersion": {
      "policy": "fingerprint"
    },
    "updates": {
      "url": "https://u.expo.dev/[PROJECT_ID]"
    },
    "ios": {
      "bundleIdentifier": "com.yourcompany.catholicsaints",
      "buildNumber": "1"
    },
    "android": {
      "package": "com.yourcompany.catholicsaints",
      "versionCode": 1
    },
    "extra": {
      "eas": {
        "projectId": "[PROJECT_ID]"
      }
    }
  }
}
```

---

## Environment Variables

### eas.json env section

| Variable    | Development | Preview         | Production |
| ----------- | ----------- | --------------- | ---------- |
| APP_ENV     | development | preview         | production |
| API_URL     | dev-api.com | staging-api.com | api.com    |
| ENABLE_LOGS | true        | true            | false      |

### EAS Secrets (민감한 값)

| Secret Name          | Scope   | Description        |
| -------------------- | ------- | ------------------ |
| SENTRY_DSN           | project | Sentry 에러 리포팅 |
| API_KEY              | project | 외부 API 키        |
| GOOGLE_SERVICES_JSON | project | Firebase 설정      |
