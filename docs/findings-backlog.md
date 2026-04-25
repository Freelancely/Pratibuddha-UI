# Findings Backlog (codebase fault-finding)

This is a prioritized, numbered backlog of **bugs, errors, and improvements** found during a deep/balanced sweep of `Pratibuddha-UI` (Angular).

## Legend
- **Type**: Bug / Error / Perf / Security / DX / Cleanup
- **Severity**:
  - **P0**: blocks build/test or causes critical runtime breakage
  - **P1**: user-visible breakage, data-risk, or major maintainability risk
  - **P2**: important but not urgent (tech debt, perf, correctness edge cases)
  - **P3**: minor cleanup / style / nice-to-have

---

## F-001 — Unit tests fail: wrong service export name in spec
- **Type**: Error
- **Severity**: P0
- **Location(s)**: `src/app/pages/Admin/services/categories.service.spec.ts`, `src/app/pages/Admin/services/categories.service.ts`
- **Evidence**: `ng test` reports `CategoriesService` is not exported; actual export is `CategoryService`.
- **Suggested fix**:
  - Update spec import/injection to `CategoryService`, or rename the exported class to match the spec (pick one convention and apply consistently).
  - Ensure the service is provided/configured in the test module if it needs `HttpClientTestingModule`.
- **Acceptance checks**:
  - `npm test` runs without this TypeScript error.

## F-002 — Karma executes 0 tests + serves missing bundle (`/_karma_webpack_/main.js` 404)
- **Type**: Error
- **Severity**: P0
- **Location(s)**: test runner output from `ng test` (Karma web-server 404)
- **Evidence**: Karma logs `404: /_karma_webpack_/main.js` and `Executed 0 of 0 SUCCESS`.
- **Likely cause(s)** (to confirm):
  - Webpack/Karma integration misconfigured, or compilation aborted but Karma still started.
  - Broken/removed default test entry (e.g. missing `src/test.ts` for older setups) depending on Angular builder behavior.
- **Suggested fix**:
  - Verify test builder config and required test entry points; ensure compilation succeeds before browser launch.
  - Confirm at least one `*.spec.ts` is included and actually compiled.
- **Acceptance checks**:
  - Karma loads `main.js` successfully.
  - A non-zero test count executes (even if failing initially).

## F-003 — Dependency vulnerabilities: `npm audit` reports 1 critical, 33 high
- **Type**: Security
- **Severity**: P0
- **Location(s)**: `package.json`, `package-lock.json` (audit output)
- **Evidence**: `npm audit` reported **61 vulnerabilities** including **1 critical**.
- **Suggested fix**:
  - Run `npm audit` (human-readable) and prioritize remediation for direct deps first.
  - Bump Angular toolchain packages to patched versions where available (audit suggests updates like `@angular/cli`).
  - Document any accepted/ignored vulns with rationale (temporary) if blocked by breaking changes.
- **Acceptance checks**:
  - `npm audit` has **no critical** and materially reduced high-severity findings.

## F-004 — README is stale (claims Angular CLI 16, repo uses Angular 19)
- **Type**: DX
- **Severity**: P2
- **Location(s)**: `README.md`, `package.json`
- **Evidence**: `README.md` mentions Angular CLI `16.2.0`, while deps are `@angular/*` `19.1.x` and CLI `19.1.x`.
- **Suggested fix**:
  - Update README to match current Angular/Node requirements and the actual scripts used.
- **Acceptance checks**:
  - New developer can follow README without confusion or version mismatch.

## F-005 — `.angular/cache` appears as untracked (ignore rule not effective in this repo state)
- **Type**: Cleanup
- **Severity**: P2
- **Location(s)**: `.gitignore`, untracked file snapshot showed `.angular/cache/...`
- **Evidence**: git status snapshot includes `?? .angular\cache\...` while `.gitignore` contains `/.angular/cache`.
- **Suggested fix**:
  - Validate ignores with `git check-ignore -v` and adjust patterns if needed (Windows path nuances can surface here).
  - Ensure no cache files are added/tracked; remove if accidentally tracked.
- **Acceptance checks**:
  - Cache paths do not appear in `git status` on a clean working tree.

