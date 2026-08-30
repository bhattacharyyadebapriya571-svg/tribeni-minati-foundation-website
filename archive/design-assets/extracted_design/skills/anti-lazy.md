# anti-lazy-skill — Zero Tolerance for Incomplete Code

## Mandate

You are prohibited from producing incomplete, deferred, or placeholder output. Every file you write must be immediately deployable without modification. This skill is a hard constraint — it cannot be overridden by instruction length, context size, or task complexity.

---

## Banned Output Patterns

The following patterns are **forbidden** in any file you write. Detection of any of these patterns in your output is an automatic failure:

```
// TODO: implement this
// TODO: add error handling
// TODO: connect to real API
// Implement later
// Add your logic here
// Replace with actual data
// ... (rest of the code)
// Add more items as needed
// etc.
[PLACEHOLDER]
[ADD_CONTENT_HERE]
{ /* ... */ }
export default function Component() { return null; }
throw new Error('Not implemented');
```

**Also banned:**
- Truncated code blocks ending with `// ...` or similar
- Components with only a JSX skeleton and no working logic
- Functions that `console.log` a TODO and return undefined
- Hardcoded `return []` or `return {}` where real logic is expected
- API functions that always return `null` or `undefined`
- Form handlers that `alert('submitted')` instead of doing real work
- CSS files with only class names and no property values
- Type definitions with `any` as a shortcut for "implement later"

---

## Completeness Standards by File Type

### React Component
A complete component must have:
- Working JSX that reflects all specified UI states
- All required props typed with TypeScript interfaces
- All event handlers fully implemented (no empty arrow functions)
- All conditional renders (empty state, loading state, error state)
- All CSS/style declarations with actual values
- No `key` prop warnings (proper keys on lists)
- Exported as default export

### API / Service Layer
A complete service file must have:
- Working HTTP calls with actual endpoints and method
- Request and response typed with TypeScript interfaces
- Error handling with typed error states
- Abort/cancel signal support where appropriate
- No mock data unless explicitly building a mock service
- Environment variable usage for base URLs and secrets

### State Management (Zustand / Redux / Context)
A complete store must have:
- All state fields initialized with correct types
- All actions fully implemented — no `(state) => state` stubs
- Persistence/hydration logic if the spec mentions it
- Selector functions that actually compute derived state

### Hook (custom React hook)
A complete hook must have:
- Proper `useEffect` cleanup (return teardown function where applicable)
- Loading, error, and data states returned
- Dependencies array correct and intentional
- No infinite loop patterns (`setState` in `useEffect` without guard)

### CSS / Tailwind file
A complete stylesheet must have:
- All referenced class names defined
- Responsive variants for all layout-affecting rules
- No empty rule blocks
- Custom properties declared in `:root` before use

### Configuration file (`tsconfig`, `vite.config`, `package.json`)
A complete config must have:
- All referenced paths and aliases resolved
- All plugins/presets installed in `package.json`
- No placeholder version strings (`"^0.0.0"`)

---

## Truncation Rules

**Never truncate.** If a file is long, write the whole file.

If context limits make full output impossible, split logically into multiple complete files and state explicitly which files remain. Do not write "the rest follows the same pattern" — write the rest.

Preferred split strategy:
1. Group by concern: one file per component, one file per service, one file per hook
2. Keep a file under 400 lines before splitting — this is a signal to refactor, not truncate
3. If a component exceeds 400 lines, extract sub-components into separate files — fully written

---

## UI State Completeness

Every UI component must handle all observable states. No exceptions.

| State | Required output |
|-------|-----------------|
| **Loading** | Skeleton or spinner — never blank white space |
| **Empty** | Illustrated or text empty state — never hidden |
| **Error** | Error message with retry action — never a silent failure |
| **Success** | Confirmation feedback — never silence after a form submit |
| **Disabled** | Visual distinction + `cursor: not-allowed` + `aria-disabled` |
| **Partial / Truncated data** | Graceful truncation with expand affordance |

```tsx
// Complete pattern — all states handled
function UserList({ query }: { query: string }) {
  const { data, error, isLoading } = useUsers(query);

  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-12 rounded-lg bg-gray-100 animate-pulse" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center py-12 gap-3">
        <p className="text-sm text-red-600">Failed to load users: {error.message}</p>
        <button onClick={() => window.location.reload()} className="text-sm underline">
          Retry
        </button>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center py-12 gap-2">
        <UsersIcon className="w-8 h-8 text-gray-300" />
        <p className="text-sm text-gray-500">
          {query ? `No users match "${query}"` : 'No users yet. Invite your team.'}
        </p>
      </div>
    );
  }

  return (
    <ul className="divide-y divide-gray-100">
      {data.map((user) => (
        <UserRow key={user.id} user={user} />
      ))}
    </ul>
  );
}
```

---

## Import Completeness

Every import must be resolvable. Before writing an import, confirm:

1. The package is listed in `package.json` (or install it first)
2. The named export exists in the package (check types or docs)
3. The relative path is correct relative to the file being written
4. No circular imports

**Never write:**
```ts
import { SomeThing } from 'some-package'; // hoping it exists
import utils from '../utils'; // file doesn't exist yet
```

**Always verify, then write.**

---

## Accessibility Floor

Every interactive element must meet this minimum:

```tsx
// Button
<button
  type="button"
  aria-label="Close dialog"        // if no visible text
  disabled={isLoading}
  aria-disabled={isLoading}
>

// Image
<img src={url} alt="Descriptive text about image content" loading="lazy" />

// Link
<a href={url} rel="noopener noreferrer" target="_blank">  {/* external links */}

// Form field
<label htmlFor="email">Email address</label>
<input
  id="email"
  type="email"
  autoComplete="email"
  aria-required="true"
  aria-describedby="email-error"
/>

// Error
<p id="email-error" role="alert" aria-live="polite">
  {error}
</p>
```

---

## Code Quality Enforcement

### TypeScript
- No `any` types — use `unknown` and narrow, or write the actual interface
- No `@ts-ignore` — fix the underlying type issue
- No `as unknown as X` double casting — restructure the code
- All async functions must declare their return type

### React
- No array index as `key` when items can be reordered or filtered
- No direct DOM manipulation via `document.querySelector` — use refs
- No `useEffect` with empty deps that sets state unconditionally (infinite loop)
- All `useCallback` and `useMemo` must have correct dependency arrays

### General
- No `console.log` left in production code
- No commented-out dead code blocks
- No magic numbers — extract to named constants
- No hardcoded URLs — use environment variables or config constants
