/*
  DAY 12 — SOLUTION: Extract a FilterBar Component
  =================================================
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

type FilterBarProps = {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  sortOrder: SortOrder;
  onSortChange: (order: SortOrder) => void;
};

const FilterBar = ({
  categories,
  activeCategory,
  onCategoryChange,
  sortOrder,
  onSortChange,
}: FilterBarProps) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
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

export const Marketplace = () => {
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

      <FilterBar
        categories={CATEGORIES}
        activeCategory={category}
        onCategoryChange={setCategory}
        sortOrder={sortOrder}
        onSortChange={setSortOrder}
      />

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
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

  1. FilterBar owns nothing.
     It has no useState. It receives the current values and two callbacks,
     renders, and reports clicks upward. That's the controlled-component
     pattern — the same relationship a controlled <input> has with your
     component, scaled up to a whole subtree.

     The test: could you render two FilterBars driving two independent
     lists on one page? Yes, because each parent holds its own state. If
     FilterBar owned the state, the parent couldn't read it, couldn't
     filter with it, and you'd be reaching for Context or a ref to claw
     it back out. That's the dead end this exercise exists to prevent.

  2. onCategoryChange={setCategory} passes the setter directly.
     A React setter has the signature (value: string) => void, which
     matches the prop type exactly, so no wrapper arrow is needed. When
     the parent needs to do something extra on change, you'd write
     onCategoryChange={(c) => { setCategory(c); track(c); }} instead.
     Typing the prop as a function — not as `setCategory` — keeps the
     child ignorant of whether it's talking to useState or to anything else.

  3. `categories` comes in as a prop, not a module import.
     FilterBar never mentions PRODUCTS. It would work just as well on a
     completely different dataset. A component that only touches its own
     props is a component you can move, reuse, and test.

  4. The naming convention: value + onValueChange.
     activeCategory / onCategoryChange, sortOrder / onSortChange. Every
     React codebase you join uses some version of this pairing. Use it
     and your props read as self-documenting.

  5. Nothing the user sees changed today.
     That's what a refactor is. If the UI shifted, you accidentally
     rewrote behaviour while moving code — do them as separate steps.

  COMMON MISTAKES
  ===============
  - Giving FilterBar its own useState "just for the buttons" and calling
    the parent's callback too. Now the same value lives in two places and
    a parent-driven reset (Day 14!) won't update the buttons.
  - Typing the callback as `(e: React.ChangeEvent<HTMLSelectElement>) => void`
    — that leaks the DOM detail upward. The parent shouldn't care that the
    category came from a button and the sort from a select.
  - Passing the whole state setter tuple down as one prop. Two named
    props are clearer than one opaque one.
*/
