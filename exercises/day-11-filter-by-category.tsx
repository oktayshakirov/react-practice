/*
  DAY 11 — Filter by Category
  ============================
  WHAT TO BUILD:
  The sortable list from Day 10, plus category filtering — filter and
  sort working together at the same time.

  REQUIREMENTS:
  - Category buttons: "All", "Magic", "Pokemon", "Yu-Gi-Oh"
  - The active category button looks visually different (bold or a border)
  - Keep the sort <select> from Day 10 — both must apply together
  - Heading shows the filtered count: "2 of 8 listings"
  - Derive the category buttons from the data, not a hardcoded list

  CONCEPTS THIS DRILLS:
  - Chaining .filter() then .sort() in the right order
  - Two independent pieces of state feeding one derived list
  - Deriving unique values with new Set()
  - Conditional style from state

  HINTS (only read if stuck after 10 minutes):
  - const categories = ['All', ...new Set(PRODUCTS.map((p) => p.category))];
  - Filter first, then sort the smaller result
  - const visible = PRODUCTS.filter(...); then [...visible].sort(...)
  - 'All' means "skip the filter" — handle it as a special case in the filter

  TRAP TO AVOID:
  Don't write two useState values that can disagree with each other.
  The list is derived from (PRODUCTS, category, sortOrder) on every render.

  DO NOT look at the solution until you've written your own attempt.
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

// Write your ProductList component here:
export const ProductList = () => {

};
