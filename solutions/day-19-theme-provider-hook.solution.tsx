/*
  DAY 19 — SOLUTION: ThemeProvider + useTheme Hook
  =================================================
  This is the shape you'd actually ship, and the shape a reviewer
  expects to see.
*/

import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export type Theme = 'light' | 'dark';

type ThemeContextValue = {
  theme: Theme;
  toggleTheme: () => void;
};

// NOT exported. Consumers go through useTheme or they don't get in.
const ThemeContext = createContext<ThemeContextValue | null>(null);

type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>('light');

  const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextValue => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside a ThemeProvider');
  return ctx;
};

/* ---------- demo tree ---------- */

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} style={{ cursor: 'pointer' }}>
      Switch to {theme === 'light' ? 'dark' : 'light'} mode
    </button>
  );
};

const Header = () => (
  <header style={{ display: 'flex', justifyContent: 'space-between', padding: 16 }}>
    <strong>Cardmarket</strong>
    <ThemeToggle />
  </header>
);

const Page = () => {
  const { theme } = useTheme();

  return (
    <div
      style={{
        minHeight: '100vh',
        background: theme === 'light' ? '#ffffff' : '#1a1a1a',
        color: theme === 'light' ? '#1a1a1a' : '#f5f5f5',
      }}
    >
      <Header />
      <main style={{ padding: 16 }}>
        <p>No null checks anywhere below the provider.</p>
      </main>
    </div>
  );
};

export const App = () => (
  <ThemeProvider>
    <Page />
  </ThemeProvider>
);

/*
  WHY THIS WORKS
  ==============

  1. The throw is a TYPE operation as much as a runtime one.
     useContext returns ThemeContextValue | null. After
     `if (!ctx) throw ...`, TypeScript knows the null case exited, so the
     return type narrows to ThemeContextValue — no null, no optional
     chaining, no `ctx!` assertion at any call site.

     One throw inside the hook removes a null check from every consumer
     you will ever write. That's the trade: one line of defensive code in
     the right place beats fifty in the wrong places.

  2. Why throw instead of defaulting to 'light'?
     Because using the hook outside a provider is a WIRING BUG, not a
     situation. A silent default means the app renders, looks almost
     right, and the toggle mysteriously does nothing — you find out in
     code review, or you don't. The throw fails immediately, in
     development, with a message that names the fix. Fail loud on
     programmer error, degrade gracefully on user/network error (which is
     why Day 16 renders an error state instead of throwing).

  3. ThemeContext is not exported.
     This is the part people skip, and it's what makes the pattern hold.
     If consumers can import the context, they can call useContext
     directly, skip the throw, and reintroduce the null. Export the
     Provider and the hook; keep the mechanism private. The public API
     becomes two things, both of which are hard to misuse.

  4. `children: ReactNode` is the correct type.
     ReactNode covers everything renderable: elements, strings, numbers,
     arrays, null, undefined. Not ReactElement (too narrow — rejects a
     string child or multiple children), not JSX.Element (same problem).

     `import type { ReactNode }` — the `type` keyword makes it a
     types-only import that disappears at compile time. Also fine:
     React.ReactNode without the import.

     You may have seen React.FC<Props>, which supplied children
     implicitly. It stopped doing that in React 18's types; declare
     children explicitly.

  5. `{children}` is what makes this composable.
     ThemeProvider doesn't know or care what's inside it. That's the
     composition model React is built on — the same reason you can wrap
     any subtree in it, nest providers, or wrap only part of a page.

  6. The explicit `: ThemeContextValue` return annotation on useTheme.
     Inference gets it right after the narrowing. Writing it makes the
     contract visible and catches an accidental change inside the hook at
     the hook, not at a call site.

  COMMON MISTAKES
  ===============
  - `return ctx!` instead of throwing. The non-null assertion silences
    the compiler and changes nothing at runtime — you still crash later,
    just further from the cause and without a useful message.
  - Returning a default object `?? { theme: 'light', toggleTheme: () => {} }`.
    Now a missing provider is invisible AND the toggle silently no-ops.
  - Exporting ThemeContext "for testing." Test through the Provider —
    that's what the component under test will use in production.
  - Putting useState in the same file but outside ThemeProvider, at
    module scope. Hooks only run inside components.
  - Wrapping only part of the tree and then calling useTheme outside it.
    The throw will tell you exactly this, which is the point.
*/
