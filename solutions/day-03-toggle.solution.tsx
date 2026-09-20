/*
  DAY 3 — SOLUTION: Toggle / Show-Hide
  =====================================
*/

import { useState } from 'react';

export const Toggle = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}
      >
        <span
          style={{
            display: 'inline-block',
            transition: 'transform 150ms ease',
            transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
          }}
        >
          ▶
        </span>
        {isOpen ? 'Hide details' : 'Show details'}
      </button>

      {isOpen && (
        <div
          style={{
            marginTop: 12,
            padding: 16,
            border: '1px solid #ddd',
            borderRadius: 8,
          }}
        >
          <h3 style={{ marginTop: 0 }}>Condition report</h3>
          <p style={{ marginBottom: 0 }}>
            Near Mint, sleeved since purchase. Small edge wear on the bottom
            right corner, visible under direct light. Ships in a toploader.
          </p>
        </div>
      )}
    </div>
  );
};

/*
  WHY THIS WORKS
  ==============

  1. setIsOpen(prev => !prev), not setIsOpen(!isOpen).
     Same lesson as Day 2, and it matters more than it looks. The updater
     form says "flip whatever the current value is" rather than "set it to
     the opposite of what it was when I rendered." With fast clicks or
     batched updates, those differ.

  2. `isOpen`, not `open` or `show`.
     Boolean state reads best with an is/has/can prefix. `isOpen &&` is
     unambiguous at a glance; `open &&` could be a verb. Naming is the
     cheapest readability win available.

  3. `&&` here, ternary on Day 1.
     This is genuinely "render it or render nothing," which is exactly
     what && expresses. The button label, which has two real branches, uses
     a ternary. Match the operator to the shape of the decision.

     One trap: `&&` with a NUMBER on the left renders the number.
     {items.length && <List />} renders a literal "0" when the array is
     empty, because 0 is falsy but still a valid React child. With
     booleans you're safe; with counts, write `items.length > 0 &&`.

  4. The transition is on the arrow, not on the panel.
     `{isOpen && <div/>}` doesn't fade — it mounts and unmounts, and an
     element that isn't in the DOM can't animate its way in. Animating
     mount/unmount needs either CSS that runs on mount, keeping the
     element mounted and animating height/opacity, or a library. The arrow
     rotation works because that span is always mounted and only its
     transform changes.

     Knowing WHY the naive fade doesn't work is worth more than the fade.

  5. aria-expanded={isOpen}.
     One attribute; it tells a screen reader the button controls something
     that is currently open or closed. Accessibility in an interview
     answer is a strong signal and this is the cheapest example of it.

  COMMON MISTAKES
  ===============
  - Two useStates (isOpen + buttonLabel) kept in sync by hand. The label
    is derived. One state.
  - Hiding with CSS (`display: none`) and calling it done. Sometimes
    correct — the content stays in the DOM, keeps its state, and stays
    searchable by Ctrl+F. But it's also still read by some assistive tech
    unless you're careful. Conditional rendering removes it entirely.
    Pick deliberately; know the difference.
  - onClick={setIsOpen(!isOpen)} — calls during render, infinite loop.
  - Nesting the panel INSIDE the <button>. A button may not contain block
    content, and every click inside the panel would toggle it shut.
*/
