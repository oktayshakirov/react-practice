/*
  DAY 7 — SOLUTION: Card with Props (From Memory + Extra TypeScript)
  ===================================================================
*/

type CardData = {
  id: string;
  name: string;
  price: number;
  category: string;
  rare: boolean;
};

type CardProps = {
  name: string;
  price: number;
  category: string;
  rare: boolean;
  onClick: () => void;
};

const CARDS: CardData[] = [
  { id: '1', name: 'Black Lotus', price: 12000, category: 'Magic', rare: true },
  { id: '2', name: 'Charizard', price: 350, category: 'Pokémon', rare: true },
  { id: '3', name: 'Dark Magician', price: 45, category: 'Yu-Gi-Oh', rare: false },
  { id: '4', name: 'Pikachu', price: 8.5, category: 'Pokémon', rare: false },
  { id: '5', name: 'Mox Ruby', price: 3200, category: 'Magic', rare: true },
];

const Card = ({ name, price, category, rare, onClick }: CardProps) => (
  <article
    onClick={onClick}
    style={{
      border: '1px solid #ddd',
      borderRadius: 8,
      padding: 16,
      width: 200,
      cursor: 'pointer',
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
        onClick={() => console.log(`Selected: ${card.name}`)}
      />
    ))}
  </div>
);

/*
  WHY THIS WORKS
  ==============

  1. Two types, because they describe two different things.
     CardData is the shape of a record in your data. CardProps is the
     shape of the contract between CardList and Card. They overlap
     heavily today, and they are still not the same type:
       - CardData has `id`; CardProps doesn't, because Card never shows it.
       - CardProps has `onClick`; CardData doesn't, because a behaviour
         isn't part of a card's data.

     This split feels like duplication now. It stops feeling that way the
     first time a component needs a prop the API doesn't send, or the API
     adds a field no component renders.

     Worth knowing: you can also express it as
       type CardProps = Omit<CardData, 'id'> & { onClick: () => void };
     which keeps them in sync automatically. Correct, and slightly harder
     to read at a glance. Both are defensible; Day 8 uses the "props ARE
     the object" approach for a third comparison.

  2. `CARDS: CardData[]` — annotating the array is the real win.
     Without it, TypeScript infers the shape from the literal and you get
     autocomplete either way. WITH it, a typo in a new entry (`rar: true`)
     is an error at the DATA, pointing at the offending line — not a
     confusing error three files away where the property is missing.
     Annotate your data, let TypeScript infer your locals.

  3. `onClick: () => void`.
     Takes nothing, returns nothing. The parent decides what the click
     means; Card just calls it. That's why Card doesn't log the name
     itself — it doesn't own that behaviour, and hardcoding it would make
     the component useless for anything but logging.

     `void` as a return type means "the caller ignores whatever comes
     back," so a handler that happens to return something still type-checks.

  4. The parent closes over `card.name` in the arrow.
     `onClick={() => console.log(...)}` creates a new function per card,
     each remembering its own card. That's closures doing exactly what you
     want. It also creates a new function on every render — real, and
     irrelevant at this scale. Reach for useCallback when you have a
     measured problem, not before.

  5. onClick on an <article> is a compromise.
     It works, and it's not accessible: a div/article isn't focusable and
     doesn't fire on Enter. A real clickable card is either a <button>
     wrapping the content, or gets tabIndex={0}, role="button", and a
     keyboard handler. Knowing this — and saying it out loud in a review —
     is worth more than silently shipping either version.

  HOW TO GRADE YOURSELF
  =====================
  Automatic by now: the props type, destructuring in the parameter list,
  .map() with key={card.id}, {rare && …}.

  Fair to have paused on: whether to write CardProps in terms of CardData,
  and how to type a function prop. Those are the new bits.

  Red flag: reaching for `any` on onClick, or typing it as `Function`.
  Both switch off the checking you're here to practise.

  COMMON MISTAKES
  ===============
  - onClick={console.log(`Selected: ${card.name}`)} — calls it during
    render. Every card logs immediately, then clicking does nothing.
  - One type used for both the data and the props, with `id` and
    `onClick` both optional to make it fit. Optionality used to paper
    over a modelling problem means every consumer now needs a null check.
  - `onClick: (name: string) => void` and then calling onClick(name)
    inside Card. Also valid! But then Card decides what gets passed up.
    Fine when the parent genuinely needs the value; unnecessary here,
    since the parent already knows which card it rendered.
*/
