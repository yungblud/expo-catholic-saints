# Quickstart: StatusBar Color Scheme 자동 적용

**Feature Branch**: `004-statusbar-color-scheme`
**Date**: 2026-02-08

## Prerequisites

- Node.js 18+
- Expo CLI (`npx expo`)
- iOS Simulator 또는 Android Emulator
- expo-dev-client (개발 빌드)

## Setup

```bash
# 브랜치 체크아웃
git checkout 004-statusbar-color-scheme

# 의존성 설치
npm install

# 개발 서버 시작
npx expo start
```

## Testing

### 자동화 테스트

```bash
# 전체 테스트 실행
npm test

# StatusBar 관련 테스트만 실행
npx jest --testPathPattern="statusbar|color-scheme"

# 워치 모드
npm run test:watch
```

### 수동 테스트 (디바이스/에뮬레이터)

**iOS Simulator**:

1. 앱 실행: `npx expo run:ios`
2. 테마 전환: `Cmd + Shift + A` (라이트 ↔ 다크 토글)
3. StatusBar 텍스트 색상 변경 확인

**Android Emulator**:

1. 앱 실행: `npx expo run:android`
2. 다크 모드 활성화: `adb shell "cmd uimode night yes"`
3. 라이트 모드 복원: `adb shell "cmd uimode night no"`
4. StatusBar 텍스트 색상 변경 확인

## Key Files

| File              | Purpose                                |
| ----------------- | -------------------------------------- |
| `app/_layout.tsx` | Root layout — StatusBar 컴포넌트 위치  |
| `app.json`        | `userInterfaceStyle: "automatic"` 설정 |

## Verification Checklist

- [ ] 라이트 모드에서 StatusBar 텍스트가 어두운 색상인지 확인
- [ ] 다크 모드에서 StatusBar 텍스트가 밝은 색상인지 확인
- [ ] 앱 실행 중 테마 전환 시 StatusBar가 즉시 반영되는지 확인
- [ ] iOS와 Android 모두에서 동작 확인
