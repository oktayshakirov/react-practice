/*
  DAY 8 — SOLUTION: ProductCard Component
  ========================================
  One of several valid answers. If yours differs but works and is typed,
  yours is fine. Compare the shape of the decisions, not the characters.
*/

export type ProductCardProps = {
  id: string;
  name: string;
  price: number;
  category: string;
  seller: string;
  inStock: boolean;
};

export const ProductCard = ({ name, price, category, seller, inStock }: ProductCardProps) => {
  const formattedPrice = price.toLocaleString('de-DE', {
    style: 'currency',
    currency: 'EUR',
  });

  return (
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
      <span
        style={{
          fontSize: 12,
          background: '#eee',
          borderRadius: 4,
          padding: '2px 6px',
        }}
      >
        {category}
      </span>
      <p style={{ fontWeight: 600, margin: '8px 0 4px' }}>{formattedPrice}</p>
      <p style={{ fontSize: 13, color: '#666', margin: 0 }}>{seller}</p>
      <p style={{ color: inStock ? 'green' : 'red', margin: '8px 0 0' }}>
        {inStock ? 'In stock' : 'Out of stock'}
      </p>
    </article>
  );
};

/*
  WHY THIS WORKS
  ==============

  1. `id` is in the props type but not destructured.
     That's deliberate. The parent needs `id` for the key prop, and typing
     the props as "the whole product" lets the parent spread {...product}.
     Destructuring only what you render keeps the body honest.

  2. formattedPrice is computed in the body, not in JSX.
     Anything longer than a property access reads better as a named const
     above the return. The JSX stays scannable.

  3. toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })
     gives you "12.000,00 €" — German grouping, comma decimal, symbol
     after the number. Hardcoding `€${price.toFixed(2)}` gets the symbol
     on the wrong side for a German marketplace. Small detail, but it's
     exactly the kind of thing a Berlin reviewer notices.

  4. Two separate conditionals off one boolean.
     `opacity: inStock ? 1 : 0.5` and the status line both read `inStock`
     directly. There's no derived state, no useState, no effect. A prop
     is already the source of truth — don't copy it into state.

  5. <article> instead of <div>.
     A listing is a self-contained piece of content. Free accessibility
     and it costs nothing. Interviewers notice semantic elements.

  COMMON MISTAKES
  ===============
  - `props: any` or no type at all. The whole point of the exercise is the type.
  - useState to hold the price/name from props. Props already are state,
    owned by the parent. Copying them creates two sources of truth.
  - Returning two sibling elements without a wrapper. A component returns
    one node (or a <>fragment</>).
*/
