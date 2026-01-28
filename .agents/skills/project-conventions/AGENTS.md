# Project Conventions

**Version 1.0.0**
Team
January 2026

> **Note:**
> This document is mainly for agents and LLMs to follow when maintaining,
> generating, or refactoring this codebase. Humans may also find it useful, but
> guidance here is optimized for automation and consistency by AI-assisted
> workflows.

---

## Abstract

Project-specific coding standards for the Expo Catholic Saints application. Contains rules
for naming conventions, file structure, and code style that ensure consistency across
the codebase. These rules complement general React Native best practices with guidance
specific to this project's architecture and team preferences.

---

## Rule Priority

| Impact       | Description                                       | Action                     |
| ------------ | ------------------------------------------------- | -------------------------- |
| **CRITICAL** | Violations cause crashes or data loss             | Must fix immediately       |
| **HIGH**     | Significant consistency or maintainability impact | Should fix in current PR   |
| **MEDIUM**   | Code quality and organization                     | Fix when touching the file |
| **LOW**      | Style preferences                                 | Nice to have               |

---

## Table of Contents

1. [Naming](#1-naming) - **HIGH**
   - 1.1 [Component Naming Convention](#11-component-naming-convention)
   - 1.2 [File Naming Convention](#12-file-naming-convention)
2. [Structure](#2-structure) - **MEDIUM**
   - 2.1 [Feature-Based Directory Organization](#21-feature-based-directory-organization)

---

## 1. Naming

**Impact: HIGH**

Consistent naming improves code discoverability and maintainability.

### 1.1 Component Naming Convention

**Impact: HIGH (consistent codebase, easier navigation)**

All React components must use PascalCase and have descriptive names that indicate
their purpose. Avoid generic names like "Item" or "Card" without context.

**Incorrect (ambiguous or wrong case):**

```tsx
// Bad: lowercase
function card({ title }) {
  return <View>{title}</View>;
}

// Bad: too generic
function Item({ data }) {
  return <View>{data.name}</View>;
}
```

**Correct (descriptive PascalCase):**

```tsx
// Good: PascalCase, descriptive
function SaintCard({ saint }: { saint: Saint }) {
  return (
    <View>
      <Text>{saint.name}</Text>
    </View>
  );
}

// Good: indicates purpose clearly
function SaintListItem({ saint }: { saint: Saint }) {
  return (
    <Pressable onPress={() => navigate(saint.id)}>
      <SaintCard saint={saint} />
    </Pressable>
  );
}
```

### 1.2 File Naming Convention

**Impact: HIGH (consistent structure, easy navigation)**

Use kebab-case for all file names. Component files should match their default export.

**Incorrect:**

```
SaintCard.tsx          // PascalCase file name
saint_card.tsx         // snake_case
saintcard.tsx          // no separator
```

**Correct:**

```
saint-card.tsx         // kebab-case
saint-list-item.tsx    // kebab-case with multiple words
use-saints.ts          // hooks use "use-" prefix
```

---

## 2. Structure

**Impact: MEDIUM**

Organize code by feature for better discoverability and maintainability.

### 2.1 Feature-Based Directory Organization

**Impact: MEDIUM (maintainability, discoverability)**

Organize code by feature domain rather than technical layer. Keep related code together.

**Incorrect (layer-based):**

```
src/
├── components/
│   ├── SaintCard.tsx
│   ├── SaintList.tsx
│   └── SaintDetail.tsx
├── hooks/
│   └── useSaints.ts
├── services/
│   └── saintService.ts
└── types/
    └── saint.ts
```

**Correct (feature-based):**

```
src/
├── features/
│   └── saints/
│       ├── components/
│       │   ├── saint-card.tsx
│       │   ├── saint-list.tsx
│       │   └── saint-detail.tsx
│       ├── hooks/
│       │   └── use-saints.ts
│       ├── services/
│       │   └── saint-service.ts
│       ├── types.ts
│       └── index.ts
└── shared/
    └── components/
        └── button.tsx
```

Benefits:

- Related code is colocated
- Features are self-contained and easier to understand
- Clear boundaries between domains
- Shared components are explicitly separated

---

## References

1. [Project Structure Guidelines](../../docs/architecture.md)
2. [React Native Best Practices](../vercel-react-native-skills/AGENTS.md)
