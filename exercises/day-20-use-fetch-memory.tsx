/*
  DAY 20 — useProducts From Memory (Generic Edition)
  ===================================================
  Same idea as Day 17. No looking at your Day 17 file, and this time the
  hook is generic — it fetches anything, not just products.

  REQUIREMENTS:
  - A generic hook: useFetch<T>(fetcher: () => Promise<T>)
  - Returns { data: T | null, loading: boolean, error: string | null, retry: () => void }
  - Use it twice in one component tree, with two different result types:
      useFetch(fetchProducts)  ->  data is Product[] | null
      useFetch(fetchSeller)    ->  data is Seller | null
  - No `any` anywhere. If you reach for it, you've lost — back up.

  TODAY'S GOAL:
  Write the state + effect + retry skeleton without pausing. If you had
  to stop and think about the finally block or the dependency array,
  note it below and repeat the exercise tomorrow.

  CONCEPTS THIS DRILLS:
  - Generic functions in TypeScript: <T>(arg: Something<T>) => Result<T>
  - How T is inferred from the argument, not annotated by the caller
  - Why the fetcher goes in as a function, not as a URL string
  - Reusing one hook across unrelated data shapes

  HINTS (only read if truly stuck):
  - const useFetch = <T,>(fetcher: () => Promise<T>) => { ... }
    The trailing comma in <T,> is needed in .tsx files — otherwise the
    parser reads <T> as a JSX tag. This trips up everyone once.
  - useState<T | null>(null)
  - Put fetcher in the dependency array and watch what happens if the
    caller passes an inline arrow function. (Infinite loop. Why?)

  Notes after finishing:
  ----------------------
  What was automatic:
  What I had to look up:
  Time to complete:
*/
import { useCallback, useEffect, useState } from "react";

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
    name: "Mox Ruby",
    price: 3200,
    category: "Magic",
    seller: "vintage_de",
    inStock: true,
  },
];

const SELLER: Seller = {
  username: "berlin_cards",
  city: "Berlin",
  rating: 4.8,
  sales: 1240,
};

// Fake APIs. Don't change these.
export const fetchProducts = (): Promise<Product[]> =>
  new Promise((resolve) => setTimeout(() => resolve(PRODUCTS), 600));

export const fetchSeller = (): Promise<Seller> =>
  new Promise((resolve) => setTimeout(() => resolve(SELLER), 900));

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
        setError(err instanceof Error ? err.message : "Something went wrong");
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

export const SellerPage = () => {
  const products = useFetch(fetchProducts);
  const seller = useFetch(fetchSeller);

  if (seller.loading || products.loading) return <p>Loading…</p>;

  if (seller.error) {
    return (
      <div>
        <p style={{ color: "red" }}>{seller.error}</p>
        <button onClick={seller.retry}>Try again</button>
      </div>
    );
  }

  return (
    <section style={{ padding: 16 }}>
      {seller.data && (
        <header style={{ marginBottom: 16 }}>
          <h2 style={{ margin: 0 }}>{seller.data.username}</h2>
          <p style={{ margin: 0, color: "#666" }}>
            {seller.data.city} · {seller.data.rating.toFixed(1)}★ ·{" "}
            {seller.data.sales} sales
          </p>
        </header>
      )}

      <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
        {products.data?.map((p) => (
          <article
            key={p.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: 8,
              padding: 16,
              width: 220,
            }}
          >
            <h3 style={{ margin: "0 0 8px" }}>{p.name}</h3>
            <p style={{ fontWeight: 600, margin: 0 }}>
              {p.price.toLocaleString("de-DE", {
                style: "currency",
                currency: "EUR",
              })}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
};
