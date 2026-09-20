/*
  DAY 18 — Dark/Light Toggle with Context
  ========================================
  WHAT TO BUILD:
  A theme that a deeply nested component can read without anyone
  passing it a prop.

  REQUIREMENTS:
  - createContext for a theme: 'light' | 'dark'
  - A Provider at the top holding the theme in state
  - A nested tree at least three levels deep:
      App > Page > Header > ThemeToggle
  - ThemeToggle reads the theme AND flips it, using only useContext
  - NO component in between may receive or forward a theme prop
  - Background/text colors actually change when you toggle

  CONCEPTS THIS DRILLS:
  - createContext / <Context.Provider value={...}> / useContext
  - Prop drilling, and what it costs
  - Putting both a value and its setter in one context value
  - Typing a context that has no sensible default

  HINTS (only read if stuck after 10 minutes):
  - type ThemeContextValue = { theme: Theme; toggleTheme: () => void };
  - const ThemeContext = createContext<ThemeContextValue | null>(null);
    Starting at null is honest: there IS no theme outside a provider.
  - useContext returns the nearest provider's value, or the createContext
    default if there is no provider above you
  - value={{ theme, toggleTheme }} creates a new object every render —
    fine today, remember it for later

  TRAP TO AVOID:
  Rendering <ThemeToggle /> outside the Provider and wondering why the
  value is null. Context flows down the TREE, not the file.

  DO NOT look at the solution until you've written your own attempt.
*/

import { createContext, useContext, useState } from 'react';

export type Theme = 'light' | 'dark';

// Write your ThemeContextValue type here:

// Write your context here:

// Write your ThemeProvider here:

// Write ThemeToggle here (3 levels deep, reads context directly):

// Write Header, Page, and App here:
export const App = () => {

};
