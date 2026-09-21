/*
  DAY 1 — Controlled Input
  ========================
  WHAT TO BUILD:
  A text input where whatever you type appears live below it.

  REQUIREMENTS:
  - One <input> field - done
  - One <p> below it showing the current value
  - When the input is empty, show "Start typing..." in grey
  - A "Clear" button that resets the input to empty

  CONCEPTS THIS DRILLS:
  - useState for a string value
  - onChange event handler
  - Controlled input (value + onChange together)
  - Conditional rendering / ternary

  HINTS (only read if stuck after 10 minutes):
  - useState<string>('') gives you an empty string as initial state
  - <input value={text} onChange={(e) => setText(e.target.value)} />
  - e.target.value is how you read what's in the input

  DO NOT look at the solution until you've written your own attempt.
  Getting it wrong and fixing it is the whole point.
*/

import { useState } from "react";

function ControlledInput() {
  const [text, setText] = useState<string>("");

  return (
    <div>
      <input
        value={text}
        placeholder="Type something…"
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={() => setText("")} disabled={text === ""}>
        Clear
      </button>
      {text === "" ? (
        <p style={{ color: "grey" }}>Start typing...</p>
      ) : (
        <p>{text}</p>
      )}
    </div>
  );
}

export { ControlledInput };
