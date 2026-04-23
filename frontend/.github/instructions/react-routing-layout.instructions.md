---
applyTo: "src/{config,layouts,pages}/**/*.{js,jsx}"
description: "Use when editing React routes, layouts, and route-level pages. Ensures full route reachability, layout-shell consistency, and navigation integrity."
---

# React Routing and Layout Rules

## Route Contract
- Keep route paths aligned with the React refactor plan in `tasks.md`.
- Maintain full route reachability for Public, Auth, Account, and Admin surfaces.
- Preserve current route intent and labels unless explicitly requested.

## Layout Shell Rules
- Use shared layout shells for each surface:
  - Public -> `MainLayout`
  - Auth -> `AuthLayout`
  - Account -> `AccountLayout`
  - Admin -> `AdminLayout`
- Keep shared shell responsibilities in layout components and route-specific content in page components.
- Avoid duplicating navigation blocks across route pages when layout shells already provide them.

## Navigation Integrity
- Use `Link`/`NavLink` for route navigation.
- Do not use placeholder links such as `href="#"` in migrated React routes.
- Keep route transitions and active-state behavior consistent with existing patterns.

## Consistency Checks
- Ensure no dead-end navigation is introduced for in-scope routes.
- Preserve responsive behavior and visual rhythm in header/navigation blocks.
- Keep naming and structure consistent with existing `src/config/route-map.js` and `src/config/routes.jsx` responsibilities.
