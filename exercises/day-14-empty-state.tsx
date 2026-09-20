/*
  DAY 14 — Empty / No-Results State
  ==================================
  WHAT TO BUILD:
  The finished marketplace page. Same tree as Day 13, plus a search
  input and proper handling of "nothing matched".

  REQUIREMENTS:
  - Add a search input to FilterBar (filters on name, case-insensitive)
  - Search + category + sort all apply together
  - When the filtered list is empty, ProductList renders an empty state:
      "No listings match your filters."
      plus a "Reset filters" button that clears search and sets category to All
  - The empty state must NOT render an empty grid or a "0 listings" heading
    with nothing under it — it replaces the grid
  - Distinguish it in your head from the other empty case: no products at all
    (seed PRODUCTS = [] once to check that path renders something sane)

  CONCEPTS THIS DRILLS:
  - Early return inside a component for the empty branch
  - A callback prop that resets several pieces of parent state at once
  - Chaining three filters without turning the parent into spaghetti
  - Thinking about the zero case as a real UI state, not an afterthought

  HINTS (only read if stuck after 10 minutes):
  - if (products.length === 0) return <p>No listings match your filters.</p>;
  - Early return beats wrapping the whole grid in a ternary
  - const reset = () => { setSearch(''); setCategory('All'); };
  - name.toLowerCase().includes(search.toLowerCase()) — normalize BOTH sides

  DAY 14 IS A CHECKPOINT:
  This is the mini marketplace listings page. When it works, reread your
  own code and note anything you had to look up. Those are your weak spots.

  Notes after finishing:
  ----------------------
  What I had to look up:
  What felt automatic:
  Time to complete:
*/

import { useState } from 'react';

export type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  seller: string;
  inStock: boolean;
};

export type SortOrder = 'newest' | 'price-asc' | 'price-desc';

const PRODUCTS: Product[] = [
  { id: '1', name: 'Black Lotus (Alpha)', price: 12000, category: 'Magic', seller: 'berlin_cards', inStock: true },
  { id: '2', name: 'Charizard Base Set', price: 350, category: 'Pokemon', seller: 'kartenhaus', inStock: true },
  { id: '3', name: 'Dark Magician', price: 45, category: 'Yu-Gi-Oh', seller: 'tcg_mitte', inStock: false },
  { id: '4', name: 'Pikachu Illustrator', price: 9800, category: 'Pokemon', seller: 'berlin_cards', inStock: false },
  { id: '5', name: 'Mox Ruby', price: 3200, category: 'Magic', seller: 'vintage_de', inStock: true },
  { id: '6', name: 'Blue-Eyes White Dragon', price: 120, category: 'Yu-Gi-Oh', seller: 'kartenhaus', inStock: true },
  { id: '7', name: 'Time Walk', price: 4100, category: 'Magic', seller: 'vintage_de', inStock: true },
  { id: '8', name: 'Shadowless Blastoise', price: 890, category: 'Pokemon', seller: 'tcg_mitte', inStock: true },
];

// Write your ProductCard component here:

// Write your ProductList component here (with the empty state):

// Write your FilterBar component here (with the search input):

// Write your Marketplace parent here:
export const Marketplace = () => {

};
