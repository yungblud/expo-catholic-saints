# Agent Skills Templates

이 디렉토리는 AI 어시스턴트 skill 패키지를 생성하기 위한 템플릿을 포함합니다.

## 디렉토리 구조

```
.agents/
├── skills/                    # 설치된 skill 패키지들
│   ├── vercel-react-native-skills/
│   └── [your-custom-skill]/
└── templates/                 # 이 디렉토리
    ├── skill-template/        # Skill 생성 템플릿
    │   ├── SKILL.md.template
    │   ├── AGENTS.md.template
    │   └── rules/
    │       └── rule-template.md
    └── README.md
```

## 빠른 시작

### 1. 기존 Skill 설치

```bash
# 방법 1: 직접 복사
cp -r path/to/skill .agents/skills/

# 방법 2: Git 서브모듈
git submodule add https://github.com/org/skill-repo .agents/skills/skill-name

# 방법 3: npm 패키지 (skill이 npm으로 배포된 경우)
npm install @org/skill-name
ln -s node_modules/@org/skill-name .agents/skills/skill-name
```

### 2. 설치 확인

AI 어시스턴트에게 skill 관련 작업을 요청하여 인식 여부를 확인합니다:

```
"Create a list component" → AI should apply list-performance rules
"Review this animation code" → AI should check GPU-accelerated properties
```

---

## Skill 패키지 구조

모든 skill 패키지는 다음 구조를 따릅니다:

```
[skill-name]/
├── SKILL.md          # 필수: 메타데이터, 적용 조건, 규칙 목록
├── AGENTS.md         # 선택: 전체 규칙을 컴파일한 문서
└── rules/            # 필수: 개별 규칙 파일
    ├── [category]-[topic].md
    └── ...
```

### SKILL.md (필수)

```yaml
---
name: my-skill
description: |
  Skill 설명. AI가 이 skill을 언제 활성화할지 결정하는 데 사용됩니다.
license: MIT
metadata:
  author: your-name
  version: '1.0.0'
---
```

### rules/ 디렉토리

- 파일명: `[category]-[topic].md` (예: `naming-components.md`)
- 파일명은 kebab-case, 25자 이내 권장

---

## 규칙 작성 가이드

### Impact Level

| Level        | 사용 시점           | 예시                 |
| ------------ | ------------------- | -------------------- |
| **CRITICAL** | 위반 시 크래시/버그 | Text 컴포넌트 누락   |
| **HIGH**     | 성능/UX 영향        | 리스트 가상화 미사용 |
| **MEDIUM**   | 코드 품질           | 불필요한 state       |
| **LOW**      | 점진적 개선         | 포매터 hoisting      |

### 규칙 파일 구조

````yaml
---
title: Rule Title
impact: HIGH
impactDescription: 3-7 word summary
tags: tag1, tag2, tag3
---
## Rule Title

설명...

**Incorrect (이유):**
```code
잘못된 예제
````

**Correct (이유):**

```code
올바른 예제
```

```

---

## 다중 Skill 설치

여러 skill을 동시에 설치할 수 있습니다:

```

.agents/skills/
├── vercel-react-native-skills/ # React Native 성능 규칙
├── project-conventions/ # 프로젝트 특화 컨벤션
└── security-best-practices/ # 보안 규칙

````

### 규칙 충돌 해결

- 동일 주제의 규칙이 여러 skill에 있을 경우, **Impact level이 높은 규칙 우선**
- 같은 Impact level이면 **더 구체적인 규칙 우선**
- skill 디렉토리 이름 알파벳 순서는 우선순위에 영향 없음

---

## Skill 활성화 조건

AI 어시스턴트는 SKILL.md의 다음 정보를 사용하여 skill 활성화를 결정합니다:

### 1. Description 키워드

```yaml
description: |
  React Native and Expo best practices for building performant mobile apps.
  Triggers on tasks involving React Native, Expo, mobile performance.
````

### 2. "When to Apply" 섹션

```markdown
## When to Apply

Reference these guidelines when:

- Building React Native or Expo apps
- Optimizing list and scroll performance
- Implementing animations with Reanimated
```

### 3. Tags (규칙 파일)

```yaml
tags: react-native, lists, performance, virtualization
```

## 커스텀 Skill 생성

### Step 1: 디렉토리 생성

```bash
mkdir -p .agents/skills/my-custom-skill/rules
```

### Step 2: SKILL.md 작성

`skill-template/SKILL.md.template`을 복사하여 수정합니다:

```bash
cp .agents/templates/skill-template/SKILL.md.template .agents/skills/my-custom-skill/SKILL.md
```

필수 수정 항목:

- `name`: skill 디렉토리 이름과 일치
- `description`: AI가 skill을 선택하는 데 사용할 키워드 포함
- `metadata.version`: 시맨틱 버저닝
- `## When to Apply`: 구체적인 활성화 조건

### Step 3: 규칙 파일 작성

`skill-template/rules/rule-template.md`를 참고하여 규칙을 작성합니다:

```bash
cp .agents/templates/skill-template/rules/rule-template.md \
   .agents/skills/my-custom-skill/rules/category-topic.md
```

