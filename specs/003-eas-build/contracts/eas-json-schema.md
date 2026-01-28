# eas.json Schema

**Purpose**: EAS Build 설정 파일의 구조와 유효성 검사 규칙

## File Location

```
/eas.json  (프로젝트 루트)
```

## Schema Overview

```json
{
  "cli": {
    /* CLI 설정 */
  },
  "build": {
    /* 빌드 프로필 */
  },
  "submit": {
    /* 스토어 제출 설정 */
  }
}
```

---

## Build Profile Schema

### Required Profiles

| Profile     | 용도          | 필수 |
| ----------- | ------------- | ---- |
| development | 개발용 빌드   | Yes  |
| preview     | 테스트용 빌드 | Yes  |
| production  | 스토어 제출용 | Yes  |

### Profile Fields

```typescript
interface BuildProfile {
  // 공통 설정
  distribution?: 'internal' | 'store';
  developmentClient?: boolean;
  autoIncrement?: boolean | 'version' | 'buildNumber';
  channel?: string;
  releaseChannel?: string; // deprecated, use channel

  // 환경 변수
  env?: Record<string, string>;

  // 플랫폼별 설정
  ios?: IosBuildConfig;
  android?: AndroidBuildConfig;

  // 빌드 머신
  resourceClass?: 'default' | 'm-medium' | 'large';

  // 캐시
  cache?: {
    key?: string;
    paths?: string[];
    disabled?: boolean;
  };
}
```

### iOS Build Config

```typescript
interface IosBuildConfig {
  // 빌드 타입
  simulator?: boolean;
  buildConfiguration?: 'Debug' | 'Release';
  scheme?: string;

  // 앱 식별
  bundleIdentifier?: string;

  // 자격 증명
  credentialsSource?: 'local' | 'remote';

  // 빌드 환경
  resourceClass?: 'default' | 'm-medium' | 'large';
  image?: string; // e.g., 'macos-ventura-13.6-xcode-15.2'

  // 빌드 설정
  autoIncrement?: boolean | 'version' | 'buildNumber';
}
```

### Android Build Config

```typescript
interface AndroidBuildConfig {
  // 빌드 타입
  buildType?: 'apk' | 'app-bundle';
  gradleCommand?: string;

  // 앱 식별
  applicationId?: string;

  // 자격 증명
  credentialsSource?: 'local' | 'remote';

  // 빌드 환경
  resourceClass?: 'default' | 'medium' | 'large';
  image?: string; // e.g., 'ubuntu-22.04-jdk-17-ndk-r25b'

  // 빌드 설정
  autoIncrement?: boolean | 'version' | 'versionCode';
}
```

---

## Complete Example

```json
{
  "cli": {
    "version": ">= 12.0.0",
    "appVersionSource": "remote",
    "requireCommit": true
  },
  "build": {
    "base": {
      "env": {
        "EXPO_PUBLIC_APP_NAME": "Catholic Saints"
      }
    },
    "development": {
      "extends": "base",
      "developmentClient": true,
      "distribution": "internal",
      "channel": "development",
      "env": {
        "APP_ENV": "development"
      },
      "ios": {
        "simulator": true,
        "resourceClass": "m-medium"
      },
      "android": {
        "buildType": "apk"
      }
    },
    "development:device": {
      "extends": "development",
      "ios": {
        "simulator": false
      }
    },
    "preview": {
      "extends": "base",
      "distribution": "internal",
      "channel": "preview",
      "env": {
        "APP_ENV": "preview"
      },
      "ios": {
        "resourceClass": "m-medium"
      },
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "extends": "base",
      "distribution": "store",
      "channel": "production",
      "autoIncrement": true,
      "env": {
        "APP_ENV": "production"
      },
      "ios": {
        "resourceClass": "m-medium"
      },
      "android": {
        "buildType": "app-bundle"
      }
    }
  },
  "submit": {
    "production": {
      "ios": {
        "appleId": "developer@example.com",
        "ascAppId": "1234567890",
        "appleTeamId": "XXXXXXXXXX"
      },
      "android": {
        "serviceAccountKeyPath": "./google-service-account.json",
        "track": "internal",
        "releaseStatus": "draft"
      }
    }
  }
}
```

---

## Validation Rules

### Profile Names

- 영문 소문자, 숫자, 하이픈, 콜론 허용
- 예: `development`, `preview:ios`, `production-v2`

### Channel Names

- Update Branch와 매칭되어야 함
- 일반적으로 프로필 이름과 동일하게 설정

### Environment Variables

- `EXPO_PUBLIC_` 접두사: 클라이언트 코드에서 접근 가능
- 그 외: 빌드 시점에서만 사용

### Resource Class

| Class    | iOS (Apple Silicon)   | Android       |
| -------- | --------------------- | ------------- |
| default  | M1, 4 vCPU, 14GB      | 4 vCPU, 12GB  |
| m-medium | M2, 4 vCPU, 14GB      | 8 vCPU, 32GB  |
| large    | M2 Pro, 12 vCPU, 22GB | 16 vCPU, 64GB |

---

## Checklist

- [ ] `development` 프로필에 `developmentClient: true` 설정
- [ ] `preview` 프로필에 `distribution: internal` 설정
- [ ] `production` 프로필에 `autoIncrement: true` 설정
- [ ] 각 프로필에 적절한 `channel` 설정
- [ ] Android production에 `buildType: app-bundle` 설정
- [ ] 민감한 환경 변수는 EAS Secrets로 관리
