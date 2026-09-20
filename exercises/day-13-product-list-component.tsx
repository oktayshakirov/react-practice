/*
  DAY 13 — Extract a ProductList Component
  =========================================
  WHAT TO BUILD:
  Finish the split you started on Day 12. After today the parent should be
  small enough to read in one screen.

  REQUIREMENTS:
  - Three components in a tree:
      Marketplace (owns state, derives the visible list)
        FilterBar (controls, no state)
        ProductList (receives Product[], renders ProductCards)
          ProductCard (one listing)
  - ProductList takes exactly one prop: products: Product[]
  - ProductList does NOT filter or sort — it only renders what it is given
  - The Marketplace component should be under ~30 lines of JSX

  CONCEPTS THIS DRILLS:
  - One component, one job
  - Passing an array of typed objects as a prop
  - Keeping data transformation in the owner and rendering in the leaf
  - Reading a component tree top-down

  HINTS (only read if stuck after 10 minutes):
  - type ProductListProps = { products: Product[] };
  - <ProductList products={visibleProducts} />
  - If ProductList needs to know about sortOrder, the split is wrong

  ASK YOURSELF AFTER:
  If the data came from an API instead of a constant, how many of these
  components would need to change? (Answer should be: one.)

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

// Write your ProductCard component here:

// Write your ProductList component here:

// Write your FilterBar component here:

// Write your Marketplace parent here:
export const Marketplace = () => {

};
