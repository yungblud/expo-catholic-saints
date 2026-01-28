---
title: Component Naming Convention
impact: HIGH
impactDescription: consistent codebase, easier navigation
tags: naming, components, conventions, typescript
---

## Component Naming Convention

All React components must use PascalCase and have descriptive names that indicate
their purpose. Avoid generic names like "Item" or "Card" without context.

**Incorrect (ambiguous or wrong case):**

```tsx
// Bad: lowercase function name
function card({ title }: { title: string }) {
  return (
    <View>
      <Text>{title}</Text>
    </View>
  );
}

// Bad: too generic, unclear purpose
function Item({ data }: { data: any }) {
  return (
    <View>
      <Text>{data.name}</Text>
    </View>
  );
}

// Bad: abbreviated, hard to understand
function StCrd({ s }: { s: Saint }) {
  return (
    <View>
      <Text>{s.name}</Text>
    </View>
  );
}
```

**Correct (descriptive PascalCase):**

```tsx
// Good: PascalCase, descriptive name indicating domain
function SaintCard({ saint }: { saint: Saint }) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{saint.name}</Text>
      <Text style={styles.feastDay}>{saint.feastDay}</Text>
    </View>
  );
}

// Good: name indicates both domain and purpose
function SaintListItem({ saint, onPress }: SaintListItemProps) {
  return (
    <Pressable onPress={() => onPress(saint.id)}>
      <SaintCard saint={saint} />
    </Pressable>
  );
}

// Good: screen component with clear naming
function SaintDetailScreen({ route }: SaintDetailScreenProps) {
  const { saintId } = route.params;
  // ...
}
```

**Naming patterns:**

| Pattern            | Example             | Use Case                     |
| ------------------ | ------------------- | ---------------------------- |
| `[Domain]Card`     | `SaintCard`         | Card-style display component |
| `[Domain]ListItem` | `SaintListItem`     | Item in a list               |
| `[Domain]Detail`   | `SaintDetail`       | Detailed view                |
| `[Domain]Form`     | `SaintForm`         | Input form                   |
| `[Domain]Screen`   | `SaintDetailScreen` | Screen/page component        |
| `[Domain]Provider` | `SaintsProvider`    | Context provider             |

The domain prefix (`Saint`, `Prayer`, `Calendar`) makes components searchable and
groups related components together in file explorers.
