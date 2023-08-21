import { createContext, useContext, useState } from "react";

// 1. Create a Context.
const CounterContext = createContext();

// 2. Create Parent component.
function Counter({ children }) {
  const [count, setCount] = useState(0);
  const increase = () => setCount((count) => count + 1);
  const decrease = () => setCount((count) => count - 1);
  return (
    <CounterContext.Provider value={{ count, increase, decrease }}>
      <span>{children}</span>
    </CounterContext.Provider>
  );
}

// 3. Create child components to help implementing the common tasks
function Count() {
  const { count } = useContext(CounterContext);
  return <span>{count}</span>;
}

function Label({ children }) {
  return <span>{children}</span>;
}

function Increase({ icon }) {
  const { increase } = useContext(CounterContext);
  return <button onClick={increase}>{icon}</button>;
}

function Decrease({ icon }) {
  const { decrease } = useContext(CounterContext);
  return <button onClick={decrease}>{icon}</button>;
}

// 4. Add child components as properties to parent component
Counter.Count = Count;
Counter.Label = Label;
Counter.Decrease = Decrease;
Counter.Increase = Increase;

export default Counter;