## F-006 — Environment config risk: `environment.ts` sets `production: true`
- **Type**: Bug
- **Severity**: P1
- **Location(s)**: `src/environments/environment.ts`, `src/environments/environment.development.ts`
- **Evidence**: `environment.ts` has `production: true`; dev env has `false`. Angular’s environment selection must be verified to ensure dev build doesn’t accidentally use production mode.
- **Suggested fix**:
  - Confirm how your Angular 19 build selects env files; ensure `production` reflects reality per configuration.
  - Standardize API base URL usage via `environment.apiUrl` everywhere.
- **Acceptance checks**:
  - Dev server uses dev API base; production build uses production API base.

## F-007 — Hardcoded cart API base URL in `CartService`
- **Type**: Bug
- **Severity**: P1
- **Location(s)**: `src/app/shared/services/cart.service.ts`
- **Evidence**: `private apiUrl = 'http://localhost:5177/api/cart';`
- **Suggested fix**:
  - Replace with `environment.apiUrl` and build endpoint paths consistently (e.g. `${environment.apiUrl}/cart`).
  - Avoid coupling to localhost in committed code.
- **Acceptance checks**:
  - Cart API calls work in dev and production without code changes.

## F-008 — Service subscribes internally (lifecycle + testability issues)
- **Type**: DX
- **Severity**: P2
- **Location(s)**: `src/app/shared/services/cart.service.ts` (`loadCartItems()` subscribes)
- **Evidence**: `loadCartItems()` calls `.subscribe(...)` inside the service and mutates internal state.
- **Suggested fix**:
  - Prefer returning `Observable<CartItem[]>` and letting components decide subscription/lifecycle.
  - If service-owned stream is desired, encapsulate with `switchMap`/`shareReplay` and explicit refresh triggers.
- **Acceptance checks**:
  - No hidden subscriptions that outlive UI; refresh behavior is explicit.

## F-009 — Direct DOM manipulation in `UtilsService` (SSR safety + memory-leak risk)
- **Type**: Bug
- **Severity**: P1
- **Location(s)**: `src/app/shared/services/utils.service.ts`
- **Evidence**:
  - `document.querySelector`, `document.createElement`, `document.body...`
  - `this.router.events.subscribe(...)` in service constructor with no teardown.
- **Suggested fix**:
  - Prefer Angular CDK/Renderer2 for DOM, and guard access behind platform checks if SSR is a possibility.
  - Ensure router-event subscription is properly disposed (or refactor to `takeUntilDestroyed` with `DestroyRef`).
- **Acceptance checks**:
  - No long-lived subscriptions created by singleton services without teardown strategy.

## F-010 — Shop pages use nested subscriptions and never unsubscribe (leak + duplicated calls)
- **Type**: Perf
- **Severity**: P1
- **Location(s)**:
  - `src/app/shop/shop-area/shop-area.component.ts`
  - `src/app/shop/pages/shop-load-more/shop-load-more.component.ts`
- **Evidence**: `route.queryParams.subscribe(...)` and inside it `productService.filterProducts().subscribe(...)`, with no `OnDestroy` teardown and risk of repeated HTTP calls per query change.
- **Suggested fix**:
  - Refactor to a single reactive pipeline with `switchMap` from query params → products.
  - Use `takeUntilDestroyed` / `DestroyRef` or `async` pipe patterns.
- **Acceptance checks**:
  - Changing query params triggers exactly one product fetch and no accumulating subscriptions.

## F-011 — `HeaderTwo`/`HeaderThree` wishlist never loads (token placeholder)
- **Type**: Bug
- **Severity**: P1
- **Location(s)**:
  - `src/app/shared/header/header-two/header-two.component.ts`
  - `src/app/shared/header/header-three/header-three.component.ts`
- **Evidence**: `private token: string = ''; // Replace with AuthService token retrieval` and code logs `No token provided...`.
- **Suggested fix**:
  - Integrate `AuthService` (or shared auth state) and subscribe via `async` pipe if possible.
  - Remove unnecessary `detectChanges()` unless using OnPush and proven needed.
- **Acceptance checks**:
  - Wishlist count/items appear when authenticated; no console error spam on normal usage.

