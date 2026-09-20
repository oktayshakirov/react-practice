/*
  DAY 11 — SOLUTION: Filter by Category
  ======================================
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
  const [category, setCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState<SortOrder>('newest');

  const filtered =
    category === 'All' ? PRODUCTS : PRODUCTS.filter((p) => p.category === category);
  const visible = sortProducts(filtered, sortOrder);

  return (
    <section>
      <h2>
        {visible.length} of {PRODUCTS.length} listings
      </h2>

      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            style={{
              fontWeight: c === category ? 700 : 400,
              border: c === category ? '2px solid #333' : '1px solid #ccc',
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
        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value as SortOrder)}>
          <option value="newest">Newest</option>
          <option value="price-asc">Price: low to high</option>
          <option value="price-desc">Price: high to low</option>
        </select>
      </label>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: 16 }}>
        {visible.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </section>
  );
};

/*
  WHY THIS WORKS
  ==============

  1. Filter first, then sort.
     Order matters for cost: filtering 8 down to 3 and sorting 3 beats
     sorting 8 and filtering 3. At this size it's irrelevant, but it's the
     right habit and it reads in the same order the user thinks: "show me
     Magic cards, cheapest first."

  2. CATEGORIES is derived from the data with a Set.
     `new Set(array)` drops duplicates; spreading it back gives an array.
     Hardcoding ['All','Magic','Pokemon','Yu-Gi-Oh'] works until someone
     adds a Digimon listing and the filter silently can't reach it. It
     lives at module scope because PRODUCTS is a constant — the moment
     products come from an API (Day 15+), this moves inside the component.

  3. Two useState values, one derived list.
     category and sortOrder are genuinely independent user choices, so
     they're separate state. `visible` is a pure function of
     (PRODUCTS, category, sortOrder) and is recomputed every render.
     Two states that each mean one thing: fine. Two states that must
     agree with each other: a bug waiting to happen.

  4. 'All' as a sentinel instead of a null category.
     `category: string` with 'All' meaning "no filter" keeps the button
     list and the state the same type — the map over CATEGORIES just
     works. The alternative (`string | null`) is also valid but forces a
     null check at every use site.

  5. The active button is styled from state, not from a class you toggle
     by hand. `c === category` is computed during render, so it can never
     get out of sync with what's actually filtered.

  COMMON MISTAKES
  ===============
  - onClick={setCategory(c)} — this CALLS setCategory during render,
    every render, forever. It must be onClick={() => setCategory(c)}.
    The handler is a function you hand to React, not a call you make.
  - Storing `filtered` in state and filtering inside an onClick. It works
    until sortOrder changes and the filter doesn't re-run.
  - `p.category === category || category === 'All'` inside the filter —
    correct, but it runs the check per item. The ternary above skips the
    whole filter pass. Either is fine; know that you chose.
  - Using the index as the button key. Category names are already unique
    strings — use them.
*/
