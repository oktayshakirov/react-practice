/*
  DAY 12 — Extract a FilterBar Component
  =======================================
  WHAT TO BUILD:
  Same app as Day 11, but the controls move out into their own
  FilterBar component. Nothing the user sees should change.

  REQUIREMENTS:
  - A FilterBar component that renders the category buttons AND the sort select
  - FilterBar owns NO state — the parent still owns category and sortOrder
  - FilterBarProps: categories, activeCategory, onCategoryChange,
    sortOrder, onSortChange
  - The parent passes state down and setters up
  - Adding a search input later should require touching only FilterBar + parent

  CONCEPTS THIS DRILLS:
  - Lifting state up / the controlled-component pattern applied to a whole child
  - Typing function props: (value: string) => void
  - Presentational vs. container components
  - Why a child that owns state the parent needs is a dead end

  HINTS (only read if stuck after 10 minutes):
  - type FilterBarProps = {
      categories: string[];
      activeCategory: string;
      onCategoryChange: (category: string) => void;
      sortOrder: SortOrder;
      onSortChange: (order: SortOrder) => void;
    };
  - Pass the setter directly when the signature matches: onCategoryChange={setCategory}
  - A prop that is a function is just a prop. It is not special.

  ASK YOURSELF AFTER:
  Could you now render two FilterBars on the same page, driving two lists?
  If yes, you got the state ownership right.

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

// Write your FilterBarProps type here:

// Write your FilterBar component here:

// Write your ProductCard component here:

// Write your parent component here:
export const Marketplace = () => {

};
