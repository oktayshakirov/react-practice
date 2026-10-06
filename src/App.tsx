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
import { ProductList as Exercise } from "../exercises/day-15-fetch-on-mount.tsx";
import { ProductList as Solution } from "../solutions/day-15-fetch-on-mount.solution.tsx";

export default function App() {
  return (
    <main className="app">
      <Exercise />
      <hr />
      <Solution />
    </main>
  );
}
