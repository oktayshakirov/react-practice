/*
  DAY 20 — SOLUTION: Generic useFetch
  ====================================
*/

import { useCallback, useEffect, useState } from 'react';

export type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  seller: string;
  inStock: boolean;
};

export type Seller = {
  username: string;
  city: string;
  rating: number;
  sales: number;
};

const PRODUCTS: Product[] = [
  { id: '1', name: 'Black Lotus (Alpha)', price: 12000, category: 'Magic', seller: 'berlin_cards', inStock: true },
  { id: '2', name: 'Charizard Base Set', price: 350, category: 'Pokemon', seller: 'kartenhaus', inStock: true },
  { id: '3', name: 'Dark Magician', price: 45, category: 'Yu-Gi-Oh', seller: 'tcg_mitte', inStock: false },
  { id: '4', name: 'Mox Ruby', price: 3200, category: 'Magic', seller: 'vintage_de', inStock: true },
];

const SELLER: Seller = { username: 'berlin_cards', city: 'Berlin', rating: 4.8, sales: 1240 };

export const fetchProducts = (): Promise<Product[]> =>
  new Promise((resolve) => setTimeout(() => resolve(PRODUCTS), 600));

export const fetchSeller = (): Promise<Seller> =>
  new Promise((resolve) => setTimeout(() => resolve(SELLER), 900));

/* ---------- the generic hook ---------- */

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

  const retry = useCallback(() => setAttempt((a) => a + 1), []);

  return { data, loading, error, retry };
};

/* ---------- two calls, two different types ---------- */

export const SellerPage = () => {
  // T is inferred as Product[] — nothing annotated at the call site.
  const products = useFetch(fetchProducts);
  // T is inferred as Seller.
  const seller = useFetch(fetchSeller);

  if (seller.loading || products.loading) return <p>Loading…</p>;

  if (seller.error) {
    return (
      <div>
        <p style={{ color: 'red' }}>{seller.error}</p>
        <button onClick={seller.retry}>Try again</button>
      </div>
    );
  }

  return (
    <section style={{ padding: 16 }}>
      {seller.data && (
        <header style={{ marginBottom: 16 }}>
          <h2 style={{ margin: 0 }}>{seller.data.username}</h2>
          <p style={{ margin: 0, color: '#666' }}>
            {seller.data.city} · {seller.data.rating.toFixed(1)}★ · {seller.data.sales} sales
          </p>
        </header>
      )}

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
        {products.data?.map((p) => (
          <article key={p.id} style={{ border: '1px solid #ddd', borderRadius: 8, padding: 16, width: 220 }}>
            <h3 style={{ margin: '0 0 8px' }}>{p.name}</h3>
            <p style={{ fontWeight: 600, margin: 0 }}>
              {p.price.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
};

/*
  WHY THIS WORKS
  ==============

  1. `<T,>` — the trailing comma, and why it's there.
     In a .tsx file the parser sees `<T>` and starts reading a JSX tag.
     The comma disambiguates it as a type parameter. Alternatives that
     also work: `<T extends unknown>`, or writing it as a
     `function useFetch<T>(...)` declaration, where there's no ambiguity.
     This trips up literally everyone the first time; now it won't.

  2. T is INFERRED, never annotated at the call site.
     `useFetch(fetchProducts)` — TypeScript reads fetchProducts as
     `() => Promise<Product[]>`, matches it against `() => Promise<T>`,
     and concludes T = Product[]. So `products.data` is
     `Product[] | null` with zero annotations. That flow — from the
     argument's type, through the generic, out to the return type — is
     the whole idea of generics. You could write useFetch<Product[]>(...)
     but you'd be telling TypeScript something it already knows.

  3. The hook takes a FETCHER, not a URL.
     A URL string would force the hook to know about fetch, headers,
     JSON parsing, and base URLs — and it could never be typed better
     than `any`, because a URL tells TypeScript nothing about the
     response shape. A function that returns Promise<T> carries its own
     type and works with any data source: real fetch, a mock, localStorage,
     an SDK call. Accept behaviour, not configuration.

  4. `data: T | null` — null is the "no data yet" state.
     Unlike Day 15's [], there's no sensible empty value for an arbitrary
     T. Hence `products.data?.map(...)` and the `seller.data &&` guard:
     the optional chaining is the price of the generic. The discriminated
     union from Day 16's stretch section solves this more elegantly —
     a good follow-up once this version is automatic.

  5. The `fetcher` dependency is the trap the exercise warns about.
     The effect depends on fetcher, so if the caller passes an INLINE
     arrow — useFetch(() => fetchProducts()) — a new function is created
     on every render, the dependency changes every render, the effect
     re-runs, setState re-renders... infinite loop, hammering the network.

     Three ways out, in order of preference:
       a) pass a stable reference, as above (fetchProducts is defined at
          module scope, so its identity never changes);
       b) the caller wraps it in useCallback;
       c) the hook stores the fetcher in a ref and depends only on
          [attempt] — robust against any caller, at the cost of not
          re-fetching when the fetcher genuinely changes.

     I've kept fetcher in the deps and relied on (a). Understanding WHY
     the inline version loops matters more than which fix you pick —
     it's the same class of bug as an object in a dependency array.

  6. useCallback on retry.
     retry is returned from the hook, so an unstable identity would ripple
     into any consumer that depends on it. Empty deps because the updater
     form (a => a + 1) needs nothing from the closure.

  HOW TO GRADE YOURSELF
  =====================
  Should have been automatic: the four useStates, the effect skeleton,
  setLoading(true)/setError(null) at the top, .finally, the cancelled
  flag, the retry counter. That's Days 15-17 muscle.

  Fair to have paused on: the <T,> comma, whether data starts as null,
  what to do about fetcher in the deps.

  Red flag: writing `data: any` or `fetcher: Function`. If T never
  appears in the return type, the generic is decoration.

  COMMON MISTAKES
  ===============
  - useFetch(fetchProducts()) — calls it immediately and passes a
    Promise. The hook expects a function it can call on retry; with a
    Promise it can only ever await the same original request.
  - useState<T>(null) without the union. Doesn't compile, and rightly.
  - Annotating at the call site: useFetch<Seller>(fetchProducts). This
    compiles a lie only if the types happen to overlap — let inference do it.
  - Returning `data!` to avoid the null checks. You'll read properties of
    null on the first render.
*/
