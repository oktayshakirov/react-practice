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

type ProductCardProps = {
  id: string;
  name: string;
  category: string;
  price: number;
  seller: string;
  inStock: boolean;
};

export const ProductCard = ({
  id,
  name,
  category,
  price,
  seller,
  inStock,
}: ProductCardProps) => {
  return (
    <div>
      <article
        style={{
          border: "1px solid gray",
          borderRadius: "8px",
          padding: "16px",
          width: "220px",
          opacity: inStock ? 1 : 0.5,
        }}
      >
        <h3 style={{ margin: "0px 0px 8px" }}>{name}</h3>
        <span
          style={{
            fontSize: "12px",
            background: "rgb(238, 238, 238)",
            borderRadius: "4px",
            padding: "2px 6px",
          }}
        >
          {category}
        </span>
        <p style={{ fontWeight: "600", margin: "8px 0px 4px" }}>
          {price.toLocaleString("de-DE", {
            style: "currency",
            currency: "EUR",
          })}
        </p>
        <p style={{ fontSize: "13px", color: "gray", margin: "0px" }}>
          {seller}
        </p>
        <p style={{ color: inStock ? "green" : "red", margin: "8px 0px 0px" }}>
          {inStock ? "In Stock" : "Out of Stock"}
        </p>
      </article>
    </div>
  );
};
