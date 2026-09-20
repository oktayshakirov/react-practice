/*
  DAY 18 — SOLUTION: Dark/Light Toggle with Context
  ==================================================
*/

import { createContext, useContext, useState } from 'react';

export type Theme = 'light' | 'dark';

type ThemeContextValue = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

/* ---------- level 3: reads the context, gets no props ---------- */

const ThemeToggle = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) return null;

  return (
    <button onClick={ctx.toggleTheme} style={{ cursor: 'pointer' }}>
      Switch to {ctx.theme === 'light' ? 'dark' : 'light'} mode
    </button>
  );
};

/* ---------- levels 1 and 2: pure pass-through, no theme props ---------- */

const Header = () => (
  <header style={{ display: 'flex', justifyContent: 'space-between', padding: 16 }}>
    <strong>Cardmarket</strong>
    <ThemeToggle />
  </header>
);

const Page = () => (
  <div>
    <Header />
    <main style={{ padding: 16 }}>
      <p>Three levels down, and nobody passed a theme prop.</p>
    </main>
  </div>
);

/* ---------- the provider ---------- */

export const App = () => {
  const [theme, setTheme] = useState<Theme>('light');

  const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div
        style={{
          minHeight: '100vh',
          background: theme === 'light' ? '#ffffff' : '#1a1a1a',
          color: theme === 'light' ? '#1a1a1a' : '#f5f5f5',
        }}
      >
        <Page />
      </div>
    </ThemeContext.Provider>
  );
};

/*
  WHY THIS WORKS
  ==============

  1. The state still lives in exactly one place.
     Context is not a state manager. `theme` is ordinary useState in App;
     Context is only the delivery mechanism that skips the intermediate
     components. Everything you know about state still applies — the
     updater form in toggleTheme, re-rendering on change, all of it.

  2. Page and Header never mention the theme.
     That's the whole demonstration. Without Context, App would pass theme
     to Page, Page to Header, Header to ThemeToggle — three components
     touching a value only the fourth one needs, and every one of them
     needing an edit if the value's type changes. That's prop drilling,
     and this is what it costs.

     It's worth being precise about when drilling is actually bad: one or
     two levels is usually fine and more explicit than Context. Reach for
     Context when the value is genuinely global (theme, current user,
     locale) and the tree is deep.

  3. createContext<ThemeContextValue | null>(null) — null is the honest
     default. There IS no theme outside a provider, so any other default
     would be a lie that hides a wiring mistake. The cost is the null
     check in every consumer, which is exactly what Day 19 fixes with a
     custom hook that throws instead.

  4. Both the value AND the setter go in the context.
     A consumer that can read the theme but not change it would need the
     toggle passed down as a prop — which reintroduces the drilling you
     just removed. Bundling { theme, toggleTheme } is the standard shape.

  5. value={{ theme, toggleTheme }} creates a new object every render.
     Real, and harmless here: App only re-renders when theme changes, and
     when theme changes every consumer SHOULD re-render. It becomes a
     problem when the provider re-renders for unrelated reasons, because
     a new object identity forces every consumer to re-render even though
     the theme didn't change. The fix is useMemo on the value. Don't add
     it until you have a reason — but know the sentence, because it's a
     common interview follow-up.

  6. Context flows down the TREE, not the file.
     ThemeToggle is defined above App in this file and still works,
     because what matters is that <ThemeToggle/> is RENDERED inside
     <ThemeContext.Provider>. Render it as a sibling of the Provider and
     useContext returns the createContext default — null here.

  COMMON MISTAKES
  ===============
  - useContext(ThemeContext.Provider). You pass the CONTEXT object, not
    the Provider component.
  - Putting the Provider inside the component that needs the value.
  - Reading the context and ALSO accepting a theme prop "just in case."
    Two sources of truth, and they will disagree.
  - Creating the context inside a component body. A new context object
    every render means consumers never match the provider.
  - Defaulting to 'light' instead of null and then wondering why the app
    renders fine with no provider anywhere. Silent wrong behaviour beats
    loud correct failure only in the short term.
*/
