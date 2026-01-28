# Quickstart: EAS Build Setup

이 가이드는 EAS Build를 프로젝트에 설정하는 빠른 시작 가이드입니다.

## 사전 요구사항

- Node.js 18+
- Expo CLI
- Expo 계정
- Apple Developer Program 멤버십 (iOS 빌드용)
- Google Play Console 계정 (Android 스토어 배포용)

---

## 1. EAS CLI 설치 및 로그인 (5분)

### Step 1: EAS CLI 설치

```bash
npm install -g eas-cli
```

### Step 2: Expo 계정 로그인

```bash
eas login
```

### Step 3: 프로젝트 연결

```bash
eas init
```

프로젝트 ID가 `app.json`에 자동 추가됩니다.

---

## 2. EAS Build 초기화 (5분)

### Step 1: eas.json 생성

```bash
eas build:configure
```

이 명령은 기본 `eas.json` 파일을 생성합니다.

### Step 2: eas.json 확인 및 수정

```json
{
  "cli": {
    "version": ">= 12.0.0"
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
  }
}
```

---

## 3. Development 빌드 생성 (5분)

### iOS 시뮬레이터용

```bash
eas build --profile development --platform ios
```

### Android용

```bash
eas build --profile development --platform android
```

### 빌드 상태 확인

```bash
eas build:list
```

또는 [EAS 대시보드](https://expo.dev/accounts/[username]/projects/[project])에서 확인

---

## 4. Preview 빌드 생성 (테스터 배포)

### iOS + Android 동시 빌드

```bash
eas build --profile preview --platform all
```

### iOS 테스트 디바이스 등록

```bash
eas device:create
```

QR 코드를 스캔하여 디바이스 UDID 등록

### 빌드 설치

빌드 완료 후 제공되는 링크로 디바이스에 직접 설치

---

## 5. Production 빌드 생성 (스토어 제출)

### Step 1: 빌드 생성

```bash
eas build --profile production --platform all
```

### Step 2: 스토어 제출 (선택)

```bash
# iOS App Store
eas submit --platform ios

# Google Play
eas submit --platform android
```

---

## 6. EAS Update 설정 (OTA 업데이트)

### Step 1: expo-updates 설치

```bash
npx expo install expo-updates
```

### Step 2: app.json 업데이트

```json
{
  "expo": {
    "runtimeVersion": {
      "policy": "fingerprint"
    },
    "updates": {
      "url": "https://u.expo.dev/[PROJECT_ID]"
    }
  }
}
```

### Step 3: 업데이트 배포

```bash
# Preview 브랜치에 업데이트
eas update --branch preview --message "Fix bug"

# Production 브랜치에 업데이트
eas update --branch production --message "Release v1.0.1"
```

---

## 빌드 명령어 요약

| 명령어                                               | 설명                     |
| ---------------------------------------------------- | ------------------------ |
| `eas build --profile development --platform ios`     | iOS dev 빌드             |
| `eas build --profile development --platform android` | Android dev 빌드         |
| `eas build --profile preview --platform all`         | 테스트용 빌드            |
| `eas build --profile production --platform all`      | 스토어용 빌드            |
| `eas build:list`                                     | 빌드 목록 확인           |
| `eas update --branch [name]`                         | OTA 업데이트 배포        |
| `eas device:create`                                  | iOS 테스트 디바이스 등록 |
| `eas credentials`                                    | 자격 증명 관리           |

---

## 트러블슈팅

### 빌드 실패 시

```bash
# 빌드 로그 확인
eas build:view [BUILD_ID]

# 로컬에서 빌드 테스트 (네이티브 환경 필요)
eas build --local
```

### iOS 자격 증명 문제

```bash
# 자격 증명 재설정
eas credentials --platform ios
```

### 빌드 캐시 문제

```bash
# 캐시 없이 빌드
eas build --clear-cache
```

---

## 참고 문서

- [EAS Build 공식 문서](https://docs.expo.dev/build/introduction/)
- [EAS Update 공식 문서](https://docs.expo.dev/eas-update/introduction/)
- [data-model.md](./data-model.md) - eas.json 구조
- [contracts/eas-json-schema.md](./contracts/eas-json-schema.md) - 설정 스키마
