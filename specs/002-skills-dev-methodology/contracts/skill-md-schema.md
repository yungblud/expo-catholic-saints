# SKILL.md Schema

**Purpose**: Skill 메타데이터 및 개요를 정의하는 파일 스키마

## File Location

```
.agents/skills/[skill-name]/SKILL.md
```

## Schema Definition

### YAML Frontmatter (Required)

```yaml
---
name: [skill-name] # Required: kebab-case identifier
description: | # Required: Multi-line description
  Brief description of the skill.
  Include what technologies/patterns it covers.
license: MIT # Required: License identifier
metadata:
  author: [author-name] # Required: Author or team name
  version: '[semver]' # Required: Quoted semver string
---
```

### Markdown Body Structure

```markdown
# [Skill Display Name]

[One paragraph abstract describing the skill's purpose and scope]

## When to Apply

Reference these guidelines when:

- [Trigger condition 1]
- [Trigger condition 2]
- [Trigger condition 3]

## Rule Categories by Priority

| Priority | Category        | Impact   | Prefix      |
| -------- | --------------- | -------- | ----------- |
| 1        | [Category Name] | CRITICAL | `[prefix]-` |
| 2        | [Category Name] | HIGH     | `[prefix]-` |
| ...      | ...             | ...      | ...         |

## Quick Reference

### 1. [Category Name] (IMPACT)

- `[prefix]-[rule-name]` - [Brief description]
- `[prefix]-[rule-name]` - [Brief description]

### 2. [Category Name] (IMPACT)

- `[prefix]-[rule-name]` - [Brief description]

## How to Use

Read individual rule files for detailed explanations and code examples:
```

rules/[rule-name].md

```

Each rule file contains:
- Brief explanation of why it matters
- Incorrect code example with explanation
- Correct code example with explanation
- Additional context and references

## Full Compiled Document

For the complete guide with all rules expanded: `AGENTS.md`
```

## Example: vercel-react-native-skills

```yaml
---
name: vercel-react-native-skills
description:
  React Native and Expo best practices for building performant mobile apps. Use
  when building React Native components, optimizing list performance,
  implementing animations, or working with native modules. Triggers on tasks
  involving React Native, Expo, mobile performance, or native platform APIs.
license: MIT
metadata:
  author: vercel
  version: '1.0.0'
---

# React Native Skills

Comprehensive best practices for React Native and Expo applications. Contains
rules across multiple categories covering performance, animations, UI patterns,
and platform-specific optimizations.

## When to Apply

Reference these guidelines when:

- Building React Native or Expo apps
- Optimizing list and scroll performance
- Implementing animations with Reanimated
- Working with images and media
- Configuring native modules or fonts
- Structuring monorepo projects with native dependencies

## Rule Categories by Priority

| Priority | Category         | Impact   | Prefix               |
| -------- | ---------------- | -------- | -------------------- |
| 1        | List Performance | CRITICAL | `list-performance-`  |
| 2        | Animation        | HIGH     | `animation-`         |
| 3        | Navigation       | HIGH     | `navigation-`        |
| 4        | UI Patterns      | HIGH     | `ui-`                |
...
```

## Validation Rules

1. **name**: Must match directory name, kebab-case only
2. **version**: Must be valid semver, quoted in YAML
3. **description**: Should include trigger keywords for AI activation
4. **Categories table**: Must have Impact column with valid levels
5. **Quick Reference**: Each rule must have corresponding file in `rules/`
