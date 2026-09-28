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

import { useState } from "react";

export type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  seller: string;
  inStock: boolean;
};

export type SortOrder = "newest" | "price-asc" | "price-desc";

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

const SORT_LABELS: Record<SortOrder, string> = {
  newest: "newest first",
  "price-asc": "price ascending",
  "price-desc": "price descending",
};

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
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");
  const sorted =
    sortOrder === "newest"
      ? PRODUCTS
      : [...PRODUCTS].sort((a, b) =>
          sortOrder === "price-asc" ? a.price - b.price : b.price - a.price,
        );
  return (
    <section>
      <h2>
        {PRODUCTS.length} listings, sorted by {SORT_LABELS[sortOrder]}
      </h2>
      <label>
        {" "}
        Sort:{" "}
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as SortOrder)}
        >
          <option value="newest">Newest</option>
          <option value="price-asc">Price: low to high</option>
          <option value="price-desc">Price: high to low</option>
        </select>
      </label>
      <div
        style={{ display: "flex", flexWrap: "wrap", gap: 16, marginTop: 16 }}
      >
        {sorted.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </section>
  );
};
