---
title: {{RULE_TITLE}}
impact: {{IMPACT}}
impactDescription: {{IMPACT_DESCRIPTION}}
tags: {{TAG_1}}, {{TAG_2}}, {{TAG_3}}
---

<!--
  RULE TEMPLATE GUIDE
  ===================

  YAML Frontmatter (Required):
  - title: Clear, actionable rule name (max 50 chars)
  - impact: CRITICAL | HIGH | MEDIUM | LOW
  - impactDescription: 3-7 word benefit summary
  - tags: At least 2 relevant tags, comma-separated

  Body Structure:
  1. Rule title (## heading, matches frontmatter title)
  2. Description (1-3 paragraphs)
  3. Incorrect example (with explanation why it's wrong)
  4. Correct example (with explanation why it's right)
  5. Alternative example (optional, for different approaches)
  6. Additional context (optional)
  7. Reference link (optional)

  Code Examples:
  - Always specify the language (tsx, ts, js, python, etc.)
  - Include inline comments explaining key points
  - Keep examples concise but complete
  - Show real-world scenarios, not contrived examples
-->

## {{RULE_TITLE}}

{{RULE_DESCRIPTION}}

**Incorrect ({{INCORRECT_REASON}}):**

```{{LANGUAGE}}
{{INCORRECT_CODE}}
// Comment explaining why this is problematic
```

**Correct ({{CORRECT_REASON}}):**

```{{LANGUAGE}}
{{CORRECT_CODE}}
// Comment explaining the improvement
```

**Alternative ({{ALTERNATIVE_REASON}}):** <!-- Optional -->

```{{LANGUAGE}}
{{ALTERNATIVE_CODE}}
```

{{ADDITIONAL_CONTEXT}}

Reference: {{REFERENCE_URL}} <!-- Optional -->
