# Implementation Plan: Skills-Based Development Methodology

**Branch**: `002-skills-dev-methodology` | **Date**: 2026-01-28 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/002-skills-dev-methodology/spec.md`

## Summary

`.agents/skills` 디렉토리를 활용한 AI 기반 개발 방법론을 정립한다. 이 방법론은 AI 어시스턴트(Claude Code 등)가 프로젝트별 코딩 규칙과 best practices를 자동으로 인식하고 적용할 수 있도록 구조화된 skill 패키지 시스템을 제공한다. 기존 Vercel React Native Skills를 참조 모델로 하여 skill 작성 템플릿, 가이드라인, 그리고 커스텀 skill 생성 도구를 구현한다.

## Technical Context

**Language/Version**: Markdown (documentation), YAML (frontmatter metadata)
**Primary Dependencies**: None (문서 기반 방법론)
**Storage**: File system (`.agents/skills/` directory)
**Testing**: Manual verification, AI assistant behavior testing
**Target Platform**: Claude Code, Cursor, Windsurf, 기타 AI 코딩 어시스턴트
**Project Type**: Documentation/Methodology (non-code)
**Performance Goals**: AI가 skill을 5초 이내에 로드하고 컨텍스트에 포함
**Constraints**: 단일 AGENTS.md 파일은 10,000줄 이하 권장 (컨텍스트 윈도우 고려)
**Scale/Scope**: 프로젝트당 5-10개 skill, skill당 10-50개 rule

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

### I. Test-First Development

| Checkpoint             | Status | Notes                                                         |
| ---------------------- | ------ | ------------------------------------------------------------- |
| Tests written first    | N/A    | 문서/방법론 feature - 코드 테스트 대신 검증 체크리스트 사용   |
| Failing tests exist    | N/A    | AI 동작 검증은 수동 테스트로 대체                             |
| Tests as documentation | PASS   | Skill 자체가 AI를 위한 문서이며, 예제 코드가 테스트 역할 수행 |

### II. Mobile-First Quality

| Checkpoint           | Status | Notes                                       |
| -------------------- | ------ | ------------------------------------------- |
| Performance budgets  | N/A    | 문서 기반 feature                           |
| Responsive design    | N/A    | UI 없음                                     |
| Offline resilience   | PASS   | 모든 skill은 로컬 파일로 오프라인 사용 가능 |
| Platform conventions | N/A    |                                             |
| Accessibility        | N/A    |                                             |

### III. Iterative Delivery

| Checkpoint                 | Status | Notes                                       |
| -------------------------- | ------ | ------------------------------------------- |
| User stories as MVP slices | PASS   | 각 user story가 독립적으로 구현/테스트 가능 |
| Vertical slices            | PASS   | Skill 단위로 end-to-end 기능 제공           |
| Feedback loops             | PASS   | Skill 추가/수정이 즉시 AI 동작에 반영       |
| Reversibility              | PASS   | Skill 삭제로 즉시 원복 가능                 |

**Gate Result**: PASS - 모든 적용 가능한 원칙 준수

## Project Structure

### Documentation (this feature)

```text
specs/002-skills-dev-methodology/
├── plan.md              # This file
├── research.md          # Skill 구조 및 best practices 연구
├── data-model.md        # Skill 패키지 구조 정의
├── quickstart.md        # 빠른 시작 가이드
├── contracts/           # Skill 템플릿 스키마
│   ├── skill-md-schema.md
│   └── rule-md-schema.md
└── tasks.md             # Phase 2 output
```

### Source Code (repository root)

```text
.agents/
├── skills/                           # Skill packages directory
│   ├── vercel-react-native-skills/   # 참조 모델 (기존)
│   │   ├── SKILL.md                  # 메타데이터 및 개요
│   │   ├── AGENTS.md                 # 전체 가이드 (컴파일된 버전)
│   │   └── rules/                    # 개별 규칙 파일
│   │       ├── list-performance-*.md
│   │       ├── animation-*.md
│   │       └── ...
│   └── [custom-skill]/               # 커스텀 skill 템플릿
│       ├── SKILL.md
│       ├── AGENTS.md
│       └── rules/
└── templates/                        # Skill 생성 템플릿
    ├── skill-template/
    │   ├── SKILL.md.template
    │   ├── AGENTS.md.template
    │   └── rules/
    │       └── rule-template.md
    └── README.md

.claude/
└── skills/                           # Claude Code 특화 skill 위치 (alternative)
```

**Structure Decision**: `.agents/skills/`를 primary skill 디렉토리로 사용. `.claude/skills/`는 Claude Code 전용 skill을 위한 대안적 위치로 지원. 기존 `vercel-react-native-skills`를 참조 모델로 활용.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
| --------- | ---------- | ------------------------------------ |
| N/A       | N/A        | N/A                                  |

---

## Phase 0 Output: Research

See [research.md](./research.md) for detailed findings.

## Phase 1 Output: Design Artifacts

- [data-model.md](./data-model.md) - Skill Package 구조 정의
- [contracts/](./contracts/) - 스키마 및 템플릿
- [quickstart.md](./quickstart.md) - 빠른 시작 가이드
