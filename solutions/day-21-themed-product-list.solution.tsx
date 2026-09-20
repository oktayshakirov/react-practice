/*
  DAY 21 — SOLUTION: Themed Product List
  =======================================
  Everything from Days 8-20 in one tree. This is roughly what a good
  take-home submission looks like, minus the file splitting.
*/

import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

/* ============ types + data ============ */

export type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  seller: string;
  inStock: boolean;
};

export type SortOrder = 'newest' | 'price-asc' | 'price-desc';
export type Theme = 'light' | 'dark';

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

export const fetchProducts = (): Promise<Product[]> =>
  new Promise((resolve) => setTimeout(() => resolve(PRODUCTS), 700));

/* ============ theme (Day 19) ============ */

type ThemeContextValue = { theme: Theme; toggleTheme: () => void };

const ThemeContext = createContext<ThemeContextValue | null>(null);

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('light');
  const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
  );
};

const useTheme = (): ThemeContextValue => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside a ThemeProvider');
  return ctx;
};

const COLORS = {
  light: { bg: '#ffffff', text: '#1a1a1a', card: '#ffffff', border: '#dddddd', muted: '#666666', chip: '#eeeeee' },
  dark: { bg: '#161616', text: '#f5f5f5', card: '#232323', border: '#3a3a3a', muted: '#a0a0a0', chip: '#333333' },
} as const;

/* ============ data (Day 20) ============ */

type UseFetchResult<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
  retry: () => void;
};

const useFetch = <T,>(fetcher: () => Promise<T>): UseFetchResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetcher()
      .then((result) => {
        if (!cancelled) setData(result);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : 'Something went wrong');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [fetcher, attempt]);

  const retry = () => setAttempt((a) => a + 1);

  return { data, loading, error, retry };
};

/* ============ leaf ============ */

const ProductCard = ({ name, price, category, seller, inStock }: Product) => {
  const { theme } = useTheme();
  const c = COLORS[theme];

  return (
    <article
      style={{
        border: `1px solid ${c.border}`,
        background: c.card,
        color: c.text,
        borderRadius: 8,
        padding: 16,
        width: 220,
        opacity: inStock ? 1 : 0.5,
      }}
    >
      <h3 style={{ margin: '0 0 8px' }}>{name}</h3>
      <span style={{ fontSize: 12, background: c.chip, borderRadius: 4, padding: '2px 6px' }}>
        {category}
      </span>
      <p style={{ fontWeight: 600, margin: '8px 0 4px' }}>
        {price.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
      </p>
      <p style={{ fontSize: 13, color: c.muted, margin: 0 }}>{seller}</p>
      <p style={{ color: inStock ? '#3ba55d' : '#e05252', margin: '8px 0 0' }}>
        {inStock ? 'In stock' : 'Out of stock'}
      </p>
    </article>
  );
};

/* ============ list ============ */

type ProductListProps = {
  products: Product[];
  onResetFilters: () => void;
};

const ProductList = ({ products, onResetFilters }: ProductListProps) => {
  const { theme } = useTheme();

  if (products.length === 0) {
    return (
      <div style={{ padding: 32, textAlign: 'center', color: COLORS[theme].muted }}>
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

/* ============ controls ============ */

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
}: FilterBarProps) => {
  const { theme } = useTheme();
  const c = COLORS[theme];

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16, flexWrap: 'wrap' }}>
      <input
        type="search"
        value={search}
        placeholder="Search listings…"
        onChange={(e) => onSearchChange(e.target.value)}
        style={{ padding: '6px 10px', background: c.card, color: c.text, border: `1px solid ${c.border}` }}
      />

      <div style={{ display: 'flex', gap: 8 }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            style={{
              fontWeight: cat === activeCategory ? 700 : 400,
              border: `1px solid ${cat === activeCategory ? c.text : c.border}`,
              background: c.card,
              color: c.text,
              borderRadius: 4,
              padding: '4px 10px',
              cursor: 'pointer',
            }}
          >
            {cat}
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
};

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <button onClick={toggleTheme} style={{ cursor: 'pointer' }}>
      {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
    </button>
  );
};

const Header = () => (
  <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
    <strong>Card Marketplace</strong>
    <ThemeToggle />
  </header>
);

/* ============ owner ============ */

const sortProducts = (products: Product[], order: SortOrder): Product[] => {
  if (order === 'newest') return products;
  const copy = [...products];
  return order === 'price-asc'
    ? copy.sort((a, b) => a.price - b.price)
    : copy.sort((a, b) => b.price - a.price);
};

