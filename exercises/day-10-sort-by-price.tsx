/*
  DAY 10 — Sort by Price
  =======================
  WHAT TO BUILD:
  The Day 9 list, plus a control that sorts the listings.

  REQUIREMENTS:
  - A <select> with three options: "Newest" (default), "Price: low to high",
    "Price: high to low"
  - The rendered list reorders when the option changes
  - The original PRODUCTS array must NOT be mutated
  - Show the active sort in the heading: "6 listings, sorted by price ascending"

  CONCEPTS THIS DRILLS:
  - A union type for state instead of a bare string
  - Derived state: sorting during render, not in a second useState
  - Why [...arr].sort() and not arr.sort()
  - Typed onChange on a <select>

  HINTS (only read if stuck after 10 minutes):
  - type SortOrder = 'newest' | 'price-asc' | 'price-desc';
  - useState<SortOrder>('newest')
  - e.target.value is typed as string — cast it: e.target.value as SortOrder
  - const sorted = [...PRODUCTS].sort((a, b) => a.price - b.price);
  - .sort() mutates the array it is called on. Copy first, always.

  TRAP TO AVOID:
  Do not store the sorted array in state. Sort it on every render from
  PRODUCTS + the current sort value. One source of truth.

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
];

// Write your SortOrder type here:

// Write your ProductCard component here:

// Write your ProductList component here:
export const ProductList = () => {

};
