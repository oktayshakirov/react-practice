/*
  DAY 9 — ProductList with .map()
  ================================
  WHAT TO BUILD:
  A ProductList component that renders the PRODUCTS array below
  as a grid of the ProductCard you wrote on Day 8.

  REQUIREMENTS:
  - Re-type the Product type at the top (don't copy-paste from Day 8, retype it)
  - A ProductCard component (same as Day 8 — rewrite it, it's fast now)
  - ProductList maps over PRODUCTS and renders one ProductCard each
  - Every card gets key={product.id}
  - Above the grid, show a heading: "X listings"
  - Layout the cards with display: flex + flexWrap, or CSS grid

  CONCEPTS THIS DRILLS:
  - Array.map() returning JSX
  - The key prop and why index is the wrong choice here
  - Deriving a count from array.length instead of storing it in state
  - Passing a whole object's fields down as individual props

  HINTS (only read if stuck after 10 minutes):
  - {PRODUCTS.map((p) => <ProductCard key={p.id} {...p} />)}
  - Spreading {...p} works because the prop names match the object keys
  - If you'd rather be explicit, pass each prop by hand — both are fine

  DO NOT look at the solution until you've written your own attempt.
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

// Write your ProductCard component here:

// Write your ProductList component here:
export const ProductList = () => {

};
