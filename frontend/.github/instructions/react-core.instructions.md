---
applyTo: "src/**/*.{js,jsx,css}"
description: "Use when implementing or refactoring React JS source files in this frontend workspace. Enforces parity-first migration, design consistency, and reusable foundation usage."
---

# React Core Rules

## Scope and Intent
- Keep migration strategy as parity-first: behavior parity first, design consistency second, optimization third.
- Implement only the requested scope and avoid unrelated refactors.
- Keep static-first assumptions until backend integration is explicitly implemented.

## Architecture and Reuse
- Reuse existing foundations before creating new patterns:
  - `src/layouts/*`
  - `src/components/base/*`
  - `src/hooks/*`
  - `src/utils/*`
- Favor composition over duplication and keep components focused.
- Keep route and domain naming aligned with the current plan in `tasks.md`.

## UI and Styling
- Preserve the current luxury-minimal direction (clean spacing, restrained contrast, subtle motion).
- Keep typography aligned with project standards:
  - Headline moments: Noto Serif
  - Body and utility text: Manrope
- Use Tailwind utility classes first.
- Avoid large custom CSS blocks unless repetition justifies extraction.
- Reuse existing CSS variables and utility tokens from `src/assets/styles/global.css`.

## React Implementation Rules
- Use functional components and hooks.
- Keep all code, variable names, comments, tests, and UI strings in English.
- Convert interaction logic to React state/events/hooks; do not reintroduce inline page scripts.
- Use semantic elements:
  - Use links for route navigation.
  - Use buttons for in-page actions (modal toggle, quantity updates, local state changes).

## Quality and Safety
- Keep changes minimal and local to the requested feature.
- Prefer deterministic, reusable utilities for formatting and validation logic.
- Preserve responsive behavior at current breakpoints (`sm`, `md`, `lg`) while migrating.
