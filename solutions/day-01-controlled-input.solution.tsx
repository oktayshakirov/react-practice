/*
  DAY 1 — SOLUTION: Controlled Input
  ===================================
  One of several valid answers. If yours differs but works and is typed,
  yours is fine. Compare the decisions, not the characters.
*/

import { useState } from 'react';

export const ControlledInput = () => {
  const [text, setText] = useState('');

  return (
    <div>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type something…"
      />
      <button onClick={() => setText('')} disabled={text === ''}>
        Clear
      </button>

      {text === '' ? (
        <p style={{ color: 'grey' }}>Start typing...</p>
      ) : (
        <p>{text}</p>
      )}
    </div>
  );
};

/*
  WHY THIS WORKS
  ==============

  1. `value` and `onChange` together make it controlled.
     React state is the single source of truth; the DOM input just displays
     it. Every keystroke fires onChange → setText → re-render → the input
     shows the new state. It feels like a round trip because it is one.

     Give it `value` WITHOUT `onChange` and the input freezes — React keeps
     resetting it to the unchanged state, and you get a console warning.
     That's the classic "my input won't type" bug, and now you know it
     means you forgot the handler, not that React is broken.

  2. useState('') — no type annotation needed.
     TypeScript infers `string` from the initial value. Writing
     useState<string>('') is not wrong, just redundant. You DO need the
     explicit type when the initial value doesn't tell the whole story:
     useState<string | null>(null), or useState<Product[]>([]).

  3. `e.target.value` is always a string.
     Even for <input type="number">. If you need a number, you convert it
     yourself — and handle the empty string, because Number('') is 0, not
     NaN, which silently turns a cleared field into a zero.

  4. The Clear button is `disabled` when there's nothing to clear.
     Not required by the task. It costs one attribute and stops the user
     from clicking a button that does nothing — the kind of detail worth
     having as a reflex.

  5. Ternary for the two-branch case.
     Empty vs. non-empty are two different renders, so a ternary fits.
     `&&` is for "render this or render nothing" — using it here would
     mean writing two separate && lines that can't visibly contradict
     each other, which is harder to read, not easier.

  COMMON MISTAKES
  ===============
  - onChange={setText} — the handler receives the EVENT, not the value.
    You'd set state to an event object. Unwrap it: (e) => setText(e.target.value).
  - onChange={(e) => setText(e.target.value)} on a <div>. Only form
    elements fire change events.
  - defaultValue instead of value. That makes it UNcontrolled: the DOM
    owns the value, React can't reset it, and Clear stops working.
  - Checking `!text` instead of `text === ''`. Works for strings, but the
    habit bites you with numbers, where 0 is falsy and usually valid.
*/
