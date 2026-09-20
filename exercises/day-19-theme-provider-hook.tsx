/*
  DAY 19 — ThemeProvider + useTheme Hook
  =======================================
  WHAT TO BUILD:
  Day 18, packaged the way you'd actually ship it: the context object
  itself is private, and consumers only ever touch useTheme().

  REQUIREMENTS:
  - ThemeProvider component with a children prop, correctly typed
  - A useTheme() hook that calls useContext internally
  - useTheme THROWS a clear error if used outside a ThemeProvider:
      "useTheme must be used inside a ThemeProvider"
  - After the throw, the return type must be non-nullable — consumers
    should never write theme?.theme or a null check
  - The ThemeContext itself is NOT exported

  CONCEPTS THIS DRILLS:
  - Typing children: React.ReactNode
  - The provider + consumer-hook pair (the standard React pattern)
  - How a throw narrows a type from T | null down to T
  - Designing an API so the wrong usage is impossible, not just discouraged

  HINTS (only read if stuck after 10 minutes):
  - type ThemeProviderProps = { children: React.ReactNode };
  - const useTheme = () => {
      const ctx = useContext(ThemeContext);
      if (!ctx) throw new Error('useTheme must be used inside a ThemeProvider');
      return ctx;  // TypeScript knows this is non-null here
    };
  - Hover over the return type in your editor to confirm the null is gone

  ASK YOURSELF AFTER:
  Why is throwing better than returning a default 'light' theme?
  (Because a silent default hides a wiring bug until it's in production.)

  DO NOT look at the solution until you've written your own attempt.
*/

import { createContext, useContext, useState } from 'react';

export type Theme = 'light' | 'dark';

// Write your ThemeContextValue type here:

// Write your context here (do NOT export it):

// Write your ThemeProvider here:

// Write your useTheme hook here:

// Write a small demo tree that uses it:
export const App = () => {

};
