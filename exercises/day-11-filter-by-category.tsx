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
  {
    id: "7",
    name: "Time Walk",
    price: 4100,
    category: "Magic",
    seller: "vintage_de",
    inStock: true,
  },
  {
    id: "8",
    name: "Shadowless Blastoise",
    price: 890,
    category: "Pokemon",
    seller: "tcg_mitte",
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
  const [category, setCategory] = useState("All");
  const categories = ["All", ...new Set(PRODUCTS.map((p) => p.category))];
  const filtered =
    category === "All"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === category);
  const sorted =
    sortOrder === "newest"
      ? filtered
      : [...filtered].sort((a, b) =>
          sortOrder === "price-asc" ? a.price - b.price : b.price - a.price,
        );
  return (
    <section>
      <h2>
        {sorted.length} of {PRODUCTS.length} listings
      </h2>
      <div style={{ display: "flex", gap: 5, marginBottom: 10 }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            style={{ fontWeight: cat === category ? 700 : 400 }}
          >
            {cat}
          </button>
        ))}
      </div>
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
