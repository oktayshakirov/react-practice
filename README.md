# React Practice — No AI Allowed

Personal repo for building React/TypeScript muscle memory from scratch.

## The Rule
During each exercise: **no Claude, no Copilot, no AI autocomplete.**
You can use: official React docs, MDN, your own brain.
After finishing: review with AI, refactor, understand the feedback. That's fine.

## Structure
```
exercises/     ← open these, read the task, write your solution inside
solutions/     ← reference solutions + explanations (don't open until you've tried)
src/           ← the Vite app. Only src/App.tsx ever needs editing
```
Everything is numbered by day, day-01 through day-28, all in one place.

## Arc
- **Days 1-7** — Core patterns: state, props, events, lists
- **Days 8-14** — Composition: the marketplace listings page, filter + sort
- **Days 15-21** — useEffect, custom hooks, Context
- **Days 22-28** — Forms, validation, TypeScript generics

## How to use
1. `npm run dev`
2. In `src/App.tsx`, point the single import at today's exercise:
   ```tsx
   import { Counter as Today } from '../exercises/day-02-counter';
   ```
3. Read the task comment at the top of that exercise file
4. Write your solution in that same file — the browser hot-reloads
5. Only then swap the import to `../solutions/day-02-counter.solution`
   and read the explanation
6. Next day: re-read what you wrote, then write it again from memory

A blank exercise renders nothing and React throws "Nothing was returned
from render" until you write a `return`. That's expected — it means the
wiring works and you haven't started yet.

## Progress tracker
- [ ] Day 1 — Controlled Input
- [ ] Day 2 — Counter
- [ ] Day 3 — Toggle
- [ ] Day 4 — Filtered List
- [ ] Day 5 — Card with Props
- [ ] Day 6 — Filtered List (from memory)
- [ ] Day 7 — Card with full TypeScript types (from memory)
- [ ] Day 8 — ProductCard component
- [ ] Day 9 — ProductList with .map()
- [ ] Day 10 — Sort by price
- [ ] Day 11 — Filter by category
- [ ] Day 12 — Extract FilterBar component
- [ ] Day 13 — Extract ProductList component
- [ ] Day 14 — Empty/no-results state ← marketplace page done
- [ ] Day 15 — Fetch on mount with useEffect
- [ ] Day 16 — Loading + error states
- [ ] Day 17 — Custom useProducts hook
- [ ] Day 18 — Dark/light toggle with Context
- [ ] Day 19 — ThemeProvider + useTheme hook
- [ ] Day 20 — Generic useFetch from memory
- [ ] Day 21 — Themed product list ← everything combined
- [ ] Day 22 — Controlled form
- [ ] Day 23 — Validation + error messages
- [ ] Day 24 — Disable submit until valid
- [ ] Day 25 — Multi-step form
- [ ] Day 26 — TypeScript generics on useFetch
- [ ] Day 27 — Rewrite weakest component cleaner
- [ ] Day 28 — Write README notes on every hook used

## Solutions
Days 1-21 — one per exercise. Each is working code plus a `WHY THIS WORKS`
block explaining the decisions and a `COMMON MISTAKES` list. The two
from-memory days (6 and 20) have a `HOW TO GRADE YOURSELF` section instead
of new explanation, since the code is a repeat.

Days 22-28 have no exercises or solutions yet.

## Setup
Already scaffolded (Vite + React 19 + TypeScript, strict mode on).
```bash
npm install
npm run dev
```

## Scripts
| | |
|---|---|
| `npm run dev` | dev server on http://localhost:5173 |
| `npm run build` | type-check + production build |
| `npm run lint` | eslint |

`noUnusedLocals` is off and lint is relaxed inside `exercises/` and
`solutions/` on purpose — an unfinished exercise shouldn't fail a build.
`strict` is on everywhere, since typing things properly is the point.