const MarketplacePage = () => {
  const { theme } = useTheme();
  const { data, loading, error, retry } = useFetch(fetchProducts);

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState<SortOrder>('newest');

  const products = data ?? [];
  const categories = ['All', ...new Set(products.map((p) => p.category))];

  const query = search.trim().toLowerCase();
  const filtered = products.filter((p) => {
    const matchesCategory = category === 'All' || p.category === category;
    const matchesSearch = p.name.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });
  const visible = sortProducts(filtered, sortOrder);

  const resetFilters = () => {
    setSearch('');
    setCategory('All');
  };

  const c = COLORS[theme];

  return (
    <div style={{ minHeight: '100vh', background: c.bg, color: c.text, padding: 24 }}>
      <Header />

      {loading ? (
        <p>Loading listings…</p>
      ) : error ? (
        <div>
          <p style={{ color: '#e05252' }}>{error}</p>
          <button onClick={retry}>Try again</button>
        </div>
      ) : products.length === 0 ? (
        <p>There are no listings yet. Check back soon.</p>
      ) : (
        <>
          <h2>
            {visible.length} of {products.length} listings
          </h2>
          <FilterBar
            categories={categories}
            activeCategory={category}
            onCategoryChange={setCategory}
            sortOrder={sortOrder}
            onSortChange={setSortOrder}
            search={search}
            onSearchChange={setSearch}
          />
          <ProductList products={visible} onResetFilters={resetFilters} />
        </>
      )}
    </div>
  );
};

export const App = () => (
  <ThemeProvider>
    <MarketplacePage />
  </ThemeProvider>
);

/*
  WHY THIS WORKS
  ==============

  1. Three kinds of state, each in the right place.
     - Server state (products): in useFetch, because it isn't owned by
       any component — it's a copy of something external.
     - UI state (search, category, sortOrder): in MarketplacePage,
       the lowest component that needs all three.
     - Global state (theme): in Context, because it's read at every depth
       and drilling it would touch every component in the tree.
     Getting this allocation right is most of what "good React
     architecture" means at this scale. State goes as low as it can and
     as high as it must.

  2. `const products = data ?? []` — one line that removes every null check.
     useFetch returns T | null. Defaulting once at the top means the
     filter, the Set, the counts, and the props below all deal with a
     plain array. Normalize awkward types at the boundary, not at every
     use site. (`??` not `||`: nullish coalescing only replaces null and
     undefined, so a legitimately falsy value — 0, '' — survives. Make
     ?? your default reflex.)

  3. `categories` moved INSIDE the component.
     On Day 13 it was at module scope because PRODUCTS was a constant.
     Now it's derived from fetched data, so it has to be recomputed when
     that data arrives. This is exactly the change Day 13's closing
     question predicted — and the leaf components still didn't change.

  4. MarketplacePage renders the branches; the leaves stay dumb.
     ProductCard reads the theme (it has its own colors), but knows
     nothing about loading, errors, or filters. ProductList handles only
     its own empty case. Each component handles exactly the states it can
     distinguish from its own props.

  5. The branch ladder is a nested ternary here, not early returns.
     Because the themed wrapper <div> and the Header must render in every
     state — an early return would drop them and the page would flash
     white while loading. The cost is nesting; the alternative is
     extracting a <MarketplaceBody/> and using early returns inside it,
     which is what I'd do if a fifth branch appeared. Ternary ladders are
     fine at three or four branches and unreadable at six.

  6. Loading outranks everything, and the empty-catalogue check uses
     `products`, not `visible`.
     If it checked `visible.length === 0` you'd get "There are no listings
     yet" whenever a search matched nothing — telling the user the site is
     empty when it isn't. Two different empty states, same trap as Day 14.

  7. COLORS as a lookup object, `as const`.
     `COLORS[theme]` beats a ternary per property — one place to add a
     color, one place to add a third theme. `as const` makes the values
     literal types, so a typo in a key is caught at compile time.

  WHAT A REVIEWER WOULD FLAG FIRST
  ================================
  Inline styles. Fine for a drill, but in a take-home use CSS modules,
  Tailwind, or styled-components, and implement the theme with CSS custom
  properties and a data-theme attribute rather than passing color objects
  through React. The theme would then cost zero re-renders.

  After that, in order:
  - No useMemo on the filter/sort chain or the context value. Correct at
    8 items; say out loud that you'd measure before adding it.
  - The theme doesn't persist across reloads (localStorage) and ignores
    prefers-color-scheme.
  - Clickable cards aren't keyboard accessible (Day 7's note).
  - Everything is in one file. Split it: components/, hooks/, context/.

  Being able to list your own tradeoffs is worth more in a review than
  having pre-empted all of them. Build the simple thing, know where it
  breaks, say so.

  IF YOU WROTE THIS FROM A BLANK FILE
  ===================================
  You have the core of React/TypeScript back. Days 22-28 add forms, which
  is the last big pattern a marketplace take-home is likely to ask for.
*/
