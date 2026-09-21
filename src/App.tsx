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
import { ControlledInput } from "../exercises/day-01-controlled-input";
import { ControlledInputSolution } from "../solutions/day-01-controlled-input.solution";

export default function App() {
  return (
    <main className="app">
      <ControlledInput />
      <hr />
      <ControlledInputSolution />
    </main>
  );
}
