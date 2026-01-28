---
name: project-conventions
description: |
  Project-specific coding conventions and best practices for the Expo Catholic Saints app.
  Use when writing TypeScript/React Native code, creating components, or reviewing code
  in this project. Triggers on tasks involving components, naming, file structure, or code style.
license: MIT
metadata:
  author: team
  version: '1.0.0'
---

# Project Conventions

Project-specific coding standards and conventions for the Expo Catholic Saints application.
These rules ensure consistency across the codebase and complement the general React Native
skills with project-specific guidance.

## When to Apply

Reference these guidelines when:

- Creating new React Native components
- Writing TypeScript code in this project
- Naming files, functions, or variables
- Reviewing pull requests
- Refactoring existing code

## Rule Categories by Priority

| Priority | Category  | Impact | Prefix       |
| -------- | --------- | ------ | ------------ |
| 1        | Naming    | HIGH   | `naming-`    |
| 2        | Structure | MEDIUM | `structure-` |
| 3        | Style     | LOW    | `style-`     |

## Quick Reference

### 1. Naming (HIGH)

- `naming-components` - Component naming conventions
- `naming-files` - File naming conventions

### 2. Structure (MEDIUM)

- `structure-feature-based` - Feature-based directory organization

### 3. Style (LOW)

- `style-imports` - Import ordering conventions

## How to Use

Read individual rule files for detailed explanations and code examples:

```
rules/naming-components.md
rules/naming-files.md
```

Each rule file contains:

- Brief explanation of why it matters
- Incorrect code example with explanation
- Correct code example with explanation
- Additional context and references

## Full Compiled Document

For the complete guide with all rules expanded: `AGENTS.md`

---

## AI Context Loading

**When to load this skill:**

- Check SKILL.md description for relevance to current task
- Match "When to Apply" triggers with user request
- Consider rule tags when searching for specific guidance

**How to apply rules:**

1. Identify the category most relevant to the current task
2. Apply CRITICAL and HIGH impact rules first
3. Check for alternatives when multiple approaches exist
4. Reference the full AGENTS.md for comprehensive context
