/*
  DAY 5 — Card Component with Props + TypeScript
  ===============================================
  WHAT TO BUILD:
  A reusable Card component that receives data via props,
  and a parent that renders a list of them.

  REQUIREMENTS:
  Part A — The Card component:
  - Accepts: name (string), price (number), category (string), rare (boolean)
  - Displays all four values
  - If rare is true, show a "✨ Rare" badge
  - Price should display with a € symbol and 2 decimal places

  Part B — The parent component:
  - Renders the CARDS array below as a list of Card components
  - Each Card gets its data from the array (no hardcoding)
  - Uses a proper key prop

  CONCEPTS THIS DRILLS:
  - Defining a TypeScript type for props
  - Passing props from parent to child
  - .map() with typed objects
  - Optional/conditional rendering based on a boolean prop
  - .toFixed(2) for formatting numbers

  HINTS (only read if stuck after 10 minutes):
  - type CardProps = { name: string; price: number; category: string; rare: boolean; }
  - const Card = ({ name, price, category, rare }: CardProps) => { ... }
  - {rare && <span>✨ Rare</span>}
  - {price.toFixed(2)}€

  DO NOT look at the solution until you've written your own attempt.
*/

import { useState } from "react";

const CARDS = [
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

type CardProps = {
  name: string;
  price: number;
  category: string;
  rare: boolean;
};

export const Card = ({ name, price, category, rare }: CardProps) => {
  return (
    <div>
      <article
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
        />
      ))}
    </div>
  );
};
