/*
  DAY 4 — SOLUTION: Filtered List
  ================================
  Includes the optional bold-match stretch goal at the bottom.
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
            <li key={item}>
              <Highlight text={item} query={normalized} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

/* Stretch goal: bold the matching part. */
const Highlight = ({ text, query }: { text: string; query: string }) => {
  if (query === '') return <>{text}</>;

  const start = text.toLowerCase().indexOf(query);
  if (start === -1) return <>{text}</>;

  const end = start + query.length;
  return (
    <>
      {text.slice(0, start)}
      <strong>{text.slice(start, end)}</strong>
      {text.slice(end)}
    </>
  );
};

/*
  WHY THIS WORKS
  ==============

  1. ONE piece of state: the query.
     `filtered` is a plain const recomputed on every render. This is the
     lesson the whole exercise exists for.

     The tempting wrong version is a second useState for the filtered list,
     updated inside onChange. It works for about a day, then someone adds
     a second filter, or the source array changes, and now there are two
     places that must agree. Derived values can't go stale, so derive
     everything you can: counts, filtered lists, sorted lists, totals,
     validity flags. If you can compute it from what you already have,
     it isn't state.

  2. Both sides lowercased.
     `item.toLowerCase().includes(query.toLowerCase())`. Lowercasing only
     one side gives you a search that works exactly when you happen to
     type the right casing — which is always, when you're the one testing.

  3. `normalized` is computed once, outside the filter callback.
     Inside the predicate it'd rebuild the same lowercase string per item.
     Trivial at 10 items, a real habit at 10,000, and it reads better
     because the intent gets a name.

  4. .trim() so a stray space doesn't kill every result.
     Small robustness call; users hit the spacebar by accident constantly.
     Note I keep the RAW query in the "No results for …" message — echoing
     back the trimmed/lowercased version would look like a bug to the user.

  5. key={item} — the strings are unique here, so they're a legitimate key.
     Not always true. The moment two listings share a name (very likely on
     a real marketplace) you need a real id. That's why every later day
     uses objects with `id`.

  6. The Highlight component uses slice, not a regex.
     `new RegExp(query)` breaks the moment someone types "(" or "+" — user
     input as a regex pattern is a bug (and in other contexts, a
     vulnerability). indexOf + slice handles any input safely.
     It returns a fragment <>…</> because it renders three pieces of
     inline content and shouldn't add a wrapper element.

  COMMON MISTAKES
  ===============
  - const [filtered, setFiltered] = useState(ITEMS). See point 1.
  - Filtering inside onChange. Same problem, more subtle: the list only
    updates when THAT handler fires, so any other state change leaves it
    stale.
  - `ITEMS.filter(...)` assigned back to ITEMS. filter returns a new
    array and never mutates — that's exactly why it's safe here.
  - Showing "Showing 0 of 10" alongside a blank space with no message.
    The empty branch is part of the feature, not an edge case.
  - Rendering the <ul> with zero <li> children. Valid HTML, useless UI.
*/
