/*
  DAY 5 — SOLUTION: Card Component with Props + TypeScript
  =========================================================
*/

const CARDS = [
  { id: '1', name: 'Black Lotus', price: 12000, category: 'Magic', rare: true },
  { id: '2', name: 'Charizard', price: 350, category: 'Pokémon', rare: true },
  { id: '3', name: 'Dark Magician', price: 45, category: 'Yu-Gi-Oh', rare: false },
  { id: '4', name: 'Pikachu', price: 8.5, category: 'Pokémon', rare: false },
  { id: '5', name: 'Mox Ruby', price: 3200, category: 'Magic', rare: true },
];

type CardProps = {
  name: string;
  price: number;
  category: string;
  rare: boolean;
};

const Card = ({ name, price, category, rare }: CardProps) => (
  <article
    style={{
      border: '1px solid #ddd',
      borderRadius: 8,
      padding: 16,
      width: 200,
    }}
  >
    <h3 style={{ margin: '0 0 4px' }}>
      {name} {rare && <span title="Rare">✨ Rare</span>}
    </h3>
    <p style={{ fontSize: 13, color: '#666', margin: '0 0 8px' }}>{category}</p>
    <p style={{ fontWeight: 600, margin: 0 }}>{price.toFixed(2)}€</p>
  </article>
);

export const CardList = () => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
    {CARDS.map((card) => (
      <Card
        key={card.id}
        name={card.name}
        price={card.price}
        category={card.category}
        rare={card.rare}
      />
    ))}
  </div>
);

/*
  WHY THIS WORKS
  ==============

  1. The props type is a contract, and it's the point of the exercise.
     `CardProps` states exactly what a Card needs. Pass a string price and
     the compiler stops you at the call site, in your editor, before the
     app runs. That's the entire value proposition of TypeScript in React:
     props are where components meet, so props are where types pay.

  2. `type` rather than `interface`.
     For props, they're interchangeable. `type` is what most React
     codebases use now, it handles unions and intersections uniformly,
     and it doesn't silently merge if you declare the same name twice.
     Either answer is fine in an interview — having a reason is what
     matters.

  3. Destructuring in the parameter list.
     `({ name, price, category, rare }: CardProps)` gives you four local
     variables and a one-line summary of what this component reads. The
     alternative, `(props: CardProps)` plus `props.name` everywhere, is
     noisier and hides which fields are actually used.

  4. `id` is NOT in CardProps.
     The Card never renders it. The parent needs it for the key, which it
     takes from `card.id` directly. Props are what the child needs, not a
     copy of the data model — those drift apart fast, and Day 8 shows the
     opposite tradeoff (typing props AS the full object so you can spread).

  5. {rare && <span>✨ Rare</span>} — conditional rendering from a boolean.
     Safe with a real boolean. Reread Day 3's note about `&&` with numbers.

  6. key={card.id}, never key={index}.
     Ids are stable across reorders and deletions; indices aren't. Today
     nothing reorders, so both "work" — build the habit while it's free,
     because Day 10 adds sorting and index keys become an actual bug.

  7. price.toFixed(2) returns a STRING.
     "8.50", not 8.5. That's what you want for display. It also rounds, so
     never do math on the result — format at the last moment, in the JSX.
     (Day 8 swaps this for toLocaleString, which gets the German symbol
     placement and thousands separators right.)

  COMMON MISTAKES
  ===============
  - `(props: any)` or no annotation. Every later exercise builds on this
    type; if it's `any`, you've drilled nothing.
  - Hardcoding a card's data inside Card. Then it isn't reusable, which
    is the one thing a component is for.
  - Defining Card inside CardList's body. New component identity on every
    render → React remounts the whole subtree.
  - Putting the key on the <article> inside Card instead of on <Card> in
    the map. The key belongs on the element the callback returns.
  - Forgetting that a component must return ONE node. Wrap siblings in a
    fragment <>…</>.
*/
