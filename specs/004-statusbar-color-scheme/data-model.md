# Data Model: StatusBar Color Scheme 자동 적용

**Feature Branch**: `004-statusbar-color-scheme`
**Date**: 2026-02-08

## Overview

이 기능은 데이터 영속성이 필요 없는 순수 UI 기능이다. 시스템 ColorScheme을 감지하여 StatusBar 스타일을 결정하는 로직만 존재한다.

## Entities

### ColorScheme (시스템 상태, 읽기 전용)

| Field  | Type                        | Description                    |
| ------ | --------------------------- | ------------------------------ |
| scheme | `"light" \| "dark" \| null` | 기기의 현재 시스템 ColorScheme |

- 출처: `react-native`의 `Appearance` 모듈
- 상태 전환: 시스템 설정 변경 시 자동 업데이트
- 앱 내 저장 없음 (시스템 값을 실시간으로 참조)

### StatusBarStyle (파생 상태)

| Field | Type                          | Description                    |
| ----- | ----------------------------- | ------------------------------ |
| style | `"auto" \| "light" \| "dark"` | StatusBar 텍스트/아이콘 스타일 |

- `scheme === "dark"` → `style = "light"` (밝은 텍스트)
- `scheme === "light"` 또는 `scheme === null` → `style = "dark"` (어두운 텍스트)
- `style = "auto"` 사용 시 위 매핑이 내부적으로 자동 적용됨

## State Transitions

```
시스템 라이트 모드 ──(사용자가 다크 모드 전환)──→ 시스템 다크 모드
       ↓                                              ↓
  StatusBar: dark-content                    StatusBar: light-content
  (어두운 텍스트/아이콘)                      (밝은 텍스트/아이콘)
```

## Storage

해당 없음. 모든 상태는 시스템에서 실시간으로 파생되며 영속성이 필요하지 않다.
