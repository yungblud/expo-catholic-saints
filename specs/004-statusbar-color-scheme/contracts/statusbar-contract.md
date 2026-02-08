# Contract: StatusBar Color Scheme

**Feature Branch**: `004-statusbar-color-scheme`
**Date**: 2026-02-08

## Overview

이 기능은 외부 API 없이 시스템 ColorScheme을 감지하여 StatusBar 스타일을 결정하는 순수 UI 기능이다. 계약은 컴포넌트 인터페이스 수준에서 정의한다.

## Component Contract: StatusBar in Root Layout

### Input

| Source            | Value       | Type                        |
| ----------------- | ----------- | --------------------------- |
| System Appearance | colorScheme | `"light" \| "dark" \| null` |

### Output (StatusBar Style Mapping)

| System ColorScheme | StatusBar Style | StatusBar Text/Icons               |
| ------------------ | --------------- | ---------------------------------- |
| `"light"`          | `"dark"`        | 어두운 색상 (dark-content)         |
| `"dark"`           | `"light"`       | 밝은 색상 (light-content)          |
| `null`             | `"dark"`        | 어두운 색상 (기본값 = 라이트 모드) |

### Behavioral Contract

1. **초기 렌더링**: 앱 실행 시 시스템 ColorScheme을 즉시 감지하여 StatusBar 스타일 적용
2. **실시간 반응**: 시스템 테마 변경 시 앱 재시작 없이 StatusBar 스타일 업데이트
3. **폴백**: ColorScheme 감지 불가 시 라이트 모드(dark-content) 기본 적용
4. **크로스 플랫폼**: iOS와 Android에서 동일한 동작 보장

### Configuration Contract (app.json)

```json
{
  "expo": {
    "userInterfaceStyle": "automatic"
  }
}
```

이 설정이 `"automatic"`이어야 네이티브 레이어에서 테마 변경 이벤트를 JS로 전달한다.
