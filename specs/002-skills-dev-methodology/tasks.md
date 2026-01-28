# Tasks: Skills-Based Development Methodology

**Input**: Design documents from `/specs/002-skills-dev-methodology/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: N/A - This is a documentation/methodology feature. Validation is via manual AI behavior testing.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4)
- Include exact file paths in descriptions

## Path Conventions

- **Skills directory**: `.agents/skills/`
- **Templates directory**: `.agents/templates/`
- **Documentation**: `specs/002-skills-dev-methodology/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Create base directory structure and template scaffolding

- [ ] T001 Create templates directory structure at `.agents/templates/skill-template/`
- [ ] T002 [P] Create SKILL.md.template in `.agents/templates/skill-template/SKILL.md.template`
- [ ] T003 [P] Create AGENTS.md.template in `.agents/templates/skill-template/AGENTS.md.template`
- [ ] T004 [P] Create rule-template.md in `.agents/templates/skill-template/rules/rule-template.md`
- [ ] T005 Create templates README at `.agents/templates/README.md`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Validate existing skill structure as reference model

**Note**: This phase verifies the existing `vercel-react-native-skills` as the reference implementation before creating templates based on it.

- [ ] T006 Verify vercel-react-native-skills SKILL.md matches schema at `.agents/skills/vercel-react-native-skills/SKILL.md`
- [ ] T007 Verify vercel-react-native-skills AGENTS.md structure at `.agents/skills/vercel-react-native-skills/AGENTS.md`
- [ ] T008 Verify at least 5 rule files follow rule-md-schema at `.agents/skills/vercel-react-native-skills/rules/`

**Checkpoint**: Reference model validated - template creation can proceed

---

## Phase 3: User Story 1 - Install and Configure Skills (Priority: P1)

**Goal**: Enable developers to install and configure skills in a project so AI assistants recognize and apply them

**Independent Test**: Copy a skill to `.agents/skills/` and ask AI assistant to review code - AI should reference skill rules

### Implementation for User Story 1

- [ ] T009 [US1] Write skill installation guide section in `.agents/templates/README.md`
- [ ] T010 [US1] Document directory structure requirements in `.agents/templates/README.md`
- [ ] T011 [P] [US1] Create example skill installation script at `.agents/templates/install-skill.sh` (optional)
- [ ] T012 [US1] Add "When to Apply" section guidance in `.agents/templates/skill-template/SKILL.md.template`
- [ ] T013 [US1] Document multi-skill installation in `.agents/templates/README.md`

**Checkpoint**: User Story 1 complete - skills can be installed and recognized by AI

---

## Phase 4: User Story 2 - Apply Skills During Development (Priority: P1)

**Goal**: Ensure AI assistants actively use installed skills for code suggestions, reviews, and refactoring

**Independent Test**: Request AI to create a list component - AI should apply list-performance rules from installed skill

### Implementation for User Story 2

- [ ] T014 [US2] Create skill activation trigger documentation in `.agents/templates/README.md`
- [ ] T015 [P] [US2] Add rule priority examples in `.agents/templates/skill-template/AGENTS.md.template`
- [ ] T016 [P] [US2] Create Incorrect/Correct code example template in `.agents/templates/skill-template/rules/rule-template.md`
- [ ] T017 [US2] Document impact level usage (CRITICAL/HIGH/MEDIUM/LOW) in `.agents/templates/README.md`
- [ ] T018 [US2] Add skill context loading guidance for AI assistants in `.agents/templates/skill-template/SKILL.md.template`

**Checkpoint**: User Story 2 complete - AI actively applies skill rules during development

---

## Phase 5: User Story 3 - Create Custom Skills (Priority: P2)

**Goal**: Enable developers to create custom skills with team-specific conventions and patterns

**Independent Test**: Create a new skill using templates - AI should recognize and apply the custom rules

### Implementation for User Story 3

- [ ] T019 [US3] Complete SKILL.md.template with all required sections at `.agents/templates/skill-template/SKILL.md.template`
- [ ] T020 [US3] Complete AGENTS.md.template structure at `.agents/templates/skill-template/AGENTS.md.template`
- [ ] T021 [US3] Complete rule-template.md with YAML frontmatter at `.agents/templates/skill-template/rules/rule-template.md`
- [ ] T022 [P] [US3] Create example custom skill: project-conventions at `.agents/skills/project-conventions/`
- [ ] T023 [P] [US3] Create SKILL.md for project-conventions at `.agents/skills/project-conventions/SKILL.md`
- [ ] T024 [P] [US3] Create AGENTS.md for project-conventions at `.agents/skills/project-conventions/AGENTS.md`
- [ ] T025 [US3] Create sample rule file at `.agents/skills/project-conventions/rules/naming-components.md`
- [ ] T026 [US3] Document custom skill creation workflow in `.agents/templates/README.md`

