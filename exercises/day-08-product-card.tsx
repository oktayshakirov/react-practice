/*
  DAY 8 — ProductCard Component
  =============================
  WHAT TO BUILD:
  A single ProductCard component, fully TypeScript typed.
  This is the foundation for the marketplace days that follow.

  REQUIREMENTS:
  - Type: ProductCardProps with id, name, price, category, seller, inStock
  - Card displays: name, price (formatted), category badge, seller name
  - If inStock is false: show "Out of stock" in red, grey out the card
  - If inStock is true: show "In stock" in green
  - Price formatted as: "€1,234.00" (use toLocaleString)

  CONCEPTS THIS DRILLS:
  - TypeScript prop types with multiple fields
  - Conditional styling for whole components
  - Number formatting with toLocaleString
  - Component thinking: what does ONE card need to know?

  HINTS (only read if stuck):
  - price.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })
  - style={{ opacity: inStock ? 1 : 0.5 }} for greying out
  - You're in Germany — German locale for price formatting makes sense

  Unlock Day 8 only after finishing Days 1-7.
*/

// Write your ProductCardProps type here:

// Write your ProductCard component here:
export const ProductCard = () => {

};
