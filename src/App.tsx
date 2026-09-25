/*
  TODAY'S EXERCISE
  ================
  Change the two lines below to whatever day you're working on.
  Nothing else in this file needs to change, ever.

  Exercise:  '../exercises/day-01-controlled-input'
  Solution:  '../solutions/day-01-controlled-input.solution'

  Note: a blank exercise file renders nothing and React will throw
  "Nothing was returned from render" until you write your component.
  That error means the wiring works — you just haven't started yet.
*/
import { ProductCard as Exercise } from "../exercises/day-08-product-card.tsx";
import { ProductCard as Solution } from "../solutions/day-08-product-card.solution.tsx";

const testCard = {
  id: "1",
  name: "Black Lotus",
  price: 12000,
  category: "Magic",
  seller: "berlin GmbH",
  inStock: true,
};

export default function App() {
  return (
    <main className="app">
      <Exercise {...testCard} />
      <hr />
      <Solution {...testCard} />
    </main>
  );
}
