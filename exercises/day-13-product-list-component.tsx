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

type FilterBarProps = {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  sortOrder: SortOrder;
  onSortChange: (order: SortOrder) => void;
};
const CATEGORIES = ["All", ...new Set(PRODUCTS.map((p) => p.category))];

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

const sortProducts = (products: Product[], order: SortOrder): Product[] => {
  if (order === "newest") return products;
  const copy = [...products];
  return order === "price-asc"
    ? copy.sort((a, b) => a.price - b.price)
    : copy.sort((a, b) => b.price - a.price);
};

type ProductListProps = { products: Product[] };

export const ProductList = ({ products }: ProductListProps) => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
};

const FilterBar = ({
  categories,
  activeCategory,
  onCategoryChange,
  sortOrder,
  onSortChange,
}: FilterBarProps) => (
  <div
    style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}
  >
    <div style={{ display: "flex", gap: 8 }}>
      {categories.map((c) => (
        <button
          key={c}
          onClick={() => onCategoryChange(c)}
          style={{
            fontWeight: c === activeCategory ? 700 : 400,
            border: c === activeCategory ? "2px solid #333" : "1px solid #ccc",
            borderRadius: 4,
            padding: "4px 10px",
            cursor: "pointer",
          }}
        >
          {c}
        </button>
      ))}
    </div>

    <label>
      Sort:{" "}
      <select
        value={sortOrder}
        onChange={(e) => onSortChange(e.target.value as SortOrder)}
      >
        <option value="newest">Newest</option>
        <option value="price-asc">Price: low to high</option>
        <option value="price-desc">Price: high to low</option>
      </select>
    </label>
  </div>
);

export const Marketplace = () => {
  const [category, setCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");

  const filtered =
    category === "All"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === category);
  const visible = sortProducts(filtered, sortOrder);

  return (
    <section>
      <h2>
        {visible.length} of {PRODUCTS.length} listings
      </h2>

      <FilterBar
        categories={CATEGORIES}
        activeCategory={category}
        onCategoryChange={setCategory}
        sortOrder={sortOrder}
        onSortChange={setSortOrder}
      />

      <ProductList products={visible} />
    </section>
  );
};
