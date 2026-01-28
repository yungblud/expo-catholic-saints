# Agent Skills Methodology

이 디렉토리는 AI 어시스턴트(Claude Code, Cursor 등)가 프로젝트별 코딩 규칙과 best practices를 자동으로 인식하고 적용할 수 있도록 구조화된 skill 패키지 시스템을 제공합니다.

## 개요

```
.agents/
├── skills/                    # 설치된 skill 패키지들
│   ├── vercel-react-native-skills/  # React Native 성능 최적화
│   └── project-conventions/         # 프로젝트 특화 컨벤션
├── templates/                 # Skill 생성 템플릿
│   ├── skill-template/
│   └── README.md              # 상세 문서
└── README.md                  # 이 파일
```

## 빠른 시작

### 1. 설치된 Skill 확인

```bash
ls .agents/skills/
```

### 2. Skill 사용

AI 어시스턴트에게 작업을 요청하면 관련 skill이 자동으로 적용됩니다:

```
"Create a list component"
→ vercel-react-native-skills의 list-performance 규칙 적용

"Review this component's naming"
→ project-conventions의 naming 규칙 적용
```

### 3. 커스텀 Skill 생성

```bash
# 템플릿 복사
cp -r .agents/templates/skill-template .agents/skills/my-skill

# SKILL.md 편집
vim .agents/skills/my-skill/SKILL.md

# 규칙 추가
vim .agents/skills/my-skill/rules/category-topic.md
```

## 설치된 Skills

| Skill                                                                    | 설명                     | Impact       |
| ------------------------------------------------------------------------ | ------------------------ | ------------ |
| [vercel-react-native-skills](skills/vercel-react-native-skills/SKILL.md) | React Native 성능 최적화 | CRITICAL-LOW |
| [project-conventions](skills/project-conventions/SKILL.md)               | 프로젝트 코딩 컨벤션     | HIGH-LOW     |

## 상세 문서

- [템플릿 및 가이드](templates/README.md) - Skill 생성, 설치, 공유 방법
- [SKILL.md 스키마](../specs/002-skills-dev-methodology/contracts/skill-md-schema.md)
- [Rule 파일 스키마](../specs/002-skills-dev-methodology/contracts/rule-md-schema.md)

## Impact Level 요약

| Level        | 의미                | 대응              |
| ------------ | ------------------- | ----------------- |
| **CRITICAL** | 위반 시 크래시/버그 | 즉시 수정         |
| **HIGH**     | 성능/UX 영향        | PR에서 수정       |
| **MEDIUM**   | 코드 품질           | 파일 수정 시 적용 |
| **LOW**      | 점진적 개선         | 선택적 적용       |
