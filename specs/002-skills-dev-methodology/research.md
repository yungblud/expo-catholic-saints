# Research: Skills-Based Development Methodology

**Feature**: 002-skills-dev-methodology
**Date**: 2026-01-28

## Research Tasks

### 1. Skill Package Structure Analysis

**Task**: Analyze existing `vercel-react-native-skills` structure to extract best practices

**Findings**:

#### Directory Structure

```
.agents/skills/[skill-name]/
├── SKILL.md      # Metadata, description, when to apply
├── AGENTS.md     # Comprehensive guide for AI (compiled rules)
└── rules/        # Individual rule files
    └── [category]-[rule-name].md
```

#### SKILL.md Format

```yaml
---
name: [skill-name]
description: [multi-line description]
license: MIT
metadata:
  author: [author]
  version: '[semver]'
---
```

- Purpose: AI가 skill을 언제 활성화할지 결정하는 trigger 조건 포함
- "When to Apply" 섹션으로 적용 시점 명시
- Rule Categories를 우선순위별로 정리 (CRITICAL > HIGH > MEDIUM > LOW)

#### AGENTS.md Format

- 전체 규칙을 하나의 문서로 컴파일한 버전
- AI 어시스턴트의 컨텍스트 윈도우에 효율적으로 로드
- 섹션별로 구조화 (Abstract, Table of Contents, Rules by Category)
- 기존 파일: ~2900줄 (35+ rules, 13 categories)

#### Rule File Format

````yaml
---
title: [Rule Title]
impact: CRITICAL | HIGH | MEDIUM | LOW
impactDescription: [brief impact summary]
tags: [comma-separated tags]
---

## [Rule Title]

[Description of the rule]

**Incorrect ([why it's wrong]):**
```code
[bad example]
````

**Correct ([why it's right]):**

```code
[good example]
```

[Additional context or alternatives]

```

**Decision**: 기존 vercel-react-native-skills 구조를 표준으로 채택
**Rationale**: 이미 검증된 구조이며, AI가 잘 인식하는 패턴
**Alternatives Rejected**:
- JSON 기반 규칙: Markdown이 더 가독성 높고 AI가 자연어 이해에 유리
- 단일 파일 접근: 규칙 수가 많아지면 관리 어려움

---

### 2. AI Assistant Skill Recognition Patterns

**Task**: Claude Code, Cursor 등이 skill을 인식하는 방법 조사

**Findings**:

#### Claude Code
- `.claude/` 디렉토리 우선 스캔
- `CLAUDE.md` 파일을 프로젝트 컨텍스트로 로드
- `.agents/skills/` 디렉토리의 `AGENTS.md` 파일 참조

#### Cursor
- `.cursor/` 디렉토리 사용
- `rules/` 디렉토리의 `.cursorrules` 파일 참조
- `.agents/skills/` 디렉토리 지원

#### Windsurf
- `.windsurfrules` 파일 사용
- `.agents/skills/` 패턴 호환

**Decision**: `.agents/skills/`를 범용 디렉토리로 사용, 각 AI별 디렉토리(`.claude/`, `.cursor/`)는 선택적 지원
**Rationale**: 여러 AI 도구 간 호환성 확보
**Alternatives Rejected**: AI별 전용 디렉토리만 사용 - 중복 관리 필요

---

### 3. Impact Level Classification

**Task**: 규칙의 영향도 분류 체계 정립

**Findings**:

| Level | Definition | Example |
|-------|------------|---------|
| CRITICAL | 위반 시 앱 크래시 또는 심각한 버그 발생 | `Never use && with falsy values` (React Native crash) |
| HIGH | 성능에 큰 영향 또는 UX 저하 | `Use list virtualizer` (memory, scroll performance) |
| MEDIUM | 코드 품질 및 유지보수성 영향 | `Minimize state variables` |
| LOW | Best practice, 점진적 개선 | `Hoist Intl formatter creation` |

**Decision**: 4단계 Impact Level 채택 (CRITICAL, HIGH, MEDIUM, LOW)
**Rationale**: Vercel 패턴과 일치, 충분한 세분화 제공
**Alternatives Rejected**:
- 3단계 (HIGH, MEDIUM, LOW): CRITICAL 구분 불명확
- 5단계: 과도한 세분화, 판단 어려움

---

### 4. Rule Naming Convention

**Task**: 규칙 파일 네이밍 컨벤션 정립

**Findings**:

#### Current Pattern (vercel-react-native-skills)
```

[category]-[specific-topic].md

Examples:

- list-performance-virtualize.md
- animation-gpu-properties.md
- ui-expo-image.md
- react-state-minimize.md

```

#### Naming Rules
1. 모든 소문자, kebab-case
2. 카테고리 prefix로 그룹화
3. 동작/대상을 명확히 표현
4. 25자 이내 권장

**Decision**: `[category]-[topic].md` 패턴 채택
**Rationale**: 파일 정렬 시 카테고리별 그룹화, 검색 용이
**Alternatives Rejected**:
- 번호 prefix (01-xxx): 순서 변경 시 리네이밍 필요
- nested directories: 과도한 깊이, 파일 탐색 어려움

---

### 5. Skill Composition and Inheritance

**Task**: 여러 skill 간 조합 및 확장 방법 조사

**Findings**:

#### 조합 방식
- 여러 skill을 `.agents/skills/`에 병렬 배치
- AI가 모든 skill을 컨텍스트에 포함
- 충돌 시 더 높은 Impact level 규칙 우선

#### 확장 방식
- 기존 skill 복사 후 수정
- `extends` 메커니즘 없음 (단순성 유지)
- 커스텀 skill에서 공통 규칙 재사용 가능

**Decision**: 단순 병렬 조합 방식 채택, 상속 없음
**Rationale**: 복잡성 최소화, AI 컨텍스트 관리 단순화
**Alternatives Rejected**:
- 상속/extends 메커니즘: 구현 복잡성 증가, 디버깅 어려움

---

### 6. Skill Activation Triggers

**Task**: Skill이 자동으로 활성화되는 조건 정의

**Findings**:

#### Trigger Types (SKILL.md의 "When to Apply" 섹션)
1. **Technology-based**: "Use when building React Native or Expo apps"
2. **File pattern-based**: "Triggers on `.tsx` files in `components/`"
3. **Task-based**: "Use when optimizing list performance"
4. **Keyword-based**: "Triggers on mentions of 'animation', 'performance'"

#### Implementation
- SKILL.md의 description과 "When to Apply" 섹션에 자연어로 기술
- AI가 작업 컨텍스트와 매칭하여 활성화 결정

**Decision**: 자연어 기반 trigger 조건 사용
**Rationale**: AI의 자연어 이해 능력 활용, 유연한 매칭
**Alternatives Rejected**:
- 정규식/glob 패턴: 유연성 부족, 유지보수 어려움

---

## Summary of Decisions

| Decision | Chosen Approach | Key Rationale |
|----------|----------------|---------------|
| Directory Structure | `.agents/skills/[name]/` | 범용성, 기존 패턴 호환 |
| Rule Format | YAML frontmatter + Markdown | AI 가독성, 구조화 |
| Impact Levels | 4단계 (CRITICAL~LOW) | 적절한 세분화 |
| File Naming | `[category]-[topic].md` | 그룹화, 검색 용이 |
| Skill Composition | 병렬 조합, 상속 없음 | 단순성 |
| Activation | 자연어 trigger | AI 활용 |
```
