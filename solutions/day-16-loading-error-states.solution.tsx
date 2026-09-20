/*
  DAY 16 — SOLUTION: Loading and Error States
  ============================================
  The main solution uses the two-boolean approach the task asks for.
  The discriminated-union stretch version is at the bottom.
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
      if (Math.random() < 0.5) reject(new Error('Could not reach the listings service'));
      else resolve(PRODUCTS);
    }, 800)
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

export const ProductList = () => {
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

  1. loading starts as TRUE, not false.
     The request begins before the first paint, so the very first render
     is already a loading render. Starting at false means one frame of
     "There are no listings yet" before the spinner — a flash of the wrong
     empty state, and a bug reviewers spot immediately.

  2. setError(null) at the START of each attempt, not only on success.
     Without it: fail, click retry, and the old error stays on screen
     during the new request. Every attempt resets the state it owns.
     Same reason setLoading(true) is inside the effect rather than only
     in the initial useState — the effect re-runs on retry.

  3. .finally() for setLoading(false).
     It runs on both paths. Putting setLoading(false) in .then AND .catch
     works but is two places to forget; finally is one.

  4. The retry counter is the idiomatic "run that effect again" lever.
     You can't call an effect directly. You change something it depends
     on. `attempt` exists only to be incremented, and [attempt] in the
     dependency array turns that into a re-fetch. The updater form
     (a => a + 1) matters here for the same reason as Day 2.

  5. `err: unknown` and the instanceof check.
     JavaScript lets you throw anything — a string, an object, undefined.
     TypeScript types catch parameters as `unknown` for that reason, so
     err.message isn't allowed until you've proven it's an Error. The
     narrowing gives you a real message when there is one and a fallback
     when there isn't.

  6. Four early returns, in priority order.
     loading → error → empty → data. Each one returns, so they can't
     overlap and you never render two states at once. Read top to bottom
     and you have the component's whole behaviour. This ordering is not
     arbitrary: loading outranks error (a stale error during a new request
     is a lie), and empty outranks data (an empty grid is not a UI).

  7. Products from the LAST successful load survive an error.
     `products` isn't cleared in .catch, so a failed refresh doesn't wipe
     the list. Here the error branch returns early so you don't see them —
     but keeping the data means you could choose to show stale results
     with an error banner instead. That's a product decision; make it
     deliberately.

  COMMON MISTAKES
  ===============
  - `if (loading) ... if (error) ...` without returns, so two states
    render together.
  - Checking `if (!products.length) return <Empty/>` ABOVE the loading
    check. Products are empty while loading, so you'd never see a spinner.
  - Retrying by calling the effect's function directly from onClick. It
    works only if you extracted it; if you didn't, you end up duplicating
    the whole fetch/set/catch block in two places that then drift.
  - Forgetting the cancelled guard in .catch as well as .then. Both fire
    after unmount.
  - setError(err) with err typed as any. You'll render an object as a
    React child and get a runtime error.

  STRETCH: ONE UNION INSTEAD OF THREE BOOLEANS
  ============================================
  type State =
    | { status: 'loading' }
    | { status: 'error'; message: string }
    | { status: 'success'; products: Product[] };

  const [state, setState] = useState<State>({ status: 'loading' });
  // setState({ status: 'success', products: data });

  if (state.status === 'loading') return <p>Loading listings…</p>;
  if (state.status === 'error') return <p>{state.message}</p>;
  return <Grid products={state.products} />;

  Why this is better: with three booleans, `loading && error` is
  representable — a state that should never exist but that nothing stops
  you from creating. With the union, TypeScript won't let you read
  state.products in the loading branch, and it won't let you construct a
  loading-and-errored value at all. Making illegal states unrepresentable
  is the single most useful TypeScript idea for React, and this is the
  smallest example of it.
*/
