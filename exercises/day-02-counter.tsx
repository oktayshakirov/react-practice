/*
  DAY 2 — Counter
  ===============
  WHAT TO BUILD:
  A simple counter with controls.

  REQUIREMENTS:
  - Display the current count as a large number
  - Three buttons: "–" (decrement), "Reset", "+" (increment)
  - Count cannot go below 0 (disable or ignore the – button at 0)
  - When count is 0, the number displays in grey
  - When count is above 0, the number displays in green

  CONCEPTS THIS DRILLS:
  - useState for a number
  - onClick handlers
  - Conditional styling based on state
  - Preventing invalid state (no negatives)

  HINTS (only read if stuck after 10 minutes):
  - useState<number>(0) for the initial count
  - For conditional color: style={{ color: count === 0 ? 'grey' : 'green' }}
  - To prevent going below 0: setCount(prev => Math.max(0, prev - 1))

  DO NOT look at the solution until you've written your own attempt.
*/

import { useState } from "react";

export const Counter = () => {
  const [count, setCount] = useState(0);

  const decrement = () => setCount((prev) => Math.max(0, prev - 1));
  const increment = () => setCount((prev) => prev + 1);
  const reset = () => setCount(0);

  return (
    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
      <button onClick={decrement} disabled={count === 0}>
        -
      </button>
      <span
        style={{
          fontSize: "48px",
          fontWeight: "700",
          color: count === 0 ? "grey" : "green",
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
