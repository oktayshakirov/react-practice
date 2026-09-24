/*
  DAY 7 — Card with Props (From Memory + Extra TypeScript)
  =========================================================
  Same task as Day 5, from memory, with one addition.

  REQUIREMENTS (same as Day 5 plus extras):
  - CardProps type with: name, price, category, rare, onClick
  - Card component using those props
  - onClick: clicking a card logs "Selected: [card name]" to console
  - CardList renders CARDS with .map() and proper keys
  - NEW: Add a second type for the CARDS array items — CardData type
  - NEW: The CARDS array should be typed as CardData[]

  TODAY'S GOAL:
  Write the TypeScript types first, then the components.
  You should need minimal lookups.

  Notes after finishing:
  ----------------------
  What was easier than Day 5: 
  What TypeScript parts tripped you up: 
  Time to complete: 
*/

const CARDS: CardData[] = [
  { id: "1", name: "Black Lotus", price: 12000, category: "Magic", rare: true },
  { id: "2", name: "Charizard", price: 350, category: "Pokémon", rare: true },
  {
    id: "3",
    name: "Dark Magician",
    price: 45,
    category: "Yu-Gi-Oh",
    rare: false,
  },
  { id: "4", name: "Pikachu", price: 8.5, category: "Pokémon", rare: false },
  { id: "5", name: "Mox Ruby", price: 3200, category: "Magic", rare: true },
];

type CardData = {
  id: string;
  name: string;
  price: number;
  category: string;
  rare: boolean;
};

type CardProps = {
  name: string;
  category: string;
  price: number;
  rare: boolean;
  onClick: () => void;
};

export const Card = ({ name, price, category, rare, onClick }: CardProps) => {
  return (
    <div>
      <article
        onClick={onClick}
        style={{
          border: "1px solid",
          borderRadius: "8px",
          padding: "16px",
          width: "200px",
        }}
      >
        <h3 style={{ margin: "0px 0px 4px" }}>
          {name}
          {rare && (
            <span
              style={{ marginLeft: "5px", fontSize: "15px", color: "green" }}
            >
              Rare
            </span>
          )}
        </h3>
        <p style={{ fontSize: "13px" }}>{category}</p>
        <p style={{ fontWeight: "600" }}>{price.toFixed(2)}€</p>
      </article>
    </div>
  );
};

export const CardList = () => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
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
};
