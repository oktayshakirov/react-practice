/*
  DAY 15 — Fetch on Mount with useEffect
  =======================================
  WHAT TO BUILD:
  The marketplace list, but the listings arrive asynchronously instead of
  being a constant. Use the fake API below — no real network needed.

  REQUIREMENTS:
  - useState<Product[]>([]) for the listings
  - useEffect that calls fetchProducts() once, on mount
  - When the promise resolves, put the products into state
  - Render the same ProductCard grid as before
  - The dependency array must be [] — and you must be able to say why

  CONCEPTS THIS DRILLS:
  - useEffect(fn, []) = "run once after the first render"
  - Why you cannot make the effect callback itself async
  - Async state updates: the first render always shows the empty array
  - Typing state that starts empty but fills with objects later

  HINTS (only read if stuck after 10 minutes):
  - useEffect(() => { fetchProducts().then(setProducts); }, []);
  - Or declare an async function inside the effect and call it immediately
  - useEffect(async () => {}) is a bug — the effect must return void or a
    cleanup function, and an async function returns a Promise

  TRAP TO AVOID:
  Leaving off the dependency array entirely. The effect then runs after
  EVERY render, setState triggers a render, and you have an infinite loop.
  Try it once on purpose so you recognize the symptom later.

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

// Fake API — resolves after 800ms. Don't change this.
export const fetchProducts = (): Promise<Product[]> =>
  new Promise((resolve) => setTimeout(() => resolve(PRODUCTS), 800));

// Write your ProductCard component here:

// Write your ProductList component here:
export const ProductList = () => {

};
