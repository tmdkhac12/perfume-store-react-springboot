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

## 6. Session Handoff — 2026-04-23 (Navigation Linking)

### Completed in this session
- Finished end-to-end navigation linking pass across all in-scope surfaces: Public, Auth, User, and Admin.
- Applied canonical relative-path rules consistently:
  - `index.html` links to `pages/...`
  - files under `pages/` link to `../index.html` for Home and `*.html` for peer pages.
- Verified and aligned key prototype journeys:
  - Public: `index.html` → `shop.html` → `product-details.html` → `cart.html` → `checkout.html`
  - Auth: `login.html` ↔ `register.html` → `user-profile.html`
  - User: `user-profile.html` ↔ `user-security.html` ↔ `user-address.html` ↔ `user-orders.html`
  - Admin: `admin-overview.html` → `admin-products.html` → `admin-brands.html` → `admin-notes.html` → `admin-volumes.html` → `admin-users.html` → `admin-invoices.html` → `login.html`.
- Completed semantic navigation cleanup for navigation-only controls:
  - Converted `View Full Catalog` in `pages/admin-overview.html` from `<button>` to `<a href="shop.html">`.
- Completed link integrity verification loops:
  - Placeholder scan confirmed no remaining `href="#"`.
  - Internal `*.html` href scan and target-existence checks confirmed no broken page targets.
- Updated tracking in `tasks.md`:
  - Phase 1 to Phase 7 progress recorded.
  - Acceptance criteria for route intent, reachability, and dead-end prevention marked complete.

### Current status
- Navigation routing coverage is complete for the defined prototype scope.
- No broken page link was detected in the latest verification pass.
- Remaining manual-only checks in `tasks.md` are visual/regression-focused:
  - accidental style regressions in shared nav/header/sidebar/footer blocks,
  - desktop/mobile usability review.

### Important decisions and why
- Use root page as temporary fallback for non-existing content pages (`Editorial`, `About`, `Privacy`, `Shipping`, `Stores`, `Instagram`, `Help`).
  - Reason: these pages do not exist yet; fallback prevents dead-end navigation while preserving flow continuity.
- Keep local interaction controls as `<button>` (modals, toggles, quantity updates, table actions).
  - Reason: these controls trigger in-page behavior, not page routing; preserving them avoids behavioral regressions.
- Prefer `<a>` for pure page navigation.
  - Reason: semantic HTML improves clarity, accessibility expectations, and maintainability for static prototypes.
- Keep changes minimal and scoped to navigation contract only.
  - Reason: requirement explicitly asked to avoid unrelated modifications and preserve existing UI direction.

### Next session priorities
1. Run visual cross-check on desktop and mobile for shared layout blocks (header/sidebar/footer).
2. Confirm active-state styling consistency on current-page nav items after any future UI edits.
3. If new real content pages are added (About, Privacy, etc.), replace temporary fallback links with dedicated targets.
