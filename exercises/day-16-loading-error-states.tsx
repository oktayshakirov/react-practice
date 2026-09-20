/*
  DAY 16 — Loading and Error States
  ==================================
  WHAT TO BUILD:
  Day 15, done properly. Three states, all handled, none of them
  accidentally overlapping.

  REQUIREMENTS:
  - loading: true while the request is in flight, false when it settles
  - error: string | null for the failure message
  - Render exactly one of: spinner/"Loading listings…", the error with a
    "Try again" button, the grid, or the empty state
  - "Try again" re-runs the fetch
  - The fake API below fails ~50% of the time — reload until you've seen both

  CONCEPTS THIS DRILLS:
  - .then/.catch/.finally, or try/catch/finally inside an async function
  - Resetting error + loading at the START of each attempt, not just the end
  - Triggering a re-fetch by changing a dependency (a retry counter)
  - Why four booleans is worse than one status union

  HINTS (only read if stuck after 10 minutes):
  - const [attempt, setAttempt] = useState(0);
    useEffect(() => { ... }, [attempt]);
    retry = () => setAttempt((a) => a + 1);
  - finally runs on both success and failure — put setLoading(false) there
  - Order your returns: loading first, then error, then empty, then data

  STRETCH (only if you finish early):
  Replace the two booleans with one union:
    type State =
      | { status: 'loading' }
      | { status: 'error'; message: string }
      | { status: 'success'; products: Product[] };
  Notice how TypeScript now stops you from reading products while loading.

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

// Fake API — fails about half the time. Don't change this.
export const fetchProducts = (): Promise<Product[]> =>
  new Promise((resolve, reject) =>
    setTimeout(() => {
      if (Math.random() < 0.5) reject(new Error('Could not reach the listings service'));
      else resolve(PRODUCTS);
    }, 800)
  );

// Write your ProductCard component here:

// Write your ProductList component here:
export const ProductList = () => {

};
