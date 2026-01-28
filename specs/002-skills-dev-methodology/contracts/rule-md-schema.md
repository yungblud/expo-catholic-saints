# Rule File Schema

**Purpose**: 개별 규칙 파일의 구조와 포맷을 정의하는 스키마

## File Location

```
.agents/skills/[skill-name]/rules/[category]-[topic].md
```

## Schema Definition

### YAML Frontmatter (Required)

```yaml
---
title: [Rule Title] # Required: Clear, actionable title
impact: CRITICAL | HIGH | MEDIUM | LOW # Required: One of four levels
impactDescription: [brief summary] # Required: 3-7 word impact summary
tags: [tag1, tag2, tag3] # Required: Comma-separated tags
---
```

### Markdown Body Structure

````markdown
## [Rule Title]

[1-3 paragraphs explaining the rule, why it matters, and when it applies]

**Incorrect ([brief reason why it's wrong]):**

```[language]
[Bad code example with inline comments if needed]
```
````

**Correct ([brief reason why it's right]):**

```[language]
[Good code example with inline comments if needed]
```

**Alternative ([when to use this alternative]):** <!-- Optional -->

```[language]
[Alternative good example]
```

[Additional context, edge cases, or related links] <!-- Optional -->

Reference: [URL] <!-- Optional: External documentation link -->

````

## Field Specifications

### impact

| Value | When to Use |
|-------|-------------|
| `CRITICAL` | Violation causes crash, data loss, or security issue |
| `HIGH` | Significant performance or UX degradation |
| `MEDIUM` | Code quality, maintainability, or minor performance |
| `LOW` | Best practice, micro-optimization, style preference |

### impactDescription

- 3-7 words summarizing the benefit
- Use active voice
- Examples:
  - "prevents production crash"
  - "reduces memory, faster mounts"
  - "fewer re-renders, cleaner code"
  - "native performance, platform UX"

### tags

- Lowercase, no spaces within tags
- Use comma-space separation
- Include:
  - Category tags: `lists`, `animation`, `state`, `ui`
  - Technology tags: `react-native`, `reanimated`, `expo`
  - Pattern tags: `performance`, `memoization`, `rendering`

## Example: list-performance-virtualize.md

```yaml
---
title: Use a List Virtualizer for Any List
impact: HIGH
impactDescription: reduced memory, faster mounts
tags: lists, performance, virtualization, scrollview
---

## Use a List Virtualizer for Any List

Use a list virtualizer like LegendList or FlashList instead of ScrollView with
mapped children—even for short lists. Virtualizers only render visible items,
reducing memory usage and mount time. ScrollView renders all children upfront,
which gets expensive quickly.

**Incorrect (ScrollView renders all items at once):**

```tsx
function Feed({ items }: { items: Item[] }) {
  return (
    <ScrollView>
      {items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </ScrollView>
  );
}
// 50 items = 50 components mounted, even if only 10 visible
````

**Correct (virtualizer renders only visible items):**

```tsx
import { LegendList } from '@legendapp/list';

function Feed({ items }: { items: Item[] }) {
  return (
    <LegendList
      data={items}
      renderItem={({ item }) => <ItemCard item={item} />}
      keyExtractor={(item) => item.id}
      estimatedItemSize={80}
    />
  );
}
// Only ~10-15 visible items mounted at a time
```

**Alternative (FlashList):**

```tsx
import { FlashList } from '@shopify/flash-list';

function Feed({ items }: { items: Item[] }) {
  return (
    <FlashList
      data={items}
      renderItem={({ item }) => <ItemCard item={item} />}
      keyExtractor={(item) => item.id}
    />
  );
}
```

Benefits apply to any screen with scrollable content—profiles, settings, feeds,
search results. Default to virtualization.

```

## File Naming Convention

### Pattern
```

[category]-[topic].md

```

### Rules
1. All lowercase
2. Use hyphens (kebab-case)
3. Category prefix matches SKILL.md category table
4. Topic describes the specific rule
5. Keep under 25 characters when possible

### Examples
```

list-performance-virtualize.md ✓ Good
animation-gpu-properties.md ✓ Good
ui-expo-image.md ✓ Good
ListPerformanceVirtualize.md ✗ Bad (not kebab-case)
virtualize-lists.md ✗ Bad (missing category prefix)
list-performance-always-use-virtualization-for-better-performance.md ✗ Bad (too long)

```

## Validation Checklist

- [ ] YAML frontmatter has all required fields
- [ ] `impact` is one of: CRITICAL, HIGH, MEDIUM, LOW
- [ ] `impactDescription` is 3-7 words
- [ ] `tags` includes at least 2 relevant tags
- [ ] Has at least one Incorrect example
- [ ] Has at least one Correct example
- [ ] Code examples have language specified
- [ ] File name follows `[category]-[topic].md` pattern
- [ ] Title in body matches title in frontmatter
```
