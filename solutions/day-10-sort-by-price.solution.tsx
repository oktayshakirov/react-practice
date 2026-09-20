/*
  DAY 10 — SOLUTION: Sort by Price
  =================================
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
];

const SORT_LABELS: Record<SortOrder, string> = {
  newest: 'newest first',
  'price-asc': 'price ascending',
  'price-desc': 'price descending',
};

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

const sortProducts = (products: Product[], order: SortOrder): Product[] => {
  if (order === 'newest') return products;
  const copy = [...products];
  return order === 'price-asc'
    ? copy.sort((a, b) => a.price - b.price)
    : copy.sort((a, b) => b.price - a.price);
};

export const ProductList = () => {
  const [sortOrder, setSortOrder] = useState<SortOrder>('newest');

  const sorted = sortProducts(PRODUCTS, sortOrder);

  return (
    <section>
      <h2>
        {sorted.length} listings, sorted by {SORT_LABELS[sortOrder]}
      </h2>

      <label>
        Sort:{' '}
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as SortOrder)}
        >
          <option value="newest">Newest</option>
          <option value="price-asc">Price: low to high</option>
          <option value="price-desc">Price: high to low</option>
        </select>
      </label>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: 16 }}>
        {sorted.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </section>
  );
};

/*
  WHY THIS WORKS
  ==============

  1. SortOrder is a union, not `string`.
     useState<SortOrder> means a typo like 'price_asc' is a compile error,
     and the SORT_LABELS record below is exhaustive — add a fourth sort
     option and TypeScript immediately tells you the label map is missing
     a key. That's the whole value of unions over strings: the compiler
     maintains your switch statements for you.

  2. [...products].sort(), never products.sort().
     Array.prototype.sort mutates in place AND returns the same array.
     Calling it on PRODUCTS would permanently scramble your source data:
     switch to "newest" afterwards and you'd get the last sort order back,
     because "newest" just means "original array order" and you destroyed
     that. The spread makes a shallow copy first.

  3. The sorted list is derived during render, not stored in state.
     There is exactly one useState here: the sort order — the thing the
     user actually chose. Everything else falls out of it. If you'd added
     `const [sorted, setSorted] = useState(PRODUCTS)` you'd now have two
     values that can disagree, and you'd need an effect to keep them in
     sync. Derived-on-render can never go stale.

  4. `e.target.value as SortOrder` — the one honest cast.
     The DOM types every select value as string; TypeScript cannot know
     your <option value> list is exhaustive. The assertion is safe here
     because you wrote the options right above it. If the options came
     from data, you'd validate instead of asserting.

  5. sortProducts is a plain function outside the component.
     It takes data in and returns data out — no hooks, no props, testable
     on its own. The early return for 'newest' avoids a pointless copy.

  COMMON MISTAKES
  ===============
  - .sort((a, b) => a.price > b.price) — a comparator must return a
    NUMBER (negative / zero / positive), not a boolean. A boolean coerces
    to 0/1, you never get a negative, and the sort is subtly wrong.
  - Sorting strings by subtraction, or numbers with localeCompare.
    Numbers: a - b. Strings: a.localeCompare(b).
  - onChange={setSortOrder} directly on the select — the handler receives
    the event, not the value. You need the arrow to unwrap e.target.value.
  - useEffect to re-sort when sortOrder changes. No effect needed: a
    state change already re-renders, and the render re-sorts.
*/
