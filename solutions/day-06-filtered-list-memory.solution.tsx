/*
  DAY 6 — SOLUTION: Filtered List (From Memory)
  ==============================================
  Same task as Day 4, so this is the same solution. Read the Day 4
  explanation for the reasoning; the notes below are about the repeat.
*/

import { useState } from 'react';

const ITEMS = [
  'Black Lotus',
  'Charizard Base Set',
  'Pikachu Illustrator',
  'Blue-Eyes White Dragon',
  'Dark Magician',
  'Mox Ruby',
  'Ancestral Recall',
  'Holographic Raichu',
  'Shadowless Blastoise',
  'Time Walk',
];

export const FilteredList = () => {
  const [query, setQuery] = useState('');

  const normalized = query.trim().toLowerCase();
  const filtered = ITEMS.filter((item) => item.toLowerCase().includes(normalized));

  return (
    <div>
      <input
        type="search"
        value={query}
        placeholder="Search cards…"
        onChange={(e) => setQuery(e.target.value)}
      />

      <p>
        Showing {filtered.length} of {ITEMS.length} items
      </p>

      {filtered.length === 0 ? (
        <p>No results for "{query}"</p>
      ) : (
        <ul>
          {filtered.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

/*
  HOW TO GRADE YOURSELF
  =====================
  The code is not the point today. The question is what happened in your
  head while writing it.

  Should have been automatic by now:
  - useState('') and the value/onChange pair, without pausing
  - .filter() with a callback returning a boolean
  - Lowercasing BOTH sides of the comparison
  - Deriving `filtered` instead of storing it in state

  Still fine to have thought about:
  - Whether to use && or a ternary for the empty branch
  - Where to put .trim()
  - Whether `key={item}` is safe here (it is — the strings are unique)

  A red flag, worth repeating tomorrow:
  - Reaching for a second useState for the filtered list. That's the one
    habit this exercise exists to break. If you did it, you don't yet
    believe "derive, don't store" — you only know it. Write it once more.
  - Having to look up `e.target.value`.
  - Forgetting the `key` and only noticing via the console warning.

  WHAT ACTUALLY GETS FASTER
  =========================
  Not typing speed. What changes is that you stop deciding. On Day 4 you
  decided where the filter goes, whether to store it, how to handle empty.
  By Day 6 those aren't decisions anymore, so your attention is free for
  the parts that are genuinely new — which is exactly what you want in a
  take-home, where the plumbing should cost you nothing.

  If this took under 10 minutes and you never paused, move on.
  If it didn't, the repeat did its job — do it again tomorrow before Day 7.
*/
