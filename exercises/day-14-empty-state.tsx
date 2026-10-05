/*
  DAY 14 — Empty / No-Results State
  ==================================
  WHAT TO BUILD:
  The finished marketplace page. Same tree as Day 13, plus a search
  input and proper handling of "nothing matched".

  REQUIREMENTS:
  - Add a search input to FilterBar (filters on name, case-insensitive)
  - Search + category + sort all apply together
  - When the filtered list is empty, ProductList renders an empty state:
      "No listings match your filters."
      plus a "Reset filters" button that clears search and sets category to All
  - The empty state must NOT render an empty grid or a "0 listings" heading
    with nothing under it — it replaces the grid
  - Distinguish it in your head from the other empty case: no products at all
    (seed PRODUCTS = [] once to check that path renders something sane)

  CONCEPTS THIS DRILLS:
  - Early return inside a component for the empty branch
  - A callback prop that resets several pieces of parent state at once
  - Chaining three filters without turning the parent into spaghetti
  - Thinking about the zero case as a real UI state, not an afterthought

  HINTS (only read if stuck after 10 minutes):
  - if (products.length === 0) return <p>No listings match your filters.</p>;
  - Early return beats wrapping the whole grid in a ternary
  - const reset = () => { setSearch(''); setCategory('All'); };
  - name.toLowerCase().includes(search.toLowerCase()) — normalize BOTH sides

  DAY 14 IS A CHECKPOINT:
  This is the mini marketplace listings page. When it works, reread your
  own code and note anything you had to look up. Those are your weak spots.

  Notes after finishing:
  ----------------------
  What I had to look up:
  What felt automatic:
  Time to complete:
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
  search: string;
  onSearchChange: (value: string) => void;
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

type ProductListProps = { products: Product[]; onResetFilters: () => void };

export const ProductList = ({ products, onResetFilters }: ProductListProps) => {
  if (products.length === 0) {
    return (
      <div>
        <p>No listings match your filters.</p>
        <button onClick={onResetFilters}>Reset filters</button>
      </div>
    );
  }
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
  search,
  onSearchChange,
}: FilterBarProps) => (
  <div
    style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}
  >
    <div style={{ display: "flex", gap: 8 }}>
      <input
        type="search"
        value={search}
        placeholder="Search listings..."
        onChange={(e) => onSearchChange(e.target.value)}
      ></input>
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
  const [search, setSearch] = useState("");
  const filtered = PRODUCTS.filter(
    (p) => category === "All" || p.category === category,
  ).filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

  const visible = sortProducts(filtered, sortOrder);
  const resetFilters = () => {
    setSearch("");
    setCategory("All");
  };
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
        search={search}
        onSearchChange={setSearch}
      />

      <ProductList products={visible} onResetFilters={resetFilters} />
    </section>
  );
};
