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

import { useState } from 'react';

// Write your component here:
export const Counter = () => {

};
