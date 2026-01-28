# Feature Specification: Skills-Based Development Methodology

**Feature Branch**: `002-skills-dev-methodology`
**Created**: 2026-01-28
**Status**: Draft
**Input**: User description: "Create a development methodology using .agents/skills for AI-assisted development workflow"

## User Scenarios & Testing _(mandatory)_

### User Story 1 - Install and Configure Skills (Priority: P1)

개발자가 새 프로젝트를 시작하거나 기존 프로젝트에 skills를 추가할 때, `.agents/skills` 디렉토리에 필요한 skill 패키지를 설치하고 구성하여 AI 어시스턴트가 프로젝트에 맞는 best practices를 자동으로 적용할 수 있도록 한다.

**Why this priority**: Skills 설치 없이는 방법론 자체를 사용할 수 없으므로 가장 기본적이고 필수적인 기능이다.

**Independent Test**: `.agents/skills/` 디렉토리에 skill을 추가하고 AI 어시스턴트가 해당 skill의 규칙을 인식하는지 확인하여 테스트할 수 있다.

**Acceptance Scenarios**:

1. **Given** 빈 프로젝트가 있을 때, **When** 개발자가 React Native skill을 `.agents/skills/`에 복사하면, **Then** AI 어시스턴트가 해당 skill의 규칙을 참조하여 코드 리뷰와 제안을 제공한다.
2. **Given** skill이 설치된 프로젝트가 있을 때, **When** 개발자가 skill의 `SKILL.md` 파일을 확인하면, **Then** 사용 가능한 규칙 목록과 우선순위를 볼 수 있다.
3. **Given** 여러 skill이 설치된 프로젝트가 있을 때, **When** AI 어시스턴트가 코드를 분석하면, **Then** 모든 설치된 skill의 규칙을 통합하여 적용한다.

---

### User Story 2 - Apply Skills During Development (Priority: P1)

개발자가 코드를 작성할 때, AI 어시스턴트가 설치된 skill의 규칙을 자동으로 참조하여 best practices에 맞는 코드 제안, 리뷰, 리팩토링을 제공한다.

**Why this priority**: 방법론의 핵심 가치인 AI 기반 코드 품질 향상을 직접 제공하는 기능이다.

**Independent Test**: 코드 작성 시 AI 어시스턴트에게 특정 컴포넌트 구현을 요청하고, skill 규칙에 맞는 코드가 생성되는지 확인한다.

**Acceptance Scenarios**:

1. **Given** React Native skill이 설치된 프로젝트에서, **When** 개발자가 리스트 컴포넌트 구현을 요청하면, **Then** AI는 list-performance 규칙을 적용하여 FlashList/LegendList 사용, memo 적용 등을 포함한 코드를 생성한다.
2. **Given** animation 관련 코드를 작성할 때, **When** 개발자가 코드 리뷰를 요청하면, **Then** AI는 GPU 가속 속성(transform, opacity) 사용 여부를 확인하고 개선점을 제안한다.
3. **Given** 잘못된 패턴의 코드가 있을 때, **When** 개발자가 리팩토링을 요청하면, **Then** AI는 skill 규칙에 따라 올바른 패턴으로 변환한다.

---

### User Story 3 - Create Custom Skills (Priority: P2)

개발자 또는 팀이 프로젝트에 특화된 커스텀 skill을 생성하여 팀의 코딩 컨벤션, 아키텍처 패턴, 도메인 특화 규칙을 AI 어시스턴트에게 학습시킨다.

**Why this priority**: 기본 skill 사용 후 팀 맞춤화가 필요한 자연스러운 다음 단계이다.

**Independent Test**: 커스텀 skill 디렉토리를 생성하고 규칙 파일을 추가한 후, AI가 해당 규칙을 적용하는지 확인한다.

**Acceptance Scenarios**:

1. **Given** 개발자가 새 skill을 만들고자 할 때, **When** `.agents/skills/my-custom-skill/` 디렉토리와 `SKILL.md`, `AGENTS.md` 파일을 생성하면, **Then** AI 어시스턴트가 해당 skill을 인식하고 사용한다.
2. **Given** 커스텀 skill에 규칙을 추가하고자 할 때, **When** `rules/` 디렉토리에 새 규칙 파일을 추가하면, **Then** AI가 코드 분석 시 해당 규칙을 적용한다.
3. **Given** 기존 skill을 확장하고자 할 때, **When** 기존 규칙을 복사하여 수정하면, **Then** 수정된 규칙이 우선 적용된다.

