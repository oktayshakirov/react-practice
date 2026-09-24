/*
  DAY 6 — Filtered List (From Memory)
  ====================================
  Same task as Day 4. No looking at your Day 4 file.

  REQUIREMENTS (same as before):
  - A list of at least 8 items (use the ITEMS array below)
  - A search input that filters the list as you type (case-insensitive)
  - Show a count: "Showing X of Y items"
  - If nothing matches, show "No results for [query]"

  TODAY'S GOAL:
  Write it faster and more confidently than Day 4.
  If you finish in under 10 minutes, you've got it.
  Note below what felt easier than Day 4 and what still felt slow.

  Notes after finishing:
  ----------------------
  What was easier: 
  What was still slow: 
  Time to complete: 
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
  const filtered = ITEMS.filter((item) =>
    item.toLowerCase().includes(input.toLowerCase()),
  );
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
