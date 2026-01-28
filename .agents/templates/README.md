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

## 참고 문서

- [SKILL.md Schema](../specs/002-skills-dev-methodology/contracts/skill-md-schema.md)
- [Rule File Schema](../specs/002-skills-dev-methodology/contracts/rule-md-schema.md)
- [Data Model](../specs/002-skills-dev-methodology/data-model.md)
