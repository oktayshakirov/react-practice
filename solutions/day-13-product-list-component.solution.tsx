/*
  DAY 13 — SOLUTION: Extract a ProductList Component
  ===================================================
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

/* ---------- list ---------- */

type ProductListProps = { products: Product[] };

const ProductList = ({ products }: ProductListProps) => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
    {products.map((product) => (
      <ProductCard key={product.id} {...product} />
    ))}
  </div>
);

/* ---------- controls ---------- */

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

/* ---------- owner ---------- */

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
      <ProductList products={visible} />
    </section>
  );
};

/*
  WHY THIS WORKS
  ==============

  1. ProductList takes one prop and asks no questions.
     It doesn't know about categories, sort order, or where the array came
     from. It renders whatever array it's handed. That single-prop
     signature is the signal that the split is correct — the moment you
     feel tempted to pass sortOrder into it "so it can sort", the
     responsibility has leaked.

  2. The Marketplace JSX is four lines.
     Read it top to bottom and you can describe the whole page. All the
     complexity moved into named pieces: sortProducts does the math,
     FilterBar does the controls, ProductList does the grid. Nothing was
     deleted, it was just given names. That's the entire skill being
     drilled here.

  3. The data transformation stays with the state that drives it.
     filtered/visible are computed in the component that owns `category`
     and `sortOrder`. State and the things derived from it belong together;
     pushing the derivation down would require pushing the state down too.

  4. Answer to "if the data came from an API, what changes?"
     Only Marketplace. PRODUCTS becomes state filled by an effect (Day 15),
     CATEGORIES moves inside the component because it now depends on
     fetched data, and ProductList/ProductCard/FilterBar don't change at
     all. That's the payoff for the split, and it's exactly what Days
     15-17 will make you do.

  5. The comment dividers.
     Not required, but in a take-home where everything is in one file,
     grouping leaf / list / controls / owner costs three lines and makes a
     reviewer's first 30 seconds much better. Real projects split these
     into separate files instead.

  COMMON MISTAKES
  ===============
  - Defining ProductCard inside ProductList's body. New component identity
    every render; React unmounts and remounts the whole subtree.
  - Passing products AND the raw filters into ProductList and filtering in
    both places. Filter once, in the owner.
  - `products: Product[] | undefined` because "maybe there's no data yet".
    Today there always is. Don't add optionality you don't have; Day 16
    handles the real absent-data case with an explicit loading state.
*/
