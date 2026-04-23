---
applyTo: "src/**/*.test.{js,jsx}"
description: "Use when creating or updating React tests during migration. Enforces smoke-test coverage for route shells and stable assertions."
---

# React Testing and Quality Rules

## Testing Scope
- Add or maintain smoke tests for migrated routes and critical interactions.
- Prefer route-level render checks while migration is still in parity-first phases.

## Test Style
- Use React Testing Library patterns (`render`, `screen`) with user-visible assertions.
- Prefer stable selectors (`getByRole`, clear text, labels) over ambiguous text matches.
- Keep tests deterministic and avoid unnecessary implementation-coupled assertions.

## Router Testing
- Use memory router patterns for route testing.
- Verify layout-shell wiring for route groups (Public, Auth, Account, Admin) when router structure changes.

## Quality Gate Expectations
- Keep lint, test, and build scripts runnable after each substantial change.
- If a regression appears, fix it in the same scope before moving to the next phase.
