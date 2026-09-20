/*
  DAY 2 — SOLUTION: Counter
  ==========================
*/

import { useState } from 'react';

export const Counter = () => {
  const [count, setCount] = useState(0);

  const decrement = () => setCount((prev) => Math.max(0, prev - 1));
  const increment = () => setCount((prev) => prev + 1);
  const reset = () => setCount(0);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <button onClick={decrement} disabled={count === 0}>
        –
      </button>

      <span
        style={{
          fontSize: 48,
          fontWeight: 700,
          minWidth: 80,
          textAlign: 'center',
          color: count === 0 ? 'grey' : 'green',
        }}
      >
        {count}
      </span>

      <button onClick={increment}>+</button>
      <button onClick={reset} disabled={count === 0}>
        Reset
      </button>
    </div>
  );
};

/*
  WHY THIS WORKS
  ==============

  1. setCount(prev => prev + 1), not setCount(count + 1).
     Both appear to work here, and the difference is the single most
     important thing on this page.

     `count` inside your handler is the value captured when that render
     happened. Call setCount(count + 1) twice in a row and both calls see
     the SAME captured count — you get +1, not +2. The updater form
     receives the latest pending value instead, so they stack correctly.

     Use the updater whenever the new state depends on the old state.
     Use the plain form when you're setting an unrelated value
     (setCount(0) below is correct as-is).

  2. Math.max(0, prev - 1) makes the floor structural.
     The invariant "count is never negative" is enforced in the one place
     that changes count, not scattered across every caller. The disabled
     button is the UI half of the same rule — belt and braces, because the
     button could be triggered by keyboard or by a future code path.

  3. Handlers are named consts above the JSX.
     `onClick={decrement}` reads better than an inline arrow with logic in
     it, and you can see all three state transitions in one block. Inline
     arrows are fine for one-liners; extract the moment there's a
     conditional or a second statement.

  4. Three buttons, three distinct transitions, one piece of state.
     There's no `isZero` boolean, no separate `displayColor` state. Both
     are computed from `count` during render. Every extra useState is
     another value that can drift out of sync.

  5. minWidth on the number.
     Without it, the layout jumps when the count goes from 9 to 10. Not
     asked for, but it's the kind of thing that reads as "has shipped UI
     before."

  COMMON MISTAKES
  ===============
  - onClick={increment()} — the parens CALL it during render. React gets
    the return value (undefined), and calling setState during render
    causes an infinite loop. Pass the function, don't call it.
  - count-- or count = count + 1. State is immutable; reassigning the
    variable changes nothing and React never re-renders.
  - Clamping in the JSX (`{count < 0 ? 0 : count}`) instead of in the
    setter. Now state holds -3 while the UI shows 0, and the next
    increment goes to -2. Never let state hold a value you'd refuse to
    display.
  - A second useState for the color. Derive it.
*/
