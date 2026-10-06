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

import { useEffect, useState } from "react";

export type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  seller: string;
  inStock: boolean;
};

const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Black Lotus (Alpha)",
    price: 12000,
    category: "Magic",
    seller: "berlin_cards",
    inStock: true,
  },
  {
    id: "2",
    name: "Charizard Base Set",
    price: 350,
    category: "Pokemon",
    seller: "kartenhaus",
    inStock: true,
  },
  {
    id: "3",
    name: "Dark Magician",
    price: 45,
    category: "Yu-Gi-Oh",
    seller: "tcg_mitte",
    inStock: false,
  },
  {
    id: "4",
    name: "Pikachu Illustrator",
    price: 9800,
    category: "Pokemon",
    seller: "berlin_cards",
    inStock: false,
  },
  {
    id: "5",
    name: "Mox Ruby",
    price: 3200,
    category: "Magic",
    seller: "vintage_de",
    inStock: true,
  },
  {
    id: "6",
    name: "Blue-Eyes White Dragon",
    price: 120,
    category: "Yu-Gi-Oh",
    seller: "kartenhaus",
    inStock: true,
  },
];

export const fetchProducts = (): Promise<Product[]> =>
  new Promise((resolve) => setTimeout(() => resolve(PRODUCTS), 800));

const ProductCard = ({ name, price, category, seller, inStock }: Product) => (
  <article
    style={{
      border: "1px solid #ddd",
      borderRadius: 8,
      padding: 16,
      width: 220,
      opacity: inStock ? 1 : 0.5,
    }}
  >
    <h3 style={{ margin: "0 0 8px" }}>{name}</h3>
    <span
      style={{
        fontSize: 12,
        background: "#eee",
        borderRadius: 4,
        padding: "2px 6px",
      }}
    >
      {category}
    </span>
    <p style={{ fontWeight: 600, margin: "8px 0 4px" }}>
      {price.toLocaleString("de-DE", { style: "currency", currency: "EUR" })}
    </p>
    <p style={{ fontSize: 13, color: "#666", margin: 0 }}>{seller}</p>
    <p style={{ color: inStock ? "green" : "red", margin: "8px 0 0" }}>
      {inStock ? "In stock" : "Out of stock"}
    </p>
  </article>
);

export const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);
  if (products.length === 0) {
    return <p>Loading...</p>;
  }
  return (
    <section>
      <h2>{products.length} listings</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </section>
  );
};