## F-012 — Admin Categories UI: delete flow shows success toast before deletion
- **Type**: Bug
- **Severity**: P1
- **Location(s)**: `src/app/pages/Admin/products/categories/categories.component.ts`
- **Evidence**: `deleteCategory(...)` calls `openDeleteCategoryModal(...)` then immediately `showToast('Brand Deleted Successfully', 'success');` without performing deletion.
- **Suggested fix**:
  - Only show success after `deleteCategory(...)` API call completes.
  - Fix text/labels mismatch (the screen says “Brands Management” while component/service is categories).
- **Acceptance checks**:
  - User sees success only after backend confirms deletion.

## F-013 — Deprecated `toPromise()` usage in admin code (RxJS best practice)
- **Type**: DX
- **Severity**: P2
- **Location(s)**: `src/app/pages/Admin/products/categories/categories.component.ts`
- **Evidence**: `await this.categoryService.getCategories().toPromise()`
- **Suggested fix**:
  - Replace with `firstValueFrom(...)` / `lastValueFrom(...)`, or keep everything observable-based.
- **Acceptance checks**:
  - No `toPromise()` usage remains; behavior unchanged.

## F-014 — Angular strict-template warnings (unnecessary `?.` / `??` due to mismatched types)
- **Type**: DX
- **Severity**: P2
- **Location(s)** (examples):
  - `src/app/pages/checkout/checkout.component.html`
  - `src/app/pages/profile/profile.component.html`
  - `src/app/shared/components/offcanvas/cart-sidebar/cart-sidebar.component.html`
  - `src/app/shop/pages/cart/cart.component.html`
  - `src/app/shop/product/**/**.component.html`
- **Evidence**: NG8102/NG8107 warnings during `ng build` and `ng serve`.
- **Suggested fix**:
  - Adjust component property types to reflect actual nullability, or remove redundant optional chaining/coalescing.
- **Acceptance checks**:
  - Build output significantly reduced for NG8102/NG8107 warnings.

## F-015 — Bundle/CSS budgets exceeded (performance + CI noise)
- **Type**: Perf
- **Severity**: P2
- **Location(s)**: `angular.json` budgets; build output mentions initial bundle and admin SCSS files.
- **Evidence**:
  - Initial bundle total `2.28 MB` exceeds the `2mb` warning threshold.
  - Admin SCSS exceeds `anyComponentStyle` budget.
- **Suggested fix**:
  - Revisit budgets (keep them meaningful), and/or optimize styles/import strategy (avoid duplicative large SCSS).
- **Acceptance checks**:
  - Production build meets budgets, or budgets are intentionally adjusted with justification.

## F-016 — CSS selector parsing warnings (“rules skipped due to selector errors”)
- **Type**: Cleanup
- **Severity**: P2
- **Location(s)**: build output (CSS processing)
- **Evidence**: build logs show many selectors like `.table>>*>*` and stray `0%`/`70%` treated as selectors.
- **Suggested fix**:
  - Identify the stylesheet(s) emitting invalid selectors / malformed keyframes; fix or exclude them from processing.
- **Acceptance checks**:
  - Build no longer reports “rules skipped due to selector errors”.

## F-017 — `CategoryService` contains redundant mapping + console logging in production path
- **Type**: Cleanup
- **Severity**: P3
- **Location(s)**: `src/app/pages/Admin/services/categories.service.ts`
- **Evidence**: `console.log('Raw API response:', response)` and repeated `response.id || response.id`/`response.name || response.name`.
- **Suggested fix**:
  - Remove or gate debug logs.
  - Simplify mapping and tighten DTO typing (define API response interface).
- **Acceptance checks**:
  - No unnecessary logging; mapping is clear and type-safe.

## F-018 — Widespread missing `trackBy` for `*ngFor` (render churn risk)
- **Type**: Perf
- **Severity**: P2
- **Location(s)**: many templates under `src/app/**` (menus, lists, sidebars)
- **Evidence**: many `*ngFor` occurrences; only a few templates reference `trackBy`.
- **Suggested fix**:
  - Add `trackBy` where lists are large/dynamic (menus, product lists, admin tables).
- **Acceptance checks**:
  - Large lists preserve DOM identity on updates; fewer re-renders during filtering/pagination.

---

## Next slice (recommended execution order)
1. **F-001, F-002** (test health)  
2. **F-003** (critical/high security vulns)  
3. **F-006, F-007** (env + hardcoded API)  
4. **F-010, F-009, F-011** (leaks + correctness in key UX surfaces)  
5. Remaining warnings/budgets/perf items

