# Quickstart: Skills-Based Development Methodology

이 가이드는 `.agents/skills`를 사용하여 AI 기반 개발 방법론을 시작하는 방법을 설명합니다.

## 1. 기존 Skill 사용하기 (5분)

### Step 1: Skill 설치

기존 skill을 프로젝트에 복사합니다:

```bash
# 예: Vercel React Native Skills
cp -r path/to/vercel-react-native-skills .agents/skills/
```

### Step 2: 구조 확인

```
.agents/skills/vercel-react-native-skills/
├── SKILL.md      # 언제 이 skill을 사용하는지
├── AGENTS.md     # AI가 참조할 전체 가이드
└── rules/        # 개별 규칙 파일들
```

### Step 3: AI와 함께 사용

AI 어시스턴트에게 작업을 요청하면 skill이 자동으로 적용됩니다:

```
You: "Create a list component for displaying saints"
AI: (list-performance rules 적용) "I'll use LegendList for virtualization..."
```

---

## 2. 커스텀 Skill 생성하기 (30분)

### Step 1: 디렉토리 생성

```bash
mkdir -p .agents/skills/my-team-conventions/rules
```

### Step 2: SKILL.md 작성

```markdown
---
name: my-team-conventions
description: |
  My team's coding conventions and best practices.
  Use when writing TypeScript code in this project.
license: MIT
metadata:
  author: my-team
  version: '1.0.0'
---

# My Team Conventions

Team-specific coding standards.

## When to Apply

Reference these guidelines when:

- Writing new components
- Reviewing pull requests
- Refactoring existing code

## Rule Categories by Priority

| Priority | Category  | Impact | Prefix       |
| -------- | --------- | ------ | ------------ |
| 1        | Naming    | HIGH   | `naming-`    |
| 2        | Structure | MEDIUM | `structure-` |

## Quick Reference

### 1. Naming (HIGH)

- `naming-components` - Component naming conventions
- `naming-files` - File naming conventions
```

### Step 3: 규칙 파일 작성

`rules/naming-components.md`:

````markdown
---
title: Component Naming Convention
impact: HIGH
impactDescription: consistent codebase, easier navigation
tags: naming, components, conventions
---

## Component Naming Convention

All React components must use PascalCase and have descriptive names.

**Incorrect (ambiguous or wrong case):**

```tsx
// Bad: lowercase
function card({ title }) { ... }

// Bad: too generic
function Item({ data }) { ... }
```
````

**Correct (descriptive PascalCase):**

```tsx
// Good: PascalCase, descriptive
function SaintCard({ saint }: { saint: Saint }) { ... }

// Good: indicates purpose
function SaintListItem({ saint }: { saint: Saint }) { ... }
```

````

### Step 4: AGENTS.md 생성 (선택)

모든 규칙을 하나의 문서로 컴파일:

```bash
# 수동으로 모든 rules/*.md 내용을 AGENTS.md에 복사
# 또는 빌드 스크립트 사용
````

---

## 3. Skill 구조 요약

```
.agents/skills/[skill-name]/
│
├── SKILL.md              # 필수: 메타데이터, 적용 조건
│   - YAML frontmatter (name, version, author)
│   - When to Apply 섹션
│   - Rule Categories 테이블
│   - Quick Reference
│
├── AGENTS.md             # 선택: AI용 컴파일된 가이드
│   - 모든 규칙을 하나로 통합
│   - AI 컨텍스트 로딩에 최적화
│
└── rules/                # 필수: 개별 규칙 파일
    └── [category]-[topic].md
        - YAML frontmatter (title, impact, tags)
        - Incorrect/Correct 코드 예제
```

---

## 4. Impact Level 가이드

| Level        | 사용 시점           | 예시                 |
| ------------ | ------------------- | -------------------- |
| **CRITICAL** | 위반 시 크래시/버그 | Text 컴포넌트 누락   |
| **HIGH**     | 성능/UX 영향        | 리스트 가상화 미사용 |
| **MEDIUM**   | 코드 품질           | 불필요한 state       |
| **LOW**      | 점진적 개선         | 포매터 hoisting      |

---

## 5. 다음 단계

1. **기존 skill 탐색**: `.agents/skills/vercel-react-native-skills/SKILL.md` 참조
2. **규칙 추가**: `rules/` 디렉토리에 새 `.md` 파일 추가
3. **팀과 공유**: Git으로 skill 버전 관리

---

## 참고 문서

- [data-model.md](./data-model.md) - 상세 데이터 모델
- [contracts/skill-md-schema.md](./contracts/skill-md-schema.md) - SKILL.md 스키마
- [contracts/rule-md-schema.md](./contracts/rule-md-schema.md) - Rule 파일 스키마

---

## 실제 파일 경로

이 방법론의 구현 파일들:

```
.agents/
├── skills/
│   ├── vercel-react-native-skills/   # 참조 모델 (35+ 규칙)
│   │   ├── SKILL.md
│   │   ├── AGENTS.md
│   │   └── rules/
│   └── project-conventions/          # 예제 커스텀 skill
│       ├── SKILL.md
│       ├── AGENTS.md
│       └── rules/
│           └── naming-components.md
├── templates/
│   ├── skill-template/
│   │   ├── SKILL.md.template
│   │   ├── AGENTS.md.template
│   │   ├── CHANGELOG.md.template
│   │   └── rules/
│   │       └── rule-template.md
│   ├── install-skill.sh
│   └── README.md                     # 상세 가이드
└── README.md                         # 방법론 개요
```
