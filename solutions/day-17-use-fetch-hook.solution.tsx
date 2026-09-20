/*
  DAY 17 — SOLUTION: Custom useProducts Hook
  ===========================================
*/

import { useEffect, useState } from 'react';

export type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  seller: string;
  inStock: boolean;
};

const PRODUCTS: Product[] = [
  { id: '1', name: 'Black Lotus (Alpha)', price: 12000, category: 'Magic', seller: 'berlin_cards', inStock: true },
  { id: '2', name: 'Charizard Base Set', price: 350, category: 'Pokemon', seller: 'kartenhaus', inStock: true },
  { id: '3', name: 'Dark Magician', price: 45, category: 'Yu-Gi-Oh', seller: 'tcg_mitte', inStock: false },
  { id: '4', name: 'Pikachu Illustrator', price: 9800, category: 'Pokemon', seller: 'berlin_cards', inStock: false },
  { id: '5', name: 'Mox Ruby', price: 3200, category: 'Magic', seller: 'vintage_de', inStock: true },
  { id: '6', name: 'Blue-Eyes White Dragon', price: 120, category: 'Yu-Gi-Oh', seller: 'kartenhaus', inStock: true },
];

export const fetchProducts = (): Promise<Product[]> =>
  new Promise((resolve, reject) =>
    setTimeout(() => {
      if (Math.random() < 0.33) reject(new Error('Could not reach the listings service'));
      else resolve(PRODUCTS);
    }, 800)
  );

/* ---------- the hook ---------- */

type UseProductsResult = {
  products: Product[];
  loading: boolean;
  error: string | null;
  retry: () => void;
};

const useProducts = (): UseProductsResult => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    setError(null);

    fetchProducts()
      .then((data) => {
        if (!cancelled) setProducts(data);
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
  }, [attempt]);

  const retry = () => setAttempt((a) => a + 1);

  return { products, loading, error, retry };
};

/* ---------- the component ---------- */

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

export const ProductList = () => {
  const { products, loading, error, retry } = useProducts();

  if (loading) return <p>Loading listings…</p>;

  if (error) {
    return (
      <div>
        <p style={{ color: 'red' }}>{error}</p>
        <button onClick={retry}>Try again</button>
      </div>
    );
  }

  if (products.length === 0) return <p>There are no listings yet.</p>;

  return (
    <section>
      <h2>{products.length} listings</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </section>
  );
};

/*
  WHY THIS WORKS
  ==============

  1. Nothing changed except where the code lives.
     The hook body is Day 16's component body, cut and pasted. That's what
     makes this refactor safe, and it's worth noticing: a custom hook is
     not a new React feature you had to learn. It's a function that happens
     to call hooks. The "use" prefix is a naming convention that the linter
     relies on to check the rules of hooks — it has no runtime meaning.

  2. The component went from ~40 lines to 4 branches.
     ProductList now describes only what the user sees. How the data
     arrives, how failures are represented, how a retry is triggered — all
     of that is behind one call. If you switch from a fake promise to a
     real fetch, to React Query, to a WebSocket, this component doesn't
     change. That separation is the entire payoff.

  3. Returning an object, not a tuple.
     `return { products, loading, error, retry }` forces call sites to use
     those names, which is what you want for four unrelated values.
     Tuples ([value, setValue], like useState) are for two-or-fewer values
     where the caller genuinely wants to rename them. Four positional
     values would be unreadable at the call site.

  4. The explicit UseProductsResult annotation.
     Inference would produce almost the same type. Writing it down makes
     the hook's contract the thing you design first, surfaces an accidental
     change as an error inside the hook rather than at some call site, and
     gives you something to read in the editor. Same principle as
     annotating the data array on Day 7.

  5. "Hooks share logic, never state" — the sentence to actually believe.
     Two components calling useProducts() get two independent sets of
     useState, two effects, two fetches. There is no shared cache here.
     People new to hooks expect the second caller to get the first one's
     data; it doesn't happen, and if you want that you need Context, a
     cache, or a data library. Knowing this distinction cold is the
     difference between using hooks and guessing at them.

  6. The rules of hooks apply inside your hook too.
     Top level only. No calling useState inside an if, a loop, or a
     callback. React matches hooks to their state by call ORDER, so a
     conditional hook shifts every subsequent hook's identity.

  COMMON MISTAKES
  ===============
  - Naming it `getProducts` or `productsHook`. Without the `use` prefix
    the lint rules don't apply, and nothing warns you when you later call
    it conditionally.
  - Calling useProducts() inside an if, or inside the map callback.
  - Returning the setters (setProducts, setError) along with the values.
    That hands callers the ability to put the hook in a state it never
    chose, and defeats the encapsulation you just built. Expose `retry`,
    an intention — not `setAttempt`, a mechanism.
  - Putting the JSX for the loading/error branches inside the hook. A hook
    returns data, not UI. The moment it returns JSX it's a component, and
    you've lost the ability to render those states differently per screen.
  - Forgetting that the hook re-runs on every render of its component.
    It does — that's normal. The useState calls just return existing state
    after the first render.
*/
