# MajeVal Frontend Architecture

This document describes the architectural conventions for the MajeVal Angular frontend. Follow these rules when adding new code so the codebase stays consistent and scalable.

## Stack

| Technology | Version | Purpose |
|---|---|---|
| Angular | 22 | Application framework |
| Angular Material | 22 | UI components |
| TypeScript | 6 | Language |
| RxJS | 7.8 | Async/reactive streams |
| Vitest | 4 | Unit testing |
| SCSS | — | Component styles |
| SSR | Enabled | Server-side rendering + hydration |

The app uses **standalone components only** — there are no NgModules.

---

## High-Level Layout

The application is organized into three layers under `src/app/`:

```
src/app/
├── core/       ← App-wide singletons and infrastructure
├── shared/     ← Reusable UI and UI services
├── features/   ← Domain-specific screens and logic
├── app.ts      ← Root component
├── app.config.ts
└── app.routes.ts
```

### Layer Responsibilities

| Layer | Contains | Does NOT contain |
|---|---|---|
| **core/** | Guards, interceptors, global services, API interfaces, HTTP tokens | Feature-specific UI, presentational components |
| **shared/** | Layout shell, reusable components, pipes, directives, validators, UI services | Business logic, API calls, route-level screens |
| **features/** | Route-level components, feature models, feature services | App-wide singletons, generic UI primitives |

**Rule of thumb:** If it is used by one domain, put it in `features/`. If it is used across domains as UI, put it in `shared/`. If it is infrastructure used everywhere, put it in `core/`.

---

## Directory Structure

```
frontend/
├── assets/                         Static assets (images, etc.)
├── public/                         Public assets copied as-is
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   ├── guards/             Route guards
│   │   │   ├── interceptors/       HTTP interceptors
│   │   │   ├── interfaces/         API response / DTO interfaces
│   │   │   ├── services/           App-wide singleton services
│   │   │   └── tokens/             HttpContextTokens, DI tokens
│   │   ├── shared/
│   │   │   ├── components/         Reusable UI components
│   │   │   ├── directives/         Shared directives
│   │   │   ├── pipes/              Shared pipes
│   │   │   ├── services/           UI orchestration services
│   │   │   └── validators/         Reusable form validators
│   │   ├── features/
│   │   │   ├── auth/               Authentication feature
│   │   │   ├── dashboard/
│   │   │   ├── courses/
│   │   │   ├── administrators/
│   │   │   ├── users/
│   │   │   ├── profile/
│   │   │   └── shell/              Authenticated app route definitions
│   │   ├── app.routes.ts
│   │   ├── app.config.ts
│   │   └── app.ts
│   ├── environments/
│   └── styles.scss
└── angular.json
```

---

## Path Aliases

Use path aliases instead of deep relative imports (`../../../`).

| Alias | Maps to | Example |
|---|---|---|
| `@core/*` | `src/app/core/*` | `@core/services/auth` |
| `@shared/*` | `src/app/shared/*` | `@shared/components/nav-bar/nav-bar` |
| `@features/*` | `src/app/features/*` | `@features/auth/sign-in/sign-in` |
| `@env/*` | `src/environments/*` | `@env/environment` |

Configured in `tsconfig.json`.

---

## Feature Structure

Each feature lives under `src/app/features/<domain>/`:

```
features/users/
├── users-landing/          Route-level component
│   ├── users-landing.ts
│   ├── users-landing.html
│   ├── users-landing.scss
│   └── users-landing.spec.ts
├── services/               Feature-specific services (when needed)
│   └── users.service.ts
├── models/                 Feature-specific types (when needed)
│   └── user.model.ts
└── .gitkeep
```

### Component File Convention

Each component folder contains co-located files:

```
<component-name>/
├── <component-name>.ts
├── <component-name>.html
├── <component-name>.scss
└── <component-name>.spec.ts
```

Angular 17+ flat naming is used — no `.component.ts` suffix.

---

## Where to Put Things

### Components

| Type | Location | Example |
|---|---|---|
| Route-level / domain screen | `features/<domain>/<name>/` | `features/auth/sign-in/` |
| Reusable layout / UI | `shared/components/<name>/` | `shared/components/nav-bar/` |
| Generic error pages | `shared/components/<name>/` | `shared/components/page-not-found/` |

### Services

| Type | Location | Example |
|---|---|---|
| App-wide API gateway | `core/services/` | `AuthService`, `CountryService` |
| Session / auth state | `core/services/` | `AuthStateService` |
| UI orchestration (modals, toasts) | `shared/services/` | `ConfirmationModalService` |
| Feature-specific data/logic | `features/<domain>/services/` | `UsersService` |

### Models & Interfaces

| Type | Location | Example |
|---|---|---|
| Generic API response shapes | `core/interfaces/` | `IBaseResponse<T>` |
| Feature-specific models | `features/<domain>/models/` | `ISignUpModel` |
| Shared domain types used across features | `core/interfaces/` or a future `shared/models/` | `ICountry` |

### Guards, Interceptors, Tokens

| Type | Location |
|---|---|
| Route guards | `core/guards/` |
| HTTP interceptors | `core/interceptors/` |
| HttpContextTokens / DI tokens | `core/tokens/` |

---

## Routing

Routes are split across three files:

| File | Responsibility |
|---|---|
| `app.routes.ts` | Top-level shells and wildcard |
| `features/auth/auth.routes.ts` | Sign-in, sign-up (guest routes) |
| `features/shell/app.routes.ts` | Authenticated `/app/*` child routes |

### Route Tree

```
/                           → AuthLanding (auth shell)
├── /sign-in                → SignIn        [guestGuard]
└── /sign-up                → SignUp        [guestGuard]

/app                        → LayoutContainer [authGuard]
├── /app/dashboard          → DashboardLanding
├── /app/courses            → CoursesLanding
├── /app/administrators     → AdministratorsLanding
├── /app/users              → UsersLanding
└── /app/profile            → ProfileLanding

/**                         → PageNotFound
```

### Layout Shells

Two parent layouts wrap child routes:

1. **AuthLanding** — unauthenticated area (sign-in, sign-up)
2. **LayoutContainer** — authenticated app shell (nav bar, sidebar, main content, confirmation modal)

`MainContent` contains the nested `<router-outlet>` for feature pages.

### Lazy Loading

All feature route components use `loadComponent` for code splitting:

```typescript
{
  path: 'dashboard',
  loadComponent: () =>
    import('@features/dashboard/dashboard-landing/dashboard-landing').then(
      (m) => m.DashboardLanding,
    ),
  title: 'MajeVal | Dashboard',
}
```

### Guards

| Guard | File | Applied to |
|---|---|---|
| `authGuard` | `core/guards/auth.guard.ts` | `/app` parent route |
| `guestGuard` | `core/guards/guest.guard.ts` | `/sign-in`, `/sign-up` |

Guards use `AuthStateService` (`core/services/auth-state.ts`) to check session state.

---

## HTTP Layer

### Interceptor Chain

Registered in `app.config.ts` in this order:

1. **authInterceptor** — prepends `baseUrl`, sets headers, attaches credentials
2. **loaderInterceptor** — global loading indicator (placeholder)
3. **errorInterceptor** — HTTP error handling, token refresh, snackbar messages

### Public API Bypass

Endpoints that do not require authentication set the `IS_PUBLIC_API` context token:

```typescript
import { IS_PUBLIC_API } from '@core/tokens/http-context.tokens';

this.http.get('app/countries', {
  context: new HttpContext().set(IS_PUBLIC_API, true),
});
```

Token is defined in `core/tokens/http-context.tokens.ts`.

---

## State Management

There is no global state library (NgRx, etc.). State is managed with:

| Mechanism | Used for |
|---|---|
| Angular signals | Local UI state, auth session flag |
| Reactive Forms / Signal Forms | Form state |
| RxJS Subjects | Modal service, interceptor token refresh |
| Component fields | Simple local data |

When a feature grows complex, prefer `@ngrx/signals` or a feature-scoped service with signals before introducing a full store.

---

## Naming Conventions

| Element | Convention | Example |
|---|---|---|
| Component selector | `maj-` prefix | `maj-sign-in` |
| Component class | PascalCase, no suffix | `SignIn`, `LayoutContainer` |
| File / folder names | kebab-case | `sign-in/sign-in.ts` |
| Route paths | kebab-case | `/sign-in`, `/app/dashboard` |
| Landing pages | `{domain}-landing` | `dashboard-landing/` |
| Interfaces | `I` prefix | `IBaseResponse`, `ICountry` |
| Services | `{Name}Service` class, kebab-case file | `auth.ts` → `AuthService` |
| Guards | `{name}.guard.ts`, `{name}Guard` fn | `auth.guard.ts` → `authGuard` |
| Interceptors | `{name}-interceptor.ts`, `{name}Interceptor` fn | `auth-interceptor.ts` |

---

## Environment Configuration

| File | Used when |
|---|---|
| `environment.ts` | Production builds |
| `environment.development.ts` | Development builds (via file replacement) |

Always import from `@env/environment` — never import `.development` directly:

```typescript
import { environment } from '@env/environment';
```

File replacement is configured in `angular.json` under the `development` build configuration.

---

## Adding a New Feature

Example: adding a **Reports** feature.

### 1. Create the feature folder

```
features/reports/
└── reports-landing/
    ├── reports-landing.ts
    ├── reports-landing.html
    ├── reports-landing.scss
    └── reports-landing.spec.ts
```

Generate with Angular CLI:

```bash
ng generate component features/reports/reports-landing --standalone
```

### 2. Add the route

In `features/shell/app.routes.ts`:

```typescript
{
  path: 'reports',
  loadComponent: () =>
    import('@features/reports/reports-landing/reports-landing').then(
      (m) => m.ReportsLanding,
    ),
  title: 'MajeVal | Reports',
},
```

### 3. Add navigation

Update `shared/components/side-bar/side-bar.html`:

```html
<button (click)="onClick('reports')">Reports</button>
```

### 4. Add a feature service (when needed)

```
features/reports/
├── services/
│   └── reports.service.ts
└── models/
    └── report.model.ts
```

Keep API calls in the feature service. Only promote to `core/services/` if multiple unrelated features need the same service.

---

## Shared UI Patterns

### Confirmation Modal

Global modal driven by an imperative service:

- Component: `shared/components/confirmation-modal/`
- Service: `shared/services/confirmation-modal.ts`

```typescript
this.modalService.open({
  title: 'Confirm Action',
  message: 'Are you sure?',
  confirmText: 'Yes',
  type: 'warning',
}).subscribe((confirmed) => {
  if (confirmed) { /* act */ }
});
```

The modal is mounted once in `LayoutContainer` and listens to the service.

---

## Testing

- Test runner: **Vitest** via `ng test`
- Every component and service has a co-located `.spec.ts`
- Spec files live next to the file they test — never in a separate `tests/` tree

---

## SSR

Server-side rendering is enabled (`outputMode: "server"` in `angular.json`).

| File | Purpose |
|---|---|
| `main.server.ts` | Server bootstrap |
| `app.config.server.ts` | Server-specific providers |
| `app.routes.server.ts` | Prerender configuration |
| `server.ts` | Express SSR entry |

When adding features that fetch data on init, ensure HTTP calls are SSR-safe (use `inject(PLATFORM_ID)` checks or defer fetching to the browser) to avoid prerender timeouts.

---

## Checklist for New Code

Before opening a PR, verify:

- [ ] Component is in the correct layer (`core/`, `shared/`, or `features/`)
- [ ] Imports use path aliases (`@core/`, `@shared/`, `@features/`, `@env/`)
- [ ] Route is registered in the appropriate routes file
- [ ] Authenticated routes are behind `authGuard`
- [ ] Feature route uses `loadComponent` lazy loading
- [ ] Co-located `.spec.ts` exists
- [ ] No hardcoded environment imports
- [ ] Feature-specific types are in `features/<domain>/models/`, not inline in components