규칙 파일 체크리스트:

- [ ] YAML frontmatter 완성 (title, impact, impactDescription, tags)
- [ ] Incorrect 예제 포함
- [ ] Correct 예제 포함
- [ ] 파일명이 `[category]-[topic].md` 패턴

### Step 4: AGENTS.md 생성 (선택)

대용량 skill의 경우 모든 규칙을 컴파일한 AGENTS.md를 생성합니다:

```bash
# 수동으로 rules/*.md 내용을 AGENTS.md에 통합
# 또는 빌드 스크립트 사용
```

### Step 5: 검증

AI 어시스턴트에게 skill 관련 작업을 요청하여 인식 여부 확인:

```
"What coding conventions should I follow in this project?"
→ AI should reference project-conventions skill
```

---

---

## Skill 활성화 트리거

AI 어시스턴트가 skill을 활성화하는 방법을 이해하면 더 효과적인 skill을 작성할 수 있습니다.

### 트리거 우선순위

1. **SKILL.md description** - 가장 먼저 읽히는 정보
2. **"When to Apply" 섹션** - 구체적인 사용 조건
3. **규칙 파일의 tags** - 세부 주제 매칭
4. **AGENTS.md Abstract** - 전체 맥락 이해

### 효과적인 트리거 작성

```yaml
# 좋은 예: 구체적이고 행동 지향적
description: |
  React Native performance optimization for mobile apps.
  Triggers on: list rendering, animations, navigation, images.

# 나쁜 예: 너무 일반적
description: |
  Good coding practices for apps.
```

### 컨텍스트 로딩 순서

1. AI가 프로젝트 구조를 스캔
2. `.agents/skills/` 디렉토리 발견
3. 각 skill의 `SKILL.md` 읽기
4. 현재 작업과 관련된 skill 선택
5. 선택된 skill의 `AGENTS.md` 또는 `rules/` 파일 로드

---

## Skill 버전 관리

### 시맨틱 버저닝

Skill은 [Semantic Versioning](https://semver.org/)을 따릅니다:

| 변경 유형              | 버전 변경             | 예시                |
| ---------------------- | --------------------- | ------------------- |
| 규칙 제거, 호환성 깨짐 | MAJOR (1.0.0 → 2.0.0) | CRITICAL 규칙 삭제  |
| 새 규칙 추가           | MINOR (1.0.0 → 1.1.0) | 새 카테고리 추가    |
| 예제 수정, 오타        | PATCH (1.0.0 → 1.0.1) | 코드 예제 버그 수정 |

### CHANGELOG 유지

변경사항을 `CHANGELOG.md`에 기록합니다:

```markdown
## [1.1.0] - 2026-02-15

### Added

- `security-input-validation` - Input validation rule

### Changed

- `naming-components` - Updated examples for React 19
```

---

## Skill 공유

### 방법 1: Git 서브모듈

```bash
# 설치
git submodule add https://github.com/org/skill-repo .agents/skills/skill-name

# 업데이트
git submodule update --remote .agents/skills/skill-name
```

### 방법 2: npm 패키지

```bash
# 설치
npm install @org/skill-name
ln -s node_modules/@org/skill-name .agents/skills/skill-name

# package.json에 설치 스크립트 추가
{
  "scripts": {
    "postinstall": "ln -sf node_modules/@org/skill-name .agents/skills/skill-name"
  }
}
```

### 방법 3: 직접 복사

```bash
cp -r path/to/skill .agents/skills/
```

---

## 규칙 충돌 해결

### 우선순위 규칙

여러 skill의 규칙이 충돌할 때:

1. **Impact level 우선**: CRITICAL > HIGH > MEDIUM > LOW
2. **구체성 우선**: 더 구체적인 규칙이 일반적인 규칙보다 우선
3. **명시적 오버라이드**: 프로젝트 skill이 외부 skill보다 우선

### 충돌 예시

```
vercel-react-native-skills: "Use FlashList for all lists"
project-conventions: "Use LegendList for lists under 50 items"

→ project-conventions 규칙이 더 구체적이므로 우선 적용
```

---

## Skill Deprecation

규칙을 제거할 때는 단계적으로 진행합니다:

### Step 1: Deprecation 표시 (MINOR 버전)

```yaml
---
title: Old Rule Name
impact: LOW
deprecated: true
deprecatedMessage: Use `new-rule-name` instead. Will be removed in v2.0.0
---
```

### Step 2: 제거 (MAJOR 버전)

CHANGELOG에 마이그레이션 가이드 포함:

```markdown
## [2.0.0] - 2026-03-01

### Removed

- `old-rule-name` - Replaced by `new-rule-name`

### Migration

- Replace usages of `old-rule-name` with `new-rule-name`
```

---

## 참고 문서

- [SKILL.md Schema](../specs/002-skills-dev-methodology/contracts/skill-md-schema.md)
- [Rule File Schema](../specs/002-skills-dev-methodology/contracts/rule-md-schema.md)
- [Data Model](../specs/002-skills-dev-methodology/data-model.md)
