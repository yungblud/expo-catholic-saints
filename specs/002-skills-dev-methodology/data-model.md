# Data Model: Skills-Based Development Methodology

**Feature**: 002-skills-dev-methodology
**Date**: 2026-01-28

## Entity Definitions

### 1. Skill Package

**Description**: AI 어시스턴트가 참조하는 규칙과 가이드라인의 논리적 단위

**Attributes**:

| Field       | Type       | Required | Description                    |
| ----------- | ---------- | -------- | ------------------------------ |
| name        | string     | Yes      | Skill 고유 식별자 (kebab-case) |
| description | string     | Yes      | Skill 설명 및 용도             |
| version     | semver     | Yes      | 버전 (예: "1.0.0")             |
| author      | string     | Yes      | 작성자/팀                      |
| license     | string     | Yes      | 라이선스 (예: "MIT")           |
| triggers    | string[]   | Yes      | 활성화 조건 목록               |
| categories  | Category[] | No       | 규칙 카테고리 목록             |

**Directory Structure**:

```
.agents/skills/[name]/
├── SKILL.md          # 메타데이터 + 개요
├── AGENTS.md         # 컴파일된 전체 가이드
└── rules/            # 개별 규칙 파일
```

**State Transitions**: N/A (정적 문서)

---

### 2. Rule

**Description**: 특정 코딩 패턴이나 best practice를 정의하는 단일 규칙

**Attributes**:

| Field             | Type          | Required | Description                   |
| ----------------- | ------------- | -------- | ----------------------------- |
| title             | string        | Yes      | 규칙 제목                     |
| impact            | enum          | Yes      | CRITICAL, HIGH, MEDIUM, LOW   |
| impactDescription | string        | Yes      | 영향도 요약                   |
| tags              | string[]      | Yes      | 검색/분류용 태그              |
| category          | string        | Yes      | 소속 카테고리 (파일명 prefix) |
| description       | string        | Yes      | 규칙 설명                     |
| incorrectExample  | CodeExample   | Yes      | 잘못된 코드 예제              |
| correctExample    | CodeExample   | Yes      | 올바른 코드 예제              |
| alternatives      | CodeExample[] | No       | 대안 예제                     |
| references        | string[]      | No       | 참고 링크                     |

**File Location**: `.agents/skills/[skill-name]/rules/[category]-[topic].md`

**Validation Rules**:

- title은 50자 이내
- impact는 반드시 4개 값 중 하나
- incorrectExample과 correctExample은 필수
- 파일명은 kebab-case, 25자 이내 권장

---

### 3. Category

**Description**: 관련 규칙들을 그룹화하는 논리적 단위

**Attributes**:

| Field       | Type   | Required | Description                    |
| ----------- | ------ | -------- | ------------------------------ |
| name        | string | Yes      | 카테고리명 (kebab-case prefix) |
| displayName | string | Yes      | 표시용 이름                    |
| impact      | enum   | Yes      | 카테고리 전체 영향도           |
| description | string | No       | 카테고리 설명                  |
| rules       | Rule[] | Yes      | 소속 규칙 목록                 |

**Standard Categories** (React Native 예시):
| Prefix | Display Name | Impact |
|--------|--------------|--------|
| list-performance | List Performance | CRITICAL |
| animation | Animation | HIGH |
| navigation | Navigation | HIGH |
| ui | User Interface | MEDIUM |
| react-state | React State | MEDIUM |
| rendering | Rendering | MEDIUM |
| monorepo | Monorepo | LOW |
| fonts | Fonts | LOW |

---

### 4. CodeExample

**Description**: 규칙 내 코드 예제 블록

**Attributes**:

| Field       | Type   | Required | Description                |
| ----------- | ------ | -------- | -------------------------- |
| language    | string | Yes      | 코드 언어 (tsx, ts, js 등) |
| code        | string | Yes      | 코드 내용                  |
| explanation | string | Yes      | 왜 이 코드가 좋은지/나쁜지 |
| comment     | string | No       | 인라인 주석                |

---

## Entity Relationships

```
┌─────────────────┐
│  Skill Package  │
│                 │
│  - name         │
│  - version      │
│  - triggers     │
└────────┬────────┘
         │ contains 1..*
         ▼
┌─────────────────┐
│    Category     │
│                 │
│  - name         │
│  - impact       │
└────────┬────────┘
         │ contains 1..*
         ▼
┌─────────────────┐
│      Rule       │
│                 │
│  - title        │
│  - impact       │
└────────┬────────┘
         │ contains 2..*
         ▼
┌─────────────────┐
│  CodeExample    │
│                 │
│  - language     │
│  - code         │
└─────────────────┘
```

---

## Impact Level Definitions

| Level        | Severity  | Description                            | Example                    |
| ------------ | --------- | -------------------------------------- | -------------------------- |
| **CRITICAL** | 필수      | 위반 시 런타임 크래시 또는 심각한 버그 | Text not in Text component |
| **HIGH**     | 강력 권장 | 성능 또는 UX에 큰 영향                 | No list virtualization     |
| **MEDIUM**   | 권장      | 코드 품질 및 유지보수성                | Redundant state            |
| **LOW**      | 선택      | 점진적 개선, micro-optimization        | Intl formatter hoisting    |

---

## File Naming Conventions

### Skill Package Directory

```
[skill-name]/
  - kebab-case
  - 영문 소문자 + 숫자 + 하이픈
  - 예: vercel-react-native-skills, my-team-conventions
```

### Rule Files

```
[category]-[topic].md
  - 예: list-performance-virtualize.md
  - 예: animation-gpu-properties.md
  - 25자 이내 권장
```

### Tag Conventions

```
카테고리: lists, animation, state, ui, navigation
기술: react-native, expo, reanimated, gesture-handler
패턴: performance, memory, rendering, memoization
```
