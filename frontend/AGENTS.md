# AGENTS.md

1. **Tổng quan dự án:** Dự án này là gì, làm cho ai, mục đích gì.
- This project is a static frontend prototype for a perfume e-commerce experience, built for shoppers, account users, and admin operators.
- The main goal is to validate UI/UX flows before backend integration, including catalog browsing, product details, cart/checkout, user account pages, and admin management screens.
- Main entry points:
  - Public landing: [index.html](index.html)
  - Store and product pages: [pages/shop.html](pages/shop.html), [pages/product-details.html](pages/product-details.html)
  - Cart and checkout: [pages/cart.html](pages/cart.html), [pages/checkout.html](pages/checkout.html)
  - User area: [pages/user-profile.html](pages/user-profile.html), [pages/user-orders.html](pages/user-orders.html), [pages/user-address.html](pages/user-address.html), [pages/user-security.html](pages/user-security.html)
  - Admin area: [pages/admin-overview.html](pages/admin-overview.html), [pages/admin-products.html](pages/admin-products.html), [pages/admin-brands.html](pages/admin-brands.html), [pages/admin-invoices.html](pages/admin-invoices.html), [pages/admin-notes.html](pages/admin-notes.html), [pages/admin-users.html](pages/admin-users.html), [pages/admin-volumes.html](pages/admin-volumes.html)

2. **Tech stack.**
- Core: static HTML5 pages with utility-first Tailwind classes.
- Styling: Tailwind CSS via CDN (`https://cdn.tailwindcss.com?plugins=forms,container-queries`) with per-page inline `tailwind.config` blocks.
- Typography and icons: Google Fonts (Manrope, Noto Serif) and Material Symbols Outlined.
- Behavior: lightweight inline JavaScript handlers for simple UI interactions (modal open/close, local toggles).
- Tooling status: no `package.json`, no bundler, no test runner, no build pipeline in this frontend folder.
- Local preview command:
  - `python -m http.server 8000 -d d:\Documents\Projects\web\Perfume_Store\frontend`

- Suggested React app structure:
  /src
  ├── /assets         # Global static assets (images, fonts, global styles)
  ├── /components     # Shared, generic UI components (Buttons, Inputs, Modals)
  ├── /config         # Global configuration (environment variables, constants)
  ├── /context        # Global React Contexts for cross-cutting state
  ├── /features       # Domain-driven feature modules
  │   └── /auth       # Example: Authentication feature
  │       ├── /api    # Feature-specific API calls/hooks
  │       ├── /components # Components unique to this feature
  │       ├── /hooks  # Custom hooks for feature logic
  │       ├── /types  # TypeScript definitions for feature data
  │       └── index.ts # Public API for the feature (exports only what's needed)
  ├── /hooks          # Global reusable hooks
  ├── /layouts        # Page layouts (MainLayout, AuthLayout, Sidebar)
  ├── /lib            # Facades for 3rd-party libraries (axios, react-query)
  ├── /pages          # Route components that compose features into full pages
  ├── /services       # Shared API clients or business logic services
  ├── /types          # Global TypeScript interfaces and types
  └── /utils          # Pure utility functions (formatters, validators)

3. **Quy tắc thiết kế:** Màu sắc chủ đạo, font chữ, style tổng thể.
- Keep the existing luxury-minimal direction: clean whitespace, restrained contrast, subtle motion, and rounded elements.
- Primary token direction (as implemented across pages): dark neutral primary (`#0b0c0c`/`#212529`), light neutral backgrounds (`#f8f9fa`, `#ffffff`), soft outline grays (`#c4c7c7`, `#ced4da`).
- Typography system:
  - Headlines and brand moments: `Noto Serif`
  - Body, labels, utility text: `Manrope`
- UI composition standards:
  - Tailwind utility classes first, avoid large custom CSS blocks unless repetition is significant.
  - Preserve responsive behavior from existing patterns (`grid-cols-1` to `md`/`lg` breakpoints).
  - Preserve polished interactions (hover transitions, subtle scale/opacity effects, sticky summary/sidebar where already used).
- Brand consistency rule: do not introduce additional brand names; align new UI copy with the project brand direction already present in the edited page.

4. **Quy tắc bắt buộc:** Những thứ agents không được làm hoặc phải làm.
- Must read and follow [.github/copilot-instructions.md](.github/copilot-instructions.md) and [docs/copilot-code.md](docs/copilot-code.md) before major changes.
- Must communicate explanations to the user in Vietnamese, while generated source code/comments/UI strings remain in English.
- Must preserve static-first assumptions: do not claim backend behavior is complete unless explicitly implemented.
- Must not introduce new frameworks/build systems/package manifests unless the user explicitly requests them.
- Must keep path references and navigation links valid for this folder layout (`index.html` at root, other pages under `pages/`).
- Must prefer linking to existing docs instead of duplicating long guidance in new rule files.
- Must update agent-rule files consistently when process rules change (at minimum this file and related instruction files).

5. **Workflow:** Cách làm việc trong dự án này, sau mỗi thay đổi lớn thì làm gì.
1. Start by scanning [AGENTS.md](AGENTS.md), [.github/copilot-instructions.md](.github/copilot-instructions.md), and [docs/copilot-code.md](docs/copilot-code.md).
2. Identify the affected surface area first (Public, User, or Admin pages) and list exact files before editing.
3. Reuse existing Tailwind tokens, typography, spacing, and interaction patterns from [index.html](index.html) and the closest related page.
4. Implement the smallest safe change set; avoid unrelated refactors.
5. After each major change, run a cross-check loop:
   - Compare the result against existing instructions and neighboring pages for consistency.
   - Verify desktop and mobile layout behavior.
   - Verify visual consistency (color tokens, fonts, component rhythm, brand naming).
   - Verify link and interaction integrity (no broken `href`, no dead triggers).
