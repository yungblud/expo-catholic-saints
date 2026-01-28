<!--
Sync Impact Report
==================
- Version change: N/A (initial) → 1.0.0
- Modified principles: N/A (initial creation)
- Added sections:
  - Core Principles (3): Test-First Development, Mobile-First Quality, Iterative Delivery
  - Development Workflow
  - Quality Gates
  - Governance
- Removed sections: N/A
- Templates status:
  - .specify/templates/plan-template.md: ✅ compatible (Constitution Check section present)
  - .specify/templates/spec-template.md: ✅ compatible (User stories support iterative delivery)
  - .specify/templates/tasks-template.md: ✅ compatible (TDD tasks, phased delivery)
- Follow-up TODOs: None
==================
-->

# Spec Kit Expo App Constitution

## Core Principles

### I. Test-First Development (NON-NEGOTIABLE)

All feature implementation MUST follow the Test-Driven Development cycle:

1. **Write tests first**: Define expected behavior through failing tests before any implementation
2. **Red-Green-Refactor**: Tests MUST fail initially (red), then pass with minimal code (green), then be refined (refactor)
3. **No untested code**: Every feature, bug fix, or enhancement MUST have corresponding tests
4. **Tests as documentation**: Tests serve as living documentation of expected behavior

**Rationale**: TDD ensures code correctness, prevents regressions, enables confident refactoring, and produces self-documenting code. Skipping tests creates technical debt that compounds over time.

### II. Mobile-First Quality

Cross-platform mobile applications MUST prioritize user experience and performance:

1. **Performance budgets**: Define and enforce performance targets (startup time, frame rate, memory usage)
2. **Responsive design**: UI MUST adapt gracefully across device sizes and orientations
3. **Offline resilience**: Features SHOULD function with degraded or no connectivity where feasible
4. **Platform conventions**: Respect platform-specific UX patterns while maintaining cross-platform consistency
5. **Accessibility**: WCAG compliance MUST be considered from the start, not retrofitted

**Rationale**: Mobile users have high expectations for responsiveness and reliability. Poor mobile UX directly impacts user retention and app store ratings.

### III. Iterative Delivery

Features MUST be designed for incremental delivery and validation:

1. **User stories as MVP slices**: Each user story MUST be independently implementable, testable, and deployable
2. **Vertical slices**: Deliver end-to-end functionality rather than horizontal layers
3. **Feedback loops**: Ship early, gather feedback, iterate—avoid big-bang releases
4. **Reversibility**: Design decisions SHOULD be reversible; avoid premature optimization or over-engineering

**Rationale**: Iterative delivery reduces risk, enables faster feedback, and ensures the product evolves based on real user needs rather than assumptions.

## Development Workflow

### Code Organization

- **Feature-based structure**: Organize code by feature/domain rather than technical layer
- **Colocation**: Keep related code together (components, tests, styles, utilities)
- **Clear boundaries**: Define explicit interfaces between features to prevent coupling

### Testing Strategy

- **Contract tests**: Verify API contracts and external integrations
- **Integration tests**: Validate user journeys and feature workflows
- **Unit tests**: Cover business logic and utility functions
- **Visual regression**: Capture UI state for critical screens (when appropriate)

### Branch Strategy

- Feature branches MUST be short-lived (merge within days, not weeks)
- All changes MUST pass CI checks before merge
- Main branch MUST always be deployable

## Quality Gates

### Pre-Implementation Gates

- [ ] User story has clear acceptance criteria
- [ ] Tests are written and failing (TDD red phase)
- [ ] Design artifacts reviewed (if applicable)

### Pre-Merge Gates

- [ ] All tests pass (TDD green phase)
- [ ] Code review completed
- [ ] No lint/type errors
- [ ] Performance impact assessed for significant changes

### Pre-Release Gates

- [ ] User story independently testable
- [ ] Accessibility requirements verified
- [ ] Cross-platform behavior validated (iOS + Android)

## Governance

### Authority

This constitution establishes the foundational development principles for the Spec Kit Expo App project. All development activities, code reviews, and architectural decisions MUST align with these principles.

### Amendment Process

1. Proposed changes MUST be documented with rationale
2. Changes MUST include migration plan for affected code/processes
3. Version number MUST be incremented according to semantic versioning:
   - **MAJOR**: Principle removal or incompatible redefinition
   - **MINOR**: New principle or significant expansion
   - **PATCH**: Clarifications and non-semantic refinements

### Compliance

- All pull requests MUST be verified against constitution principles
- Violations MUST be justified and tracked in Complexity Tracking section of relevant plan
- Regular reviews SHOULD assess constitution effectiveness and relevance

**Version**: 1.0.0 | **Ratified**: 2026-01-28 | **Last Amended**: 2026-01-28
