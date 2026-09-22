/*
  DAY 3 — Toggle / Show-Hide
  ==========================
  WHAT TO BUILD:
  A panel that can be shown or hidden with a button.

  REQUIREMENTS:
  - A button that says "Show details" when the panel is hidden
  - The same button says "Hide details" when the panel is visible
  - The panel contains a title and a paragraph of any text
  - The panel fades in smoothly (optional: use a CSS transition)
  - A small arrow icon on the button that rotates when open (optional)

  CONCEPTS THIS DRILLS:
  - useState for a boolean
  - Toggling: setIsOpen(prev => !prev)
  - Conditional rendering with && or ternary
  - Dynamic button label based on state

  HINTS (only read if stuck after 10 minutes):
  - useState<boolean>(false) — start closed
  - {isOpen && <div>...</div>} renders the div only when isOpen is true
  - Button label: {isOpen ? 'Hide details' : 'Show details'}

  DO NOT look at the solution until you've written your own attempt.
*/
import { useState } from "react";

export const Toggle = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setIsOpen((prev) => !prev)}>
        <span> ▶ </span>
        {isOpen ? "Hide Details" : "Show Details"}
      </button>

      {isOpen && (
        <div>
          <h2>Condition report</h2>
          <p>
            Near Mint, sleeved since purchase. Small edge wear on the bottom
            right corner, visible under direct light. Ships in a toploader.
          </p>
        </div>
      )}
    </div>
  );
};
