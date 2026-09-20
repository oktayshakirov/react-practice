/*
  DAY 17 — Custom useProducts Hook
  =================================
  WHAT TO BUILD:
  Take everything you wrote on Day 16 — the state, the effect, the retry —
  and move it into a custom hook. The component gets boring. That's the win.

  REQUIREMENTS:
  - A hook: useProducts() that returns { products, loading, error, retry }
  - The hook holds ALL the useState and useEffect calls
  - ProductList becomes: const { products, loading, error, retry } = useProducts();
    followed by the four render branches — no effects, no state
  - Type the return value explicitly, don't just let it be inferred

  CONCEPTS THIS DRILLS:
  - A custom hook is just a function that starts with "use" and calls hooks
  - Returning an object (named fields) instead of a tuple
  - Typing a hook's return shape
  - Separating "how the data arrives" from "how the data looks"

  HINTS (only read if stuck after 10 minutes):
  - type UseProductsResult = {
      products: Product[];
      loading: boolean;
      error: string | null;
      retry: () => void;
    };
  - const useProducts = (): UseProductsResult => { ... return { ... }; };
  - The rules of hooks apply inside your hook too: top level only, no
    conditionals, no loops

  ASK YOURSELF AFTER:
  Could a second, unrelated component call useProducts() right now and work?
  Each call gets its OWN state — hooks share logic, never state. Be sure
  you understand that sentence before moving on.

  DO NOT look at the solution until you've written your own attempt.
*/

import { useEffect, useState } from 'react';

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

// Fake API — fails about a third of the time. Don't change this.
export const fetchProducts = (): Promise<Product[]> =>
  new Promise((resolve, reject) =>
    setTimeout(() => {
      if (Math.random() < 0.33) reject(new Error('Could not reach the listings service'));
      else resolve(PRODUCTS);
    }, 800)
  );

// Write your UseProductsResult type here:

// Write your useProducts hook here:

// Write your ProductList component here (it should be short):
export const ProductList = () => {

};