**Checkpoint**: User Story 3 complete - custom skills can be created using templates

---

## Phase 6: User Story 4 - Share and Version Skills (Priority: P3)

**Goal**: Enable skill versioning and sharing across projects and teams

**Independent Test**: Export skill to Git, import in another project - skill should work identically

### Implementation for User Story 4

- [ ] T027 [US4] Add versioning guidance in SKILL.md.template at `.agents/templates/skill-template/SKILL.md.template`
- [ ] T028 [US4] Document Git submodule installation method in `.agents/templates/README.md`
- [ ] T029 [P] [US4] Document npm package installation method in `.agents/templates/README.md`
- [ ] T030 [US4] Create skill changelog template at `.agents/templates/skill-template/CHANGELOG.md.template`
- [ ] T031 [US4] Document skill conflict resolution (priority-based) in `.agents/templates/README.md`
- [ ] T032 [US4] Add skill deprecation guidance in `.agents/templates/README.md`

**Checkpoint**: User Story 4 complete - skills can be versioned and shared

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Final documentation and validation

- [ ] T033 [P] Update quickstart.md with actual file paths at `specs/002-skills-dev-methodology/quickstart.md`
- [ ] T034 [P] Validate all template files against schema contracts
- [ ] T035 Review and update CLAUDE.md with skills methodology at `/Volumes/T7/dev/expo-catholic-saints/CLAUDE.md`
- [ ] T036 Create methodology summary document at `.agents/README.md`
- [ ] T037 Manual validation: Test AI skill recognition with project-conventions skill

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - validates reference model
- **User Story 1 (Phase 3)**: Depends on Foundational - skill installation
- **User Story 2 (Phase 4)**: Depends on Foundational - skill application
- **User Story 3 (Phase 5)**: Depends on Phase 3 & 4 - custom skill creation
- **User Story 4 (Phase 6)**: Depends on Phase 5 - sharing and versioning
- **Polish (Phase 7)**: Depends on all user stories complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2)
- **User Story 2 (P1)**: Can start after Foundational (Phase 2) - runs parallel with US1
- **User Story 3 (P2)**: Can start after US1 & US2 complete
- **User Story 4 (P3)**: Can start after US3 complete

### Within Each User Story

- Templates before documentation
- Core files before examples
- Individual files before integration

### Parallel Opportunities

- T002, T003, T004 can run in parallel (Setup templates)
- T011 can run parallel with T009, T010 (US1 implementation)
- T015, T016 can run in parallel (US2 implementation)
- T022, T023, T024 can run in parallel (US3 example skill)
- T029 can run parallel with T028 (US4 installation methods)
- T033, T034 can run in parallel (Polish phase)

---

## Parallel Example: User Story 3

```bash
# Launch all example skill files together:
Task: "Create example custom skill: project-conventions at .agents/skills/project-conventions/"
Task: "Create SKILL.md for project-conventions at .agents/skills/project-conventions/SKILL.md"
Task: "Create AGENTS.md for project-conventions at .agents/skills/project-conventions/AGENTS.md"
```

---

## Implementation Strategy

### MVP First (User Story 1 & 2 Only)

1. Complete Phase 1: Setup (templates directory)
2. Complete Phase 2: Foundational (validate reference)
3. Complete Phase 3: User Story 1 (skill installation)
4. Complete Phase 4: User Story 2 (skill application)
5. **STOP and VALIDATE**: Test AI skill recognition
6. Deploy/demo if ready

### Incremental Delivery

1. Setup + Foundational → Templates ready
2. Add US1 + US2 → Basic methodology works → MVP!
3. Add US3 → Custom skills possible
4. Add US4 → Full versioning and sharing
5. Polish → Production ready

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- This is a documentation-heavy feature - most tasks produce Markdown files
- Validation is manual (AI behavior testing) rather than automated tests
- Stop at any checkpoint to validate story independently
- Commit after each task or logical group
