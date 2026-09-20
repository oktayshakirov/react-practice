/*
  DAY 15 — SOLUTION: Fetch on Mount with useEffect
  =================================================
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
  new Promise((resolve) => setTimeout(() => resolve(PRODUCTS), 800));

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

  useEffect(() => {
    let cancelled = false;

    fetchProducts().then((data) => {
      if (!cancelled) setProducts(data);
    });

    return () => {
      cancelled = true;
    };
  }, []);

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

  1. useState<Product[]>([]) — the annotation is required here.
     TypeScript infers `never[]` from a bare [], and then setProducts(data)
     fails. Empty initial values are exactly when inference can't help you:
     [], null, undefined. Annotate those; let it infer the rest.

     Starting at [] rather than null also means `products.map` is safe on
     the first render, before any data arrives. (Day 16 revisits this:
     "empty" and "not loaded yet" are different states, and conflating
     them is why the heading says "0 listings" for 800ms.)

  2. The dependency array is [], and here's the actual rule.
     React re-runs the effect whenever a value in the array differs from
     last render. An empty array can never differ, so the effect runs once
     after the first render and never again. That's what you want for
     "load this when the component appears."

     Omit the array entirely and the effect runs after EVERY render.
     setProducts causes a render. That render runs the effect. Infinite
     loop, network tab on fire. Run into it once deliberately — the
     symptom is unmistakable afterwards.

  3. The effect callback is NOT async.
     `useEffect(async () => {...})` returns a Promise, but React expects
     either nothing or a cleanup FUNCTION — so it would try to call your
     Promise at unmount. Two correct shapes:
       .then() as above, or
       an async function declared inside and called immediately:
         useEffect(() => {
           const load = async () => setProducts(await fetchProducts());
           load();
         }, []);

  4. The `cancelled` flag is the part most people skip.
     If the component unmounts while the request is in flight, the .then
     still fires and calls setState on a component that's gone. The flag
     makes the callback a no-op instead. This matters more than it used
     to: React 18's StrictMode mounts, unmounts, and remounts every
     component in development specifically to surface this — which is why
     you may see the fetch fire twice locally. That's not a bug in your
     code, it's the check working.

  5. The first render always shows the empty state.
     There is no way around it. The component renders, THEN the effect
     runs, THEN the promise resolves. Any UI that assumes data exists on
     the first render is wrong — which is the entire subject of Day 16.

  COMMON MISTAKES
  ===============
  - Calling fetchProducts() directly in the component body. It fires on
    every render, and setState in the .then triggers another render.
    Same infinite loop, no effect required.
  - `useEffect(() => { setProducts(fetchProducts()) }, [])` — assigns the
    Promise itself to state. TypeScript catches this one for you.
  - Putting `products` in the dependency array. The effect sets products,
    which changes products, which re-runs the effect. Loop.
  - Adding a cleanup that returns the promise, or returning fetchProducts()
    — the return value of an effect must be a cleanup function or nothing.
*/
