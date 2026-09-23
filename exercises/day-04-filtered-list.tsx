/*
  DAY 4 — Filtered List
  =====================
  WHAT TO BUILD:
  A searchable list of items.

  REQUIREMENTS:
  - A list of at least 8 items (use the ITEMS array below — don't change it)
  - A search input above the list
  - As you type, the list filters to show only matching items (case-insensitive)
  - Show a count: "Showing X of Y items"
  - If nothing matches, show "No results for [query]"
  - Matching part of the item name is bold (optional stretch goal)

  CONCEPTS THIS DRILLS:
  - Combining multiple pieces of state (or deriving from one)
  - Array .filter() with .includes() or .toLowerCase()
  - Derived state — don't store filtered list in useState, compute it
  - Conditional rendering for empty state

  HINTS (only read if stuck after 10 minutes):
  - const filtered = ITEMS.filter(item => item.toLowerCase().includes(query.toLowerCase()))
  - Compute filtered from query state — don't put it in its own useState
  - Render filtered.length === 0 ? <p>No results...</p> : <ul>...</ul>

  DO NOT look at the solution until you've written your own attempt.
*/

import { useState } from "react";

const ITEMS = [
  "Black Lotus",
  "Charizard Base Set",
  "Pikachu Illustrator",
  "Blue-Eyes White Dragon",
  "Dark Magician",
  "Mox Ruby",
  "Ancestral Recall",
  "Holographic Raichu",
  "Shadowless Blastoise",
  "Time Walk",
];

export const FilteredList = () => {
  const [input, setInput] = useState("");
  const filtered = ITEMS.filter((item) => item.toLowerCase().includes(input));

  return (
    <div>
      <input
        type="search"
        value={input}
        placeholder="Search Cards..."
        onChange={(e) => setInput(e.target.value)}
      ></input>
      <p>
        Showing {filtered.length} of {ITEMS.length} items
      </p>
      {filtered.length === 0 ? (
        <p>No result for "{input}"</p>
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