---

### User Story 4 - Share and Version Skills (Priority: P3)

팀이 skill을 버전 관리하고 다른 프로젝트나 팀과 공유하여 조직 전체의 코드 품질 표준을 일관되게 유지한다.

**Why this priority**: 개인 사용 후 팀/조직 확장을 위한 기능으로, 핵심 기능 이후에 구현해도 무방하다.

**Independent Test**: skill을 별도 저장소에 저장하고 다른 프로젝트에서 설치하여 동작 확인한다.

**Acceptance Scenarios**:

1. **Given** 팀이 skill을 공유하고자 할 때, **When** skill 디렉토리를 Git 저장소로 관리하면, **Then** 다른 프로젝트에서 서브모듈이나 패키지로 설치할 수 있다.
2. **Given** skill에 버전이 있을 때, **When** `SKILL.md`의 메타데이터에 버전을 명시하면, **Then** 프로젝트별로 특정 버전의 skill을 사용할 수 있다.
3. **Given** 공개 skill을 사용하고자 할 때, **When** 커뮤니티 skill 저장소에서 skill을 다운로드하면, **Then** 프로젝트에 바로 적용할 수 있다.

---

### Edge Cases

- skill 간 규칙이 충돌할 때 어떻게 처리하는가? (우선순위 기반 해결)
- skill 파일이 손상되었거나 형식이 잘못되었을 때 어떻게 처리하는가?
- 대용량 AGENTS.md 파일(3000줄 이상)이 있을 때 성능에 영향이 있는가?
- AI 어시스턴트가 skill을 인식하지 못할 때 디버깅 방법은?

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: 시스템은 `.agents/skills/` 디렉토리에서 skill 패키지를 자동으로 탐지해야 한다
- **FR-002**: 각 skill은 `SKILL.md` 파일로 메타데이터(이름, 설명, 버전, 적용 조건)를 정의해야 한다
- **FR-003**: 각 skill은 `AGENTS.md` 파일로 AI 어시스턴트에게 제공할 전체 가이드라인을 포함해야 한다
- **FR-004**: 각 skill은 `rules/` 디렉토리에 개별 규칙 파일을 모듈식으로 관리할 수 있어야 한다
- **FR-005**: 규칙 파일은 Impact level(CRITICAL, HIGH, MEDIUM, LOW)을 명시하여 우선순위를 지정해야 한다
- **FR-006**: AI 어시스턴트는 현재 작업 컨텍스트에 맞는 skill을 자동으로 활성화해야 한다
- **FR-007**: 개발자는 특정 skill을 수동으로 비활성화하거나 활성화할 수 있어야 한다
- **FR-008**: 규칙 파일은 Incorrect/Correct 코드 예제를 포함하여 명확한 가이드를 제공해야 한다

### Key Entities

- **Skill Package**: `.agents/skills/` 하위에 위치하는 규칙 모음. SKILL.md, AGENTS.md, rules/ 디렉토리를 포함
- **Rule**: 특정 코딩 패턴이나 best practice를 정의하는 단위. Impact level과 코드 예제를 포함
- **SKILL.md**: Skill의 메타데이터와 적용 조건을 정의하는 파일
- **AGENTS.md**: AI 어시스턴트가 참조하는 종합 가이드 문서

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: 개발자가 skill 설치 후 5분 이내에 AI 어시스턴트로부터 skill 기반 코드 제안을 받을 수 있어야 한다
- **SC-002**: AI가 생성한 코드의 90% 이상이 설치된 skill의 규칙을 준수해야 한다
- **SC-003**: 커스텀 skill 생성이 30분 이내에 완료 가능해야 한다 (기본 구조 기준)
- **SC-004**: skill 적용 후 코드 리뷰에서 지적되는 패턴 위반이 50% 이상 감소해야 한다
- **SC-005**: 새 팀원이 프로젝트 skill을 이해하는 데 1시간 이내 소요되어야 한다

## Assumptions

- AI 어시스턴트(Claude Code 등)가 `.agents/skills/` 디렉토리를 자동으로 인식하고 컨텍스트로 활용한다
- 규칙 파일은 Markdown 형식으로 작성되며, AI가 자연어 형태의 가이드라인을 이해할 수 있다
- 프로젝트는 Git으로 버전 관리되며, skill도 함께 커밋된다
