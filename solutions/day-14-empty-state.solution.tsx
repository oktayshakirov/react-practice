/*
  DAY 14 — SOLUTION: Empty / No-Results State
  ============================================
  The finished marketplace listings page.
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

const CATEGORIES = ['All', ...new Set(PRODUCTS.map((p) => p.category))];

/* ---------- leaf ---------- */

const ProductCard = ({ name, price, category, seller, inStock }: Product) => (
  <article style={{ border: '1px solid #ddd', borderRadius: 8, padding: 16, width: 220, opacity: inStock ? 1 : 0.5 }}>
    <h3 style={{ margin: '0 0 8px' }}>{name}</h3>
    <span style={{ fontSize: 12, background: '#eee', borderRadius: 4, padding: '2px 6px' }}>{category}</span>
    <p style={{ fontWeight: 600, margin: '8px 0 4px' }}>
      {price.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
    </p>
    <p style={{ fontSize: 13, color: '#666', margin: 0 }}>{seller}</p>
    <p style={{ color: inStock ? 'green' : 'red', margin: '8px 0 0' }}>
      {inStock ? 'In stock' : 'Out of stock'}
    </p>
  </article>
);

/* ---------- list + empty state ---------- */

type ProductListProps = {
  products: Product[];
  onResetFilters: () => void;
};

const ProductList = ({ products, onResetFilters }: ProductListProps) => {
  if (products.length === 0) {
    return (
      <div style={{ padding: 32, textAlign: 'center', color: '#666' }}>
        <p>No listings match your filters.</p>
        <button onClick={onResetFilters} style={{ padding: '6px 14px', cursor: 'pointer' }}>
          Reset filters
        </button>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
};

/* ---------- controls ---------- */

type FilterBarProps = {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  sortOrder: SortOrder;
  onSortChange: (order: SortOrder) => void;
  search: string;
  onSearchChange: (value: string) => void;
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
  <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16, flexWrap: 'wrap' }}>
    <input
      type="search"
      value={search}
      placeholder="Search listings…"
      onChange={(e) => onSearchChange(e.target.value)}
      style={{ padding: '6px 10px' }}
    />

    <div style={{ display: 'flex', gap: 8 }}>
      {categories.map((c) => (
        <button
          key={c}
          onClick={() => onCategoryChange(c)}
          style={{
            fontWeight: c === activeCategory ? 700 : 400,
            border: c === activeCategory ? '2px solid #333' : '1px solid #ccc',
            borderRadius: 4,
            padding: '4px 10px',
            cursor: 'pointer',
          }}
        >
          {c}
        </button>
      ))}
    </div>

    <label>
      Sort:{' '}
      <select value={sortOrder} onChange={(e) => onSortChange(e.target.value as SortOrder)}>
        <option value="newest">Newest</option>
        <option value="price-asc">Price: low to high</option>
        <option value="price-desc">Price: high to low</option>
      </select>
    </label>
  </div>
);

/* ---------- owner ---------- */

const sortProducts = (products: Product[], order: SortOrder): Product[] => {
  if (order === 'newest') return products;
  const copy = [...products];
  return order === 'price-asc'
    ? copy.sort((a, b) => a.price - b.price)
    : copy.sort((a, b) => b.price - a.price);
};

export const Marketplace = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState<SortOrder>('newest');

  const query = search.trim().toLowerCase();

  const filtered = PRODUCTS.filter((p) => {
    const matchesCategory = category === 'All' || p.category === category;
    const matchesSearch = p.name.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  const visible = sortProducts(filtered, sortOrder);

  const resetFilters = () => {
    setSearch('');
    setCategory('All');
  };

  if (PRODUCTS.length === 0) {
    return <p style={{ padding: 32 }}>There are no listings yet. Check back soon.</p>;
  }

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

/*
  WHY THIS WORKS
  ==============

  1. Two different empty states, in two different places.
     "No listings match your filters" (with a reset button) belongs to
     ProductList — it's about the array it was handed. "There are no
     listings yet" belongs to Marketplace — it's about the source data,
     and showing a search box and filter buttons for an empty catalogue
     would be absurd. Conflating these two is the single most common
     empty-state bug in real apps: the user searches for something that
     doesn't exist and gets told the site is broken.

  2. Early return, not a ternary around the grid.
     `if (products.length === 0) return <Empty />;` keeps the happy path
     at the bottom, unindented. A ternary wrapping 15 lines of JSX is
     where readability goes to die. Early returns also scale: Day 16 adds
     loading and error branches above this one and the shape still holds.

  3. One filter pass with two predicates, not two chained .filter() calls.
     Chaining is also correct and arguably reads better; a single pass
     with named booleans (matchesCategory / matchesSearch) makes the AND
     relationship explicit and is easier to extend to a third filter.
     Either is defensible — the named booleans are what I'd write in a
     take-home because the reviewer can see the logic without parsing.

  4. `search.trim().toLowerCase()` is computed ONCE, above the filter.
     Inside the predicate it would run per item. Normalizing both sides
     is the real lesson though: "charizard" must match "Charizard Base
     Set". Lowercasing only one side is a bug that looks like it works
     because you test with the exact casing you typed.
     (For a German marketplace, note that toLowerCase() doesn't handle
     ä/ö/ü vs ae/oe/ue. Real search normalizes further — worth mentioning
     out loud in an interview, not worth building today.)

  5. Empty search string matches everything for free.
     ''.includes() is true for any string, so no special case is needed
     for "search is empty". Sentinel values that happen to behave
     correctly are worth noticing — 'All' on Day 11 needed a special case,
     this one doesn't.

  6. resetFilters clears search and category but NOT sortOrder.
     Sort isn't a filter — it never hides anything, so resetting it can't
     help the user find their listing, and silently changing it would be
     surprising. Small product-thinking calls like this are what separate
     a passing take-home from a good one.

  7. onResetFilters is a prop, not a global.
     ProductList still owns nothing. It's handed a callback and calls it.
     The parent decides what "reset" means — which is why it can clear
     two pieces of state in one function without the child knowing.

  COMMON MISTAKES
  ===============
  - Rendering the empty message AND an empty grid. Check your branches
    actually exclude each other.
  - Showing "0 of 8 listings" above an empty-state that says nothing
    matched. Pick one voice; a count of 0 plus a helpful message is fine,
    a count of 0 plus a blank area is not.
  - Putting the reset button in FilterBar and calling it from there —
    works, but then FilterBar needs a reset callback AND all the change
    callbacks. The button belongs where the user is looking when they
    hit the dead end.
  - Debouncing the search input. Not needed for 8 local items, and it
    adds a timer, a cleanup, and a stale-closure risk. Add complexity
    when you have a reason, and be ready to say what the reason was.

  YOU'VE NOW BUILT THE MARKETPLACE PAGE.
  Everything from here (Days 15-21) is about where the data comes from
  and how the page is wired, not about the list itself.
*/
