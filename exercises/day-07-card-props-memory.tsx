/*
  DAY 7 — Card with Props (From Memory + Extra TypeScript)
  =========================================================
  Same task as Day 5, from memory, with one addition.

  REQUIREMENTS (same as Day 5 plus extras):
  - CardProps type with: name, price, category, rare, onClick
  - Card component using those props
  - onClick: clicking a card logs "Selected: [card name]" to console
  - CardList renders CARDS with .map() and proper keys
  - NEW: Add a second type for the CARDS array items — CardData type
  - NEW: The CARDS array should be typed as CardData[]

  TODAY'S GOAL:
  Write the TypeScript types first, then the components.
  You should need minimal lookups.

  Notes after finishing:
  ----------------------
  What was easier than Day 5: 
  What TypeScript parts tripped you up: 
  Time to complete: 
*/

const CARDS = [
  { id: '1', name: 'Black Lotus', price: 12000, category: 'Magic', rare: true },
  { id: '2', name: 'Charizard', price: 350, category: 'Pokémon', rare: true },
  { id: '3', name: 'Dark Magician', price: 45, category: 'Yu-Gi-Oh', rare: false },
  { id: '4', name: 'Pikachu', price: 8.5, category: 'Pokémon', rare: false },
  { id: '5', name: 'Mox Ruby', price: 3200, category: 'Magic', rare: true },
];

// Write your types here:

// Write your Card component here:

// Write your CardList here:
export const CardList = () => {

};
