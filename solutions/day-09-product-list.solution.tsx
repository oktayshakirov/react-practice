/*
  DAY 9 — SOLUTION: ProductList with .map()
  ==========================================
*/

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

const ProductCard = ({ name, price, category, seller, inStock }: Product) => (
  <article
    style={{
      border: '1px solid #ddd',
      borderRadius: 8,
      padding: 16,
      width: 220,
      opacity: inStock ? 1 : 0.5,
    }}
  >
    <h3 style={{ margin: '0 0 8px' }}>{name}</h3>
    <span style={{ fontSize: 12, background: '#eee', borderRadius: 4, padding: '2px 6px' }}>
      {category}
    </span>
    <p style={{ fontWeight: 600, margin: '8px 0 4px' }}>
      {price.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
    </p>
    <p style={{ fontSize: 13, color: '#666', margin: 0 }}>{seller}</p>
    <p style={{ color: inStock ? 'green' : 'red', margin: '8px 0 0' }}>
      {inStock ? 'In stock' : 'Out of stock'}
    </p>
  </article>
);

export const ProductList = () => (
  <section>
    <h2>{PRODUCTS.length} listings</h2>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
      {PRODUCTS.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  </section>
);

/*
  WHY THIS WORKS
  ==============

  1. key={product.id}, not key={index}.
     React uses the key to match elements across renders. With an index,
     deleting the first item makes every remaining item's key shift by one,
     so React thinks every card changed — it reuses the wrong DOM nodes and
     any local state inside them lands on the wrong card. With a stable id
     it moves the right node. Once you add sorting tomorrow, index keys
     would be actively wrong.

  2. {...product} spreads the object into props.
     It works here only because ProductCard's props type IS Product — the
     keys line up exactly. This is convenient, but be aware of the tradeoff:
     spreading hides which props the child actually uses. Explicit props
     (name={product.name} ...) are more verbose and more greppable. Both
     are defensible; know why you picked one.

  3. {PRODUCTS.length} listings — derived, not stored.
     There is no useState for the count. The count is a fact about the
     array, computed on every render. Any value you can calculate from
     existing data does not belong in state. This rule will save you
     hours of "why is my count stale" debugging.

  4. The card lives outside ProductList, at module scope.
     Never define a component inside another component's body — React
     would see a brand-new component type on every render and unmount/
     remount the whole subtree, losing state and DOM focus.

  5. Implicit return with arrow + parens.
     `const X = () => ( <jsx/> )` when there's no logic before the return.
     Add the braces back the moment you need a const or an if.

  COMMON MISTAKES
  ===============
  - key on the wrong element. The key goes on the outermost element
    RETURNED BY the map callback — here, <ProductCard>, not the <article>
    inside it.
  - Forgetting the key entirely — React logs a console warning; read it.
  - Wrapping the map in a fragment with the key outside. Same problem.
  - `PRODUCTS.map((p) => { <ProductCard /> })` — braces mean a function
    body, which returns undefined. Use parens, or add `return`. This one
    catches everybody; the symptom is a blank page with no error.
*/