6. If any mismatch is found, continue refining until the result fully matches the requirements and project conventions.
7. For session handoff, record what was completed, what is next, and key decisions in this file or referenced project notes.

## 6. Session Handoff — 2026-04-25 (Static Baseline + Navigation Contract)

### Completed so far
- Static HTML navigation coverage remains complete across Public, Auth, User, and Admin prototype pages.
- Canonical relative-link rules remain consistent with the static folder layout:
  - `index.html` links to `pages/...`
  - files under `pages/` link to `../index.html` for Home and `*.html` for peer pages
- Phase 0 baseline artifacts are present and usable for parity checks:
  - `docs/phase0/component-inventory.md`
  - `docs/phase0/interaction-inventory.md`
  - `docs/phase0/baseline-reference.md`
  - `docs/phase0/screenshots/desktop` (18 files)
  - `docs/phase0/screenshots/mobile` (18 files)

### Current status by area
- Public static pages: reachable.
- Auth static pages: reachable.
- User static pages: reachable.
- Admin static pages: reachable.
- Legacy HTML remains intentionally retained as migration reference.

### Important decisions and why
- Keep static HTML pages available while React migration is incomplete.
  - Reason: baseline parity comparison and rollback-safe visual reference are still required.
- Keep navigation semantics strict (`<a>` for route/page navigation, `<button>` for in-page actions).
  - Reason: preserves accessibility and interaction intent during migration.
- Continue parity-first workflow using Phase 0 screenshots as source of truth.
  - Reason: prevents visual drift before logic and data layers are introduced.

### Next session priorities
1. Use static pages only as visual reference, not as the primary implementation target.
2. Continue replacing React placeholder routes with route-specific presentational pages.
3. Run desktop/mobile parity checks against `docs/phase0/screenshots` after each migrated route.

## 7. Session Handoff — 2026-04-25 (React UI-Only Migration Status Refresh)

### Completed so far (verified by codebase scan)
- Migration plan status in `tasks.md` is aligned with actual implementation for completed phases:
  - Phase 0: completed.
  - Phase 1: completed.
  - Phase 2: completed.
  - Phase 3: completed.
  - Phase 4-8: not completed.
- React route contract exists for all planned paths in `src/config/route-map.js` and `src/config/routes.jsx`.
- Shared layout shell is implemented:
  - `src/layouts/MainLayout.jsx`
  - `src/layouts/AuthLayout.jsx`
  - `src/layouts/AccountLayout.jsx`
  - `src/layouts/AdminLayout.jsx`
  - `src/layouts/RouteSurfaceLayout.jsx`
- Foundation components are implemented and exported from `src/components/base`.
- Presentational feature modules exist and are wired:
  - `src/features/catalog`, `src/features/product`, `src/features/cart`, `src/features/checkout`, `src/features/auth`, `src/features/userAccount`, `src/features/admin`
- Route smoke tests exist and pass for layout-shell wiring in `src/App.test.jsx`.

### Current status by phase (practical interpretation)
- Phase 0-3: delivered as scaffold/foundation work.
- Phase 4-6: route-level page migration is still pending (current routes render shared placeholder composition, not migrated page UIs).
- Phase 7: partially evidenced (`lint` and `test` pass), but full quality gate is still pending because visual parity verification and full build verification are not complete.
- Phase 8: not started.

### Verification snapshot (current session)
- `npm run lint`: pass.
- `npm run test -- --run`: pass (4/4).
- React Router v7 future-flag warning still appears in test output (non-blocking, should be tracked).
- `npm run build` was not executed in this session.

### Important decisions and why
- Keep this track UI-only and presentational-only.
  - Reason: matches scope lock in `tasks.md`; avoids leaking into logic/state/API work.
- Keep JavaScript-only during current migration phases.
  - Reason: reduces migration overhead and keeps focus on parity and route coverage.
- Keep grouped layout-shell routing (`Public`, `Auth`, `Account`, `Admin`) while pages are migrated incrementally.
  - Reason: provides stable navigation structure and prevents duplicated shell markup.
- Defer context/services/business logic layers.
  - Reason: explicitly out of scope for this UI-only plan.

### Risks and cautions discovered
- Build configuration still references `react-app.html` in multiple files (`vite.config.js`, `tailwind.config.js`, `package.json` scripts) while the current entry file is `index.html`.
  - Risk: production build and content scanning can drift or fail until entry references are unified.
- `src/pages` currently contains only `RoutePlaceholderPage.jsx`.
  - Risk: Phase 4-6 progress can be overestimated if placeholder routes are interpreted as full page migration.

### Next session priorities
1. Fix entry-file consistency (`react-app.html` references) across `vite.config.js`, `tailwind.config.js`, and `package.json`.
2. Start real Phase 4 migration by implementing React presentational pages for Public routes (`/`, `/shop`, `/product-details/:productId`, `/cart`, `/checkout`) with parity to static baseline.
3. Add/expand route render smoke tests for newly migrated Public pages (beyond shell-level assertions).
4. After each route migration batch, run `npm run lint`, `npm run test -- --run`, and `npm run build`, then update `tasks.md` checklist incrementally.
