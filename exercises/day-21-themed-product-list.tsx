/*
  DAY 21 — Themed Product List
  =============================
  WHAT TO BUILD:
  Everything from Days 8-20 in one page. This is the checkpoint: if you
  can write this from a blank file, you can handle a take-home.

  REQUIREMENTS:
  - ThemeProvider + useTheme (Day 19) wrapping the whole page
  - useFetch (Day 20) loading the listings
  - Loading / error / empty / data branches all handled (Day 16)
  - FilterBar with search + category + sort (Days 12-14)
  - ProductList + ProductCard, both reading the theme via useTheme
  - A theme toggle in the header, no theme props passed anywhere
  - Dark mode must change the CARD colors too, not just the page background

  THE COMPONENT TREE YOU'RE AIMING FOR:
    App
      ThemeProvider
        MarketplacePage      <- useFetch + filter/sort state
          Header             <- ThemeToggle
          FilterBar          <- controls, no state of its own
          ProductList        <- gets Product[], handles the empty case
            ProductCard      <- useTheme for colors

  CONCEPTS THIS DRILLS:
  - Composing a custom hook, context, and derived state in one component
  - Deciding what belongs in state vs. context vs. derived-on-render
  - Ordering render branches so no branch can be reached twice
  - Holding a whole component tree in your head

  NO HINTS TODAY. Everything here you've already written once.
  If you're stuck for more than 15 minutes on one piece, open THAT day's
  file only — not this day's solution.

  AFTER YOU FINISH:
  Reread it and ask: which part would a reviewer flag first?
  Fix that one thing, then move on to the forms days.

  Notes after finishing:
  ----------------------
  Hardest part:
  What I'd refactor:
  Time to complete:
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
  { id: '7', name: 'Time Walk', price: 4100, category: 'Magic', seller: 'vintage_de', inStock: true },
  { id: '8', name: 'Shadowless Blastoise', price: 890, category: 'Pokemon', seller: 'tcg_mitte', inStock: true },
];

// Fake API. Don't change this.
export const fetchProducts = (): Promise<Product[]> =>
  new Promise((resolve) => setTimeout(() => resolve(PRODUCTS), 700));

// Blank file from here down. Build the whole tree.
export const App = () => {

};
